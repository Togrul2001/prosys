import React, { useEffect, useState } from 'react';
import { Button, Modal, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { Student } from '../../types/Student';
import StudentForm from './components/StudentForm';
import { useEducationContext } from '../../contexts/EducationContext';

const { confirm } = Modal;

const StudentList: React.FC = () => {

  const { data, setData, reFetchFunc } = useEducationContext();
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleDelete = (_id: string) => {
    confirm({
      title: 'Bu tələbəni silmək istədiyinizə əminsiniz?',
      onOk() {
        const updatedStudents = data.students.filter(student => student._id !== _id);
        const updatedData = { ...data, students: updatedStudents };
        setData(updatedData);
        localStorage.setItem('education', JSON.stringify(updatedData));
        reFetchFunc();
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

  const columns: TableProps<Student>['columns'] = [
    {
      title: 'Nömrə',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Ad',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Soyad',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Sinif nömrəsi',
      dataIndex: 'classNumber',
      key: 'classNumber',
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
        <h1 style={{ margin: "0" }}>Tələbələr</h1>
        <StudentForm data={data} reFetchFunc={reFetchFunc} />
      </div>
      <Table columns={columns} dataSource={data.students} loading={loading} />
    </>
  );
}

export default StudentList;
