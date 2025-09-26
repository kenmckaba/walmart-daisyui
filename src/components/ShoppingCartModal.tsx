import { useEffect, useState } from 'react'

type CartProduct = {
	id: number
	title: string
	price: number
	quantity: number
	total: number
	discountPercentage: number
	discountedPrice: number
}

type Cart = {
	id: number
	products: CartProduct[]
	total: number
	discountedTotal: number
	userId: number
	totalProducts: number
	totalQuantity: number
}

type ShoppingCartProps = { modalId: string }

const formattedCurrency = (val: number): string => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(val)
}

export const ShoppingCartModal = ({ modalId }: ShoppingCartProps) => {
	const [cart, setCart] = useState<Cart | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		fetch('https://dummyjson.com/carts/1')
			.then((res) => {
				if (!res.ok) throw new Error('Failed to fetch cart')
				return res.json()
			})
			.then((data) => {
				setCart(data)
				setLoading(false)
			})
			.catch((err) => {
				setError(err.message)
				setLoading(false)
			})
	}, [])

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error: {error}</div>
	if (!cart) return <div>No cart found.</div>

	return (
		<dialog id={modalId} className="modal">
			<div className="modal-box absolute right-5 top-25">
				<form method="dialog">
					<button
						type="button"
						onClick={() => {
							const dialog = document.getElementById(
								modalId,
							) as HTMLDialogElement | null
							if (dialog) dialog.close()
						}}
						className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
					>
						✕
					</button>
				</form>
				<h1 className="font-bold mb-3 text-center">Shopping Cart</h1>
				<div className="grid-container grid grid-cols-[3fr_1fr_1fr] gap-2 text-xs">
					<div className="font-semibold">Product</div>
					<div className="font-semibold text-right">Price</div>
					<div className="font-semibold text-right">Total</div>
					{cart.products.map((product, idx) => {
						const rowClass = idx % 2 === 0 ? 'bg-gray-100' : 'bg-base-400'
						return (
							<>
								<div key={`name-${product.id}`} className={rowClass}>
									{product.title}
								</div>
								<div
									className={`text-right ${rowClass}`}
									key={`price-${product.id}`}
								>
									{formattedCurrency(product.price)}
								</div>
								<div
									className={`text-right ${rowClass}`}
									key={`total-${product.id}`}
								>
									{formattedCurrency(product.total)}
								</div>
							</>
						)
					})}
				</div>
				<div className="text-right mt-3">
					<strong>Total: </strong>
					{formattedCurrency(cart.total)}
				</div>
				<div className="text-right">
					<strong>Discounted Total: </strong>
					{formattedCurrency(cart.discountedTotal)}
				</div>
			</div>
		</dialog>
	)
}

export default ShoppingCartModal
