import { create } from "zustand";

export interface Student {
  id: string;
  name: string;
  ambition?: number;
  knowledge?: number;
}

type StudentPosition = Map<string, Student[]>;

interface StudentStore {
  studentsPositions: StudentPosition;
  addStudent: (student: Student) => void;
  //   removeStudent: (id: string) => void;
}

const alunos: StudentPosition = new Map([
  [
    "10-10",
    [
      {
        id: crypto.randomUUID(),
        name: "Windin",
      },
      {
        id: crypto.randomUUID(),
        name: "Bongbong Marcos",
      },
      {
        id: crypto.randomUUID(),
        name: "Curious Boy",
      },
    ],
  ],
  [
    "5-10",
    [
      {
        id: crypto.randomUUID(),
        name: "Daijin",
      },
    ],
  ],
  [
    "5-4",
    [
      {
        id: crypto.randomUUID(),
        name: "Dindin",
      },
    ],
  ],
]);

const useStudents = create<StudentStore>((set) => ({
  studentsPositions: alunos,
  addStudent: (student) =>
    set((state) => {
      const key = `${student.knowledge ?? 0}-${student.ambition ?? 0}`;
      const position = state.studentsPositions.get(key);

      if (position) {
        position.push(student);
      } else {
        state.studentsPositions.set(key, [student]);
      }
      return {
        studentsPositions: state.studentsPositions,
      };
    }),
}));

export default useStudents;
