// import React, { useEffect, useHistory } from "react";
// import jwt from "jsonwebtoken";
// const userProfile = () => {
//   useEffect(() => {
//     const history = useHistory();
//     const fetchData = async () => {
//       const data = await fetch("/api/profile", {
//         headers: {
//           "x-access-token": localStorage.getItem("token"),
//         },
//       });
//     };
//     const token = localStorage.getItem("token");
//     if (token) {
//       const user = jwt.decode(token);
//       if (!user) {
//         localStorage.removeItem("token");
//         history.replace("/login");
//       } else {
//         fetchData();
//       }
//     }
//   });
//   return <div>userProfile</div>;
// };

// export default userProfile;
