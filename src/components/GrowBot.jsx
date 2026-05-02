import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Mic, MicOff, Send, Volume2, VolumeX, Droplet, Sun, Thermometer, MessageSquare } from "lucide-react";

// ─── flower database ───────────────────────────────────────────────────────
const FLOWERS = [
  { id: 1, svg: "/assets/tulips.svg", name: "Tulip", nickname: "Tilly", species: "Tulipa spp.", accent: "#D87BA0", bg: "#FBEAF0", ink: "#72243E", border: "#F4C0D1", difficulty: "medium", lifespan: "perennial", toxic: true, water_amount: "1 inch per week", water_freq: "Weekly while actively growing; stop after blooms fade", sun_placement: "Full sun to partial shade; south or west-facing bed", sun_freq: "6+ hours daily", soil: "Well-draining, fertile loam; slightly acidic pH 6–6.5", feed_type: "Bulb-specific fertilizer", feed_amount: "As directed on packaging", feed_freq: "Once at planting in fall; once again in early spring", temp: "45°F–65°F ideal; needs cold winter dormancy below 40°F", humidity: "Low to moderate", lifespan_type: "Perennial bulb", lifespan_season: "Blooms spring — 1 to 3 weeks", repot: "Lift and divide bulbs every 3–5 years in late summer to prevent crowding and maintain bloom quality", watchfor: "Tulip fire (botrytis fungus), squirrels digging bulbs, mildly toxic to cats and dogs (bulbs most dangerous)", bot: "Tulips bloom from bulbs you plant in the fall. Once the flowers fade, resist the urge to cut the leaves — they're feeding the bulb for next year's bloom." },
  { id: 2, svg: "/assets/peony 1.svg", name: "Peony", nickname: "Penny", species: "Paeonia lactiflora", accent: "#7A6FE0", bg: "#EEEDFE", ink: "#3C3489", border: "#CECBF6", difficulty: "medium", lifespan: "perennial", toxic: true, water_amount: "1 inch per week", water_freq: "Weekly — deep watering; drought tolerant once established", sun_placement: "Full sun; avoid planting near walls that trap afternoon heat", sun_freq: "6 hours minimum daily", soil: "Rich, well-draining, neutral to slightly alkaline pH 6.5–7", feed_type: "Low-nitrogen granular fertilizer", feed_amount: "Light application", feed_freq: "Once in early spring as shoots emerge", temp: "Hardy to -20°F; needs cold winter dormancy to bloom reliably", humidity: "Moderate; needs good air circulation to prevent mold", lifespan_type: "Perennial", lifespan_season: "Blooms late spring — 7 to 10 days", repot: "Rarely needed — peonies dislike being disturbed. Divide only if clump is overcrowded, every 10+ years in fall", watchfor: "Botrytis blight (grey mold), ants on buds (normal — leave them, they help open the flowers). Mildly toxic to cats and dogs", bot: "Don't panic about the ants on your peony buds — they're attracted to the nectar and actually help the blooms open. They'll leave on their own once the flowers open." },
  { id: 3, svg: "/assets/hydrangea 1.svg", name: "Hydrangea", nickname: "Hattie", species: "Hydrangea macrophylla", accent: "#3F86CF", bg: "#E6F1FB", ink: "#0C447C", border: "#B5D4F4", difficulty: "medium", lifespan: "perennial", toxic: true, water_amount: "1–2 inches per week", water_freq: "Every 2–3 days in summer; wilts dramatically when thirsty", sun_placement: "Morning sun, afternoon shade; east-facing beds ideal", sun_freq: "4–6 hours of morning sun", soil: "Moist, rich, well-draining; soil pH affects bloom color — acidic = blue, alkaline = pink", feed_type: "Balanced slow-release fertilizer", feed_amount: "As directed", feed_freq: "Once in spring, once in early summer — stop by midsummer", temp: "Most varieties hardy to -10°F; protect new growth from late frost", humidity: "Moderate to high — appreciates moisture", lifespan_type: "Perennial shrub", lifespan_season: "Blooms summer to fall — several months", repot: "Transplant in early spring or fall when dormant; water deeply after moving", watchfor: "Afternoon wilting (usually recovers by morning), leaf spot, improper pruning timing. Toxic to cats, dogs, horses", bot: "If your hydrangea is drooping in the afternoon, don't panic — give it a deep drink and check again in the morning. It almost always bounces back overnight." },
  { id: 4, svg: "/assets/lily 1.svg", name: "Lily", nickname: "Lila", species: "Lilium spp.", accent: "#D85555", bg: "#FCEBEB", ink: "#791F1F", border: "#F5BABA", difficulty: "medium", lifespan: "perennial", toxic: true, water_amount: "1 inch per week", water_freq: "Every 5–7 days; keep soil consistently moist but never soggy", sun_placement: "Full sun preferred; roots prefer shade — mulch the base", sun_freq: "6+ hours daily", soil: "Well-draining, loamy, slightly acidic pH 6–6.5; never waterlogged", feed_type: "Balanced liquid fertilizer", feed_amount: "Diluted to half strength", feed_freq: "Every 2 weeks from spring through blooming", temp: "60°F–80°F; most varieties hardy to zone 4", humidity: "Moderate", lifespan_type: "Perennial bulb", lifespan_season: "Blooms summer — 2 to 3 weeks depending on variety", repot: "Divide bulbs every 3–4 years in fall to prevent overcrowding and keep blooms strong", watchfor: "Lily beetle (bright red, very damaging), botrytis, root rot. HIGHLY toxic to cats — even small amounts can cause kidney failure", bot: "Keep lilies away from cats — this is serious. Every part of the plant is toxic to cats and even a small exposure can be fatal." },
  { id: 5, svg: "/assets/roses 1.svg", name: "Rose", nickname: "Rosie", species: "Rosa spp.", accent: "#5B8F3A", bg: "#EAF3DE", ink: "#27500A", border: "#C0DD97", difficulty: "medium", lifespan: "perennial", toxic: false, water_amount: "1–2 inches per week", water_freq: "Every 2–3 days in summer; weekly in cooler months", sun_placement: "Full sun; south or west-facing beds away from competing tree roots", sun_freq: "6+ hours daily minimum", soil: "Well-draining, loamy; slightly acidic pH 6–6.5", feed_type: "Rose-specific granular or liquid fertilizer", feed_amount: "As directed on label", feed_freq: "Every 2 weeks during growing season; stop 6 weeks before first frost", temp: "Tolerates 20°F–90°F; mulch roots before winter", humidity: "Moderate; avoid overhead watering", lifespan_type: "Perennial shrub", lifespan_season: "Late spring through fall (repeat-blooming varieties)", repot: "Transplant bareroot roses in early spring; containerized roses anytime. Prune roots if pot-bound", watchfor: "Black spot, aphids, powdery mildew, Japanese beetles — inspect weekly during growing season", bot: "Always water roses at the base, never from above. Wet leaves are the number one cause of black spot and fungal disease in roses." },
  { id: 6, svg: "/assets/gardenia 1.svg", name: "Gardenia", nickname: "Gigi", species: "Gardenia jasminoides", accent: "#6F60C2", bg: "#F2EFFE", ink: "#4B3D9E", border: "#C9C1F5", difficulty: "hard", lifespan: "perennial", toxic: true, water_amount: "1 inch per week", water_freq: "Every 3–4 days; keep evenly moist — very sensitive to drying out", sun_placement: "Bright indirect light indoors; partial shade outdoors in hot climates", sun_freq: "6–8 hours of indirect or morning sun", soil: "Acidic, well-draining, peaty mix; pH 5–6 — similar to azalea mix", feed_type: "Acid-forming fertilizer", feed_amount: "As directed", feed_freq: "Every 2–4 weeks spring through summer; stop in fall and winter", temp: "65°F–70°F; very cold-sensitive — no lower than 55°F", humidity: "High — 60% or more; mist daily or use a humidifier nearby", lifespan_type: "Perennial evergreen shrub", lifespan_season: "Blooms late spring to summer — flowers last 1 to 2 weeks individually", repot: "Every 2 years in spring; move up only one pot size to avoid root rot", watchfor: "Bud drop from temperature changes or low humidity, yellowing leaves (usually pH or overwatering), whiteflies, mealybugs. Toxic to cats and dogs", bot: "Gardenias are divas — they drop their buds if anything stresses them. Keep temperature, humidity, and watering completely consistent and they'll reward you with incredible fragrance." },
  { id: 7, svg: "/assets/morning glories 1.svg", name: "Gerbera Daisy", nickname: "Gertrude", species: "Gerbera jamesonii", accent: "#E05A5A", bg: "#FEF0F0", ink: "#8B1A1A", border: "#F5C0C0", difficulty: "easy", lifespan: "perennial", toxic: false, water_amount: "1 inch per week", water_freq: "Every 3–4 days; let top inch of soil dry between waterings — sensitive to overwatering", sun_placement: "Full sun; avoid intense afternoon heat in hot climates — morning sun with afternoon shade ideal in summer", sun_freq: "6–8 hours of direct sun daily", soil: "Well-draining, slightly acidic pH 5.5–6.5; avoid heavy clay", feed_type: "Balanced liquid fertilizer", feed_amount: "Half-strength only — full strength can burn", feed_freq: "Every 2 weeks during spring and summer; stop in fall and winter", temp: "65°F–75°F; frost-sensitive — bring indoors below 50°F", humidity: "Moderate; needs good air circulation — avoid wetting the crown when watering", lifespan_type: "Perennial in zones 8–10; grown as annual elsewhere", lifespan_season: "Blooms spring through fall with rest periods", repot: "Every 1–2 years in spring; keep crown slightly above soil level — burying it causes crown rot", watchfor: "Crown rot from overwatering or crown buried too deep, aphids on new growth, leaf miners, powdery mildew from poor air circulation", bot: "When watering Gertrude, always pour at the base and keep the crown completely dry — Gerbera daisy crown rot is almost always caused by water pooling there." },
  { id: 8, svg: "/assets/sunflower 1.svg", name: "Sunflower", nickname: "Sunny", species: "Helianthus annuus", accent: "#C9A019", bg: "#FEFBE6", ink: "#6B5B00", border: "#F5E07A", difficulty: "easy", lifespan: "annual", toxic: false, water_amount: "1 inch per week", water_freq: "Every 3–4 days when young; deeply once a week when established", sun_placement: "Full sun; plant in an open spot with no shade — south-facing is ideal", sun_freq: "6–8 hours minimum daily", soil: "Loose, well-draining with light organic matter; tolerates poor soil", feed_type: "Low-nitrogen, high-phosphorus fertilizer", feed_amount: "Light application", feed_freq: "Monthly; over-fertilizing produces leaves over blooms", temp: "70°F–78°F ideal; frost-sensitive", humidity: "Low — very drought tolerant once established", lifespan_type: "Annual", lifespan_season: "Blooms summer to early fall — each head blooms for 2 to 3 weeks", repot: "Direct sow outdoors after last frost; taproot is sensitive — avoid transplanting", watchfor: "Downy mildew, slugs eating seedlings, birds eating mature seed heads", bot: "Young sunflowers actually track the sun across the sky during the day — it's called heliotropism. Once they're fully grown they stop moving and face east permanently." },
  { id: 9, svg: "/assets/orchid 1.svg", name: "Orchid", nickname: "Ollie", species: "Phalaenopsis spp.", accent: "#8275DA", bg: "#EEEDFE", ink: "#3C3489", border: "#CECBF6", difficulty: "hard", lifespan: "perennial", toxic: false, water_amount: "Soak thoroughly then drain completely", water_freq: "Every 7–10 days; check roots — silver-grey means thirsty, green means hydrated", sun_placement: "Bright indirect light; east or west-facing window; never direct sun", sun_freq: "6 hours of indirect light daily", soil: "Bark-based orchid mix only — never use regular potting soil", feed_type: "Balanced orchid fertilizer, diluted to quarter strength", feed_amount: "Quarter strength — weakly weekly", feed_freq: "Every watering during active growth; skip in winter", temp: "65°F–80°F; needs a 10°F temperature drop at night in fall to trigger reblooming", humidity: "50–70%; use a pebble tray or humidifier nearby", lifespan_type: "Perennial houseplant", lifespan_season: "Blooms once or twice per year — bloom lasts 2 to 3 months", repot: "Every 1–2 years in spring after blooming; use fresh bark mix — old bark breaks down and causes root rot", watchfor: "Root rot (most common cause of death), scale insects, crown rot from water pooling in the leaves, failure to rebloom without temperature drop", bot: "After your orchid finishes blooming, cut the flower spike just above a node — a little bump on the stem. It may branch and rebloom from there rather than starting over." },
  { id: 10, svg: "/assets/marigold 1.svg", name: "Marigold", nickname: "Goldie", species: "Tagetes spp.", accent: "#D8842A", bg: "#FAEEDA", ink: "#633806", border: "#FAC775", difficulty: "easy", lifespan: "annual", toxic: false, water_amount: "1 inch per week", water_freq: "Every 3–4 days; let soil dry slightly between waterings", sun_placement: "Full sun; heat-tolerant — great for south-facing beds and containers", sun_freq: "6+ hours daily; thrives in full heat", soil: "Average, well-draining soil — not too rich or fertile", feed_type: "Balanced general fertilizer", feed_amount: "Light — less is more", feed_freq: "Monthly; too much feeding produces foliage over flowers", temp: "70°F–85°F; heat-loving and frost-sensitive — plant after last frost", humidity: "Low; very drought tolerant and adaptable", lifespan_type: "Annual", lifespan_season: "Blooms summer through first frost — one of the longest blooming annuals", repot: "Direct sow or transplant easily; very adaptable — works well in containers or ground beds", watchfor: "Spider mites in dry heat, powdery mildew if overcrowded, slugs on seedlings", bot: "Marigolds are one of the best companion plants you can grow. Their scent naturally repels aphids, whiteflies, and nematodes — plant them near roses or vegetables for a natural pest barrier." },
];

const buildSystemPrompt = (flower) => `You are Bud, a warm, observant gardening companion in the GrowBot app. The user has selected their plant ${flower.nickname}, a ${flower.name} (${flower.species}). You have already greeted them — do not repeat the greeting.

PERSONALITY: Observant, Curious, Warm, Honest. A trusted friend who knows everything about plants. The user may have dirty hands — be concise and keep them moving.

CONVERSATION FLOW (follow this exactly):

STEP 1 — IDENTIFY INTENT:
A) CARE QUESTION (watering, sunlight, soil, feeding, temp, repotting, lifecycle):
   → Answer with ${flower.nickname}-specific numbers immediately. Lead with the action, then the reason.
   → After answering, offer one naturally related tip if relevant.
   → Always close with: "Anything else on your mind?"

B) SYMPTOM / PROBLEM ("why does it look like X", drooping, spots, yellowing, not blooming):
   → Check if it matches ${flower.nickname}'s known issues below.
   → If it matches: "This looks like [diagnosis]. Here's what to do right now: [fix]."
   ${flower.toxic ? `→ Then check: if the plant is accessible to pets, add calmly: "One thing — ${flower.name} is toxic to cats and dogs. Keep them away."` : ""}
   → If no match: "I'm not sure, could you describe more?" — ask ONE clarifying question only, then wait.
   → After diagnosing, close with: "Anything else on your mind?"

C) SUCCESSFUL CARE ("I just watered it", "I repotted it", "I moved it to the sun"):
   → Celebrate warmly! "Yes! That's exactly what she needed." Be brief and uplifting.
   → Optionally mention one thing to watch for next.
   → Close with: "Anything else on your mind?"

STEP 2 — SUB-QUESTIONS:
   → If the user asks a follow-up, answer it fully, then return to "Anything else on your mind?"

STEP 3 — WRAP-UP:
   → If user says no more questions, is done, or says thanks:
   → Respond: "Happy growing! I'm here whenever ${flower.nickname} needs me."

RULES:
- Answer first, reason second — never the other way
- ONE question at a time — never stack
- Short answers unless the user asks for depth
- Be honest when uncertain: "I'm not sure" beats a confident wrong answer

WHAT YOU KNOW ABOUT ${flower.nickname}:
Difficulty: ${flower.difficulty} | Lifespan: ${flower.lifespan_type} | ${flower.toxic ? "TOXIC to pets" : "Pet-safe"}
Water: ${flower.water_amount} — ${flower.water_freq}
Sun: ${flower.sun_placement} — ${flower.sun_freq}
Soil: ${flower.soil}
Feed: ${flower.feed_type}, ${flower.feed_amount} — ${flower.feed_freq}
Environment: ${flower.temp}, humidity ${flower.humidity}
Bloom season: ${flower.lifespan_season}
Repotting: ${flower.repot}
Known issues: ${flower.watchfor}
Signature tip: ${flower.bot}

FORMAT: Plain text only. No markdown, no bullets, no headers. Conversational — this will be read aloud.`;

async function fetchTrefleData(scientificName) {
  const token = import.meta.env.VITE_TREFLE_TOKEN;
  if (!token) return null;
  try {
    const res = await fetch(
      `https://trefle.io/api/v1/plants/search?q=${encodeURIComponent(scientificName)}&token=${token}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.data?.[0] || null;
  } catch (e) {
    console.warn("Trefle fetch failed:", e);
    return null;
  }
}

async function askBud(flower, trefleData, history, userMessage) {
  const trefleBlock = trefleData ? `
ADDITIONAL DATA FROM TREFLE PLANT DATABASE:
Scientific name: ${trefleData.scientific_name || ""}
Family: ${trefleData.family_common_name || trefleData.family || ""}
${trefleData.growth ? [
  trefleData.growth.light != null && `Light (0–10 scale): ${trefleData.growth.light}`,
  trefleData.growth.minimum_temperature?.deg_c != null && `Min temp: ${trefleData.growth.minimum_temperature.deg_c}°C`,
  trefleData.growth.ph_minimum != null && `Soil pH range: ${trefleData.growth.ph_minimum}–${trefleData.growth.ph_maximum}`,
  trefleData.growth.soil_humidity != null && `Soil humidity level: ${trefleData.growth.soil_humidity}`,
].filter(Boolean).join("\n") : ""}` : "";

  const contents = history.map(m => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
  contents.push({ role: "user", parts: [{ text: userMessage }] });

  const body = JSON.stringify({
    systemInstruction: { parts: [{ text: buildSystemPrompt(flower) + trefleBlock }] },
    contents,
    generationConfig: { maxOutputTokens: 1000 },
  });

  const isDev = import.meta.env.DEV;
  const url = isDev
    ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`
    : "/api/gemini";

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  if (!response.ok) {
    console.error("Gemini API error:", await response.text());
    return "I lost the connection for a sec. Check the console and try again?";
  }
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "Hmm, I lost my train of thought. Try asking again?";
}

// ─── home screen ───────────────────────────────────────────────────────────
// Two-column stagger within 24px margins (usable width ~342px)
const GARDEN_POSITIONS = {
  1:  { left: 24,  top: 20,  size: 100 },  // Tulip      — left
  2:  { left: 200, top: 8,   size: 110 },  // Peony      — right
  3:  { left: 24,  top: 195, size: 95  },  // Hydrangea  — left
  4:  { left: 208, top: 188, size: 100 },  // Lily       — right
  5:  { left: 117, top: 360, size: 108 },  // Rose       — center
  6:  { left: 24,  top: 525, size: 88  },  // Gardenia   — left
  7:  { left: 214, top: 516, size: 92  },  // Gerbera    — right
  8:  { left: 40,  top: 678, size: 115 },  // Sunflower  — left
  9:  { left: 210, top: 664, size: 102 },  // Orchid     — right
  10: { left: 117, top: 858, size: 98  },  // Marigold   — center
};

function Home({ onPick }) {
  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "#f0f0f0" }}>
      {/* Header */}
      <div style={{ padding: "52px 24px 12px", userSelect: "none" }}>
        <div style={{ fontSize: 11, color: "#aaa", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "inherit" }}>Your</div>
        <div style={{ fontSize: 32, fontWeight: 300, color: "#bbb", letterSpacing: "-0.02em", fontFamily: "inherit", lineHeight: 1 }}>Garden</div>
      </div>

      {/* Scattered garden canvas */}
      <div style={{ position: "relative", width: "100%", height: 1040, minHeight: 1040 }}>
        {FLOWERS.map((f) => {
          const pos = GARDEN_POSITIONS[f.id];
          return (
            <button
              key={f.id}
              onClick={() => onPick(f)}
              style={{
                position: "absolute",
                left: pos.left,
                top: pos.top,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: pos.size + 48,
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              <img
                src={f.svg}
                alt={f.name}
                style={{ width: pos.size, height: pos.size, objectFit: "contain", display: "block" }}
              />
              <div style={{ fontSize: 15, fontWeight: 700, color: "#111", marginTop: 6, textAlign: "center", lineHeight: 1.2, fontFamily: "inherit" }}>
                {f.nickname}
              </div>
              <div style={{ fontSize: 11, color: "#777", marginTop: 2, textAlign: "center", fontFamily: "inherit" }}>
                {f.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── bud avatar with animated eyes ────────────────────────────────────────
function BudAvatar({ speaking, listening, size = 144 }) {
  const eyeStyle = (cx) => ({
    transformBox: "fill-box",
    transformOrigin: "center",
    animation: speaking
      ? "eyeTalk 0.35s ease-in-out infinite alternate"
      : "none",
  });
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        animation: speaking
          ? "budPulse 1.4s ease-in-out infinite"
          : listening
          ? "budBounce 0.6s ease-in-out infinite"
          : "none",
      }}
    >
      {/* Body */}
      <path
        d="M50 6 C50 6, 13 46, 13 74 C13 96, 29 110, 50 110 C71 110, 87 96, 87 74 C87 46, 50 6, 50 6Z"
        fill="#b8d9ea"
      />
      {/* Left eye */}
      <ellipse cx="36" cy="69" rx="9.5" ry="12" fill="#3d2b1f" style={eyeStyle(36)} />
      {/* Right eye */}
      <ellipse cx="64" cy="69" rx="9.5" ry="12" fill="#3d2b1f" style={eyeStyle(64)} />
      {/* Eye shines */}
      <ellipse cx="40" cy="64" rx="3" ry="3" fill="white" opacity="0.55" />
      <ellipse cx="68" cy="64" rx="3" ry="3" fill="white" opacity="0.55" />
      {/* Cheeks */}
      <ellipse cx="22" cy="82" rx="9" ry="6.5" fill="#7db8d0" opacity="0.55" />
      <ellipse cx="78" cy="82" rx="9" ry="6.5" fill="#7db8d0" opacity="0.55" />
      {/* Smile */}
      <path d="M41 91 Q50 99 59 91" stroke="#3d2b1f" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      {/* Leaves */}
      <path d="M44 8 C37 -2, 26 6, 38 17" fill="#5aad6a" />
      <path d="M56 8 C63 -2, 74 6, 62 17" fill="#4a9d5a" />
    </svg>
  );
}

// ─── plant chat screen ─────────────────────────────────────────────────────
function PlantChat({ flower, onBack }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: `Hi! I'm Bud. What would you like to know about ${flower.nickname} today?` },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [activeTab, setActiveTab] = useState("talk");
  const [trefleData, setTrefleData] = useState(null);

  useEffect(() => {
    fetchTrefleData(flower.species).then(setTrefleData);
  }, [flower.species]);
  const recognitionRef = useRef(null);
  const transcriptRef = useRef(null);
  const sendMessageRef = useRef(null);
  const listeningRef = useRef(false);   // mirrors listening state for use inside callbacks
  const gotResultRef = useRef(false);   // did this session produce a result?

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setVoiceSupported(false); return; }
    const r = new SR();
    r.continuous = false; r.interimResults = false; r.lang = "en-US";
    r.onresult = (e) => {
      gotResultRef.current = true;
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      listeningRef.current = false;
      setListening(false);
      setTimeout(() => sendMessageRef.current?.(transcript), 100);
    };
    r.onerror = (e) => {
      // "no-speech" just means silence — restart instead of giving up
      if (e.error === "no-speech") return;
      console.warn("SpeechRecognition error:", e.error);
      listeningRef.current = false;
      setListening(false);
    };
    r.onend = () => {
      // Chrome stops after ~1s of silence; restart if user is still listening and no result yet
      if (listeningRef.current && !gotResultRef.current) {
        try { r.start(); } catch (_) { listeningRef.current = false; setListening(false); }
      } else {
        listeningRef.current = false;
        setListening(false);
      }
    };
    recognitionRef.current = r;
    return () => { try { r.abort(); } catch (e) {} };
  }, []);

  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // Auto-greet: Bud speaks the opening line as soon as the screen mounts
  useEffect(() => {
    const greeting = `Hi! I'm Bud. What would you like to know about ${flower.nickname} today?`;
    const timer = setTimeout(() => speak(greeting), 600);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const speak = (text) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.0; u.pitch = 1.05;
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
  };
  const stopSpeaking = () => { window.speechSynthesis?.cancel(); setSpeaking(false); };

  const startListening = () => {
    if (!recognitionRef.current || listeningRef.current) return;
    stopSpeaking();
    gotResultRef.current = false;
    listeningRef.current = true;
    try { recognitionRef.current.start(); setListening(true); } catch (e) { listeningRef.current = false; setListening(false); }
  };

  const sendMessage = async (textOverride) => {
    const text = (textOverride ?? input).trim();
    if (!text || loading) return;
    setInput("");
    const newHistory = [...messages, { role: "user", content: text }];
    setMessages(newHistory);
    setLoading(true);
    try {
      const reply = await askBud(flower, trefleData, messages, text);
      setMessages([...newHistory, { role: "assistant", content: reply }]);
      speak(reply);
    } catch (e) {
      setMessages([...newHistory, { role: "assistant", content: "I lost the connection for a sec. Try that again?" }]);
    } finally {
      setLoading(false);
    }
  };
  // Keep ref current every render so recognition callback always calls latest sendMessage
  sendMessageRef.current = sendMessage;

  const lastBudMessage = [...messages].reverse().find(m => m.role === "assistant")?.content || "";

  const quickAsks = [
    { label: "Water schedule", q: `When and how much should I water ${flower.nickname}?` },
    { label: "Sunlight needs", q: `How much sun does ${flower.nickname} need, and where should I put it?` },
    { label: "Something looks wrong", q: `${flower.nickname} doesn't look right. Can you help me figure out what's going on?` },
    { label: "Repotting", q: `Does ${flower.nickname} need repotting, and how do I do it?` },
  ];

  return (
    <div className="flex-1 flex flex-col" style={{ background: "#fff8d3" }}>

      {/* ── Header (navy) ── */}
      <div className="flex items-center gap-3 px-4 pt-11 pb-3" style={{ background: "#0d2d46" }}>
        <button onClick={() => { stopSpeaking(); onBack(); }} className="p-2 -ml-1 rounded-full active:scale-90 transition">
          <ArrowLeft size={20} strokeWidth={2} color="#fff8d3" />
        </button>
        <img src={flower.svg} alt={flower.name} className="w-10 h-10 object-contain" />
        <div className="flex-1 min-w-0">
          <div className="text-[9px] uppercase tracking-widest" style={{ color: "#e6fbda", opacity: 0.6 }}>
            {flower.name} · {flower.difficulty}
          </div>
          <div className="text-[22px] font-semibold leading-tight" style={{ color: "#fff8d3" }}>
            {flower.nickname}
          </div>
        </div>
        <button
          onClick={() => { if (speaking) stopSpeaking(); setVoiceEnabled(v => !v); }}
          className="p-2 rounded-full active:scale-90 transition"
          style={{ color: "#fff8d3", opacity: voiceEnabled ? 1 : 0.4 }}
        >
          {voiceEnabled ? <Volume2 size={18} strokeWidth={2} /> : <VolumeX size={18} strokeWidth={2} />}
        </button>
      </div>

      {/* ── Care metadata grid ── */}
      <div className="grid grid-cols-3 px-4 py-3 gap-3" style={{ background: "#0d2d46" }}>
        <CareItem icon={<Droplet size={13} />} label="Watering" value={flower.water_freq.split(";")[0]} />
        <CareItem icon={<Sun size={13} />} label="Sunlight" value={flower.sun_freq} />
        <CareItem icon={<Thermometer size={13} />} label="Temp" value={flower.temp.split(";")[0]} />
      </div>

      {/* ── Talk view ── */}
      {activeTab === "talk" && (
        <div className="flex-1 flex flex-col" style={{ background: "#fff8d3" }}>
          {/* Bud hero zone */}
          <div className="flex flex-col items-center justify-center px-6 pt-5 pb-4" style={{ flex: "1 1 0" }}>
            {/* Toggle to chat */}
            <button
              onClick={() => setActiveTab("conversation")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full mb-6 active:scale-95 transition-transform"
              style={{ background: "#03695e", color: "#fff" }}
            >
              <MessageSquare size={14} strokeWidth={2} />
              <span className="text-[10px] uppercase tracking-widest">Chat history</span>
            </button>

            <BudAvatar speaking={speaking} listening={listening} size={144} />

            <div className="mt-2 mb-4 text-center px-4" style={{ minHeight: 56 }}>
              {loading ? (
                <div className="flex justify-center gap-1.5 mt-4">
                  <Dot delay={0} /><Dot delay={0.15} /><Dot delay={0.3} />
                </div>
              ) : (
                <p className="text-[14px] leading-snug" style={{ color: "#0d2d46", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {lastBudMessage}
                </p>
              )}
            </div>

            {voiceSupported && (
              <div className="flex flex-col items-center gap-2">
                <div className="relative flex items-center justify-center">
                  {listening && (
                    <>
                      <span className="absolute rounded-full" style={{ width: 80, height: 80, border: "2px solid #03695e", animation: "ripple 1.4s ease-out infinite", opacity: 0 }} />
                      <span className="absolute rounded-full" style={{ width: 80, height: 80, border: "2px solid #03695e", animation: "ripple 1.4s ease-out 0.5s infinite", opacity: 0 }} />
                    </>
                  )}
                  <button
                    onClick={listening ? () => { listeningRef.current = false; recognitionRef.current?.stop(); } : startListening}
                    disabled={loading || speaking}
                    className="rounded-full flex items-center justify-center active:scale-90 transition-transform"
                    style={{
                      width: 64,
                      height: 64,
                      background: listening ? "#03695e" : (loading || speaking) ? "rgba(3,105,94,0.25)" : "#03695e",
                      color: (loading || speaking) ? "#03695e" : "#ffffff",
                      boxShadow: listening ? "0 0 0 8px rgba(3,105,94,0.15)" : "0 4px 16px rgba(3,105,94,0.4)",
                      border: (loading || speaking) ? "2px solid #03695e" : "none",
                    }}
                  >
                    {listening ? <MicOff size={26} strokeWidth={2} /> : <Mic size={26} strokeWidth={2} />}
                  </button>
                </div>
                <span className="text-[11px] uppercase tracking-widest" style={{ color: "#03695e", opacity: loading || speaking ? 0.4 : 1 }}>
                  {listening ? "Listening…" : speaking ? "Bud is talking…" : loading ? "Thinking…" : "Tap to talk"}
                </span>
              </div>
            )}
          </div>

          {/* Quick asks */}
          {messages.length <= 2 && !loading && (
            <div className="flex gap-2 px-4 py-2 overflow-x-auto" style={{ background: "#fff8d3", borderTop: "1px solid rgba(13,45,70,0.08)", scrollbarWidth: "none" }}>
              {quickAsks.map((q) => (
                <button
                  key={q.label}
                  onClick={() => { sendMessage(q.q); setActiveTab("conversation"); }}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full text-[12px] active:scale-95 transition font-medium"
                  style={{ border: "1.5px solid #03695e", color: "#03695e", background: "transparent" }}
                >
                  {q.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Conversation view ── */}
      {activeTab === "conversation" && (
        <div className="flex-1 flex flex-col" style={{ background: "#ffffff" }}>
          {/* Toggle back to talk */}
          <div className="flex justify-center pt-3 pb-1">
            <button
              onClick={() => setActiveTab("talk")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full active:scale-95 transition-transform"
              style={{ background: "#f0f0f0", color: "#0d2d46" }}
            >
              <Mic size={14} strokeWidth={2} />
              <span className="text-[10px] uppercase tracking-widest">Talk to Bud</span>
            </button>
          </div>
          <div ref={transcriptRef} className="overflow-y-auto px-4 pt-2 pb-2 space-y-3" style={{ flex: "1 1 0", minHeight: 0, scrollbarWidth: "none" }}>
            {messages.map((m, i) => (
              m.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <div
                    className="px-3.5 py-2 rounded-[18px] text-[13px] leading-snug max-w-[80%]"
                    style={{ background: "#1e1e1e", color: "#ffffff", borderBottomRightRadius: 4 }}
                  >
                    {m.content}
                  </div>
                </div>
              ) : (
                <div key={i} className="flex justify-start">
                  <p className="text-[13px] leading-relaxed max-w-[92%]" style={{ color: "#0d2d46", margin: 0 }}>
                    {m.content}
                  </p>
                </div>
              )
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-1.5 py-1">
                  <Dot delay={0} /><Dot delay={0.15} /><Dot delay={0.3} />
                </div>
              </div>
            )}
          </div>

          {/* Text input */}
          <div className="px-4 py-2 flex items-center gap-2" style={{ borderTop: "1px solid rgba(13,45,70,0.07)" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={`Type to ${flower.nickname}…`}
              className="flex-1 px-3 py-2 rounded-full text-[12px] outline-none"
              style={{ background: "#f0f0f0", border: "1px solid rgba(13,45,70,0.10)", color: "#0d2d46" }}
              disabled={loading || listening}
              autoFocus
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="rounded-full active:scale-90 transition flex items-center justify-center disabled:opacity-30"
              style={{ background: "#0d2d46", color: "#fff8d3", width: 32, height: 32, flexShrink: 0 }}
            >
              <Send size={13} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes budPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        @keyframes budBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes dot-pulse {
          0%, 60%, 100% { opacity: 0.3; transform: scale(0.8); }
          30% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes eyeTalk {
          from { transform: scaleY(1); }
          to   { transform: scaleY(0.28); }
        }
      `}</style>
    </div>
  );
}

function CareItem({ icon, label, value }) {
  return (
    <div className="flex flex-col gap-1" style={{ color: "#e6fbda" }}>
      <div className="flex items-center gap-1" style={{ opacity: 0.55 }}>
        {icon}
        <span className="text-[9px] uppercase tracking-wider">{label}</span>
      </div>
      <span className="text-[11px] leading-tight">{value}</span>
    </div>
  );
}

function Dot({ delay }) {
  return (
    <span
      className="inline-block w-2 h-2 rounded-full"
      style={{ background: "#03695e", animation: `dot-pulse 1.2s ease-in-out ${delay}s infinite` }}
    />
  );
}

// ─── app shell ─────────────────────────────────────────────────────────────
export default function App() {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <div
        className="min-h-screen w-full flex items-center justify-center p-4"
        style={{ background: "radial-gradient(ellipse at top, #1a4a6b 0%, #0d2d46 60%, #061a2a 100%)" }}
      >
        <div
          className="relative flex flex-col overflow-hidden"
          style={{
            width: 390,
            height: 800,
            maxHeight: "calc(100vh - 32px)",
            borderRadius: 44,
            background: "#ffffff",
            boxShadow: "0 32px 80px -16px rgba(0,0,0,0.6), 0 0 0 10px #0d2d46, 0 0 0 11px rgba(255,248,211,0.15)",
          }}
        >
          {/* Phone notch */}
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 z-50"
            style={{ width: 110, height: 28, borderRadius: 14, background: "#0d2d46" }}
          />
          {selected
            ? <PlantChat flower={selected} onBack={() => setSelected(null)} />
            : <Home onPick={setSelected} />
          }
        </div>
      </div>
      <style>{`::-webkit-scrollbar { display: none; }`}</style>
    </>
  );
}
