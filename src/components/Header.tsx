import Link from "next/link";

export default function Header() {
    return (
        <header className="flex w-full h-24 bg-gray-100  items-center justify-start space-x-6">
        <Link href="/">
            Home
        </Link>
        <Link href="/blog">
            Blog
        </Link>
        <Link href="/contact">
            Contact
        </Link>
        </header>
    );
    }