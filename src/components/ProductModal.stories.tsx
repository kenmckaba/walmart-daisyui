import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProductModal } from './ProductModal'

const meta: Meta<typeof ProductModal> = {
	title: 'Components/ProductModal',
	component: ProductModal,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		modalId: {
			description: 'HTML ID for the modal element',
		},
	},
}

export default meta
type Story = StoryObj<typeof meta>

// Create a wrapper component that shows the modal as open
const OpenProductModal = ({ modalId }: { modalId: string }) => (
	<dialog id={modalId} className="modal" open>
		<div className="modal-box">
			<h3 className="font-bold text-lg">Added to cart!</h3>
			<p className="py-4">Press ESC key or click the button below to close</p>
			<div className="modal-action">
				<form method="dialog">
					<button type="submit" className="btn">
						OK
					</button>
				</form>
			</div>
		</div>
	</dialog>
)

export const Default: Story = {
	render: ({ modalId }) => <OpenProductModal modalId={modalId} />,
	args: {
		modalId: 'product-modal',
	},
}

export const CustomMessage: Story = {
	render: ({ modalId }) => (
		<dialog id={modalId} className="modal" open>
			<div className="modal-box">
				<h3 className="font-bold text-lg">Product Added Successfully!</h3>
				<p className="py-4">
					Your item has been added to your shopping cart. You can continue
					shopping or proceed to checkout.
				</p>
				<div className="modal-action">
					<form method="dialog">
						<button type="submit" className="btn btn-primary">
							Continue Shopping
						</button>
						<button type="button" className="btn btn-secondary ml-2">
							View Cart
						</button>
					</form>
				</div>
			</div>
		</dialog>
	),
	args: {
		modalId: 'custom-product-modal',
	},
	parameters: {
		docs: {
			description: {
				story: 'Product modal with custom message and multiple action buttons',
			},
		},
	},
}

export const SuccessConfirmation: Story = {
	render: ({ modalId }) => (
		<dialog id={modalId} className="modal" open>
			<div className="modal-box">
				<div className="flex items-center gap-3 mb-4">
					<div className="text-2xl">✅</div>
					<h3 className="font-bold text-lg text-success">Success!</h3>
				</div>
				<p className="py-4">iPhone 14 Pro has been added to your cart.</p>
				<div className="modal-action">
					<form method="dialog">
						<button type="submit" className="btn btn-success">
							Great!
						</button>
					</form>
				</div>
			</div>
		</dialog>
	),
	args: {
		modalId: 'success-modal',
	},
	parameters: {
		docs: {
			description: {
				story: 'Success confirmation modal with checkmark icon',
			},
		},
	},
}

export const WithProductDetails: Story = {
	render: ({ modalId }) => (
		<dialog id={modalId} className="modal" open>
			<div className="modal-box">
				<h3 className="font-bold text-lg">Added to Cart</h3>
				<div className="py-4">
					<div className="flex items-center gap-4 mb-3">
						<img
							src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
							alt="iPhone 14 Pro"
							className="w-16 h-16 object-cover rounded"
						/>
						<div>
							<p className="font-semibold">iPhone 14 Pro</p>
							<p className="text-sm text-gray-600">Quantity: 1</p>
							<p className="text-sm text-gray-600">Price: $999.99</p>
						</div>
					</div>
					<p className="text-sm">
						Item successfully added to your shopping cart.
					</p>
				</div>
				<div className="modal-action">
					<form method="dialog">
						<button type="submit" className="btn btn-outline">
							Continue Shopping
						</button>
						<button type="button" className="btn btn-primary ml-2">
							View Cart
						</button>
					</form>
				</div>
			</div>
		</dialog>
	),
	args: {
		modalId: 'detailed-modal',
	},
	parameters: {
		docs: {
			description: {
				story: 'Modal showing product details with image and information',
			},
		},
	},
}
