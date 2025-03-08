import ProductCard from "../Default/ProductCard";

function WishlistSection() {
  const wishlistItems = [
    {
      name: "Gucci duffle bag",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/75ffc9e61385d709159ad381be4560e29e75018abcdf2ab18c48a1605d99951f?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0",
      discount: "-35%",
      currentPrice: "$960",
      originalPrice: "$1160",
    },
    {
      name: "RGB liquid CPU Cooler",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/92c45932c5bc9cc069ebefc8c0068a719bedacf741e8c31fffc2b1e73747af2e?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0",
      currentPrice: "$1960",
    },
    {
      name: "GP11 Shooter USB Gamepad",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f108422204b6d899cc26a05d5a3db7303a3d10c3de67b38d999cbb7608bfe090?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0",
      currentPrice: "$550",
    },
    {
      name: "Quilted Satin Jacket",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6ab0d09759437de10ec13dd206d602d46ef8eefb1aaf838c4d74c0db51a3ec03?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0",
      currentPrice: "$750",
    },
  ];

  return (
    <section className="flex flex-col self-center mt-20 max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-col max-md:max-w-full">
        <div className="flex flex-wrap gap-10 items-center max-md:max-w-full">
          <h2 className="self-stretch my-auto text-xl leading-tight text-center text-black">
            Sản phẩm yêu thích
          </h2>
          <button className="gap-2.5 self-stretch px-12 py-4 my-auto text-base font-medium text-black rounded border border-solid border-black border-opacity-50 max-md:px-5">
            Xóa hết khỏi giỏi hàng
          </button>
        </div>
        <div className="flex flex-wrap gap-8 items-start mt-16 max-md:mt-10 max-md:max-w-full">
          {wishlistItems.map((item, index) => (
            <ProductCard key={index} {...item} />
          ))}
          
        </div>
      </div>
    </section>
  );
}

export default WishlistSection;
