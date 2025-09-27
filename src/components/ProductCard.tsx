import { ImageList } from './ImageList'
import { useId } from 'react'
import type { Product } from './hooks/useProducts'
// import { ProductModal } from './ProductModal'
import ShoppingCartModal from './ShoppingCartModal'

type ProductCardProps = {
	product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
	const modalId = useId()

	const showCartModal = () => {
		const modal = document.getElementById(modalId) as HTMLDialogElement
		modal.showModal()
	}

	return (
		<>
			<div className="card bg-base-100 w-64 shadow-sm">
				<figure>
					<ImageList images={product.images} title={product.title} />
				</figure>
				<div className="card-body">
					<h2 className="card-title">{product.title}</h2>
					<p>{product.description}</p>
					<p>Price: {product.price}</p>
					<div>
						<div className="flex flex-col items-end p-4 w-20">
							<p>Quantity:</p>
							<p>Total:</p>
						</div>
						<input type="number" className="input max-w-xs" />
					</div>
					<div className="card-actions justify-end">
						<button
							type="button"
							className="btn btn-primary"
							onClick={showCartModal}
						>
							Add to cart
						</button>
					</div>
				</div>
			</div>

			{/* <ProductModal modalId={modalId} /> */}
			<ShoppingCartModal modalId={modalId} />
		</>
	)
}
