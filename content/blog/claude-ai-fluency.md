---
title: "Unvibe Delegation"
date: 2026-05-10
description: "What nursing's Five Rights of Delegation taught me about working with AI — and why most of us are treating Claude like an assistant when we should be treating it like an apprentice."
slug: unvibe-delegation
tags: [ai-fluency, collaboration, delegation]
status: published
---

# Unvibe AI Delegation

I recently completed the AI Fluency course from Anthropic Academy. I didn't expect to get much from it. I've been talking to AI since ChatGPT was made publicly available and I felt confident I'm doing it well. Something happened as I worked through the course that I can only call a shift in mindset. If you find yourself frustrated with Claude, there's a decent chance this course can help you, too.

Anthropic's AI fluency framework focuses on using AI in ways that are effective, efficient, ethical, and safe. They identify three primary ways people interact with AI:

- **Automation**: AI does work following explicit instructions. Automation treats the AI tooling as a machine which completes a specific task the human user defines in advance, such as categorizing emails or scanning for broken links on a website.
- **Augmentation**: Collaboration between the human user and AI to complete a task together. Augmentation treats the AI assistant like a thinking partner and relies on chat exchanges to explore ideas and research topics.
- **Agency**: AI works independently on behalf of the human user to complete tasks. Agency requires setting up access and permissions, and it requires the highest level of communication to ensure the AI understands the problem surface and which actions are expected and appropriate.

## 4-D AI Fluency Framework

Anthropic builds their AI fluency framework on top of what they call the 4-Ds.

1. **Delegation**: Determining what work the human user should do versus what can be effectively delegated to AI.
2. **Description**: Clear communication with AI of what problem you want to solve, what outputs should look like, and how the AI should interact with you.
3. **Discernment**: Evaluating the outputs, approach, and behavior of the AI for usefulness and correctness.
4. **Diligence**: Drawing on human user expertise as a final check for accurate outputs and transparent, ethical usage of AI tools.

The rest of this article will focus on delegation, but all four of the Ds play a part in effective delegation, so it's worth defining them all up front.

## Expertise in Delegation

I have expertise in delegation developed within the framework of a Registered Nurse (RN) collaborating with other staff members to care for patients in the hospital setting. In nursing, delegation is a transfer of responsibility for performing a nursing task to another nurse or an unlicensed assistant like a patient care technician. There are a few key things to know about this type of delegation, and I think understanding them can change how you think about what, when, and how you delegate tasks to AI.

- **Accountability**: The RN delegating the task retains responsibility for the well-being of the patient and for ensuring the task is completed correctly and on time. This can mean supervising the party you delegate the task to and providing feedback on the outcome when needed.
- **Competence**: The RN is responsible for ensuring the person who will complete the task is qualified to safely and correctly carry it out.
- **Non-delegable tasks**: Some tasks require nursing judgment or assessment and are never appropriate to delegate to non-nurse colleagues.

If you hang around nurses long enough, you'll likely hear about the Five Rights of Delegation, which go like this:

1. **Right Task**: The task is appropriate for the person you want to delegate it to and safe for the patient.
2. **Right Circumstance**: The patient's condition is stable and expected to stay that way.
3. **Right Person**: The staff member has the required competency and skills to complete the task.
4. **Right Communication**: Clear, concise, and specific instructions are provided.
5. **Right Supervision**: The RN monitors the task and evaluates the outcome.

## Role in Software Engineering

If you are a dev using AI tools to help you with code, this has everything to do with you. Once I made the mental connection between this delegation model I'm very familiar with and AI fluency, I realized a lot of the frustration we experience when working with AI stems from inappropriate delegation — we're missing one or more of the Five Rights. This led me to a reframe that has changed how I work with the AI tools I use to write code:

**We've been treating AI like an assistant when we need to treat it more like an apprentice.**

What's the difference? An assistant is a helper who provides labor upon request with no expectation of improvement or mastery. That's fine if you're dealing in automation, but it falls apart when you want to use AI for augmentation or agency. An apprentice is a trainee who is learning to become a skilled professional. The apprentice is who you want in your codebase and in your thinking-partner conversations — not an assistant.

## Delegation to an Apprentice

The most effective users of AI are experts in their field before they are delegators to AI. Every apprentice needs a mentor, and your AI apprentice is no different. Your AI apprentice relies on you to:

- Understand and define the problem to solve and what a successful solution looks like.
- Map out the work needed to get from problem to solution.
- Be the expert when what is supposed to happen and what actually happens are two different things.
- Retain ownership of work that should be done by a human rather than AI.
- Be responsible for the code that ships.

The further you move away from automation and toward augmentation or agency, the more important your mentorship becomes. You can't expect an agent to act appropriately and produce the outputs you want if it doesn't understand what you are trying to do, how you want the work done, and what shape the outputs or work product should take. If you're barking out "Build me an app. Make no mistakes," you're in assistant territory and really shouldn't expect too much.

## Unvibe Your Delegation

Vibe coding gets a lot of airtime, but it's really just delegation without any of the Five Rights. No right task, no right person, no right communication, no supervision — just vibes. It works until it doesn't, and then you're stuck debugging code you don't understand or shipping work you can't defend.

The shift in mindset I mentioned at the start of this post wasn't really about Claude or the course. It was about letting go of the fantasy that AI was going to read my mind and produce the right thing if I just kept rewording my prompt. The frustration evaporated the moment I started showing up as a mentor instead of a customer.

So the next time you open Claude — or Cursor, or whatever you're working with — and feel that familiar urge to type "fix this" and hope, pause and run the Five Rights:

1. Is this the **right task** to delegate, or is it one of those non-delegable ones that needs my judgment?
2. Are the **circumstances right** — do I understand the surrounding code, the constraints, the stakes?
3. Is the AI the **right "person"** for this work, given what it can and can't see?
4. Have I **communicated** the problem, the desired output, and the guardrails clearly?
5. Am I prepared to **supervise** — to read the diff, run the tests, and own what ships?

Unvibe the delegation. The work gets better, and so does the relationship with the apprentice you're training.
