// --------------------- load components ---------------------//
window.onload = () => {
  // Noa: update cur user
  updateCurUser();
  console.log("cur user id:" + userIdCur);
  
  const topNavbarLoading = new rxjs.Observable(observer => {
    $("#topNavbar").load("components/topNavbar.html", () => observer.next());
  });

  const inboxChatLoading = new rxjs.Observable(observer => {
    $("#inboxChat").load("components/inboxChat.html", () => observer.next());
  });

  const msgHistoryEmptyLoading = new rxjs.Observable(observer => {
     $("#msgHistoryEmpty").load("components/msgHistoryEmpty.html", () => observer.next());
   });

  const msgHistoryLoading = new rxjs.Observable(observer => {
    $("#msgHistory").load("components/msgHistory.html", () => observer.next());
  });

  const createNewQueryLoading = new rxjs.Observable(observer => {
    $("#createNewQuery").load("components/replyBox.html", () => observer.next());
  });
  // inserting to .newQuery_id the addNewQuery.html :chen new 16/05
  $(function(){
      $("#addNewQuery").load("components/addNewQuery.html"); 
    });

  // end newQuery_id
  // Wait until all components are loaded
  rxjs.zip(
        topNavbarLoading,
        inboxChatLoading,
        msgHistoryEmptyLoading,
        msgHistoryLoading
        
  ).subscribe(() => {
    // Components are loaded, display them
    $("#loading").css({ display: 'none' });
    // noa: added from oldVersion (was missing here)
    $("#components").css({ display: 'block' });
  });
};


// -------------------- start  chen: onclick addNewQuery -----------------------------//
 function openNewQuery() {
    document.getElementById("new_chat_message_id").style.display="block";
  }
  function closeNewQuery() {
    document.getElementById("new_chat_message_id").style.display="none";
  }
// -------------------- end  chen: onclick addNewQuery -----------------------------//



// -------------------- Eldad: Gesture functions -----------------------------//

 function snackbar() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

//  function badSnackbar() {
//   var x = document.getElementById("badSnackbar");
//   x.className = "show";
//   setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
// }


function newPost() {
  if (newQueryProcess()){
      snackbar();
      clearNewQueryTextfield();
      // loadInbox(cur_ex_filtered, cur_q_filtered);

  } else {
    //if failed show popup
  // } badSnackbar();
  // Todo: Add new query to DB
  }
}

function clearNewQueryTextfield() {
  document.getElementById("inlineFormExSelect").selectedIndex  = 0;
  document.getElementById("inlineFormQuestionSelect").selectedIndex  = 0;
  document.getElementById("inlineFormSubSelect").selectedIndex  = 0;
  document.getElementById("exampleFormControlTextarea1").value = "";

}
function clearReplyTextfield() {
  document.getElementById('replyPost').disabled = true; 
  document.getElementById("replyForm").reset();
}

function validateNewQueryForm() {
  var x = document.forms["newQuery_form"]["fname"].value;
  if (x == null || x == "") {
    alert("Must enter text before posting");
    return false;
  } newPost();
}

function validateSelections() {
  var x = document.forms["newQuery_form"]["exercise"].value;
  if (x == null || x == "") {
    alert("Must select exercise");
    return false;
  } validateNewQueryForm();
}

function exitQuestion() {
  var x = document.forms["newQuery_form"]["fname"].value;
  if (x != null && x != "") {
    alert("Are you sure you want to exit?");
  } closeNewQuery();
} 

// -------------------- end Eldad: Gesture functions -----------------------------//