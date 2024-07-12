import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Exam } from '../types/Exam';
import { Student } from '../types/Student';
import { Lesson } from '../types/Lesson';


export interface EducationData {
    exams: Exam[];
    students: Student[];
    lessons: Lesson[];
}


interface EducationContextProps {
  data: EducationData;
  setData: React.Dispatch<React.SetStateAction<EducationData>>;
  reFetchFunc: () => void;
}

const EducationContext = createContext<EducationContextProps | undefined>(undefined);

export const useEducationContext = () => {
  const context = useContext(EducationContext);
  if (!context) {
    throw new Error('EducationProvider Error');
  }
  return context;
};

interface EducationProviderProps {
  children: ReactNode;
}

export const EducationProvider: React.FC<EducationProviderProps> = ({ children }) => {
  const [data, setData] = useState<EducationData>({ exams: [], students: [], lessons: [] });
  const [reFetch, setReFetch] = useState<boolean>(false);

  const reFetchFunc = () => {
    setReFetch(!reFetch);
  };

  useEffect(() => {
    const educationData = JSON.parse(localStorage.getItem('education') || '{}');
    setData(educationData);
  }, [reFetch]);

  return (
    <EducationContext.Provider value={{ data, setData, reFetchFunc }}>
      {children}
    </EducationContext.Provider>
  );
};
