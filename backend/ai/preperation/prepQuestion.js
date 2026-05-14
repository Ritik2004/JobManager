import ai from '../config.js';

const MODEL = 'openai/gpt-oss-20b';

const builtPrompt = ({company,position, description})=>{
return `
You are an interview preparation assistant.

Generate exactly 5 interview questions based on the following job details.

The questions should:
- be realistic
- focus on technical skills
- match seniority level
- include system design if relevant
- avoid generic HR questions

Company: ${company}
Position: ${position}

Job Description:
${description}

Return ONLY valid JSON.

{
  "questions": [
    "Question 1",
    "Question 2",
    "Question 3",
    "Question 4",
    "Question 5"
  ]
}
`;
}

export async function prepQuestion(company, position, description) {
    const prompt = builtPrompt({company, position, description});
    const response = await ai.responses.create({
        model: MODEL,
        input:prompt,
        temperature: 0.7,
    });
    const text = response.output_text;
    return JSON.parse(text);
}