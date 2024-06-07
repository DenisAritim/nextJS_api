"use client";
import { useTokenDetails } from "@/hooks/useTokenDetails";

export default function Details({ params }: { params: { slug: string } }) {
    const details = useTokenDetails(params.slug);

    return (
        <div>
            <h1>Details Test</h1>
            {details?.data ? (
                <div>
                    <h2>{details.data.name}</h2>
                    <ul>
                        {Object.entries(details.data).map(([key, value]) => (
                            <li key={`data-${key}`}>
                                {key} {value}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
