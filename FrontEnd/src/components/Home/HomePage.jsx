import CategoryMenu from "../Default/CategoryMenu";
import HeroSection from "../Default/HeroSection";
import FlashSale from "../Default/FlashSale";
import CategoryBrowse from "../Default/CategoryBrowse";
import BestSelling from "../Default/BestSelling";
import EnhancedServices from "../Default/EnhancedServices";
import NewArrival from "../Default/NewArrival";

const HomePage = () => {
  return (
    <main className="flex z-10 flex-col items-start self-end w-full max-w-[1305px] max-md:max-w-full">
      <div className="w-full max-w-[1170px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <CategoryMenu />
          <div className="flex flex-col ml-5 w-[79%] max-md:ml-0 max-md:w-full">
            <HeroSection />
          </div>
        </div>
      </div>
      <FlashSale />
      <CategoryBrowse />
      <BestSelling />
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2c8ab3d14f803f9ab24c92ddaf7a38e41dacc06ebff8a5aa2cc2ff40ddc61e47?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0"
        alt="Featured product or promotion"
        className="object-contain mt-36 w-full aspect-[2.34] max-w-[1170px] max-md:mt-10 max-md:max-w-full"
      />
      <NewArrival />
      <EnhancedServices />
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4994e2c1a620d4ea356d28611072582355d46de2085b91428063bb54d28d049e?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0"
        alt="Scroll to top"
        className="object-contain self-end mt-16 mr-24 aspect-square w-[46px] max-md:mt-10 max-md:mr-2.5"
      />
    </main>
  );
};

export default HomePage;
