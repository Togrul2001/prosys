// src/components/StudentForm.tsx
import React, { useId, useState } from 'react';
import { Form, Input, Button, Modal, notification } from 'antd';
import { Student } from '../../../types/Student';

interface StudentFormProps {
  data: any;
  // setData: React.Dispatch<React.SetStateAction<Student[]>>;
  reFetchFunc: any
}

const StudentForm: React.FC<StudentFormProps> = ({ data, reFetchFunc }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  let id = useId()

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const values: any = form.getFieldsValue()

    const newStudent: Student = {
      _id: id,
      number: data.students.length + 1,
      firstName: values.firstName,
      lastName: values.lastName,
      classNumber: values.classNumber
    };

    const updatedStudents = [...data?.students || [], newStudent];
    

    localStorage.setItem('education', JSON.stringify({ ...data, students: updatedStudents }));
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
          label="Ad"
          rules={[{ required: true, message: 'Please enter the student\'s first name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Soyad"
          rules={[{ required: true, message: 'Please enter the student\'s last name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="classNumber"
          label="Sinif"
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
