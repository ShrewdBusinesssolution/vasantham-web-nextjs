// import { getPlaiceholder } from "plaiceholder";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);


const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const isEmptyobject = (obj) => Object.keys(obj).length === 0;
  
   const addBeforeUnloadListener = () => {
    const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = ''; // Required for the dialog to show up
        return 'Are you sure you want to leave the page?'; // Optional custom message
    };
  
    // Add event listener
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    // Return cleanup function to remove the event listener
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  };
  // const openGraphImage = { images: "/opengraph-image.png" }
  
  const LOGOPATH = '/logo.svg';
  async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const generateQueryString = (params) => {
  if (!params) return '';
  return new URLSearchParams(params).toString();
};

const removePageFromQueryString = (queryString) => {
  const params = new URLSearchParams(queryString);
  params.delete('page');
  return params.toString();
};


const TruncateText = (text, length = 6) => text.length > length ? text.substring(0, length) + '...' : text;

function timeAgo(dateString) {
  return dayjs(dateString).fromNow();
}
/**
 * Get the first two letters of a name.
 * @param {string} name - The name to convert.
 * @returns {string} The first two letters in uppercase.
 */
function getInitials(name) {
  if (!name) return ""; // Handle empty name

  const letters = name.trim().toUpperCase().replace(/\s+/g, ""); // Remove spaces and convert to uppercase
  return letters.substring(0, 2); // Get the first two letters
}

  export {
    scrollToSection,
    scrollToTop,
    LOGOPATH,
    isEmptyobject,
    addBeforeUnloadListener,
    delay,
    generateQueryString,
    TruncateText,
    timeAgo,
    getInitials,
    removePageFromQueryString
  }