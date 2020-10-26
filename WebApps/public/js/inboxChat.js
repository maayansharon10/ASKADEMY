// -------------------- Noa: inbox chat -----------------------------//

/**
 * set all attributes for a given element
 * used by loadInbox and loadMsgs funcs
 */
function setAttrs(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

/**
 * At point where I have userID, queryID
 * https://www.w3schools.com/js/js_timing.asp
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 */
var functionOnLoadMaybe = function( query){
  wasQuerySeen(createQueryElementFromDB, query);
}


/**
 * create html elements from db
 */
var createQueryElementFromDB = function(seen, query){
  // console.log('createQueryElementFromDB');
  // get query data
    var firstMsgID = query.data().msgArray[0];
    var q_ex = query.data().exNum;
    var q_question = query.data().questionNum;
    var q_subq = query.data().subqNum;
    var q_time = parseTime(query);
    var q_header;
    if (q_subq) { q_header = "Ex " + q_ex + ", Question " + q_question + "." + q_subq + ": "; }
    else { q_header = "Ex " + q_ex + ", Question " + q_question + ": "; }
    var q_user_firstname = query.data().creatorFirstName;
    var q_user_lastName = query.data().creatorLastName;
    var q_text = query.data().firstMsgText;
    var q_user_fullname = q_user_firstname + ' ' + q_user_lastName;
  
  // create elements
    var inboxChat = document.getElementById("inboxChat");
    var elem_chatList = document.createElement("li");
    var elem_chatPeople = document.createElement("div");
    var elem_chatImg = document.createElement("div");
    var elem_img = document.createElement("img");
    var elem_chatIb = document.createElement("chat_ib");
    var elem_h5 = document.createElement("h5");
    var elem_name = document.createTextNode(q_user_fullname);
    var elem_svg = document.createElement("svg");
    var elem_path = document.createElement("path");
    var elem_chatDate = document.createElement("span");
    var elem_date = document.createTextNode(q_time);
    var elem_p = document.createElement("p");
    var elem_b = document.createElement("b");
    var elem_header = document.createTextNode(q_header);
    var elem_text = document.createTextNode(q_text);
    
    // create new msg element
    var elem_newMsg = document.createElement('span')
    var elem_newMsg_text = document.createTextNode("+1")

  // set elements attributes
    setAttrs(elem_newMsg, {'class': "unseen"})
    setAttrs(elem_chatList, {"class": "chat_list"});  
    setAttrs(elem_chatPeople, {"class": "chat_people"});
    setAttrs(elem_chatPeople, {"onclick": 'loadMsgHistory("' + query.data().queryId + '")'});
    setAttrs(elem_chatImg, {"class": "chat_img"});
    setAttrs(elem_img, {"src": "assets/avatars/avatar" + q_user_firstname + ".png"});
    setAttrs(elem_chatIb, {"class": "chat_ib"});
    setAttrs(elem_svg, {"class": "bi bi-lightning-fill", "width": "1em", "height": "1em", "viewBox": "0 0 16 16", "fill": "currentColor", "xmlns": "http://www.w3.org/2000/svg"});
    setAttrs(elem_path, {"fill-rule": "evenodd", "d": "M11.251.068a.5.5 0 01.227.58L9.677 6.5H13a.5.5 0 01.364.843l-8 8.5a.5.5 0 01-.842-.49L6.323 9.5H3a.5.5 0 01-.364-.843l8-8.5a.5.5 0 01.615-.09z", "clip-rule": "evenodd"});
    setAttrs(elem_chatDate, {"class": "chat_date"});

  // append children
    elem_chatImg.appendChild(elem_img);
    elem_chatPeople.appendChild(elem_chatImg);
    elem_chatList.appendChild(elem_chatPeople);
    elem_h5.appendChild(elem_name);
    elem_svg.appendChild(elem_path);
    elem_h5.appendChild(elem_svg);  
    elem_chatDate.appendChild(elem_date);
    elem_h5.appendChild(elem_chatDate);
    elem_chatIb.appendChild(elem_h5);
    elem_b.appendChild(elem_header);
    elem_p.appendChild(elem_b);
    elem_p.appendChild(elem_text);
    elem_chatIb.appendChild(elem_p);
    elem_chatPeople.appendChild(elem_chatIb);

    // add new msgs tag
    elem_newMsg.appendChild(elem_newMsg_text);
    if (seen == false) { elem_chatPeople.appendChild(elem_newMsg); }

    elem_chatList.appendChild(elem_chatPeople);
    inboxChat.appendChild(elem_chatList);
}

/**
 * remove prev queries
 */
function resetInboxChat(){
  const myNode = document.getElementById("inboxChat");
  myNode.innerHTML = '';
}



function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

/**
 * load inbox queries
 */
function loadInbox(ex=0, q=0) {
  console.log("loadinbox was called");
  if (document.getElementById("inboxChat") != null){
      resetInboxChat();
  }
  // load queries from db
  DBgetAllQueries(functionOnLoadMaybe,ex,q);
  refresh_time = new Date();
}

// -------------------- end Noa: inbox chat -----------------------------//


// --------------------- open first queryDiscusion ---------------------//

function hideShowId(idHiddenArray,idShowArray) {
  // show and hide all given objects according to id
  for(var i = 0; i < idHiddenArray.length; i += 1){
     document.getElementById(idHiddenArray[i]).style.display= 'none';
  }

  for(var j = 0; j < idShowArray.length; j += 1){
     document.getElementById(idShowArray[j]).style.display= 'block';
  }
}

// --------------------- end: open first queryDiscusion ---------------------//
function stoppedTyping(){
  debugger;
        if(document.getElementById("message-to-reply").value==="") { 
            document.getElementById('replyPost').disabled = true;
        } else { 
            document.getElementById('replyPost').disabled = false; 
        }
    }

