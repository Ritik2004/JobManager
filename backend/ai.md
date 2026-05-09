# Gen AI Learning Plan
## Project: Job Tracker App → AI-Powered Job Search Assistant
### Stack: Node.js + Anthropic SDK → Gemini (free) + ChromaDB

---

## Background & Context

I am a full-stack engineer with 5 years of experience (Node.js + Java), preparing for SDE-2
interviews at product companies. I am completely new to Gen AI. I want to learn Gen AI
practically by implementing AI features one by one inside my existing Job Tracker project.

The project is a Kanban-style job application tracker built with React + Node.js + MongoDB.
Core CRUD is working. Now I am adding AI features progressively, starting from the simplest
possible API call and working up to full agentic workflows.

**Key constraint:** I want to use free APIs while learning. Plan starts with Anthropic free
credits, then switches to Google Gemini free tier when credits run out.

---

## The Core Mental Model

Before starting, understand this progression:

```
Phase 1 → You call AI with one input, get one output
Phase 2 → You control exactly what format AI returns
Phase 3 → You give AI your personal data to reason over (RAG)
Phase 4 → AI takes multiple steps and uses tools on your behalf (Agents)
```

Each phase builds directly on the previous one. Do not skip ahead.

---

## Phase 1 — LLM Basics (Week 1)

### What You Are Learning
- How to make an API call to an LLM
- How to write a basic prompt
- How to get structured JSON back from AI
- How to handle the response in your Node.js backend

### Free API To Use
- Anthropic Claude → free credits on signup at console.anthropic.com
- Model to use: `claude-haiku-4-5` (fastest, cheapest, good for learning)

### Feature 1: Resume Fit Scorer

**What it does:**
User pastes a job description into any job card. Backend sends the JD along with the
user's resume summary to Claude. Claude returns a fit score, a list of matching skills,
and a list of missing skills. Result is displayed on the card.

**Why this feature:**
It is the simplest possible AI integration — one input, one output, one API call.
Forces you to write your first real prompt and handle structured JSON output.

**What you learn:**
- Installing and configuring `@anthropic-ai/sdk`
- Writing a system prompt vs a user prompt
- Asking AI to return JSON and parsing it safely
- Wiring an AI response into your existing Express route

**Backend route:** `POST /ai/resume-fit`

**Prompt structure:**
```
System: You are a resume screening assistant. Always return valid JSON only.
        No explanation, no markdown, just the JSON object.

User:   Score how well this resume fits this job description.

        Resume: {resumeText}
        Job Description: {jobDescription}

        Return exactly this JSON:
        {
          "score": number between 0 and 100,
          "matching": ["skill1", "skill2", "skill3"],
          "missing": ["skill1", "skill2", "skill3"],
          "verdict": "one sentence summary"
        }
```

---

### Feature 2: Interview Question Generator

**What it does:**
User clicks a "Prep me" button on any job card. Backend sends the company name and
role title to Claude. Claude returns 5 likely interview questions for that specific
role at that specific company. Questions appear in a modal on the card.

**Why this feature:**
Same API call pattern as Feature 1 but with a completely different prompt. Reinforces
the pattern and shows how versatile a single LLM call can be.

**What you learn:**
- Reusing the same API pattern with a different prompt
- Prompting for a list output instead of a scored output
- Displaying streamed or batched AI responses in your React UI

**Backend route:** `POST /ai/interview-prep`

---

## Phase 2 — Prompt Engineering (Week 2)

### What You Are Learning
- How to write system prompts that enforce reliable output
- How to use few-shot examples to improve accuracy
- How to validate and handle bad AI output gracefully
- How temperature affects creativity vs consistency

### Free API To Use
- Switch to Google Gemini if Anthropic credits are exhausted
- Model: `gemini-1.5-flash` — free tier, very capable
- Package: `@google/generative-ai`
- The concepts are identical, only the SDK syntax changes slightly

### Feature 3: JD Auto-fill

**What it does:**
User pastes a raw job description into a text area on the Add Job form. Claude reads
the JD and automatically extracts and fills in the company name, role title, required
skills, experience level, and location. The form fields populate automatically.

**Why this feature:**
Extraction tasks require precise prompt engineering. If your prompt is vague, the
extracted fields will be inconsistent. This feature forces you to write tight,
reliable prompts.

**What you learn:**
- Structured extraction prompts
- System prompts that enforce strict output schema
- Validating AI output before using it (what if a field is missing?)
- Optimistic UI — show extracted data instantly, let user correct if wrong

**Backend route:** `POST /ai/extract-jd`

---

### Feature 4: Salary Estimator

**What it does:**
On any job card, user can click "Estimate Salary." Claude takes the role, company,
city, and experience level and returns an estimated salary range with reasoning.

**Why this feature:**
Salary data is not in any database you can query. This is a pure reasoning task for
the LLM. To make it accurate, you need few-shot prompting — giving Claude 2-3 examples
of correct estimates so it calibrates properly.

**What you learn:**
- Few-shot prompting (giving examples inside the prompt)
- How to improve accuracy without changing the model
- Understanding that prompt quality directly controls output quality

**Backend route:** `POST /ai/salary-estimate`

---

## Phase 3 — RAG: Retrieval Augmented Generation (Week 3-4)

### What You Are Learning
- What embeddings are and why they matter
- How vector databases work
- How to give an LLM access to your personal documents
- The full RAG pipeline: chunk → embed → store → retrieve → generate

### What Is RAG (Simple Explanation)
An LLM does not know your resume. You cannot paste your entire resume into every
prompt — it gets expensive and messy. RAG solves this:

```
1. Take your resume PDF
2. Convert it to text
3. Break it into small chunks
4. Convert each chunk to a vector (embedding) — a list of numbers
5. Store vectors in ChromaDB (vector database)
6. When user asks a question, convert question to a vector
7. Find the resume chunks most similar to the question
8. Send only those relevant chunks to Claude
9. Claude answers using your actual resume data
```

This is how every enterprise AI product works internally.

### Free Tools For RAG
- **PDF parsing:** `pdf-parse` npm package — free, runs locally, no API needed
- **Embeddings:** Google Gemini `text-embedding-004` model — free tier
- **Vector database:** ChromaDB — run locally, completely free forever

### Feature 5: Upload Your Real Resume

**What it does:**
User uploads their resume as a PDF. The backend extracts the text, breaks it into
chunks, converts each chunk to an embedding vector using Gemini, and stores everything
in a local ChromaDB instance. From this point, every fit score automatically uses the
user's real resume instead of a hardcoded text summary.

**Why this feature:**
This is the foundational RAG skill. Every serious AI project uses this pattern —
insurance companies, legal tech, healthcare, fintech. Learning it here in a simple
context prepares you for production use.

**What you learn:**
- PDF text extraction with `pdf-parse`
- What an embedding is (a vector representation of meaning)
- Chunking strategy (how to split documents intelligently)
- Storing and retrieving from ChromaDB
- Replacing hardcoded context with dynamic retrieval

**Backend route:** `POST /ai/upload-resume`

---

### Feature 6: Ask Questions About Your Job Search

**What it does:**
A chat input at the bottom of the dashboard. User can ask natural language questions
about their own job search data. For example:

- "Which companies have not replied in over 2 weeks?"
- "How many applications do I have in the interview stage?"
- "Which role am I applying to most frequently?"
- "What is my offer rate so far?"

Claude reads the user's full Kanban data (fetched from MongoDB) and answers in plain
English.

**Why this feature:**
This is RAG applied to your own database — not a PDF but your live application data.
It teaches you how to format and inject structured data as context for an LLM.

**What you learn:**
- Formatting MongoDB data as LLM-readable context
- Asking analytical questions over structured data
- Combining database queries with LLM reasoning
- Context window management (what to include, what to leave out)

**Backend route:** `POST /ai/ask`

---

## Phase 4 — Agents & Tool Use (Week 5-6)

### What You Are Learning
- What function calling / tool use means
- How to give an LLM the ability to take actions
- Multi-step reasoning (agent breaks a goal into steps)
- Human-in-the-loop (agent asks for approval before acting)

### What Is An Agent (Simple Explanation)
In Phases 1-3, you always tell the AI exactly what to do. In Phase 4, you give the
AI a goal and a set of tools, and the AI decides which tools to use and in what order.

```
You say:  "Find me good SDE-2 jobs and add them to my board"
Agent:    Step 1 → search for SDE-2 jobs (uses search tool)
          Step 2 → score each job against resume (uses fit scorer tool)
          Step 3 → filter jobs above 70% fit score (uses filter tool)
          Step 4 → add best jobs to Kanban (uses POST /applications tool)
          Step 5 → draft outreach email for each (uses email tool)
```

You build the tools. The AI decides when and how to use them.

### Feature 7: Follow-Up Agent

**What it does:**
A background job that runs every morning. It scans all job applications and finds
every card that has been in the same status for more than 7 days with no update.
For each stale application, Claude drafts a polite follow-up email. The user sees
a list of drafted emails and approves or dismisses each one before anything is sent.

**Why this feature:**
This is the human-in-the-loop agent pattern. The agent does the work but the human
stays in control. This is the pattern used in almost every production AI product
because it prevents AI from taking irreversible actions without oversight.

**What you learn:**
- Multi-step agent logic
- Human-in-the-loop design pattern
- Scheduling background AI jobs (node-cron)
- Storing agent output for user review before acting

**Backend route:** `GET /ai/followup-suggestions`

---

### Feature 8: Job Search Agent (Capstone)

**What it does:**
User provides their target role and target companies. The agent autonomously:
1. Searches for matching open positions
2. Scores each position against the user's uploaded resume
3. Filters to only jobs above a configurable fit threshold
4. Adds qualifying jobs directly to the Kanban board
5. Drafts a personalized cold outreach message for each hiring manager

**Why this feature:**
This is a full multi-tool agent. It is the most complex feature in the project and
the most impressive thing you can show in an interview or on your GitHub. It
demonstrates that you understand the entire AI engineering stack.

**What you learn:**
- Function calling / tool use with the Anthropic SDK
- How agents chain multiple tool calls together
- Error handling in multi-step workflows (what if step 3 fails?)
- The difference between a simple API call and a real agentic workflow

---

## Complete Feature Timeline

```
Week 1  →  Feature 1: Resume Fit Scorer
           Feature 2: Interview Question Generator

Week 2  →  Feature 3: JD Auto-fill
           Feature 4: Salary Estimator

Week 3  →  Feature 5: Upload Resume (RAG foundation)

Week 4  →  Feature 6: Ask Questions About Your Job Search

Week 5  →  Feature 7: Follow-Up Agent

Week 6  →  Feature 8: Job Search Agent (Capstone)
```

---

## Free API Reference

| Need | Tool | Cost |
|------|------|------|
| LLM calls (start here) | Anthropic Claude — free credits on signup | Free |
| LLM calls (after credits) | Google Gemini `gemini-1.5-flash` | Free tier |
| Embeddings | Google Gemini `text-embedding-004` | Free tier |
| Vector database | ChromaDB — run locally | Free forever |
| PDF parsing | `pdf-parse` npm package | Free forever |

---

## Skills You Will Have After This Plan

```
✅ LLM API integration (Anthropic + Gemini)
✅ Prompt engineering (system prompts, few-shot, JSON output)
✅ RAG pipeline (embed → store → retrieve → generate)
✅ Vector databases (ChromaDB)
✅ Agentic workflows (tool use, multi-step reasoning)
✅ Human-in-the-loop design pattern
✅ PDF processing and document AI
✅ All in Node.js — no Python required
```

These are exactly the skills companies mean when they say they want engineers
who can build with AI. Not just call an API — but design, build, and ship
production AI features end to end.

---

*Continue from: Feature 1 — Resume Fit Scorer backend route setup*