import axios from "axios";
import { useState, useEffect } from "react";

export const useUsersState = () => {
	const [users, setUsers] = useState([]);
	const fetchUsers = async () => {
		try {
			const response = await fetch(`${import.meta.env.VITE_URL}/users`);
			const data = await response.json();
			setUsers(data);
		} catch (error) {
			console.error("Failed to fetch users", error);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return [users, setUsers];
};

export const useAddedFiguresState = () => {
	const [figures, setFigures] = useState([]);
	const fetchFigures = async () => {
		try {
			const response = await fetch(`${import.meta.env.VITE_URL}/figures`);
			const data = await response.json();
			setFigures(data);
		} catch (error) {
			console.error("Failed to fetch figures", error);
		}
	};

	useEffect(() => {
		fetchFigures();
	}, []);

	return [figures, setFigures];
};

export const useCategoriesState = () => {
	const [categories, setCategories] = useState([]);
	const fetchCategories = async () => {
		try {
			const response = await fetch(`${import.meta.env.VITE_URL}/categories`);
			const data = await response.json();
			setCategories(data);
		} catch (error) {
			console.error("Failed to fetch categories", error);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	return [categories, setCategories];
};

export const useAddedFigures = (params = {}) => {
	const [figureData, setFigureData] = useState([]);
	const [isLoading, setIsLoading] = useState(false); // Added loading state
	const [error, setError] = useState(null); // Added error state

	const { category, _id } = params; // Destructure params

	useEffect(() => {
		const fetchFigures = async () => {
			setIsLoading(true);
			setError(null); // Reset error on each fetch

			try {
				let url = `${import.meta.env.VITE_URL}/addedFigure/`; // Base URL

				if (category) {
					url += `category?category=${category}`;
				} else if (_id) {
					url += `${_id}`;
				} else {
					// Handle case where no params are provided (optional)
					console.warn("No category or _id provided to useAddedFigures hook.");
				}

				const res = await axios.get(url);
				const data = res.data;
				setFigureData(data);
			} catch (err) {
				console.error("Failed to fetch figures:", err);
				setError(err); // Set error state
			} finally {
				setIsLoading(false);
			}
		};

		fetchFigures();
	}, [category, _id]); // Re-fetch data when params change

	return { figureData, isLoading, error }; // Return all relevant data
};

export const useFigures = (endpoint = "/figures") => {
	const [figure, setFigure] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchFigures = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const res = await axios.get(`${import.meta.env.VITE_URL}${endpoint}`);
				const data = res.data;
				setFigure(data);
			} catch (err) {
				console.error(`Failed to fetch figures from ${endpoint}:`, err);
				setError(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchFigures();
	}, [endpoint]);

	return { figure, isLoading, error };
};
