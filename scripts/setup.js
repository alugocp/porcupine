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
$(window).keypress(function(e){
  if(e.which==13){
    console.log($(".search-bar label"));
    $(".search-bar label").trigger("click");
  }
});

function basic_search(){
  const name=$(".search-bar input[type=text]").val();
  localStorage.setItem("pending-query",name);
  window.location.href="search.html";
}
