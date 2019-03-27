import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { addCourse } from '../actions';

const NewCourse = ({
  dispatch,
  saveInProgress,
  saveError
}) => {
  const [courseName, setCourseName] = useState('');
  const [price, setPrice] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addCourse(courseName, price));
  };

  return (
    <div className="NewCourse">
      <h1>Create Your First Course</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Pick a name:
          <input
            ref={inputRef}
            type='text'
            disabled={saveInProgress}
            value={courseName}
            onChange={e => setCourseName(e.target.value)}
          />
        </label>
        <label>
          Pick a price:
          <input
            type='number'
            disabled={saveInProgress}
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </label>
        {saveError && (
          <div className="saveError-message">
            Error: {saveError.message}
          </div>
        )}
        <button type="submit" disabled={saveInProgress}>
          Create Course
        </button>
      </form>
    </div>
  );
};

const mapState = state => ({
  saveInProgress: state.saveInProgress,
  saveError: state.saveError
});
export default connect(mapState)(NewCourse);