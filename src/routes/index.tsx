import DarkMatrix from "#/components/dark-matrix";
import EditStudents from "#/components/edit-students";
import { Button } from "#/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { MoonIcon, SunIcon, UserCogIcon } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: App });

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

function App() {
  const [theme, setTheme] = useState(isDarkMode ? "dark" : "light");

  return (
    <div className="h-screen flex flex-col px-4 py-8 bg-secondary">
      <header className="w-full flex justify-end items-center gap-2 mb-4">
        <div className="flex items-center gap-2">
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
      <DarkMatrix />
    </div>
  );
}
