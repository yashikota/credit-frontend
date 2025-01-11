import Google from "@auth/core/providers/google";
import { authHandler, initAuthConfig, verifyAuth } from "@hono/auth-js";
import { Hono } from "hono";

type Bindings = {
  AUTH_SECRET: string;
  DATA_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(
  "*",
  initAuthConfig((c) => {
    return {
      secret: c.env.AUTH_SECRET,
      providers: [Google],
      callbacks: {
        signIn: async ({ user }) => {
          if (!user?.email) return false;
          return user.email?.endsWith("@oit.ac.jp") ?? false;
        },
      },
      pages: {
        error: "/error",
      },
    };
  }),
);

app.use("/api/auth/*", authHandler());
app.use("/api/*", verifyAuth());

app.get("/api/data", async (c) => {
  const auth = c.get("authUser");
  if (!auth) {
    return c.text("Not authenticated", 401);
  }

  const url = c.env.DATA_URL;
  const data = await fetch(url).then((res) => res.json());
  return c.json(data);
});

app.get("/login", (c) => {
  return c.redirect("/api/auth/signin");
});

app.get("/logout", (c) => {
  return c.redirect("/api/auth/signout");
});

app.get("/health", (c) => {
  return c.json({
    message: "Hello",
  });
});

export default app;
