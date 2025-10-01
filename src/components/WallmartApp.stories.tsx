import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Mock components to avoid API dependencies
const MockHeader = ({
	onCategorySelected,
	cartCount = 0,
}: {
	onCategorySelected: (category: string) => void
	cartCount?: number
}) => (
	<div className="flex h-15 gap-1 items-center w-full justify-between border-1 rounded-md">
		<div />
		<div className="flex items-center gap-4">
			<div className="h-10 w-10">
				<img
					src="/src/assets/walmart-logo.png"
					alt="Walmart logo"
					className="h-full w-full object-contain"
				/>
			</div>
			<div className="text-2xl font-bold text-blue-600">Walmart</div>
		</div>
		<div className="flex items-center gap-4">
			<select
				onChange={(e) => onCategorySelected(e.target.value)}
				className="bg-gray-50 border w-40 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
			>
				<option value="" disabled selected hidden>
					Select Category
				</option>
				<option value="smartphones">Smartphones</option>
				<option value="laptops">Laptops</option>
				<option value="fragrances">Fragrances</option>
				<option value="skincare">Skincare</option>
				<option value="groceries">Groceries</option>
			</select>
			<div className="relative">
				<button type="button" className="btn btn-ghost btn-circle">
					<div className="indicator">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-label="Shopping cart"
						>
							<title>Shopping cart</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6.5M7 13h10m0 0v1a2 2 0 01-2 2H9a2 2 0 01-2-2v-1m8 0V9a2 2 0 00-2 2H9a2 2 0 00-2 2v4.01"
							/>
						</svg>
						{cartCount > 0 && (
							<span className="badge badge-xs badge-primary indicator-item">
								{cartCount}
							</span>
						)}
					</div>
				</button>
			</div>
		</div>
	</div>
)

const MockProductList = ({ category }: { category: string }) => (
	<div className="text-center py-8">
		<h2 className="text-xl font-semibold mb-4 capitalize">
			{category} Products
		</h2>
		<p className="text-gray-600">Products would be loaded here...</p>
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
			{[1, 2, 3, 4, 5, 6].map((productId) => (
				<div
					key={`product-${category}-${productId}`}
					className="bg-white p-4 rounded-lg shadow-sm border"
				>
					<div className="bg-gray-200 h-32 rounded mb-3"></div>
					<h3 className="font-semibold">Sample Product {productId}</h3>
					<p className="text-gray-600 text-sm">From {category} category</p>
					<p className="font-bold text-lg">$99.99</p>
				</div>
			))}
		</div>
	</div>
)

// Mock WallmartApp component
const MockWallmartApp = ({ initialCategory }: { initialCategory?: string }) => {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		initialCategory || null,
	)

	const onCategorySelected = (category: string) => {
		console.log('New Category Selected:', category)
		setSelectedCategory(category)
	}

	return (
		<div className="flex flex-col gap-2 p-4 min-h-screen bg-blue-50 border-2 border-blue-200">
			<MockHeader onCategorySelected={onCategorySelected} />
			{selectedCategory ? (
				<MockProductList category={selectedCategory} />
			) : (
				<div className="flex-1 flex items-center justify-center">
					<div className="text-center">
						<h2 className="text-2xl font-semibold text-gray-600 mb-4">
							Welcome to Walmart
						</h2>
						<p className="text-gray-500">
							Select a category from the dropdown above to browse products
						</p>
					</div>
				</div>
			)}
		</div>
	)
}

const mockQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
})

const meta: Meta<typeof MockWallmartApp> = {
	title: 'Components/WallmartApp',
	component: MockWallmartApp,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	argTypes: {
		initialCategory: {
			description: 'Initial category to display on load',
			options: [
				'',
				'smartphones',
				'laptops',
				'fragrances',
				'skincare',
				'groceries',
			],
			control: { type: 'select' },
		},
	},
	decorators: [
		(Story) => (
			<QueryClientProvider client={mockQueryClient}>
				<Story />
			</QueryClientProvider>
		),
	],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
}

export const WithSelectedCategory: Story = {
	args: {
		initialCategory: 'smartphones',
	},
}

export const LaptopsCategory: Story = {
	args: {
		initialCategory: 'laptops',
	},
}

export const FragrancesCategory: Story = {
	args: {
		initialCategory: 'fragrances',
	},
}

export const Interactive: Story = {
	args: {},
	parameters: {
		docs: {
			description: {
				story:
					'Fully interactive Walmart app - try selecting different categories!',
			},
		},
	},
}
