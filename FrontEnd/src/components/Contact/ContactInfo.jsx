const ContactInfo = () => {
  return (
    <div className="flex flex-col w-[30%] max-md:ml-0 max-md:w-full">
      <div className="flex overflow-hidden flex-col grow justify-center px-9 py-12 w-full bg-white rounded shadow-sm max-md:px-5 max-md:mt-8">
        <div className="flex flex-col">
          <div className="flex flex-col w-full max-w-[262px]">
            <div className="flex gap-4 items-center self-start text-base font-medium text-black">
              <img loading="lazy" src="/Contact/Phone.svg" alt="" className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square fill-red-500" />
              <h2 className="self-stretch my-auto">Gọi cho chúng tôi</h2>
            </div>
            <div className="flex flex-col mt-6 w-full text-sm text-black">
              <p>Chúng tôi luôn có mặt 24/7</p>
              <p className="mt-4">Phone: +8801611112222</p>
            </div>
          </div>
          <hr className="mt-8 border-t border-black" />
          <div className="flex flex-col mt-8 w-full max-w-[250px]">
            <div className="flex gap-4 items-center self-start text-base font-medium text-black">
              <img loading="lazy" src="/Contact/Email.svg" alt="" className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square fill-red-500" />
              <h2 className="self-stretch my-auto">Viết cho chúng tôi</h2>
            </div>
            <div className="flex flex-col mt-6 w-full text-sm text-black">
              <p className="leading-5">
              Hãy điền vào mẫu và chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ.
              </p>
              <p className="mt-4">Emails: customer@exclusive.com</p>
              <p className="mt-4">Emails: support@exclusive.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;