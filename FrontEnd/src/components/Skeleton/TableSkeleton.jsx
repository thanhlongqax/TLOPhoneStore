import { Skeleton } from 'antd';

function TableSkeleton() {
    return (
        <div className="flex  p-6 justify-center items-center">
            <Skeleton active />
        </div>

    );
}
export default TableSkeleton;