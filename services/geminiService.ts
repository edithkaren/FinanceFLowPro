
import { GoogleGenAI, Type } from "@google/genai";
import { Expense } from "../types";

export const getFinancialInsights = async (expenses: Expense[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Analyze the following list of expenses and provide strategic financial advice. 
    Format the response as clear markdown with sections for:
    1. Overall Spending Analysis
    2. Category Insights
    3. Actionable Recommendations for Saving

    Expenses:
    ${JSON.stringify(expenses, null, 2)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "Unable to generate insights at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI advisor. Please try again later.";
  }
};
