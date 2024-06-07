import { TokenDataItem } from "@/types/coincap";
import { NextRequest, NextResponse } from "next/server";

const ENDPOINT = "https://api.coincap.io/v2/assets";

const limit = 10;

type CoinCapTokenResponse = {
    data: TokenDataItem[];
    timestamp: number;
};

export const GET = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;

    const rawPage = searchParams.get("page");

    const page =
        rawPage && Number.isInteger(Number(rawPage)) && Number(rawPage) > 0
            ? +rawPage
            : 1;

    const offset = limit * (page - 1);

    const call = await fetch(`${ENDPOINT}?limit=${limit}&offset=${offset}`);

    const result = (await call.json()) as CoinCapTokenResponse | undefined;

    return NextResponse.json({ result });
};
