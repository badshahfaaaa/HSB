
import { createHash } from 'node:crypto'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import type { Document } from 'mongodb'
import clientPromise from '@/lib/db/mongodb'
import { requirementTypes } from '@/lib/requirements'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const requirementSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional().default(''),
  interest: z.enum(
    requirementTypes.map((option) => option.value) as [string, ...string[]]
  ),
  preferredLocation: z.string().trim().min(2).max(160),
  budgetRange: z.string().trim().max(120).optional().default(''),
  details: z.string().trim().max(2000).optional().default(''),
  companyWebsite: z.string().max(200).optional().default(''),
})

type RequirementDocument = Document & {
  fullName: string
  email: string
  phone: string | null
  interest: string
  preferredLocation: string
  budgetRange: string | null
  details: string | null
  ipHash: string
  status: string
  createdAt: Date
}

type RateLimitDocument = Document & {
  ipHash: string
  windowStart: Date
  count: number
  expireAt: Date
}

function jsonResponse(message: string, status: number) {
  return NextResponse.json(
    { message },
    { status, headers: { 'Cache-Control': 'no-store' } }
  )
}

let indexesPromise: Promise<void> | undefined

async function getCollections() {
  const client = await clientPromise
  const database = client.db('hsb_associates')

  const requirements = database.collection<RequirementDocument>(
    'hsb_property_requirements'
  )

  const rateLimits = database.collection<RateLimitDocument>(
    'hsb_rate_limits'
  )

  indexesPromise ??= Promise.all([
    requirements.createIndex({ createdAt: -1 }),
    requirements.createIndex({ ipHash: 1, createdAt: -1 }),
    rateLimits.createIndex(
      { ipHash: 1, windowStart: 1 },
      { unique: true }
    ),
    rateLimits.createIndex(
      { expireAt: 1 },
      { expireAfterSeconds: 0 }
    ),
  ]).then(() => undefined)

  await indexesPromise

  return { requirements, rateLimits }
}

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return jsonResponse('Please submit a valid form.', 400)
  }

  const parsed = requirementSchema.safeParse(body)

  if (!parsed.success) {
    return jsonResponse(
      'Please check the form fields and try again.',
      400
    )
  }

  if (parsed.data.companyWebsite) {
    return NextResponse.json(
      { message: 'Thank you. Your requirement has been received.' },
      { headers: { 'Cache-Control': 'no-store' } }
    )
  }

  const forwardedFor = request.headers
    .get('x-forwarded-for')
    ?.split(',')[0]
    ?.trim()

  const clientIp =
    request.headers.get('x-real-ip')?.trim() ||
    forwardedFor ||
    'unknown'

  const ipHash = createHash('sha256')
    .update(clientIp)
    .digest('hex')

  try {
    const { requirements, rateLimits } = await getCollections()

    // Fixed 15-minute rate-limit window.
    const now = new Date()
    const windowMs = 15 * 60 * 1000
    const windowStart = new Date(
      Math.floor(now.getTime() / windowMs) * windowMs
    )

    try {
      await rateLimits.updateOne(
        { ipHash, windowStart },
        {
          $inc: { count: 1 },
          $setOnInsert: {
            expireAt: new Date(windowStart.getTime() + 60 * 60 * 1000),
          },
        },
        { upsert: true }
      )
    } catch (error) {
      // Handle simultaneous first requests for the same IP.
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 11000
      ) {
        await rateLimits.updateOne(
          { ipHash, windowStart },
          { $inc: { count: 1 } }
        )
      } else {
        throw error
      }
    }

    const rateLimit = await rateLimits.findOne({
      ipHash,
      windowStart,
    })

    if ((rateLimit?.count ?? 0) > 5) {
      return jsonResponse(
        'Too many requests. Please try again in a little while.',
        429
      )
    }

    await requirements.insertOne({
      fullName: parsed.data.fullName,
      email: parsed.data.email.toLowerCase(),
      phone: parsed.data.phone || null,
      interest: parsed.data.interest,
      preferredLocation: parsed.data.preferredLocation,
      budgetRange: parsed.data.budgetRange || null,
      details: parsed.data.details || null,
      ipHash,
      status: 'new',
      createdAt: new Date(),
    })

    return NextResponse.json(
      {
        message:
          'Your requirement has been saved. HSB can follow up using the details you provided.',
      },
      {
        status: 201,
        headers: { 'Cache-Control': 'no-store' },
      }
    )
  } catch (error) {
    console.error('Requirements API error:', error)

    return jsonResponse(
      'We could not save your request right now. Please try again or contact HSB on WhatsApp.',
      503
    )
  }
}
