$(".header").ready(function(){
  $.get("header.html",function(result){
    $(".header").html(result);
  },"html");
  $.get("languages.json",function(languages){
    const langs=$(".languages");
    languages.forEach(function(e){
      langs.append($("<option value=\""+e+"\">"+e+"</option>"));
    })
  },"json");
});

 const name=$(".search-bar input[type=text]").val();
  const lang=$(".languages").val();
  const clientPromise = stitch.StitchClientFactory.create('porcupineapp-dcxhf');
  clientPromise.then(client => {
    const db = client.service('mongodb', 'mongodb-atlas').db('Quills');
    client.login().then(()=>{
	window.location.href="search.html";
      client.executeFunction("search_quills",{name:name}).then((result) => {
        console.log(result)
        populate_results([result]);
      })
    }).catch(err => {
      console.error(err)
    });
  });
