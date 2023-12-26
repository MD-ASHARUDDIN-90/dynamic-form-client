// Navbar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import "./Navbar.css"; // Import the CSS file for styling

const Navbar = () => {
	const location = useLocation();

	return (
		<Menu
			mode='horizontal'
			selectedKeys={[location.pathname]}
			className='custom-menu'
		>
			<Menu.Item key='/'>
				<Link to='/'>New Form</Link>
			</Menu.Item>
			<Menu.Item key='/all-forms'>
				<Link to='/all-forms'>Forms</Link>
			</Menu.Item>
		</Menu>
	);
};

export default Navbar;
