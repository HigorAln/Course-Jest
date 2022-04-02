/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

interface ICartItem {
	product: {
		title: string;
		price: string;
		image: string;
	};
}

export default function CartItem({ product }: ICartItem) {
	const [quantity, setQuantity] = useState(1);

	function increment() {
		setQuantity(quantity + 1);
	}

	function decrement() {
		if (quantity === 0) return;
		setQuantity(quantity - 1);
	}

	return (
		<div className="flex justify-between mt-6" data-testid="cart-item">
			<div className="flex">
				<img
					className="h-20 w-20 object-cover rounded"
					src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"
					alt={product.title}
					data-testid="image"
				/>
				<div className="mx-3">
					<h3 className="text-sm text-gray-600">{product.title}</h3>
					<div className="flex   items-center mt-2">
						<button
							className="text-gray-500 focus:outline-none focus:text-gray-600"
							onClick={decrement}
						>
							<svg
								className="h-5 w-5"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
							</svg>
						</button>
						<span className="text-gray-700 mx-2" data-testid="quantity">
							{quantity}
						</span>
						<button
							className="text-gray-500 focus:outline-none focus:text-gray-600"
							onClick={increment}
						>
							<svg
								className="h-5 w-5"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<span className="text-gray-600">{product.price}$</span>
		</div>
	);
}
