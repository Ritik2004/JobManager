import React from 'react'
import { useState } from 'react'

const JobForm = () => {
  const [formData, setformData] = useState({
    company: '',
    role: '',
    status: '',
    notes: '',
    job_url: '',
  })

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:3000/api/jobs/addJob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.msg || 'Failed to add job')
      }
      alert("Job Added Successfully")
      setformData({
        role: '',
        company: '',
        status: '',
        notes: '',
        job_url: '',
      })
    } catch (err) {
      console.log(err)
      alert(err.message || 'Error adding job')
    }
  }

  return (
    <form onSubmit={handleSubmit} 
     className="max-w-2xl mx-auto my-10 p-6 bg-white rounded-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Add New Job Application</h2>

      <div className="mb-4">
        <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
          Company Name *
        </label>
        <input
          type="text"
          id="company"
          placeholder='e.g., Google'
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
          Job Role *
        </label>
        <input
          type="text"
          id="role"
          placeholder='e.g., Senior Developer'
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition bg-white"
        >
          <option value="" disabled>Select Status</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="hold">Hold</option>
          <option value="selected">Selected</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="job_url" className="block text-sm font-semibold text-gray-700 mb-2">
          Job URL
        </label>
        <input
          type="url"
          id="job_url"
          placeholder='https://example.com/job'
          name="job_url"
          value={formData.job_url}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
          Notes
        </label>
        <textarea
          id="notes"
          placeholder='Add any notes about this application...'
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition resize-none"
        />
      </div>

        <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
        >
        Add Job
        </button>
    </form>
  )
}

export default JobForm