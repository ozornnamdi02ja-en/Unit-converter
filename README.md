# Rosetta — Universal Unit Converter

A Next.js + Tailwind CSS unit converter covering 18 categories across
mathematics, physics, chemistry, computing, and everyday measurement:

- **Mechanics** — Length, Mass, Area, Volume, Time, Speed, Force, Pressure, Torque, Density
- **Energy & Power** — Energy, Power, Frequency
- **Chemistry** — Amount of Substance (moles), Molar Concentration
- **Computing** — Data Storage (decimal + binary units)
- **Earth & Everyday** — Temperature, Angle, Fuel Economy

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  layout.tsx       Root layout, fonts, global styles
  page.tsx          Home page
  globals.css       Tailwind directives + custom grid/tape utilities
components/
  UnitConverter.tsx Main interactive converter (client component)
lib/
  units.ts          Conversion data + logic for all 18 categories
```

## Adding a new category

Open `lib/units.ts` and add an entry to the `CATS` object. Most categories
are `type: "linear"` — just give each unit a `factor` expressed in the
category's SI base unit. For non-linear relationships (like temperature or
fuel economy), use `type: "special"` and provide `toBase` / `fromBase`
functions instead. Add the category's `group` to `GROUP_ORDER` if it's new.

## Tech

- [Next.js 14](https://nextjs.org/) (App Router)
- [Tailwind CSS 3](https://tailwindcss.com/)
- TypeScript
- `next/font` for Fraunces, Inter, and IBM Plex Mono
