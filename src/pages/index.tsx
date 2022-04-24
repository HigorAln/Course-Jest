import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import ProductCard from '../components/product-cart';
import Search from '../components/search';
import { useFetchProducts } from '../hooks/use-fetch-products';
import { useCartStore } from '../../store/cart';

const Home: NextPage = () => {
  const {products, error} = useFetchProducts()
  const [term, setTerm] = useState('')
  const [localProducts, setLocalProducts] = useState([])
  const addToCart = useCartStore(state => state.actions.add)

  useEffect(()=>{
    if(term === ""){
      setLocalProducts(products)
    }else{
      setLocalProducts(
        products.filter(({title}: {title: string}) => {
          return title.toLowerCase().indexOf(term.toLowerCase()) > -1;
      }))
    }
  }, [products, term])

  function renderErrorMessage(){
    if(!error) return null
    return <h4 data-testid="server-error">Server is down</h4>
  }

  function renderProductQuantity(){
    return localProducts.length === 1 ? "1 Product" : `${localProducts.length} Products`
  }

	return (
		<main className="my-8" data-testid="product-list">
			<Search doSearch={(term)=> setTerm(term) }/>
			<div className="container mx-auto px-6">
				<h3 className="text-gray-700 text-2xl font-medium">Wrist Watch</h3>
				<span className="mt-3 text-sm text-gray-500">{renderProductQuantity()}</span>
				<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {renderErrorMessage()}
          {products.length === 0 ? (
            <h4 data-testid="no-products-message">No products</h4>
          ) : (
            localProducts.map((product: any) => {
              return (
                <ProductCard
                  addToCard={addToCart}
                  product={product}
                  key={product.id}
                />
              );
            })
          )}
				</div>
			</div>
		</main>
	);
};

export default Home;
