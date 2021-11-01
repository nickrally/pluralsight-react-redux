import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  saveCourse,
  loadAuthors,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => alert("Loading courses failed", error));
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => alert("Loading authors failed", error));
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((prev) => ({
      ...prev,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};
    if (!title) errors.title = "Title is required";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }
  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => history.push("/courses"))
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      authors={authors}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}
ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

function getCourseBySlug(courses, slug) {
  return courses.find((course) => (course.slug === slug ? course : null));
}
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course,
    courses: state.courses,
    authors: state.authors,
  };
}

const mapDispatchToProps = {
  loadCourses,
  saveCourse,
  loadAuthors,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
