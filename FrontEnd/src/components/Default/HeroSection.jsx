const HeroSection = () => {
  return (
    <section className="flex overflow-hidden grow pt-4 pl-16 mt-10 w-full bg-black max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[37%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col items-start self-stretch my-auto w-full text-base text-neutral-50 max-md:mt-10">
            <div className="flex gap-6 items-center text-center">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e8adddedf9e0086e1c49a1657979167f01fb10f4a948b8533d9ffa9838db77fe?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-10 aspect-[0.82]"
              />
              <div className="self-stretch my-auto w-[126px]">
                iPhone 14 Series
              </div>
            </div>
            <h2 className="self-stretch mt-5 text-5xl font-semibold tracking-widest leading-[60px] max-md:text-4xl max-md:leading-[56px]">
              Up to 10% off Voucher
            </h2>
            <a
              href="#"
              className="flex gap-2 items-center mt-6 font-medium text-center"
            >
              <span className="flex flex-col self-stretch my-auto w-[81px]">
                <span className="self-start">Shop Now</span>
                <span className="mt-1 border border-solid bg-neutral-50 border-neutral-50 min-h-[1px] w-[81px]"></span>
              </span>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a9f9190215df855e46de68e25db2cebf222e4b26191868239034c2f0ce1ceb8?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
              />
            </a>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[63%] max-md:ml-0 max-md:w-full">
          <div className="flex relative flex-col items-start pt-72 pb-3 w-full min-h-[328px] max-md:pt-24 max-md:mt-10 max-md:max-w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b3bab3b87dfdbc6d218a42302584941073101b73142631e80552ef175e4d27aa?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0"
              alt="Hero product"
              className="object-cover absolute inset-0 size-full"
            />
            <div className="flex relative gap-3 items-center">
              <div className="flex shrink-0 self-stretch my-auto w-3 h-3 rounded-full bg-white bg-opacity-50 fill-white" />
              <div className="flex shrink-0 self-stretch my-auto w-3 h-3 rounded-full bg-white bg-opacity-50 fill-white" />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6197da67d2a30b0f3aed051f4377cce1b6b8adcaa3bb6e32f46eb1058f1bcecd?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
              />
              <div className="flex shrink-0 self-stretch my-auto w-3 h-3 rounded-full bg-white bg-opacity-50 fill-white" />
              <div className="flex shrink-0 self-stretch my-auto w-3 h-3 rounded-full bg-white bg-opacity-50 fill-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
