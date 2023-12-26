import React from "react";
import Navbar from "../../component/Navbar/Navbar";
import DynamicForm from "../../component/DynamicForm/DynamicForm";
import "./HomePage.css";

function HomePage() {
	return (
		<div className='homepage'>
			<div className='homepage-navbar'>
				<Navbar></Navbar>
			</div>
			<div className='homepage-content'>
				<DynamicForm />
			</div>
		</div>
	);
}

export default HomePage;
