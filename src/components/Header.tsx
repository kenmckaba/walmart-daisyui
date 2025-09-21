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
		<div className="flex h-15 flex-row gap-1 items-center justify-center border-1 rounded-md">
			<img className="h-18" src={walmartstar} alt="Walmart Logo" />
			<CategoryList onSelected={onSelected} />
		</div>
	)
}
