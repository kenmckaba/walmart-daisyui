type ImageListProps = {
	images: string[]
	title: string
}

export const ImageList = ({ images, title }: ImageListProps) => {
	return (
		<div>
			{images.map((image) => (
				<img key={image} src={image} alt={title} />
			))}
		</div>
	)
}
