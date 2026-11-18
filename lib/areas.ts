export type AreaData = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  intro: string;
  location: string;
  motorway: string;
  motorwayDetail: string;
  gtRoad: string;
  mapQuery: string;
  mapEmbed: string;
  mapDirections: string;
  mapPdf: string | null;
  image: string;
  imageAlt: string;
  heroImage: string;
  heroAlt: string;
  categories: { label: string; items: string[] }[];
  landmarks: string[];
  distances: { destination: string; distance: string }[];
  whatsappText: string;
};

export const AREAS: AreaData[] = [
  {
    slug: "faisal-hills",
    name: "Faisal Hills",
    shortName: "Faisal Hills",
    tagline: "A growing society on main GT Road, near Taxila",
    intro:
      "Faisal Hills is a large housing society on the main GT Road (N-5), just before the Taxila Bypass. It sits between the M-1 Motorway and the Margalla foothills, with direct road access and open views of the hills.",
    location: "On main GT Road (N-5), near Taxila Bypass, between Islamabad and Wah Cantt",
    motorway: "M-1 Motorway",
    motorwayDetail:
      "The M-1 Islamabad-Peshawar Motorway is approximately 30 minutes away. Margalla Avenue connects to the motorway and central Islamabad. A 2.4 km link road connects Faisal Hills to Margalla Avenue.",
    gtRoad: "Direct access — the GT Road runs through the front of the society",
    mapQuery: "Faisal Hills Islamabad GT Road Taxila",
    mapEmbed:
      "https://www.google.com/maps?q=Faisal+Hills+Islamabad+GT+Road+Taxila&output=embed",
    mapDirections:
      "https://www.google.com/maps/search/?api=1&query=Faisal+Hills+GT+Road+Taxila+Islamabad",
    mapPdf: null,
    image: "https://images.pexels.com/photos/12938381/pexels-photo-12938381.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Hills and open sky near Faisal Hills, Islamabad",
    heroImage: "https://images.pexels.com/photos/33302319/pexels-photo-33302319.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    heroAlt: "Sunset view of Margalla Hills near Faisal Hills, Islamabad",
    categories: [
      { label: "Residential Plots", items: ["5 Marla", "10 Marla", "1 Kanal"] },
      { label: "Houses", items: ["Ready houses", "Under construction"] },
      { label: "Commercial", items: ["Commercial plots", "Shops in markaz"] },
    ],
    landmarks: [
      "Taxila Bypass",
      "Margalla Hills foothills",
      "Margalla Avenue link road",
      "Nearby B-17 Multi Gardens (Block G connects to Faisal Hills C Block)",
      "UET Taxila, a short drive away",
    ],
    distances: [
      { destination: "GT Road access", distance: "Direct (0 km)" },
      { destination: "Margalla Avenue", distance: "~2.4 km" },
      { destination: "M-1 Motorway", distance: "~30 min drive" },
      { destination: "Taxila city", distance: "~2 min drive" },
      { destination: "Islamabad (central)", distance: "~15-20 min drive" },
      { destination: "Islamabad International Airport", distance: "~30-35 min drive" },
    ],
    whatsappText:
      "Assalam o Alaikum, I would like to ask about a property in Faisal Hills.",
  },
  {
    slug: "b-17-multi-gardens",
    name: "B-17 Multi Gardens",
    shortName: "B-17 Multi Gardens",
    tagline: "Our home ground — a CDA-approved sector at the foot of the Margalla Hills",
    intro:
      "B-17 Multi Gardens is a CDA-approved sector in Zone II of Islamabad, developed by MPCHS. It runs from Block A to Block G beside the GT Road, with the M-1 Motorway to the west and the Margalla foothills close by. Our office is on road MR-11 in Block C.",
    location: "CDA Sector B-17, Zone II, Islamabad — between GT Road (N-5) and M-1 Motorway",
    motorway: "M-1 Motorway (Sangjani Toll Plaza)",
    motorwayDetail:
      "B-17 is the first sector you reach on the M-1 coming from Peshawar. The Sangjani Toll Plaza is about 12 minutes away. A dedicated motorway interchange has been planned by NHA.",
    gtRoad: "Two entrances on GT Road (Gate 1 and Gate 2), with a future gate planned from the M-1 side",
    mapQuery: "Multi Gardens B-17 Islamabad",
    mapEmbed:
      "https://www.google.com/maps?q=Multi+Gardens+B-17+Islamabad&output=embed",
    mapDirections:
      "https://www.google.com/maps/search/?api=1&query=MRQC%2B39+Islamabad",
    mapPdf: null,
    image: "https://images.pexels.com/photos/19995192/pexels-photo-19995192.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Tree-lined road in Islamabad near B-17 Multi Gardens",
    heroImage: "https://images.pexels.com/photos/38773558/pexels-photo-38773558.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    heroAlt: "Aerial view of Islamabad with highways and mountains at dusk",
    categories: [
      { label: "Residential Plots", items: ["All blocks, A to G", "5 Marla to 1 Kanal"] },
      { label: "Houses", items: ["Ready houses", "Under construction"] },
      { label: "Commercial", items: ["Shops", "Offices", "Markaz plots"] },
      { label: "Rentals", items: ["Houses", "Portions", "Shops"] },
    ],
    landmarks: [
      "Sangjani Toll Plaza (M-1 Motorway)",
      "Sangjani Flyover on GT Road",
      "Margalla Hills views",
      "Multi Gardens Zoo Park, B-17",
      "Jamia Muhammadi Masjid, B-17",
      "Faisal Hills (Block G connects directly)",
    ],
    distances: [
      { destination: "GT Road access", distance: "~2 min drive" },
      { destination: "Margalla Avenue", distance: "~5 min drive" },
      { destination: "Sangjani Toll Plaza (M-1)", distance: "~12 min drive" },
      { destination: "Blue Area, Islamabad", distance: "~25 min drive" },
      { destination: "Islamabad International Airport", distance: "~30 min drive" },
    ],
    whatsappText:
      "Assalam o Alaikum, I would like to ask about a property in B-17 Multi Gardens.",
  },
  {
    slug: "faisal-town-phase-1",
    name: "Faisal Town Phase 1",
    shortName: "Faisal Town Phase 1",
    tagline: "A residential project near the M-1 Motorway, close to Islamabad",
    intro:
      "Faisal Town Phase 1 sits in Sector F-18, Islamabad, near the M-1 Motorway toll plaza and the Rawalpindi-Kohat Road. It was launched in 2014 as the Faisal Town Group's first project, offering residential plots and houses with direct access to the motorway network.",
    location: "Sector F-18, Islamabad — near the M-1 Motorway toll plaza and Rawalpindi-Kohat Road",
    motorway: "M-1 Motorway (Fateh Jang Interchange)",
    motorwayDetail:
      "Faisal Town Phase 1 is located right next to the Fateh Jang Interchange on the M-1 Motorway, giving residents direct motorway access. It is closer to Islamabad than Faisal Hills.",
    gtRoad: "Near the GT Road, accessible via the Rawalpindi-Kohat Road link",
    mapQuery: "Faisal Town Phase 1 Islamabad F-18",
    mapEmbed:
      "https://www.google.com/maps?q=Faisal+Town+Phase+1+Islamabad+F-18&output=embed",
    mapDirections:
      "https://www.google.com/maps/search/?api=1&query=Faisal+Town+Phase+1+F-18+Islamabad",
    mapPdf: null,
    image: "https://images.pexels.com/photos/12998043/pexels-photo-12998043.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Mountain valley landscape near Faisal Town, Islamabad",
    heroImage: "https://images.pexels.com/photos/32017212/pexels-photo-32017212.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    heroAlt: "Stone house amidst Margalla Hills near Faisal Town",
    categories: [
      { label: "Residential Plots", items: ["5 Marla", "10 Marla", "1 Kanal"] },
      { label: "Houses", items: ["Ready houses", "Under construction"] },
      { label: "Commercial", items: ["Commercial plots", "Shops"] },
    ],
    landmarks: [
      "M-1 Motorway toll plaza",
      "Fateh Jang Interchange",
      "Rawalpindi-Kohat Road",
      "Nearby B-17 Multi Gardens",
      "Margalla Hills views",
    ],
    distances: [
      { destination: "M-1 Motorway (Fateh Jang Interchange)", distance: "Direct access" },
      { destination: "GT Road", distance: "Short drive via Kohat Road" },
      { destination: "B-17 Multi Gardens", distance: "Nearby" },
      { destination: "Islamabad (central)", distance: "~15-20 min drive" },
      { destination: "Islamabad International Airport", distance: "~25-30 min drive" },
    ],
    whatsappText:
      "Assalam o Alaikum, I would like to ask about a property in Faisal Town Phase 1.",
  },
  {
    slug: "faisal-town-phase-2",
    name: "Faisal Town Phase 2",
    shortName: "Faisal Town Phase 2",
    tagline: "Near Thalian Interchange on the M-2 Motorway",
    intro:
      "Faisal Town Phase 2 is located near the Thalian Interchange on the Lahore-Islamabad (M-2) Motorway, positioned between Chakri Road and the motorway. It offers residential and commercial plots with convenient motorway access to both Islamabad and Lahore.",
    location: "Near Thalian Interchange, M-2 Motorway — between Chakri Road and the M-2",
    motorway: "M-2 Motorway (Thalian Interchange)",
    motorwayDetail:
      "The Thalian Interchange lies just 2 kilometres away, giving residents quick and direct access to the motorway network connecting Islamabad and Lahore.",
    gtRoad: "Accessible via Chakri Road, which connects to the GT Road",
    mapQuery: "Faisal Town Phase 2 Islamabad Thalian Interchange",
    mapEmbed:
      "https://www.google.com/maps?q=Faisal+Town+Phase+2+Thalian+Interchange+Islamabad&output=embed",
    mapDirections:
      "https://www.google.com/maps/search/?api=1&query=Faisal+Town+Phase+2+Thalian+Interchange+Islamabad",
    mapPdf: null,
    image: "https://images.pexels.com/photos/12938381/pexels-photo-12938381.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Hills and open sky near Faisal Town Phase 2",
    heroImage: "https://images.pexels.com/photos/13458601/pexels-photo-13458601.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    heroAlt: "Aerial view of green hills in Punjab, Pakistan",
    categories: [
      { label: "Residential Plots", items: ["5 Marla", "10 Marla", "1 Kanal"] },
      { label: "Houses", items: ["Ready houses", "Under construction"] },
      { label: "Commercial", items: ["Commercial plots", "Shops"] },
    ],
    landmarks: [
      "Thalian Interchange (M-2 Motorway)",
      "Chakri Road",
      "M-2 Lahore-Islamabad Motorway",
      "New Islamabad International Airport (via motorway)",
    ],
    distances: [
      { destination: "Thalian Interchange (M-2)", distance: "~2 km" },
      { destination: "Chakri Road", distance: "Direct access" },
      { destination: "Islamabad (central)", distance: "~30-40 min drive" },
      { destination: "Islamabad International Airport", distance: "~20-25 min drive" },
      { destination: "Rawat", distance: "~15 min drive via motorway" },
    ],
    whatsappText:
      "Assalam o Alaikum, I would like to ask about a property in Faisal Town Phase 2.",
  },
  {
    slug: "new-city-phase-2",
    name: "New City Phase 2",
    shortName: "New City Phase 2",
    tagline: "A growing society near Wah Cantt, close to the M-1 Motorway",
    intro:
      "New City Phase 2 is a modern housing society in Wah Cantt, Rawalpindi District. It is strategically located close to the M-1 Motorway and the GT Road, with direct access via the Brahma Bahtar Interchange. The society offers affordable residential and commercial plots.",
    location: "Wah Cantt, Rawalpindi District, Punjab — near Brahma Bahtar Interchange on M-1",
    motorway: "M-1 Motorway (Brahma Bahtar Interchange)",
    motorwayDetail:
      "The Brahma Bahtar Interchange on the M-1 Motorway is just 2 minutes away, connecting the society directly to Islamabad and Peshawar. The GT Road is about 3 minutes away.",
    gtRoad: "Approximately 3 minutes from the GT Road (N-5)",
    mapQuery: "New City Phase 2 Wah Cantt",
    mapEmbed:
      "https://www.google.com/maps?q=New+City+Phase+2+Wah+Cantt&output=embed",
    mapDirections:
      "https://www.google.com/maps/search/?api=1&query=New+City+Phase+2+Wah+Cantt",
    mapPdf: null,
    image: "https://images.pexels.com/photos/11201060/pexels-photo-11201060.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Drone view of a residential neighborhood near New City Phase 2",
    heroImage: "https://images.pexels.com/photos/38843330/pexels-photo-38843330.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    heroAlt: "Row of suburban houses under a clear sky",
    categories: [
      { label: "Residential Plots", items: ["5 Marla", "10 Marla", "1 Kanal"] },
      { label: "Houses", items: ["Ready houses", "Under construction"] },
      { label: "Commercial", items: ["Commercial plots", "Shops"] },
    ],
    landmarks: [
      "Brahma Bahtar Interchange (M-1 Motorway)",
      "GT Road (N-5)",
      "Wah Cantt city",
      "Taxila city",
      "Hassan Abdal",
      "Nearby Faisal Hills (motorway-side blocks connect to Faisal Hills)",
    ],
    distances: [
      { destination: "Brahma Bahtar Interchange (M-1)", distance: "~2 min drive" },
      { destination: "GT Road", distance: "~3 min drive" },
      { destination: "Wah Cantt", distance: "~10-15 min drive" },
      { destination: "Taxila", distance: "~20-25 min drive" },
      { destination: "Islamabad", distance: "~30-40 min drive" },
      { destination: "Islamabad International Airport", distance: "~20 min drive" },
    ],
    whatsappText:
      "Assalam o Alaikum, I would like to ask about a property in New City Phase 2.",
  },
  {
    slug: "d-17",
    name: "D-17",
    shortName: "D-17",
    tagline: "A CDA-approved sector near GT Road and the M-1 Motorway",
    intro:
      "D-17 is a CDA-approved sector in Zone II of Islamabad, located near the GT Road and the M-1 Motorway. It is close to B-17 Multi Gardens and offers access to both Islamabad and Rawalpindi. The area includes schools, parks, mosques and shopping centres, making it an affordable option for families.",
    location: "CDA Sector D-17, Zone II, Islamabad — near GT Road and Sangjani Toll Plaza",
    motorway: "M-1 Motorway (Sangjani Toll Plaza)",
    motorwayDetail:
      "D-17 is close to the Sangjani Toll Plaza on the M-1 Motorway, providing convenient access to Islamabad and Peshawar. The GT Road entrance is reachable in about 15-16 minutes from the interior of the sector.",
    gtRoad: "Near the GT Road, with access before the Sangjani Toll Plaza",
    mapQuery: "D-17 Islamabad sector",
    mapEmbed:
      "https://www.google.com/maps?q=D-17+Islamabad+sector&output=embed",
    mapDirections:
      "https://www.google.com/maps/search/?api=1&query=D-17+Islamabad",
    mapPdf: null,
    image: "https://images.pexels.com/photos/19995183/pexels-photo-19995183.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Tree-lined road near D-17, Islamabad",
    heroImage: "https://images.pexels.com/photos/38773558/pexels-photo-38773558.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    heroAlt: "Aerial view of Islamabad with highways and mountains at dusk",
    categories: [
      { label: "Residential Plots", items: ["Various sizes available"] },
      { label: "Houses", items: ["Ready houses", "Under construction"] },
      { label: "Commercial", items: ["Shops", "Commercial plots"] },
    ],
    landmarks: [
      "GT Road (N-5)",
      "Sangjani Toll Plaza (M-1 Motorway)",
      "B-17 Multi Gardens (nearby)",
      "Tarnol (nearby town)",
      "Margalla Hills views",
    ],
    distances: [
      { destination: "GT Road", distance: "~15-16 min drive from interior" },
      { destination: "Sangjani Toll Plaza (M-1)", distance: "Nearby" },
      { destination: "B-17 Multi Gardens", distance: "Adjacent" },
      { destination: "Islamabad (central)", distance: "~25-30 min drive" },
      { destination: "Islamabad International Airport", distance: "~30 min drive" },
    ],
    whatsappText:
      "Assalam o Alaikum, I would like to ask about a property in D-17, Islamabad.",
  },
  {
    slug: "e-17",
    name: "E-17",
    shortName: "E-17",
    tagline: "A CDA sector in Zone II, near GT Road and the Margalla Hills",
    intro:
      "E-17 is a CDA sector in Zone II of Islamabad, located near the GT Road and the M-1 Motorway corridor. It is close to D-17 and B-17 Multi Gardens, offering access to Islamabad and Rawalpindi via the GT Road and motorway network. The Margalla Hills form a scenic backdrop to the area.",
    location: "CDA Sector E-17, Zone II, Islamabad — near GT Road, close to D-17 and B-17",
    motorway: "M-1 Motorway (Sangjani Toll Plaza area)",
    motorwayDetail:
      "E-17 is in the same corridor as D-17 and B-17, with access to the M-1 Motorway via the Sangjani area. The GT Road provides the primary road link.",
    gtRoad: "Near the GT Road (N-5), with access via connecting roads",
    mapQuery: "E-17 Islamabad sector",
    mapEmbed:
      "https://www.google.com/maps?q=E-17+Islamabad+sector&output=embed",
    mapDirections:
      "https://www.google.com/maps/search/?api=1&query=E-17+Islamabad",
    mapPdf: null,
    image: "https://images.pexels.com/photos/12998043/pexels-photo-12998043.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Valley landscape near E-17, Islamabad",
    heroImage: "https://images.pexels.com/photos/32017212/pexels-photo-32017212.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    heroAlt: "Stone house amidst Margalla Hills near E-17",
    categories: [
      { label: "Residential Plots", items: ["Various sizes available"] },
      { label: "Houses", items: ["Ready houses", "Under construction"] },
      { label: "Commercial", items: ["Shops", "Commercial plots"] },
    ],
    landmarks: [
      "GT Road (N-5)",
      "M-1 Motorway corridor",
      "D-17 (adjacent sector)",
      "B-17 Multi Gardens (nearby)",
      "Margalla Hills foothills",
    ],
    distances: [
      { destination: "GT Road", distance: "Nearby via connecting roads" },
      { destination: "D-17", distance: "Adjacent" },
      { destination: "B-17 Multi Gardens", distance: "Nearby" },
      { destination: "Islamabad (central)", distance: "~25-30 min drive" },
      { destination: "Islamabad International Airport", distance: "~30-35 min drive" },
    ],
    whatsappText:
      "Assalam o Alaikum, I would like to ask about a property in E-17, Islamabad.",
  },
];

export const getArea = (slug: string) => AREAS.find((a) => a.slug === slug);
