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
    throw new Error("API KEY IS EMPTY: Jangkrik, you haven't installed GEMINI_API_KEY in Vercel's Environment Variables!");
  }
  return new GoogleGenerativeAI(apiKey);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // --- FIX CORS & BROWSER PREFLIGHT ---
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST, Bro!" });
  }

  try {
    const { type, messages, concern } = req.body;
    const genAI = getGemini();

    // PAKAI MODEL TERBARU (GEMINI 3 SERIES)
    const MODEL_NAME = "gemini-2.0-flash";

    if (type === "chat") {
      const model = genAI.getGenerativeModel({
        model: MODEL_NAME,
        systemInstruction: ZEN_SYSTEM_PROMPT,
      });

      // Menyesuaikan format history agar kompatibel dengan SDK terbaru
      const history = (messages || []).slice(0, -1).map((m) => ({
        role: m.role === "assistant" || m.role === "model" ? "model" : "user",
        parts: [{ text: m.content || m.text || "" }],
      }));

      const lastMessage = messages[messages.length - 1];
      const chat = model.startChat({ history });
      
      const result = await chat.sendMessage(lastMessage.content || lastMessage.text);
      const response = await result.response;
      const reply = response.text();

      return res.status(200).json({ reply });
    }

    if (type === "schedule" && concern) {
      const model = genAI.getGenerativeModel({ 
        model: MODEL_NAME,
        systemInstruction: "You are a mindful wellness scheduler. Return ONLY valid JSON."
      });

      const prompt = `Based on: "${concern}", create a daily schedule. Return ONLY JSON structure: { "message": "...", "items": [...] }`;
      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      const cleaned = text.replace(/```json|```/g, "").trim();
      
      return res.status(200).json(JSON.parse(cleaned));
    }

    return res.status(400).json({ error: "Type gak jelas nih." });

  } catch (err: any) {
    // --- INI FITUR ERROR YANG LO MINTA ---
    console.error("ANALYZER ERROR:", err.message);
    
    return res.status(500).json({ 
      error: "Zeno lagi Error!", 
      details: err.message, // Detail error ini yang bakal lo tampilin di web
      tip: "Coba cek apakah API Key di Vercel udah bener atau kuota Google AI lo habis."
    });
  }
        }
