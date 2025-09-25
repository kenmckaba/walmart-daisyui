export const ProductSkeleton = () => (
	<div className="flex w-52 flex-col gap-4">
		<div className="flex items-center gap-4">
			<div className="skeleton h-16 w-16 shrink-0 rounded-full" />
			<div className="flex flex-col gap-4">
				<div className="skeleton h-4 w-20" />
				<div className="skeleton h-4 w-28" />
			</div>
		</div>
		<div className="skeleton h-32 w-full" />
	</div>
)

export const ProductSkeletonList = ({ count = 4 }: { count?: number }) => (
	<div className="flex flex-wrap gap-4">
		{Array.from({ length: count }).map(() => (
			<ProductSkeleton key={crypto.randomUUID()} />
		))}
	</div>
)
