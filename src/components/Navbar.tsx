import { useEffect, useState } from "react";

function SearchBar() {
	const apiSearchRequestDelay: number = 500;
	const [searchString, setSearchString] = useState<string>("");

	const handleInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
		setTimeout(() => {
			setSearchString(event.target.value);
		}, apiSearchRequestDelay);
	};

	const handleFocus = () => {
		console.log("open search window");
	};

	const handleBlur = () => {
		console.log("close search window");
	};

	useEffect(() => {
		if (searchString === "") return;
		console.log("searching for: ", searchString);
	}, [searchString]);

	return (
		<input
			type="text"
			name="search"
			placeholder="Search Products..."
			className="box-border rounded-full px-3 py-1 ring-1 shadow-md border-gray-300 focus:outline-none"
			onChange={handleInput}
			onFocus={handleFocus}
			onBlur={handleBlur}
		/>
	);
}

export default function Navbar() {
	const navbarImgSrc: string = process.env.PUBLIC_URL + "myindia.png";

	return (
		<span className="fixed top-0 left-0 block w-full bg-white shadow-md z-50 opacity-75">
			<nav className="container flex justify-between box-border mx-auto p-2 h-12">
				<img className="" src={navbarImgSrc} alt="weird" />
				<SearchBar></SearchBar>
			</nav>
		</span>
	);
}
