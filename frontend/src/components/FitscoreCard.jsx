import React from 'react'

const FitscoreCard = ({ setShowFitscore ,data}) => {
    console.log("data in fit score card is", data);
  return (
    <div className="flex p-6 bg-white rounded-xl border border-gray-200 shadow-lg max-w-md mx-auto">
      <div>
      <h3>Fit Score: {data.score}</h3>
      <p>Matching Skills: {data.matching.join(', ')}</p>
      <p>Missing Skills: {data.missing.join(', ')}</p>
      <p>Verdict: {data.verdict}</p>
      </div>
      <div onClick={()=>setShowFitscore(false)}>✖</div>
    </div>
  )
}

export default FitscoreCard