import OpenAI from 'openai';

const MIN_HOURLY_RATE = 40;

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function analyzeSpaceAndEstimateHours(
  description: string,
  images: string[], // Base64 encoded images
  serviceType: string
): Promise<{ hours: number; explanation: string }> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert cleaning service estimator. Your task is to analyze space details and provide cleaning time estimates.
          You must ALWAYS respond with a valid JSON object in this exact format:
          {
            "hours": number,
            "baseHours": number,
            "hourlyRate": number,
            "explanation": string
          }

          Important pricing rules:
          - Minimum rate is $${MIN_HOURLY_RATE}/hour
          - For commercial spaces, multiply base hours by 1.5
          - For post-construction cleaning, multiply base hours by 2.5
          - For industrial spaces, multiply base hours by 2.0
          - For heavy duty cleaning, add 25% to the base hours
          - For urgent service, add 20% to the base hours
          - For eco-friendly cleaning, add 15% to the base hours
          - For high areas, add 10% to the base hours
          - For spaces over 5000 sq ft, add 30% to the base hours
          - For spaces over 10000 sq ft, add 50% to the base hours
          `
        },
        {
          role: "user",
          content: `Analyze this ${serviceType} space and respond with ONLY a JSON object:
            ${description}
            
            Remember to format your entire response as a single JSON object with the exact fields: hours, baseHours, hourlyRate, and explanation.`
        }
      ]
    });

    const content = response.choices[0].message.content || '';
    try {
      const result = JSON.parse(content);
      // Validate response format
      if (!result.hours || !result.baseHours || !result.hourlyRate || !result.explanation) {
        throw new Error('Invalid response format');
      }
      
      // Ensure all numbers are valid
      result.hours = Number(result.hours);
      result.baseHours = Number(result.baseHours);
      result.hourlyRate = Math.max(Number(result.hourlyRate), MIN_HOURLY_RATE);
      
      if (isNaN(result.hours) || isNaN(result.baseHours) || isNaN(result.hourlyRate)) {
        throw new Error('Invalid numeric values in response');
      }

      return result;
    } catch (e) {
      console.error('Failed to parse OpenAI response:', content);
      return {
        hours: 3, // Default fallback
        baseHours: 3,
        hourlyRate: MIN_HOURLY_RATE,
        explanation: "We'll estimate 3 hours for your cleaning service. Please note this is a default estimate as we couldn't process the specific details. The actual time may vary based on your space's condition."
      };
    }
  } catch (error) {
    console.error('Error analyzing space:', error);
    return {
      hours: 3,
      baseHours: 3,
      hourlyRate: MIN_HOURLY_RATE,
      explanation: "We'll estimate 3 hours for your cleaning service. Please note this is a default estimate as our estimation service is temporarily unavailable. The actual time may vary based on your space's condition."
    };
  }
}