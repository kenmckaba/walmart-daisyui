import { type Category, useCategories } from './hooks/useCategories'

export const CategoryList = () => {
	const { categories, isPending, error } = useCategories()

	if (isPending) return <div>Loading...</div>
	if (error) return <div>Error loading categories</div>

	// const catlist: Category[] =
	// 	categories?.map((cat: Category) => ({
	// 		label: cat.name,
	// 		value: cat.slug,
	// 	})) || []

	return (
		<select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			{categories?.map((cat: Category) => (
				<option key={cat.slug} value={cat.slug}>
					{cat.name}
				</option>
			))}
		</select>
	)
}
