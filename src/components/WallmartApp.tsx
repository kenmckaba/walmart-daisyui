import { useState } from 'react'
import { Header } from './Header'
import { ProductList } from './ProductList'

export const WallmartApp = () => {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

	const onCategorySelected = (category: string) => {
		console.log('New Category Selected:', category)
		setSelectedCategory(category)
	}

	return (
		<div
			className="flex flex-col gap-2 p-4 h-screen
     bg-blue-50 border-2 border-blue-200"
		>
			<Header onCategorySelected={onCategorySelected} />
			{selectedCategory && <ProductList category={selectedCategory} />}
		</div>
	)
}
