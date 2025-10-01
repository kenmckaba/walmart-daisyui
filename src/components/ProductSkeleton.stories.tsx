import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProductSkeleton, ProductSkeletonList } from './ProductSkeleton'

const meta: Meta<typeof ProductSkeleton> = {
	title: 'Components/ProductSkeleton',
	component: ProductSkeleton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {}

export const Multiple: Story = {
	render: () => <ProductSkeletonList count={3} />,
	parameters: {
		docs: {
			description: {
				story: 'Shows multiple product skeletons in a grid layout',
			},
		},
	},
}

export const Grid: Story = {
	render: () => <ProductSkeletonList count={6} />,
	parameters: {
		docs: {
			description: {
				story: 'Shows a typical grid of 6 loading skeletons',
			},
		},
	},
}

export const SingleRow: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
			<ProductSkeleton />
			<ProductSkeleton />
			<ProductSkeleton />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Shows skeletons arranged in a single row',
			},
		},
	},
}

export const LargeGrid: Story = {
	render: () => <ProductSkeletonList count={12} />,
	parameters: {
		docs: {
			description: {
				story: 'Shows a large grid of 12 loading skeletons',
			},
		},
	},
}
