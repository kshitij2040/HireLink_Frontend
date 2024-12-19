export default function JobCard({ title, description, link }) {
  const renderDescription = (text) => {
    const urlRegex = /https?:\/\/[^\s]+/g;
    const parts = text.split(urlRegex);
    const urls = text.match(urlRegex) || [];

    return parts.map((part, index) => {
      const isUrl = index < urls.length;
      return (
        <span key={index}>
          {part}
          {isUrl && (
            <a href={urls[index]} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              {urls[index]}
            </a>
          )}
        </span>
      );
    });
  };

  return (
    <div className="p-4 w-full justify-center items-center flex">
      <div className="p-6 bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg bg-blue-200/5 max-w-md w-full">
        <h3 className="text-white text-lg font-semibold">{title}</h3>
        <p className="text-gray-300 mt-2">Dear All,</p>
        <p className="text-gray-300 mt-2">{renderDescription(description)}</p>

        <div className="flex justify-end mt-4">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <button className="px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-400 text-white font-semibold rounded-md hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
              Register
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
