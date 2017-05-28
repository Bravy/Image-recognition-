$(document).ready(function(){
  $('p').html(" ");
  var app = new Clarifai.App(
    'C_6DUYMXZAYd9fi4gQ3aHXkuw7N6wdT8bXaAZJp8',
    'TZAMA7A2z2Si0PHq3B8Bq-EOIaWF5hfHtF5ZEtEh'
  );

  $('.go').click(function(){
    var text = $('.text').val();
    $('.imgSrc').attr("src", text);
    app.models.predict(Clarifai.GENERAL_MODEL, text ).then(
      function(response) {
        var concepts = response.outputs[0].data.concepts;
       for(concept of concepts){
          console.log(concept.name);
          console.log(concept.value);
          var tag = concept.name;
          var value = concept.value;
          $.post( "https://translation.googleapis.com/language/translate/v2?key=AIzaSyCimyfkm7K3DUi6dJc5pat62WcX9aQbbB0",{
            'q': tag,
            'target': 'pa',
            'source':'en'
          }, function( data ) {
            var punjabiTag = data.data.translations[0].translatedText;
            $('.tag').append(" " +punjabiTag+ " " +value);
          }
          );
        }
        console.log(response);
      },
      function(err) {
        // there was an error
        console.log("Hoya ni bhai :P");
      }
    );
  });
});
