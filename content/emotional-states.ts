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
    text:
      "It feels heavy to keep showing up when the results don’t seem to match the effort. That kind of discouragement doesn’t come from laziness. It comes from caring deeply and waiting longer than you expected. You’re not broken for feeling worn down. You’re human. Today doesn’t need big faith or strong emotions. It only needs honesty. Stay here for a moment. Breathe. You are still being held."
  },
  {
    id: "discouraged-2",
    text:
      "Discouragement has a quiet way of shrinking your vision. What once felt possible now feels distant. That doesn’t mean it disappeared. It means you’re tired. And tired people need rest, not pressure. You don’t have to solve your future today. You don’t have to sound hopeful. Just let yourself be present. God is near even when motivation is not."
  },
  {
    id: "discouraged-3",
    text:
      "Some days discouragement doesn’t shout. It whispers. It tells you effort is pointless and progress is imaginary. That voice sounds convincing when you’re worn down. But it isn’t truth. You are still here. You are still breathing. You are still choosing not to quit. That matters more than you realize."
  },
  {
    id: "discouraged-4",
    text:
      "You might be comparing yourself to who you were when you felt stronger. That comparison will drain you. You are allowed to be in a slower season. You are allowed to need support. God is not disappointed in this version of you. He is present with you right now, not waiting for you to feel better first."
  },
  {
    id: "discouraged-5",
    text:
      "Discouragement often shows up after long obedience without quick relief. That does not mean your faith failed. It means you stayed longer than comfort allowed. You don’t need to prove anything today. Let today be smaller. Let it be quiet. God’s care for you has not weakened just because your energy has."
  },
  {
    id: "discouraged-6",
    text:
      "If hope feels thin, don’t force it. Forced hope breaks easily. Honest hope grows slowly. You can tell God exactly how tired you are. You don’t need polished words. You don’t need a breakthrough moment. Just stay connected. That alone is an act of faith."
  },
  {
    id: "discouraged-7",
    text:
      "Discouragement can make you feel alone, even when people are near. It isolates quietly. If you feel that distance, name it. Don’t judge it. You’re not weak for feeling this way. God is close to you here, in the middle of the tired thoughts and unanswered questions."
  },
  {
    id: "discouraged-8",
    text:
      "You may feel like you are losing ground. But a slower pace is not the same as failure. Sometimes progress looks like staying steady instead of giving up. Today, do not rush yourself. One honest prayer. One small step. That is enough for now."
  },
  {
    id: "discouraged-9",
    text:
      "Discouragement loves final words like always and never. Always tired. Never changing. Those words feel true when you’re exhausted, but they don’t get to decide your future. This moment is real, but it is not permanent. God is still working, even quietly."
  },
  {
    id: "discouraged-10",
    text:
      "If you feel empty, it may be because you have given more than you realized. Empty does not mean finished. It means you need care. Today, let yourself rest without guilt. Let faith be simple. You are not abandoned here. You are still being guided."
  }
],


  lonely: [
  {
    id: "lonely-1",
    text:
      "Loneliness can feel like being unseen rather than being alone. You might be surrounded by people and still feel separate, like no one quite reaches where you are. That feeling is real. You don’t have to explain it away. Let yourself acknowledge it without judging it. You matter, even in the quiet."
  },
  {
    id: "lonely-2",
    text:
      "Sometimes loneliness settles in slowly. It shows up in long pauses, unanswered messages, or the sense that no one is really asking how you are. That can hurt more than people realize. You are not weak for feeling this. You are human, and you were not meant to carry life without connection."
  },
  {
    id: "lonely-3",
    text:
      "Loneliness often tells you a story about yourself. That you are forgotten. That you are unchosen. Those thoughts feel convincing when the room is quiet, but they are not truth. Your value is not decided by who shows up today. You are still worthy of care and attention."
  },
  {
    id: "lonely-4",
    text:
      "You might be holding back because it feels safer not to expect too much from people. That makes sense. Disappointment can teach caution. But guarding your heart does not mean something is wrong with you. It means you have been hurt before. Be gentle with yourself here."
  },
  {
    id: "lonely-5",
    text:
      "There are moments when loneliness feels like a weight in your chest. It makes ordinary tasks feel heavier and evenings feel longer. If that’s you right now, slow down. You don’t need to fix the feeling. Just let it be seen. You are not invisible in this moment."
  },
  {
    id: "lonely-6",
    text:
      "Loneliness can make you question whether anyone really knows you. Not the surface parts, but the quiet thoughts you don’t say out loud. You don’t have to have an audience to be known. You don’t have to perform to be seen. Your life still has meaning right now."
  },
  {
    id: "lonely-7",
    text:
      "If you feel disconnected, it doesn’t mean connection is impossible. It means you are in a season where it hasn’t reached you yet. Seasons shift, even when they move slowly. Today is not a verdict on your future relationships. It is just today."
  },
  {
    id: "lonely-8",
    text:
      "Loneliness can make you feel like everyone else is moving forward while you are standing still. That comparison will drain you. You are not late. You are not missing your moment. You are where you are, and that place still deserves compassion."
  },
  {
    id: "lonely-9",
    text:
      "You may wish someone would simply sit with you, without fixing anything or asking you to be cheerful. That desire is valid. You don’t need to shrink it. You don’t need to apologize for wanting closeness. Wanting connection does not make you needy. It makes you human."
  },
  {
    id: "lonely-10",
    text:
      "If loneliness has been with you for a while, it can start to feel permanent. It is not. Even now, your story is still unfolding. Stay open where you can. Rest where you need to. This moment does not define the whole of your life."
  }
],


  angry: [
  {
    id: "angry-1",
    text:
      "Anger usually shows up because something mattered and it was crossed. A boundary, a value, a trust. You don’t have to pretend this feeling isn’t there. But you also don’t have to let it drive. Pause here. Let your body settle before you decide what this moment means."
  },
  {
    id: "angry-2",
    text:
      "When anger is loud, it makes everything feel urgent. Words want to come out fast. Decisions want to be made now. This is a moment to slow down, not speed up. You are allowed to take time before you respond. Strength can look like restraint."
  },
  {
    id: "angry-3",
    text:
      "Anger often protects something tender underneath. Disappointment, hurt, feeling dismissed. If you can, notice what sits under the anger without judging it. You don’t have to expose it to anyone else. Just acknowledge it for yourself."
  },
  {
    id: "angry-4",
    text:
      "You may feel justified in your anger, and you might be right. But being right does not mean rushing is wise. Give yourself space to respond in a way that still reflects who you are. This feeling does not get to rewrite your character."
  },
  {
    id: "angry-5",
    text:
      "Anger can make you feel powerful while actually making you vulnerable. It narrows your vision and pulls you toward extremes. Step back for a moment. Breathe. You don’t have to resolve everything in one conversation or one action."
  },
  {
    id: "angry-6",
    text:
      "If someone crossed a line, that matters. You are allowed to take that seriously. But you are not required to burn everything down to prove it. Calm clarity will serve you better than explosive relief."
  },
  {
    id: "angry-7",
    text:
      "Anger can keep replaying the same moment in your mind, as if repetition might change the outcome. That loop will exhaust you. If you can, interrupt it. Shift your attention. Let your nervous system slow before returning to the issue."
  },
  {
    id: "angry-8",
    text:
      "Sometimes anger is fueled by exhaustion. When you’re tired, everything feels more personal and more intense. Before drawing conclusions, check your care. Eat. Rest. Sit quietly for a few minutes. Clarity often returns when your body settles."
  },
  {
    id: "angry-9",
    text:
      "You do not need to suppress anger to be healthy. You need to release it safely. Write it down. Take a walk. Sit in silence. Choose a response that protects your future, not just your pride."
  },
  {
    id: "angry-10",
    text:
      "This moment does not define you. Feeling angry does not make you harsh or unkind. It makes you human. Let this feeling pass through without letting it take control. You can choose your next step with care."
  }
],


  afraid: [
  {
    id: "afraid-1",
    text:
      "Fear can arrive quietly or all at once. It tightens your chest, speeds up your thoughts, and pulls your attention into the future. Pause here for a moment. You do not need to figure everything out right now. You are safe enough in this moment to breathe."
  },
  {
    id: "afraid-2",
    text:
      "Fear often asks you to prepare for the worst before it has happened. That constant readiness can drain you. Try coming back to what is real right now. You are here. You are breathing. This moment has not overwhelmed you."
  },
  {
    id: "afraid-3",
    text:
      "You may be afraid because you care deeply. That is not weakness. Caring always carries risk. You don’t have to shame yourself for feeling cautious or uncertain. Let yourself move slowly without calling it failure."
  },
  {
    id: "afraid-4",
    text:
      "Fear can make small decisions feel enormous. It can freeze you in place. If that’s happening, reduce the moment. What is one small step you can take today. Not ten. Just one. That is enough for now."
  },
  {
    id: "afraid-5",
    text:
      "Sometimes fear comes from not knowing how things will turn out. That unknown can feel heavy. You don’t need certainty to move forward. You only need enough steadiness to take the next honest step."
  },
  {
    id: "afraid-6",
    text:
      "If you are afraid of being hurt again, that fear makes sense. Your heart learned caution from experience. You don’t have to rush trust. You don’t have to expose yourself to prove courage. You are allowed to protect yourself gently."
  },
  {
    id: "afraid-7",
    text:
      "Fear can isolate you inside your own thoughts. Everything feels louder in your head. If you can, slow your breathing. Place your feet on the ground. Let your body remind you that you are still here."
  },
  {
    id: "afraid-8",
    text:
      "You might feel pressure to be brave, to act confident, to hide your fear. You don’t have to do that here. Fear does not disqualify you. It simply means something feels uncertain. You are allowed to name it."
  },
  {
    id: "afraid-9",
    text:
      "Fear often speaks in final statements. Always unsafe. Never okay. Those words feel convincing, but they are not facts. This moment is difficult, but it is not the whole story."
  },
  {
    id: "afraid-10",
    text:
      "You don’t need to rush out of fear. Let it settle. Let yourself feel grounded again. When your body calms, your mind will follow. You can choose your next step with care. You are not alone in this."
  }
],


  hurting: [
  {
    id: "hurting-1",
    text:
      "Pain has a way of slowing everything down. It affects how you think, how you move, how you relate to the world. If you are hurting, you don’t need to rush healing or explain yourself. What you’re feeling matters. Let today be gentle."
  },
  {
    id: "hurting-2",
    text:
      "When something hurts deeply, it can feel like it takes up all the space inside you. That doesn’t mean you are weak. It means something meaningful was touched. You are allowed to feel this without minimizing it."
  },
  {
    id: "hurting-3",
    text:
      "You may be trying to hold yourself together so others don’t worry. That kind of quiet strength costs more than people see. If you can, give yourself permission to soften here. You don’t have to be composed all the time."
  },
  {
    id: "hurting-4",
    text:
      "Pain can make you replay moments, conversations, or choices. That loop can exhaust you. You don’t have to solve the past to care for yourself today. You can pause the replay and breathe."
  },
  {
    id: "hurting-5",
    text:
      "Sometimes hurting makes you pull back, not because you don’t want people, but because explaining feels too heavy. That makes sense. You don’t owe anyone clarity while you’re healing."
  },
  {
    id: "hurting-6",
    text:
      "If your hurt feels invisible to others, that can add another layer of pain. Just because something isn’t seen doesn’t mean it isn’t real. Your experience is valid, even if it’s quiet."
  },
  {
    id: "hurting-7",
    text:
      "Healing rarely happens all at once. It comes in small shifts. A little more breath. A little less tension. Today might be one of those small shifts, even if it doesn’t feel dramatic."
  },
  {
    id: "hurting-8",
    text:
      "You don’t need to rush into acceptance or forgiveness to be okay. Healing has its own pace. Let yourself move through this honestly, without forcing the ending."
  },
  {
    id: "hurting-9",
    text:
      "Pain can make the future feel uncertain. It can make you cautious and tired. That doesn’t mean you’ll always feel this way. It means you’re in the middle of something, not the end."
  },
  {
    id: "hurting-10",
    text:
      "If all you can do today is take care of yourself in small ways, that is enough. Rest when you can. Breathe when it feels tight. You are not failing at healing. You are doing it."
  }
],


  stuck: [
  {
    id: "stuck-1",
    text:
      "Feeling stuck can quietly shake your confidence. You start wondering if you missed something or waited too long. Being stuck does not mean you failed. It often means you reached the edge of an old way of moving. This pause has not explained itself yet."
  },
  {
    id: "stuck-2",
    text:
      "When nothing seems to move, pressure builds. You may feel like you should force progress just to feel alive again. Take a breath. You do not need to rush yourself forward. Stillness can be part of the path, not a mistake."
  },
  {
    id: "stuck-3",
    text:
      "Being stuck can make every option feel wrong. That can be exhausting. If that’s where you are, reduce the moment. What is one small thing you can do today that is kind and honest. That is enough movement for now."
  },
  {
    id: "stuck-4",
    text:
      "Sometimes you feel stuck because you are carrying too many voices. Advice, expectations, comparisons. They crowd your thinking. Quiet the noise if you can. Give yourself space to hear what feels steady inside."
  },
  {
    id: "stuck-5",
    text:
      "You might be replaying past decisions, wondering if a different choice would have changed everything. That kind of thinking will keep you frozen. You cannot rewrite the past, but you can care for yourself in the present."
  },
  {
    id: "stuck-6",
    text:
      "Being stuck can make you doubt your ability to decide well. Remember, you have made good choices before. This moment does not erase your wisdom. It simply asks for patience."
  },
  {
    id: "stuck-7",
    text:
      "Sometimes stuck is a signal that you need rest before direction. When your body and mind are tired, clarity fades. Give yourself permission to slow down. Answers often come when strain releases."
  },
  {
    id: "stuck-8",
    text:
      "You may feel pressure to have a plan before you move. You don’t need a full map. You only need the next step that feels honest and doable. Movement grows from small beginnings."
  },
  {
    id: "stuck-9",
    text:
      "Feeling stuck does not mean life is wasting away. Seasons of waiting still shape you. They deepen awareness and refine desire. You are still becoming, even here."
  },
  {
    id: "stuck-10",
    text:
      "Let go of the shame around being unsure. Uncertainty is not weakness. It is part of being human. Stay open. Stay gentle with yourself. This moment will not always feel this tight."
  }
],


  exhausted: [
  {
    id: "exhausted-1",
    text:
      "Exhaustion is more than being tired. It is the feeling of having given more than you’ve received for too long. If that’s where you are, you don’t need motivation right now. You need care. Let today be slower than usual. That is not failure. That is listening."
  },
  {
    id: "exhausted-2",
    text:
      "When you’re exhausted, even small things can feel overwhelming. Decisions feel heavier. Emotions feel sharper. Nothing is wrong with you. Your system is asking for rest, not criticism."
  },
  {
    id: "exhausted-3",
    text:
      "You might feel guilty for needing rest, like you should be able to push through. But rest is not quitting. It is what allows you to continue without losing yourself. You are allowed to pause."
  },
  {
    id: "exhausted-4",
    text:
      "Exhaustion can make your thoughts harsh. You may start talking to yourself in ways you never would to someone you love. Notice that voice. You don’t have to agree with it. Speak to yourself more gently."
  },
  {
    id: "exhausted-5",
    text:
      "Sometimes exhaustion comes from carrying responsibility quietly. People may not see how much you hold together. That unseen weight still matters. You don’t need to explain your tiredness for it to be valid."
  },
  {
    id: "exhausted-6",
    text:
      "If prayer feels difficult right now, that’s okay. You don’t need many words. A breath. A moment of stillness. Even silence can be a form of rest."
  },
  {
    id: "exhausted-7",
    text:
      "Exhaustion can distort perspective. It makes temporary strain feel permanent. Before drawing conclusions about your life, let your body settle. Clarity often returns after rest."
  },
  {
    id: "exhausted-8",
    text:
      "You may feel like you have nothing left to give. That does not make you empty. It means you have been generous. Now it is time to receive."
  },
  {
    id: "exhausted-9",
    text:
      "If everything feels like too much, reduce the moment. Focus on what is essential and let the rest wait. You do not have to carry everything at once."
  },
  {
    id: "exhausted-10",
    text:
      "Let today be about recovery, not productivity. You are still valuable even when you are resting. Especially when you are resting. This is part of staying whole."
  }
],
};
