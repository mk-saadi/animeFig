import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosHook from "./useAxiosHook";

const useUser = () => {
	const { user, loading } = useContext(AuthContext);
	const [isUser, setIsUser] = useState(false);
	const [isUserLoading, setIsUserLoading] = useState(true);
	const [axiosSecure] = useAxiosHook();

	useEffect(() => {
		if (!loading && user?.email && localStorage.getItem("access-token")) {
			axiosSecure
				.get(`/users/general_user/${user?.email}`)
				.then((res) => {
					setIsUser(res.data.general_user);
					setIsUserLoading(false);
				})
				.catch((error) => {
					console.error("Error fetching user data:", error);
					setIsUser(false);
					setIsUserLoading(false);
				});
		} else {
			setIsUser(false);
			setIsUserLoading(false);
		}
	}, [axiosSecure, loading, user]);

	return [isUser, isUserLoading];

	// const { user, loading } = useContext(AuthContext);
	// const [axiosSecure] = useAxiosHook();
	// const { data: isUser, isLoading: isUserLoading } = useQuery(["isUser", user?.email], {
	// 	enabled: !loading && !!user?.email && !!localStorage.getItem("access-token"),
	// 	queryFn: async () => {
	// 		const res = await axiosSecure.get(`/users/user/${user?.email}`);
	// 		return res.data.user;
	// 	},
	// });

	// return [isUser, isUserLoading];
};

export default useUser;
