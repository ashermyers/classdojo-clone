import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { type Student } from '@/lib/studentData';

interface StudentCardProps {
  student: Student;
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

export function StudentCard({ student, setStudents }: StudentCardProps) {
  const [renameId, setRenameId] = useState<number | null>(null);
  const [newName, setNewName] = useState<string>('');
  const [setScoreId, setSetScoreId] = useState<number | null>(null);
  const [newScore, setNewScore] = useState<string>('');

  const addPoint = () => {
    setStudents(prev =>
      prev.map(s =>
        s.id === student.id ? { ...s, points: s.points + 1 } : s
      )
    );
  };

  const removePoint = () => {
    setStudents(prev =>
      prev.map(s =>
        s.id === student.id && s.points > -10 ? { ...s, points: s.points - 1 } : s
      )
    );
  };

  const setStudentScore = () => {
    const score = parseInt(newScore) || 0;
    setStudents(prev =>
      prev.map(s =>
        s.id === student.id ? { ...s, points: Math.max(-10, Math.min(100, score)) } : s
      )
    );
    setSetScoreId(null);
    setNewScore('');
  };

  const deleteStudent = () => {
    setStudents(prev => prev.filter(s => s.id !== student.id));
  };

  const renameStudent = () => {
    setStudents(prev =>
      prev.map(s =>
        s.id === student.id ? { ...s, name: newName.trim() || s.name } : s
      )
    );
    setRenameId(null);
    setNewName('');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const getColorFromName = (name: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-yellow-500',
      'bg-indigo-500', 'bg-pink-500', 'bg-teal-500', 'bg-orange-500', 'bg-cyan-500',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const getPointColor = (points: number) => {
    if (points > 5) return '#10B981';
    if (points > 0) return '#34D399';
    if (points < -5) return '#EF4444';
    if (points < 0) return '#F87171';
    return '#9CA3AF';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="p-2"
    >
      <Card className="group hover:shadow-md transition-shadow duration-200 bg-white relative hover:scale-105 transition-transform duration-200">
        <CardContent className="pt-6 flex flex-col items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <DotsVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={deleteStudent}>Delete</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setRenameId(student.id);
                  setNewName(student.name);
                }}
              >
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSetScoreId(student.id);
                  setNewScore(student.points.toString());
                }}
              >
                Set Score
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={`https://api.dicebear.com/9.x/bottts/svg?seed=${student.name}`}
              alt={student.name}
            />
            <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
          </Avatar>
          <h3 className="text-sm font-medium text-gray-700 text-center line-clamp-1 mt-2 mb-3">
            {student.name}
          </h3>
          <motion.div
            className="text-2xl font-bold mb-4"
            animate={{
              scale: student.points !== 0 ? [1, 1.1, 1] : 1,
              color: getPointColor(student.points),
            }}
            transition={{ duration: 0.25 }}
          >
            {student.points}
          </motion.div>
          <div className="flex gap-2">
            <Button
              onClick={removePoint}
              variant="outline"
              size="icon"
              className="w-9 h-9 rounded-full hover:bg-red-50 disabled:opacity-50"
              disabled={student.points <= -10}
            >
              <span className="text-base">-</span>
            </Button>
            <Button
              onClick={addPoint}
              size="icon"
              className="w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-600"
            >
              <span className="text-base">+</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      {renameId === student.id && (
        <Dialog open={true} onOpenChange={() => setRenameId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rename Student</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter new name"
                onKeyPress={(e) => e.key === 'Enter' && renameStudent()}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setRenameId(null)}>
                  Cancel
                </Button>
                <Button onClick={renameStudent}>Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {setScoreId === student.id && (
        <Dialog open={true} onOpenChange={() => setSetScoreId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Student Score</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                type="number"
                value={newScore}
                onChange={(e) => setNewScore(e.target.value)}
                placeholder="Enter new score (-10 to 100)"
                onKeyPress={(e) => e.key === 'Enter' && setStudentScore()}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSetScoreId(null)}>
                  Cancel
                </Button>
                <Button onClick={setStudentScore}>Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </motion.div>
  );
}
