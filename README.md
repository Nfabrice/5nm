# 5N&M Apartments · Landing page

Premium landing page concept for 5N&M Apartments, KK 706 St, Gikondo (Merez 2), Kigali, Rwanda.
Booking is a frontend-only prototype (no backend, no payments).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4 (design tokens in `app/globals.css`)
- Framer Motion for reveals, the menu and the booking drawer
- Fonts: Cormorant Garamond (headings) + Manrope (UI), self-hosted via Fontsource
- lucide-react icons

## Where things live

```
app/
  layout.tsx            fonts + metadata
  page.tsx              composes the sections
  globals.css           colours, type scale, utilities
lib/
  data.ts               apartments, copy, images, contact (edit content here)
  dates.ts, utils.ts    small helpers (dates, RWF formatting)
  image-loader.ts       responsive Unsplash URLs for next/image
components/
  site/                 Navbar, Hero, FeaturedApartments, ApartmentPreview,
                        ApartmentShowcase, BookingSection, WhySection,
                        KigaliSection, CtaFooter, Wordmark
  booking/              BookingProvider (state), BookingPanel (search bar),
                        RangeCalendar, GuestStepper, AvailabilityDrawer
  ui/                   Button, SmartImage (with fallback), Reveal, SectionIntro
```

## How the booking prototype works

- `BookingProvider` holds dates, guests and the selected apartment.
- "View apartment" swaps the Residence showcase to that home and scrolls to it.
- "Check availability" opens `AvailabilityDrawer`, which fakes a short check and
  always returns "Available" with a price breakdown. "Continue booking" ends on a
  "coming soon" screen. Nothing is reserved.
- To connect a real backend, replace the mock `setTimeout` in
  `AvailabilityDrawer.tsx` with an API call. The rest of the UI can stay.

## Images

Photos are remote Unsplash placeholders (see `lib/data.ts`). If one fails to load,
`SmartImage` shows a neutral on-brand panel instead of a broken image.
For launch, drop real photos into `public/` and point `lib/data.ts` at them
(e.g. `src: "/apartments/residence-01.jpg"`).

Contact details (`+250 738 834 750`, social links) are placeholders.
