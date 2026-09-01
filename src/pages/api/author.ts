import { createHash } from "node:crypto";
import { FeatureFlagsApi } from "@config/featureFlag/featureFlag.json";
import authorConfig from "@config/siteConfig/info.json";

const responseData = {
	author: authorConfig,
};

const header = {
	"Content-Type": "application/json",
	"Access-Control-Allow-Origin": "https://www.rafay99.com",
	"Cache-Control": "public, max-age=3600",
};

export async function GET() {
	try {
		if (!FeatureFlagsApi.enableauthorInfoAPI) {
			return new Response(
				JSON.stringify({ error: "Author Profile is disabled" }),
				{
					status: 403,
					headers: header,
				},
			);
		}

		const responseBody = JSON.stringify(responseData);
		return new Response(responseBody, {
			status: 200,
			headers: {
				...header,
				ETag: `"${createHash("sha1").update(responseBody).digest("hex")}"`,
			},
		});
	} catch (error) {
		console.error("Error fetching author data:", error);
		return new Response(
			JSON.stringify({ error: "Failed to fetch author data" }),
			{
				status: 500,
				headers: header,
			},
		);
	}
}
