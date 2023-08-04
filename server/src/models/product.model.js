import { Schema, model } from "mongoose"
import slug from "mongoose-slug-updater"

const productSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		slug: "name",
		unique: true,
		sparse: true,
		slugOn: { save: true, update: true, updateOne: true, updateMany: true, findOneAndUpdate: true },
	},
	price: {
		type: String
	},
	images: [
		{
			path: String
		}
	],
	description: {
		type: String,
		required: true
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: Date.now
	}
}, {
	timestamps: false,
	collection: "products",
	versionKey: false
})

productSchema.plugin(slug)
export default model('Product', productSchema)