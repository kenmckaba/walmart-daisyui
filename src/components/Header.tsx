import walmartstar from '../assets/walmart-logo.png'
import { CategoryList } from './CategoryList'

type HeaderProps = {
	onCategorySelected: (item: string) => void
}

export const Header = ({ onCategorySelected }: HeaderProps) => {
	const onSelected = (item: string) => {
		console.log('selected item', item)
		onCategorySelected(item)
	}

	return (
		<div
			className="flex h-15 gap-1 items-center w-full
									justify-between border-1 rounded-md"
		>
			<div />
			<div className="flex gap-4 items-center">
				<img className="h-18" src={walmartstar} alt="Walmart Logo" />
				<CategoryList onSelected={onSelected} />
			</div>
			<button type="button" className="btn btn-ghost left-auto">
				Shopping cart
			</button>
		</div>
	)
}
