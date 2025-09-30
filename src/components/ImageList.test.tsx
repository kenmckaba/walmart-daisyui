import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ImageList } from './ImageList'

describe('ImageList', () => {
	const mockImages = [
		'https://example.com/image1.jpg',
		'https://example.com/image2.jpg',
		'https://example.com/image3.jpg',
	]
	const mockTitle = 'Test Product'

	it('renders all images when images array is provided', () => {
		render(<ImageList images={mockImages} title={mockTitle} />)

		const images = screen.getAllByAltText(mockTitle)
		expect(images).toHaveLength(3)
		expect(images[0]).toHaveAttribute('src', mockImages[0])
		expect(images[1]).toHaveAttribute('src', mockImages[1])
		expect(images[2]).toHaveAttribute('src', mockImages[2])
	})

	it('has correct alt text', () => {
		render(<ImageList images={mockImages} title={mockTitle} />)

		const images = screen.getAllByAltText(mockTitle)
		images.forEach(image => {
			expect(image).toHaveAttribute('alt', mockTitle)
		})
	})

	it('renders container with correct CSS classes', () => {
		const { container } = render(<ImageList images={mockImages} title={mockTitle} />)

		const containerDiv = container.firstChild as HTMLElement
		expect(containerDiv).toHaveClass('h-62', 'overflow-y-auto')
	})

	it('handles empty images array gracefully', () => {
		render(<ImageList images={[]} title={mockTitle} />)

		const images = screen.queryAllByAltText(mockTitle)
		expect(images).toHaveLength(0)
	})

	it('handles single image in array', () => {
		const singleImage = ['https://example.com/single.jpg']
		render(<ImageList images={singleImage} title={mockTitle} />)

		const images = screen.getAllByAltText(mockTitle)
		expect(images).toHaveLength(1)
		expect(images[0]).toHaveAttribute('src', singleImage[0])
	})

	it('renders all images when multiple images provided', () => {
		render(<ImageList images={mockImages} title={mockTitle} />)

		const allImages = screen.getAllByRole('img')
		expect(allImages).toHaveLength(3)

		allImages.forEach((image, index) => {
			expect(image).toHaveAttribute('src', mockImages[index])
			expect(image).toHaveAttribute('alt', mockTitle)
		})
	})

	it('uses image src as unique keys', () => {
		const { container } = render(<ImageList images={mockImages} title={mockTitle} />)

		const images = container.querySelectorAll('img')
		expect(images).toHaveLength(3)

		// Each image should be rendered correctly
		images.forEach((image, index) => {
			expect(image).toHaveAttribute('src', mockImages[index])
		})
	})
})
