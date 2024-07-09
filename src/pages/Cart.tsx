import { useSelector } from "react-redux";
import PageLayout from "../layouts/PageLayout";
import Product from "../components/Product";
import { RootState } from "../store/root.reducer";
import { Fragment } from "react/jsx-runtime";
import GridLayout from "../layouts/GridLayout";

export default function Cart() {
    const cartProducts = useSelector((state: RootState) => state.cart.products);
    
	return (
        <PageLayout>
			<section className="container m-auto flex flex-col gap-4 w-full">
				{cartProducts.length ? (
                    <>
						<div className="bg-white flex flex-row justify-between items-center p-4 my-4 w-full">
                            <span>
                                <h1 className="text-4xl">Cart</h1>
                                <p className="text-xl my-4">Total ₹{cartProducts.reduce((a, b) => a + b.price, 0)}</p>
                            </span>
                            <button className="bg-emerald-300 rounded-full py-4 px-6 h-max w-max text-md">Proceed to payment</button>
						</div>
						<GridLayout>
							{cartProducts.map((product) => {
                                return (
									<Product
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    description={product.description}
                                    price={product.price}
                                    imgSrc={product.imgSrc}
									></Product>
								);
							})}
						</GridLayout>
					</>
				) : null}
			</section>
		</PageLayout>
	);
}
