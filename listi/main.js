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
            createTime(data);
        },
        error: function(data, status, error) {
            console.log('error', data, status, error);
        }
    });
}

function init(){
  getWeather(64.1265, -21.8174);

}

function createTime(data){
  var daily = data.daily;
  var timedays = [];
  var months = ['Januar','Februar','Mars','April','May','Juni','July','August','September','October','November','December'];
  var days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday' ];
  for (var i = 0; i < 8; i++) {
    var container = document.createElement('ul');
    container.setAttribute('class','list-container');

    var date =  new Date(daily.data[i].time*1000);
    timedays[i] = days[date.getDay()] + ' ' + date.getDate() +'.'+ months[date.getMonth()];

    var day = document.createElement('li');
    day.innerHTML = timedays[i];
    day.setAttribute('class','day list-item');

    var tempMax = document.createElement('li');
    tempMax.innerHTML = 'maxtemp = ' + daily.data[i].temperatureMax + '°C'
    tempMax.setAttribute('class','degrees list-item');

    var tempMin = document.createElement('li');
    tempMin.innerHTML = 'mintemp = ' + daily.data[i].temperatureMin + '°C';
    tempMin.setAttribute('class','degrees list-item');

    container.appendChild(day);
    container.appendChild(tempMax);
    container.appendChild(tempMin);

    document.body.appendChild(container);

  }


}
