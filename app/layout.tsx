import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "HSB Associates & Builders | Property and construction in B-17, Islamabad",
  description:
    "HSB Associates & Builders buys, sells and builds on plots across B-17 Multi Gardens and Faisal Hills, Islamabad. Plot 1082-F & G, MR-11, Block C. Open 24 hours. Call 0335 9548102.",
  openGraph: {
    title: "HSB Associates & Builders",
    description: "We buy, sell and build on plots across B-17 Multi Gardens and Faisal Hills, Islamabad.",
    images: ["/assets/img/faisal-hills-cornice-wide.webp"],
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0e1410",
};

const bootScript = `(function(){var h=document.documentElement,c=h.classList;c.add('js');
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;c.add('motion');
if(location.search.indexOf('nointro')>-1){c.add('hero-in');return;}
c.add('intro-play','intro-on');
setTimeout(function(){if(c.contains('intro-play')){c.remove('intro-play','intro-on');c.add('hero-in');}},7000);})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "HSB Associates & Builders",
  telephone: "+92 335 9548102",
  openingHours: "Mo-Su 00:00-23:59",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot No. 1082F, 1082G, MR-11, B-17 Multi Gardens, Block C",
    addressLocality: "Islamabad",
    postalCode: "44000",
    addressCountry: "PK",
  },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "1" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${sora.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
