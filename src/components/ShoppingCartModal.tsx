import { useShoppingCart } from '../state/useShoppingCart'

type ShoppingCartProps = { modalId: string }

const formattedCurrency = (val: number): string => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(val)
}

export const ShoppingCartModal = ({ modalId }: ShoppingCartProps) => {
	const items = useShoppingCart((state) => state.items)
	const total = items.reduce((sum, item) => sum + item.total, 0)

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
					{items.length === 0 && (
						<div className="col-span-3 text-center py-4">No items in cart.</div>
					)}
					{items.map((product, idx) => {
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
					{formattedCurrency(total)}
				</div>
			</div>
		</dialog>
	)
}
