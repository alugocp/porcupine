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

function populate_results(){
  const results=$("#results");

}
function new_result(obj){

}
