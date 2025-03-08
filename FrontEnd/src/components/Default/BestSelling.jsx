import ProductCard from "./ProductCard";

const BestSelling = () => {
  const products = [
    {
      name: "The north coat",
      currentPrice: "$260",
      originalPrice: "$360",
      rating: 4.5,
      reviews: 65,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/8df32f72626d6c595bc895d23788b5db8bea86f835004daa71d72ea73b1c564a?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0",
    },
    {
      name: "Gucci duffle bag",
      currentPrice: "$960",
      originalPrice: "$1160",
      rating: 4.5,
      reviews: 65,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/7b818e13f340bb8cd1eb0ee2f19630d6ef298450b9f4c21d9917d8191df83149?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0",
    },
    {
      name: "RGB liquid CPU Cooler",
      currentPrice: "$160",
      originalPrice: "$170",
      rating: 4.5,
      reviews: 65,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c98161e91a2ada6469ea26534f75829b08f7abf5dfb9fb1c382b63d595a396eb?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0",
    },
    {
      name: "Small BookSelf",
      currentPrice: "$360",
      originalPrice: "",
      rating: 5,
      reviews: 65,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/0a82a404ba7cbcaa83a749c8889a625409c183a6130bd801d219b32875791614?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0",
    },
  ];

  return (
    <section className="flex flex-col mt-16 max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-end max-md:max-w-full">
        <div className="flex flex-col min-w-[240px]">
          <div className="flex gap-4 items-center self-start">
            <div className="flex flex-col self-stretch my-auto w-5">
              <div className="flex shrink-0 h-10 bg-red-500 rounded" />
            </div>
            <div className="self-stretch my-auto text-base font-semibold leading-none text-red-500">
              This Month
            </div>
          </div>
          <h2 className="mt-5 text-4xl font-semibold tracking-widest leading-none text-black">
            Best Selling Products
          </h2>
        </div>
        <button className="gap-2.5 self-stretch px-12 py-4 text-base font-medium bg-red-500 rounded text-neutral-50 max-md:px-5">
          View All
        </button>
      </div>
      <div className="flex flex-wrap gap-8 items-start mt-16 text-base font-medium max-md:mt-10 max-md:max-w-full">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
};

export default BestSelling;
