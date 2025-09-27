type ImageListProps = {
	images: string[]
	title: string
}

export const ImageList = ({ images, title }: ImageListProps) => {
	return (
		<div className="h-62 overflow-y-auto">
			{images.map((image) => (
				<img key={image} src={image} alt={title} />
			))}
		</div>
	)
}
