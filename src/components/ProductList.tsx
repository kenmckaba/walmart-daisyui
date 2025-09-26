import { Suspense } from 'react'
import { type Product, useProducts } from './hooks/useProducts'
import { ProductCard } from './ProductCard'
import { ProductSkeletonList } from './ProductSkeleton'

type ProductListProps = {
	category: string
}

const ProductListContent = ({ category }: ProductListProps) => {
	const { products } = useProducts(category)
	return (
		<div className="flex flex-wrap gap-4 justify-center">
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
