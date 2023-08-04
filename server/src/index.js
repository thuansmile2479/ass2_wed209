import express from "express"
import dotenv from "dotenv"
import { connect } from "./config/database.config"
import bodyParser from "body-parser"
import cors from "cors"
import initRouter from "./router/index.router"
import createError from "http-errors"
import path from "path"


dotenv.config()

const app = express()
const port = process.env.PORT || 4000

connect()
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/public', express.static(__dirname + '/uploads'));
app.use(cors({
	origin: [process.env.FE_URL, process.env.MOMO_URL, "http://localhost:3000"],
	credentials: true,
}));
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


initRouter(app)

app.use((req, res, next) => {
	next(createError.BadRequest('Đường dẫn không hợp lệ!'))
})

app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		error: {
			status: err.status || 500,
			message: err.message || "Lỗi server"
		}
	})
})


app.listen(port, () => {
	console.log("http://localhost:" + port)
})
