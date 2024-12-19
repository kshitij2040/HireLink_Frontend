"use client";

export default function ToggleButtons({ activeTab, setActiveTab }) {
  return (
    <div className="flex space-x-4">
      {/* Latest Button */}
      <button
        onClick={() => setActiveTab('latest')}
        className={`px-4 py-2 rounded-lg ${
          activeTab === 'latest'
            ? 'bg-gradient-to-r from-blue-700 to-blue-400 text-white'
            : 'bg-opacity-30 backdrop-blur-md shadow-lg bg-blue-800/5 text-gray-300'
        }`}>
        Latest
      </button>

      {/* All Button */}
      <button
        onClick={() => setActiveTab('all')}
        className={`px-4 py-2 rounded-lg ${
          activeTab === 'all'
            ? 'bg-gradient-to-r from-blue-700 to-blue-400 text-white'
            : 'bg-opacity-30 backdrop-blur-md shadow-lg bg-blue-800/5 text-gray-300'
        }`}>
        All
      </button>
    </div>
  );
}
