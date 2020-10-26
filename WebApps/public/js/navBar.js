// -------------------- noa: onclick from menu -----------------------------//
function changeExText(item) {
    var selText = document.getElementById(item).innerText;
    document.getElementById("navbarDropdownEx").innerHTML = selText;
}

function changeQText(item) {
    var selText = document.getElementById(item).innerText;
    document.getElementById("navbarDropdownQ").innerHTML = selText;
}

function changeAskedText(item) {
    var selText = document.getElementById(item).innerText;
    document.getElementById("navbarDropdownAsked").innerHTML = selText;
}

function changeDefaultText(){
    document.getElementById("navbarDropdownEx").innerHTML = 'All Exercises';
    document.getElementById("navbarDropdownQ").innerHTML = 'All Questions';
    document.getElementById("navbarDropdownAsked").innerHTML = 'Asked By All';
}

function exClicked(item) {
  console.log("ex clicked!" + item);
  changeExText(item);
  var num = item.replace('Ex', '');
  cur_ex_filtered = num;
  loadInbox(cur_ex_filtered, cur_q_filtered);
}

function meClicked(item) {
  console.log("Asked By Me clicked!" + item);
  changeAskedText(item);
  me_filter = true;
  loadInbox(cur_ex_filtered, cur_q_filtered);
}

function meNotClicked(item) {
  console.log("Asked By All clicked!" + item);
  changeAskedText(item);
  me_filter = false
  loadInbox(cur_ex_filtered, cur_q_filtered);
}

function qClicked(item) {
  console.log("q clicked!");
  changeQText(item);
  var num = item.replace('Q', '');
  cur_q_filtered = num;
  loadInbox(cur_ex_filtered, cur_q_filtered);
}


function defaultFilters(){
  console.log('defult clicked!');
  me_filter = false;
  cur_ex_filtered = 0;
  cur_q_filtered = 0; 
  console.log(cur_ex_filtered, cur_q_filtered);
  changeDefaultText();
  loadInbox(cur_ex_filtered, cur_q_filtered);
}


function addNewClicked(item){
  // for chen/eldad/simon
  // add the new query to inbox-chat list
    var tohide = ["new_chat_message_id"]; // add
    var toshow = ["newQueryNoa"];
    hideShowId(tohide, toshow);
}

// -------------------- end noa: onclick from menu -----------------------------//


// --------using Noas person format for Future easy use---

var Connected = function(writer_name, img_name, date, ex, question, sub_question, text){
  this.writer_name = writer_name;
  this.img_name = img_name;
  this.date = date;
  this.ex = ex;
  this.question = question;
  this.sub_question = sub_question;
  this.text = text;
}
function loadConnected() {
  var queries = [
  new Connected("Noa Levitzky", "Noa", "May 18", 3, 1, 1, "Can someone please give me a hint?"),
  new Connected("Maayan Sharon", "Maayan", "May 18", 2, 2, "b", "Should I use the definition of the probability distribution of a random variable?"),
  new Connected("Eldad Wang", "Eldad", "May 18", 2, 2, "none", "I uploaded my answer, can someone take a look, see if it's correct?"),
  new Connected("Chen Rasooly", "Chen", "May 18", 1, 7, "a", "What's the image of X?"),
  new Connected("Frida Kahlo", "Frida", "May 17", 2, 5, "c", "Any help?"),
  new Connected("Simon Malaku", "Simon", "May 17", 1, 3, "d", "Someone wants to compare answers?"),
  ];
  getOnlineUsers();
}
function showWhoConnected(query){
  var contact_link =null;
  var img =null;
  var contact_box = document.getElementById("dropdown-content_id");
  query.forEach(element => {
      if(element.writer_name){
        contact_link = document.createElement("a");
        contact_link.setAttribute("href","#");
        contact_link.setAttribute("class","list-group-item");
        img = document.createElement("img");  
        img.setAttribute("src", "assets/avatars/avatar" + element.img_name + ".png");
        contact_link.appendChild(img);
        contact_link.append(element.writer_name);
        contact_box.appendChild(contact_link);
      }
    });
    


}