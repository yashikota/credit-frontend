import { signIn } from "@hono/auth-js/react";
import { Button } from "~/components/ui/button";

export default function ErrorPage() {
  return (
    <div>
      <p>@oit.ac.jp で終わるメールアドレスのみログイン可能です</p>

      <Button className="flex items-center gap-x-1" onClick={() => signIn()}>
        Login
      </Button>
    </div>
  );
}
