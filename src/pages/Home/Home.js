import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

import './Home.css';

export default function Home() {

    const onFinish = () => { }
    const onFinishFailed = () => { }

    return (
        <div className='form_login'>
            <h1 className='text'>Đăng nhập admin</h1>
            <Form
                name="basic"
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
                autoComplete="off"
            >
                <Form.Item
                    label="Tên đăng nhập"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên đăng nhập!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Ghi nhớ</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button style={{ minWidth: '50%' }} type="primary" htmlType="submit" >
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
