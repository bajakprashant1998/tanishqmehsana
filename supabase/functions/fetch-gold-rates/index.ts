const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    // Use AI with web search grounding to get current Tanishq gold rates
    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "user",
            content: `Today is ${new Date().toISOString().split("T")[0]}. What are TODAY's current Tanishq gold rates per gram in India from tanishq.co.in/gold-rate.html? As of February 2026, Tanishq 22K gold is around ₹14,515 per gram. Please provide the most current rates.

Return ONLY a valid JSON object, no markdown, no code fences, no explanation:
{"gold_22k_per_gram": number, "gold_24k_per_gram": number, "gold_18k_per_gram": number, "silver_per_gram": number, "platinum_per_gram": number, "date": "YYYY-MM-DD"}

All values in INR. If unsure, estimate: 24K ≈ 22K × 1.09, 18K ≈ 24K × 0.75. Silver is around ₹100/g, Platinum around ₹3100/g in Feb 2026.`,
          },
        ],
      }),
    });

    if (!aiResp.ok) {
      throw new Error(`AI request failed: ${aiResp.status}`);
    }

    const aiData = await aiResp.json();
    const content = aiData.choices?.[0]?.message?.content || "";
    
    // Extract JSON from response (handle potential markdown wrapping)
    const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return new Response(JSON.stringify({
        success: true,
        rates: parsed,
        source: "tanishq.co.in",
        fetchedAt: new Date().toISOString(),
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    throw new Error("Could not parse rates from AI response");
  } catch (error) {
    console.error("Error fetching gold rates:", error);
    // Return fallback rates so the UI still works
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch rates",
      rates: {
        gold_22k_per_gram: 7450,
        gold_24k_per_gram: 8120,
        gold_18k_per_gram: 6090,
        silver_per_gram: 95,
        platinum_per_gram: 3120,
        date: new Date().toISOString().split("T")[0],
      },
      source: "fallback",
      fetchedAt: new Date().toISOString(),
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
