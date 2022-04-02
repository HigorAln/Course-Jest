import { screen, render, fireEvent } from '@testing-library/react';
import { debug } from 'console';
import CardItem from './cart-item';

const product = {
	title: 'Relogio bonito',
	price: '22.00',
	image:
		'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80',
};

const renderProductCard = () => {
	render(<CardItem product={product} />);
};

describe('CardItem Component', () => {
	it('should be render ProductCard', () => {
		renderProductCard();

		expect(screen.getByTestId('cart-item')).toBeInTheDocument();
	});
	it('should display proper content', () => {
		renderProductCard();

		expect(screen.getByText(product.title)).toBeInTheDocument();

		expect(
			screen.getByText(new RegExp(product.price, 'i')),
		).toBeInTheDocument();

		expect(screen.getByTestId('image')).toHaveProperty('src', product.image);

		expect(screen.getByTestId('image')).toHaveProperty('alt', product.title);
	});

	it('should display 1 as initial quantity', () => {
		renderProductCard();

		// console.log(screen.getByTestId('quantity').textContent); // usado para pegar o conteudo

		expect(screen.getByTestId('quantity').textContent).toBe('1');
	});

	it('should increase quantity by 1 when clicking on + button', () => {
		renderProductCard();

		const [_, button] = screen.getAllByRole('button');

		fireEvent.click(button);

		expect(screen.getByTestId('quantity').textContent).toBe('2');
	});

	it('should decrease quantity by 1 when clicking on - button', () => {
		renderProductCard();

		const [buttonDecrease, buttonIncrease] = screen.getAllByRole('button');
		const quantity = screen.getByTestId('quantity');

		fireEvent.click(buttonIncrease);
		expect(quantity.textContent).toBe('2');

		fireEvent.click(buttonDecrease);
		expect(quantity.textContent).toBe('1');
	});

	it('should not go below zero in the quantity', () => {
		renderProductCard();

		const [buttonDecrease] = screen.getAllByRole('button');
		const quantity = screen.getByTestId('quantity');

		expect(quantity.textContent).toBe('1');
		fireEvent.click(buttonDecrease);
		fireEvent.click(buttonDecrease);

		expect(quantity.textContent).toBe('0');
	});
});
