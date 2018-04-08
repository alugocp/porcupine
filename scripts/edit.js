var original;
$(window).ready(function(){
  CodeMirror.fromTextArea(codearea,{
    lineNumbers:true
  });
  original=JSON.parse(localStorage.getItem("selected-quill"));
  delete localStorage["selected-quill"];
  $("#name").val(original.name);
  $(".languages").val(original.lang);
  $("#purpose").val(original.purpose);
});

function save(){
  var obj=JSON.parse(JSON.stringify(original));
  obj.name=$("#name").val();
  obj.purpose=$("#purpose").val();
  obj.lang=$(".languages").val();
  delete original["_id"];
  delete obj["_id"];
  const diff=obj;
  const orig=original;
  const clientPromise = stitch.StitchClientFactory.create('porcupineapp-dcxhf');
  clientPromise.then(client => {
    const db = client.service('mongodb', 'mongodb-atlas').db('Quills');
    client.login().then(()=>
      client.executeFunction("edit_quill",orig,diff)
    ).then(() =>
      alert("Save successful!")
    ).catch(err => {
      console.error(err);
    });
  });
}
function delete_quill(){
  delete original["_id"];
  const obj=original;
  const clientPromise = stitch.StitchClientFactory.create('porcupineapp-dcxhf');
  clientPromise.then(client => {
    const db = client.service('mongodb', 'mongodb-atlas').db('Quills');
    client.login().then(()=>
      client.executeFunction("delete_quill",obj)
    ).then(() =>
      alert("Deletion successful!")
    ).catch(err => {
      console.error(err);
    });
  });
}
