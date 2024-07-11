// src/components/StudentForm.tsx
import React, { useState } from 'react';
import { Form, Input, Button, Modal, notification, Select, DatePicker } from 'antd';
import { Student } from '../../../types/Student';
import { Exam } from '../../../types/Exam';

interface ExamFormProps {
  data: Exam[];
  // setData: React.Dispatch<React.SetStateAction<Student[]>>;
  reFetchFunc: any
}

const ExamForm: React.FC<ExamFormProps> = ({ data, reFetchFunc }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const values: any = form.getFieldsValue()
    const educationData = JSON.parse(localStorage.getItem('education') || '{}');

    const newExam: Exam = {
        lessonCode: "1",
        studentNumber: 1,
        date: "1",
        point: 1
    };

    const updatedExams = [...educationData.exams||[],newExam];
    

    localStorage.setItem('education', JSON.stringify({ ...educationData, exams: updatedExams }));
    notification.success({message:"Yeni imtahan yaradıldı"})
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
        <Modal title="İmtahan əlavə et" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
        <Form.Item
          name="lessonCode"
          label="Dərs kodu"
          rules={[{ required: true, message: 'Please enter the lesson\'s code!' }]}
        >
          <Select />
        </Form.Item>
        <Form.Item
          name="studentNumber"
          label="Şagirdin nömrəsi"
          rules={[{ required: true, message: 'Please enter the student\'s number!' }]}
        >
          <Select />
        </Form.Item>
        <Form.Item
          name="date"
          label="İmtahan tarixi"
          rules={[{ required: true, message: 'Please enter the exam\'s date!' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="point"
          label="Qiymət"
          rules={[{ required: true, message: 'Please enter the exam\'s point!' }]}
        >
          <Input type='number' />
        </Form.Item>
        
      </Form>
        </Modal>

    </div>
  );
};

export default ExamForm;
