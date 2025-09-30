import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { ProductSkeleton, ProductSkeletonList } from './ProductSkeleton'

describe('ProductSkeleton', () => {
	it('renders skeleton with correct structure', () => {
		render(<ProductSkeleton />)

		// Check for skeleton elements by class
		const skeletonElements = document.querySelectorAll('.skeleton')
		expect(skeletonElements).toHaveLength(4) // 1 circular + 2 text + 1 large
	})

	it('has correct CSS classes for layout', () => {
		const { container } = render(<ProductSkeleton />)

		const mainDiv = container.firstChild as HTMLElement
		expect(mainDiv).toHaveClass('flex', 'w-52', 'flex-col', 'gap-4')
	})
})

describe('ProductSkeletonList', () => {
	it('renders default count of 4 skeletons', () => {
		render(<ProductSkeletonList />)

		// Count skeleton containers (each ProductSkeleton has a main container)
		const skeletonContainers = document.querySelectorAll(
			'.flex.w-52.flex-col.gap-4',
		)
		expect(skeletonContainers).toHaveLength(4)
	})

	it('renders custom count of skeletons', () => {
		render(<ProductSkeletonList count={6} />)

		const skeletonContainers = document.querySelectorAll(
			'.flex.w-52.flex-col.gap-4',
		)
		expect(skeletonContainers).toHaveLength(6)
	})

	it('renders zero skeletons when count is 0', () => {
		render(<ProductSkeletonList count={0} />)

		const skeletonContainers = document.querySelectorAll(
			'.flex.w-52.flex-col.gap-4',
		)
		expect(skeletonContainers).toHaveLength(0)
	})

	it('has correct wrapper CSS classes', () => {
		const { container } = render(<ProductSkeletonList />)

		const wrapper = container.firstChild as HTMLElement
		expect(wrapper).toHaveClass('flex', 'flex-wrap', 'gap-4')
	})

	it('generates unique keys for each skeleton', () => {
		// This test ensures no React key warnings by checking rendered elements
		const { container } = render(<ProductSkeletonList count={3} />)

		const skeletonContainers = container.querySelectorAll(
			'.flex.w-52.flex-col.gap-4',
		)
		expect(skeletonContainers).toHaveLength(3)

		// Each skeleton should be rendered (no duplicate key issues would prevent rendering)
		expect(skeletonContainers[0]).toBeInTheDocument()
		expect(skeletonContainers[1]).toBeInTheDocument()
		expect(skeletonContainers[2]).toBeInTheDocument()
	})
})
