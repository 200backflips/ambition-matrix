import AddStudents from "#/components/add-students";
import Matrix from "#/components/matrix";
import { Button } from "#/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { UserRoundPlusIcon } from "lucide-react";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="h-screen flex flex-col px-4 py-8 bg-linear-to-r from-teal-400 to-yellow-200">
      <header className="w-full flex justify-center items-center gap-2">
        <h1 className="text-teal-900 text-center">Ambitionsmatris</h1>
        <AddStudents>
          <Button variant="aluna" size="icon-lg">
            <UserRoundPlusIcon className="size-6" />
          </Button>
        </AddStudents>
      </header>
      <Matrix />
    </div>
  );
}
