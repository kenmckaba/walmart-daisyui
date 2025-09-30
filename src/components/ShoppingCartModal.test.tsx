import { beforeEach, describe, expect, it, vi } from 'vitest'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import * as useShoppingCartModule from '../state/useShoppingCart'
import { ShoppingCartModal } from './ShoppingCartModal'

// Mock the useShoppingCart hook
vi.mock('../state/useShoppingCart')

describe('ShoppingCartModal', () => {
	const modalId = 'test-modal'

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders modal with correct id', () => {
		vi.spyOn(useShoppingCartModule, 'useShoppingCart').mockReturnValue([])

		const { container } = render(<ShoppingCartModal modalId={modalId} />)

		const modal = container.querySelector(`#${modalId}`)
		expect(modal).toBeInTheDocument()
		expect(modal).toHaveAttribute('id', modalId)
	})

	it('displays "Shopping Cart" title', () => {
		vi.spyOn(useShoppingCartModule, 'useShoppingCart').mockReturnValue([])

		render(<ShoppingCartModal modalId={modalId} />)

		expect(screen.getByText('Shopping Cart')).toBeInTheDocument()
	})

	it('shows "No items in cart" when cart is empty', () => {
		vi.spyOn(useShoppingCartModule, 'useShoppingCart').mockReturnValue([])

		render(<ShoppingCartModal modalId={modalId} />)

		expect(screen.getByText('No items in cart.')).toBeInTheDocument()
	})

	it('displays cart items when cart has items', () => {
		const mockItems = [
			{
				id: 1,
				title: 'Product 1',
				price: 10.99,
				quantity: 2,
				total: 21.98,
				discountPercentage: 0,
				discountedPrice: 21.98,
			},
			{
				id: 2,
				title: 'Product 2',
				price: 15.5,
				quantity: 1,
				total: 15.5,
				discountPercentage: 5,
				discountedPrice: 15.5,
			},
		]

		vi.spyOn(useShoppingCartModule, 'useShoppingCart').mockReturnValue(
			mockItems,
		)

		render(<ShoppingCartModal modalId={modalId} />)

		expect(screen.getByText('Product 1')).toBeInTheDocument()
		expect(screen.getByText('Product 2')).toBeInTheDocument()
		expect(screen.getByText('$10.99')).toBeInTheDocument()
		expect(screen.getAllByText('$15.50')).toHaveLength(2) // Price and total for Product 2
		expect(screen.getByText('$21.98')).toBeInTheDocument()
	})

	it('calculates and displays correct total', () => {
		const mockItems = [
			{
				id: 1,
				title: 'Product 1',
				price: 10.99,
				quantity: 2,
				total: 21.98,
				discountPercentage: 0,
				discountedPrice: 21.98,
			},
			{
				id: 2,
				title: 'Product 2',
				price: 15.5,
				quantity: 1,
				total: 15.5,
				discountPercentage: 5,
				discountedPrice: 15.5,
			},
		]

		vi.spyOn(useShoppingCartModule, 'useShoppingCart').mockReturnValue(
			mockItems,
		)

		render(<ShoppingCartModal modalId={modalId} />)

		// Total should be 21.98 + 15.50 = 37.48
		expect(screen.getByText('Total:')).toBeInTheDocument()
		expect(screen.getByText('$37.48')).toBeInTheDocument()
	})

	it('displays grid headers correctly', () => {
		vi.spyOn(useShoppingCartModule, 'useShoppingCart').mockReturnValue([])

		render(<ShoppingCartModal modalId={modalId} />)

		expect(screen.getByText('Product')).toBeInTheDocument()
		expect(screen.getByText('Price')).toBeInTheDocument()
		expect(screen.getByText('Total')).toBeInTheDocument()
	})

	it('applies alternating row colors', () => {
		const mockItems = [
			{
				id: 1,
				title: 'Product 1',
				price: 10.99,
				quantity: 1,
				total: 10.99,
				discountPercentage: 0,
				discountedPrice: 10.99,
			},
			{
				id: 2,
				title: 'Product 2',
				price: 15.5,
				quantity: 1,
				total: 15.5,
				discountPercentage: 0,
				discountedPrice: 15.5,
			},
		]

		vi.spyOn(useShoppingCartModule, 'useShoppingCart').mockReturnValue(
			mockItems,
		)

		render(<ShoppingCartModal modalId={modalId} />)

		const product1Elements = screen.getAllByText('Product 1')
		const product2Elements = screen.getAllByText('Product 2')

		expect(product1Elements[0]).toHaveClass('bg-gray-100') // Even row
		expect(product2Elements[0]).toHaveClass('bg-base-400') // Odd row
	})

	it('closes modal when close button is clicked', () => {
		const mockDialog = {
			close: vi.fn(),
		}
		vi.spyOn(document, 'getElementById').mockReturnValue(
			mockDialog as unknown as HTMLElement,
		)
		vi.spyOn(useShoppingCartModule, 'useShoppingCart').mockReturnValue([])

		render(<ShoppingCartModal modalId={modalId} />)

		const closeButton = screen.getByText('✕')
		fireEvent.click(closeButton)

		expect(document.getElementById).toHaveBeenCalledWith(modalId)
		expect(mockDialog.close).toHaveBeenCalled()
	})
})
