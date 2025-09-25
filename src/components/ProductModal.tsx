type ProductModalProps = {
	modalId: string
}

export const ProductModal = ({ modalId }: ProductModalProps) => {
	return (
		<dialog id={modalId} className="modal">
			<div className="modal-box">
				<h3 className="font-bold text-lg">Added to cart!</h3>
				<p className="py-4">Press ESC key or click the button below to close</p>
				<div className="modal-action">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button type="submit" className="btn">
							OK
						</button>
					</form>
				</div>
			</div>
		</dialog>
	)
}
