import React, { Suspense, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../store/root.reducer";
import { useDispatch, useSelector } from "react-redux";
import {
	setSearchString,
	setReturnToPageUrl,
} from "../store/slices/search.slice";
import Loading from "./Loading";

interface ISearchBarProps {
	companyLogoSrc: string;
	isSearching: boolean;
	setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IApiSearchRequestConfig {
	delay: number;
	debounceTimeout: NodeJS.Timeout | null;
}

function SearchBar({
	companyLogoSrc,
	isSearching,
	setIsSearching,
}: ISearchBarProps) {
	const apiSearchRequest: IApiSearchRequestConfig = {
		delay: 500,
		debounceTimeout: null,
	};

	const closeButtonRef = useRef<HTMLSpanElement | null>(null);

	const location = useLocation();
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const searchString = useSelector(
		(state: RootState) => state.search.searchString
	);
	const returnToPageUrl = useSelector(
		(state: RootState) => state.search.returnToPageUrl
	);

	const handleInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (apiSearchRequest.debounceTimeout) {
			clearTimeout(apiSearchRequest.debounceTimeout);
		}

		apiSearchRequest.debounceTimeout = setTimeout(() => {
			dispatch(setSearchString(event.target.value));
		}, apiSearchRequest.delay);
	};

	const hideCloseButton = (hide: boolean) => {
		const closeButton = closeButtonRef.current;
		if (!closeButton) return;

		if (hide) {
			closeButton.classList.add("hidden");
			return;
		}

		closeButton.classList.remove("hidden");
	};

	const handleFocus = () => {
		dispatch(setReturnToPageUrl(location.pathname));
		setIsSearching(true);
		hideCloseButton(false);
		navigate("/search");
	};

	const handleBlur = () => {
		setIsSearching(false);
		if (!searchString.length) {
			hideCloseButton(true);
			navigate(returnToPageUrl);
		}
	};

	const handleClose = () => {
		setIsSearching(false);
		hideCloseButton(true);
		navigate(returnToPageUrl);
	};

	useEffect(() => {
		const closeButton = closeButtonRef.current;
		if (!closeButton) return;

		if (location.pathname !== "/search") {
			hideCloseButton(true);
		}
	}, [location]);

	return (
		<span className="relative">
			<input
				type="text"
				name="search"
				placeholder={`${
					isSearching ? "Search products..." : "Search products by"
				}`}
				className="search-bar"
				style={{
					backgroundImage: `${
						isSearching ? "none" : "url(" + companyLogoSrc + ")"
					}`,
				}}
				onChange={handleInput}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
			<span
				ref={closeButtonRef}
				className="material-symbols-outlined absolute right-1.5 top-[5px] bg-red-300 text-sky-900 rounded-full cursor-pointer hidden"
				onClick={handleClose}
			>
				close
			</span>
		</span>
	);
}

export default function Navbar({ companyLogoSrc }: { companyLogoSrc: string }) {
	const [isSearching, setIsSearching] = useState<boolean>(false);
	const location = useLocation();

	return (
		<span className="fixed top-0 left-0 block w-full bg-white shadow-md z-50 opacity-75">
			<nav
				className={`container grid md:grid-cols-[auto_auto_max-content_max-content] ${
					isSearching
						? "grid-cols-1"
						: "grid-cols-[auto_max-content_max-content]"
				} gap-2 box-border mx-auto p-2 h-12`}
			>
				<Link to={"/"} className="w-36 hidden md:inline">
					<Suspense fallback={<Loading />}>
						<img
							src={companyLogoSrc}
							width={250}
							height={250}
							alt="weird"
						/>
					</Suspense>
				</Link>
				<SearchBar
					companyLogoSrc={companyLogoSrc}
					isSearching={isSearching}
					setIsSearching={setIsSearching}
				></SearchBar>
				<Link to={"/"}>
					<span
						className={`material-symbols-outlined md:inline -my-0.5 translate-y-0.5 text-2xl font-thin ${
							location.pathname === "/"
								? "text-sky-500 border-b-2 border-sky-500"
								: "text-sky-900"
						} ${isSearching ? "hidden" : "inline"}`}
					>
						home
					</span>
				</Link>
				<Link to={"/cart"}>
					<span
						className={`material-symbols-outlined md:inline -my-0.5 translate-y-0.5 text-2xl font-thin ${
							location.pathname === "/cart"
								? "text-sky-500 border-b-2 border-sky-500"
								: "text-sky-900"
						} ${isSearching ? "hidden" : "inline"}`}
					>
						shopping_cart
					</span>
				</Link>
			</nav>
		</span>
	);
}
