function search(){
  const lang=$(".languages").val();
  const clientPromise = stitch.StitchClientFactory.create('porcupineapp-dcxhf');
  clientPromise.then(client => {
    const db = client.service('mongodb', 'mongodb-atlas').db('Quills');
    client.login().then(()=>
      client.executeFunction("search_quills",{name:name,lang:lang})
    ).then((result) =>
      console.log(result)
    ).catch(err => {
      console.error(err);
    });
  });
}

function populate_results(array){
  const results=$("#results");
  array.foreach(function(current){
	results.append(new_result(current));
  })
}

function new_result(obj){
	var html=$("<div>");
	html.append($(<span>"Name: "+obj.name</span>));
	html.append($(<span><br>+"Lang: "+obj.lang</span>));
	html.append($(<span><br> + "Purpose: " +obj.desc</span>));
	html.append($(<span><br> + "Preview: " + obj.preview</span>));
}
