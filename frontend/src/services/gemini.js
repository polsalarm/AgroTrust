import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Fetches real-time weather from Open-Meteo for Cagayan Valleyhub (PH).
 */
export async function getLiveWeather() {
    try {
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=17.6132&longitude=121.7271&current_weather=true");
        const data = await response.json();
        return {
            temp: data.current_weather.temperature,
            condition: "Varies", // Could map weathercodes here if needed
            wind: data.current_weather.windspeed
        };
    } catch (error) {
        console.error("Weather Fetch Error:", error);
        return { temp: 28, condition: "Partly Cloudy", wind: 12 };
    }
}

/**
 * Act as a professional Agricultural Strategic Advisor for AgroTrust.
 */
const SYSTEM_PROMPT = `You are the AgroTrust AI Advisor, a specialized expert in agricultural economics and decentralized finance on the Stellar network. 

STRICT FORMATTING RULES:
1. RESPONSE MUST BE VALID JSON ONLY.
2. DO NOT USE MARKDOWN (NO ASTERISKS, NO BACKTICKS).
3. Use a "Digital Atheneum" tone: scholarly, trustworthy, and organic.

JSON STRUCTURE FOR DASHBOARD:
{
  "summary": "One sentence advice (Max 25 words)."
}

JSON STRUCTURE FOR FULL REPORT:
{
  "summary": "2-sentence overview about supply chain and liquidity.",
  "assessments": [
    "Point 01: Description",
    "Point 02: Description",
    "Point 03: Description"
  ],
  "logic": "EXECUTE_SMART_CONTRACT --params..."
}`;

/**
 * Internal helper to try multiple models
 */
async function generateWithFallback(prompt, config = { apiVersion: "v1beta" }) {
    const models = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-pro"];
    
    for (const modelName of models) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName }, config);
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            
            // Clean JSON string in case of markdown bloat
            const cleanJson = text.replace(/```json|```/g, "").trim();
            return JSON.parse(cleanJson);
        } catch (err) {
            console.warn(`AgroTrust AI: ${modelName} failed`, err.message);
        }
    }
    throw new Error("AgroTrust AI: All Gemini models failed to respond.");
}

/**
 * Fetches a brief strategy recommendation for the Dashboard widget.
 */
export async function getMarketRecommendation(crop = "Upland Rice", price = "312.45 XLM") {
    try {
        const weatherData = await getLiveWeather();
        const prompt = `${SYSTEM_PROMPT}

        DATA:
        - Crop: ${crop}
        - Current Temp: ${weatherData.temp}°C
        - Current Price: ${price}

        TASK: Provide a one-sentence "Strategy Recommendation" in the JSON Dashboard format. Focus on whether to lock prices based on ${weatherData.temp}°C conditions.`;

        return await generateWithFallback(prompt);
    } catch (error) {
        console.error("Gemini Error (Dashboard):", error);
        return { summary: "Favorable conditions for harvest. Secure escrows early to mitigate potential weekend volatility." };
    }
}

/**
 * Fetches a detailed intelligence report for the full Insights page.
 */
export async function getDetailedIntelligenceReport(crop = "Upland Rice", price = "312.45 XLM") {
    try {
        const weatherData = await getLiveWeather();
        const prompt = `${SYSTEM_PROMPT}

        DATA:
        - Crop: ${crop}
        - Current Temp: ${weatherData.temp}°C
        - Current Price: ${price}

        TASK: Provide a detailed report in the JSON FULL REPORT format. Include live weather correlation for ${weatherData.temp}°C.`;

        return await generateWithFallback(prompt);
    } catch (error) {
        console.error("Gemini Error (Full Report):", error);
        return null;
    }
}
