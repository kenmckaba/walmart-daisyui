import { create } from 'zustand'

export type CartProduct = {
	id: number
	title: string
	price: number
	quantity: number
	total: number
	discountPercentage: number
	discountedPrice: number
}

interface ShoppingCartState {
	items: CartProduct[]
	addItem: (item: CartProduct) => void
	removeItem: (id: number) => void
	clearCart: () => void
}

export const useShoppingCart = create<ShoppingCartState>((set) => ({
	items: [],
	addItem: (item) => set((state) => ({ items: [...state.items, item] })),
	removeItem: (id) =>
		set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
	clearCart: () => set({ items: [] }),
}))
