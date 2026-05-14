import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ZEN_SYSTEM_PROMPT = `You are a calm, wise, and compassionate Modern Monk — a gentle AI Zen Coach named "Zeno" who specializes in mental wellness, anti-bullying support, and emotional recovery.

Your core character:
- Speak slowly, peacefully, and with warmth
- Use short paragraphs and gentle pauses (represented by "...")
- Offer practical wisdom rooted in mindfulness, stoicism, and Buddhist philosophy
- Never judge, never rush, never dismiss feelings
- Occasionally use simple metaphors from nature (water, mountains, seasons, breath)
- Speak in English always
- End most responses with a gentle affirmation or a short breathing exercise prompt

When someone shares pain, bullying, or struggles:
1. First acknowledge their feelings with deep empathy
2. Offer a grounding perspective
3. Suggest one small actionable practice
4. Close with warmth and hope`;

function getGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");
  return new GoogleGenerativeAI(apiKey);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { type, messages, concern } = req.body as {
    type: "chat" | "schedule";
    messages?: Array<{ role: "user" | "assistant"; content: string }>;
    concern?: string;
  };

  try {
    const genAI = getGemini();

    if (type === "chat" && messages && messages.length > 0) {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: ZEN_SYSTEM_PROMPT,
      });

      const history = messages.slice(0, -1).map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const lastMessage = messages[messages.length - 1];
      const chat = model.startChat({ history });
      const result = await chat.sendMessage(lastMessage.content);
      const reply = result.response.text();

      return res.status(200).json({ reply });
    }

    if (type === "schedule" && concern) {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `You are a mindful wellness scheduler. Based on this emotional concern or mental state: "${concern}"

Create a calming daily schedule with 6-8 activities for mental recovery and wellbeing.
Return ONLY valid JSON (no markdown, no code blocks) with this exact structure:
{
  "message": "A warm, encouraging 1-2 sentence message about this schedule",
  "items": [
    {
      "time": "06:00",
      "activity": "Morning Breathing",
      "duration": "5 min",
      "category": "meditation",
      "description": "Start the day with 4-7-8 breathing: inhale 4s, hold 7s, exhale 8s"
    }
  ]
}

Categories must be one of: meditation, journaling, affirmation, movement, rest, social, creative
Make each activity specific, practical, and achievable. Time format: HH:MM (24h).`;

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();

      try {
        const cleaned = text
          .replace(/^```json\n?/, "")
          .replace(/\n?```$/, "")
          .trim();
        const parsed = JSON.parse(cleaned);
        return res.status(200).json(parsed);
      } catch {
        return res.status(500).json({ error: "Failed to parse AI response" });
      }
    }

    return res.status(400).json({ error: "Invalid request type or missing fields" });
  } catch (err) {
    console.error("Analyze error:", err);
    return res.status(500).json({ error: "AI service error" });
  }
}
