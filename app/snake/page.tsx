"use client";
import { KeyboardEvent, useEffect, useState } from "react";
import { useQueue } from "@uidotdev/usehooks";
import { useInterval } from "@/hooks/useInterval";
import { Tile } from "@/components/snake/Tile";

function toCoordinates(num: number) {
    let numString = num.toString();
    while (numString.length < 2) numString = "0" + numString;
    const [x, y] = numString.split("");
    return [+x, +y];
}

export default function Home() {
    //boundaries: static const of coordinates [[x, y], [x, y]]
    const [upperLeft, bottomRight] = [
        [0, 0],
        [10, 10],
    ];
    //apple position: variable random coordinates [x, y]
    const [applePosition, setApplePosition] = useState<
        [number, number] | undefined
    >();
    //score

    //coordinates queue for snake (head to tail)
    const startPosition = [
        [4, 5],
        [5, 5],
    ];
    const {
        add,
        remove,
        clear,
        first,
        last,
        size: score,
        queue,
    } = useQueue(startPosition);

    enum Directions {
        UP = 0,
        DOWN = 1,
        LEFT = 2,
        RIGHT = 3,
    }

    const [currentDirection, setCurrentDirection] = useState(Directions.RIGHT);

    //callback managing logic at set interval (collision here)
    useInterval(() => {}, 500);

    const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
        let value: undefined | Directions;
        switch (e.key.toLowerCase()) {
            case "arrowup":
            case "w":
                value = Directions.UP;
                break;
            case "arrowdown":
            case "s":
                value = Directions.DOWN;
                break;
            case "arrowleft":
            case "a":
                value = Directions.LEFT;
                break;
            case "arrowright":
            case "d":
                value = Directions.RIGHT;
                break;

            default:
                break;
        }
        if (value !== undefined) {
            setCurrentDirection(value);
        }
    };

    return (
        <div
            className="flex justify-center h-[1000px] w-full bg-gray-200"
            onKeyDown={(e) => handleKeyPress(e)}
            tabIndex={0}
        >
            <div className="w-40 h-40 flex flex-wrap bg-[#6F985E]">
                {Array.from(Array(10 * 10).keys()).map((index) => {
                    const [x, y] = toCoordinates(index);
                    return <Tile key={`tile-${x}-${y}`} />;
                })}
            </div>
        </div>
    );
}
