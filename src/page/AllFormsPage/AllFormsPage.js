import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Button, Row, Col } from "antd";
import config from "../../environment/config";
import Navbar from "../../component/Navbar/Navbar";

const columns = [
	{
		title: "#ID",
		dataIndex: "_id",
		key: "_id",
		render: (text) => "#" + text.slice(-4).toUpperCase(),
	},
	{
		title: "Form Name",
		dataIndex: "formName",
		key: "formName",
	},
	{
		title: "Actions",
		key: "actions",
		render: (text, record) => (
			<Link to={`/${record._id}`}>
				<Button type='primary'>View Form</Button>
			</Link>
		),
	},
];

function AllFormsPage() {
	const [forms, setForms] = useState([]);
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 6,
		total: 0,
	});

	async function fetchForm(page = 1) {
		try {
			const res = await axios.get(
				config.API_URL + `forms?page=${page}&limit=${pagination.pageSize}`,
			);

			const formsWithKeys = res.data.data.data.map((form) => ({
				...form,
				key: form._id,
			}));

			setForms(formsWithKeys);
			setPagination({
				...pagination,
				current: page,
				total: res.data.data.total,
			});
		} catch (error) {
			console.error("Error fetching forms:", error);
		}
	}

	useEffect(() => {
		fetchForm();
	}, []);

	const handleRowClick = (record) => {
		console.log("Clicked on row:", record);
	};

	const handlePaginationChange = (page) => {
		fetchForm(page);
	};

	return (
		<>
			<Navbar />
			<Row justify='center'>
				<Col xs={24} sm={24} md={18} lg={16} xl={14}>
					<div style={{ textAlign: "center" }}>
						<h1>All Forms</h1>
						<Table
							dataSource={forms}
							columns={columns}
							onRow={(record) => ({
								onClick: () => handleRowClick(record),
							})}
							pagination={{
								...pagination,
								onChange: handlePaginationChange,
							}}
							style={{ textAlign: "center" }}
						/>
					</div>
				</Col>
			</Row>
		</>
	);
}

export default AllFormsPage;
