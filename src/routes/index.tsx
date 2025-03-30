import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main className="p-4 flex flex-col gap-4 items-center justify-center text-center min-h-[80vh] max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold">Hi there!</h1>
      <p>Welcome.</p>
      <p>
        This is a sample app that demonstrates how to set up Velt's @mentions
        and comments using Auth0.
      </p>

      <Link to="/dashboard" className="text-emerald-600 underline">
        Go to dashboard
      </Link>
    </main>
  );
}
