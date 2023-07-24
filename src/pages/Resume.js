import React, { useState, useEffect } from 'react';
import { Button, Space, Table, Input, Select } from 'antd';

const Resume = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [data, setData] = useState([]);

  // Load data from local storage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      // If no data found in local storage, initialize with sample data
      setData([
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
      ]);
    }
  }, []);

  // Save data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(data));
  }, [data]);

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
      render: (_, record) =>
        record.editable ? (
          <Input
            value={record.name}
            onChange={(e) => handleEditRow(record.key, { name: e.target.value })}
          />
        ) : (
          record.name
        ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
      ellipsis: true,
      render: (_, record) =>
        record.editable ? (
          <Input
            type="number"
            value={record.age}
            onChange={(e) => handleEditRow(record.key, { age: parseInt(e.target.value, 10) || 0 })}
          />
        ) : (
          record.age
        ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
      render: (_, record) =>
        record.editable ? (
          <Input
            value={record.email}
            onChange={(e) => handleEditRow(record.key, { email: e.target.value })}
          />
        ) : (
          record.email
        ),
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
      render: (_, record) =>
        record.editable ? (
          <Select
            value={record.gender}
            onChange={(value) => handleEditRow(record.key, { gender: value })}
          >
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
          </Select>
        ) : (
          record.gender
        ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
      render: (_, record) =>
        record.editable ? (
          <Input
            value={record.address}
            onChange={(e) => handleEditRow(record.key, { address: e.target.value })}
          />
        ) : (
          record.address
        ),
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
      sorter: (a, b) => a.designation.localeCompare(b.designation),
      sortOrder: sortedInfo.columnKey === 'designation' ? sortedInfo.order : null,
      filters: [
        { text: 'Captain', value: 'Captain' },
        { text: 'First Mate', value: 'First Mate' },
        { text: 'Deckhand', value: 'Deckhand' },
        { text: 'Engineer', value: 'Engineer' },
      ],
      filteredValue: filteredInfo.designation || null,
      onFilter: (value, record) => record.designation.includes(value),
      ellipsis: true,
      render: (_, record) =>
        record.editable ? (
          <Input
            value={record.designation}
            onChange={(e) => handleEditRow(record.key, { designation: e.target.value })}
          />
        ) : (
          record.designation
        ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {record.editable ? (
            <>
              <Button type="primary" onClick={() => handleSaveRow(record.key)}>
                Save
              </Button>
              <Button onClick={() => handleCancelEdit(record.key)}>Cancel</Button>
            </>
          ) : (
            <Button onClick={() => handleEditRow(record.key)}>Edit</Button>
          )}
          <Button onClick={() => handleDeleteRow(record.key)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const handleAddRow = () => {
    const newRow = {
      key: Date.now().toString(),
      name: 'New Person',
      age: 0,
      email: '', // Include the 'email' field for the new row
      gender: '',
      address: '',
      designation: '',
      editable: true,
    };

    setData((prevData) => [...prevData, newRow]);
  };

  const handleEditRow = (key, updatedRow) => {
    const updatedData = data.map((row) =>
      row.key === key ? { ...row, ...updatedRow } : row
    );
    setData(updatedData);
  };

  const handleSaveRow = (key) => {
    const updatedData = data.map((row) => (row.key === key ? { ...row, editable: false } : row));
    setData(updatedData);
  };

  const handleCancelEdit = (key) => {
    // If the 'key' is 'Date.now()', it means this is a new row that hasn't been saved, so we remove it
    let updatedData = data;
    if (key === 'Date.now()') {
      updatedData = data.filter((row) => row.key !== key);
    } else {
      // Otherwise, set the 'editable' flag to false for the existing row
      updatedData = data.map((row) => (row.key === key ? { ...row, editable: false } : row));
    }
    setData(updatedData);
  };

  const handleDeleteRow = (key) => {
    const updatedData = data.filter((row) => row.key !== key);
    setData(updatedData);
  };

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
        <Button onClick={handleAddRow}>Add Row</Button>
      </Space>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </>
  );
};

export default Resume;
