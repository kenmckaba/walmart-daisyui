import { useSuspenseQuery } from '@tanstack/react-query'
import axios from 'axios'

export type Product = {
	id: number
	title: string
	price: number
	description: string
	category: string
	images: string[]
	rating: number
}

export const useProducts = (category: string) => {
	const { data: products } = useSuspenseQuery({
		queryKey: ['products', category],
		queryFn: async () => {
			await new Promise((resolve) => setTimeout(resolve, 2000)) // simulate network delay
			const response = await axios.get(
				`https://dummyjson.com/products/category/${category}`,
			)
			return response.data
		},
	})
	return { products }
}
