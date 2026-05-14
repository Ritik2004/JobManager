import express from 'express';
import { scoreResumeFit } from '../ai/resume/fitScorer.js'; 
import { prepQuestion } from '../ai/preperation/prepQuestion.js';

const router = express.Router();

router.post('/resume-fit', async (req, res) => {
  const { resumeText, jobDescription } = req.body;
 console.log('Received resume fit request with:', { resumeText, jobDescription });
  if (!resumeText || !jobDescription) {
    return res.status(400).json({
      message: 'Both resumeText and jobDescription are required.',
    });
  }

  try {
    const result = await scoreResumeFit(resumeText, jobDescription);
    return res.status(200).json(result);
  } catch (error) {
    console.error('AI resume-fit error:', error);
    return res.status(500).json({
      message: error.message || 'Failed to score resume fit.',
    });
  }
});

router.post('/prep-interview', async (req, res) => {   
    const {company, position, description} = req.body;
    if(!company || !position || !description){
        return res.status(400).json({
            message: 'company, position and description are required'
        })
    }
    try{
    const result  = await prepQuestion(company, position, description);
    return res.status(200).json(result);

    } 
    catch(e){
        return res.status(500).json({
            message: e.message || 'Failed to prepare interview questions.'
        });
    }
});

export default router;

