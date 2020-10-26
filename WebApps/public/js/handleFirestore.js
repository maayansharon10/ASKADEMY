// Maayan's !!!! for now, please do not add or edit before letting me know. thanks <3
// create new DB
// authentication 
// some thing didnot work

// -------------------------------- todo's  --------------------------
// ******** likes
// ***********done: params initialized when creating msg, query, user
// msg - like count, likedby
// user - likedMsgs
// when user likes a msg :
// like count increases, liked by : add used to list, user like msgs - add msg id
// query's 'likeTotalMsgCounter' increases
// when user dislikes a msg :
// like count decreases, liked by : remove used to list, user like msgs - remove msg id
// query's 'likeTotalMsgCounter' decreases

// ******** authentication
// ******** like per query


// only if we have time:
// ******** adding a picture
// ******** searching in msg

// -------------------------------- code: --------------------------
// global variables - DO NOT DELETE
let db; //
let userIdCur;
let cur_ex_filtered = 0;
let cur_q_filtered = 0;
let cur_query_id = '';
let refresh_time = null;
let me_filter = false; //NOA

let config = {
  apiKey: "AIzaSyBFbx4l6ZYVy1WYLMHHsOT0CaHv4mpr_O8",
  authDomain: "webappshuji.firebaseapp.com",
  databaseURL: "https://webappshuji.firebaseio.com",
  projectId: "webappshuji",
  storageBucket: "webappshuji.appspot.com",
  messagingSenderId: "648017284268",
  appId: "1:648017284268:web:fd93b591e58ad6dce5e309",
  measurementId: "G-GP5MX31VXD"

};

let app = firebase.initializeApp(config);
db = firebase.firestore(app);

/**
 * update user Id global variable from local storage
 */
function updateCurUser() {
  if (localStorage.getItem('userIdCur') != null) {
    userIdCur = localStorage.getItem('userIdCur');
  }
}

/*
 * this function runs once page is loaded
 */
function run() {
  // let config = {
  //   apiKey: "AIzaSyBFbx4l6ZYVy1WYLMHHsOT0CaHv4mpr_O8",
  //   authDomain: "webappshuji.firebaseapp.com",
  //   databaseURL: "https://webappshuji.firebaseio.com",
  //   projectId: "webappshuji",
  //   storageBucket: "webappshuji.appspot.com",
  //   messagingSenderId: "648017284268",
  //   appId: "1:648017284268:web:fd93b591e58ad6dce5e309",
  //   measurementId: "G-GP5MX31VXD"

  // };

  // let app = firebase.initializeApp(config);
  // db = firebase.firestore(app);

  // ------------ do not activate -----------
  //load fictional users
  //let user1 = DBaddNewUser(true, "Maayan", "Sharon","ICNguJEFlENnkyTOo2nKajqxq1O2")
  //let user2 = DBaddNewUser(true, "Noa", "Levitzky")
  //let user3 = DBaddNewUser(true, "Chen", "Rasooly", "DLlESTvwrZOJsf3zf0Lw0plid5J3")
  // let user4 = DBaddNewUser(true, "Simon", "Malaku","WtUnv0AT6fQHmZgr6mOPZwivWDn2")
  // let user5 = DBaddNewUser(true, "Eldad", "Wang","aKNuDi1z3GXecRO8k0ecRRCjCWJ3")
  // let user6 = DBaddNewUser(true, "Frida", "Kahlo","JV3sanemuzaVivuE2uP4sxCY39U2")


  // load fictional query with first msg

  // ********* add new query and msg*********
  // chen, maayan, noa
  // var usersId = ['5570dd5e-6498-4c1d-960d-6cab2e6d432f',
  //   'd3647bd5-b2f2-4d6d-879c-13ac358731f0',
  //   '0adc365d-9c28-4a09-b720-1a4e0828fad1']
  //console.log("userId",usersId);

  var course = 80430;

  // create msgs
  // let msgId1 = DBaddNewMsg("Any help?", usersId[0]);
  // let msgId2 = DBaddNewMsg("Should I use the definition of the probability distribution of a random variable?", usersId[1]);
  // let msgId3 = DBaddNewMsg("Yes, that's how I understood it as well", usersId[2]);
  // let msgId4 = DBaddNewMsg("Ok thanks!", usersId[1]);
  // let msgId5 = DBaddNewMsg("yep, call me.", usersId[1]);

  var msgs = ['6b368c80-e64b-4862-a932-2f2663880a76',
    '6d5b3f05-de90-4e69-bdff-4754c51962e3',
    '28f3b8f0-7160-46cc-90c6-9a07bb778c5c',
    'b2d05eb5-64cd-4118-8d40-28af9ada26eb',
    '4b1ac1fc-6afa-4796-940b-5c4b865342c3'];

  // create queries
  // DBaddNewQuery(course, 1, 1, null, usersId[0], msgs[0]);
  // DBaddNewQuery(course, 3, 2, 'C', usersId[2], msgs[1]);

  // DBaddNewMsgToQuery('ad1ae008-75c5-4180-999f-d2dca1c1b832', msgs[2]);
  // DBaddNewMsgToQuery('ad1ae008-75c5-4180-999f-d2dca1c1b832', msgs[3]);
  // DBaddNewMsgToQuery('b1250b5c-58ed-446b-a75f-11b60d58fbe1', msgs[4]);
  loadInbox(cur_ex_filtered, cur_q_filtered);
  setTimeout(refresh_inboxchat, 30000);// TODO

}

//--------------------------------------------------------------------------------
//-------------------------------- generators functions --------------------------
//--------------------------------------------------------------------------------

function refresh_inboxchat(){
  console.log('refreshing?');
  cur_time = new Date();
  if (cur_time.getSeconds() > refresh_time.getSeconds() + 30){
      loadInbox(cur_ex_filtered, cur_q_filtered);
  } 
}

/**
 * this func generates a ramdom uuid
 * @returns {string}
 */
function create_UUID() {
  let dt = new Date().getTime();
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}


/**
 * parse time stemp intoTime created time
 */
function parseTime(collectionType) {
  var UNIX_timestamp = collectionType.data()['created'];
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear() - 1969;
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = ("0" + a.getHours()).slice(-2);
  var min = a.getMinutes();
  var time = month + ' ' + date + ', ' + hour + ':' + min;
  return time;
}


//--------------------------------------------------------------------------------
//--------------------------- adding/setting functions ---------------------------
//--------------------------------------------------------------------------------


/**
 * this function adds a new user to the data base
 * @param isOnline
 * @param firstName
 * @param lastName
 */
function DBaddNewUser(isOnline, firstName, lastName, userId) {
  // let userId = 'WbQJa6TLXwed8UYjxOFAu8YHiio1';
  //let userId = create_UUID();     // TODO generate new user id

  db.collection("users").doc(userId).set({
    'userId': userId,
    'isOnline': isOnline,
    'firstName': firstName,
    'lastName': lastName,
    'created': firebase.firestore.FieldValue.serverTimestamp(),
    'seenQueries': { "exist": 0 },
    'likedMsgs': { "exist": 0 },
  }).then(function () {
    console.log("DBaddNewUser successfully written!");
  })
    .catch(function (error) {
      console.error("DBaddNewUser: Error writing document: ", error);
    });
  return userId;
}

/**
 * 
 * @param {number} courseNum
 * @param {number} exNum
 * @param {number} questionNum
 * @param {number} subqNum
 * @param {string} userID
 * @param {string} firstMsgId
 * @returns {string} query id
 * @todo if i have the time - add new query - create the first msg in this func to decrease num of calls to db!
 */
function DBaddNewQuery(courseNum, exNum, questionNum, subqNum, userID, firstMsgId) {

  let creatorFirstName = " "; let creatorLastName = " "; let firstMsgText = " ";
  let queryId = create_UUID();   // generate query id

  var userRef = db.collection("users").doc(userID); //TODO - Change User!!!
  // create promises:
  const promise1 = userRef.get();
  const promise2 = db.collection("message").doc(firstMsgId).get();

  Promise.all([promise1, promise2]).then((values) => {
    doc1 = values[0];
    doc2 = values[1];
    creatorFirstName = doc1.data().firstName;
    creatorLastName = doc1.data().lastName;
    //firstMsgText = doc2.data().msgText; TODO 
    firstMsgText = document.forms["newQuery_form"]["fname"].value;

    db.collection("query").doc(queryId).set({  // CREATE QUERY:
      'queryId': queryId,
      'courseNum': courseNum,
      'exNum': parseInt(exNum),
      'questionNum': parseInt(questionNum),
      'subqNum': parseInt(subqNum),
      'creatorID': userID, //TODO - ChangeUser!!!
      'creatorFirstName': creatorFirstName,
      'creatorLastName': creatorLastName,
      'firstMsgText': firstMsgText,
      'msgArray': [firstMsgId],
      'msgArrayLen': 1,
      'likeTotalMsgCounter': 0,
      'created': firebase.firestore.FieldValue.serverTimestamp()
    }).then(function () {
      console.log("DBaddNewQuery: query Document successfully written!, query id: ", queryId);
      clearNewQueryTextfield();
    })
      .catch(function (error) {
        console.error("DBaddNewQuery: Error writing document: ", error);
      });

    // UPDATE USER'S OWNER QUERIES - add a new query to the "ownerQuerie" array field:
    userRef.update({
      ownerQueries: firebase.firestore.FieldValue.arrayUnion(queryId)
    })
      .catch(function (error) {
        console.error("DBaddNewQuery: ,UPDATE USER'S OWNER QUERIES - addquery, Error writing document: ", error, "query id: ", queryId);
      });
  });
  return queryId;
}






/**
 * this function adds a new msg to the data base. returns msgId
 * @param msgText
 * @param ownerID
 * @param file
 * @returns {string} msgId
 */
function DBaddNewMsg(msgText, ownerID, file = null) {

  let msgId = create_UUID(); // generate msg id

  var userRef = db.collection("users").doc(ownerID);  //TODO - ChangeUser!!! to ownerID
  const promise1 = userRef.get();
  Promise.all([promise1]).then((values) => {
    doc1 = values[0];
    creatorFirstName = doc1.data().firstName;
    creatorLastName = doc1.data().lastName;
    isdeleted = false;
    // create first msg in query  msgId,msgText,ownerID, timestemp, isdeleted=false,file=null
    db.collection("message").doc(msgId).set({
      'msgId': msgId,
      'msgText': msgText,
      'creatorID': ownerID, //TODO - ChangeUser!!!
      'creatorFirstName': creatorFirstName,
      'creatorLastName': creatorLastName,
      'isdeleted': isdeleted,
      'created': firebase.firestore.FieldValue.serverTimestamp(),
      'LikeCount': 0,
      'likedBy': { "exist": 0 },

      //Like count, writer first&last names
    }).then(function () {
      console.log(" DBaddNewMsg: msg Document successfully written!");
    })
      .catch(function (error) {
        console.error(" DBaddNewMsg: Error writing document: ", error);
      });
  });
  return msgId;


}



/**
 * given a msgID, queryID, this function is adding new msg to query (update msgArray in query)
 * @param {string} queryId
 * @param {string} msgId
 * @todo 
 */
function DBaddNewMsgToQuery(queryId, msgId) {
  var queryRef = db.collection('query').doc(queryId);

  queryRef.update({
    msgArray: firebase.firestore.FieldValue.arrayUnion(msgId)    // add a new msg to the "msgArray" array field.
  }).catch(function (error) {
    console.error(" DBaddNewMsgToQuery: Error update msgArray ", error);
  });;

  queryRef.update({
    msgArrayLen: firebase.firestore.FieldValue.increment(1)    // increment the length of array by 1.

  }).catch(function (error) {
    console.error(" DBaddNewMsg: Error update msgArrayLen: ", error);
  });;

}

/**
 * this func adds one like to msg, 
 * @param {string} queryId 
 * @param {string} msgId 
 */
function DBAddLikeMsg(queryId, msgId) {
  var msgRef = db.collection('message').doc(msgId);
  var queryRef = db.collection('query').doc(queryId);
  var userRef = db.collection('users').doc(userIdCur);

  const promise1 = msgRef.get();
  const promise2 = queryRef.get();
  const promise3 = userRef.get();

  Promise.all([promise1, promise2, promise3]).then((values) => {
    doc1 = values[0];
    doc2 = values[1];
    userdoc = values[2];

    // increse like total counter of query by 1.
    queryRef.update({
      likeTotalMsgCounter: firebase.firestore.FieldValue.increment(1)
    });

    // increse like counter of msg by 1.
    msgRef.update({
      LikeCount: firebase.firestore.FieldValue.increment(1)
    });

    // update like msgs for given user
    var updateObj = { likedMsgs: {} };
    updateObj.likedMsgs[msgId] = msgId;
    var setWithMerge = userRef.set(updateObj, { merge: true }).then(function () {
      //console.log("update successful query:", queryId, "user:", userID);
    });
  })

    .catch(function (error) {
      console.error("UPDATE user's liked msgs failed Error writing document: ", error, "msg id: ", msgId);
    });
}



function DBRemoveLikeMsg(queryId, msgId) {
  var msgRef = db.collection('message').doc(msgId);
  var queryRef = db.collection('query').doc(queryId);
  var userRef = db.collection('users').doc(userIdCur);

  const promise1 = msgRef.get();
  const promise2 = queryRef.get();
  const promise3 = userRef.get();

  Promise.all([promise1, promise2]).then((values) => {
    doc1 = values[0];
    doc2 = values[1];
    userdoc = values[2];

    // increse like total counter of query by 1.
    queryRef.update({
      likeTotalMsgCounter: firebase.firestore.FieldValue.increment(-1) // added by noa
    });

    // increse like counter of msg by 1.
    msgRef.update({
      LikeCount: firebase.firestore.FieldValue.increment(-1) // added by noa
    });

    // update like msgs for given user
    var updateObj = { likedMsgs: {} };
    updateObj.likedMsgs[msgId] = msgId;
    userRef.set({
      likedMsgs: {
        [msgId]: firebase.firestore.FieldValue.delete()
      }
    }, { merge: true });


  }).then(function () {
    console.log("DBremoveLikeMsg successfully written!");
  })
    .catch(function (error) {
      console.error("DBremoveLikeMsg: Error writing document: ", error);
    });
};



function updateQuerySeen(userID, queryID) {

  var userRef = db.collection("users").doc(userID);
  var queryRef = db.collection("query").doc(queryID);
  //  const promise1 = userRef.get(); 
  const promise2 = queryRef.get();
  Promise.all([/*promise1*/, promise2]).then((values) => {
    //doc1 = values[0]; 
    userdoc = values[1];

    const promise3 = userdoc.data().msgArrayLen;
    Promise.all([promise3]).then((values2) => {
      curMsgArrayLen = values2[0];

      var updateObj = { seenQueries: {} };
      updateObj.seenQueries[queryID] = curMsgArrayLen;
      var setWithMerge = userRef.set(updateObj, { merge: true }).then(function () {
        //console.log("update successful query:", queryId, "user:", userID);
      });
    })
      .catch(function (error) {
        console.error("UPDATE user's seen query failed Error writing document: ", error, "query id: ", queryId, " for user:", userID);
      });;
  });

}









//--------------------------------------------------------------------------------
//------------------------ get documents- excecute func --------------------------
//--------------------------------------------------------------------------------

/**
 * get specific document from db according to id and excecute f(doc)
 * @param collectionType
 * @param docId
 * @param fn
 */
function DBgetDocumentById(collectionType, docId, fn) {

  db.collection(collectionType).doc(docId).get()
    .then(function (doc) {
      if (doc.exists) {
        return fn(doc);
      } else {
        return fn(doc);
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
}

function queriesFilterTwoFields(fn, field1, val1, field2, val2, userID) {
  db.collection('query').where(field1, '==', parseInt(val1)).where(field2, '==', parseInt(val2))
    .orderBy('created', 'desc').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        fn(doc, userID);
      });
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
}


function queriesFilterTwoFieldsAndMe(fn, field1, val1, field2, val2, userID) {
  db.collection('query').where(field1, '==', parseInt(val1)).where(field2, '==', parseInt(val2)).where('creatorID', '==', userID)
    .orderBy('created', 'desc').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        fn(doc, userID);
      });
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
}

function queriesFilterOneField(fn, field, val, userID) {
  db.collection('query').where(field, '==', parseInt(val))
    .orderBy('created', 'desc').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        fn(doc, userID);
      });
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
}

function queriesFilterOneFieldAndMe(fn, field, val, userID) {
  db.collection('query').where(field, '==', parseInt(val)).where('creatorID', '==', userID)
    .orderBy('created', 'desc').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        fn(doc, userID);
      });
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
}


function queriesNoFilter(fn, userID) {
  db.collection('query').orderBy('created', 'desc').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        fn(doc, userID);
      });
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
}


function queriesNoFilterAndMe(fn, userID) {
  db.collection('query').where('creatorID', '==', userID).orderBy('created', 'desc').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        fn(doc, userID);
      });
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
}

/**
 * get from db : get all doc in collection, iterate and excecute fn [on each doc calls fn(doc)]
 * @param {string} collection message, query, user
 * @param {function} fn function which gets doc as arg
 */
const DBgetAllQueries = function (fn, ex, q) {
  //console.log("DBgetAllQueries");
  //console.log("ex:" + ex + ", q:" + q);
  if (me_filter == false){
    // ex & question filters
    userIdCur = localStorage.getItem('userIdCur');
    // debugger;
    if ((q != 0) && (ex != 0)) { queriesFilterTwoFields(fn, 'exNum', ex, 'questionNum', q, userIdCur); }
    // question filter
    else if (q != 0) { queriesFilterOneField(fn, 'questionNum', q, userIdCur); }
    // ex filter
    else if (ex != 0) { queriesFilterOneField(fn, 'exNum', ex, userIdCur); }
    // no filters
    else { queriesNoFilter(fn, userIdCur); }
  }
  else{
    // ex & question filters
    userIdCur = localStorage.getItem('userIdCur');
    // debugger;
    if ((q != 0) && (ex != 0)) { queriesFilterTwoFieldsAndMe(fn, 'exNum', ex, 'questionNum', q, userIdCur); }
    // question filter
    else if (q != 0) { queriesFilterOneFieldAndMe(fn, 'questionNum', q, userIdCur); }
    // ex filter
    else if (ex != 0) { queriesFilterOneFieldAndMe(fn, 'exNum', ex, userIdCur); }
    // no filters
    else { queriesNoFilterAndMe(fn, userIdCur); }
  }
}

/**
 * get from db : get all doc in collection, iterate and excecute fn [on each doc calls fn(doc)]
 * @param {string} collection message, query, user
 * @param {function} fn function which gets doc as arg
 */
const DBgetAllMsgs = function (fn) {
  console.log("getDocuments");
  // debugger;
  db.collection("message").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      fn(doc);
    });
  }).catch(function (error) {
    console.log("Error getting document:", error);

  });
}




//--------------------------------------------------------------------------------
//-------------------------------- query functions -------------------------------
//--------------------------------------------------------------------------------

// added by noa
function wasMsgLiked(msg) {
  const promise1 = db.collection("users").doc(userIdCur).get(); //TODO - ChangeUser!!! to ownerID
  //debugger;
  const promise2 = msg.data()['msgId'];
  Promise.all([promise1, promise2]).then((values) => {
    doc1 = values[0];
    msgId = values[1];
    let userLikedMsg = msgId in doc1.data().likedMsgs;  // added by noa
    if (userLikedMsg) { createMsgElement(true, msg); }
    else { createMsgElement(false, msg); }
  });
}

function wasQuerySeen(createQueryElementFromDB, query) {
  const promise1 = db.collection("users").doc(userIdCur).get(); //TODO - ChangeUser!!! to ownerID
  const promise2 = query.data()['queryId'];
  Promise.all([promise1, promise2]).then((values) => {
    doc1 = values[0];
    queryId = values[1];
    let userSeenQuery = queryId in doc1.data().seenQueries;  //bool

    //debugger;
    if (userSeenQuery) {
      whenUserSeenQuery = doc1.data().seenQueries[queryId];  // len of array when user last opened query (msg array)
      curMsgArrayLen = query.data().msgArrayLen;
      // debugger;
      if (whenUserSeenQuery == curMsgArrayLen) {  // if user already read all msg in query

        createQueryElementFromDB(true, query);  // show as seen
      }
      else {
        createQueryElementFromDB(false, query); // show as unseen;

      }

    }
    else {
      //      createQueryElementFromDB(false, query); // show as unseen;
      createQueryElementFromDB(false, query); // show as unseen;

    }
  });
}


/**
 * returns true if query was seen by user, false otherwise
 * @param {string} userID
 * @param {string} queryId
 * @todo check if it's better to fun this func on all queries at once
 */
function updateQuerySeen(userID, queryID) {

  var userRef = db.collection("users").doc(userID);
  var queryRef = db.collection("query").doc(queryID);
  //  const promise1 = userRef.get(); 
  const promise2 = queryRef.get();
  Promise.all([/*promise1*/, promise2]).then((values) => {
    //doc1 = values[0]; 
    doc2 = values[1];

    const promise3 = doc2.data().msgArrayLen;
    Promise.all([promise3]).then((values2) => {
      curMsgArrayLen = values2[0];

      var updateObj = { seenQueries: {} };
      updateObj.seenQueries[queryID] = curMsgArrayLen;
      var setWithMerge = userRef.set(updateObj, { merge: true }).then(function () {
        //console.log("update successful query:", queryId, "user:", userID);
      });
    })
      .catch(function (error) {
        console.error("UPDATE user's seen query failed Error writing document: ", error, "query id: ", queryId, " for user:", userID);
      });;
  });

}

/*new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000); // (*)

}).then(function(result) { // (**)

  alert(result); // 1
  return result * 2;

}).then(function(result) { // (***)

  alert(result); // 2
  return result * 2;

}).then(function(result) {

  alert(result); // 4
  return result * 2;

});
*/

//--------------------------------------------------------------------------------
//-------------------------------- msg functions -------------------------------
//--------------------------------------------------------------------------------

function newMsgProcess() {
  let context = document.forms["replyForm"]["message-to-send"].value;
  let userId = userIdCur;
  let newMsgId = DBaddNewMsg(context, userIdCur);
  if (DBaddNewMsg) {
    DBaddNewMsgToQuery(cur_query_id, newMsgId);
    loadMsgHistory(cur_query_id);
  }


}
function newQueryProcess() {
  let courseNum = 80430;
  let exNum = document.forms["newQuery_form"]["exercise"].value;
  let questionNum = document.forms["newQuery_form"]["question"].value;
  let subqNum = document.forms["newQuery_form"]["sub"].value;
  let context = document.forms["newQuery_form"]["fname"].value;

  if (!(isNaN(exNum) && isNaN(subqNum) && isNaN(questionNum))) {
    const promise1 = DBaddNewMsg(context, userIdCur);

    Promise.allSettled([promise1]).then((values) => {
      newMsgId = values[0];
      if (newMsgId) {
        let newQuery = DBaddNewQuery(courseNum, parseInt(exNum), parseInt(questionNum), parseInt(subqNum), userIdCur, newMsgId.value);
        loadInbox(cur_ex_filtered, cur_q_filtered);
        //clearNewQueryTextfield();
        return true;
      }
      else {
        return false;

      }
    }).catch(function (error) {
      console.error(" newQueryProcess failed Error writing document ");
    });
  }
}

//--------------------------------------------------------------------------------
//----------------------- helper functions - ofer's functions --------------------
//--------------------------------------------------------------------------------

function addDocument(firstName) {
  console.log("addDocument");
  db.collection("users").add({
    firstName: "maayan",
    lastName: "sharon",
    isAdmin: true
  })
    .then(function (docRef) {
      console.log("addDocument: Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("addDocument: Error adding document: ", error);
    });
}

function getDocuments() {
  console.log("getDocuments");
  db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log("getDocuments" + `${doc.id} => ${doc.data()}`);
    });
  });
}

function setDocument() {
  console.log("setDocument");
  db.collection("cities").doc("LA").set({
    name: "Los Angeles",
    state: "CA",
    country: "USA"
  })
    .then(function () {
      console.log("setDocument: Document successfully written!");
    })
    .catch(function (error) {
      console.error("setDocument: Error writing document: ", error);
    });
}

function deleteDocument() {
  console.log("deleteDocument");
  db.collection("cities").doc("DC").delete().then(function () {
    console.log("deleteDocument: Document successfully deleted!");
  }).catch(function (error) {
    console.error("deleteDocument: Error removing document: ", error);
  });
}
//------------------------------------------------
// --------------------Get Online user ------------
//-------------------------------------------------

function getOnlineUsers() {
  let onlineusers = []
  db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.data().length == undefined) {
        let newUser = { "writer_name": doc.data().firstName + " " + doc.data().lastName, "img_name": doc.data().firstName }
        onlineusers.push(newUser);
      }
    });
    showWhoConnected(onlineusers);
  });
}

function getProgileImg() {
  db.collection("users").doc(userIdCur).get().then((value) => {
    let user = value.data();
    document.getElementById("myProfile").src = "assets/avatars/avatar" + user.firstName + ".png";

  });
}









// --------------------------------------------------------
// --------------------- AUTH -----------------------------
// --------------------------------------------------------

// app.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//     document.getElementById("user_div").style.display = "block";
//     document.getElementById("login_div").style.display = "none";

//     var user = firebase.auth().currentUser;
//     userIdCur = user.uid;
//     console.log(userIdCur);
//     if (user != null) {
//       var email_id = user.email;
//       document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
//     }

//   } else {
//     // No user is signed in.
//     document.getElementById("user_div").style.display = "none";
//     document.getElementById("login_div").style.display = "block";
//   }
// });

function login() {
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function (user) {

    localStorage.setItem('userIdCur', user.user.uid);
    console.log("id of user: " + localStorage.getItem('userIdCur'));
    window.location.href = 'index.html';
  })

    .catch(function (error) {
      console.error("user doesn't exist", error);
      // // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // window.alert("Error : " + errorMessage);
      // ...
    });

}

function logout() {
  firebase.auth().signOut();
}


// currently not working!!
// function googleSignIn() {
//   base_provider = new firebase.auth.GoogleAuthProvider()

//   // sign in with google
//   firebase.auth().signInWithPopup(base_provider).then(function (result) {
//     console.log("login sucsees")
//     localStorage.setItem('userIdCur', firebase.auth().currentUser);

//     // update data in our users table
//     db.collection('users').doc(firebase.auth().currentUser.uid).set(
//       {
//         'userId': userId,
//         'isOnline': isOnline,
//         'firstName': firstName,
//         'lastName': lastName,
//         'created': firebase.firestore.FieldValue.serverTimestamp(),
//         'seenQueries': { "exist": 0 },
//         'likedMsgs': { "exist": 0 },
//       }
//     ).then(function () {
//       console.log("Document successfully written!");
//     }).catch(function (error) {
//       console.error("Error writing document: ", error);
//     })
//   })
// }

// ------------------------------------------------------------
// end --------------------- AUTH -----------------------------
// ------------------------------------------------------------



