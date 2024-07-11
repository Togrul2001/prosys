// src/components/StudentForm.tsx
import React, { useState } from 'react';
import { Form, Input, Button, Modal, notification } from 'antd';
import { Student } from '../../../types/Student';

interface StudentFormProps {
  data: Student[];
  // setData: React.Dispatch<React.SetStateAction<Student[]>>;
  reFetchFunc: any
}

const StudentForm: React.FC<StudentFormProps> = ({ data, reFetchFunc }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const values: any = form.getFieldsValue()
    const educationData = JSON.parse(localStorage.getItem('education') || '{}');

    const newStudent: Student = {
      number: data.length + 1,
      firstName: values.firstName,
      lastName: values.lastName,
      classNumber: values.classNumber
    };

    const updatedStudents = [...educationData.students||[],newStudent];
    

    localStorage.setItem('education', JSON.stringify({ ...educationData, students: updatedStudents }));
    notification.success({message:"Yeni tələbə yaradıldı"})
    form.resetFields();
    setIsModalOpen(false);
    reFetchFunc()
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>+</Button>
        <Modal title="Tələbə əlavə et" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: 'Please enter the student\'s first name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: 'Please enter the student\'s last name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="classNumber"
          label="Class Number"
          rules={[{ required: true, message: 'Please enter the student\'s class number!' }]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
        </Modal>

    </div>
  );
};

export default StudentForm;
