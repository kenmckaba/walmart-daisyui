import type { Meta, StoryObj } from '@storybook/react-vite'
import { CategoryList } from './CategoryList'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a mock query client for Storybook
const mockQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
})

const meta: Meta<typeof CategoryList> = {
	title: 'Components/CategoryList',
	component: CategoryList,
	parameters: {
		layout: 'centered',
		mockData: [
			{
				url: 'https://dummyjson.com/products/categories',
				method: 'GET',
				status: 200,
				response: [
					{
						name: 'Smartphones',
						slug: 'smartphones',
						url: 'https://dummyjson.com/products/category/smartphones',
					},
					{
						name: 'Laptops',
						slug: 'laptops',
						url: 'https://dummyjson.com/products/category/laptops',
					},
					{
						name: 'Fragrances',
						slug: 'fragrances',
						url: 'https://dummyjson.com/products/category/fragrances',
					},
					{
						name: 'Skincare',
						slug: 'skincare',
						url: 'https://dummyjson.com/products/category/skincare',
					},
					{
						name: 'Groceries',
						slug: 'groceries',
						url: 'https://dummyjson.com/products/category/groceries',
					},
					{
						name: 'Home Decoration',
						slug: 'home-decoration',
						url: 'https://dummyjson.com/products/category/home-decoration',
					},
				],
			},
		],
	},
	tags: ['autodocs'],
	argTypes: {
		onSelected: {
			description: 'Callback function called when a category is selected',
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
	args: {
		onSelected: () => {},
	},
}

export const WithAction: Story = {
	args: {
		onSelected: (category: string) => {
			console.log('Selected category:', category)
			alert(`Selected category: ${category}`)
		},
	},
	parameters: {
		docs: {
			description: {
				story:
					'Shows the category list with a visible action when selection changes',
			},
		},
	},
}

export const Loading: Story = {
	args: {
		onSelected: () => {},
	},
	parameters: {
		mockData: [
			{
				url: 'https://dummyjson.com/products/categories',
				method: 'GET',
				delay: 'infinite', // Never resolve to show loading state
			},
		],
		docs: {
			description: {
				story: 'Shows the loading state while categories are being fetched',
			},
		},
	},
}

export const ErrorState: Story = {
	args: {
		onSelected: () => {},
	},
	parameters: {
		mockData: [
			{
				url: 'https://dummyjson.com/products/categories',
				method: 'GET',
				status: 500,
				response: { error: 'Failed to fetch categories' },
			},
		],
		docs: {
			description: {
				story: 'Shows the error state when category fetching fails',
			},
		},
	},
}
