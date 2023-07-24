import React, { useState } from 'react';
import { Table, Input, Select, Button, Modal, Form, InputNumber } from 'antd';
const { Option } = Select;

const CrewPage = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [crewMembersData, setCrewMembersData] = useState([
    {
      key: '1',
      name: 'John Doe',
      designation: 'Captain',
      nationality: 'USA',
      joiningDate: '2023-05-10',
      email: 'john.doe@example.com',
      address: '123 Main St, New York',
      gender: 'Male',
      age: 40,
    },
    {
      key: '2',
      name: 'Jane Smith',
      designation: 'First Officer',
      nationality: 'UK',
      joiningDate: '2023-06-15',
      email: 'jane.smith@example.com',
      address: '456 Oak Ave, London',
      gender: 'Female',
      age: 35,
    },
    {
      key: '3',
      name: 'Michael Johnson',
      designation: 'Engineer',
      nationality: 'Canada',
      joiningDate: '2023-07-20',
      email: 'michael.johnson@example.com',
      address: '789 Elm St, Toronto',
      gender: 'Male',
      age: 28,
    },
  ]);

  const [editingKey, setEditingKey] = useState('');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      setVisible(false);
      if (editingKey !== '') {
        // Editing an existing crew member
        setCrewMembersData((prevData) =>
          prevData.map((item) =>
            item.key === editingKey ? { ...item, ...values } : item
          )
        );
        setEditingKey('');
      } else {
        // Adding a new crew member
        const newKey = (crewMembersData.length + 1).toString();
        setCrewMembersData((prevData) => [
          ...prevData,
          {
            key: newKey,
            ...values,
          },
        ]);
      }
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
    setEditingKey('');
  };

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
    showModal();
  };

  const handleDelete = (key) => {
    // Filter out the crew member with the specified key
    const updatedData = crewMembersData.filter((item) => item.key !== key);
    setCrewMembersData(updatedData);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
      filters: [
        { text: 'Captain', value: 'Captain' },
        { text: 'First Officer', value: 'First Officer' },
        { text: 'Engineer', value: 'Engineer' },
      ],
      onFilter: (value, record) => record.designation === value,
    },
    {
      title: 'Nationality',
      dataIndex: 'nationality',
      key: 'nationality',
    },
    {
      title: 'Joining Date',
      dataIndex: 'joiningDate',
      key: 'joiningDate',
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDelete(record.key)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: 16 }}>
      <h1>Crew Members of Brighten Ship Management</h1>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Add New Crew Member
      </Button>
      <Table
        columns={columns}
        dataSource={crewMembersData}
        pagination={{ pageSize: 10 }}
        onChange={(pagination, filters, sorter) => console.log(sorter)}
      />

      {/* Modal for adding/editing crew member */}
      <Modal
        title={editingKey ? 'Edit Crew Member' : 'Add New Crew Member'}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="designation"
            label="Designation"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="Captain">Captain</Option>
              <Option value="First Officer">First Officer</Option>
              <Option value="Engineer">Engineer</Option>
            </Select>
          </Form.Item>
          <Form.Item name="nationality" label="Nationality">
            <Input />
          </Form.Item>
          <Form.Item name="joiningDate" label="Joining Date">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email Address">
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="Gender">
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Age">
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CrewPage;
