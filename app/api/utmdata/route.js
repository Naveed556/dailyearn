import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { NextResponse } from "next/server";

const propertyId = '329824737';

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
        const { utm } = await request.json();

        const [response] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dimensions: [
                { name: "firstUserCampaignName" }
            ],
            metrics: [
                { name: "totalUsers" },
                { name: "totalRevenue" },
                { name:"averageRevenuePerUser" }
            ],
            dateRanges: [
                { startDate: "30daysAgo", endDate: "today" }
            ],
            dimensionFilter: {
                filter: {
                    fieldName: "firstUserCampaignName",
                    stringFilter: {
                        matchType: "CONTAINS",
                        value: utm // Pass utmSource dynamically
                    }
                }
            }
        });

        // Map and return the response data
        const data = response.rows.map(row => ({
            campaign: row.dimensionValues[0].value,
            users: row.metricValues[0].value,
            revenue: row.metricValues[1].value,
            rpm: row.metricValies[2].value
        }));

        // Return the response using NextResponse
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching UTM Campaign Data:', error);
        return NextResponse.json({ error: 'No Data Found' }, { status: 404 });
    }
}
