import { useEffect, useState } from 'react';
import axios from "axios";
import { Button, Table, Form, Input, message, Popconfirm, Space, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { apiServerUrl } from './constants/URL';
import './Products.css';

function App() {
    const [fresh, setRefresh] = useState(0);
    const [visible, setVisible] = useState(false);
    const [categories, setCategories] = useState(null);

    const [selectedRow, setSelectedRow] = useState(null);


    useEffect(() => {
        axios.get(`${apiServerUrl}/categories`).then((response) => {
            setCategories(response.data);
            console.log(response.data)
        });
    }, [fresh]);

    const columns = [
        {
            title: "Mã",
            dataIndex: "id",
            key: "id",
            with: '1%',
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
            render: (text) => {
                <span style={{ fontWeight: '700' }}>{text}</span>
            }
        },
        {
            title: "Mô tả ",
            dataIndex: "description",
            key: "description",
        },
        {
            title: " ",
            key: "actions",
            with: '1%',
            render: (text, record, index) => {
                return (
                    <Space>
                        <Button
                            type='dashed'
                            icon={<EditOutlined />}
                            style={{ fontWeight: '600' }}
                            onClick={() => {
                                setVisible(true);
                                setSelectedRow(record);
                                editForm.setFieldValue('name', record.name);
                                editForm.setFieldValue('description', record.description);
                            }}
                        />
                        <Popconfirm placement="topLeft" title='Bạn có muốn xóa không!' onConfirm={() => {
                            const { id } = record;
                            // Delete
                            axios.delete(`${apiServerUrl}/categories/${id}`).then((response) => {
                                message.success('Xóa danh mục thành công!')
                                setRefresh((r) => r + 1);
                            });
                        }} okText="Yes" cancelText="No">
                            <Button danger type='dashed' icon={<DeleteOutlined />} onClick={() => { }} />
                        </Popconfirm>
                    </Space>
                );
            }
        },
    ];

    const onFinish = (values) => {
        console.log(values)
        // POST
        axios.post(`${apiServerUrl}/categories`, values).then((response) => {
            message.success('Tạo danh mục thành công!')
            setRefresh((r) => r + 1);
            createForm.resetFields();
        });

    }
    const onFinishFailed = (values) => { };

    const [createForm] = Form.useForm();
    const [editForm] = Form.useForm();


    return (
        <div style={{ margin: 50 }}>
            <Form form={createForm} name="create-category"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">
                <Form.Item
                    label="Tên sản phẩm"
                    name="name"
                    rules={[{ required: true, message: 'vui lòng nhập tên sản phẩm!' }]} hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: 'vui lòng nhập mô tả sản phẩm!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            {/* TABLE */}
            <Table dataSource={categories} columns={columns}></Table>

            {/* MODAL */}
            <Modal
                title='Chỉnh sửa thông tin danh mục'
                open={visible}
                onOk={() => {
                    editForm.submit();
                }}
                okText='Lưu thông tin'
                cancelText='Đóng'
                onCancel={() => {
                    setVisible(false);
                }}
            >
                <Form
                    form={editForm}
                    name='edit'
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        name: '',
                        description: '',
                    }}
                    onFinish={(values) => {
                        // SUBMIT
                        axios.patch('http://localhost:9000/categories/' + selectedRow.id, values).then((response) => {
                            if (response.status === 200) {
                                setRefresh((r) => r + 1);
                                setVisible(false);
                            }
                        });
                    }}
                    onFinishFailed={(error) => {
                        console.log(error);
                    }}
                    autoComplete='off'
                >
                    <Form.Item
                        label='Tên danh mục'
                        name='name'
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Tên danh mục: Chưa nhập',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label='Mô tả' Name='description'>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default App;
