$(".header").ready(function(){
  $.get("header.html",function(result){
    $(".header").html(result);
    //console.log(result);
  },"html");
});
