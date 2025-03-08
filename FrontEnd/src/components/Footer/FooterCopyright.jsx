function FooterCopyright() {
  return (
    <div className="flex flex-col items-center mt-16 w-full max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-col w-full max-md:max-w-full">
        <hr className="w-full bg-white border-white border-solid opacity-40 min-h-[1px] max-md:max-w-full" />
      </div>
      <div className="flex gap-3 items-center mt-4 text-base text-white">
        <div className="flex gap-1.5 items-center self-stretch my-auto min-w-[240px]">
          <img
            loading="lazy"
            src="/Footer/icon.svg"
            className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
            alt=""
          />
          <p className="self-stretch my-auto">
            Copyright TLO 2024. All right reserved
          </p>
        </div>
      </div>
    </div>
  );
}

export default FooterCopyright;
