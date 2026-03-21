"use client";

import { Code2, Palette, Type, Square, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function StyleGuide() {
  const colors = [
    { name: "Background", var: "--background", hex: "#EBF4DD", usage: "Main page background" },
    { name: "Foreground", var: "--foreground", hex: "#3B4953", usage: "Text, headings, borders" },
    { name: "Primary", var: "--primary", hex: "#5A7863", usage: "CTAs, highlights, links" },
    { name: "Secondary", var: "--secondary", hex: "#90AB8B", usage: "Accents, badges" },
    { name: "Muted", var: "--muted", hex: "#d4e3c8", usage: "Alternate sections, tags" },
    { name: "Accent", var: "--accent", hex: "#90AB8B", usage: "Highlights, hover states" },
    { name: "Card", var: "--card", hex: "#ffffff", usage: "Card backgrounds" },
    { name: "Destructive", var: "--destructive", hex: "#C44536", usage: "Errors, warnings" },
  ];

  const typography = [
    { name: "Display Large", className: "text-5xl md:text-7xl font-black", sample: "Your Website Heading" },
    { name: "Display Medium", className: "text-4xl md:text-6xl font-black", sample: "Section Title" },
    { name: "Display Small", className: "text-3xl md:text-4xl font-black", sample: "Subsection Title" },
    { name: "Heading 1", className: "text-2xl font-black", sample: "Card Heading" },
    { name: "Heading 2", className: "text-xl font-black", sample: "Component Title" },
    { name: "Body Large", className: "text-lg md:text-xl font-bold", sample: "Large body text for emphasis" },
    { name: "Body", className: "text-base", sample: "Regular body text for content" },
    { name: "Body Small", className: "text-sm font-bold", sample: "Small text for labels" },
    { name: "Caption", className: "text-xs font-bold uppercase tracking-wider", sample: "Category Label" },
  ];

  const buttons = [
    { name: "Primary", className: "px-8 py-4 bg-primary text-white font-black hover:bg-accent hover:text-foreground transition-all" },
    { name: "Secondary", className: "px-8 py-4 border-4 border-foreground text-foreground font-black hover:bg-foreground hover:text-background transition-all" },
    { name: "Dark", className: "px-8 py-4 bg-foreground text-background font-black hover:bg-primary transition-all" },
    { name: "Muted", className: "px-8 py-4 bg-muted text-foreground font-black hover:bg-secondary transition-all" },
    { name: "Text Link", className: "text-foreground font-bold underline hover:text-primary transition-colors" },
  ];

  const spacing = [
    { name: "XS", value: "0.5rem", class: "p-2" },
    { name: "SM", value: "1rem", class: "p-4" },
    { name: "MD", value: "1.5rem", class: "p-6" },
    { name: "LG", value: "2rem", class: "p-8" },
    { name: "XL", value: "3rem", class: "p-12" },
    { name: "2XL", value: "6rem", class: "py-24" },
    { name: "3XL", value: "8rem", class: "py-32" },
  ];

  const borders = [
    { name: "None", className: "border-0" },
    { name: "Standard", className: "border-2 border-foreground" },
    { name: "Bold", className: "border-4 border-foreground" },
    { name: "Muted", className: "border-2 border-muted" },
  ];

  return (
    <div className="w-full pt-24 bg-background">
      {/* Hero */}
      <section className="py-16 md:py-20 border-b-4 border-foreground bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-6 px-4 py-2.5 bg-foreground text-background font-black uppercase tracking-wider text-xs">
              Design System
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 text-foreground">
              Style Guide
            </h1>

            <p className="text-lg md:text-xl text-foreground max-w-3xl font-bold">
              Complete design system for consistent development across the portfolio site.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Colors */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-10">
            <Palette className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-black text-foreground">Color Palette</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {colors.map((color) => (
              <motion.div
                key={color.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border-4 border-foreground p-6 hover:shadow-xl transition-all"
              >
                <div
                  className="w-full h-24 mb-4 border-2 border-foreground"
                  style={{ backgroundColor: color.hex }}
                />
                <h3 className="text-xl font-black mb-2 text-foreground">{color.name}</h3>
                <div className="space-y-1 text-sm">
                  <div className="font-bold text-foreground">
                    <code className="bg-muted px-2 py-1">{color.hex}</code>
                  </div>
                  <div className="font-bold text-muted-foreground">
                    <code className="bg-muted px-2 py-1">var({color.var})</code>
                  </div>
                  <p className="text-sm text-foreground pt-2">{color.usage}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Color Usage Examples */}
          <div className="mt-12 bg-white border-4 border-foreground p-8">
            <h3 className="text-2xl font-black mb-6 text-foreground">Usage Examples</h3>
            <div className="space-y-4">
              <div className="p-4 bg-background">
                <code className="text-sm font-bold">bg-background text-foreground</code>
              </div>
              <div className="p-4 bg-primary text-white">
                <code className="text-sm font-bold">bg-primary text-white</code>
              </div>
              <div className="p-4 bg-muted text-foreground">
                <code className="text-sm font-bold">bg-muted text-foreground</code>
              </div>
              <div className="p-4 bg-foreground text-background">
                <code className="text-sm font-bold">bg-foreground text-background</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="py-16 md:py-20 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-10">
            <Type className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-black text-foreground">Typography</h2>
          </div>

          <div className="space-y-8">
            {typography.map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border-4 border-foreground p-8"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-black text-foreground mb-1">{type.name}</h3>
                    <code className="text-sm bg-muted px-3 py-1 text-foreground font-bold">
                      {type.className}
                    </code>
                  </div>
                </div>
                <div className={`${type.className} text-foreground`}>
                  {type.sample}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Font Stack */}
          <div className="mt-12 bg-white border-4 border-foreground p-8">
            <h3 className="text-2xl font-black mb-4 text-foreground">Font Stack</h3>
            <code className="text-sm bg-muted px-3 py-1.5 text-foreground font-bold block">
              font-family: system-ui, -apple-system, sans-serif
            </code>
            <p className="text-sm text-foreground mt-4">
              Uses system fonts for optimal performance and native feel.
            </p>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-10">
            <Square className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-black text-foreground">Buttons</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {buttons.map((button, index) => (
              <motion.div
                key={button.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-4 border-foreground p-8"
              >
                <h3 className="text-xl font-black mb-4 text-foreground">{button.name}</h3>
                <button className={button.className}>
                  {button.name} Button
                </button>
                <div className="mt-6">
                  <code className="text-xs bg-muted px-3 py-1.5 text-foreground font-bold block break-all">
                    className=&quot;{button.className}&quot;
                  </code>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Button Guidelines */}
          <div className="mt-12 bg-white border-4 border-foreground p-8">
            <h3 className="text-2xl font-black mb-6 text-foreground">Button Guidelines</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="font-bold text-foreground">
                  Use <code className="bg-muted px-2 py-1">font-black</code> for all button text
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="font-bold text-foreground">
                  Primary buttons use <code className="bg-muted px-2 py-1">bg-primary</code> with hover state <code className="bg-muted px-2 py-1">hover:bg-accent</code>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="font-bold text-foreground">
                  Always include transition classes: <code className="bg-muted px-2 py-1">transition-all</code>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="font-bold text-foreground">
                  Standard padding: <code className="bg-muted px-2 py-1">px-8 py-4</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <section className="py-16 md:py-20 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-10">
            <Code2 className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-black text-foreground">Spacing Scale</h2>
          </div>

          <div className="bg-white border-4 border-foreground p-8">
            <div className="space-y-6">
              {spacing.map((space) => (
                <div key={space.name} className="flex items-center gap-6">
                  <div className="w-20">
                    <span className="text-sm font-black text-foreground">{space.name}</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-primary" style={{ height: '2rem', width: space.value }} />
                  </div>
                  <div className="w-32">
                    <code className="text-sm bg-muted px-3 py-1 text-foreground font-bold">
                      {space.value}
                    </code>
                  </div>
                  <div className="w-32">
                    <code className="text-sm bg-muted px-3 py-1 text-foreground font-bold">
                      {space.class}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spacing Guidelines */}
          <div className="mt-8 bg-white border-4 border-foreground p-8">
            <h3 className="text-2xl font-black mb-6 text-foreground">Spacing Guidelines</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="font-bold text-foreground">
                  Section padding: <code className="bg-muted px-2 py-1">py-24 md:py-32</code>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="font-bold text-foreground">
                  Container padding: <code className="bg-muted px-2 py-1">px-6 lg:px-12</code>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="font-bold text-foreground">
                  Card padding: <code className="bg-muted px-2 py-1">p-8</code> or <code className="bg-muted px-2 py-1">p-10</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Borders & Cards */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-10">Borders & Cards</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {borders.map((border) => (
              <div key={border.name} className="bg-white p-8">
                <h3 className="text-xl font-black mb-4 text-foreground">{border.name}</h3>
                <div className={`${border.className} bg-muted p-6`}>
                  <code className="text-sm font-bold text-foreground">{border.className}</code>
                </div>
              </div>
            ))}
          </div>

          {/* Card Examples */}
          <h3 className="text-2xl font-black mb-6 text-foreground">Card Components</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border-4 border-foreground p-8 hover:shadow-2xl transition-all">
              <div className="inline-block px-3 py-1.5 bg-primary text-background font-black uppercase text-xs mb-4">
                Category
              </div>
              <h4 className="text-2xl font-black mb-4 text-foreground">Standard Card</h4>
              <p className="text-base text-foreground mb-4">
                White background with 4px foreground border. Hover shadow effect.
              </p>
              <code className="text-xs bg-muted px-2 py-1 text-foreground font-bold block">
                bg-white border-4 border-foreground p-8 hover:shadow-2xl transition-all
              </code>
            </div>

            <div className="bg-background border-4 border-foreground p-8 hover:shadow-2xl transition-all lg:-rotate-1 hover:rotate-0">
              <div className="inline-block px-3 py-1.5 bg-secondary text-foreground font-black uppercase text-xs mb-4">
                Accent
              </div>
              <h4 className="text-2xl font-black mb-4 text-foreground">Rotated Card</h4>
              <p className="text-base text-foreground mb-4">
                Background color with rotation for visual interest. Straightens on hover.
              </p>
              <code className="text-xs bg-muted px-2 py-1 text-foreground font-bold block break-all">
                bg-background border-4 border-foreground p-8 lg:-rotate-1 hover:rotate-0
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Component Patterns */}
      <section className="py-16 md:py-20 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-10">Component Patterns</h2>

          <div className="space-y-8">
            {/* Category Badge */}
            <div className="bg-white border-4 border-foreground p-8">
              <h3 className="text-xl font-black mb-4 text-foreground">Category Badge</h3>
              <span className="inline-block text-xs font-black uppercase tracking-wider px-3 py-1.5 bg-primary text-background">
                Category Label
              </span>
              <div className="mt-4">
                <code className="text-xs bg-muted px-3 py-1.5 text-foreground font-bold block break-all">
                  text-xs font-black uppercase tracking-wider px-3 py-1.5 bg-primary text-background
                </code>
              </div>
            </div>

            {/* Before/After Metrics */}
            <div className="bg-white border-4 border-foreground p-8">
              <h3 className="text-xl font-black mb-6 text-foreground">Before/After Metrics</h3>
              <div className="grid grid-cols-2 gap-4 p-6 border-2 border-muted">
                <div>
                  <div className="text-xs font-bold uppercase text-muted-foreground mb-1">Before</div>
                  <div className="font-black text-lg text-foreground">1.2% conversion</div>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-primary mb-1">After</div>
                  <div className="font-black text-lg text-primary">2.8% conversion</div>
                </div>
              </div>
            </div>

            {/* Section Header */}
            <div className="bg-white border-4 border-foreground p-8">
              <h3 className="text-xl font-black mb-6 text-foreground">Section Header Pattern</h3>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                  Eyebrow Label
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                  Section Title
                </h2>
                <p className="text-lg text-foreground">
                  Section description or subtitle text
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Notes */}
      <section className="py-16 md:py-20 bg-background border-t-4 border-foreground">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-10">Development Notes</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border-4 border-foreground p-8">
              <h3 className="text-xl font-black mb-4 text-foreground">Key Principles</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-bold text-foreground">Use <code className="bg-muted px-2 py-1">font-black</code> for all headings and buttons</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-bold text-foreground">4px borders on all cards and major components</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-bold text-foreground">White card backgrounds with foreground borders</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-bold text-foreground">Consistent hover states with transitions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-bold text-foreground">Mobile-first responsive design</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border-4 border-foreground p-8">
              <h3 className="text-xl font-black mb-4 text-foreground">Color Usage</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-bold text-foreground">Primary: CTAs, links, key highlights</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-bold text-foreground">Secondary: Badges, accents, supporting elements</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-bold text-foreground">Accent: Hover states, subtle highlights</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-bold text-foreground">Muted: Alternate sections, tag backgrounds</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-bold text-foreground">Foreground: Text, borders, dark sections</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
