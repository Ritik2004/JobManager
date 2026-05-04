import React from 'react'

const Kanban = () => {
  return (
    <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Kanban Board</h1>
    <div className='flex gap-4 h-screen'>
  <div className='flex-1 p-4 bg-gray-100 rounded'>Todo</div>
  <div className='flex-1 p-4 bg-gray-100 rounded'>In Progress</div>
  <div className='flex-1 p-4 bg-gray-100 rounded'>Review</div>
  <div className='flex-1 p-4 bg-gray-100 rounded'>Done</div>
</div>
    </div>
  )
}

export default Kanban