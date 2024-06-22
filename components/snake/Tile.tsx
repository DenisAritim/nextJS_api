export const Tile = ({
    head,
    body,
    apple,
}: {
    head: boolean;
    body: boolean;
    apple?: boolean;
}) => {
    return (
        <div
            className={`w-4 h-4 border border-solid border-black 
            ${apple ? "bg-red-500" : ""}
            ${body ? "bg-green-300" : ""}
            ${head ? "bg-green-500" : ""}`}
        ></div>
    );
};
