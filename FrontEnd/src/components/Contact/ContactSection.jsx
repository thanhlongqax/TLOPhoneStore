import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

const ContactSection = () => {
  return (
    <section className="flex flex-col self-center mt-20 w-full max-w-[1170px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-3 items-center self-start text-sm text-black whitespace-nowrap">
        <a href="/" className="self-stretch my-auto opacity-50">Trang chủ</a>
        <span className="self-stretch my-auto">/ Liên hệ</span>
      </div>
      <div className="mt-2 max-md:mt-2 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;