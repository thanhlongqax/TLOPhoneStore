const EnhancedServices = () => {
  const services = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/35a7a07d7a4ef29471536cbff88a6fcddcc8a48bcd982034c7c9cc027d1f8f39?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0",
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/690dead7fa2d327463323a463863e06b24029d3bf64c91ea84fc2316d0b2358c?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0",
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/70d390e9144f7c0cd557a0eddf4fc773ab3c0e4cdffe7803693af480b2cdcd28?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0",
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
    },
  ];

  return (
    <section className="flex flex-wrap gap-10 justify-center items-center self-center mt-36 text-black max-md:mt-10 max-md:max-w-full">
      {services.map((service, index) => (
        <ServiceCard key={index} {...service} />
      ))}
    </section>
  );
};

const ServiceCard = ({ icon, title, description }) => (
  <div className="flex flex-col items-center self-stretch my-auto min-w-[240px] w-[262px]">
    <img
      loading="lazy"
      src={icon}
      alt=""
      className="object-contain w-20 aspect-square"
    />
    <div className="flex flex-col items-center mt-6">
      <h3 className="text-xl font-semibold leading-snug text-center">
        {title}
      </h3>
      <p className="mt-2 text-sm text-center">{description}</p>
    </div>
  </div>
);

export default EnhancedServices;
