import React, { useEffect, useState } from 'react';
import { Button, Modal, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { Lesson } from '../../types/Lesson';
import LessonForm from './components/LessonForm';
import { useEducationContext } from '../../contexts/EducationContext';

const { confirm } = Modal;

const LessonList: React.FC = () => {
  const { data, setData, reFetchFunc } = useEducationContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = (_id: string) => {
    confirm({
      title: 'Bu dərsi silmək istədiyinizə əminsiniz?',
      onOk() {
        const updatedLessons = data.lessons.filter(lesson => lesson._id !== _id);
        const updatedData = { ...data, lessons: updatedLessons };
        setData(updatedData);
        localStorage.setItem('education', JSON.stringify(updatedData));
        reFetchFunc();
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

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
          <Button type='link' danger onClick={() => handleDelete(record._id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ display: "flex", alignItems: "end", gap: "10px", padding: "20px" }}>
        <h1 style={{ margin: "0" }}>Dərslər</h1>
        <LessonForm data={data} reFetchFunc={reFetchFunc} />
      </div>
      <Table columns={columns} dataSource={data.lessons} loading={loading} />
    </>
  );
}

export default LessonList;
