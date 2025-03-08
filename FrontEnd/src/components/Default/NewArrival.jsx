const NewArrival = () => {
  return (
    <section className="flex flex-col mt-36 max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-col self-start">
        <div className="flex gap-4 items-center self-start">
          <div className="flex flex-col self-stretch my-auto w-5">
            <div className="flex shrink-0 h-10 bg-red-500 rounded" />
          </div>
          <div className="self-stretch my-auto text-base font-semibold leading-none text-red-500">
            Featured
          </div>
        </div>
        <h2 className="mt-5 text-4xl font-semibold tracking-widest leading-none text-black">
          New Arrival
        </h2>
      </div>
      <div className="flex flex-wrap gap-8 items-start mt-16 max-md:mt-10 max-md:max-w-full">
        <div className="flex overflow-hidden flex-col px-7 pt-24 bg-black rounded min-w-[240px] w-[570px] max-md:px-5 max-md:max-w-full">
          <div className="flex relative flex-col items-start px-1 pt-96 pb-8 min-h-[511px] max-md:pt-24 max-md:pr-5 max-md:max-w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c3aacd8ca334892c73a16fbd125af7ff488b29eb4078782b9319ae4918555c1f?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0"
              alt="PlayStation 5"
              className="object-cover absolute inset-0 size-full"
            />
            <div className="flex relative flex-col max-w-full w-[242px]">
              <div className="flex flex-col w-full text-neutral-50">
                <h3 className="text-2xl font-semibold tracking-wider leading-none">
                  PlayStation 5
                </h3>
                <p className="mt-4 text-sm leading-5">
                  Black and White version of the PS5 coming out on sale.
                </p>
              </div>
              <a
                href="#"
                className="flex flex-col mt-4 text-base font-medium text-white w-[81px]"
              >
                <span>Shop Now</span>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e40742fe053a27fd4ae0fe98d17023b98e0458d4b6c382de755fc8952018a510?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0"
                  alt=""
                  className="object-contain w-full aspect-[83.33]"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center min-w-[240px] w-[570px] max-md:max-w-full">
          <div className="flex overflow-hidden flex-col items-end px-14 max-w-full rounded bg-stone-950 w-[570px] max-md:pl-5">
            <div className="flex relative flex-col items-start pt-36 pb-6 w-full min-h-[284px] max-md:pt-24 max-md:pr-5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e1994622e707af61dee5c99f67b70c960bcf14cffcad4ec4fe0270779d06371b?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0"
                alt="Women's Collections"
                className="object-cover absolute inset-0 size-full"
              />
              <div className="flex relative flex-col max-w-full w-[255px]">
                <div className="flex flex-col w-full text-neutral-50">
                  <h3 className="text-2xl font-semibold tracking-wider leading-none">
                    Women's Collections
                  </h3>
                  <p className="mt-4 text-sm leading-5">
                    Featured woman collections that give you another vibe.
                  </p>
                </div>
                <a
                  href="#"
                  className="flex flex-col mt-4 text-base font-medium text-white w-[81px]"
                >
                  <span>Shop Now</span>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e40742fe053a27fd4ae0fe98d17023b98e0458d4b6c382de755fc8952018a510?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0"
                    alt=""
                    className="object-contain w-full aspect-[83.33]"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-8 justify-center items-center mt-8 max-md:max-w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/78e006a9362764ea479a7b111062aa5b46cb97c6f12a1acfefc3d3c5f420e333?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0"
              alt="New arrival item 1"
              className="object-contain self-stretch my-auto aspect-[0.95] min-w-[240px] w-[270px]"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c513b30b500d66bf0b21259b3a883ce2e8945c97d03d3d94a8df28a2dba2aa45?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0"
              alt="New arrival item 2"
              className="object-contain self-stretch my-auto aspect-[0.95] min-w-[240px] w-[270px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
