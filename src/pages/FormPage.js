import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const FormPage = () => {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const onFinish = (values) => {
    console.log('Form values:', values);
    // You can perform further actions with the form values

    // Display success message
    message.success('Form submitted successfully!');
    // Redirect to Resume page after 2 seconds
    setTimeout(() => {
      setFormSubmitted(true);
      navigate('/pages/Resume');
    }, 2000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Form validation failed:', errorInfo);
  };

  // File upload configuration
  const fileProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', // Replace with your API endpoint for file upload
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Form Page</h1>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please enter your address!' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: true, message: 'Please enter your age!' }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Rank"
          name="rank"
          rules={[{ required: true, message: 'Please select your rank!' }]}
        >
          <Select>
            <Option value="Captain">Captain</Option>
            <Option value="Chief Officer">Chief Officer</Option>
            <Option value="2nd Officer">2nd Officer</Option>
            <Option value="3rd Officer">3rd Officer</Option>
            <Option value="Additional 3rd Officer">Additional 3rd Officer</Option>
            <Option value="Chief Engineer">Chief Engineer</Option>
            <Option value="2nd Engineer">2nd Engineer</Option>
            <Option value="3rd Engineer">3rd Engineer</Option>
            <Option value="4th Engineer">4th Engineer</Option>
            <Option value="5th Engineer / TME">5th Engineer / TME</Option>
            <Option value="Cadet">Cadet</Option>
            <Option value="Bosun">Bosun</Option>
            <Option value="Pumpman">Pumpman</Option>
            <Option value="Able Seamen">Able Seamen</Option>
            <Option value="Ordinary Seamen">Ordinary Seamen</Option>
            <Option value="ETO">ETO</Option>
            <Option value="Oiler / Motor Man">Oiler / Motor Man</Option>
            <Option value="Wiper">Wiper</Option>
            <Option value="Chief Cook">Chief Cook</Option>
            <Option value="General Steward">General Steward</Option>
            <Option value="1st Master">1st Master</Option>
            <Option value="2nd Master">2nd Master</Option>
            <Option value="ED1">ED1</Option>
            <Option value="ED2">ED2</Option>
            <Option value="Electrician">Electrician</Option>
            <Option value="Jr. Officer">Jr. Officer</Option>
            <Option value="Jr. Engg">Jr. Engg</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="CV File"
          name="cv"
          rules={[{ required: true, message: 'Please upload your CV!' }]}
        >
          <Upload {...fileProps}>
            <Button>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Please select your gender!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {formSubmitted && (
        <div style={{ textAlign: 'center' }}>
          <h2>Form Submitted!</h2>
          <p>Redirecting to Resume page...</p>
        </div>
      )}
    </div>
  );
};

export default FormPage;
