// // Odznaczanie
$("ul").on("click", "li", function(){
  $(this).toggleClass("completed");
});
//Usuwanie
  $("ul").on("click", "span.trash", function(event){
    $(this).parent().fadeOut(500,function(){
        $(this).remove();
    });
event.stopPropagation();
  })

$("input[id='input']").keypress(function(event){
  if(event.which === 13){
      var todoText = $(this).val();
      $(this).val("");
      //stwórz nowy li i dodaj do ul
      $("ul").append("<li><span class='trash'><i class='fa fa-trash' ></i></span><span class='heart'><i class='fa fa-heart' ></i></span> " + todoText + "</li>")
  }



});
//hide'n seek
$(".fa-plus").click(function(){

$("input[id='input']").fadeToggle();

});

$("ul").on("click", "span.heart", function(event){
  event.stopPropagation();
  var str = $(this).parents('li').text();


  $("form[id='input']").fadeToggle();

  $('#toptitle').text(str);

});

$("ul").one("click", "span.heart", function(){
  $("div[id='leftcontainer']").fadeToggle();
});




$("form").submit(function(e) {
var str = $('#toptitle').text();

    e.preventDefault();
    var date = $("input[type='datetime-local']").val();
    var number = localStorage.getItem("number");
//   alert(number);
//   alert(str);
  $(document).ready(function(){

         $.ajax({
             type: 'GET',
             url: 'index.php',
             data: {ip : str , date : date, number : number},
             success: function(){
               $( "#success" ).fadeIn( 400 ).delay( 3000 ).fadeOut( 400 );

             }
         });

 });
});

$("button[type='button']").click(function(){
  var name = $('#toptitle').text();
  var replacedName = name.split(' ').join('+');
  var date = $("input[type='datetime-local']").val();
  date = date.replace(/\-/g , '');
  date = date.replace(/\:/g , '');

  console.log(date);
var link ='https://www.google.com/calendar/render?action=TEMPLATE&text=' + replacedName + '&dates=' + date +'00Z/' + date +'00Z&details=Dodane+przez+Niezapominajke&location=Sopot,+Polska&sf=true&output=xml';
window.open(
  link,
  '_blank' // <- This is what makes it open in a new window.
);

});
