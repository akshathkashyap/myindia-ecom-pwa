import { Suspense } from "react";
import Loading from "./Loading";

interface IHeader {
	heading: string;
	list: {
		imgSrc: string;
		title: string;
		subheading?: string;
	}[];
}

export default function Header({ heading, list }: IHeader) {
	const imageApiUrl: string =
		(process.env.REACT_APP_API ?? "http://192.168.29.22:3000") + "/static/";

	return (
		<section className="bg-gradient-to-r from-amber-400 to-amber-500">
			<h1 className="text-4xl py-2 mb-8 text-center">{heading}</h1>
			<div className="flex flex-row overflow-x-scroll w-full">
				{list.map((item, index: number) => {
					return (
						<div key={index} className="shrink-0 w-56">
							<span className="box-border block border-l-4 border-black min-h-24 px-2">
								<h1 className="text-2xl">{item.title}</h1>
								{item.subheading ? (
									<h2 className="text-xl">
										{item.subheading}
									</h2>
								) : null}
							</span>
							<Suspense fallback={<Loading />}>
								<img
									className={`w-full object-cover rounded-b-xl border-t-4 border-black ${
										index % 2 === 0 ? "h-96" : "h-56"
									}`}
									src={imageApiUrl + item.imgSrc}
									width={250}
									height={250}
									alt={item.title ?? "weird"}
								/>
							</Suspense>
						</div>
					);
				})}
			</div>
		</section>
	);
}
