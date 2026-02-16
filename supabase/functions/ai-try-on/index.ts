import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { selfieBase64, jewelryDescription, jewelryImageBase64 } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const contentParts: any[] = [
      {
        type: "text",
        text: `You are a professional virtual jewelry try-on system. You are given a person's photo and a reference image of the exact jewelry piece they want to try on. Your task: 1) Study the jewelry reference image carefully — note its exact design, shape, color, gemstones, metal type, and style. 2) Analyze the person's photo and detect their facial features (face, ears, neck, hands, wrists). 3) Realistically place THIS EXACT jewelry (matching the reference image precisely) on the person. Jewelry description for context: ${jewelryDescription}. Rules: 1) The jewelry in the output MUST match the reference image exactly — same design, color, stones, and metal. Do NOT create a different jewelry piece. 2) Detect the correct body part (earrings→ears, necklace→neck, ring→finger, bracelet→wrist, bangle→wrist). 3) Match size, angle, and perspective to the person's pose. 4) Apply realistic lighting, shadows, and reflections matching the photo's conditions. 5) Keep the person's face, skin tone, and all features exactly the same. 6) Make it look like a real photograph.`,
      },
      {
        type: "image_url",
        image_url: { url: selfieBase64 },
      },
    ];

    // Add jewelry reference image if available
    if (jewelryImageBase64) {
      contentParts.push({
        type: "image_url",
        image_url: { url: jewelryImageBase64 },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [{ role: "user", content: contentParts }],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("Try-on error:", response.status, t);
      return new Response(JSON.stringify({ error: "Virtual try-on failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    const text = data.choices?.[0]?.message?.content || "";

    return new Response(JSON.stringify({ imageUrl, text }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("try-on error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
