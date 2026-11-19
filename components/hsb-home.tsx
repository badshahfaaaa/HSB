import { ArrowRight, Landmark, Menu, MessageCircle } from 'lucide-react'
import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_LINK, WHATSAPP_EXPLORE_URL, WHATSAPP_SHARE_URL } from '@/lib/contact'
import { Planner } from './Planner'
import { TeamMembers } from './TeamMembers'
import {
  ContactSection,
  FeatureSection,
  HeroSection,
  IntroSection,
  JourneySection,
  ServicesSection,
} from '@/components/hsb-sections'

const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Plot details', href: '#plots' },
  { label: 'Your journey', href: '#journey' },
  { label: 'Our people', href: '#people' },
]

function Brand() {
  return (
    <a className="brand" href="#home" aria-label="HSB Associates and Builders home">
      <span className="brand__mark"><Landmark aria-hidden="true" /></span>
      <span className="brand__name">HSB<span>ASSOCIATES &amp; BUILDERS</span></span>
    </a>
  )
}

function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner page-shell">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="header-cta" href={WHATSAPP_EXPLORE_URL} target="_blank" rel="noreferrer">WhatsApp HSB <MessageCircle aria-hidden="true" /></a>
        <details className="mobile-nav">
          <summary aria-label="Open navigation"><Menu aria-hidden="true" /></summary>
          <nav className="mobile-nav__panel" aria-label="Mobile navigation">
            {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
            <a href={WHATSAPP_EXPLORE_URL} target="_blank" rel="noreferrer">WhatsApp HSB <MessageCircle aria-hidden="true" /></a>
          </nav>
        </details>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell site-footer__inner">
        <Brand />
        <div className="site-footer__contact">
          <p>Property, construction and community—<br />a considered next step in Islamabad.</p>
          <a href={BUSINESS_PHONE_LINK}>{BUSINESS_PHONE_DISPLAY}</a>
          <a href={WHATSAPP_EXPLORE_URL} target="_blank" rel="noreferrer">Explore possibilities on WhatsApp <MessageCircle aria-hidden="true" /></a>
          <a href={WHATSAPP_SHARE_URL} target="_blank" rel="noreferrer">Share HSB on WhatsApp <MessageCircle aria-hidden="true" /></a>
        </div>
        <a href="#home" className="site-footer__top">Back to top <ArrowRight aria-hidden="true" /></a>
      </div>
      <div className="page-shell site-footer__bottom">
        <span>© {new Date().getFullYear()} HSB Associates &amp; Builders</span>
        <span>Islamabad, Pakistan</span>
      </div>
    </footer>
  )
}

export function HsbHome() {
  return (
    <main className="hsb-site">
      <Header />
      <HeroSection />
      <IntroSection />
      <ServicesSection />
      <section className="planner-section" id="plots"><Planner /></section>
      <JourneySection />
      <TeamMembers />
      <FeatureSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
