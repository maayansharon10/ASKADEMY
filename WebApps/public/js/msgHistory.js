// -------------------- noa: Message History -----------------------------//

/**
 * create element for a provided msg
 */
var createMsgElement = function(liked, msg){
  // get data from db
  var creator = msg.data().creatorID;
  var type = (userIdCur == creator) ? 'outgoing' : 'incoming';
  var inner_type;
  if (type == 'incoming') { inner_type = 'received'; } else { inner_type = 'sent'; }
  var text = msg.data().msgText;
  var time = parseTime(msg);
  var like_count = msg.data().LikeCount;
  var first_name = msg.data().creatorFirstName;
  var last_name = msg.data().creatorLastName;
  var full_name = first_name + ' ' + last_name;

  // create elements
    var main = document.getElementById('msgHistoryId');
    var elem_main_div = document.createElement("div");
    var elem_img_div = document.createElement("div");
    var elem_img = document.createElement('img');
    var elem_div_text_wrap = document.createElement('div');
    var elem_div_text = document.createElement('div');
    var elem_p = document.createElement('p');
    var elem_b = document.createElement('b');
    var elem_writer = document.createTextNode(full_name);
    var elem_br = document.createElement('br');
    var elem_text = document.createTextNode(text);
    var elem_span_time = document.createElement('span');
    var elem_time = document.createTextNode(time);
    var elem_like_span = document.createElement('span');
    var elem_count_span = document.createElement('span');
    var elem_count = document.createTextNode(like_count);

  // set elements attributes
    setAttrs(elem_main_div, {'class': type + "_msg"}); 
    setAttrs(elem_img_div, {'class': type +"_msg_img"});
    setAttrs(elem_img, {'src': "assets/avatars/avatar" + first_name + ".png", 'alt': first_name});
    setAttrs(elem_div_text_wrap, {'class': inner_type + "_msg"});
    setAttrs(elem_div_text, {'class': inner_type + "_withd_msg"});
    setAttrs(elem_span_time, {'class': "time_date"});
    if (type == 'incoming'){ 
      // set onclick
      setAttrs(elem_like_span, {'onclick': "toggleLike(this,'" + msg.data().msgId + "')", 'class': type});
      // set liked
      if (liked) { setAttrs(elem_like_span, {'class':"fa fa-thumbs-up fa_incoming fa_liked"}); }
      else { setAttrs(elem_like_span, {'class':"fa fa-thumbs-up fa_incoming"}); }
    }
    else if (type == 'outgoing') {
      // unable clicking and liking 
      setAttrs(elem_like_span, {'class': "fa fa-thumbs-up"}); 
    }
    setAttrs(elem_count_span, {'class':"like_count"});

  // append children  
    // special for incoming: add name title
    if (type == 'incoming') {
      elem_div_text_wrap.appendChild(elem_div_text)
      elem_b.appendChild(elem_writer);
      elem_p.appendChild(elem_b);
      elem_p.appendChild(elem_br);
    }

    elem_p.appendChild(elem_text);
    elem_span_time.appendChild(elem_time);
    if (like_count > 0) { elem_count_span.appendChild(elem_count); }    
    elem_like_span.appendChild(elem_count_span);
    elem_div_text.appendChild(elem_p);
    elem_div_text.appendChild(elem_span_time);
    elem_div_text.appendChild(elem_like_span);
    
    // special for incoming: add img
    if (type == 'incoming'){
      elem_img_div.appendChild(elem_img);
      elem_main_div.appendChild(elem_img_div);
    }

    elem_div_text_wrap.appendChild(elem_div_text);
    elem_main_div.appendChild(elem_div_text_wrap);
    main.appendChild(elem_main_div);
    // console.log(elem_main_div);
}

/**
 * clear previous msgs in msg history element
 */
function resetMsgs(){
  const myNode = document.getElementById("msgHistoryId");
  myNode.innerHTML = '';
}

/**
 * set title of breadcrupms on top of msg history
 */
function addBreadcrumbs(query){
  // breadcrumbs text
  var text = "Course 80430 > Exercise " + query.data().exNum + " > Question " + query.data().questionNum;
  if (query.data().subqNum) { text = text + " > Sub Question " + query.data().subqNum; }
  
  // create elements for bc
  var main = document.getElementById('msgHistoryId');
  var breadcrumbs_div = document.createElement('div');
  var title = document.createTextNode(text);
  setAttrs(breadcrumbs_div, {'class': 'breadcrumbs'});
  breadcrumbs_div.appendChild(title);
  main.appendChild(breadcrumbs_div)
}

/**
 * handle query's data
 */
function processQuery(query){
  addBreadcrumbs(query);

  // create msg elements for query
  var arr = query.data().msgArray;
  arr.forEach(msgId =>{
    // DBgetDocumentById('message', msgId, createMsgElement);
    DBgetDocumentById('message', msgId, wasMsgLiked);
  });
}

/**
 * called upon clicking on a query, and handles msg history
 */
function loadMsgHistory(queryId) {
  cur_query_id = queryId;
  console.log("load msg history- query " + cur_query_id + " is open!");
  updateQuerySeen(userIdCur, queryId);

  // present containers
  resetMsgs();
  hideShowId(["msgHistoryEmpty"],["msgHistoryId", "replyId"]);

  // create msg history for current query
  DBgetDocumentById('query', queryId, processQuery);

  // update seen query by refreshing the inbox chat
  loadInbox(cur_ex_filtered, cur_q_filtered);
}

function toggleLike(x, msgId){
  // toggle between thumbdown-thumbup
  // x.classList.toggle("fa-thumbs-down");
  console.log("like/dislike of query: "+ cur_query_id + ", msg:" + msgId);

  if ($(x).hasClass("fa_liked")) {
      // dislike pressed
      x.classList.remove("fa_liked");
      var new_val = (x.children[0].innerHTML == '1')? '' : String(parseInt(x.children[0].innerHTML) - 1);
      x.children[0].innerHTML =  new_val;
      DBRemoveLikeMsg(cur_query_id, msgId);
  }
  else {
      // like pressed
      x.classList.add("fa_liked");
      var new_val = (x.children[0].innerHTML == '')? 1 : String(parseInt(x.children[0].innerHTML) + 1);
      x.children[0].innerHTML =  new_val;
      DBAddLikeMsg(cur_query_id, msgId);
  }
}

// -------------------- end noa: Message History -----------------------------//