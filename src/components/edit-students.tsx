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
import { motion } from "motion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Namnet måste vara minst 1 tecken långt."),
  ambition: z.coerce
    .number()
    .min(1)
    .max(10, "Ambitionsnivån måste vara mellan 1 och 10."),
  knowledge: z.coerce
    .number()
    .min(1)
    .max(10, "Kunskapsnivån måste vara mellan 1 och 10."),
  createdAt: z.coerce.number(),
});

const timestampNow = Date.now();

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditStudents({ open, onOpenChange }: Props) {
  const title = "Lägg till studerande";
  const { studentsPositions, addStudent, removeStudent } = useStudents();

  const getDefaultValues = () => ({
    id: crypto.randomUUID(),
    name: "",
    knowledge: "" as unknown as number,
    ambition: "" as unknown as number,
    createdAt: "" as unknown as number,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(),
  });

  function onSubmit(data: Student) {
    addStudent({
      id: data.id,
      name: data.name,
      ambition: Number(data.ambition),
      knowledge: Number(data.knowledge),
      createdAt: Date.now(),
    });
    form.reset(getDefaultValues);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                    value={field.value as unknown as number}
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
                    value={field.value as unknown as number}
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
            {Array.from(studentsPositions.values())
              .flat()
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((student) => (
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
                      removeStudent({
                        score: `${student.ambition}-${student.knowledge}`,
                        id: student.id,
                      });
                    }}
                  >
                    <span className="absolute right-0 bottom-3 bg-destructive rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-all">
                      <TrashIcon className="size-3 text-white" />
                    </span>
                    <Badge
                      variant={
                        student.createdAt > timestampNow - 1000
                          ? "peaceful"
                          : "aluna"
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
            <Button
              variant="aluna"
              form="form-student"
              disabled={form.formState.isSubmitting}
            >
              Lägg till studerande
            </Button>
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
