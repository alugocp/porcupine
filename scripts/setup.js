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
