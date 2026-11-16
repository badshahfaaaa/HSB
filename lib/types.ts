export type PropertyType =
  | "residential_plot"
  | "house"
  | "commercial_plot"
  | "shop"
  | "plaza"
  | "commercial_garage";

export type ListingType = "buy" | "sell" | "rent";

export type PropertyStatus = "available" | "sold" | "reserved";

export type InquiryStatus = "new" | "read" | "responded" | "archived";

export type Property = {
  id: string;
  title: string;
  description: string;
  property_type: PropertyType;
  listing_type: ListingType;
  area_slug: string;
  price: number;
  size_text: string;
  size_marla: number | null;
  block: string | null;
  status: PropertyStatus;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type PropertyImage = {
  id: string;
  property_id: string;
  image_url: string;
  position: number;
  created_at: string;
};

export type PropertyWithImages = Property & {
  images: PropertyImage[];
};

export type Inquiry = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string;
  property_id: string | null;
  area_slug: string | null;
  status: InquiryStatus;
  created_at: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string | null;
  phone: string | null;
  photo_url: string | null;
  position: number;
  created_at: string;
};

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  residential_plot: "Residential Plot",
  house: "House",
  commercial_plot: "Commercial Plot",
  shop: "Shop",
  plaza: "Plaza",
  commercial_garage: "Commercial Garage",
};

export const LISTING_TYPE_LABELS: Record<ListingType, string> = {
  buy: "Buy",
  sell: "Sell",
  rent: "Rent",
};

export const STATUS_LABELS: Record<PropertyStatus, string> = {
  available: "Available",
  sold: "Sold",
  reserved: "Reserved",
};

export const INQUIRY_STATUS_LABELS: Record<InquiryStatus, string> = {
  new: "New",
  read: "Read",
  responded: "Responded",
  archived: "Archived",
};

export const AREA_OPTIONS = [
  { slug: "faisal-hills", name: "Faisal Hills" },
  { slug: "b-17-multi-gardens", name: "B-17 Multi Gardens" },
  { slug: "faisal-town-phase-1", name: "Faisal Town Phase 1" },
  { slug: "faisal-town-phase-2", name: "Faisal Town Phase 2" },
  { slug: "new-city-phase-2", name: "New City Phase 2" },
  { slug: "d-17", name: "D-17" },
  { slug: "e-17", name: "E-17" },
];

export function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `PKR ${(price / 10000000).toFixed(1)} crore`;
  }
  if (price >= 100000) {
    return `PKR ${(price / 100000).toFixed(1)} lakh`;
  }
  return `PKR ${price.toLocaleString()}`;
}
