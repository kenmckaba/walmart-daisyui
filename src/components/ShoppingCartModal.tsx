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
				<h1 className="font-bold mb-3">Shopping Cart</h1>
				<div className="grid-container grid grid-cols-3 gap-2 text-xs">
					<div className="font-semibold col-span-1">Product</div>
					<div className="font-semibold col-span-1">Price</div>
					<div className="font-semibold col-span-1">Total</div>
					{cart.products.map((product) => (
						<>
							<div key={`name-${product.id}`}>{product.title}</div>
							<div key={`price-${product.id}`}>${product.price}</div>
							<div key={`total-${product.id}`}>${product.total}</div>
						</>
					))}
				</div>
				<div>
					<strong className="mt-10">Total:</strong> ${cart.total}
				</div>
				<div>
					<strong>Discounted Total:</strong> ${cart.discountedTotal}
				</div>
			</div>
		</dialog>
	)
}

export default ShoppingCartModal
