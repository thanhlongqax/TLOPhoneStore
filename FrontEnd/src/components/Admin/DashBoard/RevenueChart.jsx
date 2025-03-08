function RevenueChart() {
  const months = ['5k', '10k', '15k', '20k', '25k', '30k', '35k', '40k', '45k', '50k', '55k', '60k'];

  return (
    <section className="flex flex-col p-8 mt-6 w-full whitespace-nowrap bg-white rounded-2xl shadow-[6px_6px_54px_rgba(0,0,0,0.05)] max-md:px-5 max-md:mr-0.5 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 w-full leading-none max-md:mr-1 max-md:max-w-full">
        <h2 className="my-auto text-2xl font-bold text-neutral-800">Revenue</h2>
        <div className="flex flex-1 gap-4 px-4 py-2.5 text-xs font-medium text-right bg-white rounded border border-solid border-neutral-300 text-zinc-800 text-opacity-40">
          <div>October</div>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/111fd0868388956f825ac25ee037644d295049379b5acf6e86ea84aed5304cc0?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0" alt="" className="object-contain shrink-0 w-2.5 aspect-square" />
        </div>
      </div>
      <div className="flex flex-wrap gap-10 mt-12 max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col items-start self-start text-xs font-semibold leading-none text-zinc-800 text-opacity-40 max-md:hidden">
          {[100, 80, 60, 40, 20].map((value, index) => (
            <div key={index} className={index > 0 ? "mt-12 max-md:mt-10" : "self-stretch"}>{value}</div>
          ))}
        </div>
        <div className="flex flex-col grow shrink-0 mt-1 basis-0 w-fit max-md:max-w-full">
          <div className="flex shrink-0 bg-blend-normal h-[237px] max-md:max-w-full" />
          <div className="flex flex-wrap gap-10 mt-7 max-w-full text-xs font-semibold leading-none text-center text-zinc-800 text-opacity-40 w-[961px]">
            {months.map((month, index) => (
              <div key={index} className={index === 0 ? "grow" : ""}>{month}</div>
            ))}
          </div>
          <div className="flex gap-10 self-center mt-10 max-w-full text-base font-bold leading-none text-zinc-800 w-[197px] max-md:mt-10">
            <div className="flex flex-1 gap-4">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ac5558e6c4c5c48d6af99943fe98d5942dba2d268999e719f9f08077b09ceac2?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0" alt="" className="object-contain shrink-0 my-auto w-3 aspect-square" />
              <div>Sales</div>
            </div>
            <div className="flex flex-1 gap-4">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/32f47c68fd4310e04c4cd7b4a7cd3f238eb88c08b310cf3cbb9599cac089994a?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0" alt="" className="object-contain shrink-0 my-auto w-3 aspect-square" />
              <div>Profit</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RevenueChart;