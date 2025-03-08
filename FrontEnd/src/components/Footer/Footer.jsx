import FooterNewsletter from "./FooterNewsletter";
import FooterLinks from "./FooterLinks";
import FooterSocial from "./FooterSocial";
import FooterCopyright from "./FooterCopyright";
import FooterSupport from "./FooterSupport";

function Footer() {
  return (
    <footer className="flex overflow-hidden flex-col justify-end pt-20 pb-6 mt-36 w-full bg-black max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 justify-center items-start self-center max-md:max-w-full">
        <FooterNewsletter />
        <FooterSupport/>
        <FooterLinks />
        <FooterSocial />
      </div>
      <FooterCopyright />
    </footer>
  );
}

export default Footer;
