function FooterNewsletter() {
  return (
    <div className="flex flex-col text-neutral-50 w-[217px]">
      <div className="flex flex-col self-start">
        <div className="flex flex-col max-w-full whitespace-nowrap w-[118px]">
          <h2 className="w-full text-2xl font-bold tracking-wider leading-none">
            TLO
          </h2>
          <h3 className="mt-6 text-xl font-medium leading-snug">Đăng ký ngay</h3>
        </div>
        <p className="mt-6 text-base">Giảm 10% cho đơn hàng đầu tiên</p>
      </div>
      <form className="flex gap-8 items-center py-3 pl-4 mt-4 max-w-full text-base rounded border-solid border-[1.5px] border-neutral-50 w-[217px]">
        <label htmlFor="footerEmail" className="sr-only">
          Nhập email ở đây
        </label>
        <input
          type="email"
          id="footerEmail"
          placeholder="Nhập email ở đây"
          className="self-stretch my-auto opacity-40 bg-transparent border-none outline-none"
          required
        />
        <button type="submit" aria-label="Đăng ký ngay">
          <img
            loading="lazy"
            src="/Footer/icon-send.svg"
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            alt=""
          />
        </button>
      </form>
    </div>
  );
}

export default FooterNewsletter;
