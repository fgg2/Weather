init();

function getWeather(longi,latti) {
    var mainurl = "https://api.darksky.net/forecast/";
    var code = '0fe876b2f29e459c7d7b163d9be370e1';

    $.ajax({
        url: mainurl + code + "/" + longi + ',' + latti + '?' + 'units=auto' + '&' + 'lang=is',
        type: "GET",
        dataType: 'jsonp',
        cache: true,
        success: function(data, status, error) {
            console.log('success', data);
            createSky(data);
        },
        error: function(data, status, error) {
            console.log('error', data, status, error);
        }
    });
}

function init(){
  getWeather(64.1265, -21.8174);

}

function createSky(data){
  window.container = document.querySelector('.data');
  /*for (var i = 0; i < data.currently.length; i++) {


    var totalUl =  document.createElement('ul');

    var liEl = document.createElement('li');

    liEl.innerHTML = data.currently[i].icon;

    totalUl.appendChild(liEl);

    container.appendChild(totalUl);
  }*/

  skyStatusCurrently = data.currently.icon;

}
