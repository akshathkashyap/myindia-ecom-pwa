import { Suspense, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/root.reducer";
import { setProducts } from "../store/slices/cart.slice";
import Loading from "./Loading";

interface IProduct {
	id: number;
	name: string;
	description: string;
	price: number;
	imgSrc: string;
	cartActionDisabled?: boolean;
}

export default function Product({
	id,
	name,
	description,
	price,
	imgSrc,
	cartActionDisabled = false,
}: IProduct) {
	const imageApiUrl: string =
		(process.env.REACT_APP_API ?? "http://192.168.29.22:3000") + "/static/";
	const src: string = imageApiUrl + imgSrc;

	const dispatch = useDispatch();
	const cartProducts = useSelector((state: RootState) => state.cart.products);

	const productCardRef = useRef<HTMLSpanElement | null>(null);
	const addToCartButtonRef = useRef<HTMLSpanElement | null>(null);

	const [isAddedToCart, setIsAddedToCart] = useState<boolean>((): boolean => {
		if (!cartProducts.length) {
			return false;
		}

		const productIndex: number = cartProducts.findIndex(
			(product) => product.id === id
		);
		if (productIndex === -1) {
			return false;
		}

		return true;
	});

	const handleCart = () => {
		const productCard = productCardRef.current;
		const addToCartButton = addToCartButtonRef.current;
		if (!productCard || !addToCartButton) return;

		if (isAddedToCart) {
			productCard.classList.remove("added");
			productCard.classList.add("removed");

			dispatch(
				setProducts(cartProducts.filter((product) => product.id !== id))
			);
		} else {
			productCard.classList.add("added");
			productCard.classList.remove("removed");

			dispatch(
				setProducts([
					...cartProducts,
					{
						id,
						name,
						description,
						price,
						imgSrc,
					},
				])
			);
		}

		setIsAddedToCart(!isAddedToCart);
	};

	return (
		<span ref={productCardRef} className="product-card">
			<div className="flex flex-row gap-4">
				<Suspense fallback={<Loading />}>
					<img
						className="w-24 md:w-36 h-24 md:h-36 object-cover rounded-md border-2 border-sky-500"
						src={src}
						width={250}
						height={250}
						alt={name}
					/>
				</Suspense>
				<div>
					<p className="text-2xl">₹{price}</p>
					<h1 className="text-xl">{name}</h1>
					<p className="text-md mt-5">{description}</p>
				</div>
			</div>
			{cartActionDisabled ? null : (
				<span
					ref={addToCartButtonRef}
					className={`flex flex-col justify-between rounded-full px-1 py-2 cursor-pointer ${
						isAddedToCart ? "bg-emerald-300" : "bg-amber-300"
					}`}
					onClick={handleCart}
				>
					<span
						className={`material-symbols-outlined text-2xl font-thin ${
							isAddedToCart ? "text-emerald-300" : "text-sky-900"
						}`}
					>
						add_shopping_cart
					</span>
					<span
						className={`material-symbols-outlined text-2xl font-thin ${
							isAddedToCart ? "text-sky-900" : "text-amber-300"
						}`}
					>
						remove_shopping_cart
					</span>
				</span>
			)}
		</span>
	);
}
