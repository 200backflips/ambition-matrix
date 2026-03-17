import EditStudents from "#/components/edit-students";
import Matrix from "#/components/matrix";
import { Button } from "#/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { UserCogIcon } from "lucide-react";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="h-screen flex flex-col px-4 py-8 bg-linear-to-r from-yellow-300 via-yellow-200 to-yellow-300">
      <header className="relative w-full flex justify-center items-center gap-2">
        <h1 className="text-teal-900 text-center">Ambitionsmatris</h1>
        <EditStudents>
          <Button variant="aluna" className="absolute right-0 top-0">
            Redigera
            <UserCogIcon className="size-6" />
          </Button>
        </EditStudents>
      </header>
      <Matrix />
    </div>
  );
}
