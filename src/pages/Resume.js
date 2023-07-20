import React, { useState } from 'react';
import { Button, Space, Table } from 'antd';

const Resume = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortOrder: sortedInfo.columnKey === 'email' ? sortedInfo.order : null,
      filters: [
        { text: 'John', value: 'john@example.com' },
        { text: 'Jim', value: 'jim@example.com' },
        { text: 'Joe', value: 'joe@example.com' },
      ],
      filteredValue: filteredInfo.email || null,
      onFilter: (value, record) => record.email.includes(value),
      ellipsis: true,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      sorter: (a, b) => a.gender.localeCompare(b.gender),
      sortOrder: sortedInfo.columnKey === 'gender' ? sortedInfo.order : null,
      filters: [
        { text: 'Male', value: 'Male' },
        { text: 'Female', value: 'Female' },
      ],
      filteredValue: filteredInfo.gender || null,
      onFilter: (value, record) => record.gender === value,
      ellipsis: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      sorter: (a, b) => a.address.localeCompare(b.address),
      sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
      filters: [
        { text: 'Main St', value: '123 Main St' },
        { text: 'Park Ave', value: '456 Park Ave' },
        { text: 'Broadway', value: '789 Broadway' },
        { text: 'Elm St', value: '321 Elm St' },
      ],
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value),
      ellipsis: true,
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
      sorter: (a, b) => a.designation.localeCompare(b.designation),
      sortOrder: sortedInfo.columnKey === 'designation' ? sortedInfo.order : null,
      filters: [
        {text:'Captain', value:'Captain'},
        {text:'First Mate', value:'First Mate'},
        {text:'Deckhand', value:'Deckhand'},
        {text:'Engineer',value:'Engineer'}
      ],
      filteredValue: filteredInfo.designation || null,
      onFilter: (value,record) => record.designation.includes(value),
      ellipsis: true,
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      email: 'john@example.com',
      gender: 'Male',
      address: '123 Main St',
      designation: 'Captain',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      email: 'jim@example.com',
      gender: 'Male',
      address: '456 Park Ave',
      designation: 'First Mate',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 28,
      email: 'joe@example.com',
      gender: 'Male',
      address: '789 Broadway',
      designation: 'Deckhand',
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 35,
      email: 'jimred@example.com',
      gender: 'Male',
      address: '321 Elm St',
      designation: 'Engineer',
    },
  ];

  return (
    <>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </>
  );
};

export default Resume;
