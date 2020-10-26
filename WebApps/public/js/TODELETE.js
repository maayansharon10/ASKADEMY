
  function DBaddNewQuery2(userID, firstMsgId) {
  let queryId = 1
  let creatorFirstName =" ";
  let creatorLastName=" " ;
  let firstMsgText =" ";

  // get the user's first and last name
  db.collection("users").doc(userID).get().then(function(doc) {
    creatorFirstName = doc.data().firstName;
    creatorLastName= doc.data().lastName;
    console.log("creatorFirstName is ",creatorFirstName);
    }).catch(function(error) {
    console.log("Error getting first and last name for user in addquery2:", error);
  });

  // get msg text
  db.collection("message").doc(firstMsgId).get().then(function(doc) {
    firstMsgText = doc.data().msgText;
    console.log("msg text is ",firstMsgText);
    }).catch(function(error) {
    console.log("Error getting document:", error);
  });

  db.collection("query").doc(queryId).set({

    'creatorFirstName': creatorFirstName,
    'creatorLastName': creatorLastName,
    'firstMsgText': firstMsgText,
   
  }).then(function () {
    console.log("setDocument: query Document successfully written!, query id: ", queryId);
  })
    .catch(function (error) {
      console.error("setDocument: Error writing document: ", error);
    });

  }