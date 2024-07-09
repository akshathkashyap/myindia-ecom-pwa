import React, { useCallback, useEffect, useState } from "react";
import Product from "../components/Product";
import GridLayout from "../layouts/GridLayout";
import PageLayout from "../layouts/PageLayout";
import Header from "../components/Header";
import Axios from "../lib/axios";

interface IProduct {
	imgSrc: string;
	title: string;
	subheading: string;
}

export default function Home() {
	const [productsList, setProductsList] = useState<Record<string, string>[]>(
		[]
	);

	const FOR_DEV_shuffler = (array: []): [] => {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));

			let temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}

		return array;
	};

	const getHeaderList = (): IProduct[] => {
		const list: IProduct[] = productsList.map((product) => {
			return {
				imgSrc: product.imgSrc,
				title: "₹" + product.price,
				subheading: product.name,
			};
		});

		return list;
	};

	const getProducts = useCallback(async () => {
		const apiRequester = new Axios();
		const searchParams = {
			number: "10",
		};
		const response = await apiRequester.get("/lowest-priced", searchParams);

		if (!response) return;

		const productsList = response.data;

		setProductsList(FOR_DEV_shuffler(productsList));
	}, []);

	useEffect(() => {
		getProducts();
	}, [getProducts]);

	return (
		<PageLayout>
			<Header heading="Lowest Prices for" list={getHeaderList()} />
			<h1 className="container text-4xl text-center py-2 mt-8 mb-4">
				Top Selling
			</h1>
			<GridLayout>
				{productsList.map((product: Record<string, string>) => {
					return (
						<Product
							key={product.id}
							id={parseInt(product.id)}
							name={product.name}
							description={product.description}
							price={parseInt(product.price)}
							imgSrc={product.imgSrc}
						></Product>
					);
				})}
			</GridLayout>
			<h1 className="container text-4xl text-center py-2 mt-8 mb-4">
				Coming back soon...
			</h1>
			<GridLayout>
				{productsList.map((product: Record<string, string>) => {
					return (
						<Product
							key={product.id}
							id={parseInt(product.id)}
							name={product.name}
							description={product.description}
							price={parseInt(product.price)}
							imgSrc={product.imgSrc}
							cartActionDisabled={true}
						></Product>
					);
				})}
			</GridLayout>
		</PageLayout>
	);
}
