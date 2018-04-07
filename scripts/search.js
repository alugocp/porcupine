function search(){
  const name=$(".search-bar input[type=text]").val();
  const lang=$(".languages").val();
  const clientPromise = stitch.StitchClientFactory.create('porcupineapp-dcxhf');
  clientPromise.then(client => {
    const db = client.service('mongodb', 'mongodb-atlas').db('Quills');
    client.login().then(()=>
      client.executeFunction("search_quills",{name:name,lang:lang}).then((result) => {
        console.log(result)
        populate_results([result]);
      })
    ).catch(err => {
      console.error(err)
    });
  });
}

function populate_results(array){
  const results=$("#results");
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
