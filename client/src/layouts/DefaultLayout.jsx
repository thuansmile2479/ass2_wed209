import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { Outlet } from "react-router";

const DefaultLayout = () => {
	return (
		<div className="bg-white text-gray-600 work-sans leading-normal text-base tracking-normal">
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
};

export default DefaultLayout;
