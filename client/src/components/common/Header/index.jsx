import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<nav
			id="header"
			className="w-full z-30 "
		>

			<div className="flex py-5">
				<div
					className=" md:flex md:items-center md:w-auto w-full order-3 md:order-1 flex"
					id="menu"
				>
					<nav>
						<ul className="flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
							<li>
								<Link
									className="inline-block no-underline hover:text-black hover:underline py-2 px-4"
									to="/"
								>
									Trang Chủ
								</Link>
							</li>
							<li>
								<Link
									className="inline-block no-underline hover:text-black hover:underline py-2 px-4"
									to="/"
								>
									Cửa Hàng
								</Link>
							</li>
							<li>
								<Link
									className="inline-block no-underline hover:text-black hover:underline py-2 px-4"
									to="/"
								>
									Bài Viết
								</Link>
							</li>
						</ul>
					</nav>
					<div className="flex hihi">
						<div className='login'>
							<a href=""><button><Link to={'/signup'}>Signup</Link></button></a>
						</div>
						<div className='logup'>
							<a href=""><button><Link to={'/signin'}>Signin</Link></button></a>
						</div>
					</div>
				</div>

			</div>

			<div className="banner">
				<img src="https://picsum.photos/1870/550" alt="" />
			</div>


		</nav>
	);
};

export default Header;
