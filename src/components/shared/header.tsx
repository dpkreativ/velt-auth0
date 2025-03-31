import { Link } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "../ui/button";
import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
  const { isAuthenticated, isLoading, loginWithRedirect, logout, user } =
    useAuth0();

  function handleLogin() {
    // TODO: implement login
    loginWithRedirect();
  }

  function handleLogout() {
    // TODO: implement logout
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }

  return (
    <header className="border-b border-gray-200">
      <nav className="p-4 flex items-center justify-between max-w-11/12 mx-auto">
        <Link to="/">
          <Activity className="h-6 w-6 text-emerald-600" />
        </Link>

        <div className="flex items-center gap-4">
          {user && (
            <Avatar>
              <AvatarImage
                src={user.picture ?? `https://github.com/shadcn.png`}
              />
              <AvatarFallback>{user.name ?? "CN"}</AvatarFallback>
            </Avatar>
          )}
          <Button
            onClick={isAuthenticated ? handleLogout : handleLogin}
            className="bg-emerald-600 hover:bg-emerald-500 cursor-pointer"
          >
            {isLoading
              ? "getting user..."
              : isAuthenticated
                ? "Logout"
                : "Login"}
          </Button>
        </div>
      </nav>
    </header>
  );
}
