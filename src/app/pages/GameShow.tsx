import { ServicePageTemplate } from '../components/ServicePageTemplate';

export function GameShow() {
  return (
    <ServicePageTemplate
      title="Game Show"
      subtitle="High-energy interactive entertainment where your guests are the stars."
      description="Turn your event into a TV game show! Complete with authentic podiums, buzzers, lights, and sound effects. We host trivia, physical challenges, and 'Survey Says' style games that get everyone involved."
      color="red"
      heroImage="https://images.unsplash.com/photo-1546552356-3fae876a61ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lJTIwc2hvd3xlbnwxfHx8fDE3NzAzMjE4NTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
      features={[
        "Authentic game show podiums & buzzers",
        "Customizable trivia categories",
        "Team building focused",
        "Professional host & DJ"
      ]}
    />
  );
}
