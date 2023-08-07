import DefaultLayout from "./layouts/DefaultLayout";
import HomeView from "./views/HomeView";
import ProductDetailView from "./views/ProductDetailView";
import ProductView from "./views/ProductView";
import { Route, Router, Routes } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
import ProductManager from "./views/ProductManager";
import Login from './LogIn';
import Register from './Register';



const App = () => {
	const onHandSignUp = (user) => {
		axios
		  .post('http://localhost:8080/api/signup', user)
		  .then(() => {
			navigate('/admin/login');
		  })
		  .catch(({ response }) => {
			setErr(response.data.message);
			console.log(response.data.message);
		  });
	  };
	  const onHandLogin = (user) => {
		axios
		  .post('http://localhost:8080/api/signin', user)
		  .then((response) => {
			const token = response.data.accessToken;
			console.log(token);
			localStorage.setItem('token', JSON.stringify(token));
			navigate('/admin/products');
		  })
		  .catch(({ response }) => {
			alert(response.data.message);
		  });
	  };
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
				<Route path="/signup" element={<Register   />} />
				<Route path="/signin" element={<Login   />} />
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
