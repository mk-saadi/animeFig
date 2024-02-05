import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <img
                src="https://internetdevels.com/sites/default/files/public/blog_preview/404_page_cover.jpg"
                alt=""
                className="w-2/4 md:w-2/5 h-auto shadow-lg mb-8"
            />
            <h2 className="text-3xl text-center font-bold text-error">
                Sorry, There Seems <br /> To Be An Error
            </h2>
            <Link
                to="/"
                className="mt-10"
            >
                <button className="btn btn-accent rounded-sm">Home Page</button>
            </Link>
        </div>
    );
};

export default ErrorPage;
