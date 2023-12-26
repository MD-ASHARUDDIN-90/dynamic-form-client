import React, { useEffect, useState } from "react";
import { Form, Input, Button, Radio, Checkbox, DatePicker } from "antd";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../environment/config";
import Navbar from "../Navbar/Navbar";

const UserForm = () => {
	const { handleSubmit, register, setValue } = useForm();
	const { id } = useParams();
	const [formDefinition, setFormDefinition] = useState(null);

	async function fetchForm(id) {
		try {
			const res = await axios.get(config.API_URL + "forms/" + id);
			setFormDefinition(res.data.data);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fetchForm(id);
	}, [id]);

	const validateRegex = (rule, value) => {
		try {
			const regexPattern = new RegExp(rule.regexValidation);
			if (value && !value.match(regexPattern)) {
				return Promise.reject(
					`${rule.label} does not match the required pattern.`,
				);
			}
			return Promise.resolve();
		} catch (error) {
			console.error("Invalid regex pattern:", rule.regexValidation);
			return Promise.reject("Invalid regex pattern.");
		}
	};

	const handlePasswordValidation = (rule, value) => {
		// Password validation logic here
		// You can use rule.minLength and rule.maxLength for length validation
		return Promise.resolve();
	};

	const renderField = (field) => {
		switch (field.type) {
			case "text":
				return <Input />;
			case "email":
				return <Input type='email' />;
			case "password":
				return (
					<Input.Password
						{...register(field.label, {
							validate: handlePasswordValidation,
						})}
					/>
				);
			case "radio":
				return (
					<Radio.Group>
						{field.options.map((option) => (
							<Radio key={option} value={option}>
								{option}
							</Radio>
						))}
					</Radio.Group>
				);
			case "checkbox":
				return <Checkbox>{field.label}</Checkbox>;
			case "date":
				return (
					<DatePicker
						style={{ width: "100%" }}
						{...register(field.label)}
						onChange={(date, dateString) =>
							setValue(field.label, dateString, { shouldValidate: true })
						}
					/>
				);
			case "textarea":
				return <Input.TextArea {...register(field.label)} />;

			default:
				return null;
		}
	};

	const onSubmit = (data) => {
		console.log("Form Data:", data);
		// You can handle form submission logic here
	};

	if (!formDefinition) {
		return null; // Add a loading indicator or handle the case when data is not yet loaded
	}

	return (
		<>
			<Navbar />
			<Form onFinish={handleSubmit(onSubmit)}>
				<h2>{formDefinition.formName}</h2>
				{formDefinition.fields.map((field) => (
					<div key={field.label}>
						<Form.Item
							label={field.label}
							name={field.label}
							rules={[
								{
									required: field.isRequired,
									message: `${field.label} is required.`,
								},
								...(field.minLength
									? [
											{
												min: field.minLength,
												message: `${field.label} must be at least ${field.minLength} characters.`,
											},
									  ]
									: []),
								...(field.maxLength
									? [
											{
												max: field.maxLength,
												message: `${field.label} must be at most ${field.maxLength} characters.`,
											},
									  ]
									: []),
								...(field.regexValidation
									? [
											{
												validator: (_, value) => validateRegex(field, value),
											},
									  ]
									: []),
							]}
						>
							{renderField(field)}
						</Form.Item>
					</div>
				))}
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default UserForm;
