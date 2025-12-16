// import { Navigate, useLocation } from "react-router-dom";
// import { Fragment } from "react";

// function RouteGuard({ authenticated, user, element }) {
//   const location = useLocation();

//   console.log(authenticated, user, "useruser");

//   // For initial un-authorized users or before login state
//   if (!authenticated && !location.pathname.includes("/auth") && !location.pathname.includes("/guest-login") ) {
//     return <Navigate to="/public" />;
//   }

//   // For Role: User, Authenticated User login
//   // if (
//   //   (authenticated &&
//   //   user?.role === "user") &&
//   //   (location.pathname.includes("/instructor") || location.pathname.includes("/auth"))
//   // ) {
//   //   return <Navigate to="/home" />;
//   // }

//   // if (authenticated) {
//   //   if (user.role === "user") return <Navigate to="/home" />
//   //   else if (user.role === "admin" || user.role === "admin") return <Navigate to="/instructor" />
//   // }

//   // For Role: User, Restrict to go to url /insturctor or /auth
//   if (
//     (authenticated &&
//     user?.role === "user") &&                  // If Role: User
//     (location.pathname.includes("/instructor")  // If URL Contains /instructor
//     || location.pathname.includes("/auth")     // If URL Contains /auth
//     || location.pathname.includes("/guest-login")  // If URL Contains /guest-login
//   )) {
//     return <Navigate to="/home" />;
//   }

//   // For Role: Admin and Instructor, redirect to /instructor
//   if (
//     (authenticated &&
//     user.role !== "user") &&                    // If Role: Admin or Instructor
//     // location.pathname.includes("/home")          // If URL Contains /instructor
//     // || location.pathname.includes("/guest-login")  // If URL Contains /guest-login
//     !location.pathname.includes("/instructor")   // If URL Contains /instructor
//   ) {
//     return <Navigate to="/instructor" />;
//   }

//   return <Fragment>{element}</Fragment>;
// }

// export default RouteGuard;



import { Navigate, useLocation } from "react-router-dom";
import { Fragment } from "react";

function RouteGuard({ authenticated, user, element }) {
  const location = useLocation();
  const path = location.pathname;

  const isAuthPath =
    path.includes("/auth") ||
    path.includes("/guest-login");

  const isInstructorPath = path.includes("/instructor");

  // ---------------------------
  // 1. Not Authenticated
  // ---------------------------
  if (!authenticated && !isAuthPath) {
    return <Navigate to="/public" />;
  }

  // ---------------------------
  // 2. Role: USER (Restrict Instructor & Auth Pages)
  // ---------------------------
  if (
    authenticated &&
    user?.role === "user" &&
    (isInstructorPath || isAuthPath)
  ) {
    return <Navigate to="/home" />;
  }

  // ---------------------------
  // 3. Role: ADMIN / INSTRUCTOR
  // Always redirect them to /instructor dashboard
  // ---------------------------
  if (
    authenticated &&
    user?.role !== "user" &&
    !isInstructorPath
  ) {
    return <Navigate to="/instructor" />;
  }

  // ---------------------------
  // 4. Valid route → Allow element
  // ---------------------------
  return <Fragment>{element}</Fragment>;
}

export default RouteGuard;
