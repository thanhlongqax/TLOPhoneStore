function DeliveryInfo() {
  return (
    <div className="flex overflow-hidden flex-col items-start self-stretch py-6 mt-10 w-full font-medium rounded border border-solid border-black border-opacity-50">
      <div className="flex gap-4 items-center ml-4 max-md:ml-2.5">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/aebf1991fefe3284b2227fb70c9797a7cbb06c973093fc4c254670daafa83d5f?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0" className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square" alt="" />
        <div className="flex flex-col self-stretch my-auto min-w-[240px]">
          <div className="text-base text-black">Free Delivery</div>
          <div className="mt-2 text-xs text-black">Enter your postal code for Delivery Availability</div>
        </div>
      </div>
      <div className="shrink-0 self-stretch mt-4 h-px bg-black border border-black border-solid" />
      <div className="flex gap-4 items-center mt-4 ml-4 text-black max-md:ml-2.5">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/1eccd3ab81440fb0df05b6e48edab314f31d16bf22e4a291c432f1887c75051d?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0" className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square" alt="" />
        <div className="flex flex-col self-stretch my-auto">
          <div className="text-base">Return Delivery</div>
          <div className="mt-2 text-xs leading-5 underline">
            Free 30 Days Delivery Returns. <a href="#" className="underline">Details</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryInfo;