import Google from "@auth/core/providers/google";
import { authHandler, initAuthConfig, verifyAuth } from "@hono/auth-js";
import { Hono } from "hono";

const app = new Hono();

app.use(
  "*",
  initAuthConfig((c) => {
    return {
      secret: c.env.AUTH_SECRET,
      providers: [Google],
    };
  }),
);

app.use("/api/auth/*", authHandler());
app.use("/api/*", verifyAuth());

app.get("/api/user", (c) => {
  const auth = c.get("authUser");
  const email = auth.session.user?.email;
  if (!email?.endsWith("@oit.ac.jp")) {
    return c.text("You are not authorized to access this page!", 403);
  }
  return c.text(`Hello, ${email}`);
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
