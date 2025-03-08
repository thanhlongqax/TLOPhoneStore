import PropTypes from 'prop-types';
const CategoryBrowse = () => {
  const categories = [
    {
      name: "Phones",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8eba37b1c58c8a4c03d56d78d12dda54514857e6814dc7fc1a01355e05f76486?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0",
    },
    {
      name: "Computers",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b0492764baabd6287db8112d704b76ec512da74b12c07a7392a4355e475822fd?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0",
    },
    {
      name: "SmartWatch",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8ab73d75ad8734b1ce9c9e7d28416ca1322e62001cd87d2494b6dc7aa8ed598c?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0",
    },
    {
      name: "Camera",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7398cf0c2068aa318473585eabe709841a46129159e3c424f1a00b8573175e48?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0",
    },
    {
      name: "HeadPhones",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/81187437ca459c1a378b4658e06ace6ee47db3e1a9510eb587ce31c9044cde1e?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0",
    },
    {
      name: "Gaming",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d37c24e654c8a4ce2beaa597a4a2e2a8dfde53f2ef25605e5b5da4a67facc8e9?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0",
    },
  ];

  return (
    <section className="flex flex-col mt-20 max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-end max-md:max-w-full">
        <div className="flex flex-col min-w-[240px]">
          <div className="flex gap-4 items-center self-start">
            <div className="flex flex-col self-stretch my-auto w-5">
              <div className="flex shrink-0 h-10 bg-red-500 rounded" />
            </div>
            <div className="self-stretch my-auto text-base font-semibold leading-none text-red-500">
              Categories
            </div>
          </div>
          <h2 className="mt-5 text-4xl font-semibold tracking-widest leading-none text-black">
            Browse By Category
          </h2>
        </div>
        <div className="flex gap-2 items-start">
          <button aria-label="Previous category" className="focus:outline-none">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d46c131187bfff9eb633481579a064341b51d7196040ee40dd3f9577e445a5e?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0"
              alt=""
              className="object-contain shrink-0 aspect-square w-[46px]"
            />
          </button>
          <button aria-label="Next category" className="focus:outline-none">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e88e31fcac886e936832d43b7fb2b7a3e219274da66d8e9d07a08a6cc7094c1b?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0"
              alt=""
              className="object-contain shrink-0 aspect-square w-[46px]"
            />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-8 items-start mt-16 text-base text-black whitespace-nowrap max-md:mt-10 max-md:max-w-full">
        {categories.map((category, index) => (
          <CategoryItem
            key={index}
            {...category}
            isActive={category.name === "Camera"}
          />
        ))}
      </div>
    </section>
  );
};

const CategoryItem = ({ name, icon, isActive }) => (
  <div
    className={`flex overflow-hidden flex-col items-center px-9 py-6 rounded border border-solid ${
      isActive
        ? "bg-red-500 text-neutral-50 shadow-sm"
        : "border-black border-opacity-30"
    } w-[170px] max-md:px-5`}
  >
    <img
      loading="lazy"
      src={icon}
      alt={name}
      className="object-contain w-14 aspect-square"
    />
    <div className="mt-4">{name}</div>
  </div>
);
CategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};
export default CategoryBrowse;
