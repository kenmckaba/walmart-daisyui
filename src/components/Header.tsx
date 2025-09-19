import { CategoryList } from './CategoryList'
import walmartstar from '../assets/walmart-logo.png'

export const Header = () => {
	return (
		<div className="flex h-15 flex-row gap-1 items-center justify-center border-1 rounded-md">
			<img className="h-12" src={walmartstar} alt="Walmart Logo" />
			<CategoryList />
		</div>
	)
}
