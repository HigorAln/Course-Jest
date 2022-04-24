import create from 'zustand'

const initialState = {
  open: false,
  products: []
}

const addProduct = (store: Storage, product: any) => {
  if(store.state.products.includes(product)) {
    return store.state.products
  }
  return [...store.state.products, product]
}

export const useCartStore = create((set: any) => ({
  state: {
    ...initialState
  },
  actions: {
    toggle: () => set((store: any) => ({ state: { ...store.state, open: !store.state.open } })),
    reset: () => set((store: any) => ({state: {...initialState}})), 
    add: (product: any) => set((store: any) => ({ state: { open: true, products: addProduct(store, product) } })),
  },
}))