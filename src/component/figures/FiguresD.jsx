import { useLoaderData, useNavigate } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

const FiguresD = () => {
    const fig = useLoaderData();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="mx-2 my-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="mx-4">
                    <img
                        src={fig.img}
                        alt=""
                        className="h-[350px] sm:h-[500px] sm:w-auto object-cover rounded-lg mx-auto"
                    />
                    <p className="text-xs italic text-center">{fig.name}</p>
                </div>
                <div className="sm:mr-10 md:mr-36">
                    <div>
                        <p className="text-xl sm:text-2xl text-slate-200 font-semibold mb-4">
                            {fig.name}
                        </p>
                        <p className="text-red-600 font-semibold">
                            US <span className="text-xl">{fig.price}</span>
                        </p>
                        <p>0.62% cash back</p>
                    </div>
                    <div className="text-slate-300 mt-10">
                        <p>
                            <span className="font-semibold">Product Name:</span> {fig.name}
                        </p>
                        <p>
                            <span className="font-semibold">Manufacturer:</span> {fig.Manufacturer}
                        </p>
                        <p>
                            <span className="font-semibold">Seller:</span> {fig.seller}
                        </p>
                        <p className="my-3 text-gray-400">Order Limit: 3 per person</p>
                        <p
                            style={{ whiteSpace: "pre-line" }}
                            className="mt-10"
                        >
                            {fig.description}
                        </p>
                    </div>
                </div>
            </div>
            <button
                onClick={handleGoBack}
                className="btn btn-accent rounded-sm text-white mt-10 sm:mx-10 px-10 flex justify-center items-center gap-2"
            >
                <BsFillArrowLeftSquareFill className=" text-xl"></BsFillArrowLeftSquareFill> Go Back
            </button>
        </div>
    );
};

export default FiguresD;
