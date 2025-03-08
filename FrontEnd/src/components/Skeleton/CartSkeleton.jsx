import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CartSkeleton() {
    return (
        <div className="pointer-events-none sticky top-0">
            <div className="pointer-events-auto">
                <div className="flex h-full flex-col border border-gray-300 shadow-md shadow-gray-200 rounded-lg overflow-y-scroll">
                    <div className="flex-1 overflow-y-auto py-6 sm:px-6">
                        {/* Header */}
                        <div className="flex justify-center">
                            <div className="flex justify-center items-center">
                                <Skeleton circle={true} height={32} width={32} />
                                <h2 className="ml-2 text-lg font-medium text-gray-300">
                                    <Skeleton width={100} />
                                </h2>
                            </div>
                        </div>

                        {/* Skeleton Items */}
                        <div className="mt-8">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {Array(3)
                                    .fill(null)
                                    .map((_, index) => (
                                        <li key={index} className="flex py-6">
                                            <Skeleton height={80} width={80} className="rounded-md" />
                                            <div className="ml-4 flex-1">
                                                <Skeleton height={20} width="70%" className="mb-2" />
                                                <Skeleton height={20} width="50%" />
                                            </div>
                                            <div className="ml-4">
                                                <Skeleton height={20} width={50} />
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>

                    {/* Footer Skeleton */}
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-300">
                            <p>
                                <Skeleton width={70} />
                            </p>
                            <p>
                                <Skeleton width={70} />
                            </p>
                        </div>
                        <div className="mt-6 flex justify-center items-center">
                            <Skeleton height={48} width="80%" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartSkeleton;
