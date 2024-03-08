"use client";

import { PropsWithChildren } from "react";
import { ClassNameProps } from ".";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderItemProps = PropsWithChildren &
  ClassNameProps & {
    route: string;
  };

export default function HeaderItem({
  children,
  route,
  className = "",
}: HeaderItemProps) {
  const classes = `text-sm h-16 font-semibold border-b-2 items-center flex uppercase list-none ${className}`;
  const currentRoute = usePathname();

  const isCurrentRoute = route === currentRoute;

  return (
    <li
      className={`${classes} ${
        isCurrentRoute
          ? "text-slate-800 border-purple-800"
          : "text-slate-500 border-transparent"
      }`}
    >
      <Link href={route}>{children}</Link>
    </li>
  );
}
