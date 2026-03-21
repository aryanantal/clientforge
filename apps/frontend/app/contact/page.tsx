import ContactFAQ from "../modules/contact/contactFAQ";
import ContactForm from "../modules/contact/contactForm";
import ContactHero from "../modules/contact/contactHero";
import ContactMethods from "../modules/contact/contactMethods";


export default function Page() {
  return (
    <div className="w-full bg-background">
      <ContactHero />
      <ContactMethods />

        <ContactForm />

      <ContactFAQ />
    </div>
  );
}