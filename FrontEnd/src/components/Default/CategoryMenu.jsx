const CategoryMenu = () => {
  const categories = [
    "Woman's Fashion",
    "Men's Fashion",
    "Electronics",
    "Home & Lifestyle",
    "Medicine",
    "Sports & Outdoor",
    "Baby's & Toys",
    "Groceries & Pets",
    "Health & Beauty",
  ];

  return (
    <nav className="flex flex-col w-[21%] max-md:ml-0 max-md:w-full">
      <div className="flex grow gap-4 text-base text-center text-black max-md:mt-10">
        <div className="flex flex-col items-start self-end mt-10">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`flex gap-10 items-start self-stretch ${
                index > 0 ? "mt-4" : ""
              }`}
            >
              <a
                href="#"
                className="text-black hover:text-red-500 transition-colors"
              >
                {category}
              </a>
              {index < 2 && (
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/419e3d65c94f39310352312d26156e850a5fd9835e5ec39a019f5290ed34bf71?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0"
                  alt=""
                  className="object-contain shrink-0 w-6 aspect-square"
                />
              )}
            </div>
          ))}
        </div>
        <div className="shrink-0 w-px h-96 border border-black border-solid" />
      </div>
    </nav>
  );
};

export default CategoryMenu;
