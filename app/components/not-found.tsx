import { Link } from "react-router";

export function NotFound({ error }: { error?: Error }) {
  return (
    <section className="py-16">
      <p className="text-brand text-sm font-medium">{error ? "Error" : "404"}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        {error ? "Something went wrong" : "Page not found"}
      </h1>
      <p className="text-muted-foreground mt-3">
        {error
          ? "An unexpected error occurred."
          : "That page doesn't exist, or it has moved."}
      </p>
      <Link to="/" className="text-brand mt-6 inline-block underline underline-offset-4">
        Back to home
      </Link>
      {import.meta.env.DEV && error && (
        <pre className="mt-6 overflow-x-auto text-xs">{error.stack}</pre>
      )}
    </section>
  );
}
