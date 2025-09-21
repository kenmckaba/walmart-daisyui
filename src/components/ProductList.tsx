import { type Product, useProducts } from './hooks/useProducts'

export const ProductList = (category: string) => {
	const { products, isPending, error } = useProducts(category)

	if (isPending) return <div>Loading...</div>
	if (error) return <div>Error loading products</div>

	return (
		<select className="bg-gray-50 border w-40 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			<option disabled selected hidden>
				Select Product
			</option>
			{products?.map((product: Product) => (
				<option key={product.id} value={product.id}>
					{product.title}
				</option>
			))}
		</select>
	)
}
