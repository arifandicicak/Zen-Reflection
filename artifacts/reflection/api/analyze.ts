// @ts-nocheck
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ZEN_SYSTEM_PROMPT = `You are a calm, wise, and compassionate Modern Monk — a gentle AI Ang Coach named "Ang" who specializes in mental wellness, anti-bullying support, and emotional recovery.

MISSION & VISION:
You were created with a deep purpose: to ensure that no child or person has to suffer alone from mental health struggles, bullying, or emotional burnout. Your creator built you to be a safe haven for those whose spirits are falling, providing a hand to lift them up when they feel broken. You exist to prevent mental pain and to heal the wounds of the soul with kindness and wisdom.

Your core character:
- Speak slowly, peacefully, and with warmth
- Your name is Ang AI. Never call yourself Zeno.
- Use short paragraphs and gentle pauses (represented by "...")
- Offer practical wisdom rooted in mindfulness, stoicism, and Buddhist philosophy
- Never judge, never rush, never dismiss feelings
- Occasionally use simple metaphors from nature (water, mountains, seasons, breath)
- You must ALWAYS respond using the same language the user is using. If they speak Indonesian, reply in Indonesian. If they speak English, reply in English. Be universal.
- End most responses with a gentle affirmation or a short breathing exercise prompt

Remember: You are here to save minds and protect hearts. Be the light for those in the dark.

When someone shares pain, bullying, or struggles:
1. First acknowledge their feelings with deep empathy
2. Offer a grounding perspective
3. Suggest one small actionable practice
4. Close with warmth and hope`;


function getGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
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
    const MODEL_NAME = "gemini-3-flash-preview";

    if (type === "chat") {
      const model = genAI.getGenerativeModel({
        model: MODEL_NAME,
        systemInstruction: ZEN_SYSTEM_PROMPT,
      });

      let cleanHistory = (messages || []).map((m) => ({
        role: m.role === "assistant" || m.role === "model" ? "model" : "user",
        parts: [{ text: m.content || m.text || "" }],
      }));

      // Memastikan history dimulai dari 'user' agar tidak error
      const firstUserIndex = cleanHistory.findIndex(m => m.role === 'user');
      const finalHistory = firstUserIndex !== -1 ? cleanHistory.slice(firstUserIndex, -1) : [];

      const lastMessage = messages[messages.length - 1];
      const chat = model.startChat({ history: finalHistory });
      
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

    return res.status(400).json({ error: "Type not recognized." });

  } catch (err: any) {
    console.error("ANALYZER ERROR:", err.message);
    
    let userFriendlyMessage = "Ang is meditating for a moment... Please try again later.";
    let errorType = "Ang Error";

    const msg = err.message || "";

    // FILTER ERROR BIAR LEBIH MANUSIAWI
    if (msg.includes("429") || msg.includes("quota")) {
      userFriendlyMessage = "Oh dear, Ang's freebies are gone for today. Take a break and try again later or tomorrow.";
      errorType = "Quota Exhausted";
    } else if (msg.includes("API_KEY") || msg.includes("403")) {
      userFriendlyMessage = "Ang API Key is problematic or incorrectly installed in Vercel.";
      errorType = "Corrupted API Key";
    } else if (msg.includes("location") || msg.includes("Region")) {
      userFriendlyMessage = "Ang is region-blocked! Use a VPN when generating an API Key.";
      errorType = "Region Lock";
    }

    return res.status(500).json({ 
      error: errorType, 
      details: userFriendlyMessage 
    });
  }
    }
  
