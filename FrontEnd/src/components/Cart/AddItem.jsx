import PropTypes from "prop-types";

function AddItem({ image, title, price, quantity , onRemove  }) {
    return (
        <li className="flex py-6">
            <div
                className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={`${import.meta.env.VITE_BASE_URL}/images/${image}`}
                    alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                    className="h-full w-full object-cover object-center"/>
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div
                        className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            <a href="#">{title}</a>
                        </h3>
                        <p className="ml-4">{price}</p>

                    </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="">Số lượng {quantity}</p>
                    <div className="flex">
                        <button type="button"
                                onClick={onRemove}
                                className="font-medium border-transparent rounded-full hover:bg-gradient-to-r from-cyan-500 to-blue-500">
                            <img src="/icon/icons8-trash-50.png" alt="delete icon" className="w-12 h-12"/>
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
}

AddItem.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired,
};
export default AddItem;
