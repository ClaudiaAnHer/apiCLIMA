$(document).ready(function() {

  var url = 'https://api.darksky.net/forecast/';
  var key = 'e55fa02d7a2305ef9f77de0c4702884e'
  var coords = {
    arica: '-18.4723921,-70.3241673',
    stgo: '-33.4724228,-70.7699155',
    conc: '-36.8261412,-73.1030855',
    pmontt: '-41.468917,-72.9411364',
  }

  var queryParams = ['exclude=[minutely,hourly,daily,alerts,flags', 'lang=es' , 'units=auto']

  var image = {
    'clear-day':'http://questgarden.com/136/08/3/120312033102/images/Sunny-icon.png',
    'rain':'https://icons.wxug.com/i/c/v4/rain.svg',
    'cloudy':'https://cdn.pixabay.com/photo/2013/04/01/09/22/clouds-98536_960_720.png',
    'partly-cloudy-day':'https://bloximages.newyork1.vip.townnews.com/northwestgeorgianews.com/content/tncms/assets/v3/editorial/a/f8/af801c39-22a9-557a-9a9e-3939199c1217/526abf9266665.image.jpg'
  }

      var map;
      var coords = {
        'arica' : {lat:-18.4723921,lng:-70.3241673},
        'stgo' : {lat:-33.4724228,lng:-70.7699155},
        'conc' : {lat:-36.8261412,lng:-73.1030855},
        'pmontt' : {lat:-41.468917,lng:-72.9411364},

      }

      function initMap() {
        
        map = new google.maps.Map(document.getElementById('map'), {
          center: coords['arica'],
          zoom: 8
        });

        var marker = new google.maps.Marker({
              position: coords['arica'],
              map: map,
              title: 'Hello World!'
        });
      }


      $('#city').on('change',function(event){

            var _coords = coords[$(this).val()] 
            
            map.setCenter(_coords)
            
            var marker = new google.maps.Marker({
                  position: _coords,
                  map: map,
                  title: 'Holi'
            });
      })


  $('#city').on('change', function(){
   $.ajax ({
      url: url + key + '/' +  coords [$(this).val()] + '?' + queryParams[0] + '&' + queryParams[1] + '&' + queryParams[2],
      method: 'GET'
    }).then(function(data) {
      console.log(data);
      $('#resumen').text(parseInt(data.currently.temperature) + '°' + data.currently.summary);
      $('#sensacion').text(data.currently.apparentTemperature + '°');
      $('#probabilidad').text(data.currently.precipProbability * 100 + '%');
      $('#humedad').text(data.currently.humidity * 100 + '%');
      $('.img-responsive').attr('src', image[data.currently.icon]);
    });
  });
});