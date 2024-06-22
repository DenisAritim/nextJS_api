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

type Coordinates = {
    id: `${number}:${number}`;
    x: number;
    y: number;
};

const matrix: Coordinates[] = Array.from(Array(9).keys(), (y) =>
    Array.from(Array(10).keys(), (x) => ({
        id: `${x}:${y}` as `${number}:${number}`,
        x,
        y,
    })),
).flat();

export default function Home() {
    //boundaries: static const of coordinates [[x, y], [x, y]]
    const [upperLeft, bottomRight]: Coordinates[] = [
        { id: "0:0", x: 0, y: 0 },
        { id: "9:9", x: 0, y: 9 },
    ];
    //apple position: variable random coordinates [x, y]
    const [applePosition, setApplePosition] = useState<
        Coordinates | undefined
    >();
    //score

    //coordinates queue for snake (head to tail)
    const startPosition: Coordinates[] = [
        { id: "4:4", x: 4, y: 4 },
        { id: "5:4", x: 5, y: 4 },
    ];

    const {
        add,
        remove,
        clear,
        first,
        last,
        size: score,
        queue,
    } = useQueue<Coordinates>(startPosition);

    enum Directions {
        UP = 0,
        DOWN = 1,
        LEFT = 2,
        RIGHT = 3,
    }

    const [currentDirection, setCurrentDirection] = useState(Directions.RIGHT);

    //callback managing logic at set interval (collision here)
    const [interval, setInterval] = useState<null | number>(null);

    useInterval(() => {
        if (!last) return;
        let { id, x, y } = last;
        switch (currentDirection) {
            case Directions.UP:
                y = y === 0 ? 8 : y - 1;
                break;
            case Directions.DOWN:
                y = y === 8 ? 0 : y + 1;
                break;
            case Directions.LEFT:
                x = x === 0 ? 9 : x - 1;
                break;
            case Directions.RIGHT:
                x = x === 9 ? 0 : x + 1;
                break;
            default:
                break;
        }
        id = `${x}:${y}`;
        add({ id, x, y });
        remove();
    }, interval);

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

    const handleStart = () => {
        setInterval(300);

        const filtered = matrix.filter(
            (el) => !queue.find((tile) => tile.id === el.id),
        );
        const appleCoordinates = Math.floor(
            Math.random() * filtered.length + 1,
        );
        setApplePosition(filtered[appleCoordinates]);
    };

    return (
        <div
            className="flex justify-center h-[1000px] w-full bg-gray-200"
            onKeyDown={(e) => handleKeyPress(e)}
            tabIndex={0}
        >
            <div>
                <button disabled={!!interval} onClick={() => handleStart()}>
                    Start
                </button>
            </div>
            <div className="w-40 h-36 flex flex-wrap bg-white">
                {matrix.map(({ id, x, y }) => (
                    <Tile
                        key={`tile-${id}`}
                        head={x === last?.x && y === last?.y}
                        body={!!queue.find((el) => el.id === id)}
                        apple={id === applePosition?.id}
                    />
                ))}
            </div>
        </div>
    );
}
