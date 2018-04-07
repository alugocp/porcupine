function upload(){
  const name=$("#name").val();
  const lang=$(".languages").val();
  const clientPromise = stitch.StitchClientFactory.create('porcupineapp-dcxhf');
  clientPromise.then(client => {
    const db = client.service('mongodb', 'mongodb-atlas').db('Quills');
    client.login().then(()=>
      client.executeFunction("add_quill",lang,{name:name,lang:lang})
    ).then(() =>
      alert("Upload successful!")
    ).catch(err => {
      console.error(err);
    });
  });
}

$(window).ready(function(){
  CodeMirror.fromTextArea(codearea,{
    lineNumbers:true
  });
});
