import { screen, render, fireEvent } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks';
import { Server } from 'miragejs';
import { useCartStore } from '../../store/cart';
import { makeServer } from '../miragejs/server';
import { setAutoFreeze } from 'immer';
import Cart from './cart';

setAutoFreeze(false)

describe('Cart', () => {
  let server: Server;
  let result: any;
  let add: any;
  let spy: any;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
    result = renderHook(() => useCartStore()).result
    add = result.current.actions.add;
    spy = jest.spyOn(result.current.actions, 'toggle');
  })

  afterEach(()=> {
    server.shutdown()
    jest.clearAllMocks()
  })

  it('should add css class "hidden" in the component', () => {
    render(<Cart />)

    expect(screen.getByTestId("cart")).toHaveClass("hidden")
  });

  it('should remove css class "hidden" in the component', () => {
    render(<Cart />)

    const button = screen.getByTestId("close-button")

    fireEvent.click(button)

    expect(screen.getByTestId("cart")).not.toHaveClass("hidden")
  });

  it('should call store toggle() twice', () => {
    render(<Cart />)
    const button = screen.getByTestId("close-button")

    fireEvent.click(button)
    fireEvent.click(button)

    expect(spy).toHaveBeenCalledTimes(2)
  });

  it('should display 2 products cards', () => {
    const products = server.createList("product", 2);

    act(()=> {
      for(const product of products) {
        add(product)
      }
    })

    render(<Cart />)

    expect(screen.getAllByTestId("cart-item")).toHaveLength(2)
  });
  
  it('should remove all products when clier cart button is clicked',() => {
    const products = server.createList("product", 2);

    act(()=>{
      for(const product of products){
        add(product);
      }
    })

    render(<Cart />);

    expect(screen.getAllByTestId("cart-item")).toHaveLength(2);

    const button = screen.getByRole("button", {name: /clear cart/i });

    fireEvent.click(button)

    expect(screen.queryAllByTestId("cart-item")).toHaveLength(0)
  });

  it('should not display clear cart button if no products are in the cart', ()=>{
    render(<Cart />)

    expect(screen.queryByRole("button", { name: /clear cart/i })).not.toBeInTheDocument()
  })
});