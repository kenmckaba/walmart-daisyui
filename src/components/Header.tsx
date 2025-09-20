import walmartstar from '../assets/walmart-logo.png'
import { CategoryList } from './CategoryList'

export const Header = () => {
	return (
		<div className="flex h-15 flex-row gap-1 items-center justify-center border-1 rounded-md">
			<img className="h-18" src={walmartstar} alt="Walmart Logo" />
			<CategoryList />
		</div>
	)
}
