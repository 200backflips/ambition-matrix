import * as React from "react";
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
import { toast } from "sonner";
import { UserRoundIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import useStudents, { type Student } from "#/hooks/students";
import { Badge } from "./ui/badge";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
}

export default function AddStudents({ children }: Props) {
  const title = "Lägg till studerande";
  const { studentsPositions, addStudent } = useStudents();
  const prevStudentCount = useRef(
    Array.from(studentsPositions.values()).flat().length,
  );

  const form = useForm({
    defaultValues: {
      name: "",
      knowledge: undefined,
      ambition: undefined,
    },
  });

  function onSubmit(data: Omit<Student, "id">) {
    addStudent({
      ...data,
      id: crypto.randomUUID(),
    });
    form.reset();
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
            {Array.from(studentsPositions.values())
              .flat()
              .map((student, index) => (
                <Badge
                  key={student.id}
                  variant={
                    index < prevStudentCount.current ? "aluna" : "peaceful"
                  }
                >
                  {student.name}
                </Badge>
              ))}
          </div>
          <DialogFooter>
            <Button
              variant="aluna"
              onClick={() => {
                toast.success("Voilà!", {
                  description: "Studerande tillagda",
                  icon: <UserRoundIcon />,
                  closeButton: true,
                });
              }}
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
