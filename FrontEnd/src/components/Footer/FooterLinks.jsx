function FooterLinks() {
  const linkSections = [
    {
      title: "Tài khoản",
      links: [
        {name : "Tài khoản" , url :"/profile"},
        {name : "Đăng nhập / Đăng ký" , url :"/login"},
        {name : "Giỏ hàng" , url :"/cart"},
        {name : "Danh sách yêu thích" , url :"/wishlist"},
      ],
    },
    {
      title: "Quick Link",
      links: [
        {name : "Privacy Policy" , url :"/"},
        {name : "Terms Of Use" , url :"/"},
        {name : "FAQ" , url :"/"},
        {name : "Contact" , url :"/contact"}
      ],
    },
  ];

  return (
    <>
      {linkSections.map((section, index) => (
        <div key={index} className="flex flex-col text-neutral-50">
          <h3 className="text-xl font-medium leading-snug">{section.title}</h3>
          <ul className="flex flex-col mt-6 text-base">
            {section.links.map((link, linkIndex) => (
              <li key={linkIndex} className={linkIndex > 0 ? "mt-4" : ""}>
                <a href={link.url}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

export default FooterLinks;
