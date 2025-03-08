import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function AuthSkeleton () {
    return (
        <section className="flex flex-col self-stretch justify-center px-6">
            <div className="flex flex-col max-w-full ">
                {/* Title */}
                <Skeleton height={32} width="50%" />
                <Skeleton height={20} width="70%" className="mt-4" />

                {/* Form */}
                <div className="flex flex-col mt-12 w-full space-y-6">
                    <Skeleton height={20} width="30%" />
                    <Skeleton height={40} />
                    <Skeleton height={20} width="30%" />
                    <Skeleton height={40} />
                    <Skeleton height={50} />
                    <Skeleton height={20} width="40%" />
                </div>
            </div>
        </section>
    );
}
export default AuthSkeleton;
