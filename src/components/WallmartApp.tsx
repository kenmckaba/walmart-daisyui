import { Header } from './Header'

export const WallmartApp = () => {
	return (
		<div
			className="flex flex-col gap-2 p-4 h-screen
     bg-blue-50 border-2 border-blue-200"
		>
			test2
			<div className="flex flex-row gap-1">
				<div className="btn btn-primary">Hello Vite + 3!</div>
				<div className="btn btn-secondary">Hello Vite + 4!</div>
			</div>
			<Header />
		</div>
	)
}
