import { site } from "~/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t">
      <div className="text-muted-foreground mx-auto flex max-w-3xl flex-col gap-3 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul className="flex gap-4">
          <li>
            <a className="hover:text-foreground" href={site.github}>
              GitHub
            </a>
          </li>
          <li>
            <a className="hover:text-foreground" href={`mailto:${site.email}`}>
              Email
            </a>
          </li>
          <li>
            <a className="hover:text-foreground" href="/rss.xml">
              RSS
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
