import BillingForm from "./BillingForm";
import OrderSummary from "./OrderSummary";

const BillingDetails = () => {
  return (
    <main className="flex flex-col items-start self-center mt-20 w-full max-w-[1170px] max-md:mt-10 max-md:max-w-full">
      <nav aria-label="Breadcrumb">
        <ol className="flex gap-3 items-center text-sm text-black">
          <li>
            <a href="/profile" className="opacity-50">
              Tài khoản
            </a>
          </li>
          <li>
            <a href="/" className="opacity-50">
              / Sản phẩm
            </a>
          </li>
          <li>
            <a href="/cart" className="opacity-50">
              / Giỏ hàng
            </a>
          </li>
          <li aria-current="page">/ Tiến hành đơn hàng</li>
        </ol>
      </nav>
      <h2 className="mt-20 text-4xl font-medium tracking-widest leading-none text-black max-md:mt-10">
        Chi tiết thanh toán
      </h2>
      <div className="self-stretch mt-12 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <BillingForm />
          <OrderSummary />
        </div>
      </div>
    </main>
  );
};

export default BillingDetails;
