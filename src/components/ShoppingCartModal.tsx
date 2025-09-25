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
			<div className="modal-box">
				<h2>Shopping Cart (ID: {cart.id})</h2>
				<ul>
					{cart.products.map((product) => (
						<li key={product.id}>
							{product.title} - Qty: {product.quantity} - Price: $
							{product.price} - Total: ${product.total}
						</li>
					))}
				</ul>
				<div>
					<strong>Total:</strong> ${cart.total}
				</div>
				<div>
					<strong>Discounted Total:</strong> ${cart.discountedTotal}
				</div>
			</div>
		</dialog>
	)
}

export default ShoppingCartModal
