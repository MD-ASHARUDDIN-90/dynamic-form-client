import logo from "./logo.svg";
import "./App.css";
import DynamicForm from "./component/DynamicForm/DynamicForm";
import UserForm from "./component/Form/UserForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage/HomePage";
import AllFormsPage from "./page/AllFormsPage/AllFormsPage";
import FormPage from "./page/FormPage/FormPage";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/:id' element={<FormPage />} />
					<Route path='/all-forms' element={<AllFormsPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
