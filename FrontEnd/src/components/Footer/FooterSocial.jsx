function FooterSocial() {
  const socialIcons = [
    {
      src: "/Footer/facebook.svg",
      alt: "Facebook",
    },
    {
      src: "/Footer/Twitter.svg",
      alt: "Twitter",
    },
    {
      src: "/Footer/instagram.svg",
      alt: "Instagram",
    },
    {
      src: "/Footer/Linkedin.svg",
      alt: "LinkedIn",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <h3 className="text-xl font-medium leading-snug text-neutral-50">
          Tải App ở đây
        </h3>
        <div className="flex flex-col mt-6">
          <div className="flex gap-2 items-center mt-2">
            <img
              loading="lazy"
              src="/Footer/MaQR.png"
              className="object-contain shrink-0 self-stretch my-auto w-20 aspect-square"
              alt="QR Code"
            />
            <div className="flex flex-col self-stretch my-auto w-[110px]">
              <img
                loading="lazy"
                src="/Footer/googlePlay.png"
                className="object-contain max-w-full aspect-[2.75] w-[110px]"
                alt="App Store"
              />
              <img
                loading="lazy"
                src="/Footer/appStore.png"
                className="object-contain mt-1 max-w-full aspect-[2.75] w-[110px]"
                alt="Google Play"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-6 items-start self-start mt-6">
        {socialIcons.map((icon, index) => (
          <a key={index} href="#" aria-label={icon.alt}>
            <img
              loading="lazy"
              src={icon.src}
              className="object-contain shrink-0 w-6 aspect-square"
              alt=""
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export default FooterSocial;
