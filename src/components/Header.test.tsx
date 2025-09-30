import { describe, it, expect, vi, beforeEach } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from './Header'
import * as useShoppingCartModule from '../state/useShoppingCart'

// Mock the CategoryList component
vi.mock('./CategoryList', () => ({
	CategoryList: ({
		onSelected,
	}: {
		onSelected: (category: string) => void
	}) => (
		<select
			onChange={(e) => onSelected(e.target.value)}
			data-testid="category-list"
		>
			<option value="electronics">Electronics</option>
			<option value="clothing">Clothing</option>
		</select>
	),
}))

// Mock the ShoppingCartModal component
vi.mock('./ShoppingCartModal', () => ({
	ShoppingCartModal: ({ modalId }: { modalId: string }) => (
		<dialog id={modalId} data-testid="shopping-cart-modal">
			Mock Shopping Cart Modal
		</dialog>
	),
}))

// Mock the useShoppingCart hook
vi.mock('../state/useShoppingCart')

describe('Header', () => {
	const mockOnCategorySelected = vi.fn()

	beforeEach(() => {
		vi.clearAllMocks()
		vi.spyOn(useShoppingCartModule, 'useShoppingCart').mockReturnValue(0)
	})

	it('renders the Walmart logo', () => {
		render(<Header onCategorySelected={mockOnCategorySelected} />)
		const logo = screen.getByAltText('Walmart Logo')
		expect(logo).toBeInTheDocument()
		expect(logo).toHaveAttribute(
			'src',
			expect.stringContaining('walmart-logo.png'),
		)
	})

	it('renders the CategoryList component', () => {
		render(<Header onCategorySelected={mockOnCategorySelected} />)
		expect(screen.getByTestId('category-list')).toBeInTheDocument()
	})

	it('renders the shopping cart button', () => {
		render(<Header onCategorySelected={mockOnCategorySelected} />)
		const cartButton = screen.getByRole('button', { name: /shopping cart/i })
		expect(cartButton).toBeInTheDocument()
	})

	it('calls onCategorySelected when category is selected', () => {
		render(<Header onCategorySelected={mockOnCategorySelected} />)
		const categorySelect = screen.getByTestId('category-list')
		fireEvent.change(categorySelect, { target: { value: 'electronics' } })
		expect(mockOnCategorySelected).toHaveBeenCalledWith('electronics')
	})

	it('shows cart count badge when cart has items', () => {
		// Mock cart with 3 items
		vi.spyOn(useShoppingCartModule, 'useShoppingCart').mockReturnValue(3)

		render(<Header onCategorySelected={mockOnCategorySelected} />)
		const badge = screen.getByText('3')
		expect(badge).toBeInTheDocument()
		expect(badge).toHaveClass('badge')
	})

	it('does not show cart count badge when cart is empty', () => {
		vi.spyOn(useShoppingCartModule, 'useShoppingCart').mockReturnValue(0)

		render(<Header onCategorySelected={mockOnCategorySelected} />)
		expect(screen.queryByText('0')).not.toBeInTheDocument()
		const badge = screen.queryByText(/\d+/)
		expect(badge).not.toBeInTheDocument()
	})

	it('opens shopping cart modal when cart button is clicked', () => {
		// Mock document.getElementById and showModal
		const mockDialog = {
			showModal: vi.fn(),
		}
		vi.spyOn(document, 'getElementById').mockReturnValue(
			mockDialog as unknown as HTMLElement,
		)

		render(<Header onCategorySelected={mockOnCategorySelected} />)
		const cartButton = screen.getByRole('button', { name: /shopping cart/i })
		fireEvent.click(cartButton)

		expect(document.getElementById).toHaveBeenCalled()
		expect(mockDialog.showModal).toHaveBeenCalled()
	})

	it('renders the ShoppingCartModal component', () => {
		render(<Header onCategorySelected={mockOnCategorySelected} />)
		expect(screen.getByTestId('shopping-cart-modal')).toBeInTheDocument()
	})
})
