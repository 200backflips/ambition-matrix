import { create } from "zustand";

export interface Student {
  id: string;
  name: string;
  ambition: number;
  knowledge: number;
}

type StudentPosition = Map<string, Student[]>;

interface StudentStore {
  studentsPositions: StudentPosition;
  addStudent: (student: Student) => void;
  removeStudent: ({ score, id }: { score: string; id: string }) => void;
}

const alunos: StudentPosition = new Map([
  [
    "10-10",
    [
      {
        id: crypto.randomUUID(),
        name: "Bongbong Marcos",
        ambition: 10,
        knowledge: 10,
      },
      {
        id: crypto.randomUUID(),
        name: "Windin",
        ambition: 10,
        knowledge: 10,
      },
      {
        id: crypto.randomUUID(),
        name: "Curious Boy",
        ambition: 10,
        knowledge: 10,
      },
    ],
  ],
  [
    "5-10",
    [
      {
        id: crypto.randomUUID(),
        name: "Daijin",
        ambition: 5,
        knowledge: 10,
      },
    ],
  ],
  [
    "5-4",
    [
      {
        id: crypto.randomUUID(),
        name: "Dindin",
        ambition: 5,
        knowledge: 4,
      },
    ],
  ],
]);

const useStudents = create<StudentStore>((set) => ({
  studentsPositions: alunos,
  addStudent: (student) =>
    set(({ studentsPositions }) => {
      const key = `${student.ambition ?? 0}-${student.knowledge ?? 0}`;
      const position = studentsPositions.get(key);

      if (position) {
        position.push(student);
      } else {
        studentsPositions.set(key, [student]);
        console.log({ studentsPositions });
      }
      return {
        studentsPositions,
      };
    }),
  removeStudent: ({ score, id }) =>
    set(({ studentsPositions }) => {
      const position = studentsPositions.get(score);
      if (!position) {
        return { studentsPositions };
      }

      studentsPositions.set(
        score,
        position?.filter((student) => student.id !== id),
      );
      return {
        studentsPositions,
      };
    }),
}));

export default useStudents;
