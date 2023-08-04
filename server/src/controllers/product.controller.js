import Product from "../models/product.model"
import createError from "http-errors"
import moment from "moment"

export async function getAllProduct(req, res, next) {
	try {
		const doc = await Product.find({})

		return res.json({
			status: 200,
			message: "Thành công",
			data: doc
		})
	} catch (error) {
		next(error)
	}
}

export async function getSingleProduct(req, res, next) {
	try {
		const { slug } = req.params

		const doc = await Product.findOne({
			slug
		})

		if (!doc) {
			throw createError('Không tìm thấy sản phẩm có slug: ' + slug)
		}

		return res.json({
			status: 200,
			message: "Thành công",
			data: doc
		})
	} catch (error) {
		next(error)
	}
}

export async function createProduct(req, res, next) {
	try {
		console.log(JSON.parse(req?.body?.payload))
		let files = req?.files

		files = files?.map((file) => ({
			path: "/uploads/" + file?.filename,
		}))

		const payload = JSON.parse(req?.body?.payload)

		const doc = await Product.create({
			...payload,
			images: files
		})

		return res.json({
			status: 200,
			message: "Thành công",
			data: doc
		})
	} catch (error) {
		next(error)
	}
}

export async function deleteProduct(req, res, next) {
	try {
		const { id } = req.params

		const doc = await Product.findOneAndDelete({
			_id: id
		})

		return res.json({
			status: 200,
			message: "Thành công",
			data: doc
		})
	} catch (error) {
		next(error)
	}
}

export async function updateProduct(req, res, next) {
	try {
		let files = req.files
		let payload = JSON.parse(req.body.payload)
		const { id } = req.params
		const product = await Product.findById(id)

		payload.images = product.images

		if (files.length > 1) {
			files = files.map((file) => ({
				path: "/uploads/" + file.filename,
			}))

			payload.images.push(...files)
		}



		const doc = await Product.updateOne(
			{
				_id: id
			},
			{
				$set: {
					...payload,
					updated_at: moment().toISOString()
				}
			},
			{
				new: true
			}
		)

		return res.json({
			status: 200,
			message: "Thành công",
			data: doc
		})
	} catch (error) {
		next(error)
	}
}
