export type EmotionalState =
  | "discouraged"
  | "lonely"
  | "angry"
  | "afraid"
  | "hurting"
  | "stuck"
  | "exhausted";

type EmotionalMessage = {
  id: string;
  text: string;
};

export const EMOTIONAL_STATES: Record<EmotionalState, EmotionalMessage[]> = {
 discouraged: [
  {
    id: "discouraged-1",
    text: `It makes sense that you feel this way.

Discouragement usually doesn’t come from apathy. It comes from effort. From showing up again and again. From hoping something would change by now and realizing it hasn’t, at least not in the way you expected.

That wears a person down.

This feeling doesn’t mean you’ve failed. It often means you’ve been carrying more than anyone realizes. You’ve kept moving, kept trying, kept holding things together while quietly wondering how long you can keep doing that.

A lot of people live right here. They don’t talk about it much. They just move through their days with a heaviness they can’t fully explain. If that sounds familiar, you’re not weak. You’re tired.

Jesus paid attention to people in this space. Not to hurry them forward or correct their emotions, but to meet them where they were. He didn’t demand strength from people who were already worn thin. He offered rest first.

You don’t need to talk yourself into feeling better right now.
You don’t need answers.
You don’t need a plan.

For this moment, it’s enough to stop pushing and let yourself breathe. God is not distant from this place. He is here, steady and present, even now.

You don’t have to carry this alone.`
  },
  {
    id: "discouraged-2",
    text: `Sometimes discouragement shows up when you least expect it.

You might look at your life and think you should feel better than you do. Things may not be falling apart, yet something inside feels heavy. That can be confusing. It can make you question yourself.

But discouragement isn’t always about what’s visible. Often it grows quietly, in the space between effort and outcome. In the gap between what you hoped for and what you’re seeing now.

You’ve been patient.
You’ve tried to stay faithful.
You’ve kept going.

That matters, even if it doesn’t feel like it right now.

God sees the parts of your journey that no one else notices. The small decisions. The quiet endurance. The moments where you kept showing up when it would have been easier to stop.

You don’t need to measure your life by how strong you feel today. Strength isn’t always loud. Sometimes it looks like staying present even when motivation is low.

It’s okay to acknowledge that you’re discouraged. Naming it doesn’t make it worse. It makes it honest.

For now, let yourself rest here. God is not asking more from you in this moment. He is near, and that is enough.`
  },
  {
    id: "discouraged-3",
    text: `Discouragement has a way of making everything feel heavier than it actually is.

What felt manageable before suddenly feels like too much. Decisions feel harder. Motivation feels distant. Even small things can start to drain you.

That doesn’t mean you’re losing ground. It means you’re worn.

You’ve likely been giving more than you’ve had time to recover from. Carrying responsibility. Holding expectations. Showing strength for others while quietly setting your own needs aside.

God is not unaware of that.

He is not disappointed that you’re tired. He’s not standing at a distance, waiting for you to push through. He meets people in moments like this, not after they’ve recovered.

You don’t need to sort everything out right now. You don’t need to make sense of the whole picture. Today doesn’t require clarity. It only requires honesty.

Let yourself slow down for a moment. Let this feeling exist without trying to fix it. God is present here, steady and patient, even in the discouragement.

You are still held, even now.`
  },
  {
    id: "discouraged-4",
    text: `There are seasons when discouragement feels less like a moment and more like a constant background noise.

You wake up with it.
You carry it through the day.
You try to ignore it, but it doesn’t quite leave.

That can be exhausting.

Discouragement doesn’t always come from one big disappointment. Sometimes it’s the accumulation of small letdowns, delayed answers, or unanswered questions that slowly add weight.

God understands that kind of tired.

He doesn’t rush people through it. He doesn’t minimize it. He stays close in it.

You don’t have to be productive right now. You don’t have to prove resilience. You don’t have to keep convincing yourself that everything is fine.

It’s okay to admit that this season is heavier than you expected.

Let this moment be a pause. A place where you stop pushing and simply exist in God’s presence. He is not asking you to carry what you can’t.

You are not behind.
You are not forgotten.
You are not alone.`
  },
  {
    id: "discouraged-5",
    text: `Discouragement often shows up after you’ve done the right things for a long time.

You stayed.
You tried.
You trusted.

And still, the outcome hasn’t matched the effort.

That can quietly drain hope.

But God does not measure your life by visible results alone. He sees faithfulness that never gets applause. He sees endurance that doesn’t feel heroic. He sees the long obedience that no one celebrates.

You are not invisible to Him.

It’s okay if your hope feels thin right now. Hope doesn’t disappear all at once. Sometimes it just needs room to rest.

You don’t have to rebuild it today.
You don’t have to explain it away.

Let yourself sit here without pressure. God is not frustrated with your discouragement. He is gentle with the weary.

Even here, you are still being held.`
  },
  {
    id: "discouraged-6",
    text: `Some days discouragement feels personal, like something is wrong with you.

But often, it’s simply a response to carrying weight for too long without relief.

You’ve been responsible.
You’ve been steady.
You’ve been dependable.

That takes something out of a person.

God never intended for you to carry everything alone. When the load feels too heavy, it’s not a failure. It’s a signal.

You’re allowed to need rest.
You’re allowed to admit fatigue.
You’re allowed to pause.

God is not asking you to perform strength. He is offering presence. Quiet, steady, unforced presence.

For this moment, let yourself stop striving. Let yourself be honest. God is here, not with demands, but with care.

That is enough for now.`
  },
  {
    id: "discouraged-7",
    text: `Discouragement can make it hard to see beyond today.

The future feels unclear.
The next step feels uncertain.
Everything feels heavier than it should.

That doesn’t mean you’ve lost your way. It means you’re human, navigating something that matters to you.

God does not expect you to have clarity when you’re tired. He doesn’t demand answers from a discouraged heart. He offers nearness instead.

You don’t need to solve your life today. You don’t need to decide what comes next. You only need to stay present in this moment.

Let yourself breathe. Let yourself be here. God is not rushing you.

Even now, He is with you.`
  },
  {
    id: "discouraged-8",
    text: `It’s hard to stay encouraged when progress feels slow.

You may feel like you’re moving, but not forward. Like effort isn’t translating into change. That can quietly erode motivation.

God sees the movement you don’t notice. Growth is not always visible while it’s happening.

You are not stalled. You are not wasting time. Even now, something is forming beneath the surface.

You don’t need to push yourself into hope. Let hope rest for a moment. Let God carry what you can’t.

This season will not define you. But you don’t have to rush through it either.

For now, it’s enough to stay.`
  },
  {
    id: "discouraged-9",
    text: `Discouragement often tells you that things should look different by now.

But life rarely unfolds on clean timelines.

God is not surprised by where you are. He is not confused by your questions. He is not disappointed by your pace.

You are not late.
You are not off course.

You are exactly where you are, and God is present here.

Let that be enough for this moment.`
  },
  {
    id: "discouraged-10",
    text: `When discouragement lingers, it can make you doubt yourself.

Your choices.
Your direction.
Your strength.

But discouragement is not a verdict on your life. It’s a response to weight.

You are still seen.
You are still known.
You are still held.

You don’t have to move forward right now. You don’t have to be strong today.

Rest here. God is with you, even in this.`
  }
],


lonely: [
  {
    id: "lonely-1",
    text: `Loneliness has a way of making everything feel quieter than it should.

You can be around people and still feel unseen. You can stay busy and still feel disconnected. Loneliness isn’t always about being alone. Sometimes it’s about feeling like no one really knows where you are.

That kind of loneliness can sit deep.

It doesn’t mean you’ve failed at relationships. It doesn’t mean something is wrong with you. Often, it means you’ve been strong for a long time without being held in return.

God is not uncomfortable with this feeling. He doesn’t look away from it. He draws near to people who feel forgotten, overlooked, or quietly aching for connection.

You don’t need to explain this feeling away. You don’t need to minimize it. It matters because you matter.

Even if no one else fully sees you right now, you are not invisible to God. He is present here, steady and attentive, even in the quiet.

For this moment, let that be enough.`
  },
  {
    id: "lonely-2",
    text: `Loneliness often shows up when you expected more connection than you’re experiencing.

You may have hoped someone would check in. You may have thought a season would feel fuller by now. When those expectations aren’t met, the silence can feel louder than words.

That can hurt more than people realize.

This feeling doesn’t mean you’re unwanted. It means you’re human and wired for connection. God created that need. He doesn’t dismiss it.

Jesus understood loneliness deeply. There were moments when even those closest to Him didn’t fully understand or stay near. He knows what it’s like to feel alone in a crowded world.

You don’t have to fill the silence right now. You don’t have to distract yourself from it. Let it be acknowledged without judgment.

God is not distant from you in this moment. He is present, even when companionship feels absent.

You are not forgotten.`
  },
  {
    id: "lonely-3",
    text: `Loneliness can make you question your place in people’s lives.

You might wonder if you matter as much as you thought. If your absence would be noticed. If anyone would reach for you if you stopped reaching first.

Those questions can be heavy.

But loneliness is not proof that you are unimportant. Often, it reflects a season where connection feels thinner, not your worth.

God’s attention toward you has not shifted. His care is not dependent on how connected you feel. He remains steady, even when others feel distant.

You don’t need to prove your value by being needed or included. You already matter.

For now, let yourself rest in the truth that God sees you fully. Even in this quiet space, you are not alone.`
  },
  {
    id: "lonely-4",
    text: `There is a particular kind of loneliness that comes from feeling misunderstood.

You may feel like parts of you go unseen. Like even when you speak, you’re not fully heard. Over time, that can make you pull back.

God understands that kind of loneliness.

He knows what it’s like to be present and still feel alone. He doesn’t rush you to open up or demand vulnerability. He meets you where you are.

You don’t have to explain yourself perfectly right now. You don’t have to make yourself more palatable or easy to understand.

God knows your heart without translation. He listens without interrupting. He stays.

Let that steadiness hold you for this moment.`
  },
  {
    id: "lonely-5",
    text: `Loneliness can feel heavier at certain times of day.

At night. In quiet moments. When distractions fade and you’re left with your thoughts.

That doesn’t mean you’re weak. It means the noise has dropped, and what’s underneath has room to surface.

God is not absent in those moments. He is not waiting for daylight or clarity. He is present even in the quiet stretches where time feels slow.

You don’t need to rush to fill the emptiness. You don’t need to escape it immediately.

Let yourself sit here without pressure. God is near, even now.`
  },
  {
    id: "lonely-6",
    text: `Sometimes loneliness comes from transition.

Relationships shift. Seasons change. What once felt familiar no longer fits the same way. That can leave you feeling untethered.

God understands seasons of in-between.

You are not lost because things feel unsettled. You are moving through something real, even if it’s uncomfortable.

You don’t have to have your footing yet. You don’t have to rebuild everything at once.

For now, it’s enough to stay present. God is with you as you navigate this space.`
  },
  {
    id: "lonely-7",
    text: `Loneliness can make you feel like you’re carrying life on your own.

Even when people are around, you might feel like no one is really sharing the weight with you.

God never intended for you to carry everything alone. When loneliness settles in, it’s not a punishment. It’s a signal that you need presence, not performance.

God offers Himself as that presence. Quiet. Faithful. Near.

You don’t have to pretend you’re okay. You don’t have to keep it together here.

You are safe to be honest in this space.`
  },
  {
    id: "lonely-8",
    text: `It’s easy to believe loneliness will last forever when you’re in it.

But feelings are not timelines.

This season will not always feel this way. Even if you can’t see what’s coming next, change does not require your constant effort.

God is already at work in ways you can’t see yet. You don’t need to force connection or manufacture belonging.

For now, let yourself be held by the truth that you are known by God.

That matters more than it feels right now.`
  },
  {
    id: "lonely-9",
    text: `Loneliness doesn’t mean you’re doing life wrong.

It often means you care deeply and feel deeply. That’s not a flaw. That’s part of being human.

God does not shame you for needing connection. He honors it.

You don’t need to withdraw completely. You also don’t need to overextend yourself to feel included.

Let yourself rest here. God is not going anywhere.`
  },
  {
    id: "lonely-10",
    text: `Even in loneliness, you are still accompanied.

God is not distracted. He is not distant. He is present with you in this moment, attentive and steady.

You may not feel connection right now, but you are not alone.

Stay here as long as you need.`
  }
],


angry: [
  {
    id: "angry-1",
    text: `Anger often shows up when something important has been crossed.

A boundary. A trust. A hope you were holding quietly. When that line is crossed, anger is often the first thing you feel because it’s trying to protect something that mattered.

That doesn’t make you unreasonable. It means you were invested.

You don’t need to push this feeling away or clean it up before bringing it to God. He is not alarmed by your anger. He stays present with people who feel wronged, disappointed, or hurt.

You also don’t need to act on this feeling right now. Anger doesn’t always need an immediate response. Sometimes it needs space to be understood.

For this moment, let yourself slow down. Let the intensity settle just enough to breathe. God is here, steady and unthreatened by what you feel.

You are not wrong for feeling angry.`
  },
  {
    id: "angry-2",
    text: `Anger can feel uncomfortable, especially if you’re used to keeping the peace.

You might question whether you’re allowed to feel this way. You may worry that it makes you harsh or unkind. But anger often rises after patience has been stretched thin.

You’ve tried to understand. You’ve tried to let things go. Eventually, something inside says enough.

God listens to that moment too.

You don’t need to soften your feelings here. You don’t need to make them sound acceptable. God hears you fully, without requiring restraint.

For now, let yourself pause instead of reacting. Nothing needs to be decided in this moment. God is near, calm and attentive, even in this intensity.

You are safe to slow this down.`
  },
  {
    id: "angry-3",
    text: `Sometimes anger comes from feeling dismissed.

Your words didn’t land. Your experience wasn’t taken seriously. Your effort went unnoticed. Over time, that builds frustration.

Anger in those moments is not cruelty. It’s a response to feeling unseen.

God does not overlook you the way people sometimes do. He sees what wasn’t acknowledged. He knows what was carried quietly.

You don’t need to justify why this matters to you. It mattered because it touched something real.

For now, let yourself acknowledge the anger without judging it. God is not pulling away. He remains present, steady and listening.`
  },
  {
    id: "angry-4",
    text: `Anger can show up after a long season of restraint.

You waited. You hoped things would improve. You gave grace where it was hard to give. Eventually, patience runs out.

That doesn’t make you impulsive. It makes you human.

God understands delayed frustration. He knows the cost of holding things together for a long time.

You don’t have to resolve this feeling today. You don’t have to explain it away. Let it exist without pressure.

God is here with you, not rushing you into calm, but staying present in honesty.`
  },
  {
    id: "angry-5",
    text: `Anger can feel isolating.

You may worry that if you speak honestly, it will push people away. So you keep it inside, letting it build quietly.

That’s heavy to carry alone.

God does not require you to manage your emotions perfectly. He can hold what you’re feeling without being overwhelmed by it.

You don’t need the right words. You don’t need a composed explanation.

For now, it’s enough to admit that something crossed a line and it hurt. God is present here, steady and patient.`
  },
  {
    id: "angry-6",
    text: `Sometimes anger is tied to grief.

Grief for what should have been. For what was taken. For what didn’t turn out the way you hoped.

That kind of anger carries sadness underneath it.

God sees both.

You don’t have to separate your emotions or sort them neatly. God meets you where things are tangled.

This moment doesn’t require clarity. It requires space and honesty. God is not in a hurry with you.`
  },
  {
    id: "angry-7",
    text: `Anger can make everything feel urgent.

Like something needs to be said now. Like action can’t wait. That urgency can be intense.

But urgency doesn’t always mean immediacy is wise.

You’re allowed to slow this moment down. You’re allowed to step back before responding.

God is not pressuring you to act from intensity. He offers presence first.

For now, let the feeling exist without letting it drive. God is here, steady and patient.`
  },
  {
    id: "angry-8",
    text: `Feeling angry does not cancel your faith.

It doesn’t mean you’ve drifted from God or failed spiritually. It means you’re responding to something that mattered.

God would rather receive your honesty than your restraint.

You don’t need to calm yourself before coming to Him. You don’t need to hide what you feel.

He stays close, even here.`
  },
  {
    id: "angry-9",
    text: `Anger often wants resolution.

But not every situation resolves quickly. Not every hurt is repaired right away.

God is not asking you to fix everything today.

Let this moment be about grounding, not solving. About breathing, not deciding.

God is present with you in this pause.`
  },
  {
    id: "angry-10",
    text: `You are allowed to feel what you feel.

Anger does not define you. It does not own you. It is a moment, not a verdict.

God is still with you. Still listening. Still steady.

You can rest here for now.`
  }
],


afraid: [
  {
    id: "afraid-1",
    text: `Fear has a way of tightening everything.

Your thoughts narrow. Your body stays alert. Even when nothing immediate is happening, you feel like something could go wrong at any moment. That kind of fear is exhausting.

It doesn’t mean you lack faith. It means your mind and body are trying to protect you.

God is not distant from fear. He understands how it settles into the nervous system, how it lingers even when logic says you should feel calm.

You don’t need to force courage right now. You don’t need to pretend you’re okay.

For this moment, let yourself slow down. Take a breath. God is here with you, steady and attentive, even while fear is present.

You are not facing this alone.`
  },
  {
    id: "afraid-2",
    text: `Sometimes fear comes from uncertainty.

Not knowing what’s coming. Not knowing how things will turn out. Not knowing if you’re prepared.

That lack of clarity can feel unsettling.

God understands uncertainty. He does not demand confidence before offering presence. He meets people in questions, not just in answers.

You don’t need to see the future to be held in this moment. You don’t need to solve what’s ahead.

For now, let this moment be about grounding. God is near, calm and present, even when the future feels unclear.`
  },
  {
    id: "afraid-3",
    text: `Fear can rise after being hurt before.

When you’ve been disappointed or wounded, your system remembers. It tries to keep you safe by staying alert.

That response makes sense.

God does not shame you for being cautious. He understands how experience shapes fear.

You don’t need to rush yourself into feeling safe. Trust rebuilds slowly.

For now, let yourself acknowledge the fear without judgment. God remains close, patient and steady.`
  },
  {
    id: "afraid-4",
    text: `Sometimes fear is quiet.

It doesn’t panic. It just stays in the background, shaping your choices and limiting your movement. You may not even notice it at first.

God sees that too.

You don’t have to confront everything at once. You don’t have to push yourself past what feels manageable.

For now, let yourself pause. God is here, offering presence, not pressure.`
  },
  {
    id: "afraid-5",
    text: `Fear can make your world feel smaller.

Options narrow. Possibility feels distant. Everything becomes about avoiding harm.

God is not confined by fear’s limits. He sees beyond what feels possible right now.

You don’t need to expand your life today. You don’t need to be brave all at once.

For now, let yourself stay where you are. God is with you, steady and attentive.`
  },
  {
    id: "afraid-6",
    text: `Fear often comes with physical sensations.

Tension in your chest. Tightness in your stomach. Restlessness that doesn’t settle.

God understands that fear lives in the body, not just the mind.

You don’t need to control your reactions. You don’t need to calm yourself perfectly.

For now, let yourself breathe. God is present here, even as your body finds its footing.`
  },
  {
    id: "afraid-7",
    text: `Being afraid does not mean you are weak.

It means you care about what’s at stake.

God does not expect fearlessness. He walks with people through fear, step by step.

You don’t need to push yourself past this feeling. You can move gently.

For now, let yourself rest in this moment. God remains close.`
  },
  {
    id: "afraid-8",
    text: `Fear can make decision-making feel impossible.

Every option feels risky. Every step feels uncertain.

God is not asking you to decide everything today.

Let this moment be about stillness, not direction. God is here with you, patient and steady.`
  },
  {
    id: "afraid-9",
    text: `Sometimes fear lingers longer than you expect.

You pray. You wait. But the feeling doesn’t leave right away.

God is not disappointed by that. He understands slow easing.

You don’t need to rush yourself into calm.

For now, let yourself be here. God is present with you.`
  },
  {
    id: "afraid-10",
    text: `This fear does not define your future.

It is a moment, not your identity.

God is still with you. Still attentive. Still near.

You can rest here for now.`
  }
],


hurting: [
  {
    id: "hurting-1",
    text: `When you’re hurting, it can feel like everything slows down.

Your energy drops. Your focus fades. Things that used to feel manageable now take more effort than they should. Pain has a way of shrinking your world until all you can really notice is what hurts.

That doesn’t mean you’re weak. It means something real has touched you.

Hurt doesn’t always come from one big moment. Sometimes it builds quietly. A series of disappointments. A long season of carrying more than you were meant to. A loss that never fully found words.

God does not look away from pain. He doesn’t rush people past it or ask them to be strong before He comes near. He stays close in the middle of it.

You don’t need to explain why this hurts. You don’t need to justify the weight you feel. It’s enough to acknowledge that something inside you is tender.

For now, let yourself stop pushing. Let yourself be honest. God is here, steady and present, even in this moment.`
  },
  {
    id: "hurting-2",
    text: `Some pain lingers longer than you expected.

You thought you would be past this by now. You assumed time would soften it more quickly. Instead, it still shows up, sometimes when you least expect it.

That can be discouraging.

But healing rarely moves in straight lines. Hurt often fades unevenly. Some days feel lighter, others heavier, without much warning.

God understands that rhythm. He is not frustrated with the pace of your healing. He is not measuring your progress the way people sometimes do.

You don’t need to be “over it” yet. You don’t need to force closure. Pain doesn’t respond well to pressure.

For now, let yourself be where you are. God is not asking you to move faster. He is present with you, patient and attentive.

This moment doesn’t require strength. It only requires honesty.`
  },
  {
    id: "hurting-3",
    text: `Hurt can make you pull inward.

You may feel quieter than usual. Less interested in explaining yourself. Less able to engage the way you normally would. That’s not a failure. It’s a natural response to pain.

When something hurts, your system looks for safety.

God does not demand openness from you right now. He is not asking you to perform vulnerability or find the right words. He is content to sit with you, even in silence.

You don’t need to resolve what happened. You don’t need to make sense of it today. Some things take time to unfold.

For now, let yourself rest in God’s presence without expectation. He understands the language of pain, even when it goes unspoken.

You are not alone in this.`
  },
  {
    id: "hurting-4",
    text: `Sometimes pain comes from being let down.

A promise that didn’t hold.
A relationship that shifted.
A moment where you realized someone couldn’t meet you where you were.

That kind of hurt cuts quietly.

It can leave you guarded. More cautious. Less willing to hope the same way again. That doesn’t make you bitter. It means you were affected.

God does not minimize that kind of pain. He does not tell you to move on quickly or forget what mattered.

You don’t need to protect God from your disappointment. He can hold it.

For now, let yourself acknowledge what hurt without trying to fix it. God is near to those whose hearts feel bruised and tired.

You don’t have to carry this alone.`
  },
  {
    id: "hurting-5",
    text: `Pain can be confusing when it doesn’t have a clear source.

You know something is wrong, but you can’t quite name it. It shows up as heaviness, fatigue, or a quiet ache that follows you through the day.

That kind of hurt is still real.

God understands what you feel, even when you don’t have language for it. He does not require clarity before He listens.

You don’t need to analyze yourself right now. You don’t need to figure out why this hurts.

For this moment, it’s enough to be honest about how you feel. God is present here, attentive and steady, even in the uncertainty.

Let yourself rest here for a moment.`
  },
  {
    id: "hurting-6",
    text: `When you’re hurting, time can feel strange.

Days drag. Nights feel longer. Healing seems distant, even if you’re doing everything you know to do.

God is not impatient with that pace. He does not rush recovery or demand improvement.

You don’t need to heal on a schedule. You don’t need to feel better by a certain point. Pain does not follow deadlines.

For now, let this moment be about care, not progress. About presence, not answers.

God is here with you, even when relief feels far away.`
  },
  {
    id: "hurting-7",
    text: `Pain can make you question yourself.

You may wonder if you should be stronger by now, more resilient, more composed. But hurting is not a character flaw. It’s a response to something that mattered.

God does not shame you for being affected. He meets you with gentleness.

You don’t have to hide this part of yourself. You are allowed to be tender here.

For now, let yourself breathe. God is near, even in this.`
  },
  {
    id: "hurting-8",
    text: `Hurt often brings fatigue with it.

Not just physical tiredness, but emotional weariness. The kind that makes everything feel heavier than it should.

God recognizes that exhaustion. He does not confuse it with laziness or lack of faith.

You don’t need to push yourself today. You don’t need to keep proving endurance.

Let yourself rest here. God is present with you, offering steadiness instead of pressure.`
  },
  {
    id: "hurting-9",
    text: `Pain can make the world feel less safe.

You may find yourself more guarded, less trusting, more careful with your heart. That’s not wrong. It’s protective.

God does not rush healing. He honors the need for safety.

You don’t have to open up before you’re ready. You don’t have to move forward yet.

For now, it’s enough to stay here. God is steady, even when you feel fragile.`
  },
  {
    id: "hurting-10",
    text: `This pain will not define your whole story.

But it matters right now.

God is not asking you to rush past it or minimize it. He is with you in this moment, holding what hurts with care and patience.

You are allowed to take your time.

You are not alone.`
  }
],


stuck: [
  {
    id: "stuck-1",
    text: `Feeling stuck can be deeply frustrating.

You may know what you don’t want anymore, but not what comes next. The old way no longer fits, yet the new way hasn’t taken shape. That in-between space can feel confining, like you’re waiting for movement that won’t arrive.

This doesn’t mean you’re failing or unmotivated. Often, it means you’re in a transition that doesn’t announce itself clearly.

God is not confused by this season. He understands moments where direction feels unclear and progress feels paused. He does not rush people out of spaces like this. He stays present within them.

You don’t need to force clarity right now. You don’t need to pressure yourself into decisions that aren’t ready to be made.

For this moment, it’s enough to acknowledge where you are without judging yourself for it. God is here, steady and patient, even in the waiting.

You are not lost. You are held, even here.`
  },
  {
    id: "stuck-2",
    text: `Being stuck often comes with a quiet sense of restlessness.

You feel like something needs to change, but you can’t tell what or how. Every option feels uncertain. Every step feels heavy.

That kind of tension can wear you down.

God understands seasons where movement feels blocked. He does not see stillness as wasted time. He sees what is forming beneath the surface, even when you can’t.

You don’t need to make a major decision today. You don’t need to have answers yet. Growth doesn’t always look like motion.

For now, let yourself stay present without forcing progress. God is not pressuring you to move faster than you’re able.

This season has purpose, even if it feels uncomfortable.`
  },
  {
    id: "stuck-3",
    text: `Sometimes feeling stuck comes from fear of choosing wrong.

You may worry that one step could set you back, so you hesitate. That hesitation can slowly turn into immobility.

God understands that fear. He knows how much weight choices can carry.

You don’t have to decide everything at once. You don’t have to see the full path to take the next small step.

For now, let yourself breathe. God is not waiting to punish a wrong turn. He walks with people through uncertainty.

You are allowed to take your time.`
  },
  {
    id: "stuck-4",
    text: `Feeling stuck can make you question yourself.

You might wonder why others seem to move forward while you remain in the same place. That comparison can quietly drain confidence.

But timing is not uniform. Everyone’s path unfolds differently.

God is not measuring your worth by speed or visible progress. He is attentive to your life as it is, not as it “should” look.

You don’t need to push yourself to keep up with anyone else. You are not behind.

For now, let yourself rest in the truth that God is present here, even in stillness.`
  },
  {
    id: "stuck-5",
    text: `Sometimes being stuck feels like carrying unfinished business.

Old questions linger. Past choices still echo. You may feel pulled backward and forward at the same time.

That tension is exhausting.

God understands unresolved seasons. He does not rush closure or demand clarity before He stays close.

You don’t need to tie everything together today. Some things take longer to settle.

For now, let yourself acknowledge the weight without trying to solve it. God is here, steady and patient.`
  },
  {
    id: "stuck-6",
    text: `Feeling stuck can dull motivation.

What once felt meaningful now feels heavy. Energy drops when movement feels impossible.

That doesn’t mean you’ve lost purpose. It means you’re tired of standing still.

God does not confuse weariness with failure. He recognizes the cost of waiting.

You don’t need to force enthusiasm or pretend momentum. Let this moment be honest.

God is present with you here, even when motivation feels distant.`
  },
  {
    id: "stuck-7",
    text: `Sometimes being stuck is less about direction and more about readiness.

You may sense that something is coming, but you’re not there yet. That awareness can feel uncomfortable.

God honors readiness more than speed.

You don’t have to rush yourself into what isn’t formed yet. You’re allowed to be in process.

For now, let yourself remain where you are without pressure. God is with you, even in the waiting.`
  },
  {
    id: "stuck-8",
    text: `Feeling stuck can make life feel smaller.

Your world narrows. Options feel limited. Possibility feels distant.

God sees beyond what feels visible right now. He is not confined by the moment you’re in.

You don’t need to expand your life today. You don’t need to fix the feeling immediately.

For now, let yourself stay present. God is here, steady and attentive, even in limitation.`
  },
  {
    id: "stuck-9",
    text: `Being stuck often carries a quiet grief.

Grief for what hasn’t happened yet.
For what feels delayed.
For what you hoped would look different by now.

God does not dismiss that grief. He understands the weight of unmet expectations.

You don’t need to hide this disappointment. God stays close to honest hearts.

Let yourself pause here. You are not alone in this.`
  },
  {
    id: "stuck-10",
    text: `This season of being stuck will not last forever.

But you don’t need to rush through it.

God is present with you here, holding what feels uncertain with patience and care.

For now, it’s enough to stay.`
  }
],


exhausted: [
  {
    id: "exhausted-1",
    text: `Exhaustion runs deeper than being tired.

It’s not just about needing sleep. It’s about feeling spent in places rest doesn’t seem to reach. Your body may slow down, but your mind keeps going. Or your mind feels dull while your body keeps pushing. Either way, something inside you feels drained.

That doesn’t mean you’re weak. It means you’ve been carrying more than you were meant to carry alone.

God does not confuse exhaustion with laziness or lack of effort. He knows the difference between someone who won’t try and someone who has been trying for a long time.

You don’t need to prove your commitment right now. You don’t need to keep pushing just to show strength.

For this moment, it’s enough to stop striving. God is not asking anything from you here. He is present, steady, and patient, even in your weariness.

You are allowed to rest.`
  },
  {
    id: "exhausted-2",
    text: `Exhaustion often comes quietly.

It builds over time. Small responsibilities. Ongoing pressure. The expectation to keep going even when your reserves are low. Eventually, it catches up.

You may feel slower, less motivated, less responsive than usual. That can be unsettling.

God understands that kind of fatigue. He does not demand the same output from someone who is worn down. He does not measure your worth by productivity.

You don’t need to apologize for needing rest. You don’t need to justify why this feels hard.

For now, let yourself slow down without guilt. God is near, not with demands, but with care.

This moment can be about recovery, not performance.`
  },
  {
    id: "exhausted-3",
    text: `When you’re exhausted, even simple things can feel overwhelming.

Decisions take more effort. Emotions feel closer to the surface. Patience wears thin more quickly than you expect.

That doesn’t mean something is wrong with you. It means your system is signaling that it needs care.

God listens to those signals too.

You don’t have to push through exhaustion to be faithful. Faithfulness sometimes looks like stopping, not continuing.

For this moment, let yourself rest without trying to fix anything. God is present here, steady and understanding.

You don’t have to do more right now.`
  },
  {
    id: "exhausted-4",
    text: `Exhaustion can make you feel disconnected from yourself.

You may notice you’re less engaged, less joyful, less responsive than you used to be. That can bring worry or self-criticism.

But exhaustion changes how everything feels. It narrows perspective. It dulls emotion.

God does not judge you for that. He understands that weariness affects the whole person.

You don’t need to regain your energy all at once. You don’t need to feel like yourself immediately.

For now, let yourself be here as you are. God is patient with the process of rest.

You are still held, even in this.`
  },
  {
    id: "exhausted-5",
    text: `Sometimes exhaustion comes from being responsible for too much.

Too many roles.
Too many expectations.
Too little space to recover.

That kind of weight adds up.

God sees what you’ve been carrying. He knows how long you’ve been steady when others relied on you.

You don’t have to keep everything moving right now. You don’t have to be the strong one in this moment.

Let yourself step back internally, even if circumstances haven’t changed yet. God is with you, offering steadiness instead of pressure.

Rest is not a failure.`
  },
  {
    id: "exhausted-6",
    text: `Exhaustion can make it hard to pray, think, or focus.

Words feel distant. Attention drifts. Even quiet feels heavy.

God understands that kind of weariness. He does not require effortful spirituality from exhausted people.

You don’t need the right words. You don’t need sustained focus.

For now, it’s enough to be present. God is near, even when energy is low and thoughts are scattered.

You are not disappointing Him by being tired.`
  },
  {
    id: "exhausted-7",
    text: `Being exhausted can make the future feel intimidating.

Everything ahead looks like more effort, more demand, more responsibility. That can feel overwhelming.

God is not asking you to look that far ahead right now. He meets people one moment at a time.

You don’t need to plan or prepare for everything that’s coming.

For now, let yourself rest in this moment. God is here, steady and attentive.

That is enough.`
  },
  {
    id: "exhausted-8",
    text: `Exhaustion often brings guilt with it.

You may feel like you should be doing more, responding faster, caring better. That inner pressure can be heavy.

God does not add to that weight. He does not shame tired people.

You don’t need to earn rest. You’re allowed to need it.

For this moment, let yourself stop striving. God is not disappointed in your limits. He understands them.

You can rest here.`
  },
  {
    id: "exhausted-9",
    text: `When exhaustion lingers, it can feel endless.

You rest, but it doesn’t fully restore. You pause, but the weariness remains.

God is not discouraged by slow recovery. He is patient with the process.

You don’t need to rush healing. You don’t need to force renewal.

For now, let yourself be cared for, even if relief feels gradual.

God is present with you here.`
  },
  {
    id: "exhausted-10",
    text: `You are allowed to be exhausted.

This feeling does not define you. It reflects how much you’ve been carrying.

God is still with you. Still attentive. Still gentle.

You can pause here.`
  }
],
};
