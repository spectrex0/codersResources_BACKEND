import { Elysia } from "elysia";

export const scrapper = new Elysia().post("/scrapper", async ({ body, set }) => {
  try {
    const { url } = body as { url?: string };
    if (!url || typeof url !== "string" || !/^https?:\/\//.test(url)) {
      set.status = 400;
      return {
        error:
          "Invalid or empty URL. Please provide a valid URL starting with http:// or https://",
      };
    }
    console.log("Scraping URL:", url);
    const apiRes = await fetch(
      `https://api.api-ninjas.com/v1/webscraper?url=${encodeURIComponent(url)}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": "astq/eGWT9N6N/Bi3HVYSg==c0ualbPW97V0J2eR",
        },
      }
    );
    if (!apiRes.ok) {
      const errText = await apiRes.text();
      set.status = apiRes.status;
      return { error: "Failed to scrape", details: errText };
    }
    const data = await apiRes.json();
    return data;
  } catch (err: any) {
    set.status = 500;
    return { error: err?.message || "Unknown error" };
  }
});