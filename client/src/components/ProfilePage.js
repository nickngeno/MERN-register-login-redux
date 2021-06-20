import React from "react";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const state = useSelector((state) => state.isLogged);
  console.log(state)
  const { logged_in,userData } = state;

//   console.log(userData);
  return (
    <>{!logged_in ? <Redirect to="/login" /> : (<> <p>Hellow, welcome {userData.firstName} </p> </> )}</>
  );
};
   
export default ProfilePage;
