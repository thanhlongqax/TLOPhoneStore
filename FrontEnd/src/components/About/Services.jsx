import ServiceFeature from './ServiceFeature';

function Services() {
  const services = [
    {
      icon: "/About/Delivery.svg",
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140"
    },
    {
      icon: "/About/Customer.svg",
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support"
    },
    {
      icon: "/About/Secure.svg",
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days"
    }
  ];

  return (
    <section className="flex flex-wrap gap-10 justify-center items-center mt-36 ml-28 text-black max-md:mt-10 max-md:max-w-full">
      {services.map((service, index) => (
        <ServiceFeature key={index} {...service} />
      ))}
    </section>
  );
}

export default Services;