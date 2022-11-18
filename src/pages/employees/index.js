import React from 'react';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../libraries/axiosClient';
import { Table, Button, Popconfirm, Form, Input, message, Space, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import moment from 'moment';

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [editFormVisible, setEditFormVisible] = useState(false);



    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (text) => {
                return <strong style={{ color: "blue" }}>{text}</strong>
            },
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            with: '1%',
            render: (text) => {
                return <span>{text}</span>;
            },
        },
        {
            title: 'Thư điện tử',
            dataIndex: 'email',
            key: 'email',
            with: '1%',
        },
        {
            title: 'điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            with: '1%',
        },
        {
            title: 'ngày sinh',
            dataIndex: 'birthday',
            key: 'birthday',
            with: '1%',
            render: (text) => {
                return <span>{moment(text).format('DD/MM/yyyy')}</span>;
            },
        },
        {
            title: '',
            key: 'actions',
            with: '1%',
            render: (text, record) => {
                return (
                    <Space>
                        <Popconfirm
                            title="Bạn có chắc chắn xóa tác vụ này không?"
                            onConfirm={() => {
                                // Delete
                                const id = record._id;
                                axiosClient
                                    .delete('/employees/' + id)
                                    .then(response => {
                                        message.success('xóa thành công.')
                                        setRefresh((f) => f + 1);
                                    }).catch((err) => {
                                        message.error('xóa thất bại.');
                                    })
                                console.log('delete', record)
                            }}
                            onCancel={() => { }}
                            okText="Đồng ý"
                            cancelText="Đóng"
                        >
                            <Button danger type='dashed' icon={<DeleteOutlined />} />
                        </Popconfirm>
                        <Button type='dashed' icon={<EditOutlined />} onClick={() => {
                            setSelectedRecord(record);
                            updateForm.setFieldsValue(record);
                            setEditFormVisible(true);
                            console.log('Selected Record', record)
                        }} />
                    </Space>
                )
            }
        },

    ];






    useEffect(() => {
        axiosClient.get('/employees').then(response => {
            setEmployees(response.data)
        })
    }, [refresh])

    const onFinish = (values) => {
        axiosClient.post('/employees', values).then((response) => {
            message.success('Thêm mới thành công');
            createForm.resetFields();
            setRefresh((f) => f + 1);
        }).catch((err) => {
            message.error('Thêm mới thất bại')
        })
        console.log(values)
    }
    const onFinishFailed = (errors) => {
        console.log(errors)
    }

    // Update

    const onUpdateFinish = (values) => {
        axiosClient
            .patch('/employees/' + selectedRecord._id, values)
            .then((response) => {
                message.success('Cập nhật mới thành công');
                updateForm.resetFields();
                setRefresh((f) => f + 1);
                setEditFormVisible(false)
            }).catch((err) => {
                message.error('Cập nhật mới thất bại')
            })
        console.log(values)
    }
    const onUpdateFinishFailed = (errors) => {
        console.log(errors)
    }

    const [createForm] = Form.useForm();
    const [updateForm] = Form.useForm();


    return (
        <div>

            <Form form={createForm} name="create-form"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 8,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
            >
                <Form.Item
                    label="Họ"
                    name="firstName"
                    rules={[
                        {
                            required: true,
                            message: 'Chưa nhập Họ!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tên"
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: 'Chưa nhập Tên!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Số điện thoại"
                    name="phoneNumber"
                    rules={[
                        {
                            required: true,
                            message: 'Chưa nhập số điện thoại!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Thư điện tử"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Chưa nhập email!',
                        },
                        {
                            type: 'email',
                            message: 'email không hợp lệ',
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Chưa nhập địa chỉ!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ngày sinh"
                    name="birthday"
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Lưu thông tin
                    </Button>
                </Form.Item>
            </Form>

            <Table dataSource={employees} columns={columns}></Table>
            {/* UPDATE-FORM */}
            <Modal centered open={editFormVisible} title="Cập nhật thông tin" onOk={() => { updateForm.submit(); }} onCancel={() => { setEditFormVisible(false) }} cancelText='Đóng' okText='Lưu thông tin'>
                <Form form={updateForm} name="create-form"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onUpdateFinish}
                    onFinishFailed={onUpdateFinishFailed}
                    autoComplete="on"
                >
                    <Form.Item
                        label="Họ"
                        name="firstName"
                        rules={[
                            {
                                required: true,
                                message: 'Chưa nhập Họ!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tên"
                        name="lastName"
                        rules={[
                            {
                                required: true,
                                message: 'Chưa nhập Tên!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                        rules={[
                            {
                                required: true,
                                message: 'Chưa nhập số điện thoại!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Thư điện tử"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Chưa nhập email!',
                            },
                            {
                                type: 'email',
                                message: 'email không hợp lệ',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Chưa nhập địa chỉ!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Ngày sinh"
                        name="birthday"
                        hasFeedback
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
