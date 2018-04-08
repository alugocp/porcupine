function upload(){
  var obj={};
  obj.name=$("#name").val();
  obj.lang=$(".languages").val();
  obj.purpose=$("#purpose").val();
  const my_obj=obj;
  const clientPromise = stitch.StitchClientFactory.create('porcupineapp-dcxhf');
  clientPromise.then(client => {
    const db = client.service('mongodb', 'mongodb-atlas').db('Quills');
    client.login().then(()=>
      client.executeFunction("add_quill",my_obj)
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
