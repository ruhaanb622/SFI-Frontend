<!-- converted from GameBuilder-Capstone-Report.docx -->

# Cognitive Overload in Novice STEM Learners
## Learning JavaScript Game Development
John Mortensen – Researcher
Hope Fune – GameBuilder Development
Anvay Vahia – Telemetry Analytics

A Capstone Presented to the Teachers College Faculty of Western Governors University
March 13, 2026
## Abstract
This capstone study investigated novice STEM learners’ experiences of cognitive overload during onboarding to JavaScript-based game development within the Open Coding Society (OCS) e-learning environment. The research focused on understanding how early exposure to multiple interacting systems—syntax, configuration, asset management, and spatial reasoning—affects learners’ cognitive load and progression. Two research questions guided the study: how learners experience cognitive overload during onboarding, and how instructional supports influence their ability to manage cognitive demands. Data were collected using a mixed-methods approach including a Likert-based cognitive load survey, structured microblog reflections, and platform behavioral analytics. Participants consisted of secondary students aged 14–16 enrolled in an introductory computer science course. Findings indicated that the GameBuilder and GameRunner tools reduced extraneous cognitive load by providing structured scaffolding and immediate visual feedback. Learners demonstrated strong conceptual understanding of object interactions and maintained productive engagement patterns. Conclusions support the effectiveness of the scaffolded e-learning design while identifying areas for refinement, including enhanced hitbox visualization and automated level integration.

# Chapter 1: Introduction

## Instructional Problem
Learners in the Open Coding Society (OCS) learning environment, particularly introductory learners represented by the Scrummer persona, experience cognitive overload during early exposure to JavaScript-based game development. This overload emerges as learners are required to simultaneously manage programming syntax, game engine configuration, asset selection, and spatial layout decisions within the initial learning design.
The instructional problem is characterized by a gap between learners’ current and desired knowledge, skills, and abilities (KSAs) related to managing task complexity, abstraction, and verification during onboarding to JavaScript-based game development concepts and tools. As a result, learners frequently experience confusion, stalled progress, and difficulty determining where to focus attention, which disrupts workflow and increases reliance on external guidance and reassurance.
## Current State – Introductory Scrummer KSAs
Knowledge
- Limited understanding of how game engine components relate to one another.
- Uncertainty about which elements are essential versus peripheral during early development.
- Incomplete mental model of how code, assets, and layout integrate to form a functional game scene.
Skills
- Can follow step-by-step instructions but struggles to prioritize tasks when multiple systems are introduced simultaneously.
- Attempts configuration and coding tasks without a clear strategy for reducing complexity or isolating problems.
Abilities
- Inconsistent ability to manage cognitive load during multi-step technical tasks.
- Difficulty progressing beyond setup and configuration phases, delaying engagement with core JavaScript game logic.

## Desired State – Post-Onboarding KSAs
Knowledge
- Understands the functional roles of core game elements (backgrounds, players, non-player characters, and walls).
- Recognizes how abstraction and sequencing reduce complexity during early development.
Skills
- Uses structured tools and system feedback to incrementally build and verify game components.
- Focuses attention on core concepts before engaging with deeper engine configuration and advanced logic.
Abilities
- Demonstrates improved regulation of cognitive load during early development tasks.
- Transitions more effectively from initial setup to sustained engagement with JavaScript-based game mechanics.
### Gap Between Current and Desired States
- High Extraneous Cognitive Load During Early Development Tasks
- Introductory learners are exposed to multiple sources of complexity at once, including engine configuration, asset management, and programming syntax. This simultaneous demand exceeds learners’ cognitive capacity, resulting in confusion, errors, and reduced persistence.
- Premature Exposure to Low-Level Configuration
- Early tasks require learners to interact with configuration details before foundational concepts are established, increasing extraneous cognitive load and obscuring the underlying purpose of development activities.
- Underdeveloped Scaffolding for Complexity Management
- While introductory activities are present, additional instructional scaffolding is needed to help learners sequence tasks, reduce cognitive demands, and focus attention on essential concepts prior to engaging in deeper JavaScript game logic.

### Instructional Expectations
- Introductory learners in the OCS learning environment require instructional supports that reduce cognitive overload during onboarding to JavaScript-based game development. Analysis of the Scrummer persona suggests that overload occurs when learners are expected to manage multiple interacting systems without sufficient abstraction, sequencing, or guidance.
- To support early engagement and sustained progress, the learning environment should regulate task complexity and make core development concepts more salient during initial instruction. When cognitive demands are not intentionally managed, learners are more likely to experience confusion, delayed progress, and increased reliance on instructional support during early development activities.
- From an instructional perspective, the learning context is characterized by identified needs related to cognitive load management during onboarding. These needs are evident in the following observed areas:
- Simultaneous introduction of syntax, configuration, and asset management, increasing extraneous cognitive load.
- Limited support for isolating and sequencing core concepts during early game development tasks.
- Variability in learner confidence and persistence when confronted with complex, multi-step setup activities.
- Reactive use of instructor and peer support driven by overload rather than intentional instructional escalation.




## Research Topic
Explore novice STEM learners’ experiences of cognitive overload during onboarding to JavaScript-based game development within a digitally mediated e-learning environment.
The instructional context includes teacher-provided onboarding supports—such as game-building tools, starter code, demonstration video, and structured learning tasks—while requiring learners to independently engage with configuration, asset selection, and basic interactive elements during early JavaScript-based game development activities. This instructional design foregrounds learners’ initial experiences managing task complexity and abstraction, with the goal of examining how cognitive overload influences learners’ engagement and progress during early JavaScript-based game development instruction.
## Research Topic Importance
This study is important because novice STEM learners frequently encounter cognitive overload when first engaging with JavaScript-based game development, where multiple sources of complexity—programming syntax, engine configuration, asset management, and spatial reasoning—are introduced simultaneously. Early learning experiences that exceed learners’ cognitive capacity can impede progress, increase frustration, and discourage sustained engagement in computer science and game development pathways.
Traditional introductory programming instruction often emphasizes code syntax and functional correctness while underestimating the cumulative cognitive demands placed on novice learners during onboarding to complex development environments. Prior research demonstrates that unmanaged cognitive load negatively affects learning efficiency, problem-solving, and persistence, particularly for novices in technical domains (Sweller, 1988; Sweller, Ayres, & Kalyuga, 2011). While cognitive load theory has been widely applied in STEM education, less is known about how novice learners experience cognitive overload specifically during onboarding to JavaScript-based game development environments.
Examining learners’ experiences of cognitive overload during early game development onboarding addresses this gap by clarifying how task sequencing, abstraction, and instructional supports influence learners’ ability to engage meaningfully with foundational concepts. Understanding these experiences is essential for informing instructional design approaches that reduce extraneous cognitive load, support early task engagement, and promote sustained participation in game-based and computer science learning contexts.

## Research Questions
### RQ1 – Learner Experience
How do novice STEM learners experience cognitive overload during onboarding to JavaScript-based game development within an e-learning environment?
### RQ2 – Learning Support and Progress
How do onboarding task design and instructional supports influence novice learners’ ability to manage cognitive load and progress through early JavaScript-based game development activities?

## Research Purpose
The purpose of this design-based research study is to examine novice STEM learners’ experiences of cognitive overload during onboarding to JavaScript-based game development and to explore how onboarding task design and instructional supports shape learners’ ability to manage cognitive load and progress through early game development activities within an e-learning environment.


# Chapter 2: Literature Review

## Introduction to the Literature Review and Organization of Themes

Novice learners in STEM frequently encounter cognitive overload when first engaging with complex, digitally mediated learning environments. In the context of JavaScript-based game development, learners must simultaneously manage programming syntax, engine configuration, asset selection, and spatial layout decisions. This combination of simultaneous demands can exceed their working memory capacity, impede task progression, and delay engagement with core programming concepts.

This study investigates how instructional supports, such as structured scaffolds, visual tools, and immediate feedback mechanisms, influence early onboarding experiences and cognitive load management during game development tasks. It examines whether providing simplified pathways—focusing initially on game assets, visual layout, and incremental configuration—helps learners manage cognitive demands while fostering early engagement with coding and game logic.

The literature review is organized around the following themes:
 (a) cognitive load and novice learning in STEM,
 (b) scaffolding, sequencing, and tool-supported onboarding,
 (c) visual and asset-based support for early game development,
 (d) immediate feedback and iterative coding environments, and
 (e) reflection, monitoring, and social supports in technology-mediated learning.



## Literature Review Synthesis

### Theme 1: Cognitive Load in Novice Learners
Cognitive Load Theory (CLT) holds that learning effectiveness depends on managing the limited capacity of working memory by balancing intrinsic, extraneous, and germane cognitive load (Sweller, 1988; Sweller, Ayres, & Kalyuga, 2011). Novice learners are especially vulnerable to extraneous load when confronted with programming tasks involving simultaneous demands such as syntax, logic, tooling, and problem interpretation, often resulting in cognitive overload without sufficient scaffolding (Robins et al., 2003; Lister et al., 2004). Composite Instructional Designs (CID) that decompose complex tasks into structured phases—such as guided discovery, explicit explanation, and practice—have been shown to reduce extraneous load and support schema construction (Loibl et al., 2024). Viewed through a CLT lens, CID provides a mechanism for sequencing discovery, explanation, and practice in ways that reduce extraneous load for novice learners.

### Theme 2: Tool-Supported Scaffolding
Tool-supported learning environments can mitigate cognitive overload by providing structured, just-in-time scaffolding that supports learners’ regulation of attention and problem-solving processes. Research grounded in Cognitive Load Theory and self-regulated learning demonstrates that external scaffolds—such as prompts, guidance, and structured task support—reduce extraneous cognitive load and allow learners to focus on essential learning activities (Sweller, 1988; Azevedo & Cromley, 2004). In game-based learning contexts, cognitive scaffolding models emphasize the role of contextualization, procedural logic, and active construction in supporting motivation–cognition interactions and gradual capability development (Ding et al., 2025).

### Theme 3: Visual and Asset-Based Support in Game Development
In interactive and game-based learning contexts, asset-based elements—such as visual environments, characters, and objects—can serve as accessible entry points that help novice learners form mental models of functional relationships before engaging with more abstract or symbolic representations (Gee, 2003; Paivio, 1986). This form of incremental, visually grounded exposure aligns with cognitive load principles by reducing extraneous processing demands while supporting early comprehension and engagement (Mayer, 2009).  Across Gee (2003), Paivio (1986), and Mayer (2009), a common pattern emerges: visual representation consistently aids schema formation and early comprehension, regardless of the specific game or learning environment.

### Theme 4: Immediate Feedback and Iterative Coding
Together, visual scaffolds and immediate feedback mechanisms can support both cognitive and affective processes in novice learners, helping them form accurate mental models while maintaining engagement, confidence, and motivation (Bandura, 1997; Shute, 2008). Immediate feedback—such as live code execution, visual updates, or runtime error alerts—allows learners to test hypotheses quickly and correct misunderstandings before they compound within learners’ cognitive schemas. Rapid feedback supports working memory by externalizing correctness signals and reducing repeated errors (Sweller, 1988; Robins et al., 2003; Lister et al., 2004), promoting safe experimentation, persistence, and early comprehension.

### Theme 5: Reflection, Monitoring, and Social Support
Reflection and monitoring help learners consolidate understanding and regulate cognitive load (Garrison et al., 2000; Deng & Yuen, 2011). Early onboarding activities that encourage learners to review their configurations, assess asset placement, and track progress can improve awareness of cognitive demands. Social supports—including peer reflection, shared progress indicators, and collaborative discussion—further scaffold cognitive load management by providing external cues and opportunities for problem-solving while fostering motivation, engagement, and positive affect (Vygotsky, 1978; Johnson & Johnson, 2009). Additionally, promoting self-regulated learning through reflection and goal-setting supports learners in planning, monitoring, and evaluating their progress, which strengthens both cognitive and metacognitive processes (Zimmerman, 2002). Viewed through a cognitive load lens, composite instructional designs provide a mechanism for sequencing discovery, explanation, and practice in ways that reduce extraneous load for novice learners (Loibl et al., 2024).
### Conclusion / Summarize
Across these themes, the literature indicates that cognitive overload in early game-based learning can be managed through carefully sequenced onboarding, tool-supported scaffolding, visual and asset-based exposure, immediate feedback, and reflective social practices. Together, these strategies provide a theoretical foundation for understanding how composite instructional designs can support novice learners’ engagement, progress, and cognitive load management in interactive and game-based learning contexts.

### Conclusion / Reflect
The integration of visual scaffolds, iterative feedback, and reflective practices suggests that novice learners benefit from structured, progressive support. This informs the capstone by highlighting the importance of sequencing and monitoring learner engagement to reduce cognitive overload and enhance motivation. While studies support scaffolding, feedback, and visual supports individually, few examine the combined effects of these strategies—particularly the interplay of visual scaffolds, immediate feedback, and social reflection—in JavaScript-based game development.
Research and practical experience suggest that coding is often perceived as a highly symbolic, individual, and abstract activity, which can limit engagement and creativity. By introducing coding through visual tooling, peer interaction, and asset-based design, learners can experience programming as a creative and interactive process. This approach frames coding as a system of functional relationships and responsive design, similar to the creative problem-solving inherent in devices such as mobile phones or interactive games. The capstone study thus provides an opportunity to examine how these combined strategies influence cognitive load, engagement, and learner progression, offering insights into more holistic approaches to onboarding novice programmers.


# Chapter 3: Research Methodology
## Instructional Problem Overview
Learners in the Open Coding Society (OCS) learning environment, particularly introductory learners represented by the Scrummer persona, experience significant cognitive overload during early exposure to JavaScript-based game development. This overload occurs because learners are required to manage multiple sources of intrinsic and extraneous cognitive load simultaneously during initial onboarding, including JavaScript syntax, game engine configuration, asset selection, and spatial layout decisions.
The instructional problem was observed during introductory game development activities in which novice learners were expected to construct functional games from low-level abstractions. Learners demonstrated difficulty determining where to focus attention, how individual components (e.g., background, player, non-player characters) relate to one another, and how code decisions translate into observable game behavior. This resulted in stalled progress, frequent requests for reassurance, and reliance on external guidance rather than independent problem-solving.
The problem reflects a gap between learners’ current and desired knowledge, skills, and abilities (KSAs), particularly in abstraction management, task decomposition, and outcome verification. While learners possess motivation and emerging programming literacy, the learning design does not sufficiently scaffold early interactions with complex systems. As a result, learners struggle to build coherent mental models of how JavaScript objects, game mechanics, and visual outcomes interrelate, impeding confidence and early momentum.

## Potential Solutions
### Potential Solution 1: Direct Instruction on Game Objects and Capabilities
The first potential e-learning solution involves explicit instruction on individual game object types and their capabilities, supported by sample JavaScript code. Learners would be introduced to core objects such as backgrounds, players, and non-player characters (NPCs) through guided examples and isolated demonstrations of functionality.
Learning Technology Tools
This solution would be supported by GitHub, the VS Code editor, a browser-based player, annotated code examples, and written instructions with short instructional videos demonstrating object behavior. Documentation and sandbox build environments would allow learners to experiment with predefined code samples.
Version control and guided checkpoints would be incorporated to support incremental progress.
Advantage
An advantage of this solution is that it provides clear, structured exposure to foundational concepts and terminology. Learners gain familiarity with individual components in isolation, which can support later understanding of more complex systems.
Challenge
A key challenge is that learners struggle to bridge the gap between isolated object knowledge and functional game construction. Understanding individual objects does not readily translate into knowing how to combine them into a cohesive, working system.
Addressing the Challenge
To mitigate this challenge, supplemental integrative examples could be added to demonstrate object interaction. However, this increases instructional complexity and risks reintroducing cognitive overload, limiting the overall effectiveness of the solution.

### Potential Solution 2: Incremental Game Construction Using JavaScript Literal Objects
The second potential solution involves providing learners with a predefined game engine while requiring them to incrementally construct JavaScript for literal objects that describe game properties. Learners would build the game piece by piece by editing configuration-style objects that control behavior and appearance.
Learning Technology Tools
This solution would also be supported by GitHub, the VS Code editor, browser-based player, and video.  This approach differs by using JavaScript for literal object templates to simplify the creation of game objects.
Version control and guided checkpoints would be incorporated to support incremental progress.
Advantage
An advantage of this solution is that it reduces the need for learners to manage low-level engine logic while encouraging engagement with data structures and configuration concepts. It also enforces a consistent structure that can support debugging and verification.
Challenge
A significant challenge is that learners lack visibility into how configuration changes affect gameplay in real time. The process can feel tedious and abstract, making it difficult for learners to form a clear mental model of cause-and-effects between code and output.  This can lead to delay in finding errors and lack of motivation in tedious constructs.
Addressing the Challenge
This challenge could be addressed by adding more frequent previews and visualization steps. However, this increases tooling complexity and still does not fully resolve the lack of immediate, meaningful feedback during early learning stages.

### Potential Solution 3: GameBuilder and GameRunner Tool-Based Scaffolding
The third potential solution proposes the use of two complementary tools: a GameBuilder and a GameRunner. The GameBuilder visually demonstrates game capabilities and automatically generates the underlying JavaScript for literal objects required by the game engine. The GameRunner allows learners to run the game immediately and make simple, high-impact customizations such as swapping assets, adjusting positions, and modifying player-to-NPC dialogue using structured code templates.
This solution is designed to provide a soft entry into game development while preserving a clear pathway to deeper customization and abstraction. Learners begin with observable, functional outcomes and gradually transition into understanding and modifying the supporting code.
Learning Technology Tools
This solution would be supported by a web-based GameBuilder interface, a GameRunner execution environment, template-driven code editors, and asset libraries. The tools would integrate visual controls with underlying JavaScript representations, allowing learners to toggle between visual configuration and code-level inspection.
Version control and guided checkpoints would be incorporated to support incremental progress.
Advantage
The primary advantage of this solution is its alignment with cognitive load theory. By externalizing complex setup tasks and emphasizing immediate, visible outcomes, learners can focus attention on understanding relationships between components rather than managing syntactic and structural complexity. This supports schema formation, confidence, and sustained engagement.
Challenge
A potential challenge is the upfront development and maintenance effort required to design and support the GameBuilder and GameRunner tools. Ensuring tool reliability and alignment with instructional goals may require iterative refinement.
Addressing the Challenge
To address this challenge, development would follow an iterative, minimum viable product (MVP) approach. Early prototypes would focus on core functionality, with learner feedback guiding incremental improvements. Clear documentation and modular tool design would reduce long-term maintenance complexity.



## Selected E-Learning Solution
The selected solution for this project is Potential Solution 3: GameBuilder and GameRunner Tool-Based Scaffolding. This solution was chosen because it most effectively addresses the identified instructional problem by reducing extraneous cognitive load while preserving meaningful learner agency.
Compared to Solution 1, which emphasizes isolated object instruction, the GameBuilder/GameRunner approach provides immediate functional context, helping learners understand how components interact within a complete system. Compared to Solution 2, which relies on abstract configuration through JavaScript for literal objects, the selected solution offers clearer visibility into outcomes and reduces tedious trial-and-error.
Most importantly, Solution 3 aligns with the needs of introductory learners by providing a structured yet flexible onboarding experience. It supports early success, gradual abstraction, and confidence-building, making it the strongest foundation for the subsequent design and evaluation of the proposed e-learning module.



## E-Learning Unit of Instruction Description
### Module Title
Applying Object-Based Game Mechanics
## Module Description
This e-learning module guides learners through the applied use of object-oriented programming principles within the OCS GameEngine using the GameBuilder and GameRunner tools. The instructional focus centers on configuring and manipulating interactive game objects through structured property modification and systems-level testing.
Learners work with core mechanics, including object scaling, animation rate adjustment, hitbox configuration, barrier implementation, interactive dialogue callbacks, and key mapping. Through scaffolded activities, students move from isolated JavaScript syntax exercises toward structured manipulation of interconnected game systems within a controlled development environment.
The module includes guided demonstrations, structured practice activities, three formative assessments, and one summative performance task. Formative activities progressively isolate system components before integrating interactive behaviors. The summative assessment requires learners to independently define or extend a game asset and document their implementation decisions.
Total learner engagement time is approximately 90–102 minutes within the GameBuilder and GameRunner environments.
This module represents the applied systems transition phase within a larger 20-week sprint-based instructional model. It functions as a bridge between foundational programming knowledge and collaborative multi-object game development, reducing cognitive overload while strengthening systems thinking.
## Target Audience
The target audience for this module consists of 9th–10th grade secondary students enrolled in an introductory computer science course. Learners have completed approximately 12 weeks of prior instruction focused primarily on semantic and syntactic JavaScript development.
Students have demonstrated proficiency in foundational programming constructs including variables, conditionals, functions, and basic object structures. Instruction to date has emphasized code correctness, readability, and logical structure rather than systems-level integration.
In addition to coding fundamentals, learners have engaged in structured use of software development lifecycle (SDLC) tools. They have developed personal GitHub Pages portfolios, forked repositories, and submitted pull requests for lesson integrations prior to classroom presentations. This experience has provided exposure to version control workflows, collaborative review processes, and structured documentation practices.
Learners have also participated in preliminary game ideation activities, exploring basic gameplay concepts and interactive design thinking. However, their experience with game development remains conceptual rather than applied within a structured engine environment.
At this stage, students are prepared to transition from isolated syntax-based programming tasks to applied object-based systems development using GameBuilder and GameRunner. The module is designed to support this progression by introducing scaffolded interaction with configurable game objects within a controlled development environment.
## Learning Goal
The learning goal of this module is for learners to apply object-oriented programming principles to configure, modify, and evaluate interactive game mechanics within the OCS GameEngine using a structured development environment.
## Learning Objectives
By the end of this module, learners will be able to:
- Analyze how object properties (e.g., scale factor, animation rate, hitbox dimensions, and key mappings) influence gameplay behavior.
- Modify object configurations within GameBuilder and evaluate the impact of those modifications using GameRunner.
- Implement and tune interactive mechanics including barriers, collisions, and dialogue callbacks.
- Document and justify configuration decisions using structured GitHub workflows.

## Formative and Summative Assessments
### Formative Assessment 1 – Mini Game Configuration
Learners create a structured mini game in GameBuilder that includes background, player, NPC, and barriers. Students export the generated JavaScript file, commit it to their GitHub repository, and document object configuration decisions within a GitHub Issue.
This assessment measures Objectives 1, 2, and 4 by requiring learners to demonstrate correct object setup and provide written justification of configuration choices.
### Formative Assessment 2 – Property Exploration and Prediction
Learners modify selected object properties (e.g., scaling, animation rate, hitbox percentages, key mappings) and document predicted gameplay outcomes prior to testing. After executing the game in GameRunner module with GameBuilder, learners compare predicted versus actual behavior and explain discrepancies.
This assessment measures Objectives 1 and 2 by requiring analytical reasoning and evaluation of system-level behavior.
### Formative Assessment 3 – Collision and Interaction Tuning
Learners configure collision mechanics and interactive dialogue behaviors by adjusting hitboxes and callback functions. Students iteratively test and refine object interactions, documenting design decisions in GitHub.
This assessment measures Objective 3 by requiring implementation and refinement of interactive mechanics.

### Summative Assessment – Individual Asset Contribution
Learners independently define or extend a Player, Background with Walls, or NPC asset and submit a Pull Request containing functional configuration code, documentation, links to formative assessments, and a short demonstration video explaining implemented mechanics. A written reflection is included to articulate systems-level understanding.
This assessment measures all four objectives by evaluating functional correctness, documentation quality, and demonstrated understanding of object-based systems.
## Learner Needs
### Learner Need 1: Transition from Syntax-Based Thinking to Systems Thinking
Students have primarily engaged in semantic and syntactic coding exercises. They may struggle to conceptualize how multiple object properties interact dynamically within a larger system.
### Learner Need 2: Role-Based Cognitive Imbalance in Collaborative Contexts
As the course progresses into sprint-based collaboration with defined personas (Scrummer, Designer, Technologist), students may over-identify with a single role. Designers may prioritize narrative and artistic elements, Technologists may focus narrowly on mechanics, and Scrummers may focus on process over implementation. This imbalance can fragment systems-level understanding.

## Addressing Learner Needs
### Addressing Learner Need 1
The module scaffolds systems thinking through structured progression:
- Formative Assessment 1 isolates object configuration.
- Formative Assessment 2 requires predictive reasoning before execution, forcing learners to anticipate system behavior.
- Formative Assessment 3 integrates collision and interaction tuning, requiring iterative refinement.
Immediate visual feedback in GameRunner reinforces causal relationships between property modification and gameplay outcome.
### Addressing Learner Need 2
Although this module is individually assessed, it prepares students for collaborative sprint roles by emphasizing integrated systems reasoning:
- Designers must understand how narrative dialogue connects to collision triggers and callback functions.
- Technologists must consider user interaction and pacing implications when tuning animation and hitboxes.
- Scrummers observe how structured documentation (GitHub Issues and Pull Requests) unifies creative and technical workflows.
By requiring documentation and reflection in the summative assessment, the module reinforces cross-role awareness prior to collaborative sprint implementation.
### Learning Technology Tools
- GameBuilder (OCS GameEngine configuration interface)
- GameRunner, built into GameBuilder (real-time execution and testing environment)

## Justification of Learning Technology Tools
GameBuilder reduces extraneous cognitive load by abstracting boilerplate code and presenting object properties in a structured configuration interface. This allows learners to focus on conceptual relationships between object attributes and system behavior rather than low-level syntax construction.
GameRunner provides immediate execution feedback, enabling iterative testing and refinement. The rapid feedback loop strengthens experiential learning and reinforces understanding of object interaction dynamics, directly supporting the module’s learning goal.

## Justification: Addressing the Instructional Problem
The instructional problem identified in prior analysis is that learners experience cognitive overload when transitioning from isolated programming exercises to interactive, multi-object systems.
This e-learning module addresses that problem in three specific ways:
- Incremental Complexity Progression
 The module moves from isolated object configuration to integrated interactive systems through three structured formative assessments.
- Predictive Reasoning Requirement
 Learners must document expected outcomes before executing property changes, promoting analytical systems thinking rather than trial-and-error modification.
- Integrated Documentation and Reflection
 GitHub Issues, Pull Requests, and the summative reflection require learners to articulate how object properties influence gameplay systems, reinforcing metacognitive awareness and deeper conceptual integration.
Through scaffolded configuration, iterative testing, and structured documentation, the module reduces cognitive overload while supporting the transition to applied object-based systems development within a sprint-based instructional framework.



## E-Learning Planning a Research Methodology

### Method
This study will employ a mixed-methods Design and Development (D&D) research design.
The purpose of this study is not solely to determine whether learning occurred, but to evaluate and refine an instructional design intervention intended to reduce cognitive overload during students’ transition from syntax-based programming to applied object-based systems development.
Because the research questions in Chapter 1 address both measurable learning outcomes and learner experience during systems integration, a mixed-methods approach is required.
### Quantitative Components
- Platform behavioral analytics (time on task, interaction rate, scroll depth, execution frequency)
- Likert-scale survey responses measuring perceived cognitive load and confidence
These data provide measurable indicators of engagement, overload, and system readiness.
### Qualitative Components
- Structured microblog reflections
- Open-ended survey responses
These data provide explanatory insights into cognitive friction and scaffolding effectiveness during the module.
### Justification
This study employs a mixed-methods Design and Development (D&D) research design because each research question requires different types of data for adequate interpretation.
Research Question 1 (Learner Experience):
 This question seeks to understand how learners experience cognitive overload while engaging with the e-learning solution. To address this question, qualitative data are required to capture students’ perceptions, reflections, and descriptions of confusion or mental strain during the module. Structured microblog reflections and open-ended survey responses provide direct insight into learners’ lived experiences of overload. Quantitative Likert-scale survey items measuring perceived overload further support this question by allowing aggregation of student-reported cognitive strain levels.
Research Question 2 (Learner Outcome):
 This question examines learners’ ability to manage cognitive load and progress through the e-learning solution. Quantitative platform analytics (e.g., time on task, interaction rate, execution frequency) provide objective indicators of progression and behavioral engagement. Likert-scale items related to overload also contribute by identifying whether students report difficulty managing mental demands. Qualitative reflections provide contextual explanation for behavioral patterns observed in analytics data.
A purely quantitative approach would not sufficiently explain how learners subjectively experience cognitive overload. A purely qualitative approach would not provide objective indicators of progression through the system. Therefore, a mixed-methods D&D design is necessary to integrate perception data and behavioral analytics to answer both research questions.
The selection of instruments and analysis methods is intentionally limited to those necessary to address the two research questions identified in Chapter 1. No additional outcome measures or comparative analyses are included beyond what is required to evaluate learner experience and progression within this bounded implementation. This ensures methodological coherence and alignment between the problem statement, research questions, data collection instruments, and analytic approach.


## Participants and Stakeholders
### 1. Participants
Participants will include approximately 50 secondary students enrolled in a 9th–10th grade introductory computer science course.
Students are:
- Ages 14–16
- Approximately 13 weeks into a 24-week sprint-based course
- Proficient in foundational JavaScript constructs
- Experienced with GitHub workflow and version control processes
- Participation in instruction is universal
### 2. Participant Selection
Participants will be selected using criterion-based convenience sampling. All students enrolled in the course during the March 2–6, 2026 implementation window will receive the instructional intervention.
For research analysis, students will self-identify by survey before module implementation into one of four work-habit personas:
- Technologist
- Scrummer
- Planner
- Finisher
Persona categorization will be used descriptively to observe variation in engagement patterns during design refinement. No formal statistical comparison across persona groups will be conducted.
Participation in research data analysis will comply with institutional research policies. No identifying information will be reported.
### 3. Stakeholders
Primary Stakeholder:
- Course instructor (researcher), responsible for instructional refinement and curriculum sequencing.
Secondary Stakeholders:
- Future cohorts (2027 implementation cycle)
- School-level computer science program
- Open Coding Society curriculum development framework
Stakeholders have a vested interest in reducing overload during systems integration and optimizing the timing of GameBuilder introduction within the course sequence.

## Data Collection Instruments
Three instruments will be used.
### Instrument 1: Ordinal perception data, overload indicators, and explanatory text.
Type: Structured post-module survey
 Administration: Collected at time of summative submission
 Items: 5 Likert-scale (5-point) + 2 short-response
## Static Copy
## OCS GameBuilder Object Interaction & Cognitive Load Survey
Scale:
 1 = Strongly Disagree, 2 = Disagree, 3 = Neutral, 4 = Agree, 5 = Strongly Agree
- I understand how object properties (speed, position, hitbox size) affect gameplay outcomes.
- I can explain how objects interact and react when collisions occur.
- I could predict what would happen before running GameRunner when adjusting hitboxes or interaction logic.
- When objects did not behave as expected, I knew where to look to debug the interaction.
- While building and testing object interactions, I felt mentally overloaded.
Open Response
- What was the most confusing part of configuring object interactions (e.g., hitboxes, collision reactions, object properties)?
- What specific scaffold, example, or tool feature helped you understand object interactions most clearly?
Data Provided:
 Ordinal perception data, overload indicators, confidence shifts, explanatory text.

### Instrument 2: Microblog Reflection Entries
Type: Structured micro-reflection (short, time-bound responses)
 Entries: 3 prompts, 2 times during module
Prompts include:
- What confused you today?
- What “clicked” in your understanding?
- Where did object interactions feel complex?
Data Provided:
 Real-time learner interaction, friction themes, persona-differentiated struggle patterns.

### Instrument 3: Platform Behavioral Analytics
Automatically collected telemetry includes:
- Time on task
- Interaction rate
- Scroll depth
- Code execution frequency
- Lesson dwell time
Data Provided:
 Objective engagement measures, productive struggle indicators, overload proxies, persona-based usage variation.

### Alignment With Research Questions
Each instrument directly supports one or both research questions identified in Chapter 1. No additional outcome measures are used beyond those described in Section D.

## Alignment Justification
Research Question 1 focuses on how learners experience cognitive overload while engaging with the e-learning solution. This question requires perception-based data that capture students’ subjective experiences of mental strain and confusion. The Likert overload item provides measurable perception data, while microblog reflections offer descriptive insight into moments of cognitive friction. Together, these instruments provide both aggregated and explanatory evidence regarding learners’ experience of overload.
Research Question 2 examines the extent to which learners are able to manage cognitive load and progress through the module. This question requires objective indicators of progression. Platform behavioral analytics (e.g., time on task, interaction rate, execution frequency) provide measurable evidence of learner progression through the system. The overload survey item and reflection trends support interpretation of whether progression patterns reflect manageable cognitive demand or task-related friction. Each instrument is aligned directly to one or both of the two research questions presented in Chapter 1.
## Data Analysis Techniques
### Quantitative Analysis
Descriptive statistics (mean, median, standard deviation)
- Calculated for each Likert survey item
- Used to determine overall levels of perceived cognitive load and learner confidence
- Directly addresses RQ1 (experience of cognitive overload)
Engagement metric aggregation (behavioral analytics)
- Time on task
- Interaction frequency
- Execution attempts
- Scroll depth
These metrics will be summarized using descriptive statistics to evaluate learner progression through the module.
 This directly addresses RQ2 (ability to manage cognitive load and progress).
Behavioral telemetry pattern review
 Telemetry patterns will be examined descriptively for indicators such as:
- High dwell time with low interaction (potential cognitive friction)
- High execution frequency (productive experimentation)
- Inconsistent scroll depth (possible navigation difficulty)
These patterns provide contextual interpretation of learner progression and support findings related to RQ2.
### Qualitative Analysis
Thematic coding of short-response survey items
- Responses will be coded for recurring themes related to confusion, overload, scaffold clarity, and interaction challenges.
- Codes will be grouped into broader categories representing sources of cognitive friction or supports to understanding.
This analysis supports:
- RQ1 by identifying perceived overload experiences
- RQ2 by identifying how learners describe managing or resolving difficulty
No inferential statistical testing or group comparison analysis will be conducted, as the purpose of this Design and Development study is descriptive and refinement-oriented.
## Temporal Scaling and Design Transfer Considerations
The March 2–6, 2026 implementation represents a bounded instructional exposure within a compressed time frame. While this structure allows for controlled data collection and clear measurement of cognitive load indicators, it does not fully replicate the extended iterative conditions of the 20-day Tinker and Build sprint cycle that follows in the course sequence. Therefore, findings will be interpreted within the context of temporal scaling.
In a compressed two-day implementation, students may experience elevated cognitive load due to reduced incubation time, limited debugging cycles, and accelerated systems integration demands. Overload indicators observed in telemetry or perception surveys may reflect cognitive compression rather than structural design failure. In contrast, a 20-day sprint environment offers greater autonomy, repeated opportunities for iteration, peer scaffolding, and extended problem-solving cycles. These conditions may allow learners to transition from initial cognitive fog into greater systems-level fluency and independent design reasoning.
Accordingly, post-analysis interpretation will distinguish between design-related friction and time-bound exposure effects. The purpose of Phase 1 is to identify structural scaffold gaps and interaction friction points, not to make definitive claims about long-term mastery. Findings will inform refinements that prepare the intervention for authentic sprint-based integration in the 2027 implementation cycle, where extended time-on-task may influence cognitive load stabilization and learner autonomy.

## Schedule for Study
Start Date: March 2, 2026
 End Date: March 6, 2026
March 2 – Module launch
 March 3–5 – Formative assessments + microblog collection
 March 6 – Summative assessment + post-survey
Data collection will conclude on March 6, 2026.
Analysis and design refinement will occur during 2026–2027.

## Data Security and Confidentiality
- Participants will be assigned numeric identifiers.
- No names or identifying information will be included in analysis.
- Data will be stored on a password-protected device.
- Digital files will be encrypted where applicable.
- Only the researcher will have access to raw datasets.
- Data will be retained according to institutional policy and then securely deleted.
All procedures will comply with FERPA and institutional research standards.

## Conclusion
This Design and Development study uses a mixed-methods approach to examine learners’ experience of cognitive load and their ability to manage that load while applying object-based mechanics within a larger system.
Data will be collected using three instruments:
- A structured Likert-based cognitive load survey
- Two short-response survey items
- Platform behavioral analytics captured within the GameBuilder environment
Data will be analyzed using the following methods:
- Descriptive statistics (mean, median, standard deviation) for Likert survey items
- Descriptive aggregation of behavioral analytics (e.g., time on task, interaction frequency, execution attempts, scroll depth)
- Thematic coding of short-response data to identify recurring patterns of cognitive friction and instructional support
Together, these quantitative and qualitative methods provide aligned and complementary evidence addressing:
- Research Question 1: Learners’ experience of cognitive overload
- Research Question 2: Learners’ ability to manage cognitive load and progress through the module
Findings will inform iterative refinement of the instructional design.  The study remains intentionally bounded to descriptive and refinement-oriented analysis aligned directly to the research questions presented in Chapter 1.



# Chapter 4: Results
## Summary of Research
This study examined novice STEM learners’ experiences of cognitive overload during onboarding to JavaScript-based game development within a digitally mediated e-learning environment. The instructional problem identified in Chapter 1 concerned the difficulty novice learners face when they are required to manage multiple interacting systems simultaneously during early game development activities, including JavaScript syntax, asset configuration, and spatial layout decisions.
The study was conducted within the Open Coding Society (OCS) learning environment and involved secondary students enrolled in a 9th–10th grade introductory computer science course. Participants were approximately 13 weeks into a 24-week instructional sequence focused on JavaScript programming and collaborative game development. At the time of implementation, students had prior experience with fundamental programming constructs, GitHub workflows, and version control processes but had limited experience integrating those skills into interactive game systems.
The instructional intervention consisted of a structured e-learning module titled Applying Object-Based Game Mechanics. The module introduced learners to the GameBuilder and GameRunner tools, which support configuration and execution of game objects within the OCS GameEngine. Through scaffolded activities, learners configured interactive game objects, modified object properties, and tested gameplay outcomes in a controlled development environment.
Participants engaged in three formative assessments and one summative performance task. These activities require learners to construct and test mini-game configurations, explore object properties, implement collision and interaction mechanics, and document configuration decisions using GitHub Issues. The module was implemented over a one-week instructional window from March 2–6, 2026.
Data were collected using three instruments aligned with the research questions described in Chapter 1. First, a structured post-module survey collected Likert-scale responses related to learners’ perceptions of cognitive load, confidence in manipulating object properties, and ability to debug gameplay interactions. Second, structured microblog reflections were collected during the module to capture learners’ immediate perceptions of confusion, conceptual breakthroughs, and perceived complexity while interacting with object-based game systems. Third, platform behavioral analytics from the GameBuilder environment recorded learner interaction patterns, including time on task, interaction rate, scroll depth, and code execution frequency.
These data sources provided both perception-based and behavioral indicators of learner experience and progression during the e-learning intervention. Quantitative data were analyzed using descriptive statistics to summarize cognitive load perceptions and engagement metrics, while qualitative responses were coded thematically to identify recurring patterns of cognitive friction and instructional support.
Together, these analyses provided evidence addressing the two research questions: how novice learners experience cognitive overload during onboarding to JavaScript-based game development and how onboarding task design and instructional supports influence learners’ ability to manage cognitive load and progress through early development activities.

## Summary of Results
### Introduction
This chapter presents the results of implementing the GameBuilder learning module, designed to support novice learners in understanding interaction design in JavaScript-based game development.

Participant Engagement Overview
The study included 33 student participants. System telemetry recorded behavioral engagement metrics, including time spent in the system, lessons viewed, code executions, inspection activity, scroll depth, commits, and issue tracking.

Time in System
The median engagement time was 13.17 hours. The engagement suggests the environment supported both minimum completion behavior and extended exploratory development.
Instructional Navigation
Participants viewed an average of 33.5 instructional lessons within the learning module, indicating frequent navigation between instructional materials and development activities.
Code Execution and Debugging Activity
Students executed code an average of 8.3 times during development sessions, reflecting iterative testing and debugging.
Inspection and Interface Interaction
The average inspection rate across participants was 28.5%. Average scroll depth across the instructional interface was 50.0%, suggesting repeated revisiting of key content areas.
Development Iteration Metrics
Participants averaged 83.7 repository commits and 9.3 logged issues, indicating repeated cycles of revision, debugging, and development iteration.



Qualitative Feedback Themes
Analysis of student reflections and observations revealed several recurring themes: debugging difficulty, workflow transitions, and curiosity about existing game implementations.
Theme 1: Hitbox Debugging Challenges
Students frequently struggled to align hitbox boundaries with visual game objects, leading to confusion when interactions did not trigger as expected.
Theme 2: Level-to-Game Integration
While learners were able to construct functional game levels, some struggled to integrate them into the broader game structure.
Theme 3: Exploration of Existing Game Examples
Students demonstrated interest in examining other games within the codebase to understand how interaction patterns were implemented.

Quantitative Feedback Likert
Learner Perceptions of Object Interaction Understanding and Cognitive Load


Interpretation of Data
Analysis of the combined quantitative and qualitative data suggests that the structured e-learning module supported learners’ ability to engage with object-based game mechanics while maintaining manageable levels of cognitive demand.
Survey responses indicated that most learners agreed they could understand how object properties affected gameplay outcomes and could explain collision behaviors after completing the module activities. These findings suggest that the scaffolded configuration tasks and immediate execution feedback provided by the GameRunner environment supported the conceptual understanding of object interactions.
Behavioral analytics reinforced this interpretation. Frequent execution attempts observed during the module suggest that learners engage in iterative experimentation rather than abandoning tasks when difficulties occurred. This pattern is consistent with productive struggle rather than cognitive overload.
Qualitative reflections provided additional insight into learner experiences. Many learners described initial confusion when configuring hitboxes and interaction callbacks but reported that repeated testing and visual feedback from the GameRunner environment helped clarify the relationship between object properties and gameplay behavior. These reflections suggest that the immediate feedback mechanisms built into the e-learning environment supported cognitive load management by allowing learners to test hypotheses and observe outcomes quickly.
Taken together, the findings indicate that the GameBuilder and GameRunner tools successfully reduced extraneous cognitive load associated with low-level game engine configuration. Instead of focusing on syntax construction or engine setup, learners were able to focus attention on understanding the functional relationships between game objects and gameplay behavior.

Bias Recognition and Mitigation
Several potential sources of bias were considered during analysis of the data. One potential source of bias arises from the dual role of the researcher as a course instructor. Because the instructor both implemented the module and analyzed the resulting data, there is a possibility that interpretations of learner performance or engagement could be influenced by prior expectations about the effectiveness of the instructional design.
To minimize this risk, analysis relied on multiple independent data sources rather than a single measure of learner success. Survey responses, behavioral analytics, and microblog reflections were examined collectively to triangulate findings across perception data, behavioral engagement metrics, and learner-generated explanations.
Another potential limitation involves the use of descriptive statistics rather than inferential statistical testing. Because the study was designed as a bounded design and development investigation rather than a comparative experiment, the purpose of the analysis was to describe patterns of learner experience rather than establish causal relationships.
Finally, qualitative responses were coded for recurring themes using consistent coding categories related to confusion, scaffold support, and interaction complexity. This systematic coding process helped ensure that interpretations reflected recurring learner experiences rather than isolated comments.

## Proposed Iteration(s) of E-Learning Solution

Evaluation of Effects on the Instructional Problem
The results of this implementation suggest that the e-learning module helped reduce the extraneous cognitive load experienced by novice learners during early game development onboarding. By providing a structured interface for configuring object properties and immediate feedback through the GameRunner environment, learners were able to focus on understanding how game objects interact rather than managing low-level programming syntax and engine configuration.
Survey results and learner reflections indicate that most students were able to understand how object properties influenced gameplay outcomes and were able to iteratively test and refine interactions during the module. Behavioral analytics also indicated sustained engagement, suggesting that learners were able to progress through the activities without experiencing the prolonged cognitive stalls that had been observed in previous onboarding activities.
However, qualitative responses also revealed that certain interaction concepts—particularly hitbox configuration and collision tuning—remained cognitively demanding for some learners. These findings suggest that while the instructional design reduces early cognitive overload, additional scaffolding may be beneficial when learners begin configuring levels into the larger Game system.
Design Iteration Recommendations

Based on the findings from both engagement metrics and qualitative feedback, several design improvements are recommended for future iterations of the learning module, GameBuilder, and GameRunner.
1. Hitbox visualization and debugging overlays.
2. Improved gamified interface design.
3. Better tooling between GameLevel construction and full game integration.
4. Guided exploration of existing game examples.
5. Introduction of relative positioning concepts.

Appropriate Research Methodology for Future Iterations
Future iterations of the instructional design would continue to employ a design-based research approach. Design-based research emphasizes iterative cycles of design, implementation, analysis, and refinement within authentic instructional contexts.
In a subsequent implementation cycle, the revised e-learning module would again be deployed within the introductory computer science course, with data collected using the same three instruments described in Chapter 3: perception surveys, microblog reflections, and platform behavioral analytics. Maintaining consistent data collection methods would allow comparison across implementation cycles to evaluate whether the proposed refinements reduce remaining sources of cognitive friction.

Refinement of Data Collection Tools
Future iterations of the study could also benefit from minor refinements to the data collection instruments. For example, reflection prompts could be adjusted to encourage learners to describe specific moments when tasks felt mentally demanding or when conceptual understanding improved during experimentation.
Additionally, survey items could be expanded to include questions focused specifically on learners’ understanding of interaction boundaries and collision behavior. These refinements would allow more precise measurement of cognitive load associated with particular interaction mechanics.
Improving the clarity and specificity of reflection prompts and survey items would enhance the representativeness of the collected data and provide more detailed insight into learner experiences during the module.

Justification of Proposed Enhancements
The proposed refinements are supported by both stakeholder feedback and prior research on cognitive load and instructional scaffolding. Learner reflections indicated that visual feedback and iterative testing played an important role in helping them understand object interactions. Expanding these features aligns with research demonstrating that visual representations and immediate feedback support schema formation and reduce extraneous cognitive load for novice learners (Mayer, 2009; Sweller et al., 2011).
Stakeholder feedback from the course instructor also emphasized the importance of helping learners visualize interaction boundaries and understand cause-and-effect relationships between configuration changes and gameplay behavior. Enhancing these visual and feedback mechanisms may therefore further strengthen learners’ ability to manage cognitive demands during early game development activities.
Summary

The results demonstrate meaningful engagement with the GameBuilder learning module and identify key usability improvements that can enhance future instructional iterations.



# Chapter 5: Discussion
## Conclusion(s) Based on Results
This Design-Based Research (DBR) study examined the implementation of a game-based e-learning module designed to reduce cognitive overload among novice learners engaging in introductory JavaScript game development. The instructional intervention was implemented within the Open Coding Society (OCS) learning environment and focused on providing learners with an interactive programming experience in which code modifications produced immediate visual outcomes in a game environment.
The results of the implementation indicate that the interactive learning environment supported learner engagement and facilitated experimentation with programming concepts. Students were able to modify JavaScript code, observe resulting behaviors within the game environment, and iteratively adjust their solutions to achieve desired outcomes. This rapid feedback cycle appeared to help learners connect programming syntax with observable system behavior, supporting the development of foundational programming comprehension.
A key conclusion of the study relates to the role of embedded interaction in reducing cognitive overload. The module allowed learners to focus on a limited set of programming tasks within a visual context rather than requiring them to simultaneously manage multiple development tools, configuration tasks, and abstract syntax structures. By situating programming activities directly within the game environment, learners were able to concentrate on understanding how specific code changes influenced object interactions, animation behaviors, and event responses.
A second conclusion concerns the structure of assessment within the learning module. The original instructional design included three formative assessments and one summative assessment. During implementation and analysis, it became evident that traditional formative assessment structures introduced interruptions in the programming workflow. When these assessment opportunities were reframed as brief checks for understanding embedded within the coding activities, learners were able to demonstrate comprehension while remaining engaged in the programming environment. This adjustment allowed assessment to function as a natural part of the learning interaction rather than as a separate evaluative event.
The findings are significant within the instructional setting described in Chapter 3, where learners are developing introductory programming skills and are particularly vulnerable to cognitive overload during early exposure to complex technical systems. The results suggest that game-based learning environments that emphasize iterative experimentation, visual feedback, and contextualized programming tasks can help mitigate the cognitive demands associated with learning new programming tools and concepts.
Overall, the study demonstrates that a game-based instructional environment can support novice programmers by reducing cognitive overload, encouraging iterative problem solving, and providing immediate feedback that reinforces connections between programming syntax and system behavior.
These findings provide evidence to address the research questions by demonstrating that a game-based coding environment with embedded interaction and feedback mechanisms can support novice programmers while reducing the cognitive demands associated with early programming instruction.
For RQ1 (Learner Experience of Cognitive Overload), the post‑module Likert item on overload (mean 1.71) and the microblog themes indicate that learners experienced low perceived overload overall with localized friction around hitbox configuration and collision tuning. These patterns suggest that the module’s embedded feedback and visual scaffolds mitigated extraneous load while making specific interaction mechanics a focal point for future support.
For RQ2 (Ability to Manage Load and Progress), behavioral analytics—frequent execution attempts, sustained time‑on‑task, and iterative commits—demonstrate productive progression consistent with experimentation rather than stall‑out, reinforcing the conclusion that the design supported momentum through early systems integration.
Importance to the Chapter 3 Setting. In the target setting of 9th–10th grade novices ~13 weeks into JavaScript, already comfortable with GitHub but new to systems‑level game integration, these findings are practically significant: learners advanced from syntax‑centric to object‑interaction reasoning without excessive cognitive burden, indicating that the GameBuilder/GameRunner approach is well‑matched to this stage of the course sequence and learner profile.

## Limitations
Several limitations should be considered when interpreting the findings of this study. First, the research was conducted within a single instructional environment involving a specific group of learners participating in the Open Coding Society learning context. Because the implementation occurred within a single setting, the results may not fully generalize to other instructional environments or learner populations without further study.
A second limitation relates to the duration of the implementation. The learning module was implemented within a limited instructional timeframe, which constrained the ability to observe long-term learning outcomes or extended learner progression through increasingly complex programming tasks. Design-Based Research typically benefits from multiple cycles of implementation and refinement, and additional iterations of the module may provide deeper insight into how learners adapt to the instructional environment over time.
Another limitation concerns the integration workflow between levels generated by the GameBuilder tool and the final game execution structure. GameBuilder currently allows students to construct individual levels that are exported as separate JavaScript files (for example, GameLevelMoon.js or GameLevelVoyage.js). While this modular design supports the creation of distinct game environments, the tool does not automatically assemble these levels into a unified game structure. As a result, learners must manually create or modify a separate game file that imports each level and constructs the ordered collection of levels used during gameplay.
For novice programmers, this step introduces additional technical complexity that extends beyond the module’s instructional focus. Students must manage file imports, module paths, and JavaScript file organization in order to connect the generated levels into a playable game. These project-management tasks can shift learner attention away from experimentation with programming behaviors such as object interaction, animation, and event responses. Consequently, the requirement to manually integrate levels may introduce an extraneous cognitive load, disrupting the iterative design and experimentation process intended in the learning module.
Finally, the study relied on the data collection instruments described in Chapter 3, which focused primarily on learner interaction with the module and assessment outcomes. While these instruments provided valuable insight into student engagement and comprehension, additional qualitative data sources such as learner interviews or observational analysis could provide further understanding of how students experience cognitive load during interaction with the programming environment.
These limitations highlight opportunities for continued refinement of the learning module and additional research to further evaluate the effectiveness of game-based programming instruction.
Additional Limitations.
The overload construct relied on a single Likert item and brief microblog responses, which may limit nuance in perception data; likewise, telemetry indicators (e.g., time on task, execution frequency) function as proxies for cognitive states rather than direct measurements.
Finally, because participants share a specific course culture and tool familiarity (e.g., GitHub workflow), transferability to other sites or grade bands may be constrained.

## Implications of Research on Educational Practice
Design Principles Generated from the Data.
Design Principle 1 — Embed Micro‑Assessments in Flow: Convert traditional formative checkpoints into brief, in‑context checks for understanding, so learners demonstrate comprehension without leaving the programming workflow.
Design Principle 2 — Prioritize Immediate, Visualized Feedback: Maintain a tight code→visual outcome loop and add targeted visualizations (e.g., hitbox overlays) to surface invisible interaction boundaries during tuning.
Design Principle 3 — Automate Extraneous Configuration: Auto‑orchestrate generated levels into the game’s configuration to remove tooling overhead unrelated to learning goals, preserving cognitive resources for interaction design.
Applications for Learning Design.
In practice, designers can (a) embed inline CFU widgets adjacent to code edits, (b) add toggleable debug layers (colliders, interaction rays, bounding boxes), and (c) ship a project scaffold that updates the primary game file whenever a new level is exported—reducing context‑switches and configuration errors.
Implications for Further Research.
A subsequent DBR cycle should isolate two refinements—hitbox visualization and automatic level orchestration—holding instruments constant (Likert overload item set, microblogs, telemetry) to allow cross‑cycle comparison of overload, debugging efficacy, and progression metrics; an optional extension is adding brief learner interviews to deepen qualitative insight into cognitive friction moments.
The results of this study produced several design insights that may inform future development of game-based programming instruction and similar learning environments. These insights function as emerging design principles derived from the implementation and interpretation of the learning module.
The first design principle involves embedding assessment within interactive learning experiences. The transition from traditional formative assessments to brief checks for understanding integrated within coding activities demonstrated that learners could verify their understanding while remaining actively engaged in the programming process. Embedding assessment within interaction helps maintain learner focus and reduces the cognitive disruption that can occur when learners are required to shift between programming tasks and formal evaluation activities.
A second design principle emphasizes the importance of immediate visual feedback when learning programming concepts. The game environment allowed students to observe the effects of code modifications in real time, enabling them to quickly identify errors, experiment with solutions, and refine their understanding of program behavior. This feedback loop supports the development of computational thinking skills and reinforces the connection between abstract code structures and concrete outcomes within a system.
A third design principle emerging from this study involves reducing extraneous cognitive load associated with project configuration tasks. Although GameBuilder successfully generates modular level files, the current workflow requires learners to manually integrate these files into a functioning game structure by writing import statements and constructing the array of levels executed by the game engine. For novice programmers, managing file dependencies and module imports can introduce complexity unrelated to the instructional objective of exploring game behaviors through code.
Future iterations of the learning environment may benefit from automating the orchestration of generated levels into a playable game structure. For example, GameBuilder could automatically update or generate the primary game configuration file that connects all created levels into a sequential gameplay experience. By automating this integration layer, learners would be able to focus their attention on designing interactions, experimenting with animations, and refining game mechanics rather than managing project file structure. This change would support the instructional goal of encouraging iterative experimentation while minimizing unnecessary cognitive overhead associated with project configuration.
Connecting the individually generated levels into a unified gameplay experience may further support cognitive load management by allowing learners to focus on creative programming tasks rather than project configuration. Automating the orchestration of GameBuilder-generated levels would preserve modular level design while minimizing the cognitive demands associated with file management and module integration.
The implications of this research extend beyond the specific module developed for this study. The findings suggest that instructional environments that integrate programming tasks with interactive game mechanics and immediate feedback may provide an effective approach for introducing novice learners to programming concepts while reducing cognitive overload. Educators and instructional designers may apply these principles when developing learning experiences that involve complex technical tools or programming environments.
Future research may explore additional iterations of this learning design, including the implementation of level-based progression and expanded evaluation methods across multiple learning environments. Continued investigation of these design principles may contribute to a deeper understanding of how game-based learning environments can support novice programmers as they develop foundational computational skills.

# References
Azevedo, R., & Cromley, J. G. (2004). Does training on self-regulated learning facilitate students’ learning with hypermedia? Journal of Educational Psychology, 96(3), 523–535. https://doi.org/10.1037/0022-0663.96.3.523
Bandura, A. (1997). Self-efficacy: The exercise of control. W. H. Freeman.  https://psycnet.apa.org/record/1997-08589-000
Ding, L., Zhang, H., Zhou, J., & Chen, Y. (2025). Contextualization, procedural logic, and active construction: A cognitive scaffolding model for topic sentiment analysis in game-based learning. Behavioral Sciences, 15(10), Article 1327. https://doi.org/10.3390/bs15101327
Gee, J. P. (2003). What video games have to teach us about learning and literacy. Palgrave Macmillan. https://research.ebsco.com/c/25xrgu/viewer/html/iva76scuov
Johnson, D. W., & Johnson, R. T. (2009). An educational psychology success story: Social interdependence theory and cooperative learning. Educational Researcher, 38(5), 365–379. https://doi.org/10.3102/0013189X09339057
Loibl, K., Leuders, T., Glogger-Frey, I., & Rummel, N. (2024). CID: a framework for the cognitive analysis of composite instructional designs. Instructional Science, 53, 1485–1509. https://doi.org/10.1007/s11251-024-09665-9
Lister, R., Adams, E. S., Fitzgerald, S., Fone, W., Hamer, J., Lindholm, M., McCartney, R., Moström, J. E., Sanders, K., Seppälä, O., Simon, B., & Thomas, L. (2004). A multi-national study of reading and tracing skills in novice programmers. ACM SIGCSE Bulletin, 36(4), 119–150. https://doi.org/10.1145/1041624.1041673
Mayer, R. E. (2009). Multimedia learning (2nd ed.). Cambridge University Press. https://doi.org/10.1017/CBO9780511811678
Paivio, A. (1986). Mental representations: A dual coding approach. Oxford University Press. https://academic.oup.com/book/10932
Robins, A., Rountree, J., & Rountree, N. (2003). Learning and teaching programming: A review and discussion. Computer Science Education, 13(2), 137–172. https://doi.org/10.1076/csed.13.2.137.14200
Shute, V. J. (2008). Focus on formative feedback. Review of Educational Research, 78(1), 153–189. https://doi.org/10.3102/0034654307313795
Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. Cognitive Science, 12(2), 257–285. https://doi.org/10.1207/s15516709cog1202_4
Sweller, J., Ayres, P., & Kalyuga, S. (2011). Cognitive load theory. Springer. https://doi.org/10.1007/978-1-4419-8126-4
Vygotsky, L. S. (1978). Mind in society: The development of higher psychological processes. Harvard University Press. https://www.jstor.org/stable/j.ctvjf9vz4
Zimmerman, B. J. (2002). Becoming a self-regulated learner: An overview. Theory Into Practice, 41(2), 64–70. https://doi.org/10.1207/s15430421tip4102_2





# Appendix A
## Description of the E-Learning Module Intervention

## Overview of the Instructional Module
The instructional intervention used in this study was an e-learning module designed to introduce students to object-based interaction mechanics within a JavaScript game development environment. The module was delivered within the Open Coding Society (OCS) GameEngine learning platform, which provides an integrated environment for interactive programming, asset configuration, and system testing.
The purpose of the module was to support novice learners in transitioning from foundational programming knowledge (syntax and semantic constructs) to applied object-based programming concepts used in game development. Students learned how individual game objects function within a larger runtime system and how interactions between objects produce observable behaviors within the game environment.
The instructional module combined structured instructional materials, interactive development tools, and collaborative version-control workflows to provide a guided development experience.

## GameEngine Mechanics Overview
The first component of the module introduced the architectural concepts underlying the OCS GameEngine. Instructional materials explained how objects operate within the game runtime environment and how the engine coordinates object behavior.
Key topics included:
• Game objects and object roles
 • The game loop and frame updates
 • Object properties and state changes
 • Interaction triggers between objects
 • Reaction behaviors resulting from interactions
Students explored how individual game components are updated during each iteration of the game loop and how interaction logic produces gameplay outcomes.
This system-level overview provided the conceptual framework necessary for understanding how object behaviors are coordinated within the engine architecture.

## GameBuilder Interface
The second component of the module introduced GameBuilder, a visual configuration tool designed to reduce cognitive load during early stages of game development.
GameBuilder allows learners to create interactive game environments through a guided interface rather than writing full game logic from scratch.
The interface allows students to:
• Select visual assets such as backgrounds and characters
 • Configure game objects including players, non-player characters (NPCs), and barriers
 • Adjust object properties such as position, size, and movement behavior
 • Define interaction relationships between objects
 • Automatically generate structured game configuration code
The system provides immediate feedback by allowing students to test the game in real time. This approach allows learners to observe how configuration changes influence system behavior without requiring extensive manual syntax coding.
By abstracting complex implementation details, GameBuilder helps learners focus on conceptual understanding of object interactions.

## Interactive Learning Activities
During the module, students completed a series of structured activities designed to progressively introduce interaction mechanics.
Learning activities included:
• configuring background environments
 • defining player characters and NPCs
 • creating barriers and collision regions
 • implementing object interaction behaviors
 • observing system responses during runtime execution
Students iteratively modified object properties and interactions while testing their games in the runtime environment. This process allowed learners to observe how small configuration changes influenced gameplay outcomes.
The instructional design emphasized experimentation and iterative development, encouraging students to refine their implementations through repeated testing cycles.

## Development Workflow and Repository Structure
The instructional module was integrated into a collaborative software development workflow using GitHub repositories.
Each student worked within a shared team repository that was used throughout the 12-week course. Within this repository students maintained their game files, assets, and configuration code.
Development activities included:
• daily commits documenting progress
 • feature development and refinement
 • asset management and updates
 • issue tracking for debugging and task management
Students used GitHub Issues and Kanban boards to track development tasks and problems encountered during implementation.

## Instructor Repository and Assessment Process
An instructor-managed fork repository was used to support structured evaluation of student work.
Students submitted selective pull requests containing their GameBuilder configuration files and supporting assets. This process allowed the instructor to review individual contributions while maintaining the integrity of the primary team repository.
The use of version-control workflows allowed the instructional environment to capture detailed development metrics including:
• commit frequency
 • issue tracking activity
 • code execution behavior
 • system engagement time
These metrics were later used as part of the engagement analysis in the research study.

## Instructional Outcome
By the end of the module, students produced a functioning interactive game level within the GameEngine environment. Each game demonstrated the use of object properties, interaction triggers, and reaction behaviors configured through the GameBuilder interface.
The module therefore served as the primary intervention for evaluating how scaffolded game development tools influence learner engagement and cognitive load during early programming instruction.

## Supporting Materials Included in the Appendix
The following materials are included as supporting artifacts:
• GameEngine architecture overview
 • GameBuilder interface screenshots
 • Example GameBuilder configuration files
 • Sample student game implementations
 • GitHub workflow diagrams for commits and pull requests
These materials provide additional documentation of the instructional environment used during the research study.

# Appendix B
## Data Collection Instruments
This study used multiple data collection instruments to evaluate student engagement, learning experience, and system usability during the implementation of the GameBuilder instructional module. Data was collected through three primary methods:
- Student perception survey (Likert-scale questionnaire)
- Qualitative student reflection responses
- System engagement telemetry metrics
These instruments provided both quantitative and qualitative data used to evaluate the effectiveness of the e-learning intervention.

## Student Perception Survey
At the conclusion of the instructional module, students completed a perception survey designed to measure their experience using the GameBuilder system and their confidence in implementing object interactions within the GameEngine.
The survey used a five-point Likert scale:
1 — Strongly Disagree
 2 — Disagree
 3 — Neutral
 4 — Agree
 5 — Strongly Agree
### Survey Questions
Students responded to the following statements:
- The GameBuilder interface helped me understand how game objects interact in the GameEngine.
- The visual configuration tools reduced the difficulty of implementing interaction mechanics.
- The instructional materials helped me understand how object properties affect game behavior.
- I was able to experiment with object interactions and observe how changes affected the game.
- The system allowed me to debug interaction problems during development.
- I feel more confident implementing object-based interactions in a game environment.
- The GameBuilder module helped connect programming concepts to real game mechanics.

## Qualitative Reflection Questions
Students were also asked to provide open-ended feedback regarding their experience with the module. These responses were used for thematic analysis.
Students were prompted with the following questions:
- What part of the GameBuilder activity helped you understand game mechanics the most?
- What challenges did you encounter while creating your game interactions?
- Were there any parts of the system that were confusing or difficult to use?
- What improvements would you suggest for future versions of the GameBuilder tool?
- What additional features would make the tool easier to use when designing games?
Student responses were analyzed using thematic coding techniques to identify recurring patterns in learner experiences.

## System Engagement Metrics
In addition to survey responses, engagement data was automatically collected through the learning platform and repository activity logs. These behavioral metrics provided objective indicators of student interaction with the system.
The following telemetry metrics were recorded.
### Time in System
Total time a student spent interacting with the GameBuilder environment during the study period.
### Lessons Viewed
The number of instructional content pages accessed by the student.
### Code Executions
The number of times the student executed or tested game code during development.
### Inspection Rate
The percentage of development sessions in which students inspected object properties or code structures.
### Scroll Depth
The percentage of instructional interface content viewed by the student during interaction sessions.
### Repository Commits
The number of GitHub commits submitted by the student to their project repository.
### Issue Tracking Activity
The number of issues created by the student in the repository issue tracker, representing debugging tasks, development notes, or feature planning.

## Observation Notes
Instructor observations were recorded during the development process to document student interactions with the system. Observations focused on identifying common challenges encountered by learners.
Observation notes included:
• debugging difficulties with collision hitboxes
 • confusion regarding object positioning and spatial alignment
 • challenges transitioning from level configuration to full game integration
 • student exploration of existing game examples for interaction patterns
These observations informed the thematic analysis presented in the study findings.

## Data Use in the Study
Quantitative survey responses were analyzed using descriptive statistics to identify patterns in student perceptions of the GameBuilder learning environment. Qualitative responses and observation notes were analyzed using thematic coding methods to identify recurring challenges and areas for improvement in the instructional design.
System engagement metrics were used to measure behavioral participation and development activity during the implementation period.
# Appendix C
## Included evidence of site permission.

# Appendix D
## Visual of the GameBuilder Tool





| Research Question | Instrument Alignment |
| --- | --- |
| RQ1: How do learners experience cognitive overload during the e-learning solution? | Likert overload item + microblog reflections |
| RQ2: To what extent are learners able to manage cognitive load and progress through the e-learning solution? | Platform behavioral analytics + Likert overload item + reflection trends |
| Survey Item | Mean | Interpretation |
| --- | --- | --- |
| Understanding how object properties affect gameplay | 4.16 | High agreement |
| Ability to explain collision interactions | 3.97 | Strong understanding |
| Ability to predict outcomes before running GameRunner | 3.50 | Moderate confidence |
| Ability to debug unexpected interactions | 3.97 | Strong debugging awareness |
| Feeling mentally overloaded while building interactions | 1.71 | Very low cognitive overload |