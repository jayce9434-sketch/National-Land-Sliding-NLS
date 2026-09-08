# National Landsliding Service

A mobile-friendly landslide warning and event-record website. The interface shows only landslide-related warnings and emergencies, keeps a shared record of observed events, and supports owner-reviewed LS ratings from `LS-1` through `LS-7`.

## Features

- United States warning map with state and county boundaries
- Automatically issued Day 1–3 rainfall-triggered landslide outlooks
- NLS outlook thresholds: Marginal 5%+, Slight 10%+, Enhanced 25%+, and High 60%+
- Three terrain-intensity zones using the USGS national county susceptibility screen
- Landslide Warning and Landslide Emergency filtering from current NWS alert text
- One-minute refresh while the site is open
- Browser notifications and an optional in-site alert sound
- Installable mobile web app with home-screen icons
- Shared current and past event record beginning with deployment of this version
- Owner-only, verified-email rating controls
- `LS-UR` for events that are unrated or below the LS scale
- Detailed event evidence including casualties, displacement, damage, dimensions, velocity, rainfall, slope, soil saturation, burn-scar status, infrastructure impact, and confidence

## Local development

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env.local` and set `NLS_OWNER_EMAIL` to the authenticated owner's email. Owner controls require the hosting platform's authenticated-user email header; changing a browser form or local storage value cannot grant owner access.

## Database

The project uses a Cloudflare D1 binding named `DB`. The schema is defined in `db/schema.ts`; generated migrations live in `drizzle/`.

Generate a new migration after changing the schema:

```bash
pnpm db:generate
```

## Outlook data

The automated outlook map refreshes NOAA Weather Prediction Center Day 1–3 excessive-rainfall polygons every minute and displays the USGS national landslide-susceptibility county analysis as the underlying terrain screen. NLS percentages are action thresholds; the WPC rainfall probabilities and USGS susceptibility values remain separate source measurements.

## Notifications

Browser notifications require user permission and HTTPS in production. The app checks for newly issued qualifying warnings every 60 seconds while it is open. Operating systems and browsers control whether notifications are delivered after the app or browser has been fully closed; guaranteed background delivery would require a push-notification server and service-worker subscription system.
