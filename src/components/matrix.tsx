import { motion } from "motion/react";
import useStudents from "#/hooks/students";
import { cn } from "#/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    stacked({ index, opacity: 1, x: index * 4, y: index * 4 }),
  stackedInitial: (index: number) =>
    stacked({ index, opacity: 0, x: index * 3 + 10, y: index * 3 + 10 }),
  spread: (index: number) => ({
    x: (index % 2) * 35 - 30,
    y: Math.floor(index / 2) * 35,
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
          <section className="relative grid grid-cols-[repeat(10,4rem)] grid-rows-[repeat(10,4rem)] gap-2">
            <div className="absolute w-0.25 h-full border-l border-dashed border-teal-900/50 left-[50%]" />
            <div className="absolute w-full h-0.25 border-b border-dashed border-teal-900/50 bottom-[50%]" />
            {Array.from(studentsPositions).map(([key, students]) => {
              const [ambition, knowledge] = key.split("-").map(Number);

              return (
                <Tooltip key={key}>
                  <TooltipTrigger asChild>
                    <motion.div
                      className="relative flex items-center justify-center"
                      style={{
                        gridRowStart: -(ambition + 1),
                        gridColumnStart: knowledge,
                      }}
                      initial="stackedInitial"
                      animate="stacked"
                      whileHover={students.length > 1 ? "spread" : "stacked"}
                    >
                      {students.map((student, index) => (
                        <motion.div
                          key={student.id}
                          custom={index}
                          variants={animationVariants}
                          transition={{ type: "tween", duration: 0.2 }}
                          className={cn(
                            "size-8 flex items-center justify-center bg-teal-600 border border-secondary text-white rounded-full",
                            {
                              absolute: index > 0,
                            },
                          )}
                        >
                          {student.name[0]?.toUpperCase()}
                          {/* <Badge variant="aluna">{student.name}</Badge> */}
                        </motion.div>
                      ))}
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {students
                        .map(
                          (student, index) =>
                            student.name +
                            (index < students.length - 1 ? ", " : ""),
                        )
                        .join("")}
                    </p>
                  </TooltipContent>
                </Tooltip>
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
