
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <ul className="flex gap-6 items-center list-none m-0">
          <li className="m-0">
            <Link
              to="/"
              className="text-gray-800 font-semibold text-base no-underline px-3 py-2 rounded-lg transition hover:bg-purple-100 hover:text-purple-600"
            >
              Home
            </Link>
          </li>
          <li className="m-0">
            <Link
              to="/dashboard"
              className="text-gray-800 font-semibold text-base no-underline px-3 py-2 rounded-lg transition hover:bg-purple-100 hover:text-purple-600"
            >
              Dashboard
            </Link>
          </li>
          <li className="m-0">
            <Link
              to="/add-job"
              className="text-gray-800 font-semibold text-base no-underline px-3 py-2 rounded-lg transition hover:bg-purple-100 hover:text-purple-600"
            >
              Add Job
            </Link>
          </li>
          <li className="m-0">
           <Link
              to="/manage-jobs"
              className="text-gray-800 font-semibold text-base no-underline px-3 py-2 rounded-lg transition hover:bg-purple-100 hover:text-purple-600"
            >
              Manage Jobs
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar