// src/components/StudentForm.tsx
import React, { useId, useState } from 'react';
import { Form, Input, Button, Modal, notification } from 'antd';
import { Student } from '../../../types/Student';

interface StudentFormProps {
  data: any;
  reFetchFunc: any;
}

const StudentForm: React.FC<StudentFormProps> = ({ data, reFetchFunc }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  let id = useId();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const values: any = form.getFieldsValue();

    const newStudent: Student = {
      _id: id,
      number: data.students.length + 1,
      firstName: values.firstName,
      lastName: values.lastName,
      classNumber: values.classNumber
    };

    const updatedStudents = [...data?.students || [], newStudent];

    localStorage.setItem('education', JSON.stringify({ ...data, students: updatedStudents }));
    notification.success({ message: "Yeni tələbə yaradıldı" });
    form.resetFields();
    setIsModalOpen(false);
    reFetchFunc();
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
            rules={[
              { required: true, message: 'Please enter the student\'s first name!' },
              { max: 30, message: 'Adın uzunluğu 30-dan artıq ola bilməz' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Soyad"
            rules={[
              { required: true, message: 'Please enter the student\'s last name!' },
              { max: 30, message: 'Soyadın uzunluğu 30-dan artıq ola bilməz' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="classNumber"
            label="Sinif"
            rules={[
              { required: true, message: 'Please enter the student\'s class number!' },
              { max: 2, message: 'Sinif nömrəsi uzunluğu 2-dən artıq ola bilməz' }
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentForm;
