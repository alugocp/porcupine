var json_objects;
$(window).ready(function(){
  var query=localStorage.getItem("pending-query");
  if(query!=null && query!=undefined){
    delete localStorage["pending-query"];
    search({name:query});
  }
});

function search(obj){
  const query_obj=obj;
  const clientPromise = stitch.StitchClientFactory.create('porcupineapp-dcxhf');
  clientPromise.then(client => {
    const db = client.service('mongodb', 'mongodb-atlas').db('Quills');
    client.login().then(()=>{
      console.log(query_obj);
      client.executeFunction("search_quills",query_obj).then((results) => {
        console.log(results);
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
	html.append($("<span class=\"topic\">Name:</span> "+obj.name+"<br>"));
	html.append($("<span class=\"topic\">Language:</span> "+obj.lang+"<br>"));
	html.append($("<span class=\"topic\">Purpose:</span> " +obj.purpose+"<br>"));
  html.append($("<span class=\"topic\">Previews:</span> coming soon<br>"));
  html.append($("<a onclick=\"view("+index+")\">View</a>"));
  return html;
}
function empty_result(){
  var html=$("<div class=\"row result text-center alternate\">");
  html.append("<span class=\"topic\">No results</span><br>");
  html.append("<span>Maybe you should <a href=\"upload.html\">fix that</a></span>");
  return html;
}
