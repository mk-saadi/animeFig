import { useEffect } from "react";

const useTitle = (title) => {
    useEffect(() => {
        document.title = `animeFig | ${title}`;
    }, [title]);
};

export default useTitle;
