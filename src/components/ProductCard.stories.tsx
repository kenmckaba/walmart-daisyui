import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProductCard } from './ProductCard'

const meta: Meta<typeof ProductCard> = {
	title: 'Components/ProductCard',
	component: ProductCard,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		product: {
			description: 'Product object containing all product information',
		},
	},
}

export default meta
type Story = StoryObj<typeof meta>

// Default product for stories
const defaultProduct = {
	id: 1,
	title: 'iPhone 14 Pro',
	price: 999.99,
	description:
		'The latest iPhone with advanced camera system and A16 Bionic chip',
	category: 'smartphones',
	images: [
		'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
		'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
	],
	rating: 4.5,
}

export const Default: Story = {
	args: {
		product: defaultProduct,
	},
}

export const LowPrice: Story = {
	args: {
		product: {
			...defaultProduct,
			id: 2,
			title: 'Budget Smartphone',
			price: 199.99,
			description: 'Affordable smartphone with great value',
		},
	},
}

export const HighPrice: Story = {
	args: {
		product: {
			...defaultProduct,
			id: 3,
			title: 'Premium Laptop',
			price: 2499.99,
			description:
				'High-end laptop for professional use with cutting-edge technology',
			category: 'laptops',
		},
	},
}

export const NoDiscount: Story = {
	args: {
		product: {
			...defaultProduct,
			id: 4,
			title: 'Regular Product',
			price: 49.99,
			description: 'A standard product without any discount',
		},
	},
}

export const LongTitle: Story = {
	args: {
		product: {
			...defaultProduct,
			id: 5,
			title:
				'This is a Very Long Product Title That Should Test How the Card Handles Text Overflow',
			price: 79.99,
			description:
				'Testing how the product card handles very long titles and descriptions that might overflow the container boundaries',
		},
	},
}

export const SingleImage: Story = {
	args: {
		product: {
			...defaultProduct,
			id: 6,
			title: 'Single Image Product',
			images: ['https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg'],
		},
	},
}

export const Electronics: Story = {
	args: {
		product: {
			...defaultProduct,
			id: 7,
			title: 'Wireless Headphones',
			price: 149.99,
			description: 'High-quality wireless headphones with noise cancellation',
			category: 'electronics',
			images: [
				'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg',
				'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
			],
			rating: 4.2,
		},
	},
}

export const Clothing: Story = {
	args: {
		product: {
			...defaultProduct,
			id: 8,
			title: 'Casual T-Shirt',
			price: 24.99,
			description: 'Comfortable cotton t-shirt perfect for everyday wear',
			category: 'clothing',
			images: [
				'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
			],
			rating: 3.9,
		},
	},
}
