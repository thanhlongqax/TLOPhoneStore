const GoogleSignUp = () => {
  return (
    <div className="flex flex-col items-center mt-4 text-base text-black">
      <button className="flex flex-col justify-center px-20 py-4 rounded border border-solid border-black border-opacity-40 max-md:px-5">
        <div className="flex gap-4 items-start">
          <img
            loading="lazy"
            src="/Signup/google.svg"
            alt=""
            className="object-contain shrink-0 w-6 aspect-square"
          />
          <span>Đăng nhập với Google</span>
        </div>
      </button>
    </div>
  );
}

export default GoogleSignUp;
