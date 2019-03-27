import React,{ useState } from 'react';
import { connect } from 'react-redux';
import { addCourse } from '../actions';
import './CourseListPage.css';

//needs to receive the courses as a prop 
const CourseListPage = ({ 
  courses, 
  saveInProgress,
  saveError,
  coursesLoading,
  coursesError,
  dispatch }) => {
  const [courseName, setCourseName] = useState('');
  const [price, setPrice] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addCourse(courseName, price))
  };
  if (coursesLoading) {
    return <div />
  }
  if (coursesError) {
    return <div>{coursesError.message}</div>
  }

  return (
    courses.length === 0 ? (
      <div className='CreateCourse'>
        <h1>Create your First Course</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Enter a name:
            <input 
            disabled={saveInProgress}
            value={courseName}
            onChange={e => setCourseName(e.target.value)}
          />
          </label>
          <label>
            Enter Price:
            <input 
            disabled={saveInProgress}
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          {saveError && (
            <div className="saveError-message">
              Error: {saveError.message}
            </div>
          )}
          </label>

          <button type='submit' disabled={saveInProgress}>Create Course</button>
        </form>
      </div>
    ) : (
      <div className='CourseList'>
      <h1>Your Courses</h1>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <div className='title'>{course.name}</div>
            <div className='price'>{course.price.toFixed(2)}</div>
          </li>
        ))}
      </ul>
      </div>
    )
  )
}

const mapState = (state) => ({
  courses: state.courses,
  saveInProgress: state.saveInProgress,
  saveError: state.saveError,
  coursesLoading: state.coursesLoading,
  coursesError: state.coursesError
});

export default connect(mapState)(CourseListPage);
