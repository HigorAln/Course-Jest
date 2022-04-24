import create from 'zustand'

const initialState = {
  open: false,
  products: []
}

export const useCartStore = create((set: any) => ({
  state: {
    ...initialState
  },
  actions: {
    toggle: () => set((store: any) => ({ state: { open: !store.state.open } })),
    reset: () => set((store: any) => ({state: {...initialState}})), 
    add: (product: any) => set((store: any) => ({ state: { open: true, products: [...store.state.products, product] } })),
  },
}))