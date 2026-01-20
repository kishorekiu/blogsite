"use server";

import { Agent, run } from "@openai/agents";

export const checkContentSafetyAction = async (
  title: string,
  description: string,
) => {
  const moderatorAgent = new Agent({
    name: "Content Moderator",
    model: "gpt-4o",
    instructions: `
      You are a content safety officer for a blog platform.
      Analyze the provided blog Title and Description.

      Your goal is to detect:
      1. Explicit content (violence, hate speech, sexual content).
      2. Obvious fraud or spam (e.g., crypto scams, phishing links).

      Output ONLY a JSON object. Do not output markdown.
      Format:
      {
        "isSafe": boolean,
        "reason": "string (short explanation if unsafe, otherwise null)"
      }
    `,
  });

  const inputPayload = `Analyse this Blog Post:\n Title: ${title}\n Description: ${description}`;
  try {
    const result = await run(moderatorAgent, inputPayload);
    const cleanJson = result.finalOutput?.replace(/```json|```/g, "").trim();
    const analysis = JSON.parse(cleanJson || "{}");
    return {
      success: true,
      analysis, // { isSafe: true/false , reason: "..."}
    };
  } catch (e) {
    console.error("Error in checkContentSafety", e);
    return {
      success: false,
      error: "AI Service Unailable",
    };
  }
};
