import { screen, render, waitFor } from '@testing-library/react';
import ProductList from '../../pages';
import { makeServer } from '../../miragejs/server';

const renderProductList = () => {
	render(<ProductList />);
};

describe('ProductList', () => {
	let server: any;

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
});
