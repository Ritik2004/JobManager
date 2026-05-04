import React from 'react'

const JobCard = ({ job }) => {
  const getStatusColor = (status) => {
    const colors = {
      applied: 'bg-blue-100 text-blue-800',
      interview: 'bg-yellow-100 text-yellow-800',
      hold: 'bg-orange-100 text-orange-800',
      selected: 'bg-green-100 text-green-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{job.company}</h3>
          <p className="text-sm text-gray-600">{job.role}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(job.status)}`}>
          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
        </span>
      </div>

      {job.notes && (
        <p className="text-gray-700 text-sm mb-3 bg-gray-50 p-3 rounded">{job.notes}</p>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <span>Applied: {new Date(job.createdAt).toLocaleDateString()}</span>
      </div>

      {job.job_url && (
        <a
          href={job.job_url}
          target="_blank"
          rel="noreferrer"
          className="inline-block px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition"
        >
          View Job
        </a>
      )}
    </div>
  )
}

export default JobCard