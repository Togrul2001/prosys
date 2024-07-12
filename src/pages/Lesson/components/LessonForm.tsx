// src/components/StudentForm.tsx
import React, { useId, useState } from 'react';
import { Form, Input, Button, Modal, notification } from 'antd';
import { Student } from '../../../types/Student';
import { Lesson } from '../../../types/Lesson';

interface LessonFormProps {
  data: any;
  // setData: React.Dispatch<React.SetStateAction<Student[]>>;
  reFetchFunc: any
}

const LessonForm: React.FC<LessonFormProps> = ({ data, reFetchFunc }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  let id = useId()

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const values: any = form.getFieldsValue()

    const newLesson: Lesson = {
      _id: id,
      code: values.code,
      name: values.name,
      class: values.class,
      teacherFirstName: values.teacherFirstName,
      teacherLastName: values.teacherLastName
    };

    const updatedLessons = [...data?.lessons || [], newLesson];
    

    localStorage.setItem('education', JSON.stringify({ ...data, lessons: updatedLessons }));
    notification.success({message:"Yeni dərs yaradıldı"})
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
        <Modal title="Dərs əlavə et" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
        <Form.Item
          name="code"
          label="Kod"
          rules={[{ required: true, message: 'Please enter the lesson\'s code!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Ad"
          rules={[{ required: true, message: 'Please enter the lesson\'s name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="class"
          label="Sinif"
          rules={[{ required: true, message: 'Please enter the lesson\'s class!' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="teacherFirstName"
          label="Müəllim adı"
          rules={[{ required: true, message: 'Please enter the lesson\'s first name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="teacherLastName"
          label="Müəllim soyadı"
          rules={[{ required: true, message: 'Please enter the lesson\'s last name!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
        </Modal>

    </div>
  );
};

export default LessonForm;
