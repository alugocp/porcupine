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

function basic_search(){
  const name=$(".search-bar input[type=text]").val();
  localStorage.setItem("pending-query",name);
  window.location.href="search.html";
}
