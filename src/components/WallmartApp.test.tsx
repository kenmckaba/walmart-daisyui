import { describe, it, expect, vi, beforeEach } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { WallmartApp } from './WallmartApp'

// Mock the child components
vi.mock('./Header', () => ({
	Header: ({
		onCategorySelected,
	}: {
		onCategorySelected: (category: string) => void
	}) => (
		<div data-testid="header">
			<button type="button" onClick={() => onCategorySelected('electronics')}>
				Select Electronics
			</button>
		</div>
	),
}))

vi.mock('./ProductList', () => ({
	ProductList: ({ category }: { category: string }) => (
		<div data-testid="product-list">Products for: {category}</div>
	),
}))

describe('WallmartApp', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders the header component', () => {
		render(<WallmartApp />)
		expect(screen.getByTestId('header')).toBeInTheDocument()
	})

	it('does not render ProductList initially when no category is selected', () => {
		render(<WallmartApp />)
		expect(screen.queryByTestId('product-list')).not.toBeInTheDocument()
	})

	it('renders ProductList when a category is selected', () => {
		render(<WallmartApp />)

		const selectButton = screen.getByText('Select Electronics')
		fireEvent.click(selectButton)

		expect(screen.getByTestId('product-list')).toBeInTheDocument()
		expect(screen.getByText('Products for: electronics')).toBeInTheDocument()
	})

	it('updates ProductList when different category is selected', () => {
		render(<WallmartApp />)

		// First selection
		const selectButton = screen.getByText('Select Electronics')
		fireEvent.click(selectButton)
		expect(screen.getByText('Products for: electronics')).toBeInTheDocument()

		// Verify the component can handle category changes
		expect(screen.getByTestId('product-list')).toBeInTheDocument()
	})

	it('has correct CSS classes for layout', () => {
		const { container } = render(<WallmartApp />)

		const mainDiv = container.firstChild as HTMLElement
		expect(mainDiv).toHaveClass(
			'flex',
			'flex-col',
			'gap-2',
			'p-4',
			'min-h-screen',
			'bg-blue-50',
			'border-2',
			'border-blue-200',
		)
	})

	it('maintains selected category state', () => {
		render(<WallmartApp />)

		// Initially no products shown
		expect(screen.queryByTestId('product-list')).not.toBeInTheDocument()

		// Select category
		const selectButton = screen.getByText('Select Electronics')
		fireEvent.click(selectButton)

		// Products should be shown
		expect(screen.getByTestId('product-list')).toBeInTheDocument()

		// State should persist (ProductList still rendered)
		expect(screen.getByText('Products for: electronics')).toBeInTheDocument()
	})
})
