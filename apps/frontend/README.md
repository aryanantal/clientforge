# ClientForge Frontend

A modern Next.js frontend application with a comprehensive design system, responsive components, and optimized performance.

## Technology Stack

- **Framework**: Next.js 14+ (React 18+)
- **Styling**: Tailwind CSS + CSS Variables
- **Language**: TypeScript
- **Package Manager**: npm

## Project Structure

```
frontend/
├── app/
│   ├── components/           # Reusable React components
│   │   ├── Header.tsx       # Navigation header (responsive)
│   │   ├── Footer.tsx       # Site footer (responsive)
│   │   └── ...
│   ├── style-guide/         # Design system documentation
│   │   └── page.tsx         # Complete style guide page
│   ├── globals.css          # Global styles and design tokens
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Home page
│   └── ...
├── public/                  # Static assets
├── .env.local              # Environment variables (create this)
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS config
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies

```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm 9+ or equivalent package manager

### Installation

1. Navigate to the frontend directory:
```bash
cd apps/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with the following configuration:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
npm run start
```

## Design System

### Color Palette
All colors are defined as CSS variables in `globals.css` and exported as JavaScript constants in `apps/shared/constants/styleGuide.js`:

- **Primary**: #166534 (Dark Green)
- **Secondary**: #15803d (Medium Green)
- **Accent**: #4ade80 (Light Green)
- **Neutral**: Gray scale from #171717 to #FFFFFF
- **Destructive**: #ef4444 (Red for errors)

### Typography
- **Display Large**: 3.5rem / Bold (Hero sections)
- **Display Medium**: 2.5rem / Semibold (Section titles)
- **Heading**: 1.5rem / Semibold (Cards & subsections)
- **Body**: 1rem / Regular (Main content)
- **Body Small**: 0.875rem / Regular (Supporting text)
- **Caption**: 0.75rem / Regular (Metadata)

### Spacing
Uses a consistent spacing scale (4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 40px, 48px)

### Responsive Breakpoints
- **sm**: 640px (Small devices)
- **md**: 768px (Tablets)
- **lg**: 1024px (Desktops)
- **xl**: 1280px (Large screens)
- **2xl**: 1536px (Ultra-wide screens)

## Components

### Header
Responsive navigation component with:
- Logo/branding
- Desktop navigation menu (hidden on mobile)
- Mobile hamburger menu
- CTA button

**File**: `app/components/Header.tsx`

### Footer
Complete footer with:
- Company information
- Navigation links
- Resources section
- Social media links
- Bottom footer with copyright and legal links

**File**: `app/components/Footer.tsx`

### Button Variants
CSS classes for different button types:
- `.btn-primary` - Primary action button
- `.btn-secondary` - Secondary button
- `.btn-ghost` - Ghost/transparent button
- `.btn-outline` - Outlined button
- `.btn-disabled` - Disabled state

### Card Components
- `.card` - Standard card with subtle shadow
- `.card-elevated` - Card with more prominent elevation

### Badge Components
- `.badge` - Base badge styling
- `.badge-primary` - Primary badge
- `.badge-secondary` - Secondary badge

## Styling Approach

### CSS Variables
Global design tokens are defined in `globals.css`:
```css
:root {
  --primary: #166534;
  --foreground: #171717;
  --background: #FFFFFF;
  --spacing-base: 1rem;
  --radius-md: 0.375rem;
  /* ... more variables */
}
```

### Tailwind CSS
Tailwind with custom theme configuration enables utility-first styling while maintaining consistency.

### Dark Mode
Automatic dark mode support via CSS media queries in `globals.css`.

## Shared Constants

The frontend imports design tokens and navigation links from `apps/shared/constants/`:

```typescript
import { 
  COLORS, 
  TYPOGRAPHY, 
  SPACING, 
  BORDER_RADIUS,
  HEADER_LINKS,
  FOOTER_LINKS,
  SOCIAL_LINKS
} from '@/../shared/constants';
```

## Environment Variables

### Development
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Production
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## Pages

- `/` - Home page
- `/style-guide` - Design system documentation
- `/work` - Portfolio/projects
- `/about` - About page
- `/services` - Services page
- `/blog` - Blog listing (if applicable)
- `/contact` - Contact form
- `/testimonials` - Client testimonials

## Performance Optimization

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- CSS-in-JS extraction
- Static generation where possible

## Best Practices

1. **Use shared constants** for colors, typography, and spacing
2. **Follow component naming conventions** (PascalCase for components)
3. **Keep components small and reusable**
4. **Use TypeScript** for type safety
5. **Maintain semantic HTML** for accessibility
6. **Test responsive design** across all breakpoints

## Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Style changes not reflecting
Clear the Tailwind cache:
```bash
rm -rf .next
npm run dev
```

### Environment variables not loading
- Ensure `.env.local` is in the correct directory (apps/frontend/)
- Variables must start with `NEXT_PUBLIC_` to be exposed to browser
- Restart the dev server after changes

## Contributing

When adding new features:
1. Create components in `app/components/`
2. Use shared constants for styling
3. Follow the established design system
4. Update the style guide if adding new variants
5. Test responsiveness across all breakpoints

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- `/style-guide` - Local design system documentation

## License

See LICENSE file in the root directory.
