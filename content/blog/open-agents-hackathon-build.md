---
title: Open Agent Hackathon Build
date: 2026-05-02
description: Exploration of what I built for ETH Global's Open Agents 2026 hackathon -- LLM-as-a-judge to improve the hackathon experience for builders and sponsor judges.
slug: open-agents-build-2026
tags: [agents, LLM-as-a-judge, hackathon]
status: published
---

# Open Agents ETH Global Hackathon Build

This hackathon provided an opportunity to explore how using LLM agents in a LLM-as-a-judge shaped framework might improve hackathon participation for the builders who enter and the human judges tasked with evaluating their submissions. During my time as a developer advocate at Filecoin, I judged over 1,000 hackathon projects in a given year. As a builder, I've tossed multiple projects into the hackathon void to never receive any meaningful feedback or guidance around them. One thing I know from my time on both sides of this problem:

Conceptually, hackathons are cool and should be awesome for all involved. Hackathon implementation is lacking meaning a lot of them actually suck when it comes to the experience itself.

## Alignment Needed

Like most things, this is a misalignment of incentives and opportunities more than any malicious behavior on anyone's part. Events work to attract bright, curious, innovative builders and then aren't ready to process the resulting outputs with the care they deserve. Teams struggle to support builders throughout and then draw on the same internal staff to evaluate the resulting projects. Bottlenecks are possible everywhere a human-judgment is sought along the way. Builders rarely get meaningful project feedback from sponsor teams. A disconnect is created at the moment devs should feel the most engaged with a tool or product. I decided to see how LLMs can help clear some of these obstacles to make hackathons awesome again.

## LLM-As-A-Judge

If you've ever judged hackathon projects, what I'm about to describe will likely seem familiar. The team is excited to get 120 project submissions. You and a colleague have one day to evaluate and score these projects to determine a winner. You divide and conquer but, before you can get into the meat of a project you have to decide if it's even valid for the contest and your track. Even if you split the work in half -- two minutes spent per project to determine validity eats two hours (60 projects \* 2 mins each). You're likely scanning dependencies and running grep on a few keywords just looking for some indication your stack was used. You're going to miss things, and you know it. It's just the way things work though.

If you're a builder, you're likely thinking this feels very unfair. You put your time and effort into building a project and you can't be sure it will make it past this first screen to even be considered. There is little chance the entire project gets looked at unless it instantly catches a judge's eye. The misalignment between the time and effort put into building it, and what it takes to actually evaluate the build is glaring and creates huge tension between the builders and the judges. If you want actual feedback about what was "good" or "bad" about your project, good luck. By the time the judge makes it to project fifty on their list, your build doesn't even have a slot in their memory anymore.

No one really wants it to work this way, it's just what tends to happen inside the structure we currently conduct hackathons inside. Using LLM-as-a-judge can help clear some of these bottlenecks and free up human judges for the actual judgement calls required to declare a winner. This requires a careful structure combining deterministic check gates with probabilistic checks and intelligent assessment as a signal so human judges are left with only the highest value judgment calls to make. Using these automated judging layers also creates opportunities for recognition and feedback that are automated -- providing human builders with the feedback they want personalized to the project they invested their time into building.

## What I Built

The submission does a few things to help make the judging process easier for judges and builders.

- A `safe-repo` judge ensures the project has a public repo and is free from major malicious code and dependency packages that can wreck a judge when trying to evaluate the project locally
- A `hackathon-qualified` judge that verifies the repo was started for the current event and the commits took place during the event
- A `0g-sponsor` judge: this was the single sponsor-track specific judge I got built in time for submission. It evaluates a project against how well it fits the prize tracks for the Open Agents hackathon

Once these judges complete their work, a builder feedback report is generated for the submission team. This report covers where the project met the track well and surfaces opportunities to continue to improve upon a project. These reports are stored on-chain with 0G Storage so they can be sent to builder teams when the event is finished. As a builder, yeeting a project into the hackathon void and never hearing anything about it has always bugged me. As a judge, I know there just isn't time to create meaningful feedback for each project. LLMs help close this gap rather nicely.

## What I Learned

The first big lesson proved itself early in the calibration process. I pulled some sample projects from the ETH Global Showcase and used my 0G judge to evaluate them. First though, I took five minutes to look at each project and make a manual assessment of whether or not it might qualify for either prize track. My sweep was similar to what a new member of the team might make -- I looked for installed dependencies, items listed in the README, and imports that demonstrated actual usage. In all three test cases, my manual review greatly underestimated the level and quality of integration for 0G into the projects versus what the judge managed to surface. Not because I didn't want to find evidence of integration but because, without adequate product knowledge and depth, it's hard to spot check these things to a degree of certainty.

It does make you wonder how many quality projects get overlooked at hackathons every week, doesn't it?

## What's Next

I'd like to explore further integrating the judges with the 0G tech stack to leverage the compute and agentic ID elements. I would also like to expand the sponsor judges available to cover a complete sponsor stack for an event. There are a couple of larger pieces I didn't make it to that I would like to see come to life:

- Prize Pool coordinator: projects meeting technical eligibility criteria but not winning a track prize can be added to a prize pool with micropayments handled automatically by the judging framework. This would be a nice place to also bundle in the feedback report so teams get an email after the event to claim their prize pool payment and access their feedback report.

- LLM Council as Final Boss Judge: adapt the LLM-council concept to deliberate over hackathon projects to identify candidates for event-level prizes, accelerators and/or grants, and synthesize findings into a final stack ranking of projects for the available prizes.

It's important to me that this project evolves with two things as a sort of north star:

- Guidance not gates: where checks are not deterministic and lean on LLM reasoning or conclusions, we're curating a guidance signal and not gates (stack rank for judges rather than eliminating projects from consideration, etc.)
- Use LLM reasoning and outputs only where it adds the best value: deterministic outcomes should be pursued where possible via scripting. Model calls should be added only where the process benefits from the reasoning abilities. No AI just for the sake of using AI.

This is part of a larger mental model I've been working on when it comes to hackathons, developer education, and building tech communities. In the coming months, I'm looking for opportunities to explore some of these ideas and hopefully ship some stuff to make building a little better, and more fun, for all of us.
