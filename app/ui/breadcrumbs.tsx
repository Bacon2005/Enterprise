import Link from "next/link";
type Crumb = { label: string; href?: string };
type Props = { items: Crumb[] };

export function Breadcrumbs({ items }: Props) {
  return (
    <nav className="text-m text-white">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={item.href ?? item.label} className="flex items-center gap-2">
            {i > 0 && <span>/</span>}
            {item.href ? (
              <Link
                href={item.href}
                className="text-white hover:text-amber-500 hover:underline transition-colors duration-500 ease-in-out"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-bold text-xl text-white">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
