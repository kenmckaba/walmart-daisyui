import { useId } from 'react'
import walmartstar from '../assets/walmart-logo.png'
import { useShoppingCart } from '../state/useShoppingCart'
import { CategoryList } from './CategoryList'
import { ShoppingCartModal } from './ShoppingCartModal'

type HeaderProps = {
	onCategorySelected: (item: string) => void
}

export const Header = ({ onCategorySelected }: HeaderProps) => {
	const onSelected = (item: string) => {
		console.log('selected item', item)
		onCategorySelected(item)
	}

	const modalId = useId()
	const showShoppingCartModal = () => {
		const modal = document.getElementById(modalId) as HTMLDialogElement
		modal.showModal()
	}

	const cartCount = useShoppingCart((state) => state.items.length)

	return (
		<>
			<div
				className="flex h-15 gap-1 items-center w-full
                    justify-between border-1 rounded-md"
			>
				<div />
				<div className="flex gap-4 items-center">
					<img className="h-18" src={walmartstar} alt="Walmart Logo" />
					<CategoryList onSelected={onSelected} />
				</div>
				<button
					type="button"
					onClick={showShoppingCartModal}
					className="btn btn-ghost mr-2"
				>
					Shopping cart
					{cartCount > 0 && (
						<span className="badge badge-primary ml-2">{cartCount}</span>
					)}
				</button>
			</div>

			<ShoppingCartModal modalId={modalId} />
		</>
	)
}
