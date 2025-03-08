const OrderSummary = () => {
  const orderItems = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d9756deeacadef6fc2b2413c9b933bb26e53650502fc030bf17d33ac0ca9c50b?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0",
      name: "LCD Monitor",
      price: "$650",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c14a91db632bf827e69ef9e777343ed6de5d2c8c8c686130a56a4c6519bc144c?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0",
      name: "H1 Gamepad",
      price: "$1100",
    },
  ];

  return (
    <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col items-start mt-8 max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col items-end text-base max-md:max-w-full">
          {orderItems.map((item, index) => (
            <div
              key={index}
              className="flex gap-6 items-center max-md:max-w-full"
            >
              <img
                loading="lazy"
                src={item.image}
                alt=""
                className="object-contain shrink-0 self-stretch my-auto aspect-square w-[54px]"
              />
              <div className="flex gap-10 items-center self-stretch my-auto min-w-[240px]">
                <div className="self-stretch my-auto text-black">
                  {item.name}
                </div>
                <div className="self-stretch my-auto text-black">
                  {item.price}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col mt-8 max-w-full w-[422px]">
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full max-w-[422px] max-md:max-w-full">
              <div className="flex flex-col w-full max-md:max-w-full">
                <div className="flex gap-10 items-start text-base text-black whitespace-nowrap max-md:max-w-full">
                  <div>Subtotal:</div>
                  <div>$1750</div>
                </div>
                <div className="flex flex-col mt-4 w-full rotate-[8.742277657347563e-8rad]">
                  <div className="z-10 shrink-0 h-px bg-black border border-black border-solid max-md:max-w-full" />
                </div>
              </div>
              <div className="flex gap-10 items-start mt-4 text-base text-black whitespace-nowrap max-md:max-w-full">
                <div>Shipping:</div>
                <div>Free</div>
              </div>
            </div>
            <div className="flex flex-col mt-4 w-full rotate-[8.742277657347563e-8rad]">
              <div className="z-10 shrink-0 h-px bg-black border border-black border-solid max-md:max-w-full" />
            </div>
          </div>
          <div className="flex gap-10 items-start mt-4 text-base text-black whitespace-nowrap max-md:max-w-full">
            <div>Total:</div>
            <div>$1750</div>
          </div>
        </div>
        <div className="flex gap-10 items-center mt-8 max-md:max-w-full">
          <div className="flex gap-4 items-start self-stretch my-auto">
            <input
              type="radio"
              id="bankPayment"
              name="paymentMethod"
              className="mt-1"
            />
            <label htmlFor="bankPayment" className="text-base text-black">
              Bank
            </label>
          </div>
          <div className="flex gap-2 items-start self-stretch my-auto">
            {[
              "https://cdn.builder.io/api/v1/image/assets/TEMP/2526a461db17c3f5b7955407d3ebe70efd4c5ac073fb592804a8694a3ca03113?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0",
              "https://cdn.builder.io/api/v1/image/assets/TEMP/beac8ccbe94a21bf8baff01464f66d5fcf57bcf326d0617d749022608d4633cb?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0",
              "https://cdn.builder.io/api/v1/image/assets/TEMP/dba46759bd4de09e35ca71c274f7fa553bcd456d6fc376ca022cdbf902b56f50?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0",
              "https://cdn.builder.io/api/v1/image/assets/TEMP/e912330d361c9b742219ab3cbcd9ec8f41930e1d8de70d8536d3cb83c0005604?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0",
            ].map((src, index) => (
              <img
                key={index}
                loading="lazy"
                src={src}
                alt=""
                className="object-contain shrink-0 aspect-[1.5] w-[42px]"
              />
            ))}
          </div>
        </div>
        <div className="flex gap-4 items-start mt-8">
          <input
            type="radio"
            id="cashOnDelivery"
            name="paymentMethod"
            className="mt-1"
          />
          <label htmlFor="cashOnDelivery" className="text-base text-black">
            Cash on delivery
          </label>
        </div>
        <form className="flex flex-wrap gap-4 items-end self-stretch mt-8 text-base max-md:max-w-full">
          <input
            type="text"
            className="flex overflow-hidden flex-col justify-center items-start px-6 py-4 text-black rounded border border-black border-solid min-w-[240px] w-[300px] max-md:px-5"
            placeholder="Coupon Code"
            aria-label="Coupon Code"
          />
          <button
            type="submit"
            className="gap-2.5 self-stretch px-12 py-4 font-medium bg-red-500 rounded text-neutral-50 max-md:px-5"
          >
            Apply Coupon
          </button>
        </form>
        <button className="gap-2.5 self-stretch px-12 py-4 mt-8 text-base font-medium bg-red-500 rounded text-neutral-50 max-md:px-5">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
