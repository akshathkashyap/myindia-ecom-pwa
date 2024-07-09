import { Suspense } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

interface IFooter {
	companyLogoSrc: string;
	links: {
		title: string;
		link: string;
	}[];
}

export default function Footer({ companyLogoSrc, links }: IFooter) {
	return (
		<footer className="flex justify-center items-center bg-white mt-8">
			<div className="container flex flex-row justify-center items-center gap-4 divide-x-8 divide-slate-100 h-[25vh]">
				<Link to={"/"} className="w-36">
					<Suspense fallback={<Loading />}>
						<img
							src={companyLogoSrc}
							width={250}
							height={250}
							alt="weird"
						/>
					</Suspense>
				</Link>
				<div className="p-8">
					<h1 className="text-xl mb-4">Links</h1>
					{links.map((link, index: number) => {
						return (
							<Link key={index} className="block text-xs py-1" to={link.link}>
								{link.title}
							</Link>
						);
					})}
				</div>
			</div>
		</footer>
	);
}
