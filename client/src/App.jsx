import DefaultLayout from "./layouts/DefaultLayout";
import HomeView from "./views/HomeView";
import ProductDetailView from "./views/ProductDetailView";
import ProductView from "./views/ProductView";
import { Route, Router, Routes } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
import ProductManager from "./views/ProductManager";

const App = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={<DefaultLayout />}
			>
				<Route
					index
					element={<HomeView />}
				/>
				<Route
					path="/:slug"
					element={<ProductDetailView />}
				/>
			</Route>
			<Route
				path="/admin"
				element={<AdminLayout />}
			>
				<Route
					index
					element={<ProductManager />}
				/>
			</Route>
		</Routes>
	);
};

export default App;
