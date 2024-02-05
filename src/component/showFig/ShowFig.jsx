import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const ShowFig = ({ fi }) => {
    return (
        <div className="relative">
            <img
                src={fi.img}
                alt=""
                className="rounded-sm mb-3 h-[200px] w-auto object-cover"
            />
            <p className="text-sm mb-20 text-left px-2">{fi.name}</p>

            <Link
                to={`/figDetails/${fi._id}`}
                className="absolute bottom-0 w-full"
            >
                <p className="my-2 text-error text-xl">${fi.price}</p>
                <button className="btn btn-xs md:btn-sm px-6 btn-info rounded-sm text-white text-xs flex justify-center items-center gap-2 flex-nowrap">
                    Details <BsFillArrowRightSquareFill />
                </button>
            </Link>
        </div>
    );
};

export default ShowFig;
