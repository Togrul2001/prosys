import React, { useEffect, useState } from 'react';
import { Button, Modal, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { Student } from '../../types/Student';
import StudentForm from './components/StudentForm';
import jsonData from "../../public/data.json";

const columns: TableProps<Student>['columns'] = [
  {
    title: 'Number',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Class Number',
    dataIndex: 'classNumber',
    key: 'classNumber',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        {/* <a>Invite {record.firstName}</a> */}
        <Button type='link' danger>Delete</Button>
      </Space>
    ),
  },
];

const StudentList: React.FC = () => {
  const [data, setData] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [reFetch, setReFetch] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true);
    const educationData = JSON.parse(localStorage.getItem('education') || '{}');
    const localDataStudents: Student[] = educationData.students || [];
    const jsonDataStudents: Student[] = jsonData.students || [];

    const combinedData = [...localDataStudents, ...jsonDataStudents];
    setData(combinedData);
    setLoading(false);
  }, [reFetch]);

  function reFetchFunc(){
    setReFetch(!reFetch)
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "end", gap: "10px", padding: "20px" }}>
        <h1 style={{ margin: "0" }}>Tələbələr</h1>
        <StudentForm data={data} reFetchFunc={reFetchFunc}/>
      </div>
      <Table columns={columns} dataSource={data} loading={loading} />
    </>
  );
}

export default StudentList;
