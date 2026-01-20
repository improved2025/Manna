"use client";

import { useEffect, useMemo, useState } from "react";

type TabKey =
  | "Encouragement"
  | "Strength for Hard Times"
  | "Healing"
  | "Peace & Calm"
  | "Bereavement & Loss"
  | "Guidance & Direction"
  | "Breakthrough";

type Msg = {
  title: string;
  body: string;
  verse: string; // NKJV reference only
};

const TABS: TabKey[] = [
  "Encouragement",
  "Strength for Hard Times",
  "Healing",
  "Peace & Calm",
  "Bereavement & Loss",
  "Guidance & Direction",
  "Breakthrough",
];

// Fuller, longer messages (still calm, not noisy).
const MESSAGES: Record<TabKey, Msg[]> = {
  Encouragement: [
    {
      title: "God is present in ordinary moments",
      verse: "Psalm 46:1",
      body:
        "You don’t have to wait for a dramatic moment to know God is with you. He is present in the ordinary parts of your day — the quiet decisions, the slow progress, the unseen burdens you carry without applause.\n\nIf your heart feels tired, don’t force yourself into false energy. Just return to simple trust. Take one steady step. Do what is in front of you. God gives help that is real and timely, not theoretical.\n\nToday, choose calm obedience. Let your pace be guided by peace, not pressure. God is not absent. He is near, and He is able.",
    },
    {
      title: "You can begin again without shame",
      verse: "Lamentations 3:22–23",
      body:
        "Yesterday’s weight does not have to define today’s direction. God’s mercy does not come with humiliation. He does not demand that you pretend. He invites you to come honestly and start again.\n\nIf you fell short, repent simply and move forward. If you feel stuck, ask God for one clear next step. If you feel overwhelmed, reduce the day to what is necessary and do that with faith.\n\nA fresh start is not denial — it’s grace. Today, let your heart receive that grace. You can begin again.",
    },
    {
      title: "Your story is still being shaped",
      verse: "Philippians 1:6",
      body:
        "Don’t judge your life by a single chapter. God builds slowly, deeply, and on purpose. What feels unfinished is not a sign of failure — it’s often a sign that God is still forming something stable in you.\n\nYou may not see quick results, but you can still choose faithful actions. Keep praying. Keep showing up. Keep doing the next right thing. God finishes what He starts, and He does it with wisdom.\n\nToday, stay steady. Don’t rush the process. Let faith be quiet and consistent.",
    },
    {
      title: "God can steady your mind",
      verse: "Isaiah 26:3",
      body:
        "When thoughts multiply and anxiety rises, your mind can feel like a crowded room. But peace is not out of reach. You don’t have to win every battle in your head — you can bring your mind under God’s rule.\n\nSlow down. Breathe. Speak one simple truth: God is with me. God will help me. God will guide me. Let that truth quiet the noise.\n\nToday, guard your inputs, reduce the unnecessary, and return to prayer in small moments. God can steady your mind without requiring perfect circumstances.",
    },
  ],

  "Strength for Hard Times": [
    {
      title: "Strength for today, not the whole future",
      verse: "Isaiah 41:10",
      body:
        "Hard seasons often make you think you need strength for everything at once. But God rarely gives strength in bulk. He gives it in portions — strength for this day, for this moment, for this step.\n\nYou are not weak because you feel the weight. You are human. And God strengthens people, not robots. Let Him help you without shame.\n\nToday, refuse panic. Receive strength. Do what you can do. Leave what you cannot do with God. He will uphold you.",
    },
    {
      title: "Endurance is a form of faith",
      verse: "Galatians 6:9",
      body:
        "Endurance is not the same as delay. Endurance is not failure. It is faith continuing when emotions are tired and outcomes are unclear.\n\nIf you’ve been doing the right thing and it feels like nothing is changing, don’t assume it’s pointless. Many breakthroughs are preceded by quiet perseverance.\n\nToday, keep your heart steady. Keep your hands faithful. God sees your labor, and He knows how to reward it in the right season.",
    },
    {
      title: "Hold your ground without losing your peace",
      verse: "Ephesians 6:13",
      body:
        "Some battles are not won by speed. They are won by stability. When life is shaking, the goal is not to look impressive — the goal is to stand.\n\nStanding means you don’t quit your values. You don’t abandon prayer. You don’t trade peace for control. You keep doing what is right even if it costs you comfort.\n\nToday, ask God for inner strength. You can hold your ground without becoming hard. You can stand without becoming anxious. God will sustain you.",
    },
    {
      title: "God supplies courage quietly",
      verse: "Joshua 1:9",
      body:
        "Courage is not always loud. Sometimes courage looks like getting out of bed, showing up again, doing the next task, and refusing to collapse inward.\n\nGod’s command to be strong is also God’s promise to be present. He does not demand courage and then leave you alone to produce it.\n\nToday, receive courage for real life — for difficult conversations, for decisions, for waiting, for healing. God is with you, and that is enough.",
    },
  ],

  Healing: [
    {
      title: "Healing is God’s work, not your performance",
      verse: "Psalm 147:3",
      body:
        "Healing does not require you to pretend you’re fine. God heals what is broken — not what is covered. You can be honest with Him without fear of rejection.\n\nSome healing is instant, and some healing is layered. Both are still God. Don’t rush yourself. Don’t punish yourself. Don’t measure your progress by someone else’s story.\n\nToday, choose gentle steps. Release pressure. Invite God into the places you avoid. He restores with patience and power.",
    },
    {
      title: "Release what you were never meant to carry",
      verse: "1 Peter 5:7",
      body:
        "There are weights you picked up because you had to survive. But survival is not the final destination. God wants you whole, not just functioning.\n\nBring the real burden to Him: the disappointment, the anger, the grief, the shame, the fear. God can handle what you feel.\n\nToday, practice release. Speak it plainly: Lord, I give You this. Then breathe again. Healing often begins with surrender.",
    },
    {
      title: "God restores without rushing you",
      verse: "Jeremiah 30:17",
      body:
        "Some wounds took years to form. It is not weakness if healing takes time. Restoration is not God hurrying you; it is God rebuilding you.\n\nPay attention to what strengthens your soul: truth, prayer, wise boundaries, rest, and healthy relationships. God often heals through both supernatural touch and daily wisdom.\n\nToday, let restoration be steady. God is not impatient with you. He is committed to you.",
    },
    {
      title: "Your peace is part of your healing",
      verse: "Proverbs 4:23",
      body:
        "Healing is not only about feeling better. It’s also about living wiser. Guarding your heart is not selfish — it’s stewardship.\n\nYou don’t have to keep exposing yourself to what keeps breaking you. You can set boundaries without guilt. You can say no without anger.\n\nToday, protect your peace. Protect your mind. Ask God to show you what to release and what to rebuild. Healing grows in safe environments.",
    },
  ],

  "Peace & Calm": [
    {
      title: "Peace is the rule, not the reward",
      verse: "John 14:27",
      body:
        "Peace is not something you earn after life becomes perfect. Peace is something Jesus gives so you can live steady inside imperfect conditions.\n\nIf everything around you feels noisy, simplify your response. Reduce the unnecessary. Return to prayer in small moments. Peace often arrives as you choose stillness again and again.\n\nToday, let your heart settle. God is not trying to impress you — He is trying to lead you.",
    },
    {
      title: "You don’t have to react to everything",
      verse: "James 1:19",
      body:
        "Many people lose peace because they feel responsible to respond instantly. But urgency is not always wisdom.\n\nPause before you speak. Pause before you decide. Ask God for calm clarity. A slow, prayed response can protect you from regret.\n\nToday, practice restraint. Peace grows where impulsiveness dies. God can teach your soul to rest even while you handle real responsibilities.",
    },
    {
      title: "Rest is a spiritual discipline",
      verse: "Matthew 11:28",
      body:
        "If your mind is tired, it’s not always because you’re weak. Sometimes it’s because you’ve been carrying life without enough rest.\n\nJesus invites you to come to Him, not to perform for Him. Rest is a way of trusting God — trusting that your life will not collapse if you stop striving.\n\nToday, take small breaks. Breathe. Put your shoulders down. Let peace return to your body and your thoughts.",
    },
    {
      title: "Let peace guide your decisions",
      verse: "Colossians 3:15",
      body:
        "Not every open door is your door. Not every opportunity is assigned to you. Peace is one of God’s guardrails.\n\nIf something keeps producing agitation, step back and pray again. God’s guidance can be firm, but it is not frantic.\n\nToday, make decisions from peace, not from pressure. If you need to wait, wait. Peace is protection.",
    },
  ],

  "Bereavement & Loss": [
    {
      title: "God is near the brokenhearted",
      verse: "Psalm 34:18",
      body:
        "Loss changes your inner world. And grief is not a lack of faith — it’s love in pain. God is not offended by your sorrow.\n\nYou don’t have to be strong in a way that denies what hurts. Bring your honest tears to God. He stays near, even when words run out.\n\nToday, take it slowly. Let comfort come in small portions. God is close, and He knows how to strengthen your heart.",
    },
    {
      title: "One day at a time is holy",
      verse: "2 Corinthians 1:3–4",
      body:
        "Grief often makes the future feel heavy. So don’t carry the future. Carry today.\n\nAllow yourself to feel what you feel. Allow yourself to rest. Allow yourself to receive help. God comforts without scolding you for being human.\n\nToday, ask God for comfort that respects your story. He can hold you steady while you heal.",
    },
    {
      title: "Comfort without minimizing",
      verse: "Isaiah 61:3",
      body:
        "Some comfort tries to rush you past your pain. God’s comfort does not minimize your loss. He knows what it cost you.\n\nHe can give beauty again, not by erasing what happened, but by restoring life inside you.\n\nToday, let hope return gently. You’re not required to be okay quickly. God will keep walking with you, one step at a time.",
    },
    {
      title: "God can strengthen you to keep living",
      verse: "Psalm 73:26",
      body:
        "Sometimes grief isn’t a moment — it’s a season. But God can strengthen you to keep living without betraying the memory of what you lost.\n\nYou can remember and still heal. You can miss and still move forward. God will not shame your process.\n\nToday, ask God for strength that feels steady, not forced. He will be your portion.",
    },
  ],

  "Guidance & Direction": [
    {
      title: "One step is enough",
      verse: "Psalm 32:8",
      body:
        "You don’t need the full map to obey God. You need the next step.\n\nIf your mind keeps demanding certainty, bring that to God. Ask for clarity, yes — but also ask for courage to obey even when clarity is partial.\n\nToday, do what you already know is right. Many times, direction becomes clearer after obedience begins.",
    },
    {
      title: "God leads with wisdom, not panic",
      verse: "Proverbs 3:5–6",
      body:
        "When you’re unsure, it’s easy to rush decisions just to feel relief. But relief is not the same as guidance.\n\nTrust God with what you don’t see. Acknowledge Him in the details. Ask Him to straighten your path.\n\nToday, slow down your decision-making. Peaceful clarity is better than anxious speed.",
    },
    {
      title: "Let peace confirm your direction",
      verse: "Colossians 3:15",
      body:
        "God’s direction can challenge you, but it will not enslave you to constant confusion.\n\nIf you’re pressured, pause. Pray again. Seek wise counsel. God often confirms direction through peace, alignment, and steady conviction.\n\nToday, don’t force doors. Follow the one that stays peaceful even as you take responsibility.",
    },
    {
      title: "You are not alone in your decisions",
      verse: "James 1:5",
      body:
        "Many people make decisions in isolation and then carry the anxiety alone. But God invites you to ask.\n\nAsk for wisdom without shame. Ask for timing. Ask for restraint. God gives wisdom generously.\n\nToday, bring your decision to God plainly. He can guide you with clarity that matches real life.",
    },
  ],

  Breakthrough: [
    {
      title: "Breakthrough begins with steady faith",
      verse: "Revelation 3:8",
      body:
        "Breakthrough is not forcing outcomes. It’s God shifting what you could not move.\n\nYour part is faithfulness: prayer, obedience, integrity, preparation. God’s part is opening doors you cannot open.\n\nToday, stay ready without becoming restless. Breakthrough comes with peace, not panic.",
    },
    {
      title: "Don’t despise the process",
      verse: "Zechariah 4:10",
      body:
        "Small beginnings can feel insulting when you’re expecting big change. But God often uses small steps to build lasting results.\n\nThe process is not punishment. It’s formation. God strengthens your character while He prepares your opportunity.\n\nToday, honor the process. Keep building quietly. The door will open in the right time.",
    },
    {
      title: "Favor can arrive suddenly",
      verse: "Psalm 121:1–2",
      body:
        "God can bring help from directions you didn’t plan. He can raise helpers, open access, and shift resistance.\n\nExpect God’s help, but keep your heart clean. Breakthrough without character becomes bondage.\n\nToday, pray boldly and live wisely. God is able to do what you cannot do.",
    },
    {
      title: "Prepare while you wait",
      verse: "Proverbs 21:31",
      body:
        "Waiting is not wasted time when you use it well. Preparation is often the hidden partner of breakthrough.\n\nStrengthen your habits. Improve your skills. Align your life with what you’re asking God for.\n\nToday, prepare without anxiety. You can wait and still grow. God honors readiness.",
    },
  ],
};

function storageKey(tab: TabKey) {
  // Per-tab pointer so each tab rotates independently.
  return `manna:encouragement:index:${tab}`;
}

function clampIndex(i: number, len: number) {
  if (len <= 0) return 0;
  if (i < 0) return 0;
  return i % len;
}

export default function EncouragementPage() {
  const [active, setActive] = useState<TabKey>("Encouragement");
  const [indexByTab, setIndexByTab] = useState<Record<string, number>>({});

  // Load saved index for active tab on mount + when tab changes
  useEffect(() => {
    try {
      const key = storageKey(active);
      const raw = localStorage.getItem(key);
      const saved = raw ? Number(raw) : 0;
      setIndexByTab((prev) => ({
        ...prev,
        [active]: Number.isFinite(saved) ? saved : 0,
      }));
    } catch {
      // ignore
    }
  }, [active]);

  const message = useMemo(() => {
    const items = MESSAGES[active];
    const idx = clampIndex(indexByTab[active] ?? 0, items.length);
    return items[idx];
  }, [active, indexByTab]);

  function nextMessage() {
    const items = MESSAGES[active];
    const current = indexByTab[active] ?? 0;
    const next = clampIndex(current + 1, items.length);

    setIndexByTab((prev) => ({ ...prev, [active]: next }));

    try {
      localStorage.setItem(storageKey(active), String(next));
    } catch {
      // ignore
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Encouragement
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Choose a theme. Messages rotate in order, so you’re not stuck on the same one.
            </p>
          </div>

          <a
            href="/today"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800"
          >
            Back to Today
          </a>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {TABS.map((t) => {
            const isActive = t === active;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setActive(t)}
                className={
                  "rounded-full px-4 py-2 text-sm border transition " +
                  (isActive
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50")
                }
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Message card */}
        <div className="mt-8 grid gap-6 md:grid-cols-5">
          <div className="md:col-span-3 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              {active}
            </p>

            <h2 className="mt-2 text-xl font-semibold text-slate-900">
              {message.title}
            </h2>

            <p className="mt-4 leading-relaxed text-slate-700 whitespace-pre-line">
              {message.body}
            </p>

            <div className="mt-6 rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-700">
                <span className="font-semibold">Scripture (NKJV reference):</span>{" "}
                {message.verse}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={nextMessage}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Next message
              </button>

              <button
                type="button"
                onClick={() => {
                  const text = `${message.title}\n\n${message.body}\n\nScripture (NKJV reference): ${message.verse}`;
                  navigator.clipboard.writeText(text);
                  alert("Copied.");
                }}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Copy
              </button>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Progress is saved per tab on this device.
            </p>
          </div>

          {/* Side panel */}
          <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              How to use this
            </p>

            <ul className="mt-3 space-y-3 text-sm text-slate-700 leading-relaxed">
              <li>Pick a theme that matches what you’re carrying today.</li>
              <li>Read slowly. Let one line land before you move on.</li>
              <li>Use “Next message” when you want another word without scrolling.</li>
              <li>Copy what helps you and keep it for the day.</li>
            </ul>

            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-sm font-medium text-emerald-900">
                Keep it simple
              </p>
              <p className="mt-1 text-sm text-emerald-800">
                Encouragement is support, not overload. Return to Today when you’re ready.
              </p>
            </div>
          </div>
        </div>

        <footer className="mt-10 text-center text-xs text-slate-500">
          MANNA • Daily Bread, Daily Walk
        </footer>
      </div>
    </main>
  );
}
