$(window).ready(function(){
  var query=localStorage.getItem("pending-query");
  if(query!=null && query!=undefined){
    delete localStorage["pending-query"];
    search({name:query});
  }
})

function search(obj){
  const query_obj=obj;
  const clientPromise = stitch.StitchClientFactory.create('porcupineapp-dcxhf');
  clientPromise.then(client => {
    const db = client.service('mongodb', 'mongodb-atlas').db('Quills');
    client.login().then(()=>{
      console.log(query_obj);
      client.executeFunction("search_quills",query_obj).then((results) => {
        console.log(results)
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

function populate_results(array){
  const results=$("#results");
  results.empty();
  array.forEach(function(current){
	   results.append(new_result(current));
  });
}

function new_result(obj){
	var html=$("<div>");
	html.append($("<span>Name: "+obj.name+"</span><br>"));
	html.append($("<span>Lang: "+obj.lang+"</span><br>"));
	html.append($("<span>Purpose: " +obj.desc+"</span><br>"));
	html.append($("<span>Preview: " + obj.preview+"</span>"));
  return html;
}
