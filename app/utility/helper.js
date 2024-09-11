// import { getPlaiceholder } from "plaiceholder";

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
  
  
  export {
    scrollToSection,
    scrollToTop,
    LOGOPATH,
    isEmptyobject,
    addBeforeUnloadListener
  }