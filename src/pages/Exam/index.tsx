import React, { useEffect, useState } from 'react';
import { Button, Modal, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { Exam } from '../../types/Exam';
import jsonData from "../../public/data.json";
import ExamForm from './components/ExamForm';

const columns: TableProps<Exam>['columns'] = [
    {
      title: 'Lesson Code',
      dataIndex: 'lessonCode',
      key: 'lessonCode',
    },
    {
      title: 'Student Number',
      dataIndex: 'studentNumber',
      key: 'studentNumber',
    },
    {
      title: 'Exam Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <span>{new Date(text).toLocaleDateString()}</span>,
    },
    {
      title: 'Point',
      dataIndex: 'point',
      key: 'point',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>View Details</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];


const ExamList: React.FC = () => {
  const [data, setData] = useState<Exam[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [reFetch, setReFetch] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true);
    const educationData = JSON.parse(localStorage.getItem('education') || '{}');
    const localDataExams: Exam[] = educationData.exams || [];
    const jsonDataExams: Exam[] = jsonData.exams || [];

    const combinedData = [...localDataExams, ...jsonDataExams];
    setData(combinedData);
    setLoading(false);
  }, [reFetch]);

  function reFetchFunc(){
    setReFetch(!reFetch)
  }
    return <>
      <div style={{display:"flex", alignItems:"end", gap:"10px", padding:"20px"}}>
        <h1 style={{margin:"0"}}>İmtahanlar</h1>
        <ExamForm data={data} reFetchFunc={reFetchFunc}/>
      </div>
      <Table columns={columns} dataSource={data} />
    </>
}

export default ExamList;