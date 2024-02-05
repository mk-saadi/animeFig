import "./footer.css";
import image from "../../assets/img.png";
import gur from "../../assets/gur.png";
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="relative inner-shadow">
            <div className="footing">
                <div className="bg-gray-600 bg-opacity-50 text-center py-14">
                    <img
                        src={gur}
                        alt=""
                        className="h-24 mx-auto w-24 grayscale select-none pointer-events-none"
                    />
                    <h4 className="text-2xl mb-6 font-bold">Authenticity Guaranteed</h4>
                    <p className="text-xs sm:text-sm text-gray-400">
                        Shipping Japan's finest OTAKU goods to the world! <br /> That is the
                        AnimeFig's Shop mission!
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400">
                        To live up to it, AnimeFig's experienced buyers carefully select
                        high-quality,
                        <br />
                        beautifully designed products that are always authentic.
                    </p>
                </div>
                <footer className="footer p-10 bg-gray-800 bg-opacity-70 text-gray-400">
                    <div>
                        <img
                            src={image}
                            alt=""
                            className="h-24 w-24 drop-shadow-md"
                        />
                        <p>
                            AnimeFig Private Inc.
                            <br />
                            Shipping Exquisite Merch SInce 2009.
                        </p>
                    </div>
                    <div className="order-3">
                        <span className="footer-title">Social</span>
                        <a
                            className="link link-hover flex justify-center items-center gap-1"
                            href="#"
                        >
                            <FaFacebookSquare />
                            Facebook
                        </a>
                        <a
                            className="link link-hover flex justify-center items-center gap-1"
                            href="#"
                        >
                            <FaInstagramSquare /> Instagram
                        </a>
                        <a
                            className="link link-hover flex justify-center items-center gap-1"
                            href="#"
                        >
                            <FaTwitterSquare />
                            Twitter
                        </a>
                        <a
                            className="link link-hover flex justify-center items-center gap-1"
                            href="#"
                        >
                            <FaLinkedin />
                            LinkedIn
                        </a>
                    </div>
                    <div className="order-2">
                        <span className="footer-title">Company</span>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                    </div>
                    <div className="order-1">
                        <span className="footer-title">Legal</span>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Footer;
