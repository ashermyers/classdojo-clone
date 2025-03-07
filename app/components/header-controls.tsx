import { useState, useRef, useEffect } from 'react';
import { CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { type Student } from '@/lib/studentData';

interface HeaderControlsProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setConfettiOpacity: React.Dispatch<React.SetStateAction<number>>;
  onAddStudent: (name: string) => void;
}

export function HeaderControls({
  students,
  setStudents,
  searchTerm,
  setSearchTerm,
  setConfettiOpacity,
  onAddStudent,
}: HeaderControlsProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if the focus is already inside an input or textarea.
      if (
        event.key === '/' &&
        !(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement)
      ) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const addPointToAll = () => {
    setStudents(students.map(student => ({ ...student, points: student.points + 1 })));
    setConfettiOpacity(1);
  };

  const removePointFromAll = () => {
    setStudents(
      students.map(student =>
        student.points > -10 ? { ...student, points: student.points - 1 } : student
      )
    );
  };

  const handleAddStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = (e.currentTarget.elements.namedItem('studentName') as HTMLInputElement).value;
    if (name.trim()) {
      onAddStudent(name.trim());
      e.currentTarget.reset();
      setIsAddDialogOpen(false);
    }
  };

  return (
    <CardHeader className="pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <img src="/logo.webp" alt="Class Dojo Logo" className="w-auto h-12" />
        {/* Wrapped the Input in a relative container */}
        <div className="relative w-full sm:w-64">
          <Input
            ref={searchInputRef}
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-full pr-10 bg-white" // increased padding to account for the indicator
          />
          {/* Keybinding indicator */}
          <span className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-400 pointer-events-none">
            /
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={removePointFromAll}
                  variant="outline"
                  size="icon"
                  className="w-9 h-9 rounded-full hover:bg-red-50"
                >
                  <span className="text-base">-</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Remove point from all students</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={addPointToAll}
                  size="icon"
                  className="w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-600"
                >
                  <span className="text-base">+</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add point to all students</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="rounded-full px-4 py-2" onClick={() => setIsAddDialogOpen(true)}>
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddStudent} className="space-y-4">
              <Input name="studentName" placeholder="Enter student name" required />
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="rounded-full px-4 py-2">
                  Add
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="rounded-full px-4 py-2">
              About
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>About ClassDojo Clone</DialogTitle>
              <div className="space-y-2">
                This site is a clone of the ClassDojo classroom management tool to track student behavior and engagement. Features include:
                <ul className="list-disc pl-5">
                  <li>Real-time point tracking</li>
                  <li>Searchable student list</li>
                  <li>Responsive and accessible design</li>
                </ul>
                <p>
                  Built by <span className="font-semibold">Asher Myers</span> with React (React Router), TailwindCSS, Shadcn/ui, and Framer Motion.
                </p>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="destructive"
                className="rounded-full px-4 py-2"
                onClick={() =>
                  setStudents(students.map(student => ({ ...student, points: 0 })))
                }
              >
                Reset
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset all points to zero</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </CardHeader>
  );
}
