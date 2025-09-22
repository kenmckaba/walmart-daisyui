import { useQuery } from '@tanstack/react-query'
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
	const {
		isPending,
		error,
		data: products,
	} = useQuery({
		queryKey: ['products', category],
		queryFn: async () => {
			const response = await axios.get(
				`https://dummyjson.com/products/category/${category}`,
			)
			return response.data
		},
	})

	return {
		products,
		isPending,
		error,
	}
}
