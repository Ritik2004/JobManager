import React, { useEffect, useState } from 'react'
import JobCard from '../components/JobCard'

const Dashboard = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState('')
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/jobs/getJobs')
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.msg || 'Failed to fetch jobs')
        }
        console.log(selected);
        const filtered = data.filter((job)=>{
            const matchsearch = job.company.toLowerCase().includes(search.toLowerCase());
            const matchstatus = selected === "" || job.status === selected;
            return matchsearch && matchstatus;
        });

        setJobs(filtered);
      } catch (err) {
        setError(err.message)
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs();
  }, [search, selected])

  if (loading) {
    return <div className="text-center py-12"><p className="text-gray-600 text-lg">Loading jobs...</p></div>
  }

  if (error) {
    return <div className="text-center py-12"><p className="text-red-600 text-lg">Error: {error}</p></div>
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Job Applications</h1>
      <div className="flex items-center gap-4 mb-6">
        <input type="text" placeholder="Search jobs..." value={search} onChange={(e) => setSearch(e.target.value)} className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-purple-500"/>
       <select
        value={selected}
        onChange={(e)=>setSelected(e.target.value)}
       >
       <option value="">All Statuses</option>
       <option value="applied">Applied</option>
       <option value="interview">Interview</option>
       <option value="hold">Hold</option>
       <option value="selected">Selected</option>
       </select>
      </div>
      </div>
      {jobs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">No jobs yet. <a href="/add-job" className="text-purple-600 font-semibold hover:underline">Add your first job</a></p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard