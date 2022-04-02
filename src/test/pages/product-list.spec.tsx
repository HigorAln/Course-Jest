import { screen, render, waitFor } from '@testing-library/react';
import ProductList from '../../pages';

const renderProductList = () => {
	render(<ProductList />);
};

describe('ProductList', () => {
	it('ProductList render ProductList', () => {
		renderProductList();
		expect(screen.getByTestId('product-list')).toBeInTheDocument();
	});

	it('should be render the productCard component 10 times', () => {
		renderProductList();

		waitFor(() => {
			expect(screen.getAllByTestId('product-card')).toHaveLength(10);
		});
	});
});
