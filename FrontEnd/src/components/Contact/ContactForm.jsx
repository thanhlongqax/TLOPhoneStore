const ContactForm = () => {
  return (
    <div className="flex flex-col ml-5 w-[70%] max-md:ml-0 max-md:w-full">
      <form className="flex overflow-hidden flex-col grow justify-center px-8 py-10 w-full text-base bg-white rounded shadow-sm max-md:px-5 max-md:mt-8 max-md:max-w-full">
        <div className="flex flex-col items-end w-full max-md:max-w-full">
          <div className="flex flex-wrap gap-4 items-start leading-6 text-red-500 max-md:max-w-full">
            {['họ và tên', 'Email', 'số điện thoại'].map((field, index) => (
              <div key={index} className="flex flex-col w-[235px]">
                <label htmlFor={field.toLowerCase()} className="sr-only">{`Your ${field}`}</label>
                <input
                  type={field === 'Email' ? 'email' : 'text'}
                  id={field.toLowerCase()}
                  name={field.toLowerCase()}
                  className="flex overflow-hidden flex-col justify-center items-start px-4 py-3.5 rounded bg-neutral-100 max-md:pr-5"
                  placeholder={`Nhập ${field} ở đây*`}
                  required
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col mt-8 max-w-full text-black w-[737px]">
            <label htmlFor="message" className="sr-only">Tin nhắn của bạn</label>
            <textarea
              id="message"
              name="message"
              className="flex overflow-hidden flex-col items-start px-4 pt-3.5 pb-44 rounded bg-neutral-100 max-md:pr-5 max-md:pb-24 max-md:max-w-full"
              placeholder="Tin nhắn của bạn"
            ></textarea>
          </div>
          <button type="submit" className="gap-2.5 self-stretch px-12 py-4 mt-8 font-medium bg-red-500 rounded text-neutral-50 max-md:px-5">
            Gửi tin nhắn
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;