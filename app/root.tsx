import { SessionProvider, signIn, useSession } from "@hono/auth-js/react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  isRouteErrorResponse,
} from "react-router";
import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import { Button } from "./components/ui/button";

export function meta() {
  return [
    {
      title: "OIT Credit App",
    },
  ];
}

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <SessionProvider>{children}</SessionProvider>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { data: _session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  return (
    <>
      {status === "authenticated" ? (
        <main>
          <Outlet />
        </main>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <Button onClick={() => signIn()}>ログイン</Button>
        </div>
      )}
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
