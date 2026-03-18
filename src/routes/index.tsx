import EditStudents from "#/components/edit-students";
import Matrix from "#/components/matrix";
import { Button, buttonVariants } from "#/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MoonIcon, SunIcon, UserCogIcon } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: App });

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

function App() {
  const [theme, setTheme] = useState(isDarkMode ? "dark" : "light");
  const search = Route.useSearch();
  const edit = "edit" in search;
  const navigate = Route.useNavigate();

  return (
    <>
      <EditStudents
        open={edit}
        onOpenChange={() => {
          navigate({ to: "/" });
        }}
      />
      <div className="h-screen flex flex-col px-4 py-8 bg-secondary">
        <header className="w-full flex justify-end items-center gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Link
              className={buttonVariants({ variant: "aluna" })}
              to="/"
              search={{ edit: true }}
            >
              Redigera
              <UserCogIcon className="size-6" />
            </Link>
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
    </>
  );
}
