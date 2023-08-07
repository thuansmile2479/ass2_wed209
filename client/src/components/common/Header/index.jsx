import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div className="">
			<div className="actionsss">
				<img src="https://e1.yotools.net/images/user_image/2023/08/64cfd68fcc34c.jpg" alt="" />
				<div className="actions">
					<div className='login'>
						<a href=""><button><Link to={'/signup'}>Signup</Link></button></a>
					</div>
					<div className='logup'>
						<a href=""><button><Link to={'/signin'}>Signin</Link></button></a>
					</div>
				</div>
			</div>

			<div className="banner">
				<img src="https://cdn2.steamgriddb.com/file/sgdb-cdn/hero_thumb/8d8818c8e140c64c743113f563cf750f.jpg" alt="" />
			</div>
		</div>
	);
};

export default Header;
