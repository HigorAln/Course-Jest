import { screen, render, fireEvent } from '@testing-library/react';
import ProductCart from './product-cart';

const product = {
	title: 'Relogio bonito',
	price: '22.00',
	image: 'https://github.com/higoraln.png',
};

const addToCard = jest.fn();

const renderProductCard = () => {
	render(<ProductCart product={product} addToCard={addToCard} />);
};

describe('ProductCart Component', () => {
	it('should be render ProductCard', () => {
		renderProductCard();

		expect(screen.getByTestId('product-card')).toBeInTheDocument();
	});
	it('should display proper content', () => {
		renderProductCard();

		expect(screen.getByText(product.title)).toBeInTheDocument();

		expect(
			screen.getByText(new RegExp(product.price, 'i')),
		).toBeInTheDocument();

		expect(screen.getByTestId('image')).toHaveStyle({
			backgroundImage: `url(${product.image})`,
		});
	});

	it('should call props.addToCard() when button gets clicked', () => {
		renderProductCard();

		const button = screen.getByRole('button');

		fireEvent.click(button);

		expect(addToCard).toHaveBeenCalledTimes(1);
		expect(addToCard).toHaveBeenCalledWith(product);
	});
});
