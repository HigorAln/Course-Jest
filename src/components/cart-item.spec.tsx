import { screen, render, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useCartStore } from '../../store/cart';
import CardItem from './cart-item';
import { setAutoFreeze } from 'immer'

setAutoFreeze(false)

const product = {
	title: 'Relogio bonito',
	price: '22.00',
  quantity: 0,
	image:
		'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80',
};

const renderCartItem = () => {
	render(<CardItem product={product} />);
};

describe('CardItem Component', () => {
  let result: any;

  beforeEach(()=> {
    result = renderHook(()=> useCartStore()).result
  })

	it('should be render CartItem', () => {
		renderCartItem();

		expect(screen.getByTestId('cart-item')).toBeInTheDocument();
	});

	it('should display proper content', () => {
		renderCartItem();

		expect(screen.getByText(product.title)).toBeInTheDocument();

		expect(
			screen.getByText(new RegExp(product.price, 'i')),
		).toBeInTheDocument();

		expect(screen.getByTestId('image')).toHaveProperty('src', product.image);

		expect(screen.getByTestId('image')).toHaveProperty('alt', product.title);
	});

  it("should be call remove() when remove button is clicked", async () => {
    const spy = jest.spyOn(result.current.actions, "remove");

    renderCartItem();


    const button = screen.getByRole("button", { name: /remove/i });

    fireEvent.click(button);

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it("should call increase() when increase button is clicked", () => {
    const spy = jest.spyOn(result.current.actions, "increase");

    renderCartItem();

    const button = screen.getByTestId("increase");

    fireEvent.click(button);

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(product)
  })

  it("should call increase() when increase button is clicked", () => {
    const spy = jest.spyOn(result.current.actions, "decrease");

    renderCartItem();

    const button = screen.getByTestId("decrease");

    fireEvent.click(button);

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(product)
  })
});
