// import dotenv from 'dotenv';
// import { GoogleGenAI } from '@google/genai';

// dotenv.config();

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// export default ai;
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const ai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

export default ai;