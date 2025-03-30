import { Link } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <nav className="p-4 flex items-center justify-between max-w-11/12 mx-auto">
        <Link to="/">
          <Activity className="h-6 w-6 text-emerald-600" />
        </Link>

        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={`https://github.com/shadcn.png`} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Button className="bg-emerald-600 hover:bg-emerald-500 cursor-pointer">
            Sign In
          </Button>
        </div>
      </nav>
    </header>
  );
}
