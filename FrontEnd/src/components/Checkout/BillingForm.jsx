const BillingForm = () => {
  return (
    <form className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col w-full text-base max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col max-w-full text-red-500 w-[470px]">
          <div className="flex flex-col w-full leading-6">
            <label htmlFor="firstName" className="opacity-40">
              First Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              required
              className="flex mt-2 w-full rounded bg-neutral-100 min-h-[50px]"
            />
          </div>
          <div className="flex flex-col mt-8 w-full text-black">
            <label htmlFor="companyName" className="opacity-40">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              className="flex mt-2 w-full rounded bg-neutral-100 min-h-[50px]"
            />
          </div>
          <div className="flex flex-col mt-8 w-full leading-6">
            <label htmlFor="streetAddress" className="opacity-40">
              Street Address<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="streetAddress"
              required
              className="flex mt-2 w-full rounded bg-neutral-100 min-h-[50px]"
            />
          </div>
          <div className="flex flex-col mt-8 w-full text-black">
            <label htmlFor="apartment" className="opacity-40">
              Apartment, floor, etc. (optional)
            </label>
            <input
              type="text"
              id="apartment"
              className="flex mt-2 w-full rounded bg-neutral-100 min-h-[50px]"
            />
          </div>
          <div className="flex flex-col mt-8 w-full leading-6">
            <label htmlFor="townCity" className="opacity-40">
              Town/City<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="townCity"
              required
              className="flex mt-2 w-full rounded bg-neutral-100 min-h-[50px]"
            />
          </div>
          <div className="flex flex-col mt-8 w-full leading-6">
            <label htmlFor="phoneNumber" className="opacity-40">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              required
              className="flex mt-2 w-full rounded bg-neutral-100 min-h-[50px]"
            />
          </div>
          <div className="flex flex-col mt-8 w-full leading-6">
            <label htmlFor="emailAddress" className="opacity-40">
              Email Address<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="emailAddress"
              required
              className="flex mt-2 w-full rounded bg-neutral-100 min-h-[50px]"
            />
          </div>
        </div>
        <div className="flex gap-4 items-start self-start mt-6 text-black max-md:max-w-full">
          <input type="checkbox" id="saveInfo" className="mt-1" />
          <label htmlFor="saveInfo">
            Save this information for faster check-out next time
          </label>
        </div>
      </div>
    </form>
  );
};

export default BillingForm;
