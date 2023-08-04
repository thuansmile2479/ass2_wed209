import multer from "multer"

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './src/public/uploads')
	},
	filename: function (req, file, cb) {
		console.log("server", req.body)
		const originalname = file.originalname
		const tail = originalname.split(".")[1]
		const name = originalname.split(".")[0].toLocaleLowerCase().split(" ").join("-")
		cb(null, name + "." + tail)
	}
})

const upload = multer({ storage: storage })

export { upload }