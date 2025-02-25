'use client';

import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { Card } from '@/components/ui/card';
import { HeaderControls } from '@/components/header-controls';
import { StudentList } from '@/components/student-list';
import { initialStudents, type Student } from '@/lib/studentData';

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [confettiOpacity, setConfettiOpacity] = useState(0);

  useEffect(() => {
    const savedStudents = localStorage.getItem('classDojoStudents');
    setStudents(savedStudents ? JSON.parse(savedStudents) : initialStudents);
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem('classDojoStudents', JSON.stringify(students));
    }
  }, [students]);

  useEffect(() => {
    if (confettiOpacity > 0) {
      const fadeOut = setInterval(() => {
        setConfettiOpacity(prev => Math.max(0, prev - 0.02));
      }, 50);
      return () => clearInterval(fadeOut);
    }
  }, [confettiOpacity]);

  const addStudent = (name: string) => {
    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    setStudents(prev => [...prev, { id: newId, name, points: 0 }]);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen relative ${confettiOpacity > 0 ? 'overflow-x-hidden' : ''}`}>
      {confettiOpacity > 0 && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          opacity={confettiOpacity}
          tweenDuration={3000}
        />
      )}
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full border-gray-100 shadow-sm">
          <HeaderControls
            students={students}
            setStudents={setStudents}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setConfettiOpacity={setConfettiOpacity}
            onAddStudent={addStudent}
          />
          <StudentList students={filteredStudents} setStudents={setStudents} />
        </Card>
      </div>
    </div>
  );
}