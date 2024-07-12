// src/components/StudentForm.tsx
import React, { useEffect, useId, useState } from 'react';
import { Form, Input, Button, Modal, notification, Select, DatePicker } from 'antd';
import { Student } from '../../../types/Student';
import { Exam } from '../../../types/Exam';
import { useEducationContext } from '../../../contexts/EducationContext';


interface ExamFormProps {
  // setData: React.Dispatch<React.SetStateAction<Student[]>>;
  reFetchFunc: any
}

const ExamForm: React.FC<ExamFormProps> = ({ reFetchFunc }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, setData } = useEducationContext();
  let id = useId()

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const values: any = form.getFieldsValue()

    const newExam: Exam = {
        _id: id,
        lessonCode: values.lessonCode,
        studentNumber: values.studentNumber,
        date: values.date,
        point: values.point
    };

    const updatedExams = [...data?.exams || [], newExam];
    

    localStorage.setItem('education', JSON.stringify({ ...data, exams: updatedExams }));
    notification.success({message:"Yeni imtahan yaradıldı"})
    form.resetFields();
    setIsModalOpen(false);
    reFetchFunc()
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(()=>{
    const educationData = JSON.parse(localStorage.getItem('education') || '{}');
    setData(educationData)
    
  },[])

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
          <Select options={data?.lessons?.map((lesson: any)=>{
            return {label:lesson.name, value:lesson.code}
          })}/>
        </Form.Item>
        <Form.Item
          name="studentNumber"
          label="Şagirdin nömrəsi"
          rules={[{ required: true, message: 'Please enter the student\'s number!' }]}
        >
          <Select options={data?.students?.map((student: any)=>{
            return {label:`${student.firstName} ${student.lastName}`, value:student.number}
          })}/>
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
          rules={[{ required: true, message: 'Please enter the exam\'s point!' },
            { max: 30, message: 'Qiymət uzunluğu 1-dən artıq ola bilməz' }
          ]}
        >
          <Input type='number' />
        </Form.Item>
        
      </Form>
        </Modal>

    </div>
  );
};

export default ExamForm;
