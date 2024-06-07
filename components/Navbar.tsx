"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
    const path = usePathname();
    //   console.log(path);
    return (
        <div className="w-full p-4 bg-white flex gap-4 items-center justify-center">
            <Link
                className={`text-bold ${path === "/" ? "text-red-500" : ""}`}
                href={"/"}
            >
                Home
            </Link>
            <Link
                className={`text-bold ${path === "/about" ? "text-red-500" : ""}`}
                href={"/about"}
            >
                About
            </Link>
        </div>
    );
}
