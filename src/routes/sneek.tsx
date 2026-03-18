import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sneek")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>dis is sneek route</div>;
}
