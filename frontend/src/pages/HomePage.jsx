import { useState } from "react";
import { FiChevronDown, FiSettings } from "react-icons/fi";
import { ReactTyped } from "react-typed";
import JohnDoePic from "../assets/JohnDoe.png";
import EmilyPic from "../assets/Emily.png";
import JanePic from "../assets/JaneSmith.png";

export default function HomePage() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSeeMore = (storyUsername) => {
    alert(`See more about ${storyUsername}'s story!`);
  };

  // Sample data for user stories
  const stories = [
    {
      username: "John Doe",
      profilePic: JohnDoePic,
      snippet: "The stars whispered secrets as the world stood still...",
    },
    {
      username: "Jane Smith",
      profilePic: JanePic,
      snippet: "In the heart of the forest, magic lingered in every step.",
    },
    {
      username: "Emily Carter",
      profilePic: EmilyPic,
      snippet: "The melody of the ancient flute echoed across the valley.",
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-[#2C3E50] text-white p-6 flex flex-col justify-between">
        {/* Top Section */}
        <div>
          <h1 className="text-3xl font-bold mb-8">InkSpire</h1>
          <nav className="space-y-4">
            <a href="#" className="block text-lg hover:underline border-b">
              Search
            </a>
            <a href="#" className="block text-lg hover:underline border-b">
              Explore
            </a>
            <a href="#" className="block text-lg hover:underline border-b">
              Message
            </a>
            <a href="#" className="block text-lg hover:underline border-b">
              My Stories
            </a>
            <a href="#" className="block text-lg hover:underline">
              Notifications
            </a>
          </nav>
        </div>

        {/* Bottom Section */}
        <div>
          <a href="#" className="flex items-center text-lg hover:underline">
            <FiSettings className="mr-2" />
            Settings
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-[#fffcdb] text-white p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#2C3E50]">Start writing now ...</h2>
          <div className="relative">
            {/* My Profile Button */}
            <button
              onClick={toggleDropdown}
              className="flex items-center bg-[#2C3E50] text-white px-4 py-2 rounded-3xl"
            >
              My Profile
              <FiChevronDown className="ml-2" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownVisible && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow">
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Profile
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Color Mode
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Stories Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-[#2C3E50] text-white rounded p-4 shadow hover:shadow-lg transition duration-200 relative"
            >
              <div className="flex items-center mb-4">
                <img
                  src={story.profilePic}
                  alt={`${story.username}'s profile`}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-bold">{story.username}</h3>
                </div>
              </div>
              <p className="text-sm mb-12">{story.snippet}</p>

              {/* "See More" Button */}
              <button
                onClick={() => handleSeeMore(story.username)}
                className="absolute bottom-4 right-4 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-blue-600 transition duration-200"
                aria-label={`See more about ${story.username}`}
              >
                +
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}




