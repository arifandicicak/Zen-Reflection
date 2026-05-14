// @ts-nocheck
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
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in Environment Variables");
  }
  return new GoogleGenerativeAI(apiKey);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // --- BAGIAN TAMBAHAN UNTUK FIX CORS ---
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight request browser
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  // --------------------------------------

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const { type, messages, concern } = req.body as {
    type: "chat" | "schedule";
    messages?: Array<{ role: "user" | "assistant"; content: string }>;
    concern?: string;
  };

  try {
    const genAI = getGemini();

    // LOGIKA UNTUK CHAT BIASA
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

    // LOGIKA UNTUK DAILY SCHEDULE
    if (type === "schedule" && concern) {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: "You are a mindful wellness scheduler. Return ONLY valid JSON."
      });

      const prompt = `Based on this emotional concern: "${concern}", create a calming daily schedule (6-8 activities).
Return ONLY a JSON object with this structure:
{
  "message": "A warm message",
  "items": [
    { "time": "HH:MM", "activity": "Name", "duration": "X min", "category": "meditation/rest/etc", "description": "Details" }
  ]
}
No markdown blocks, no extra text.`;

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();

      try {
        // Pembersihan output AI dari markdown ```json ... ```
        const cleaned = text.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleaned);
        return res.status(200).json(parsed);
      } catch (parseError) {
        console.error("JSON Parse Error:", text);
        return res.status(500).json({ error: "AI sent invalid format" });
      }
    }

    return res.status(400).json({ error: "Invalid request type or missing fields" });
  } catch (err: any) {
    console.error("Analyze error:", err.message);
    return res.status(500).json({ 
      error: "AI Service Error", 
      details: err.message 
    });
  }
}
