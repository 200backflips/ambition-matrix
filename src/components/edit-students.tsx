import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import useStudents, { type Student } from "#/hooks/students";
import { Badge } from "./ui/badge";
import { useRef, useState } from "react";
import { motion } from "motion/react";

interface Props {
  children: React.ReactNode;
}

export default function EditStudents({ children }: Props) {
  const title = "Lägg till studerande";
  const { studentsPositions, addStudent, removeStudent } = useStudents();
  const [prevStudents, setPrevStudents] = useState(
    Array.from(studentsPositions.values()).flat(),
  );
  const prevStudentCount = useRef(prevStudents.length ?? 0);
  const [newlyAddedStudents, setNewlyAddedStudents] = useState<Student[]>([]);

  const getDefaultValues = () => ({
    id: crypto.randomUUID(),
    name: "",
    knowledge: 1,
    ambition: 1,
  });

  const form = useForm({
    defaultValues: getDefaultValues(),
  });

  function onSubmit(data: Student) {
    const newStudent = {
      id: data.id,
      name: data.name,
      ambition: Number(data.ambition),
      knowledge: Number(data.knowledge),
    };
    addStudent(newStudent);
    setNewlyAddedStudents([...newlyAddedStudents, newStudent]);
    form.reset(getDefaultValues);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogDescription className="sr-only">{title}</DialogDescription>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form
          id="form-student"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-student-name">Namn</FieldLabel>
                  <Input
                    {...field}
                    id="form-student-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ange namn"
                    autoComplete="off"
                    value={field.value || ""}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="knowledge"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-student-knowledge">
                    Kunskap
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-student-knowledge"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ange kunskapsnivå (1-10)"
                    autoComplete="off"
                    value={field.value || undefined}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="ambition"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-student-ambition">
                    Ambition
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-student-ambition"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ange ambitionsnivå (1-10)"
                    autoComplete="off"
                    value={field.value || undefined}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Separator />
          <h4>Tillagda studerande</h4>
          <div className="flex flex-wrap gap-2">
            {[...prevStudents, ...newlyAddedStudents].map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <button
                  type="button"
                  className="relative group"
                  onClick={() => {
                    setPrevStudents(
                      prevStudents.filter((s) => s.id !== student.id),
                    );
                    setNewlyAddedStudents(
                      newlyAddedStudents.filter((s) => s.id !== student.id),
                    );
                    removeStudent({
                      score: `${student.knowledge}-${student.ambition}`,
                      id: student.id,
                    });
                  }}
                >
                  <span className="absolute right-0 bottom-3 bg-destructive rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-all">
                    <TrashIcon className="size-3 text-white" />
                  </span>
                  <Badge
                    variant={
                      index < prevStudentCount.current ? "aluna" : "peaceful"
                    }
                    className="group-hover:bg-destructive"
                  >
                    {student.name}
                  </Badge>
                </button>
              </motion.div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="aluna">Lägg till studerande</Button>
            <DialogTrigger asChild>
              <Button type="button" variant="outline">
                Stäng
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
