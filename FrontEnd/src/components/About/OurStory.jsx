function OurStory() {
  return (
    <section className="flex flex-col items-start self-end mt-20 w-full max-w-[1305px] max-md:mt-10 max-md:max-w-full">
      <nav className="flex gap-3 items-center text-sm text-black whitespace-nowrap">
        <a href="#" className="self-stretch my-auto opacity-50">Trang chủ</a>
        <span className="self-stretch my-auto">/ Về chúng tôi</span>
      </nav>
      <div className="self-stretch mt-11 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[57%] max-md:ml-0 max-md:w-full">
              <h2 className="text-6xl font-semibold leading-none text-justify text-black tracking-[3.24px] max-md:text-4xl">
                Our Story
              </h2>
              <div className="flex flex-col mt-10 max-w-full text-base leading-7 text-black w-[525px]">
                <p className="max-md:max-w-full">
                TLO Shopping là điểm đến lý tưởng cho những tín đồ yêu thích thời trang độc đáo và phong cách. Chúng tôi cung cấp một bộ sưu tập quần áo đa dạng, từ những thiết kế hiện đại, thời thượng cho đến các mẫu mã cổ điển mang đậm phong cách riêng. Mỗi sản phẩm đều được lựa chọn kỹ lưỡng để đảm bảo chất lượng và sự độc đáo, giúp bạn thể hiện cá tính và phong cách của mình
                </p>
                <p className="mt-6 max-md:max-w-full">
                Với cam kết mang đến trải nghiệm mua sắm tuyệt vời, TLO Shopping không chỉ tập trung vào sản phẩm mà còn chú trọng đến dịch vụ khách hàng. Đội ngũ nhân viên nhiệt tình và giàu kinh nghiệm của chúng tôi sẵn sàng hỗ trợ bạn trong từng bước mua sắm, từ việc chọn lựa sản phẩm cho đến các dịch vụ sau bán hàng.
                </p>
                <p className="mt-6 max-md:max-w-full">
                Khám phá bộ sưu tập mới nhất của chúng tôi tại TLO Shopping và tìm cho mình những món đồ ưng ý nhất để tỏa sáng trong mọi dịp!
                </p>
              </div>
          </div>
          <div className="flex flex-col ml-5 w-[57%] max-md:ml-0 max-md:w-full">
            <div className="flex overflow-hidden flex-col grow w-full bg-pink-400 rounded max-md:mt-10 max-md:max-w-full">
              <img loading="lazy" src="/About/OurStory.png" alt="Our story illustration" className="object-contain w-full aspect-[1.16] max-md:max-w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurStory;