// client-components/right-listing.js
import React, { useState, useEffect } from 'react';
import UserForm from '@/app/form-components/user-form';
import Favourite from './right-side-client-components/favourite';
import Courses from './right-side-client-components/courses';
import Notification from './right-side-client-components/notification';

export const RightListing = ({ selectedItem }) => {
  const [showForm, setShowForm] = useState(true);

  const handleSubmit = (data) => {
    console.log('Form Submitted:', data);
    setShowForm(false);
  };

  useEffect(() => {
    if (selectedItem !== 'user') {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  }, [selectedItem]);

  return (
    <div>
      {showForm ? (
        <UserForm onSubmit={handleSubmit} />
      ) : (
        <div>
          {selectedItem === 'favourites' && <Favourite/> }
          {selectedItem === 'courses' && <Courses/> }
          {selectedItem === 'notifications' && <Notification/> }
          {/* {!selectedItem && <h2>Select an option from the left.</h2>} */}
        </div>
      )}
    </div>
  );
};
