function ImageContainer() {
  return (
    <div className="flex overflow-hidden flex-col self-stretch pt-20 my-auto rounded-none bg-slate-300 min-w-[240px] w-[805px] max-md:max-w-full">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/526332f3654bee831fd7f748e7fb8c42f7791287d3c693c7c404e5e89af239aa?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0"
        alt=""
        className="object-contain w-full aspect-[1.14] max-md:max-w-full"
      />
    </div>
  );
}

export default ImageContainer;
