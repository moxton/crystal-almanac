import { NextRequest, NextResponse } from "next/server";

const INDEXNOW_KEY = "334a3a97e8194367b7c65645cd678108";
const HOST = "crystalalmanac.com";

export async function POST(request: NextRequest) {
  const { urls } = await request.json();

  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return NextResponse.json({ error: "Provide an array of URLs" }, { status: 400 });
  }

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
      urlList: urls.map((u: string) => u.startsWith("http") ? u : `https://${HOST}${u}`),
    }),
  });

  return NextResponse.json({
    status: response.status,
    submitted: urls.length,
    message: response.status === 200 ? "URLs submitted to IndexNow" : "Submission may have failed",
  });
}
