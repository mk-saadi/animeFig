/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { BsFillArrowRightSquareFill } from "react-icons/bs";

const Products = ({ figS }) => {
    return (
        <div className="relative">
            <img
                src={figS.img}
                alt=""
                className="rounded-sm mb-3 h-[200px] w-auto object-cover"
            />
            <p className="text-sm mb-20 text-left px-2">{figS.name}</p>

            <Link
                to={`/figures/${figS._id}`}
                className="absolute bottom-0 w-full"
            >
                <p className="my-2 text-error text-xl">{figS.price}</p>
                <button className="btn btn-xs md:btn-sm px-6 btn-info rounded-sm text-white text-xs flex justify-center items-center gap-2 flex-nowrap">
                    Details <BsFillArrowRightSquareFill />
                </button>
            </Link>
        </div>
    );
};

export default Products;
