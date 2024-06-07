"use client";
import Button from "@/components/Button";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
    const buttonName = ["var_mauro", "pluto", "mauro"];
    const [index, setIndex] = useState(0);
    const title = buttonName[index];
    useEffect(() => {
        if (index >= 1) {
            window.alert("mauro");
        }
    }, [index]);

    return (
        <div className="flex justify-center">
            <Button
                handleClick={() => setIndex((prev) => prev + 1)}
                title={String(title)}
            ></Button>
        </div>
    );
}
