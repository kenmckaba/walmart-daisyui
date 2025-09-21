import { Header } from './Header'
import { ProductList } from './ProductList'
import { useState } from 'react'

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
			test2
			<div className="flex flex-row gap-1">
				<div className="btn btn-primary">Hello Vite + 3!</div>
				<div className="btn btn-secondary">Hello Vite + 4!</div>
			</div>
			<Header onCategorySelected={onCategorySelected} />
			{selectedCategory && <ProductList selectedCategory={selectedCategory} />}
		</div>
	)
}
