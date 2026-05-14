import React from 'react'
import { useState } from 'react';
import FitscoreCard from './FitscoreCard';
import thinkgif from '../assets/think.gif';
const JobScore = ({job, setShowScore}) => {
    const[resume, setResume] = useState('');
    const[showFitscore, setShowFitscore] = useState(false);
    const [scoredata, setscoreData] = useState(null);
    const [thinking, setThinking] = useState(false);
    const helpPrep = async(job)=>{
         try{
            const res = await fetch('http://localhost:3000/api/ai/prep-interview', {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({jobDescription: job})
                });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to get prep data from AI'); 
            }
         }
         catch(err){
        
         }
    }
    const getScore = async(resume,notes)=>{
         try{
            setThinking(true);
            const res = await fetch('http://localhost:3000/api/ai/resume-fit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ resumeText: resume, jobDescription: notes })
            });
            const data = await res.json();  
            console.log(data);
            if (!res.ok) {
                throw new Error(data.message || 'Failed to get score from AI'); 
            }
            setscoreData(data);
            setShowFitscore(true);
            setThinking(false);

         }
          catch(err){
            alert('Error getting score from AI');
            setThinking(false);
          }
    }
    if (thinking) {
    return (
      <div className="flex items-center justify-center p-6 h-screen">
        <img src={thinkgif} alt="Thinking..." className="w-16 h-16" />
      </div>
    )
  }
  return (
   <>
    {
         showFitscore ? <FitscoreCard setShowFitscore={setShowFitscore} data={scoredata} />
     : (
    <div className="h-full flex flex-col">
        <form className="flex-1 flex flex-col p-6 bg-white rounded-xl border border-gray-200 relative">
            <button 
                type="button" 
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
                onClick={() => setShowScore(false)}
            >
                ×
            </button>
            <h2 className='text-2xl font-bold text-gray-800 text-center mb-6'>Job Score</h2>
            <div className="flex flex-col gap-4 flex-1">
                <div>
                    <label htmlFor='jobDescription' className='block text-sm font-semibold text-gray-700 mb-2'>Job Description</label>
                    <textarea 
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition resize-none' 
                        id='jobDescription' 
                        placeholder='Paste the job description here...' 
                        value={job.notes || ''} 
                        readOnly 
                        rows={8}
                    />
                </div>
                <div>
                    <label htmlFor='resume' className='block text-sm font-semibold text-gray-700 mb-2'>Resume</label>
                    <textarea 
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition resize-none' 
                        id='resume' 
                        placeholder='Paste your resume summary here...' 
                        value={resume} 
                        onChange={(e)=>setResume(e.target.value)}
                        rows={8}
                    />
                </div>
            </div>
            <div className='flex gap-4 justify-center mt-6'>
            <button className=' bg-green-400 text-white py-3 px-4 w-fit rounded-lg' onClick={(e) => {e.preventDefault();getScore(resume, job.notes);}}>
                Get Score
            </button>
            <button className=' bg-green-400 text-white py-3 px-4 w-fit rounded-lg' onClick={(e)=>{e.preventDefault();helpPrep(job)}}>
                Prep Me
            </button>
            </div>
        </form>
    </div>
    )}
    </>
  )
}

export default JobScore