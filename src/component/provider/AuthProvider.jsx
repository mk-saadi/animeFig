import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithRedirect,
	signOut,
	updateProfile,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

const auth = getAuth(app);

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const googleProvider = new GoogleAuthProvider();

	const newUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const updateProfileInfo = (displayName, photoURL) => {
		return updateProfile(auth.currentUser, {
			displayName: displayName,
			photoURL: photoURL,
		});
	};

	const signIn = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	googleProvider.setCustomParameters({
		prompt: "login",
	});

	const signInWithGoogleRedirect = () => {
		signInWithRedirect(auth, googleProvider);
	};

	const logOut = () => {
		setLoading(true);
		return signOut(auth);
	};

	// useEffect(() => {
	// 	const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
	// 		setLoading(false);
	// 		setUser(currentUser);
	// 		if (currentUser) {
	// 			localStorage.setItem("user", JSON.stringify(currentUser));
	// 		} else {
	// 			localStorage.removeItem("user");
	// 		}
	// 	});
	// 	return () => {
	// 		return unsubscribe;
	// 	};
	// }, []);

	// useEffect(() => {
	// 	const storedUser = localStorage.getItem("user");
	// 	if (storedUser) {
	// 		setUser(JSON.parse(storedUser));
	// 	}
	// }, []);
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			if (currentUser) {
				axios
					.post("http://localhost:3000/jwt", {
						email: currentUser.email,
					})
					.then((data) => {
						localStorage.setItem("access-token", data.data.token);
						setLoading(false);
					});
			} else {
				localStorage.removeItem("access-token");
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const authInfo = {
		user,
		loading,
		newUser,
		signIn,
		signInWithGoogleRedirect,
		logOut,
		updateProfileInfo,
	};

	return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
