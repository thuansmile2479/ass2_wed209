import React from "react";

const Modal = ({ open, children, title, handleClose }) => {
	return (
		<div
			style={{
				display: open ? "block" : "none",
			}}
			className="w-full h-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#212121]"
		>
			<div className="w-full h-full flex items-center justify-center ">
				<div class="w-[600px] rounded-lg shadow-lg bg-white my-3 ">
					<div class="flex justify-between border-b border-gray-100 px-5 py-4 z-30">
						<div>
							<i class="fas fa-exclamation-circle text-green-700"></i>
							<span class="ml-1 font-bold text-gray-700 text-lg">{title}</span>
						</div>
						<div>
							<button onClick={handleClose}>
								<i class="fa fa-times-circle text-red-500 hover:text-red-600 transition duration-150"></i>
							</button>
						</div>
					</div>

					<div class="px-10 py-5 text-gray-600">{children}</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
