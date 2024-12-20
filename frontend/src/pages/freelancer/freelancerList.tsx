import React, { useState, useEffect } from "react";
import axiosConfig from "../../service/axios"; // Assuming axiosConfig is set up

const FreelancerList: React.FC = () => {
  const [freelancers, setFreelancers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axiosConfig
      .get("/client/freelancer-list")
      .then((response) => {
        setFreelancers(response.data.data); 
        console.log(response.data.data)
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load freelancers.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="hero section pt-20 pb-16 bg-gradient-to-r from-blue-100 to-white w-full overflow-hidden">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Search Filter Section */}
        <aside className="bg-blue-50 p-6 mt-14 rounded-lg shadow-md w-full md:w-1/4">
          <h2 className="text-lg font-semibold mb-4">Search Filters</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Location"
              className="w-full p-2 border rounded-md"
            />
            <select className="w-full p-2 border rounded-md">
              <option>All Categories</option>
            </select>
            <input
              type="text"
              placeholder="Keywords"
              className="w-full p-2 border rounded-md"
            />
            <div>
              <label className="block mb-2 font-medium text-sm">Hourly Rate</label>
              <input type="range" className="w-full" />
              <div className="flex justify-between text-sm mt-1">
                <span>$10</span>
                <span>$250</span>
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium text-sm">Skills</label>
              <div className="flex flex-wrap gap-2">
                {["front-end dev", "angular", "react", "vue js", "web apps"].map(
                  (skill, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
              <button className="text-blue-500 mt-2 text-sm">+ Add more skills</button>
            </div>
            <button className="bg-blue-500 text-white w-full p-2 rounded-md">
              Search
            </button>
          </div>
        </aside>

        {/* Freelancer List Section */}
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Search Results</h2>
            <select className="p-2 border rounded-md text-sm">
              <option>Sort by: Relevance</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {freelancers.map((freelancer, index) => (
              <div
                key={index}
                className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center"
              >
                <img
                  src={freelancer.profileImage}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold">{freelancer.name}</h3>
                <p
                  className='px-3 py-1 rounded-full text-sm mt-2'
                >
                  {freelancer.tagline}
                </p>
                <p className="text-blue-500 font-bold mt-2">{freelancer.rate}</p>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={i < Math.round(freelancer.rating) ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5 text-yellow-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.5l1.76 3.57 3.92.56-2.84 2.77.67 3.91L12 14.56l-3.51 1.85.67-3.91-2.84-2.77 3.92-.56L12 4.5z"
                      />
                    </svg>
                  ))}
                </div>
                
              </div>
            ))}
          </div>
          {/* Pagination  */}
          <div className="flex justify-center items-center mt-6 space-x-2">
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                className={`w-8 h-8 flex items-center justify-center rounded-md ${
                  page === 2
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerList;
