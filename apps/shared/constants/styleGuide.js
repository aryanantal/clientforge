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
