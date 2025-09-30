import { beforeEach, describe, expect, it, vi } from 'vitest'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import * as useShoppingCartModule from '../state/useShoppingCart'
import { ProductCard } from './ProductCard'

// Mock the child components
vi.mock('./ImageList', () => ({
	ImageList: ({ images, title }: { images: string[]; title: string }) => (
		<div data-testid="image-list">
			{title} - {images.length} images
		</div>
	),
}))

vi.mock('./ShoppingCartModal', () => ({
	ShoppingCartModal: ({ modalId }: { modalId: string }) => (
		<dialog id={modalId} data-testid="shopping-cart-modal">
			Mock Shopping Cart Modal
		</dialog>
	),
}))

// Mock the useShoppingCart hook
vi.mock('../state/useShoppingCart')

describe('ProductCard', () => {
	const mockProduct = {
		id: 1,
		title: 'Test Product',
		price: 29.99,
		description: 'This is a test product description',
		category: 'electronics',
		images: ['image1.jpg', 'image2.jpg'],
		rating: 4.5,
		discountPercentage: 0,
	}

	const mockAddItem = vi.fn()

	beforeEach(() => {
		vi.clearAllMocks()
		vi.spyOn(useShoppingCartModule, 'useShoppingCart').mockReturnValue(
			mockAddItem,
		)
	})

	it('renders product information correctly', () => {
		render(<ProductCard product={mockProduct} />)

		expect(screen.getByText('Test Product')).toBeInTheDocument()
		expect(
			screen.getByText('This is a test product description'),
		).toBeInTheDocument()
		expect(screen.getAllByText('$29.99')).toHaveLength(2) // Price and default total
		expect(screen.getByTestId('image-list')).toBeInTheDocument()
	})

	it('displays default quantity and calculates total', () => {
		render(<ProductCard product={mockProduct} />)

		const quantityInput = screen.getByDisplayValue('1')
		expect(quantityInput).toBeInTheDocument()
		expect(screen.getAllByText('$29.99')).toHaveLength(2) // Price and default total
	})

	it('updates total when quantity changes', () => {
		render(<ProductCard product={mockProduct} />)

		const quantityInput = screen.getByDisplayValue('1')
		fireEvent.change(quantityInput, { target: { value: '3' } })

		expect(screen.getByText('$89.97')).toBeInTheDocument() // 29.99 * 3
	})

	it('adds item to cart when Add to cart button is clicked', () => {
		// Mock document.getElementById and showModal
		const mockDialog = {
			showModal: vi.fn(),
		}
		vi.spyOn(document, 'getElementById').mockReturnValue(
			mockDialog as unknown as HTMLElement,
		)

		render(<ProductCard product={mockProduct} />)

		const quantityInput = screen.getByDisplayValue('1')
		fireEvent.change(quantityInput, { target: { value: '2' } })

		const addToCartButton = screen.getByRole('button', { name: /add to cart/i })
		fireEvent.click(addToCartButton)

		expect(mockAddItem).toHaveBeenCalledWith({
			id: 1,
			title: 'Test Product',
			price: 29.99,
			quantity: 2,
			total: 59.98,
			discountPercentage: 0,
			discountedPrice: 59.98,
		})
	})

	it('opens shopping cart modal when Add to cart is clicked', () => {
		const mockDialog = {
			showModal: vi.fn(),
		}
		vi.spyOn(document, 'getElementById').mockReturnValue(
			mockDialog as unknown as HTMLElement,
		)

		render(<ProductCard product={mockProduct} />)

		const addToCartButton = screen.getByRole('button', { name: /add to cart/i })
		fireEvent.click(addToCartButton)

		expect(document.getElementById).toHaveBeenCalled()
		expect(mockDialog.showModal).toHaveBeenCalled()
	})

	it('renders shopping cart modal', () => {
		render(<ProductCard product={mockProduct} />)
		expect(screen.getByTestId('shopping-cart-modal')).toBeInTheDocument()
	})

	it('validates minimum quantity of 1', () => {
		render(<ProductCard product={mockProduct} />)

		const quantityInput = screen.getByDisplayValue('1') as HTMLInputElement
		expect(quantityInput.min).toBe('1')
	})
})
