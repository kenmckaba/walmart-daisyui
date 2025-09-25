import type { Product } from './hooks/useProducts'
// import { ImageList } from './ImageList'

type ProductCardProps = {
	product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => (
	<div className="card bg-base-100 w-64 shadow-sm">
		<figure>
			<img key={product.images[0]} src={product.images[0]} alt={'blah'} />
			{/* <ImageList images={product.images} title={product.title} /> */}
		</figure>
		<div className="card-body">
			<h2 className="card-title">{product.title}</h2>
			<p>{product.description}</p>
			<div className="card-actions justify-end">
				<button type="button" className="btn btn-primary">
					Buy Now
				</button>
			</div>
		</div>
	</div>
)
