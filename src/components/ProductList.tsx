import { type Product, useProducts } from './hooks/useProducts'
import { ProductCard } from './ProductCard'
import { ProductSkeletonList } from './ProductSkeleton'
import { Suspense } from 'react'

type ProductListProps = {
	category: string
}

const ProductListContent = ({ category }: ProductListProps) => {
	const { products } = useProducts(category)
	return (
		<div className="flex flex-wrap gap-4">
			{products?.products.map((product: Product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	)
}

export const ProductList = ({ category }: ProductListProps) => (
	<Suspense fallback={<ProductSkeletonList />}>
		<ProductListContent category={category} />
	</Suspense>
)
