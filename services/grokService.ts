import { Dataset } from "../types";

// UPDATED: Now pulls from the .env file using Vite's env object
const API_KEY = import.meta.env.VITE_GROK_API_KEY;

export const generateResearchIdeas = async (dataset: Dataset): Promise<string> => {
  if (!API_KEY) {
    return `
    **AI Generated Research Ideas (Mock Mode - Key Missing):**
     
    1.  **Longitudinal Analysis:** Investigate the correlation between "${dataset.title}" and economic indicators.
    2.  **Comparative Study:** Compare ${dataset.category} trends in ${dataset.region} versus global averages.
    3.  **Predictive Modeling:** Use machine learning to forecast future trends based on the historical data.
    
    *(Note: To enable real AI generation, add VITE_GROK_API_KEY to your .env file)*
    `;
  }

  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "You are a senior public health data scientist. Suggest 3 specific, high-impact research questions or hypotheses that a university student or researcher could explore using the provided dataset metadata. Format the output as a clean Markdown list. Keep it concise."
          },
          {
            role: "user",
            content: `Analyze this dataset:\nTitle: ${dataset.title}\nDescription: ${dataset.description}\nCategory: ${dataset.category}\nTags: ${dataset.tags.join(', ')}`
          }
        ],
        model: "grok-beta", // Using the standard beta model alias which is often more stable
        stream: false,
        temperature: 0
      })
    });

    if (!response.ok) {
        const errText = await response.text();
        console.error("xAI API Error Details:", errText);
        return `Error from Grok: ${response.status} ${response.statusText}. The model name might be incorrect or the service is busy.`;
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "No response generated.";

  } catch (error: any) {
    console.error("AI Service Error:", error);
     
    // Specific check for CORS/Network errors common in browser-only apps
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        return `
**Connection Blocked by Browser (CORS):**
        
The browser blocked the request to xAI for security reasons (CORS). This is normal for frontend-only prototypes. 
        
**To fix this for local testing:**
1. You may need to use a browser extension that disables CORS (e.g., "Allow CORS").
2. Or, this logic normally requires a backend server (Node.js) to proxy the request.
        `;
    }

    return "Unable to generate research ideas. Please check your network connection.";
  }
};
