import { motion } from "motion/react";
import useStudents from "#/hooks/students";
import { cn } from "#/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent } from "./ui/card";
import { Link } from "@tanstack/react-router";

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

const markerClasses = "absolute -m-2 px-1 bg-secondary text-primary";

export default function DarkMatrix() {
  const { studentsPositions } = useStudents();
  const positionArray = Array.from(studentsPositions);

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex items-center gap-4">
        <Card>
          <CardContent>
            {positionArray.map(([key, students], index) => (
              <div
                key={index}
                className={cn("text-teal-600", {
                  "mb-3": index < positionArray.length - 1,
                })}
              >
                <h4 className="font-semibold">{key}</h4>
                {students.map((student) => (
                  <p key={crypto.randomUUID()} className="ml-2">
                    {student.name}
                  </p>
                ))}
              </div>
            ))}
            {positionArray.length === 0 && (
              <Link
                className="text-teal-600 cursor-pointer"
                to="/"
                search={{ edit: true }}
              >
                <h4>Tomt var det här</h4>
                <p className="text-xs">Tryck för att lägga till studerande</p>
              </Link>
            )}
          </CardContent>
        </Card>
        <main className="flex items-center justify-center hsp">
          <section className="relative grid grid-cols-[repeat(10,3.6rem)] grid-rows-[repeat(10,3.6rem)] gap-2 border-l border-b border-gray-400">
            <Tooltip>
              <TooltipTrigger asChild>
                <h4 className={cn(markerClasses, "top-0 left-0")}>10</h4>
              </TooltipTrigger>
              <TooltipContent>
                <p>Jagar kunskap och växer ständigt</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <h4 className={cn(markerClasses, "bottom-0 left-0")}>1</h4>
              </TooltipTrigger>
              <TooltipContent>
                <p>Vad då "variabel"?? / Kollar hellre på reels</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <h4 className={cn(markerClasses, "bottom-0 right-0")}>10</h4>
              </TooltipTrigger>
              <TooltipContent>
                <p>Imponerande kunskapsnivå</p>
              </TooltipContent>
            </Tooltip>
            {positionArray.map(([key, students]) => {
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
                        </motion.div>
                      ))}
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {key}{" "}
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
            <div className="absolute -bottom-26 left-70 w-0.25 h-[120%] bg-gray-400/30 rotate-45" />
            <div className="absolute bottom-5 right-5">
              <h2 className="font-semibold text-teal-600">Ambitionsmatrisen</h2>
              <p className="text-teal-600/70 text-xs">
                © 2026 Gus Davidson Group
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
