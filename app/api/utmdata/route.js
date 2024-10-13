import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { NextResponse } from "next/server";

const propertyId = '462680299';

// Initialize the client
const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: {
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'), // Correctly format the private key
    },
});

export async function POST(request) {
    try {
        // Parse the request body to get utmSource
        const { utmSource } = await request.json();

        const [response] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dimensions: [
                { name: "firstUserSource" },
                { name: "firstUserCampaignName" }
            ],
            metrics: [
                { name: "totalUsers" },
                { name: "totalRevenue" }
            ],
            dateRanges: [
                { startDate: "30daysAgo", endDate: "today" }
            ],
            dimensionFilter: {
                filter: {
                    fieldName: "firstUserSource",
                    stringFilter: {
                        matchType: "EXACT",
                        value: utmSource // Pass utmSource dynamically
                    }
                }
            }
        });

        // Map and return the response data
        const data = response.rows.map(row => ({
            source: row.dimensionValues[0].value,
            campaign: row.dimensionValues[1].value,
            users: row.metricValues[0].value,
            revenue: row.metricValues[1].value
        }));

        // Return the response using NextResponse
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching UTM Campaign Data:', error);
        return NextResponse.json({ error: 'No Data Found' }, { status: 500 });
    }
}
