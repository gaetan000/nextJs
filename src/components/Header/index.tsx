import HeaderItem from "./HeaderItem";
import HeaderLogo from "./HeaderLogo";

export type ClassNameProps = {
  className?: string;
};

export default function Header() {
  return (
    <header className="flex bg-white w-full justify-between px-9">
      <HeaderLogo />
      <ul className="flex gap-4">
        <HeaderItem route="/">Home</HeaderItem>
        <HeaderItem route="/speakers">Speakers</HeaderItem>
        <HeaderItem route="/schedule">Schedule</HeaderItem>
        <HeaderItem route="/team">Team</HeaderItem>
        <HeaderItem route="/blog">Blog</HeaderItem>
        <HeaderItem route="/signIn">Sign in</HeaderItem>
        <HeaderItem route="/buyTicket">Buy Ticket</HeaderItem>
      </ul>
    </header>
  );
}
