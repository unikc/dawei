# Dawei Design System v1.0

Dawei's design system follows the shadcn/ui open-code approach: semantic theme tokens, composable component APIs, carefully chosen defaults, and component source that lives inside the project.

## Brand Direction

- Product-forward industrial B2B
- Ductile iron valve specialist
- Technical clarity over decorative novelty
- Strong RFQ conversion without SaaS-style visual language

## Core Tokens

- `primary`: Valve Blue, used for primary navigation, links, and selected states
- `signal`: RFQ Orange, reserved for high-value conversion and warnings
- `navy`: authority surfaces, headers, and technical table headings
- `muted`: supporting sections, alternating rows, and helper content
- `border`: visible structure for cards, tables, and form controls
- `radius`: 2px base radius; the system remains intentionally square

Tokens are defined in `app/globals.css` and exposed through `tailwind.config.ts`.

## Components

Open-code primitives live in `components/ui`:

- `Button` and `buttonVariants`
- `Badge`
- `Card`
- `Input`
- `Textarea`
- `Alert`
- `Table`

Use `buttonVariants` when styling a Next.js `Link` as a button.

## Usage Rules

- Use Signal Orange only for RFQ actions, urgent qualification notes, and primary commercial emphasis.
- Use Valve Blue for normal primary interactions and product-navigation emphasis.
- Prefer visible borders and flat surfaces over floating, highly rounded cards.
- Product pages should expose standards, materials, dimensions, and qualification notes before the final CTA.
- Tables must use a horizontally scrollable wrapper on small screens.
- All interactive elements must have visible keyboard focus states.

## Living Reference

Visit `/design-system` in the website to review the current tokens and components.
