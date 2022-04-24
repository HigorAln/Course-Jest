import { screen, render, fireEvent } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks';
import { Server } from 'miragejs';
import { useCartStore } from '../../store/cart';
import { makeServer } from '../miragejs/server';
import Cart from './cart';

describe('Cart', () => {
  let server: Server;
  let result: any;
  let add: any;
  let toggle: any;
  let spy: any;
  let reset;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
    result = renderHook(() => useCartStore()).result
    reset = result.current.actions.reset;
    add = result.current.actions.add;
    toggle = result.current.actions.toggle;
    spy = jest.spyOn(result.current.actions, 'toggle');
  })

  afterEach(()=> {
    server.shutdown()
    jest.clearAllMocks()
  })

  it('should add css class hidden in the component', () => {
    render(<Cart />)

    expect(screen.getByTestId("cart")).toHaveClass("hidden")
  });

  it('should add css class hidden in the component', () => {
    act(()=> {
      toggle();
    })
    render(<Cart />)

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
});