import ColorSelector from './ColorSelector';
import SizeSelector from './SizeSelector';
import QuantitySelector from './QuantitySelector';
import DeliveryInfo from './DeliveryInfo';

function ProductDetails() {
  return (
    
    <section className="flex flex-col items-start w-full max-md:mt-10">
      <h1 className="text-2xl font-semibold tracking-wider leading-none text-black">
        Havic HV G-92 Gamepad
      </h1>
      <div className="flex gap-4 items-start mt-4 text-sm">
        <div className="flex gap-2 items-start text-black">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c35d903ef32712f74f1d691c7776b06b738b9c9c861a4482d47d9f9e4b9b6d4a?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0" className="object-contain shrink-0 aspect-[5] w-[100px]" alt="Rating stars" />
          <span className="opacity-50">(150 Reviews)</span>
        </div>
        <div className="flex gap-4 items-center text-green-500">
          <div className="shrink-0 self-stretch my-auto w-0 h-4 bg-black border border-black border-solid opacity-50" />
          <div className="self-stretch my-auto opacity-60">In Stock</div>
        </div>
      </div>
      <div className="mt-4 text-2xl tracking-wider leading-none text-black">$192.00</div>
      <p className="self-stretch mt-6 mr-7 text-sm leading-5 text-black max-md:mr-2.5">
        PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.
      </p>
      <div className="shrink-0 self-stretch mt-6 w-full h-px bg-black border border-black border-solid" />
      <ColorSelector />
      <SizeSelector />
      <div className="flex gap-4 self-stretch mt-6 w-full font-medium">
        <QuantitySelector />
        <button className="gap-2.5 self-stretch px-12 py-2.5 text-base bg-red-500 rounded text-neutral-50 max-md:px-5">
          Buy Now
        </button>
        <button aria-label="Add to wishlist">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/96b388edb85323f98c8e7e985856939fb1e202a7b2c62362d9367fbfb2293b30?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0" className="object-contain shrink-0 self-start rounded aspect-square w-[42px]" alt="" />
        </button>
      </div>
      <DeliveryInfo />
    </section>
  );
}

export default ProductDetails;