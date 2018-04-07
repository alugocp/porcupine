function upload(){
  const name=$("#name").val();
  const lang=$("#lang").val();
  const clientPromise = stitch.StitchClientFactory.create('porcupineapp-dcxhf');
  clientPromise.then(client => {
    const db = client.service('mongodb', 'mongodb-atlas').db('Quills');
    client.login().then(()=>
      client.executeFunction("add_quill",{name:name,lang:lang})
    ).then(() =>
      alert("Upload successful!")
    ).catch(err => {
      console.error(err);
    });
  });
}

$(window).ready(function(){
  $.get("languages.json",function(languages){
    const lang=$("#lang");
    languages.forEach(function(e){
      lang.append($("<option value=\""+e+"\">"+e+"</option>"));
    })
  },"json");
});
