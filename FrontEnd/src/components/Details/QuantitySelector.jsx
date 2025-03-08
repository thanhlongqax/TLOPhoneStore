function QuantitySelector() {
  return (
    <div className="flex gap-0 items-start text-xl leading-snug text-black whitespace-nowrap min-h-[44px]">
      <button aria-label="Decrease quantity">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed9ed51dc91da1a317a6ec57e005b4e5f8a1b0bff1721c29819dbbc2af1e9ae3?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0" className="object-contain shrink-0 w-10 rounded aspect-[0.91]" alt="" />
      </button>
      <div className="overflow-hidden px-9 py-2 w-20 border-t border-b border-black border-opacity-50 max-md:px-5">
        2
      </div>
      <button aria-label="Increase quantity">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a09c076caa5a0aa0236a51fa2801afde79e8017a579e89aa6abb403c0af33200?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0" className="object-contain shrink-0 aspect-[0.93] w-[41px]" alt="" />
      </button>
    </div>
  );
}

export default QuantitySelector;