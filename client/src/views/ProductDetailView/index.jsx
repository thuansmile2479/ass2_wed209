import React, { useState, useEffect } from "react";
import { useGetProductQuery } from "../../api/product";
import { useParams } from "react-router";

const ProductDetailView = () => {
	const { slug } = useParams();
	const [product, setProduct] = useState(null);
	const { data } = useGetProductQuery(slug, { skip: !slug });

	useEffect(() => {
		if (data?.data) {
			setProduct(data?.data);
		}
	}, [data]);

	return (
		<section className="text-gray-700 body-font overflow-hidden bg-white">
			<div className="container px-5 py-24 mx-auto">
				<div className="lg:w-4/5 mx-auto flex flex-wrap">
					<img
						alt="ecommerce"
						className="lg:w-1/2 w-full object-cover object-center rounded-md border border-gray-200"
						src={"http://localhost:8080" + product?.images[0]?.path}
					/>
					<div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
						<h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product?.name}</h1>

						<p className="leading-relaxed">{product?.description}</p>

						<div className="flex">
							<span className="title-font font-medium text-2xl text-gray-900">{product?.price} VNĐ</span>
							<button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
								Thêm vào giỏ hàng
							</button>
							<button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
								<svg
									fill="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									className="w-5 h-5"
									viewBox="0 0 24 24"
								>
									<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductDetailView;
