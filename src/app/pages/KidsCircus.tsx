import { ServicePageTemplate } from '../components/ServicePageTemplate';

export function KidsCircus() {
  return (
    <ServicePageTemplate
      title="Kids & Circus"
      subtitle="Whimsical characters and breathtaking skills for all ages."
      description="Cirque Jolie brings the wonder of the circus to you. From elegant stilt walkers greeting your guests to high-flying aerial performances and fun-filled kids' shows with balloons and face painting."
      color="orange"
      heroImage="figma:asset/8c9a4fed3900444d439804210d0f39d2cf09c9bd.png"
      features={[
        "Stilt walkers & jugglers",
        "Aerial silk performances (rigging required)",
        "Kids' comedy magic & balloons",
        "Face painting & glitter tattoos"
      ]}
    />
  );
}
