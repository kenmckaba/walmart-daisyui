import { describe, it, expect, vi, beforeEach } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { CategoryList } from './CategoryList'
import * as useCategoriesModule from './hooks/useCategories'

const mockCategories = [
	{ slug: 'electronics', name: 'Electronics' },
	{ slug: 'clothing', name: 'Clothing' },
]

vi.mock('./hooks/useCategories')

describe('CategoryList', () => {
	beforeEach(() => {
		vi.spyOn(useCategoriesModule, 'useCategories').mockReturnValue({
			categories: mockCategories,
			isPending: false,
			error: null,
		})
	})
	it('renders category options', () => {
		render(<CategoryList onSelected={() => {}} />)
		expect(screen.getByText('Select Category')).toBeInTheDocument()
		expect(screen.getByText('Electronics')).toBeInTheDocument()
		expect(screen.getByText('Clothing')).toBeInTheDocument()
	})

	it('calls onSelected when a category is selected', () => {
		const onSelected = vi.fn()
		render(<CategoryList onSelected={onSelected} />)
		fireEvent.change(screen.getByRole('combobox'), {
			target: { value: 'clothing' },
		})
		expect(onSelected).toHaveBeenCalledWith('clothing')
	})

	it('shows loading state', () => {
		vi.spyOn(useCategoriesModule, 'useCategories').mockReturnValue({
			categories: [],
			isPending: true,
			error: null,
		})
		render(<CategoryList onSelected={() => {}} />)
		expect(screen.getByText('Loading...')).toBeInTheDocument()
	})

	it('shows error state', () => {
		vi.spyOn(useCategoriesModule, 'useCategories').mockReturnValue({
			categories: [],
			isPending: false,
			error: new Error('Error!'),
		})
		render(<CategoryList onSelected={() => {}} />)
		expect(screen.getByText('Error loading categories')).toBeInTheDocument()
	})
})
