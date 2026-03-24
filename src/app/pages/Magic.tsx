import { ServicePageTemplate } from '../components/ServicePageTemplate';

export function Magic() {
  return (
    <ServicePageTemplate
      title="Magic"
      subtitle="Close-up wonders and stage spectacles that defy logic."
      description="Magic Brent brings over 20 years of experience to the stage. From intimate strolling magic at cocktail hours to full-scale stage productions, his blend of comedy and illusion creates unforgettable moments."
      color="teal"
      heroImage="figma:asset/abbba35f6419ca1567aa30124ae788184973bfc6.png" // Using Brent Smile Front
      features={[
        "Interactive strolling magic",
        "Comedy stage shows (30-60 mins)",
        "Grand illusions",
        "Custom branded tricks for corporate events"
      ]}
    />
  );
}
