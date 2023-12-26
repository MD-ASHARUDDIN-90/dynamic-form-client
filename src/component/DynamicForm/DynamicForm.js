import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Select, Space, Typography } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import axios from "axios";
import { notification } from "antd";
import "./DynamicForm.css"; // Import your custom CSS file
import config from "../../environment/config";

const { Option } = Select;
const { Title } = Typography;

const DynamicForm = () => {
	const [formName, setFormName] = useState("");
	const [formFields, setFormFields] = useState([
		{ type: "text", label: "New Field", isRequired: false },
	]);

	const handleAddField = () => {
		setFormFields((prevFields) => [
			...prevFields,
			{ type: "text", label: "New Field", isRequired: false },
		]);
	};

	const handleRemoveField = (index) => {
		setFormFields((prevFields) => {
			const updatedFields = [...prevFields];
			updatedFields.splice(index, 1);
			return updatedFields;
		});
	};

	const handleFormNameChange = (e) => {
		setFormName(e.target.value);
	};

	const handleAddRadioOption = (index) => {
		setFormFields((prevFields) => {
			const updatedFields = [...prevFields];
			updatedFields[index].options = [
				...(updatedFields[index].options || []),
				"New Option",
			];
			return updatedFields;
		});
	};

	const handleRemoveRadioOption = (fieldIndex, optionIndex) => {
		setFormFields((prevFields) => {
			const updatedFields = [...prevFields];
			updatedFields[fieldIndex].options.splice(optionIndex, 1);
			return updatedFields;
		});
	};

	const handleSubmit = async () => {
		try {
			// Log the dynamic form data
			console.log({ formName, formFields });
			const data = { formName, fields: formFields };
			console.log(config.API_URL);
			const res = await axios.post(config.API_URL + "forms/create", data);
			console.log("submit", res);
			if (res.status === 200) {
				notification.success({
					message: "Success",
					description: "Successfully created form.",
					duration: 5,
				});
				setFormFields([
					{ type: "text", label: "New Field", isRequired: false },
				]);
				setFormName("");
			}
		} catch (error) {
			notification.error({
				message: "Error",
				description: "Error in saving the form. Please try again later.",
				duration: 5,
			});
		}
	};

	const renderAdditionalInputs = (field, index) => {
		switch (field.type) {
			case "text":
			case "password":
				return (
					<>
						<Col span={12}>
							<Form.Item label='Min Length'>
								<Input
									type='number'
									value={field.minLength || ""}
									onChange={(e) => {
										const updatedFields = [...formFields];
										updatedFields[index].minLength = e.target.value;
										setFormFields(updatedFields);
									}}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label='Max Length'>
								<Input
									type='number'
									value={field.maxLength || ""}
									onChange={(e) => {
										const updatedFields = [...formFields];
										updatedFields[index].maxLength = e.target.value;
										setFormFields(updatedFields);
									}}
								/>
							</Form.Item>
						</Col>
						{
							// 	<Col span={12}>
							// 	<Form.Item label='Regex Validation'>
							// 		<Input
							// 			value={field.regexValidation || ""}
							// 			onChange={(e) => {
							// 				const updatedFields = [...formFields];
							// 				updatedFields[index].regexValidation = e.target.value;
							// 				setFormFields(updatedFields);
							// 			}}
							// 		/>
							// 	</Form.Item>
							// </Col>
						}
					</>
				);

			case "textarea":
				return (
					<Col span={12}>
						<Form.Item label='Max Length'>
							<Input
								type='number'
								value={field.maxLength || ""}
								onChange={(e) => {
									const updatedFields = [...formFields];
									updatedFields[index].maxLength = e.target.value;
									setFormFields(updatedFields);
								}}
							/>
						</Form.Item>
					</Col>
				);
			default:
				return null;
		}
	};

	return (
		<div className='dynamic-form-container'>
			<Title level={2}>Create Your Form</Title>
			<Form>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item label='Form Name'>
							<Input value={formName} onChange={handleFormNameChange} />
						</Form.Item>
					</Col>
				</Row>
				{formFields.map((field, index) => (
					<Row gutter={16} key={index} className='dynamic-form-row'>
						<Divider className='dynamic-form-divider' />
						<Col span={12}>
							<Form.Item label='Label'>
								<Input
									value={field.label}
									onChange={(e) => {
										const updatedFields = [...formFields];
										updatedFields[index].label = e.target.value;
										setFormFields(updatedFields);
									}}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label='Type'>
								<Select
									value={field.type}
									onChange={(value) => {
										const updatedFields = [...formFields];
										updatedFields[index].type = value;
										setFormFields(updatedFields);
									}}
								>
									<Option value='text'>Text</Option>
									<Option value='textarea'>TextArea</Option>
									<Option value='email'>Email</Option>
									<Option value='password'>Password</Option>
									<Option value='date'>Date</Option>
									<Option value='radio'>Radio</Option>
									<Option value='checkbox'>Checkbox</Option>
								</Select>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label='Is Required'>
								<Select
									value={field.isRequired ? "true" : "false"}
									onChange={(value) => {
										const updatedFields = [...formFields];
										updatedFields[index].isRequired = value === "true";
										setFormFields(updatedFields);
									}}
								>
									<Option value='true'>Yes</Option>
									<Option value='false'>No</Option>
								</Select>
							</Form.Item>
						</Col>

						{field.type === "radio" && (
							<Col span={24}>
								<Form.Item label='Options'>
									{field.options &&
										field.options.map((option, optionIndex) => (
											<Row gutter={16} key={optionIndex} className='option-row'>
												<Col span={16}>
													<Form.Item>
														<Input
															value={option}
															onChange={(e) => {
																const updatedFields = [...formFields];
																updatedFields[index].options[optionIndex] =
																	e.target.value;
																setFormFields(updatedFields);
															}}
														/>
													</Form.Item>
												</Col>
												<Col span={6}>
													<Form.Item>
														<Button
															type='default'
															icon={<DeleteOutlined />}
															onClick={() =>
																handleRemoveRadioOption(index, optionIndex)
															}
														>
															Remove
														</Button>
													</Form.Item>
												</Col>
											</Row>
										))}
									<Button
										type='dashed'
										icon={<PlusOutlined />}
										onClick={() => handleAddRadioOption(index)}
									>
										Add Option
									</Button>
								</Form.Item>
							</Col>
						)}
						{renderAdditionalInputs(field, index)}
						<Col span={24}>
							<Form.Item label='Actions'>
								<Space>
									<Button
										icon={
											<DeleteOutlined
												style={{ color: "red", fontSize: "1.4rem" }}
											/>
										}
										type='danger'
										onClick={() => handleRemoveField(index)}
									/>
								</Space>
							</Form.Item>
						</Col>
					</Row>
				))}
				<Form.Item>
					<Button
						type='dashed'
						icon={<PlusOutlined />}
						onClick={handleAddField}
					>
						Add Field
					</Button>
				</Form.Item>
				<Form.Item>
					<Button type='primary' onClick={handleSubmit}>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default DynamicForm;
