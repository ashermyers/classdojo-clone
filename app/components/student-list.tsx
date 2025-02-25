import { AnimatePresence } from 'framer-motion';
import { CardContent } from '@/components/ui/card';
import { StudentCard } from '@/components/student-card';
import { type Student } from '@/lib/studentData';

interface StudentListProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

export function StudentList({ students, setStudents }: StudentListProps) {
  return (
    <CardContent>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <AnimatePresence>
          {students.map((student) => (
            <StudentCard key={student.id} student={student} setStudents={setStudents} />
          ))}
        </AnimatePresence>
      </div>
      {students.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No students found.</p>
      )}
    </CardContent>
  );
}