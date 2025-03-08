import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

function CartPage() {
  const cartItems = [
    { name: "LCD Monitor", price: 650, image: "" },
    {
      name: "H1 Gamepad",
      price: 550,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d9756deeacadef6fc2b2413c9b933bb26e53650502fc030bf17d33ac0ca9c50b?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0",
    },
  ];

  return (
    <main className="flex flex-col self-center mt-20 w-full max-w-[1170px] max-md:mt-10 max-md:max-w-full">
      <nav aria-label="Breadcrumb">
        <ol className="flex gap-3 items-center self-start text-sm text-black whitespace-nowrap">
          <li>
            <a href="/" className="self-stretch my-auto opacity-50">
              Trang chủ
            </a>
            <span className="self-stretch my-auto"> / Giỏ hàng</span>
          </li>
        </ol>
      </nav>
      <section className="flex flex-col mt-20 w-full max-md:mt-10 max-md:max-w-full">
            <div className="overflow-hidden py-6 pr-16 pl-8 mt-10 w-full bg-white rounded shadow-sm max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-1/5 max-md:ml-0 max-md:w-full">
          <div className="flex grow gap-5 text-base text-black max-md:mt-10"> 
            <div className="my-auto">Sản phẩm</div>
            <div className="my-auto">Tên sản phẩm</div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-4/5 max-md:ml-0 max-md:w-full">
          <div className="flex flex-wrap grow gap-5 justify-between items-center self-stretch my-auto text-base text-black whitespace-nowrap max-md:mt-10 max-md:max-w-full">
            <div className="self-stretch my-auto">Giá</div>
            <div className="my-auto">Số lượng</div>
            <div className="self-stretch my-auto">Giá phụ</div>
          </div>
        </div>
      </div>
    </div>
        {cartItems.map((item, index) => (
          <CartItem key={index} {...item} />
        ))}
        <div className="flex flex-wrap gap-10 items-start mt-6 text-base font-medium text-black max-md:max-w-full">
          <a
            href="/shop"
            className="gap-2.5 self-stretch px-12 py-4 rounded border border-solid border-black border-opacity-50 max-md:px-5"
          >
            Trở lại mua hàng
          </a>
          <button className="gap-2.5 self-stretch px-12 py-4 rounded border border-solid border-black border-opacity-50 max-md:px-5">
            Cập nhật giỏ hàng
          </button>
        </div>
      </section>
      <CartSummary />
    </main>
  );
}

export default CartPage;