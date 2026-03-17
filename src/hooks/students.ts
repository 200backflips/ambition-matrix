import { create } from "zustand";

export interface Student {
  id: string;
  name: string;
  ambition: number;
  knowledge: number;
  createdAt: number;
}

type StudentPositions = Map<string, Student[]>;

interface StudentStore {
  studentsPositions: StudentPositions;
  addStudent: (student: Student) => void;
  removeStudent: ({ score, id }: { score: string; id: string }) => void;
}

const storedPositions: StudentPositions = new Map(
  JSON.parse(localStorage.getItem("studentsPositions") || "[]"),
);

const useStudents = create<StudentStore>((set) => ({
  studentsPositions: storedPositions,
  addStudent: (student) =>
    set(({ studentsPositions }) => {
      const key = `${student.ambition ?? 0}-${student.knowledge ?? 0}`;
      const position = studentsPositions.get(key);

      if (position) {
        position.push(student);
      } else {
        studentsPositions.set(key, [student]);
      }
      localStorage.setItem(
        "studentsPositions",
        JSON.stringify(Array.from(studentsPositions.entries())),
      );
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
