import { TokenDataItem } from "@/types/coincap";
import { useEffect, useMemo, useState } from "react";

const ENDPOINT = "https://api.coincap.io/v2/assets/";
type ApiResponse = {
    data: TokenDataItem;
    timestamp: number;
};

export function useTokenDetails(id: string) {
    const [details, setDetails] = useState<ApiResponse | undefined>();
    let json: ApiResponse | undefined;
    const getData = async () => {
        try {
            const result = await fetch(ENDPOINT + id);
            json = (await result.json()) as ApiResponse | undefined;
            if (!json) return;
            setDetails(json);
        } catch (e) {}
    };
    useEffect(() => {
        getData();
    }, [id]);
    return details;
}
