import React from 'react'

const Question = ({setShowPrep, data}) => {
  return (
    <div className='w-full bg-white p-6 max-h-[80vh] overflow-y-auto rounded-xl'>
    <h2 className='text-2xl font-bold mb-4'>Interview Preparation Question</h2>
        <ul className='list-disc p-6'>
            {
                data?.questions?.map((item,index)=>{
                    return <li key={index} className='mb-4'>
                        <p className='font-semibold text-gray-800 mb-1'>{item}</p>
                        
                    </li>
                })
            }
            
        </ul>
    </div>
  )
}

export default Question