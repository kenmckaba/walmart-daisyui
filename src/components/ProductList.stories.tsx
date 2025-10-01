import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProductCard } from './ProductCard'
import { ProductSkeletonList } from './ProductSkeleton'

type Product = {
	id: number
	title: string
	price: number
	description: string
	category: string
	images: string[]
	rating: number
}

// Mock ProductList component since the real one requires API calls
const MockProductList = ({
	category,
	loading = false,
	products = [],
}: {
	category: string
	loading?: boolean
	products?: Product[]
}) => {
	if (loading) {
		return (
			<div>
				<h2 className="text-xl font-semibold mb-4 text-center capitalize">
					Loading {category}...
				</h2>
				<ProductSkeletonList count={6} />
			</div>
		)
	}

	return (
		<div>
			<h2 className="text-xl font-semibold mb-4 text-center capitalize">
				{category} ({products.length} items)
			</h2>
			<div className="flex flex-wrap gap-4 justify-center">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	)
}

const meta: Meta<typeof MockProductList> = {
	title: 'Components/ProductList',
	component: MockProductList,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	argTypes: {
		category: {
			description: 'Product category to display',
		},
		loading: {
			description: 'Whether to show loading skeleton',
		},
		products: {
			description: 'Array of products to display',
		},
	},
	decorators: [
		(Story) => (
			<div style={{ padding: '2rem' }}>
				<Story />
			</div>
		),
	],
}

export default meta
type Story = StoryObj<typeof meta>

const sampleProducts = [
	{
		id: 1,
		title: 'iPhone 14 Pro',
		price: 999.99,
		description: 'Latest iPhone with advanced camera system',
		category: 'smartphones',
		images: ['https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'],
		rating: 4.5,
	},
	{
		id: 2,
		title: 'MacBook Pro',
		price: 2499.99,
		description: 'Powerful laptop for professionals',
		category: 'laptops',
		images: [
			'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
		],
		rating: 4.8,
	},
	{
		id: 3,
		title: 'AirPods Pro',
		price: 249.99,
		description: 'Wireless earbuds with noise cancellation',
		category: 'electronics',
		images: ['https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg'],
		rating: 4.3,
	},
]

const manyProducts = [
	...sampleProducts,
	{
		id: 4,
		title: 'iPad Air',
		price: 599.99,
		description: 'Versatile tablet for work and play',
		category: 'tablets',
		images: ['https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg'],
		rating: 4.4,
	},
	{
		id: 5,
		title: 'Apple Watch',
		price: 399.99,
		description: 'Smartwatch with health tracking',
		category: 'wearables',
		images: [
			'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg',
		],
		rating: 4.2,
	},
	{
		id: 6,
		title: 'Magic Keyboard',
		price: 129.99,
		description: 'Wireless keyboard for Mac',
		category: 'accessories',
		images: ['https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg'],
		rating: 4.1,
	},
]

export const Loading: Story = {
	args: {
		category: 'smartphones',
		loading: true,
	},
}

export const FewProducts: Story = {
	args: {
		category: 'smartphones',
		loading: false,
		products: sampleProducts,
	},
}

export const ManyProducts: Story = {
	args: {
		category: 'electronics',
		loading: false,
		products: manyProducts,
	},
}

export const EmptyCategory: Story = {
	args: {
		category: 'empty-category',
		loading: false,
		products: [],
	},
	render: ({ category }) => (
		<div className="flex flex-col items-center justify-center min-h-96">
			<div className="text-center">
				<h3 className="text-lg font-semibold text-gray-600 mb-2">
					No Products Found
				</h3>
				<p className="text-gray-500">
					No products available in the "{category}" category.
				</p>
			</div>
		</div>
	),
}

export const SingleProduct: Story = {
	args: {
		category: 'smartphones',
		loading: false,
		products: [sampleProducts[0]],
	},
}

export const ResponsiveGrid: Story = {
	args: {
		category: 'mixed',
		loading: false,
		products: manyProducts,
	},
	parameters: {
		viewport: {
			defaultViewport: 'mobile1',
		},
		docs: {
			description: {
				story: 'Shows how the product grid adapts to smaller screen sizes',
			},
		},
	},
}
