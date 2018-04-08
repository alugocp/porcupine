var json_objects;
$(window).ready(function(){
  var query=localStorage.getItem("pending-query");
  delete localStorage["pending-query"];
  search((query=="" || query==null || query==undefined)?{}:{name:query});
});

function search(obj){
  const query_obj=obj;
  const clientPromise = stitch.StitchClientFactory.create('porcupineapp-dcxhf');
  clientPromise.then(client => {
    const db = client.service('mongodb', 'mongodb-atlas').db('Quills');
    client.login().then(()=>{
      client.executeFunction("search_quills",query_obj).then((results) => {
        populate_results(results);
      });
    }).catch(err => {
      console.error(err)
    });
  });
}
function side_search(){
  var obj={};
  var field=$(".search-field input[type=text]").val();
  if(field!=""){
    obj.name=field;
  }
  field=$(".languages").val();
  if(field!="-Any-"){
    obj.lang=field;
  }
  search(obj);
}
function view(index){
  localStorage.setItem("selected-quill",JSON.stringify(json_objects[index]));
  window.location.href="edit.html";
}

function populate_results(array){
  json_objects=array;
  const results=$("#results");
  results.empty();
  if(array.length==0){
    results.append(empty_result());
  }else{
    for(var a=0;a<array.length;a++){
      results.append(new_result(array[a],a));
    }
  }
}

function new_result(obj,index){
	var html=$("<div class=\"row result\">");
  if(index%2==0){html.addClass("alternate");}
  var left=$("<div class=\"col-md-6\">");
	left.append($("<span class=\"topic\">Name:</span> "+obj.name+"<br>"));
	left.append($("<span class=\"topic\">Language:</span> "+obj.lang+"<br>"));
	left.append($("<span class=\"topic\">Purpose:</span> " +obj.purpose+"<br>"));
  left.append($("<span class=\"topic\">Previews:</span> coming soon<br>"));
  left.append($("<a onclick=\"view("+index+")\">View</a>"));
  html.append(left);
  var middle=$("<div class=\"col-md-4\">");
  var voting=$("<span>");
  for(var a=0;a<4;a++){
    voting.append(vote_option(a,index));
  }
  middle.append(voting);
  html.append(middle);
  var right=$("<div class=\"col-md-2 text-right\">");
  right.append($("<img class=\"rating\" src=\"images/"+get_face(obj.score)+".png\"></img><br>"));
  right.append($("<br><span class=\"topic\">"+(obj.ratings | 0)+" ratings</span>"));
  html.append(right);
  return html;
}
function empty_result(){
  var html=$("<div class=\"row result text-center alternate\">");
  html.append("<span class=\"topic\">No results</span><br>");
  html.append("<span>Maybe you should <a href=\"upload.html\">fix that</a></span>");
  return html;
}
function vote_option(face,index){
  var option=$("<img class=\"rating vote-option\" src=\"images/"+get_face(face)+".png\"></img>");
  option.click(function(){
    vote(index,face);
    $(this).parent().hide();
  });
  return option;
}
function get_face(index){
  if(index==undefined){
    return "no";
  }
  var faces=["mad","meh","average","smiley"];
  return faces[Math.round(index)];
}
function vote(index,rating){
  const obj=as_filter(json_objects[index]);
  const clientPromise = stitch.StitchClientFactory.create('porcupineapp-dcxhf');
  clientPromise.then(client => {
    const db = client.service('mongodb', 'mongodb-atlas').db('Quills');
    client.login().then(()=>{
      client.executeFunction("rate_quill",obj,rating).then(() => {
        alert("Thank you for voting");
      });
    }).catch(err => {
      console.error(err)
    });
  });
}
