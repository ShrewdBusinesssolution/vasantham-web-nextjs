import React, { useState, useEffect } from 'react';
import UserForm from '@/app/form-components/user-form';
import Favourite from './right-side-client-components/favourite';
import Courses from './right-side-client-components/courses';
import Notification from './right-side-client-components/notification';

export const RightListing = ({ selectedItem }) => {
  const [showForm, setShowForm] = useState(true);  // Control if the form is shown

  // This effect will toggle the visibility of the form based on `selectedItem`
  useEffect(() => {
    // Always show the form if 'user' is selected, otherwise show selected component.
    if (selectedItem === 'user') {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [selectedItem]);  // Run this effect whenever `selectedItem` changes

  return (
    <div>
      {showForm ? (
        <UserForm />  // Show the UserForm if `showForm` is true
      ) : (
        <div>
          {selectedItem === 'favourites' && <Favourite />}
          {selectedItem === 'courses' && <Courses />}
          {selectedItem === 'notifications' && <Notification />}
          {!selectedItem && <UserForm/>}  {/* Optional message if no selection */}
        </div>
      )}
    </div>
  );
};
