const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const isEmptyobject = (obj) => !Object.keys(obj).length;

const addBeforeUnloadListener = () => {
    const handleBeforeUnload = (event) => { event.preventDefault(); event.returnValue = ''; return 'Are you sure you want to leave?'; };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
};

const TruncateText = (text, length = 6) => text.length > length ? text.substring(0, length) + '...' : text;
const isEmptyObject = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;
const delay = (ms) => { return new Promise(resolve => setTimeout(resolve, ms)); }
const formatWithoutDecimals = (value) => value && !isNaN(value) ? Math.floor(value) : value;


const LOGOPATH = '/assets/images/logo.webp';
const TRANSPARENTLOGOPATH = '/assets/images/transparent-logo.webp';


const generateQueryString = (params) => {
    if (!params) return '';
    return new URLSearchParams(params).toString();
};

const setQueryParam = (searchParams, page,) => {
    const params = new URLSearchParams(searchParams);

    if (params.has('page')) {
        // If it exists, update it
        params.set('page', page);
    } else {
        // If it doesn't exist, add it
        params.append('page', page);
    }

    return params; // Return the updated URLSearchParams
};

const formatPostalCode = (postalCode) => {
console.log("🚀 ~ formatPostalCode ~ postalCode:", postalCode)

    // Check the length and format accordingly
    if (postalCode.length === 5) {
      return postalCode.slice(0, 3) + ' ' + postalCode.slice(3);
    } else if (postalCode.length === 7) {
      return postalCode.slice(0, 4) + ' ' + postalCode.slice(4);
    }
  
    // Return the original value if it doesn't match the conditions
    return postalCode;
  };

  const formatSlugToName = (slug) => {
    // Split the slug by hyphens, map over the resulting array to capitalize each word, and join them with a space
    return slug
      .split('-') // Split by hyphen
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
      .join(' '); // Join words with space
  };

export { scrollToSection, scrollToTop, isEmptyobject, addBeforeUnloadListener, LOGOPATH, TRANSPARENTLOGOPATH, TruncateText, isEmptyObject, delay, formatWithoutDecimals, generateQueryString, setQueryParam, formatPostalCode, formatSlugToName };
