import Google from "@auth/core/providers/google";
import { authHandler, initAuthConfig, verifyAuth } from "@hono/auth-js";
import { Hono } from "hono";
import { env } from "hono/adapter";

const app = new Hono();

app.use(
  "*",
  initAuthConfig((c) => {
    const { AUTH_SECRET } = env<{ AUTH_SECRET: string }>(c);
    return {
      secret: AUTH_SECRET,
      providers: [Google],
    };
  }),
);

app.use("/api/auth/*", authHandler());
app.use("*", verifyAuth());

app.get("/api/user", (c) => {
  const auth = c.get("authUser");
  const email = auth.session.user?.email;
  return c.text(`Hello, ${email}`);
});

app.get("/health", (c) => {
  return c.json({
    message: "Hello",
  });
});

export default app;
