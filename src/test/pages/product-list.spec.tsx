import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import ProductList from '../../pages';
import { makeServer } from '../../miragejs/server';
import { Response, Server } from 'miragejs';
import userEvent from '@testing-library/user-event';

const renderProductList = () => {
	render(<ProductList />);
};

describe('ProductList', () => {
	let server: Server;

	beforeEach(() => {
		server = makeServer({ environment: 'test' });
	});

	afterEach(() => {
		server.shutdown();
	});

	it('ProductList render ProductList', () => {
		renderProductList();
		expect(screen.getByTestId('product-list')).toBeInTheDocument();
	});

	it('should be render the productCard component 10 times', async () => {
		server.createList('product', 10);
		renderProductList();

		await waitFor(() => {
			expect(screen.getAllByTestId('product-card')).toHaveLength(10);
		});
	});

  it('should be render the "no products message"', async () => {
    renderProductList();
    
    await waitFor(() => {
      expect(screen.getByTestId('no-products-message')).toBeInTheDocument();
    })
  });

  it('should display error message when promise rejects', async () => {
    server.get("products", ()=> {
      return new Response(500, {}, '');
    })

    renderProductList();

    await waitFor(() => {
      expect(screen.getByTestId("server-error")).toBeInTheDocument()
      expect(screen.queryByTestId("no-products")).toBeNull()
      expect(screen.queryAllByTestId("product-card")).toHaveLength(0)
    })
  });

  fit('should filter the products list when a search is performed', async () => {
    const searchTerm = "relogio bonito"
    server.createList("product", 2);

    server.create("product", {
      title: searchTerm,
      id: "20"
    })

    renderProductList();

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(3)
    })

    const form = screen.getByRole("form")
    const input = screen.getByRole("searchbox")

    await userEvent.type(input, searchTerm)
    fireEvent.submit(form)

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(1)
    })
  });

  it.todo('should display the total quantity of products')
  it.todo("should display products (singular) when there is onlu one product")
});
