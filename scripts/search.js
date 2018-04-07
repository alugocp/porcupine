$(window).ready(function(){
  var query=localStorage.getItem("pending-query");
  if(query!=undefined){
    search(query,{});
  }
})

function search(name,obj){
  obj.name=name;
  const query_obj=obj;
  const clientPromise = stitch.StitchClientFactory.create('porcupineapp-dcxhf');
  clientPromise.then(client => {
    const db = client.service('mongodb', 'mongodb-atlas').db('Quills');
    client.login().then(()=>
      client.executeFunction("search_quills",query_obj).then((result) => {
        console.log(result)
        populate_results([result]);
      })
    ).catch(err => {
      console.error(err)
    });
  });
}
function side_search(){
  const name=$(".search-field input[type=text]").val();
  const lang=$(".languages").val();
  search(name,{lang:lang});
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
