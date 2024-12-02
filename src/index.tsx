import {
  getAuth,
  oidcAuthMiddleware,
  processOAuthCallback,
  revokeSession,
} from "@hono/oidc-auth";
import { Hono } from "hono";

const app = new Hono();

app.get("/", async (c) => {
  return c.text("Welcome! Please log in.");
});

app.get("/login", async (c) => {
  return c.redirect("/home");
});

app.get("/logout", async (c) => {
  await revokeSession(c);
  return c.text("You have been successfully logged out!");
});

app.get("/callback", async (c) => {
  return processOAuthCallback(c);
});

// ログイン済みのみアクセス可能なページ
app.use("/home/*", oidcAuthMiddleware());
app.get("/home", async (c) => {
  const auth = await getAuth(c);
  if (typeof auth?.email !== "string" || !auth.email.endsWith("@oit.ac.jp")) {
    return c.text("You are not authorized to access this page!", 403);
  }
  return c.text(`Hello <${auth?.email}>!`);
});

export default app;
