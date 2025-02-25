export type Student = {
    id: number;
    name: string;
    points: number;
};

export const initialStudents: Student[] = [
    { id: 1, name: 'Emma Watson', points: 0 },
    { id: 2, name: 'Liam Johnson', points: 0 },
    { id: 3, name: 'Olivia Smith', points: 0 },
    { id: 4, name: 'Noah Brown', points: 0 },
    { id: 5, name: 'Ava Davis', points: 0 },
    { id: 6, name: 'William Miller', points: 0 },
    { id: 7, name: 'Sophia Wilson', points: 0 },
    { id: 8, name: 'James Taylor', points: 0 },
    { id: 9, name: 'Isabella Anderson', points: 0 },
    { id: 10, name: 'Lucas Thomas', points: 0 },
    { id: 11, name: 'Mia Martinez', points: 0 },
    { id: 12, name: 'Mason Garcia', points: 0 },
    { id: 13, name: 'Charlotte Rodriguez', points: 0 },
    { id: 14, name: 'Elijah Lee', points: 0 },
    { id: 15, name: 'Amelia White', points: 0 },
    { id: 16, name: 'Harper Clark', points: 0 },
    { id: 17, name: 'Ethan Lewis', points: 0 },
    { id: 18, name: 'Evelyn Walker', points: 0 },
    { id: 19, name: 'Alexander Hall', points: 0 },
    { id: 20, name: 'Abigail Allen', points: 0 },
].sort((a, b) => a.name.localeCompare(b.name));

