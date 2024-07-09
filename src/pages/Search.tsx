import { useCallback, useEffect, useState } from "react";
import { RootState } from "../store/root.reducer";
import { useSelector } from "react-redux";
import Product from "../components/Product";
import PageLayout from "../layouts/PageLayout";
import GridLayout from "../layouts/GridLayout";
import Axios from "../lib/axios";

export default function Search() {
	const [productsList, setProductsList] = useState<Record<string, string>[]>(
		[]
	);

	const searchString = useSelector(
		(state: RootState) => state.search.searchString
	);

	const search = useCallback(async () => {
		const apiRequester = new Axios();
		const searchParams = {
			searchString,
		};
		const response = await apiRequester.get("/search", searchParams);

		if (!response) return;

		setProductsList(response.data);
	}, [searchString]);

	useEffect(() => {
		if (!searchString.length) {
			setProductsList([]);
			return;
		}
		search();
	}, [searchString, search]);

	return (
		<PageLayout>
			<GridLayout>
				{productsList.length
					? productsList.map((product) => {
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
					  })
					: null}
			</GridLayout>
		</PageLayout>
	);
}
