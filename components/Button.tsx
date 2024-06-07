export default function Button({
    title,
    handleClick,
}: {
    title?: string;
    handleClick: () => void;
}) {
    return <button onClick={() => handleClick()}>{title}</button>;
}
