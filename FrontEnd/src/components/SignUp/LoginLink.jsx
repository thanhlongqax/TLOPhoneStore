function LoginLink() {
  return (
    <div className="flex gap-4 items-center mt-8 text-base text-black">
      <p className="self-stretch my-auto opacity-70">Bạn đã có tài khoản?</p>
      <div className="flex flex-col self-stretch my-auto font-medium w-[100px]">
        <a href="/login" className="opacity-70 text-red-500">
          Đăng nhập
        </a>
      </div>
    </div>
  );
}

export default LoginLink;
