import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TooltipProvider } from "@/components/ui/tooltip";

import "../styles.css";
import { Toaster } from "sonner";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function NotFoundComponent() {
  return (
    <div>
      404 - Sidan hittades inte. Var god kontrollera url:en och försök igen.
    </div>
  );
}

function RootComponent() {
  return (
    <TooltipProvider>
      <Toaster position="bottom-center" />
      <Outlet />
    </TooltipProvider>
  );
}
