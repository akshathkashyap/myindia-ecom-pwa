import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";

function App() {
	const companyLogoSrc: string = process.env.PUBLIC_URL + "myindia.png";
	const links = [
		{
			title: "FAQs",
			link: "https://en.wikipedia.org/wiki/FAQ"
		},
		{
			title: "Contributors",
			link: "https://en.wikipedia.org/wiki/Contributor"
		},
		{
			title: "Help Desk",
			link: "https://en.wikipedia.org/wiki/Help_desk"
		}
	];

	return (
		<>
			<Navbar companyLogoSrc={companyLogoSrc}></Navbar>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/search" element={<Search />}></Route>
				<Route path="/cart" element={<Cart />}></Route>
			</Routes>
			<Footer companyLogoSrc={companyLogoSrc} links={links}></Footer>
		</>
	);
}

export default App;
