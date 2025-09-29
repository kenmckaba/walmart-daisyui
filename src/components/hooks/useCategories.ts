import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export type Category = {
	name: string
	slug: string
	url: string
}

export const useCategories = () => {
	const {
		isPending,
		error,
		data: categories,
	} = useQuery({
		queryKey: ['categories'],
		queryFn: async () => {
			const response = await axios.get(
				'https://dummyjson.com/products/categories',
			)
			return response.data
		},
	})

	return {
		categories,
		isPending,
		error,
	}
}
