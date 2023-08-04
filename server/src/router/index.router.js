import product from "./product.router"

const router = (app) => {
	app.use("/api/product", product)
}

export default router