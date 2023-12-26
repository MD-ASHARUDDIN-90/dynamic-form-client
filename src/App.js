import logo from "./logo.svg";
import "./App.css";
import DynamicForm from "./component/DynamicForm/DynamicForm";
import UserForm from "./component/Form/UserForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage/HomePage";

function App() {
	const dynamicFormDefinition = {
		formName: "MyDynamicForm",
		fields: [
			{
				label: "Full Name",
				type: "text",
				isRequired: true,
			},
			{
				label: "Email",
				type: "email",
				isRequired: true,
			},
			{
				label: "Password",
				type: "password",
				isRequired: true,
				minLength: 8,
				maxLength: 20,
				regexValidation:
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
			},

			{
				label: "Gender",
				type: "radio",
				isRequired: true,
				options: ["Male", "Female", "Other"],
			},
			{
				label: "Subscribe to Newsletter",
				type: "checkbox",
				isRequired: false,
			},
		],
	};

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/all-forms' element={<DynamicForm />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
