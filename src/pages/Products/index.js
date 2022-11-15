import React from 'react';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../libraries/axiosClient';
import { Table, Button, Popconfirm, Form, Input, message, Space, Modal, InputNumber, Select } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import numeral from 'numeral';

export default function Products() {
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [editFormVisible, setEditFormVisible] = useState(false);



    const columns = [
        {
            title: 'Danh mục sản phẩm',
            dataIndex: 'category',
            key: 'category',
            render: (text, record) => {
                return <strong >{record?.category?.name}</strong>
            },
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (text) => {
                return <strong >{text}</strong>
            },
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            with: '1%',
            render: (text) => {
                return <span>{numeral(text).format('0,0$')}</span>;
            },
        },
        {
            title: 'Giảm giá',
            dataIndex: 'discount',
            key: 'discount',
            with: '1%',
            render: (text) => {
                return <span>{numeral(text).format('0,0')}%</span>;
            },
        },
        {
            title: 'Tồn kho',
            dataIndex: 'stock',
            key: 'stock',
            with: '1%',
            render: (text) => {
                return <span>{numeral(text).format('0,0.0')}</span>;
            },
        },
        {
            title: 'Nhà cung cấp',
            dataIndex: 'supplier',
            key: 'supplier',
            render: (text, record) => {
                return <strong >{record?.supplier?.name}</strong>
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
                                    .delete('/products/' + id)
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
        axiosClient.get('/categories').then(response => {
            setCategories(response.data)
        })
    }, [])

    useEffect(() => {
        axiosClient.get('/suppliers').then(response => {
            setSuppliers(response.data)
        })
    }, [])





    useEffect(() => {
        axiosClient.get('/products').then(response => {
            setProducts(response.data)
        })
    }, [refresh])

    const onFinish = (values) => {
        axiosClient.post('/products', values).then((response) => {
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
            .patch('/products/' + selectedRecord._id, values)
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
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
            >
                <Form.Item
                    label="Danh mục sản phẩm"
                    name="categoryId"
                    rules={[
                        {
                            required: true,
                            message: 'Chưa nhập tên danh mục sản phẩm!',
                        },
                    ]}
                    hasFeedback
                >
                    <Select style={{ minWidth: '40%' }} options={categories && categories.map((c) => {
                        return {
                            value: c._id,
                            label: c.name,
                        }
                    })} />
                </Form.Item>
                <Form.Item
                    label="Tên sản phẩm"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Chưa nhập tên sản phẩm!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input style={{ minWidth: 400 }} />
                </Form.Item>
                <Form.Item
                    label="Giá bán"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Chưa nhập giá bán!',
                        },
                    ]}
                    hasFeedback
                >
                    <InputNumber style={{ minWidth: 300 }} formatter={(value) => {
                        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }} />
                </Form.Item>
                <Form.Item
                    label="Giảm giá"
                    name="discount"
                >
                    <InputNumber style={{ minWidth: 300 }} formatter={(value) => `${value}%`} parser={(value) => value.replace('%', '')} />
                </Form.Item>
                <Form.Item
                    label="Tồn kho"
                    name="stock"
                    rules={[
                        {
                            required: true,
                            message: 'Chưa nhập giá bán!',
                        },
                    ]}
                    hasFeedback
                >
                    <InputNumber style={{ minWidth: 300 }} formatter={(value) => {
                        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }} />
                </Form.Item>

                <Form.Item
                    label="Nhà cung cấp"
                    name="supplierId"
                    rules={[
                        {
                            required: true,
                            message: 'Chưa nhập tên danh mục sản phẩm!',
                        },
                    ]}
                    hasFeedback
                >
                    <Select options={suppliers && suppliers.map((c) => {
                        return {
                            value: c._id,
                            label: c.name,
                        }
                    })} style={{ minWidth: 400 }} />
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

            <Table dataSource={products} columns={columns}></Table>

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
                        label="Danh mục sản phẩm"
                        name="categoryId"
                        rules={[
                            {
                                required: true,
                                message: 'Chưa nhập tên danh mục sản phẩm!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Select options={categories && categories.map((c) => {
                            return {
                                value: c._id,
                                label: c.name,
                            }
                        })} />
                    </Form.Item>
                    <Form.Item
                        label="Tên sản phẩm"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Chưa nhập tên sản phẩm!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Giá bán"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Chưa nhập giá bán!',
                            },
                        ]}
                        hasFeedback
                    >
                        <InputNumber style={{ minWidth: 150 }} formatter={(value) => {
                            return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }} />
                    </Form.Item>
                    <Form.Item
                        label="Giảm giá"
                        name="discount"
                    >
                        <InputNumber style={{ minWidth: 150 }} formatter={(value) => `${value}%`} />
                    </Form.Item>
                    <Form.Item
                        label="Tồn kho"
                        name="stock"
                        rules={[
                            {
                                required: true,
                                message: 'Chưa nhập giá bán!',
                            },
                        ]}
                        hasFeedback
                    >
                        <InputNumber style={{ minWidth: 150 }} formatter={(value) => {
                            return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }} />
                    </Form.Item>

                    <Form.Item
                        label="Nhà cung cấp"
                        name="supplierId"
                        rules={[
                            {
                                required: true,
                                message: 'Chưa nhập tên danh mục sản phẩm!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Select options={suppliers && suppliers.map((c) => {
                            return {
                                value: c._id,
                                label: c.name,
                            }
                        })} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
