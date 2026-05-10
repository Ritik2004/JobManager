import ai from '../config.js';

const MODEL = 'gemini-2.5-flash';

const buildPrompt = ({ resumeText, jobDescription }) => {
  return `You are a resume screening assistant. Always return valid JSON only. No explanation, no markdown, just the JSON object.

Resume: ${resumeText}

Job Description: ${jobDescription}

Return exactly this JSON:
{
  "score": number between 0 and 100,
  "matching": ["skill1", "skill2", "skill3"],
  "missing": ["skill1", "skill2", "skill3"],
  "verdict": "one sentence summary"
}`;
};

const parseJson = (text) => {
  const raw = text?.trim();
  if (!raw) throw new Error('Empty response from Gemini.');

  try {
    return JSON.parse(raw);
  } catch (error) {
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
    throw new Error(`Could not parse JSON from Gemini response: ${raw}`);
  }
};

export async function scoreResumeFit(resumeText, jobDescription) {
  const prompt = buildPrompt({ resumeText, jobDescription });

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
    temperature: 0.2,
  });

  const text = response.text ?? response.outputText ?? '';
  const data = parseJson(text);

  if (
    typeof data.score !== 'number' ||
    !Array.isArray(data.matching) ||
    !Array.isArray(data.missing) ||
    typeof data.verdict !== 'string'
  ) {
    throw new Error(`Gemini returned invalid fit scorer JSON: ${text}`);
  }

  return {
    score: data.score,
    matching: data.matching,
    missing: data.missing,
    verdict: data.verdict,
  };
}
