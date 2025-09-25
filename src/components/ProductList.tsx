import { type Product, useProducts } from './hooks/useProducts'
import { ProductCard } from './ProductCard'
import { ProductSkeletonList } from './ProductSkeleton'

type ProductListProps = {
	category: string
}

export const ProductList = ({ category }: ProductListProps) => {
	const { products, isPending, error } = useProducts(category)

	if (isPending) return <ProductSkeletonList />
	if (error) return <div>Error loading products</div>

	return (
		<div className="flex flex-wrap gap-4">
			{products?.products.map((product: Product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	)
}
