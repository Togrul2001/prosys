import React, { useState } from 'react';
import { Button, Modal, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { Exam } from '../../types/Exam';
import ExamForm from './components/ExamForm';
import { useEducationContext } from '../../contexts/EducationContext';

const { confirm } = Modal;

const ExamList: React.FC = () => {
  const { data, setData, reFetchFunc } = useEducationContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = (examId: string) => {
    confirm({
      title: 'Bu imtahanı silmək istədiyinizə əminsiniz?',
      onOk() {
        const updatedExams = data.exams.filter(exam => exam._id !== examId);
        const updatedData = { ...data, exams: updatedExams };
        setData(updatedData);
        localStorage.setItem('education', JSON.stringify(updatedData));
        reFetchFunc();
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

  const columns: TableProps<Exam>['columns'] = [
    {
      title: 'Dərs',
      dataIndex: 'lessonCode',
      key: 'lessonCode',
      render: (_, dataObj) => {
        const lesson = data.lessons.find((lesson) => lesson.code === dataObj.lessonCode);
        return <p>{lesson ? lesson.name : 'Unknown Lesson'}</p>;
      }
    },
    {
      title: 'Tələbə',
      dataIndex: 'studentNumber',
      key: 'studentNumber',
      render: (_, dataObj) => {
        const student = data.students.find((student) => student.number === dataObj.studentNumber);
        return <p>{student ? student.firstName : 'Unknown Student'}</p>;
      }
    },
    {
      title: 'İmtahan tarixi',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <span>{new Date(text).toLocaleDateString()}</span>,
    },
    {
      title: 'Qiymət',
      dataIndex: 'point',
      key: 'point',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type='link' danger onClick={() => handleDelete(record._id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ display: "flex", alignItems: "end", gap: "10px", padding: "20px" }}>
        <h1 style={{ margin: "0" }}>İmtahanlar</h1>
        <ExamForm reFetchFunc={reFetchFunc} />
      </div>
      <Table columns={columns} dataSource={data.exams} loading={loading} />
    </>
  );
}

export default ExamList;
