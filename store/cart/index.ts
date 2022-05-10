import produce from 'immer'
import create from 'zustand'
import product from '../../src/miragejs/factories/product';

const initialState = {
  open: false,
  products: []
}

export const useCartStore = create((set: any) => {
  const setState = (fn: any) => set(produce(fn));

  return {
    state: {
      ...initialState
    },
    actions: {
      toggle(){
        setState(( { state }: { state: any} )=>{
          state.open = !state.open
        })
      },
      add(product: any){
        setState(( {state}: { state: any} ) => {
          const doesntExist = !state.products.find(({ id }:{ id: string }) => id === product.id)

          if(doesntExist) {
            if(!product.quantity){
              product.quantity = 1
            }
            state.products.push(product);
            state.open = true;
          }
        })
      },
      increase(product: any){
        setState(({ state }: { state: any}) => {
          const localProduct = state.products.find(({ id }: { id: any }) => id === product.id);

          if(localProduct){
            localProduct.quantity++;
          }
        })
      },
      decrease(product: any){
        setState(({ state }: { state: any}) => {
          const localProduct = state.products.find(({ id }: { id: any }) => id === product.id);

          if(localProduct){
            if(localProduct.quantity === 0) return
            
            localProduct.quantity--;
          }
        })
      },
      remove(product: any) {
        setState(({ state }: { state: any}) => {
          const exists = !!state.products.find(({ id }:{ id: string }) => id === product.id)

          if(exists){
            state.products = state.products.filter(({ id }:{ id: string }) => {
              return id !== product.id;
            })
          }
        })
      },
      removeAll(){
        setState(({ state }: { state: any}) => {
          state.products = [];
        })
      },
      reset(){
        setState((store: any) => {
          store.state = initialState
        })
      }, 
    },
  }
})