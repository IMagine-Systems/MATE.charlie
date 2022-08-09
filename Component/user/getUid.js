// import { auth, db } from '../../db/DatabaseConfig/firebase';
// import { doc, setDoc, arrayUnion, getDoc, connectFirestoreEmulator } from 'firebase/firestore';
// import { onAuthStateChanged } from 'firebase/auth';
// import React, { useState, useEffect } from "react";

// export default function getUid() {
//     let myUid;
//     let myEmail;
//     const myDoc = doc(db, "User", "UserInfo");

//     onAuthStateChanged(auth, (user) => {
//         myEmail = user.email;
//     });

//     getDoc(myDoc)
//     .then((snapshot) => {
//         if (snapshot.exists) {
//             snapshot.data().UserInfo.map((userDatas) => {
//                 if (userDatas.email === myEmail) {
//                     myUid = userDatas.UID;
//                     console.log(myUid);
//                     return myUid;
//                 }
//             });
//         } else {
//             console.log("No Document!");
//         }
//     })
//     .catch((error) => console.log(error.message));

// }

// 모듈로 이용할 예정~~~