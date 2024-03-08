"use client";

import { PropsWithChildren } from "react";
import { ClassNameProps } from ".";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type HeaderItemProps = PropsWithChildren &
  ClassNameProps & {
    route: string;
  };

export default function HeaderItem({
  children,
  route,
  className = "",
}: HeaderItemProps) {
  const currentRoute = usePathname();

  const isCurrentRoute = route === currentRoute;

  const classes = cn(
    `text-sm h-16 font-semibold border-b-2 items-center flex uppercase list-none text-slate-500 border-transparent ${className}`,
    {
      "text-slate-800 border-purple-800": isCurrentRoute,
    }
  );

  return (
    <li className={classes}>
      <Link href={route}>{children}</Link>
    </li>
  );
}
