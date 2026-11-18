import Image from 'next/image'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  Compass,
  DraftingCompass,
  Handshake,
  Home,
  KeyRound,
  Landmark,
  MapPin,
  MessageCircle,
  MoveUpRight,
  Phone,
  Sparkles,
} from 'lucide-react'
import { RequirementForm } from '@/components/requirement-form'
import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_LINK, WHATSAPP_EXPLORE_URL } from '@/lib/contact'

const imageSources = {
  city: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/city-morning-co0sTfKuhXZ1wjFeWr49JLLqWdGQGi.webp',
  aerial: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aerial-1920-kHAyQnedLnbIc74JW4rXWK3a4Tj0aa.webp',
  hills: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/faisal-hills-cornice-wide-bgEdPEXzs2NGOCm0ivZZwXcZUP1aqu.webp',
  interior: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/interior-T2GUPxzh8XMttx9Zne7MUjHMPeV1B9.webp',
  blossom: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blossom-1920-WWjhk4EuV9G2HXfA7j4RUHhp2mfje6.webp',
  sketch: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/house-design-Oej7IV1FkWODR6veP8h7ioEzG99m7l.webp',
  bricklayer: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bricklayer-JKq4rcO5DyxHVpkztgypo0qWQdbZ1D.webp',
  ridge: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ridge-2000-5Fs4kAkSRgMp4FDq6nPIaqsgqLqJsw.webp',
}

const services = [
  {
    number: '01',
    title: 'Property investment',
    description: 'Explore opportunities across Islamabad’s evolving communities with a clear view of your next step.',
    image: imageSources.aerial,
    alt: 'A wide view across Islamabad and its surrounding hills',
    icon: Landmark,
  },
  {
    number: '02',
    title: 'Buying property',
    description: 'Share what you have in mind and make your way toward a property that feels right for you.',
    image: imageSources.interior,
    alt: 'A bright, contemporary residential living room',
    icon: Home,
  },
  {
    number: '03',
    title: 'Selling property',
    description: 'Start a conversation about your property and the outcome you want to achieve.',
    image: imageSources.city,
    alt: 'A clear morning view over the city from the hills',
    icon: ArrowUpRight,
  },
  {
    number: '04',
    title: 'Construction',
    description: 'From an early idea to the details of a build, bring your next project into focus.',
    image: imageSources.hills,
    alt: 'Illuminated architectural details on a Faisal Hills building',
    icon: DraftingCompass,
  },
  {
    number: '05',
    title: 'Community guidance',
    description: 'Get to know the Islamabad communities that could be the right setting for your plans.',
    image: imageSources.blossom,
    alt: 'Spring blossoms in front of a green hillside',
    icon: Compass,
  },
]

const journey = [
  {
    number: '01',
    title: 'Start a conversation',
    text: 'Tell us a little about what you are looking for and how you would like to move forward.',
    icon: Handshake,
  },
  {
    number: '02',
    title: 'Understand your needs',
    text: 'We’ll take time to understand your goals, preferred location and requirements.',
    icon: Compass,
  },
  {
    number: '03',
    title: 'Explore the possibilities',
    text: 'Review relevant options and discuss the details before deciding on a next step.',
    icon: Building2,
  },
  {
    number: '04',
    title: 'Move forward with confidence',
    text: 'When you are ready, continue toward your property or project with the details in view.',
    icon: KeyRound,
  },
]

export function HeroSection() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <Image
        className="hero__image"
        src={imageSources.ridge}
        alt="Islamabad framed by the Margalla Hills at dusk"
        fill
        priority
        sizes="100vw"
        unoptimized
      />
      <div className="hero__veil" />
      <div className="hero__content page-shell">
        <div className="hero__copy">
          <span className="eyebrow eyebrow--light"><span className="eyebrow__dot" /> HSB ASSOCIATES &amp; BUILDERS</span>
          <h1 id="hero-title">Building trust.<br /><em>Shaping communities.</em></h1>
          <p>Your trusted partner in property investment, buying, selling and construction across Islamabad&apos;s most promising communities.</p>
          <div className="hero__actions">
            <a className="button button--sand" href="#requirements">Share your requirement <ArrowRight aria-hidden="true" /></a>
            <a className="button button--ghost" href={WHATSAPP_EXPLORE_URL} target="_blank" rel="noreferrer">Explore on WhatsApp <MessageCircle aria-hidden="true" /></a>
          </div>
          <div className="hero__location"><MapPin aria-hidden="true" /> Islamabad, Pakistan</div>
          <div className="hero__stats" aria-label="HSB experience and sales">
            <div><strong>10</strong><span>Years experience</span></div>
            <div><strong>25+</strong><span>Properties sold</span></div>
          </div>
        </div>
        <div className="hero__form-wrap" id="requirements">
          <RequirementForm variant="hero" />
        </div>
      </div>
      <a className="hero__scroll" href="#about" aria-label="Scroll to the HSB introduction">
        <span>Scroll to explore</span><span className="hero__scroll-line" />
      </a>
      <div className="hero__caption">A considered approach to property.</div>
    </section>
  )
}

export function IntroSection() {
  return (
    <section className="intro section-pad" id="about" aria-labelledby="intro-title">
      <div className="page-shell intro__grid">
        <div className="intro__heading">
          <span className="eyebrow"><span className="eyebrow__dot" /> ROOTED IN ISLAMABAD</span>
          <h2 id="intro-title">A place to put down roots. <em>A partner to move forward.</em></h2>
        </div>
        <div className="intro__body">
          <p className="intro__lead">At HSB Associates &amp; Builders, we help people take their next step in property—from exploring a community to bringing a building project to life.</p>
          <p>Whether you are considering an investment, buying or selling property, or planning a build, we begin by understanding what matters to you.</p>
          <a className="text-link" href="#services">Get to know what we do <ArrowUpRight aria-hidden="true" /></a>
        </div>
        <div className="intro__image-wrap">
          <Image src={imageSources.aerial} alt="The city and surrounding landscape viewed from the hills" fill sizes="(max-width: 760px) 100vw, 55vw" unoptimized />
          <div className="intro__image-note"><MapPin aria-hidden="true" /><span>B-17<br /><small>Islamabad</small></span></div>
        </div>
        <div className="intro__stamp"><span>LOCAL<br />PERSPECTIVE</span><Sparkles aria-hidden="true" /></div>
      </div>
    </section>
  )
}

export function ServicesSection() {
  return (
    <section className="services section-pad" id="services" aria-labelledby="services-title">
      <div className="page-shell">
        <div className="section-heading section-heading--row">
          <div>
            <span className="eyebrow"><span className="eyebrow__dot" /> WHAT WE DO</span>
            <h2 id="services-title">Good decisions start <em>with good guidance.</em></h2>
          </div>
          <p>From your first question to the next step, we bring property and construction conversations into focus.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <article className="service-card" key={service.number}>
                <div className="service-card__image">
                  <Image src={service.image} alt={service.alt} fill sizes="(max-width: 760px) 100vw, (max-width: 1050px) 50vw, 33vw" unoptimized />
                  <span className="service-card__number">{service.number}</span>
                  <span className="service-card__icon"><Icon aria-hidden="true" /></span>
                </div>
                <div className="service-card__body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <a href="#requirements" aria-label={`Ask HSB about ${service.title}`}><span>Discuss your plans</span><MoveUpRight aria-hidden="true" /></a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function PlotSection() {
  return (
    <section className="plot section-pad" id="plots" aria-labelledby="plot-title">
      <div className="page-shell plot__grid">
        <div className="plot__image">
          <Image src={imageSources.sketch} alt="A vintage architectural drawing of a house facade; it is not a plot plan" fill sizes="(max-width: 760px) 100vw, 50vw" unoptimized />
          <span className="plot__image-label">ARCHITECTURAL STUDY</span>
        </div>
        <div className="plot__copy">
          <span className="eyebrow eyebrow--light"><span className="eyebrow__dot" /> PROPERTY, WITH CLARITY</span>
          <h2 id="plot-title">Size Up Your Plot</h2>
          <p>The supplied project files do not include the original plot options or floor-plan details. We won’t guess at sizes or pricing. Ask HSB for the verified information for your preferred location.</p>
          <a className="button button--sand" href={WHATSAPP_EXPLORE_URL} target="_blank" rel="noreferrer">Explore plot options on WhatsApp <MessageCircle aria-hidden="true" /></a>
          <div className="plot__note"><Check aria-hidden="true" /><span>The supplied sketch is an architectural elevation, not a plot or floor plan.</span></div>
        </div>
      </div>
    </section>
  )
}

export function JourneySection() {
  return (
    <section className="journey section-pad" id="journey" aria-labelledby="journey-title">
      <div className="page-shell">
        <div className="section-heading section-heading--center">
          <span className="eyebrow"><span className="eyebrow__dot" /> YOUR JOURNEY</span>
          <h2 id="journey-title">From first hello <em>to the keys in hand.</em></h2>
          <p>A thoughtful path through your property journey, shaped around your requirements.</p>
        </div>
        <div className="journey-grid">
          {journey.map((step) => {
            const Icon = step.icon
            return (
              <article className="journey-step" key={step.number}>
                <div className="journey-step__top"><span>{step.number}</span><Icon aria-hidden="true" /></div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <span className="journey-step__rule" />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function PeopleSection() {
  return (
    <section className="people section-pad" id="people" aria-labelledby="people-title">
      <div className="page-shell people__grid">
        <div className="people__image">
          <Image src={imageSources.bricklayer} alt="Archival black-and-white photograph of a bricklayer at work" fill sizes="(max-width: 760px) 100vw, 50vw" unoptimized />
          <span className="people__image-tag">THE VALUE OF CRAFT</span>
        </div>
        <div className="people__copy">
          <span className="eyebrow"><span className="eyebrow__dot" /> PEOPLE MAKE THE DIFFERENCE</span>
          <h2 id="people-title">Every build begins <em>with a conversation.</em></h2>
          <p>Property decisions are personal. Start a conversation with HSB Associates &amp; Builders about your plans, your questions and the people who can help you take the next step.</p>
          <a className="text-link" href="#requirements">Tell us what you have in mind <ArrowUpRight aria-hidden="true" /></a>
          <div className="people__disclosure">Individual team profiles and verified contact details were not present in the supplied project files.</div>
        </div>
      </div>
    </section>
  )
}

export function FeatureSection() {
  return (
    <section className="feature" aria-label="Faisal Hills architecture">
      <Image src={imageSources.hills} alt="Warm architectural lighting along the facade of Faisal Hills" fill sizes="100vw" unoptimized />
      <div className="feature__shade" />
      <div className="page-shell feature__content">
        <span className="eyebrow eyebrow--light"><span className="eyebrow__dot" /> THOUGHTFUL DESIGN, LASTING IMPRESSION</span>
        <h2>Spaces shaped<br /><em>for what comes next.</em></h2>
          <a href={WHATSAPP_EXPLORE_URL} target="_blank" rel="noreferrer" className="button button--sand">Talk about your project <MessageCircle aria-hidden="true" /></a>
      </div>
      <span className="feature__caption">Faisal Hills architecture · Supplied project photography</span>
    </section>
  )
}

export function ContactSection() {
  return (
    <section className="contact section-pad" id="contact" aria-labelledby="contact-title">
      <div className="page-shell contact__grid">
        <div className="contact__copy">
          <span className="eyebrow"><span className="eyebrow__dot" /> BEGIN HERE</span>
          <h2 id="contact-title">Tell us what <em>you’re looking for.</em></h2>
          <p>Share a few details and we’ll help you frame the next conversation. No commitment—just a clearer starting point.</p>
          <div className="contact__details"><MapPin aria-hidden="true" /><span>B-17, Islamabad<br /><small>HSB Associates &amp; Builders</small></span></div>
          <a className="contact__details contact__phone" href={BUSINESS_PHONE_LINK}><Phone aria-hidden="true" /><span>{BUSINESS_PHONE_DISPLAY}</span></a>
          <a className="contact__details contact__whatsapp" href={WHATSAPP_EXPLORE_URL} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /><span>Explore possibilities on WhatsApp</span></a>
        </div>
        <RequirementForm variant="contact" />
      </div>
    </section>
  )
}

export { imageSources }
