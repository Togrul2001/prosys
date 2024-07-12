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
          rules={[{ required: true, message: 'Please enter the lesson\'s code!' },
            { max: 3, message: 'Kodun uzunluğu 3-dən artıq ola bilməz' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Ad"
          rules={[{ required: true, message: 'Please enter the lesson\'s name!' },
            { max: 30, message: 'Adın uzunluğu 30-dan artıq ola bilməz' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="class"
          label="Sinif"
          rules={[{ required: true, message: 'Please enter the lesson\'s class!' },
            { max: 2, message: 'Sinifin uzunluğu 2-dən artıq ola bilməz' }
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="teacherFirstName"
          label="Müəllim adı"
          rules={[{ required: true, message: 'Please enter the lesson\'s first name!' },
            { max: 20, message: 'Adın uzunluğu 20-dan artıq ola bilməz' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="teacherLastName"
          label="Müəllim soyadı"
          rules={[{ required: true, message: 'Please enter the lesson\'s last name!' },
            { max: 20, message: 'Soyadın uzunluğu 20-dan artıq ola bilməz' }
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
        </Modal>

    </div>
  );
};

export default LessonForm;
