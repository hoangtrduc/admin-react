import React from 'react';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../libraries/axiosClient';
import { Table } from 'antd';
import moment from 'moment';

export default function List() {
    const [employees, setEmployees] = useState([]);

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

    ];






    useEffect(() => {
        axiosClient.get('/employees').then(response => {
            setEmployees(response.data)
            console.log(response.data)
        })
    }, [])


    return (
        <div>
            <Table dataSource={employees} columns={columns}></Table>
        </div>
    )
}
