import type { Meta, StoryObj } from '@storybook/react-vite'
import { ImageList } from './ImageList'

const meta: Meta<typeof ImageList> = {
	title: 'Components/ImageList',
	component: ImageList,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		images: {
			description: 'Array of image URLs to display',
		},
		title: {
			description: 'Alt text for all images',
		},
	},
}

export default meta
type Story = StoryObj<typeof meta>

export const SingleImage: Story = {
	args: {
		images: ['https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'],
		title: 'iPhone 14 Pro',
	},
}

export const MultipleImages: Story = {
	args: {
		images: [
			'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
			'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
			'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
			'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
		],
		title: 'Product Images',
	},
}

export const ManyImages: Story = {
	args: {
		images: [
			'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
			'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
			'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
			'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
			'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg',
			'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg',
			'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg',
			'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg',
		],
		title: 'Large Product Gallery',
	},
}

export const EmptyImages: Story = {
	args: {
		images: [],
		title: 'No Images Available',
	},
}

export const LongTitle: Story = {
	args: {
		images: [
			'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
			'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
		],
		title:
			'This is a very long product title that might be used as alt text for accessibility purposes and should be handled properly',
	},
}
