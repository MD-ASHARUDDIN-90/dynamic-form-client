// DynamicForm.js
import React from "react";
import { Form, Input, Button, Radio, Checkbox, Row, Col } from "antd";
import { useForm } from "react-hook-form";

// ... (imports)

const UserForm = ({ formDefinition }) => {
	const { register, handleSubmit, errors } = useForm();

	// Custom validator for regex validation
	const validateRegex = (rule, value) => {
		const regexPattern = new RegExp(rule.regexValidation);
		if (value && !regexPattern.test(value)) {
			return Promise.reject(
				`${rule.label} does not match the required pattern.`,
			);
		}
		return Promise.resolve();
	};

	const onSubmit = (data) => {
		console.log("Form Data:", data);
		// You can handle form submission logic here
	};

	return (
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
						{field.type === "text" && <Input />}
						{field.type === "email" && <Input type='email' />}
						{field.type === "password" && <Input.Password />}
						{field.type === "radio" && (
							<Radio.Group>
								{field.options.map((option) => (
									<Radio key={option} value={option}>
										{option}
									</Radio>
								))}
							</Radio.Group>
						)}
						{field.type === "checkbox" && <Checkbox>{field.label}</Checkbox>}
					</Form.Item>
				</div>
			))}
			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};

export default UserForm;
