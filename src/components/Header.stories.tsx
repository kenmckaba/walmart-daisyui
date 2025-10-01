import type { Meta, StoryObj } from '@storybook/react-vite'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a mock query client for Storybook
const mockQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
})

// Mock component that doesn't use the shopping cart hook
const MockHeader = ({
	onCategorySelected,
	cartCount = 0,
}: {
	onCategorySelected: (item: string) => void
	cartCount?: number
}) => {
	return (
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
					<option disabled selected hidden>
						Select Category
					</option>
					<option value="smartphones">Smartphones</option>
					<option value="laptops">Laptops</option>
					<option value="fragrances">Fragrances</option>
					<option value="skincare">Skincare</option>
					<option value="groceries">Groceries</option>
				</select>
				<div className="relative">
					<button
						type="button"
						className="btn btn-ghost btn-circle"
						onClick={() => console.log('Cart clicked')}
					>
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
									d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6.5M7 13h10m0 0v1a2 2 0 01-2 2H9a2 2 0 01-2-2v-1m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
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
}

const meta: Meta<typeof MockHeader> = {
	title: 'Components/Header',
	component: MockHeader,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	argTypes: {
		onCategorySelected: {
			description: 'Callback function called when a category is selected',
		},
		cartCount: {
			description: 'Number of items in the shopping cart',
			control: { type: 'number', min: 0, max: 99 },
		},
	},
	decorators: [
		(Story) => (
			<QueryClientProvider client={mockQueryClient}>
				<div style={{ padding: '1rem' }}>
					<Story />
				</div>
			</QueryClientProvider>
		),
	],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		onCategorySelected: (category: string) => {
			console.log('Selected category:', category)
		},
		cartCount: 0,
	},
}

export const WithCartItems: Story = {
	args: {
		onCategorySelected: (category: string) => {
			console.log('Selected category:', category)
		},
		cartCount: 3,
	},
}

export const ManyCartItems: Story = {
	args: {
		onCategorySelected: (category: string) => {
			console.log('Selected category:', category)
		},
		cartCount: 15,
	},
}

export const MaxCartItems: Story = {
	args: {
		onCategorySelected: (category: string) => {
			console.log('Selected category:', category)
		},
		cartCount: 99,
	},
}

export const Interactive: Story = {
	args: {
		onCategorySelected: (category: string) => {
			alert(`Selected category: ${category}`)
		},
		cartCount: 5,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Interactive header that shows alerts when categories are selected',
			},
		},
	},
}
