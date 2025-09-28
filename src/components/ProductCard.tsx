import { ImageList } from './ImageList'
import { useId, useState } from 'react'
import type { Product } from './hooks/useProducts'
// import { ProductModal } from './ProductModal'
import ShoppingCartModal from './ShoppingCartModal'

type ProductCardProps = {
	product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
	const modalId = useId()
	const [totalCost, setTotalCost] = useState(product.price)

	const showCartModal = () => {
		const modal = document.getElementById(modalId) as HTMLDialogElement
		modal.showModal()
	}

	const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const quantity = parseInt(e.target.value, 10)
		setTotalCost(quantity * product.price)
	}

	const priceString = `$${product.price}`
	const totalString = `$${totalCost}`

	return (
		<>
			<div className="card bg-base-100 w-64 shadow-sm">
				<figure>
					<ImageList images={product.images} title={product.title} />
				</figure>
				<div className="card-body">
					<h2 className="card-title">{product.title}</h2>
					<p className="mb-0">{product.description}</p>
					<div>
						<div className="grid grid-cols-2 grid-rows-3 mr-10 mt-0">
							<div className="justify-self-end mr-1 self-center">Price:</div>
							<div className="self-center">{priceString}</div>
							<div className="justify-self-end mr-1 self-center">Quantity:</div>
							<div className="mt-1">
								<input
									type="number"
									min={1}
									className="input h-6"
									defaultValue="1"
									self-center
									onChange={handleQuantityChange}
								/>
							</div>
							<div className="justify-self-end mr-1 self-center">Total:</div>
							<div className="self-center">{totalString}</div>
						</div>
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

			<ShoppingCartModal modalId={modalId} />
		</>
	)
}
