$(".header").ready(function(){
  $.get("header.html",function(result){
    $(".header").html(result);
  },"html");
  $.get("languages.json",function(languages){
    const langs=$(".languages");
    languages.forEach(function(e){
      if($(".languages").is(".any") || e!="-Any-"){
        langs.append($("<option value=\""+e+"\">"+e+"</option>"));
      }
    })
  },"json");
});
$(window).keypress(function(e){
  if($(".search-bar input[type=text]").is(":focus") && e.which==13){
    $(".search-bar label").trigger("click");
    $(".search-bar input[type=text]").focusout();
  }
});

function basic_search(){
  localStorage.setItem("pending-query",$(".search-bar input[type=text]").val());
  window.location.href="search.html";
}
function as_filter(quill){
  var filter={};
  filter.name=quill.name;
  filter.lang=quill.lang;
  filter.purpose=quill.purpose;
  return filter;
}
