import { signOut, useSession } from "@hono/auth-js/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

export default function Index() {
  const { data: session, status } = useSession();

  return (
    <div className="w-screen flex flex-col">
      <div className="w-full flex flex-1 flex-col items-center justify-center overflow-clip p-4">
        <div>
          <Button
            className="flex items-center gap-x-1"
            onClick={() => signOut()}
          >
            Logout
          </Button>
          <div className="mt-4 flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={session?.user?.image ?? undefined}
                alt="Avatar"
              />
              <AvatarFallback>失敗</AvatarFallback>
            </Avatar>
            {session?.user?.name}: {session?.user?.email}
          </div>
          <a href="/api/data" className="mt-4">
            <Button>data</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
