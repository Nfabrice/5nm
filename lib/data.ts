import { unsplash } from "./utils";

/**
 * Placeholder content for the 5N&M Apartments prototype.
 * Swap these for real listings (or a CMS / API) when the booking
 * backend is ready. Components only depend on the `Apartment` shape.
 */

export type Amenity =
  | "furnished"
  | "wifi"
  | "kitchen"
  | "parking"
  | "workspace"
  | "laundry";

export type Apartment = {
  id: string;
  number: string;
  name: string;
  type: string;
  neighbourhood: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  pricePerNight: number;
  tagline: string;
  description: string;
  amenities: Amenity[];
  cover: { src: string; alt: string };
  gallery: { src: string; alt: string }[];
};

export const apartments: Apartment[] = [
  {
    id: "residence-01",
    number: "01",
    name: "N&M Residence 01",
    type: "Residence",
    neighbourhood: "Gikondo",
    city: "Kigali",
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    pricePerNight: 85_000,
    tagline:
      "Designed for quiet mornings, productive days and comfortable evenings.",
    description:
      "A calm two-bedroom home with generous light, a full kitchen and a living room made for slow evenings. Everything is in place, so you can arrive and simply live.",
    amenities: ["furnished", "wifi", "kitchen", "parking"],
    cover: {
      src: unsplash("photo-1600210492486-724fe5c67fb0"),
      alt: "Bright living room with a soft sofa and large windows",
    },
    gallery: [
      {
        src: unsplash("photo-1600210492486-724fe5c67fb0"),
        alt: "Living room at N&M Residence 01",
      },
      {
        src: unsplash("photo-1505693416388-ac5ce068fe85"),
        alt: "Main bedroom with crisp white linen",
      },
      {
        src: unsplash("photo-1484154218962-a197022b5858"),
        alt: "Fully equipped kitchen",
      },
    ],
  },
  {
    id: "studio-02",
    number: "02",
    name: "N&M Studio 02",
    type: "Studio",
    neighbourhood: "Gikondo",
    city: "Kigali",
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    pricePerNight: 55_000,
    tagline: "A compact, considered studio for focused work and easy weekends.",
    description:
      "An efficient one-bedroom studio with a proper desk, fast Wi-Fi and a small kitchen. Ideal for business trips and solo stays.",
    amenities: ["furnished", "wifi", "kitchen", "workspace"],
    cover: {
      src: unsplash("photo-1737467023078-a694673d7cb3"),
      alt: "Bedroom with a bed and a desk by the window",
    },
    gallery: [
      {
        src: unsplash("photo-1737467023078-a694673d7cb3"),
        alt: "Studio sleeping and working area",
      },
      {
        src: unsplash("photo-1667510436110-79d3dabc2008"),
        alt: "Lounge corner with shelves and books",
      },
      {
        src: unsplash("photo-1552321554-5fefe8c9ef14"),
        alt: "Bathroom with clean, simple finishes",
      },
    ],
  },
  {
    id: "residence-03",
    number: "03",
    name: "N&M Residence 03",
    type: "Residence",
    neighbourhood: "Gikondo",
    city: "Kigali",
    bedrooms: 3,
    bathrooms: 3,
    guests: 6,
    pricePerNight: 140_000,
    tagline:
      "Room to gather, room to breathe. Made for families and longer stays.",
    description:
      "Our largest home, with three en-suite bedrooms, an open living and dining space, and parking. Built for families, teams and longer stays.",
    amenities: ["furnished", "wifi", "kitchen", "parking", "laundry"],
    cover: {
      src: unsplash("photo-1600585154526-990dced4db0d"),
      alt: "Open-plan living and dining space",
    },
    gallery: [
      {
        src: unsplash("photo-1600585154526-990dced4db0d"),
        alt: "Open-plan living area at Residence 03",
      },
      {
        src: unsplash("photo-1616594039964-ae9021a400a0"),
        alt: "Bedroom with warm, layered textures",
      },
      {
        src: unsplash("photo-1600566753190-17f0baa2a6c3"),
        alt: "Kitchen and dining area",
      },
    ],
  },
  {
    id: "loft-04",
    number: "04",
    name: "N&M Loft 04",
    type: "Loft",
    neighbourhood: "Gikondo",
    city: "Kigali",
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    pricePerNight: 65_000,
    tagline: "Open, airy and quietly social. A loft for couples and creatives.",
    description:
      "A light-filled one-bedroom loft with an open kitchen and lounge. Close to local restaurants and cafés.",
    amenities: ["furnished", "wifi", "kitchen", "workspace"],
    cover: {
      src: unsplash("photo-1680416124510-5eae1beca412"),
      alt: "Loft living room opening onto the kitchen",
    },
    gallery: [
      {
        src: unsplash("photo-1680416124510-5eae1beca412"),
        alt: "Loft living and kitchen",
      },
      {
        src: unsplash("photo-1737467034151-16e643c905c7"),
        alt: "Bedroom with a lamp and bookshelf",
      },
      {
        src: unsplash("photo-1502672260266-1c1ef2d93688"),
        alt: "Lounge with natural light",
      },
    ],
  },
];

export const amenityLabels: Record<Amenity, string> = {
  furnished: "Fully furnished",
  wifi: "Wi-Fi",
  kitchen: "Kitchen",
  parking: "Parking",
  workspace: "Workspace",
  laundry: "Laundry",
};

export const navLinks = [
  { label: "Apartments", href: "#apartments" },
  { label: "Location", href: "#location" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const principles = [
  {
    title: "Thoughtfully designed",
    body: "Spaces designed around comfort, simplicity and everyday living.",
  },
  {
    title: "Prime locations",
    body: "Conveniently located apartments within Kigali.",
  },
  {
    title: "Ready to live",
    body: "Fully furnished spaces designed to make settling in effortless.",
  },
  {
    title: "Made for your stay",
    body: "Whether you're visiting Rwanda, working remotely or staying longer.",
  },
];

export const images = {
  hero: {
    src: unsplash("photo-1600607687939-ce8a6c25118c"),
    alt: "Sunlit modern living room with floor-to-ceiling windows",
  },
  heroInset: {
    src: unsplash("photo-1746960996054-2d02cae5ef08"),
    alt: "A plant in front of a window overlooking the city",
  },
  about: {
    src: unsplash("photo-1560448204-e02f11c3d0e2"),
    alt: "Calm apartment living room with soft daylight",
  },
  kigali: {
    src: unsplash("photo-1687986261123-b17f08f2796c"),
    alt: "Sunset over the Kigali skyline",
  },
  kigaliHills: {
    src: unsplash("photo-1708772565588-33785e13aa46"),
    alt: "View across Kigali's hills",
  },
};

export const contact = {
  location: "Kigali, Rwanda",
  street: "KK 706 St",
  area: "Gikondo, Merez 2",
  address: "KK 706 St, Gikondo, Merez 2, Kigali, Rwanda",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=KK+706+St+Gikondo+Kigali+Rwanda",
  phone: "+250 738 834 750",
  email: "hello@5nm.rw",
  get phoneHref() {
    return `tel:${this.phone.replace(/\s/g, "")}`;
  },
  instagram: "https://instagram.com/",
  whatsapp: "https://wa.me/",
};

export const MAX_GUESTS = 6;
