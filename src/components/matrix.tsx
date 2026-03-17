import { motion } from "motion/react";
import useStudents from "#/hooks/students";
import { Badge } from "./ui/badge";
import { cn } from "#/lib/utils";

interface StackedProps {
  index: number;
  opacity: number;
  x: number;
  y: number;
}

const stacked = ({ index, opacity, x, y }: StackedProps) => ({
  opacity,
  ...(index > 0 && {
    x,
    y,
  }),
});

const animationVariants = {
  stacked: (index: number) =>
    stacked({ index, opacity: 1, x: index * 2, y: index * 4 }),
  stackedInitial: (index: number) =>
    stacked({ index, opacity: 0, x: index * 2 + 10, y: index * 4 + 10 }),
  spread: (index: number) => ({
    x: (index % 2) * 60 - 30,
    y: Math.floor(index / 2) * 24,
  }),
};

export default function Matrix() {
  const { studentsPositions } = useStudents();

  return (
    <div className="flex flex-col gap-2">
      <h4 className="flex-1 text-teal-900 text-center">
        Jagar kunskap och växer ständigt
      </h4>
      <div className="flex items-center gap-2">
        <h4 className="flex-1 text-teal-900 text-right">Vad då "variabel"??</h4>
        <main className="flex items-center justify-center hsp">
          <section className="relative grid grid-cols-10 grid-rows-10 gap-4">
            <div className="absolute w-0.25 h-full border-l border-dashed border-black/30 left-[50%]" />
            <div className="absolute h-0.25 w-full border-b border-dashed border-black/30 bottom-[50%]" />
            {Array.from(studentsPositions).map(([key, students]) => {
              const [ambition, knowledge] = key.split("-").map(Number);

              return (
                <motion.div
                  key={key}
                  className="relative max-w-16 flex items-center aspect-square"
                  style={{
                    gridRowStart: -(ambition + 1),
                    gridColumnStart: knowledge,
                  }}
                  initial="stackedInitial"
                  animate="stacked"
                  whileHover={students.length > 1 ? "spread" : "stacked"}
                >
                  {students
                    .sort((a, b) => a.name.length - b.name.length)
                    .map((student, index) => (
                      <motion.span
                        key={student.id}
                        custom={index}
                        variants={animationVariants}
                        transition={{ type: "tween", duration: 0.2 }}
                        className={cn("mx-auto", {
                          absolute: index > 0,
                        })}
                      >
                        <Badge variant="aluna">{student.name}</Badge>
                      </motion.span>
                    ))}
                </motion.div>
              );
            })}
          </section>
        </main>
        <h4 className="flex-1 text-teal-900">Imponerande kunskapsnivå</h4>
      </div>
      <h4 className="flex-1 text-teal-900 text-center">
        Kollar hellre på reels
      </h4>
    </div>
  );
}
