import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import {
	useGetProductQuery,
	useGetProductsQuery,
	useCreateProductMutation,
	useDeleteProductMutation,
	useUpdateProductMutation,
} from "../../api/product";
import moment from "moment/moment";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

const validationSchema = Joi.object({
	name: Joi.string().trim().required(),
	price: Joi.string().trim().required(),
	description: Joi.string().trim().required(),
	files: Joi.array().default([]),
});

const ProductManager = () => {
	const [slug, setSlug] = useState("");
	const { data, isLoading } = useGetProductsQuery();
	const [createProduct, { isLoading: updateLoading }] = useCreateProductMutation();
	const [updateProduct] = useUpdateProductMutation();
	const [deleteProduct] = useDeleteProductMutation();
	const { data: product } = useGetProductQuery(slug, { skip: !slug });
	const [files, setFiles] = useState([]);
	const [open, setOpen] = useState({
		show: false,
		type: 1,
	});

	const { register, handleSubmit, setValue } = useForm({
		resolver: async (data) => {
			const { error, value: values } = validationSchema.validate(data, {
				abortEarly: false,
			});

			return {
				values: error ? {} : values,
				errors: error
					? error.details.reduce((previous, currentError) => {
							return {
								...previous,
								[currentError.path[0]]: currentError,
							};
					  }, {})
					: {},
			};
		},
	});

	useEffect(() => {
		if (product?.data) {
			const { name, price, description } = product?.data;
			setValue("name", name);
			setValue("price", price);
			setValue("description", description);
		}
	}, [product?.data]);

	const handleChangeFiles = (e) => {
		setFiles((prev) => [...prev, ...e.target.files]);
	};

	const handleFormData = (data) => {
		const formData = new FormData();

		if (open.type == 1) {
			for (let i = 0; i < files.length; i++) {
				formData.append("files", files[i]);
			}
		} else {
			if (files.length > 1) {
				for (let i = 0; i < files.length; i++) {
					formData.append("files", files[i]);
				}
			}
		}

		formData.append("payload", JSON.stringify(data));
		return formData;
	};

	const handleClose = () => {
		setOpen({
			...open,
			show: false,
		});
		setSlug(null);
	};

	const onSubmit = (data) => {
		if (open.type == 1) {
			const { files, ...arg } = data;
			const formData = handleFormData(arg);
			createProduct(formData);
			handleClose();
		} else {
			const { files, ...arg } = data;
			const formData = handleFormData(arg);
			updateProduct({
				id: product.data._id,
				formData,
			});
			handleClose();
		}
	};

	const handleRemove = (id) => {
		const check = confirm("Ban co chac muon xoa khong");
		if (check) deleteProduct(id);
	};

	return (
		<div className="w-full">
			<div className="flex flex-col">
				<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="float-right">
						<button
							className="px-4 py-2 bg-green-700 text-white rounded font-semibold"
							onClick={() =>
								setOpen({
									...open,
									show: true,
								})
							}
						>
							+ Tạo
						</button>
					</div>
					<div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
						<div className="overflow-hidden">
							<table className="min-w-full text-left text-sm font-light">
								<thead className="border-b font-medium dark:border-neutral-500">
									<tr className="uppercase text-sm">
										<th
											scope="col"
											className="px-6 py-4"
										>
											#
										</th>
										<th
											scope="col"
											className="px-6 py-4"
										>
											Sản phẩm
										</th>
										<th
											scope="col"
											className="px-6 py-4"
										>
											Giá
										</th>
										<th
											scope="col"
											className="px-6 py-4"
										>
											Mô tả
										</th>
										<th
											scope="col"
											className="px-6 py-4"
										>
											Ngày tạo
										</th>
										<th
											scope="col"
											className="px-6 py-4"
										>
											Ngày cập nhật
										</th>
										<th
											scope="col"
											className="px-6 py-4"
										>
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{(isLoading || updateLoading) && (
										<tr className="w-full text-xl font-medium text-center my-2">Loading...</tr>
									)}
									{data?.data?.map((product, index) => {
										return (
											<tr
												className="border-b dark:border-neutral-500"
												key={index}
											>
												<td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
												<td className="whitespace-nowrap px-6 py-4">{product?.name}</td>
												<td className="whitespace-nowrap px-6 py-4">{product?.price} VNĐ</td>
												<td className="whitespace-nowrap px-6 py-4">{product?.description}</td>
												<td className="whitespace-nowrap px-6 py-4">
													{moment(product.created_at).format("DD/MM/YYYY hh:mm:ss")}
												</td>
												<td className="whitespace-nowrap px-6 py-4">
													{moment(product.created_at).format("DD/MM/YYYY hh:mm:ss")}
												</td>
												<td className="whitespace-nowrap px-6 py-4 flex gap-2">
													<button
														className="px-4 py-2 bg-red-500 text-white rounded font-semibold"
														onClick={() => handleRemove(product._id)}
													>
														Xóa
													</button>
													<button
														className="px-4 py-2 bg-blue-500 text-white rounded font-semibold"
														onClick={() => {
															setOpen({
																...open,
																type: 2,
																show: true,
															});
															setSlug(product.slug);
														}}
													>
														Cập Nhật
													</button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<Modal
				title={open.type == 1 ? "Thêm mới sản phẩm" : "Cập nhật sản phẩm"}
				open={open.show}
				handleClose={handleClose}
			>
				<form
					className="py-3"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="mb-4">
						<label
							for="name"
							className="block mb-2 text-sm text-gray-600"
						>
							Sản Phẩm
						</label>
						<input
							type="text"
							id="name"
							name="name"
							className="w-full px-4 py-2 border rounded "
							{...register("name")}
						/>
					</div>
					<div className="mb-4">
						<label
							for="price"
							className="block mb-2 text-sm text-gray-600"
						>
							Giá
						</label>
						<input
							type="text"
							id="price"
							name="price"
							className="w-full px-4 py-2 border rounded "
							{...register("price")}
						/>
					</div>
					<div className="mb-4">
						<label
							for="description"
							className="block mb-2 text-sm text-gray-600"
						>
							Mô tả
						</label>
						<input
							type="text"
							id="description"
							name="description"
							className="w-full px-4 py-2 border rounded "
							{...register("description")}
						/>
					</div>
					<div className="mb-4">
						<label
							for="files"
							className="block mb-2 text-sm text-gray-600"
						>
							File
						</label>
						<input
							type="file"
							id="files"
							name="files"
							multiple
							accept=".jpg, .png"
							onChange={handleChangeFiles}
							className="w-full px-4 py-2 border rounded "
						/>
					</div>

					<button
						type="submit"
						className="w-full px-4 py-2 bg-green-700 text-white rounded font-semibold"
					>
						{open.type == 1 ? "Tạo" : "Cập Nhật"}
					</button>
				</form>
			</Modal>
		</div>
	);
};

export default ProductManager;
