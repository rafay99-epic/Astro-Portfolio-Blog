---
lecture_title: "How to Write a Great Research Paper: Notes from Simon Peyton Jones's Lecture"
lecture_description: "In this lecture, I will discuss how to write a good
  research paper and what matters in a research paper. "
pubDate: 2025-03-26
lecture_draft: false
lectureNumber: "05"
subject: Research Methods
---
Simon Peyton Jones kicks off by promising seven simple, actionable suggestions that will genuinely make your research papers better. This isn't just about ticking boxes; it's about fundamentally changing how you approach the act of writing in a research context.

**1\. Don't Wait: Write!**

This is probably one of the most transformative pieces of advice. Many of us fall into what he calls "Model 1":

1\. Have an Idea

2\. Do all the Research

3\. _Then_ Write the Paper

Simon argues this is the wrong way around. He champions "Model 2":

1\. Have an Idea

2\. **Write the Paper**

3\. Do the Research (or, more accurately, _refine_ and _complete_ the research _through_ writing)

Why this seemingly backward approach?

\* **Forces clarity and focus:** The act of trying to explain your idea in writing forces you to confront ambiguities and sharpen your thinking. If you can't write it down clearly, you probably don't understand it as well as you think.

\* **Crystallises what you don't understand:** As you write, you'll hit roadblocks. "Hmm, how do I actually justify this step?" or "What's the precise connection here?" These are your research questions popping up!

\* **Opens dialogue:** A partial draft, even a messy one, is something you can share with colleagues or supervisors. This "reality check" is invaluable for critique and collaboration long before you think you're "done."

He powerfully states: **"Writing papers is a primary mechanism for doing research (not just for reporting it)."**

\* _Real-life example:_ Imagine you're a PhD student working on a new machine learning algorithm. Instead of spending two years coding and experimenting in a vacuum, you start drafting the "Introduction" and "Proposed Method" sections after just a few months. You realize explaining your core innovation is tricky, which pushes you to refine the concept. You also spot gaps in your planned experiments when trying to write the "Expected Results" section. This early writing _guides_ your research.

**2\. Identify Your Key Idea**

Your paper isn't just a data dump; it's a vehicle to transmit a valuable idea.

\* **Goal:** You want to "infect the mind of your reader with your idea, like a virus." It’s about conveying a _useful_ and _re-usable_ insight. He also makes the excellent point that papers are often far more durable than the programs they describe (think of foundational math papers vs. old software).

\* **Don't be intimidated:** There's a fallacy that you need some earth-shattering, Nobel-prize-level idea before you can even _think_ about writing. Nonsense! He encourages writing a paper (and giving a talk) about _any_ idea, no matter how "weedy" it seems. Why?

_Writing_ develops\* the idea.

\* It often turns out to be more interesting and challenging than you initially thought.

\* **The "Ping":** Your paper should have _one clear, sharp idea_. This is its "ping." You might not know exactly what this ping is when you start writing, but you _must_ know it by the time you finish. If you have lots of ideas, write lots of papers!

\* _What is an idea?_ "A re-usable insight, useful to the reader."

\* **Make the "ping" explicit:** Don't make the reader hunt for your main point.

\* Many papers have good ideas but don't clearly distill them.

\* Be 100% explicit:

\* "The main idea of this paper is..."

\* "In this section, we present the main contributions of the paper."

(He thanks Joe Touch for the "one ping" concept).

\* _Real-life example:_ You've developed a new technique for improving battery life in mobile devices. Is your "ping" the specific circuit design, the power management algorithm, or a novel theoretical model for energy consumption? You need to pick _one_ central theme. If you try to cram all three in as equally important, the paper loses focus.

**3\. Tell a Story**

A good research paper has a narrative flow. Imagine you're at a whiteboard explaining your work:

1\. **Here is a problem.**

2\. **It's an interesting problem.** (Why should anyone care?)

3\. **It's an unsolved problem.** (Or existing solutions are inadequate).

4\. **Here is my idea.** (The "ping"!).

5\. **My idea works.** (Show the details, data, evidence).

6\. **Here's how my idea compares to other people's approaches.**

This narrative naturally leads to a common structure for a conference paper, with an estimated number of readers for each section (which is a great way to prioritize effort!):

\* **Title** (1000 readers) – Make it count!

\* **Abstract** (4 sentences, 100 readers) – The elevator pitch.

\* **Introduction** (1 page, 100 readers) – Hooks the reader and outlines the story.

\* **The problem** (1 page, 10 readers) – Deep dive into the context.

\* **My idea** (2 pages, 10 readers) – Explain your core contribution.

\* **The details** (5 pages, 3 readers) – The nitty-gritty for the true believers.

\* **Related work** (1-2 pages, 10 readers) – Situating your work.

\* **Conclusions and further work** (0.5 pages) – Wrap up and look ahead.

\* _Real-life example:_ Think of a medical research paper. It might start with "Problem: Alzheimer's disease affects millions and current treatments are limited." Then, "Interesting/Unsolved: Understanding the role of protein X in early-stage Alzheimer's is crucial but poorly understood." Then, "Our Idea: We propose that inhibiting protein X with our novel compound Y can slow progression." Then, "Evidence: We show data from mouse models and in-vitro studies." Finally, "Comparison: Unlike existing drugs that target symptoms, our approach targets a root cause..."

**4\. Nail Your Contributions to the Mast**

This is all about being incredibly clear about what _you_ are bringing to the table, especially in the Introduction.

\* **The Introduction (1 page ONLY!):**

\* Describe the problem.

\* State your contributions.

\* ...and that is all! (No lengthy related work yet).

\* **Describing the problem:**

_Use an_ example\* to introduce the problem. This makes it concrete and relatable.

\* He cautions against "Molehills not mountains." Don't start with overly broad, generic statements like "Computer programs often have bugs. It is very important to eliminate these bugs..." (Yawn!). Instead, be specific: "Consider this program, which has an interesting bug. . We will show an automatic technique for identifying and removing such bugs." (Cool!).

\* **Stating your contributions:**

\* **Write this list first!** It drives the entire paper. The rest of the paper is about substantiating these claims.

\* This list should make the reader think, "Gosh, if they can really deliver this, that's exciting; I'd better read on!"

_Use a_ \*bulleted list\*\* for your contributions. Don't make the reader guess.

\* **Contributions should be refutable (testable/verifiable):**

\* **No:** "We describe the WizWoz system. It is really cool." (Vague, subjective).

\* **Yes:** "We give the syntax and semantics of a language that supports concurrent processes (Section 3). Its innovative features are..." or "We prove that the type system is sound, and that type checking is decidable (Section 4)." (Specific, verifiable claims).

\* **No:** "We study its properties."

\* **Yes:** "We have built a GUI toolkit in WizWoz, and used it to implement a text editor (Section 5). The result is half the length of the Java version."

\* **Evidence:**

_Your introduction makes claims. The body of the paper_ must\* provide evidence for _each_ claim.

_Check each claim in the intro, identify where the evidence is in the paper, and_ \*forward-reference it\*\* from the claim (e.g., "...as we demonstrate in Section 4.").

\* "Evidence" can be: analysis, comparisons, theorems, measurements, case studies.

\* **No "The rest of this paper is structured as follows..." section:**

\* Instead, use forward references naturally as part of the narrative in the introduction. The intro (including contributions) should survey the whole paper and thus naturally point to the relevant sections.

\* _Real-life example:_ If a contribution is "We present a novel algorithm (Algorithm X) that reduces query latency by 30% for typical workloads (Section 5)," then Section 5 _must_ contain the experiments and data to back up that 30% claim.

**5\. Related Work: Later**

This is a crucial structural point. Many people put related work too early.

\* **Don't put "Related Work" right after the Introduction.** (Slide 27 shows this as "NO!").

\* **Do put "Related Work" towards the end, often before "Conclusions."** (Slide 28 shows this as "YES!").

\* **Why not early?**

\* **Problem 1:** The reader knows nothing about _your_ problem or idea yet. So, your highly compressed description of various technical trade-offs in other people's work is absolutely incomprehensible. It’s like being shown a map of a city you've never heard of and being asked to compare routes.

\* **Problem 2:** Describing alternative approaches too soon gets between the reader and _your_ idea. You want them to understand your contribution first, on its own merits.

\* **Credit – it's not a zero-sum game:**

\* There's a fallacy: "To make my work look good, I have to make other people's work look bad." This is wrong and counterproductive.

\* **The truth:**

\* Warmly acknowledge people who have helped you.

\* Be generous to the competition. "In his inspiring paper \[Foo98\], Foogle shows... We develop his foundation in the following ways..."

_Acknowledge weaknesses in your_ own\* approach. This builds credibility.

\* **Giving credit to others does not diminish the credit you get from your paper.** In fact, it often enhances it by showing you understand the field.

\* _Real-life example:_ If you're presenting a new web framework, first explain _your_ framework's architecture, key features, and benefits. _Then_, in the related work section, you can compare it to React, Angular, Vue, etc., highlighting the differences now that the reader understands what _your_ framework offers.

**6\. Put Your Readers First**

This is about empathy and clear communication.

\* **Presenting the idea:**

\* Avoid overly technical, jargon-filled openings like: "Consider a bifurcated semi-lattice D, over a hyper-modulated signature S..." This sounds impressive but sends readers to sleep or makes them feel stupid.

\* Explain it as if you were speaking to someone using a whiteboard.

\* **Conveying the intuition is primary, not secondary.**

\* Once your reader has the intuition, they can follow the details (but not vice versa).

\* Even if they skip the details, they should still take away something valuable (the intuition!).

\* **Conveying the intuition:**

_Introduce the problem, and your idea, using_ \*EXAMPLES\*\* first. Only then present the general case.

\* (The slides show an example of introducing a programming concept "gsize" with its code and type signature right away, making it concrete).

\* **Don't recapitulate your personal journey of discovery:** That winding road, soaked with your "blood, sweat, and tears," is not interesting to the reader. They don't care about the five failed attempts.

_Instead, choose the_ \*most direct route to the idea\*\* for the reader.

\* _Real-life example:_ If explaining a complex mathematical proof, start with a simple case or a visual analogy. Get the core intuition across. _Then_ present the formal proof. Don't just dump the dense equations on page one.

**7\. Listen to Your Readers**

Getting feedback is essential.

\* **Getting help ("friendly guinea pigs"):**

\* Experts are good. Non-experts are also very good (they'll spot assumptions you've made).

_Each reader can only read your paper for the first time_ once\*. Use them carefully!

\* Explain what kind of feedback you want. "I got lost here" is much more important than "Java is misspelled."

\* **Getting expert help (especially from "competitors"):**

_A good plan: When you_ think\* you're done, send the draft to researchers working on similar things (your "competition"). Say something like, "Could you help me ensure that I describe your work fairly?"

\* Often, they will respond with helpful critique because they are interested in the area.

\* They are likely to be your referees anyway, so getting their comments or criticism upfront is "Jolly Good."

\* **Listening to your reviewers (this is hard but vital!):**

\* **Treat every review like gold dust.** Be (truly) grateful for criticism as well as praise.

\* This is "really, really, really hard," but "really, really, really, really, really important."

\* Read every criticism as a positive suggestion for something you could explain more clearly.

\* **DO NOT** respond (even internally) with "You stupid person, I meant X!"

\* **INSTEAD:** Fix the paper so that X is apparent even to the "stupidest reader." If someone misunderstood, it's likely a flaw in your explanation, not their intellect.

\* Thank them warmly. They have given up their valuable time for you.

\* _Real-life example:_ If a reviewer says, "The distinction between approach A and approach B isn't clear," don't just add one sentence. Re-evaluate that whole section. Maybe you need a comparison table, a diagram, or a more detailed example to highlight the differences.

**Summary of the Seven Points:**

1\. Don't wait: write

2\. Identify your key idea

3\. Tell a story

4\. Nail your contributions

5\. Related work: later

6\. Put your readers first (use examples!)

7\. Listen to your readers

(He also provides a link for more: [www.microsoft.com/research/people/simonpj](http://www.microsoft.com/research/people/simonpj))

**Language and Style**

Finally, some practical tips on the mechanics:

\* **Basic Stuff:**

\* Submit by the deadline.

\* Keep to length restrictions (don't narrow margins or use tiny 6pt font!).

\* Use an appendix for supporting evidence (extra data, long proofs) if needed and allowed.

\* **Always use a spell checker!** (And a grammar checker if possible).

\* **Visual Structure:**

\* Give strong visual structure using:

\* Sections and sub-sections

\* Bullets

\* Italics (for emphasis or defined terms)

\* Well laid-out code snippets

\* **Find out how to draw pictures, and use them!** Diagrams can be incredibly effective. (Slide 49 shows an example of a clear diagram illustrating a "heap object").

\* **Use the Active Voice:**

_The passive voice ("It can be seen that...") is often seen as "respectable" in scientific writing, but it_ deadens\* your paper. Avoid it.

\* **No:** "34 tests were run." **Yes:** "We ran 34 tests."

\* **No:** "These properties were thought desirable." **Yes:** "We wanted to retain these properties."

\* **No:** "It might be thought that this would be a type error." **Yes:** "You might think this would be a type error."

\* **Use Simple, Direct Language:**

\* Avoid overly formal or convoluted phrasing.

\* **No:** "The object under study was displaced horizontally." **Yes:** "The ball moved sideways."

\* **No:** "On an annual basis." **Yes:** "Yearly."

\* **No:** "Endeavour to ascertain." **Yes:** "Find out."

\* **No:** "It could be considered that the speed of storage reclamation left something to be desired." **Yes:** "The garbage collector was really slow."

This is a goldmine of advice. Following these principles will undoubtedly lead to clearer, more impactful, and more successful research papers. It's less about rules and more about a mindset focused on clear communication and empathy for the reader.