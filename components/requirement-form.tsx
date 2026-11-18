
'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, Check, MessageCircle, Send } from 'lucide-react'
import { requirementTypes } from '@/lib/requirements'

type RequirementFormProps = {
  variant: 'hero' | 'contact'
}

const WHATSAPP_NUMBER = '923359548102'

export function RequirementForm({ variant }: RequirementFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [whatsappUrl, setWhatsappUrl] = useState('')

  const compact = variant === 'hero'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (submitting) return

    setSubmitting(true)
    setError('')

    const form = event.currentTarget
    const formData = new FormData(form)

    if (formData.get('companyWebsite')) {
      setSubmitting(false)
      return
    }

    const payload = Object.fromEntries(formData.entries())

    const selectedInterest = requirementTypes.find(
      (option) => option.value === String(payload.interest)
    )

    const message = [
      'Hello HSB Associates & Builders!',
      '',
      'I would like to share my property requirement.',
      '',
      `Name: ${payload.fullName}`,
      `Email: ${payload.email}`,
      `Interest: ${selectedInterest?.label || payload.interest}`,
      `Preferred Area: ${payload.preferredLocation}`,
      `Phone: ${payload.phone || 'Not provided'}`,
      `Budget: ${payload.budgetRange || 'Not specified'}`,
      `Additional Details: ${payload.details || 'Not provided'}`,
      '',
      'Please contact me regarding my requirement.',
    ].join('\n')

    const generatedWhatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

    try {
      const response = await fetch('/api/requirements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json() as { message?: string }

      if (!response.ok) {
        setError(
          result.message || 'Could not save your requirement. Please try again.'
        )
        return
      }

      setWhatsappUrl(generatedWhatsappUrl)
      setSubmitted(true)
      form.reset()

      // Open WhatsApp after the database confirms the enquiry was saved.
      window.location.assign(generatedWhatsappUrl)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={`requirement-card requirement-card--${variant}`}>
      <div className="requirement-card__heading">
        <span className="eyebrow">
          <span className="eyebrow__dot" /> LET'S GET STARTED
        </span>

        <h2>
          {compact ? (
            <>Find your <em>next step.</em></>
          ) : (
            <>Your plans, <em>in your words.</em></>
          )}
        </h2>

        {compact && <p>Tell us what you're looking for.</p>}
      </div>

      {submitted ? (
        <div className="form-confirmation" role="status" aria-live="polite">
          <span className="form-confirmation__icon">
            <Check aria-hidden="true" />
          </span>

          <h3>Thank you for sharing!</h3>

          <p>
            Your requirement has been saved successfully.
            WhatsApp is ready with your enquiry message.
            Please press Send in WhatsApp to contact HSB.
          </p>

          <a
            className="text-link"
            href={whatsappUrl || `https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle aria-hidden="true" /> Open WhatsApp
          </a>

          <button
            className="text-link requirement-form__again"
            type="button"
            onClick={() => {
              setSubmitted(false)
              setWhatsappUrl('')
              setError('')
            }}
          >
            Send another requirement <ArrowRight aria-hidden="true" />
          </button>
        </div>
      ) : (
        <form className="requirement-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-field">
              <span>Your name</span>
              <input
                name="fullName"
                autoComplete="name"
                placeholder="Full name"
                maxLength={120}
                required
              />
            </label>

            <label className="form-field">
              <span>Email address</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                maxLength={254}
                required
              />
            </label>
          </div>

          <label className="form-field">
            <span>
              {compact ? "I'm interested in" : 'What are you interested in?'}
            </span>

            <select name="interest" defaultValue="" required>
              <option value="" disabled>Select a requirement</option>

              {requirementTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <div className="form-row">
            <label className="form-field">
              <span>Preferred area</span>
              <input
                name="preferredLocation"
                autoComplete="address-level2"
                placeholder="e.g. B-17, Islamabad"
                maxLength={160}
                required
              />
            </label>

            <label className="form-field">
              <span>Phone number <small>(optional)</small></span>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Your contact number"
                maxLength={40}
              />
            </label>
          </div>

          <label className="form-field">
            <span>Budget range <small>(optional)</small></span>
            <input
              name="budgetRange"
              placeholder="Your preferred range"
              maxLength={120}
            />
          </label>

          {!compact && (
            <label className="form-field">
              <span>Anything else? <small>(optional)</small></span>
              <textarea
                name="details"
                placeholder="Share any other details about your plans"
                maxLength={2000}
                rows={3}
              />
            </label>
          )}

          <label className="form-honeypot" aria-hidden="true">
            Website
            <input
              name="companyWebsite"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>

          {error && (
            <p className="requirement-form__error" role="alert">
              {error}
            </p>
          )}

          <button
            className="button button--dark requirement-form__submit"
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? 'Saving your requirement...'
              : compact
                ? 'Save & Continue to WhatsApp'
                : 'Save & Send via WhatsApp'}

            {!submitting && (
              compact
                ? <ArrowRight aria-hidden="true" />
                : <Send aria-hidden="true" />
            )}
          </button>

          <p className="requirement-form__privacy">
            Your enquiry is saved securely and shared with HSB through
            WhatsApp when you send your message.
          </p>
        </form>
      )}
    </div>
  )
}
