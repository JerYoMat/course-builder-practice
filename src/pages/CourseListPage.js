import React,{ useState } from 'react';
import { connect } from 'react-redux';
import { addCourse } from '../actions';
import './CourseListPage.css';

//needs to receive the courses as a prop 
const CourseListPage = ({ courses, dispatch }) => {
  const [courseName, setCourseName] = useState('');
  
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addCourse(courseName))
  }
  //create new course if empty 
  //otherwise show list of courses
  return (
    courses.length === 0 ? (
      <div className='CreateCourse'>
        <h1>Create your First Course</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Enter a name:
            <input 
            value={courseName}
            onChange={e => setCourseName(e.target.value)}
          />
          <button type='submit'>Create Course</button>
          </label>
        </form>
      </div>
    ) : (
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            {course.name}
          </li>
        ))}
      </ul>
    )
  )
}

const mapState = (state) => ({
  courses: state.courses
})

export default connect(mapState)(CourseListPage);
