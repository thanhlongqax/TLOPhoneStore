import ProductDetails from './ProductDetails';

function Details() {
  return (
    <>
        <main className="flex flex-col self-center mt-20 w-full max-w-[1171px] max-md:mt-10 max-md:max-w-full">
            <nav className="flex gap-3 items-center self-start text-sm text-black" aria-label="Breadcrumb">
            <a href="#" className="self-stretch my-auto opacity-50">Sản phẩm</a>
            <span className="self-stretch my-auto opacity-50">/</span>
            <a href="#" className="self-stretch my-auto opacity-50">Gaming</a>
            <span className="self-stretch my-auto opacity-50">/</span>
            <span className="self-stretch my-auto">Havic HV G-92 Gamepad</span>
            </nav>
            <div className="mt-20 w-full max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
                <div className="flex flex-col w-[64%] max-md:ml-0 max-md:w-full">
                </div>
                <div className="flex flex-col ml-5 w-[36%] max-md:ml-0 max-md:w-full">
                <ProductDetails />
                </div>
            </div>
            </div>
        </main>
    </>
  );
}

export default Details;