import React, { useState, useRef } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";

import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const collegeInputref=useRef()

  const [error, seterror] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    const collegeName=collegeInputref.current.value

    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0 || collegeName.trim().lengthg===0) {
      seterror({
        title: "Invalid input",
        message: "Please enter valid details",
      });
      return;
    }
    if (+enteredUserAge < 1) {
      seterror({
        title: "Invalid age",
        message: "Please enter valid details",
      });
      return;
    }
    props.onAddUser(enteredName, enteredUserAge, collegeName);
    nameInputRef.current.value='';
    ageInputRef.current.value='';
    collegeInputref.current.value='';
  };

  const errorHandler = () => {
    seterror(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef} />
          <label htmlFor="age">Age (in Years)</label>
          <input id="age" type="number" ref={ageInputRef} />
          <label htmlFor="College">College Name</label>
          <input id="College" type="text" ref={collegeInputref} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
