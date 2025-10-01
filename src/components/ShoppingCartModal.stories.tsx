import type { Meta, StoryObj } from '@storybook/react-vite'

type CartItem = {
	id: number
	title: string
	price: number
	quantity: number
	total: number
}

// Create a simple mock component for demonstration
const MockShoppingCartModal = ({
	modalId,
	items = [],
}: {
	modalId: string
	items?: CartItem[]
}) => {
	const total = items.reduce((sum, item) => sum + item.total, 0)

	const formattedCurrency = (val: number): string => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(val)
	}

	return (
		<dialog id={modalId} className="modal" open>
			<div className="modal-box absolute right-5 top-25">
				<form method="dialog">
					<button
						type="button"
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
					{items.length === 0 ? (
						<div className="col-span-3 text-center py-4">No items in cart.</div>
					) : (
						items
							.map((item, index) => [
								<div
									key={`${item.id}-title`}
									className={index % 2 === 0 ? 'bg-gray-100' : 'bg-base-400'}
								>
									{item.title}
								</div>,
								<div
									key={`${item.id}-price`}
									className={`text-right ${index % 2 === 0 ? 'bg-gray-100' : 'bg-base-400'}`}
								>
									{formattedCurrency(item.price)}
								</div>,
								<div
									key={`${item.id}-total`}
									className={`text-right ${index % 2 === 0 ? 'bg-gray-100' : 'bg-base-400'}`}
								>
									{formattedCurrency(item.total)}
								</div>,
							])
							.flat()
					)}
				</div>
				<div className="text-right mt-3">
					<strong>Total: </strong>
					{formattedCurrency(total)}
				</div>
			</div>
		</dialog>
	)
}

const meta: Meta<typeof MockShoppingCartModal> = {
	title: 'Components/ShoppingCartModal',
	component: MockShoppingCartModal,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		modalId: {
			description: 'HTML ID for the modal element',
		},
		items: {
			description: 'Array of cart items to display',
		},
	},
}

export default meta
type Story = StoryObj<typeof meta>

export const EmptyCart: Story = {
	args: {
		modalId: 'empty-cart-modal',
		items: [],
	},
}

export const SingleItem: Story = {
	args: {
		modalId: 'single-item-modal',
		items: [
			{
				id: 1,
				title: 'iPhone 14 Pro',
				price: 999.99,
				quantity: 1,
				total: 999.99,
			},
		],
	},
}

export const MultipleItems: Story = {
	args: {
		modalId: 'multiple-items-modal',
		items: [
			{
				id: 1,
				title: 'iPhone 14 Pro',
				price: 999.99,
				quantity: 2,
				total: 1999.98,
			},
			{
				id: 2,
				title: 'MacBook Pro',
				price: 2499.99,
				quantity: 1,
				total: 2499.99,
			},
			{
				id: 3,
				title: 'AirPods Pro',
				price: 249.99,
				quantity: 3,
				total: 749.97,
			},
		],
	},
}

export const LargeCart: Story = {
	args: {
		modalId: 'large-cart-modal',
		items: [
			{
				id: 1,
				title: 'iPhone 14 Pro',
				price: 999.99,
				quantity: 2,
				total: 1999.98,
			},
			{
				id: 2,
				title: 'MacBook Pro',
				price: 2499.99,
				quantity: 1,
				total: 2499.99,
			},
			{
				id: 3,
				title: 'AirPods Pro',
				price: 249.99,
				quantity: 3,
				total: 749.97,
			},
			{ id: 4, title: 'iPad Air', price: 599.99, quantity: 1, total: 599.99 },
			{
				id: 5,
				title: 'Apple Watch',
				price: 399.99,
				quantity: 2,
				total: 799.98,
			},
			{ id: 6, title: 'Magic Mouse', price: 79.99, quantity: 1, total: 79.99 },
			{ id: 7, title: 'USB-C Cable', price: 29.99, quantity: 4, total: 119.96 },
		],
	},
}
