var original;
$(window).ready(function(){
  CodeMirror.fromTextArea(codearea,{
    lineNumbers:true
  });
  original=JSON.parse(localStorage.getItem("selected-quill"));
  $("#name").val(original.name);
  $(".languages").val(original.lang);
  $("#purpose").val(original.purpose);
});

function save(){
  var obj=as_filter(original);
  obj.name=$("#name").val();
  obj.purpose=$("#purpose").val();
  obj.lang=$(".languages").val();
  const orig=as_filter(original);
  const clientPromise = stitch.StitchClientFactory.create('porcupineapp-dcxhf');
  clientPromise.then(client => {
    const db = client.service('mongodb', 'mongodb-atlas').db('Quills');
    client.login().then(()=>
      client.executeFunction("edit_quill",orig,obj)
    ).then(() => {
      alert("Save successful!");
      window.location.href="search.html";
    }
    ).catch(err => {
      console.error(err);
    });
  });
}
function delete_quill(){
  const obj=as_filter(original);
  console.log(obj);
  const clientPromise = stitch.StitchClientFactory.create('porcupineapp-dcxhf');
  clientPromise.then(client => {
    const db = client.service('mongodb', 'mongodb-atlas').db('Quills');
    client.login().then(()=>
      client.executeFunction("delete_quill",obj)
    ).then(() => {
      alert("Deletion successful!");
      window.location.href="search.html";
    }).catch(err => {
      console.error(err);
    });
  });
}
