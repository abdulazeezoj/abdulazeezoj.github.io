import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import { ThemeToggle } from "~/components/theme-toggle";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { site } from "~/lib/site";
import { cn } from "~/lib/utils";

const links = [
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-background/80 print:hidden sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <Link to="/" className="font-semibold tracking-tight">
          {site.name}
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "text-muted-foreground hover:text-foreground rounded-md px-3 py-1.5 text-sm transition-colors",
                  isActive && "text-foreground font-medium",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-1 sm:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Site navigation
                </SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col px-4">
                {[{ to: "/", label: "Home" }, ...links].map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "text-muted-foreground border-b py-3 text-lg",
                        isActive && "text-foreground font-medium",
                      )
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
