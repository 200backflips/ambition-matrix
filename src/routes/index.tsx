import EditStudents from "#/components/edit-students";
import Matrix from "#/components/matrix";
import { Button } from "#/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { MoonIcon, SunIcon, UserCogIcon } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: App });

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

function App() {
  const [theme, setTheme] = useState(isDarkMode ? "dark" : "light");

  return (
    <div className="h-screen flex flex-col px-4 py-8 bg-linear-to-r from-yellow-300 via-yellow-200 to-yellow-300">
      <header className="relative w-full flex justify-center items-center gap-2 mb-4">
        <h1 className="text-teal-900 text-center">Ambitionsmatris</h1>
        <div className="absolute right-0 top-0 flex items-center gap-2">
          <EditStudents>
            <Button variant="aluna">
              Redigera
              <UserCogIcon className="size-6" />
            </Button>
          </EditStudents>
          <Button
            variant="secondary"
            size="icon-lg"
            onClick={() => {
              document.documentElement.classList.toggle("dark");
              setTheme(theme === "dark" ? "light" : "dark");
            }}
          >
            {theme === "dark" ? (
              <MoonIcon className="size-5" />
            ) : (
              <SunIcon className="size-5" />
            )}
          </Button>
        </div>
      </header>
      <Matrix />
    </div>
  );
}
