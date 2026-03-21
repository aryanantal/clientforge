import { ROUTES } from "./routes";

export const HEADER_LINKS = [
  { name: "Home", href: ROUTES.HOME },
  { name: "Work", href: ROUTES.WORK },
  { name: "About", href: ROUTES.ABOUT },
  { name: "Services", href: ROUTES.SERVICES },
  { name: "Contact", href: ROUTES.CONTACT },
];


export const FOOTER_LINKS = {
  navigation: [
    { href: ROUTES.HOME, name: "Home" },
    { href: ROUTES.PROJECTS, name: "Projects" },
    { href: ROUTES.ABOUT, name: "About" },
    { href: ROUTES.SERVICES, name: "Services" },
    { href: ROUTES.CONTACT, name: "Contact" },
  ],
  resources: [
    { href: ROUTES.RESUME, name: "Resume" },
    { href: ROUTES.BLOG, name: "Blog" },
    { href: ROUTES.TESTIMONIALS, name: "Testimonials" },
  ],
};

export const SOCIAL_LINKS = [
  { href: "https://github.com/aryanantal", label: "GitHub", icon: "github" },
  { href: "https://www.linkedin.com/in/aryan-antal-74310920b", label: "LinkedIn", icon: "linkedin" },
  { href: "tel:+918864994444", label: "Phone", icon: "phone" },
  { href: "mailto:aryanantal18@gmail.com", label: "Email", icon: "mail" },
];

export const CONTACT_INFO = {
  email: "aryanantal18@gmail.com",
  phone: "+91 8864994444",
  address: "Bijnor, Uttar Pradesh, India",
};
