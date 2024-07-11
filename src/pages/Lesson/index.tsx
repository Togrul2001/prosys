import React, { useEffect, useState } from 'react';
import { Button, Modal, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { Lesson } from '../../types/Lesson';
import jsonData from "../../public/data.json";
import LessonForm from './components/LessonForm';

const columns: TableProps<Lesson>['columns'] = [
    {
      title: 'Kod',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Ad',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Dərs',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: 'Müəllim adı',
      dataIndex: 'teacherFirstName',
      key: 'teacherFirstName',
    },
    {
      title: 'Müəllim soyadı',
      dataIndex: 'teacherLastName',
      key: 'teacherLastName',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a>View {record.name}</a> */}
          <a>Delete</a>
        </Space>
      ),
    },
  ];


const LessonList: React.FC = () => {
  const [data, setData] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [reFetch, setReFetch] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true);
    const educationData = JSON.parse(localStorage.getItem('education') || '{}');
    const localDataLessons: Lesson[] = educationData.lessons || [];
    const jsonDataLessons: Lesson[] = jsonData.lessons || [];

    const combinedData = [...localDataLessons, ...jsonDataLessons];
    setData(combinedData);
    setLoading(false);
  }, [reFetch]);

  function reFetchFunc(){
    setReFetch(!reFetch)
  }

    return <>
      <div style={{display:"flex", alignItems:"end", gap:"10px", padding:"20px"}}>
        <h1 style={{margin:"0"}}>Dərslər</h1>
        <LessonForm data={data} reFetchFunc={reFetchFunc}/>
      </div>
      <Table columns={columns} dataSource={data} />
    </>
}

export default LessonList;