import { ServicePageTemplate } from '../components/ServicePageTemplate';

export function Corporate() {
  return (
    <ServicePageTemplate
      title="Corporate"
      subtitle="Elevate your brand with professional, scalable entertainment."
      description="We specialize in making corporate events memorable. Whether it's a product launch, holiday party, or team building retreat, we provide entertainment that aligns with your brand values and engages your audience."
      color="blue"
      heroImage="https://images.unsplash.com/photo-1511578314322-379afb476865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBldmVudHxlbnwxfHx8fDE3NzAzMjIwNDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
      features={[
        "Scalable packages for any venue size",
        "Brand integration options",
        "Seamless production management",
        "Keynote speaker intros & transitions"
      ]}
    />
  );
}
