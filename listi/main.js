init();

function getWeather(longi,latti) {
    var mainurl = "https://api.darksky.net/forecast/";
    var code = '0fe876b2f29e459c7d7b163d9be370e1';

    $.ajax({
        url: mainurl + code + "/" + longi + ',' + latti + '?' + 'units=auto' + '&' + 'lang=en',
        type: "GET",
        dataType: 'jsonp',
        cache: true,
        success: function(data, status, error) {
            console.log('success', data);
            $('#container-loading')
            .delay(0).queue(function (next) {
              $(this).fadeOut(200);
              next();
            });
            createTime(data);
        },
        error: function(data, status, error) {
            console.log('error', data, status, error);
            var error = document.getElementById('loading')
            error.innerHTML = error;
        }
    });
}

function init(){
  getWeather(64.1265, -21.8174);
  document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");

  });
}

function createTime(data){
  var daily = data.daily;
  var timedays = [];

  var months = ['Januar','Februar','Mars','April','May','Juni','July','August','September','October','November','December'];
  var days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday' ];

  var wholeListContainer = document.getElementById('whole-list')

  for (var i = 0; i < 8; i++) {
    var container = document.createElement('ul');
    if(i%2 === 0){
      container.setAttribute('class','list-container mod2-color');
    }
    else {
      container.setAttribute('class','list-container');
    }

    var date =  new Date(daily.data[i].time*1000);
    console.log(date);
    timedays[i] = days[date.getDay()] + '.' + date.getDate() +'.'+ months[date.getMonth()];

    var day = document.createElement('li');
    day.innerHTML = timedays[i];
    day.setAttribute('class','day list-item');

    var tempMax = document.createElement('li');
    tempMax.innerHTML = 'maxtemp = ' + daily.data[i].temperatureMax + '°C'
    tempMax.setAttribute('class','degrees list-item');

    var tempMin = document.createElement('li');
    tempMin.innerHTML = 'mintemp = ' + daily.data[i].temperatureMin + '°C';
    tempMin.setAttribute('class','degrees list-item');

    var windbearing = document.createElement('li');
    windbear =  daily.data[i].windBearing ;
    winddir = checkWindDirection(windbear);
    windbearing.innerHTML = 'winddirection = ' + winddir;
    windbearing.setAttribute('class','degrees list-item');

    var summary = document.createElement('li');
    summary.innerHTML = daily.data[i].summary;
    summary.setAttribute('class','degrees list-item summary');


    var windAmountIcon = document.createElement('li');
    windAmountIcon.setAttribute('class','windmill');
    var windContainer = document.createElement('div');
    var stick = document.createElement('div');
    var wind = document.createElement('div');
    var wind1 = document.createElement('div');
    var wind2 = document.createElement('div');
    var wind3 = document.createElement('div');
    var wind4 = document.createElement('div');
    var windText = document.createElement('p');
    windText.setAttribute('class', 'wind-text');
    windText.innerHTML = (daily.data[i].windSpeed) + 'm/s';
    windContainer.setAttribute('class', 'list-item degrees wind-container');
    stick.setAttribute('class','stick');
    wind.setAttribute('class','wind');
    wind1.setAttribute('class','wind1');
    wind2.setAttribute('class','wind2');
    wind3.setAttribute('class','wind3');
    wind4.setAttribute('class','wind4');
    windAmountIcon.appendChild(stick);
    wind.appendChild(wind1);
    wind.appendChild(wind2);
    wind.appendChild(wind3);
    wind.appendChild(wind4);
    windAmountIcon.appendChild(wind);
    windContainer.appendChild(windText)
    windContainer.appendChild(windAmountIcon);
    setWindmillSpeed(daily.data[i].windSpeed, wind);


    var iconListElement = document.createElement('li');
    iconListElement.setAttribute('class','list-item icon degrees');

    if (daily.data[i].icon === 'clear-day') {
      var firstDiv = document.createElement('div');
      var secondDiv = document.createElement('div');
      firstDiv.setAttribute('class', 'sun');
      secondDiv.setAttribute('class', 'rays');
      iconListElement.appendChild(firstDiv);
      iconListElement.appendChild(secondDiv);
    }
    if (daily.data[i].icon === 'clear-night') {
      var firstDiv = document.createElement('div');
      var secondDiv = document.createElement('div');
      firstDiv.setAttribute('class', 'moon');
      secondDiv.setAttribute('class', 'rays');
      iconListElement.appendChild(firstDiv);
      iconListElement.appendChild(secondDiv);
    }
    if (daily.data[i].icon === 'cloudy') {
      var firstDiv = document.createElement('div');
      var secondDiv = document.createElement('div');
      firstDiv.setAttribute('class', 'cloud');
      secondDiv.setAttribute('class', 'cloud');
      iconListElement.appendChild(firstDiv);
      iconListElement.appendChild(secondDiv);
    }

    if (daily.data[i].icon === 'fog') {
      var firstDiv = document.createElement('div');
      var secondDiv = document.createElement('div');
      firstDiv.setAttribute('class', 'fog');
      secondDiv.setAttribute('class', 'fog');
      iconListElement.appendChild(firstDiv);
      iconListElement.appendChild(secondDiv);
    }
    if (daily.data[i].icon === 'partly-cloudy-day') {
      var firstDiv = document.createElement('div');
      var secondDiv = document.createElement('div');
      var thirdDiv = document.createElement('div')
      firstDiv.setAttribute('class', 'partly-cloud');
      secondDiv.setAttribute('class', 'sun');
      thirdDiv.setAttribute('class', 'rays');
      secondDiv.appendChild(thirdDiv);
      iconListElement.appendChild(firstDiv);
      iconListElement.appendChild(secondDiv);
    }
    if (daily.data[i].icon === 'partly-cloudy-night') {
      var firstDiv = document.createElement('div');
      var secondDiv = document.createElement('div');
      var thirdDiv = document.createElement('div')
      firstDiv.setAttribute('class', 'cloud');
      secondDiv.setAttribute('class', 'cloud');
      thirdDiv.setAttribute('class', 'moon');
      iconListElement.appendChild(firstDiv);
      iconListElement.appendChild(secondDiv);
      iconListElement.appendChild(thirdDiv);
    }
    if (daily.data[i].icon === 'rain') {
      var firstDiv = document.createElement('div');
      var secondDiv = document.createElement('div');
      var thirdDiv = document.createElement('div')
      firstDiv.setAttribute('class', 'cloud');
      secondDiv.setAttribute('class', 'rain');
      iconListElement.appendChild(firstDiv);
      iconListElement.appendChild(secondDiv);
    }
    if (daily.data[i].icon === 'sleet') {
      var firstDiv = document.createElement('div');
      var secondDiv = document.createElement('div');
      var thirdDiv = document.createElement('div')
      firstDiv.setAttribute('class', 'cloud');
      secondDiv.setAttribute('class', 'snow');
      thirdDiv.setAttribute('class', 'sleet-rain');
      fourthDiv.setAttribute('class', 'flake');
      fifthDiv.setAttribute('class', 'flake');
      iconListElement.appendChild(firstDiv);
      iconListElement.appendChild(secondDiv);
      iconListElement.appendChild(thirdDiv);
      iconListElement.appendChild(fourthDiv);
      iconListElement.appendChild(fifthDiv);
    }
    if (daily.data[i].icon === 'wind') {
      var firstDiv = document.createElement('div');
      var secondDiv = document.createElement('div');
      firstDiv.setAttribute('class', 'sky-wind');
      secondDiv.setAttribute('class', 'sky-wind');
      iconListElement.appendChild(firstDiv);
      iconListElement.appendChild(secondDiv);
    }
    if (daily.data[i].icon === 'snow') {
      var firstDiv = document.createElement('div');
      var thirdDiv = document.createElement('div');
      var fourthDiv = document.createElement('div');
      var fifthDiv = document.createElement('div');
      firstDiv.setAttribute('class', 'snow-cloud');
      secondDiv.setAttribute('class', 'snow')
      thirdDiv.setAttribute('class', 'flake');
      fourthDiv.setAttribute('class', 'flake');
      secondDiv.appendChild(thirdDiv);
      secondDiv.appendChild(fourthDiv);
      iconListElement.appendChild(firstDiv);
      iconListElement.appendChild(secondDiv);
    }
    var thermoLi = document.createElement('li');
    thermoLi.setAttribute('class', 'list-item temp-flex');
    //create min thermoLi
    var thermoLiMin = document.createElement('li');
    thermoLiMin.setAttribute('class', 'list-item temp-flex');
    var createFillName = ('thermometer-fill' + i);
    var createFillNameMin = ('thermometer-fill-min' + i);

    var createBottomName = ('thermometer-bottom' + i);
    var thermoContainer = document.createElement('div');
    var createBottomNameMin = ('thermometer-bottom-min' + i);
    thermoContainer.setAttribute('class','thermo-container');
    var thermoTop = document.createElement('div');
    thermoTop.setAttribute('class', 'thermometer-top');
    var thermoTopMin = document.createElement('div');
    thermoTopMin.setAttribute('class', 'thermometer-top');
    var thermoFill = document.createElement('div');
    thermoFill.setAttribute('class', createFillName);
    thermoFill.setAttribute('id', 'thermoFillId')

    var thermoFillMin = document.createElement('div');
    thermoFillMin.setAttribute('class', createFillNameMin);
    thermoFillMin.setAttribute('id', 'thermoFillMinId')



    var fillPercentage = Math.abs(daily.data[i].temperatureMax) / 100;
    var fillHeight = fillPercentage * 1000;

    // create min values
    var fillPercentageMin = Math.abs(daily.data[i].temperatureMin) / 100;
    var fillHeightMin = fillPercentageMin * 1000;
    var thermoBottom = document.createElement('div');
    var thermoBottomMin = document.createElement('div');
    thermoBottom.setAttribute('class', createBottomName);
    thermoBottom.setAttribute('id', createBottomName);
    thermoBottomMin.setAttribute('class', createBottomNameMin);
    thermoBottomMin.setAttribute('id', createBottomNameMin);
    var span = document.createElement('span');
    var spanMin = document.createElement('span');
    span.setAttribute('class', 'bottom-text')
    spanMin.setAttribute('class', 'bottom-text-min')
    var thermoColorMax;
    var thermoColorMin;
    if( daily.data[i].temperatureMax <= -1 ){
      thermoColorMax = 'royalblue';
    }
    else{
      thermoColorMax = 'tomato';
    }
    if( daily.data[i].temperatureMin <= -1 ){
      thermoColorMin = 'royalblue';
    }
    else{
      thermoColorMin = 'tomato';
    }
    var thermoContainerMin = document.createElement('div');
    thermoContainerMin.setAttribute('class','thermo-container');


    var tempText = document.createElement('p');
    tempText.setAttribute('class','temp-text');
    tempText.innerHTML = 'Max temperature';
    var tempTextMin = document.createElement('p');
    tempTextMin.setAttribute('class','temp-text');
    tempTextMin.innerHTML = 'Min temperature';
    thermoContainer.type = 'text/css';

    thermoContainer.innerHTML = '<style> .'+createBottomName + '{color: white;  width: 63px;\
    height: 50px; border-radius: 100%; border: 5px solid #d1d1d1; z-index: -1; margin: -7px auto ;text-align: center; display: block; background: '+ thermoColorMax +';\
    padding-top: 15px; font-size: 24px;}'+'.' + createFillName + '{ height: '+ (fillHeight) +
    'px;width: 30px; min-height: 12px; background: '+ thermoColorMax +'; !important;\
    position: absolute; bottom: -5px; left: -5px;\
    border-top-left-radius: 25px; border-top-right-radius: 25px; transition: all .2s; }'+ createBottomName+' createBottomName{background: '+ thermoColorMax +';}</style>';
    document.getElementsByTagName('div')[0].appendChild(thermoBottom);
    document.getElementsByTagName('div')[0].appendChild(thermoFill);
    document.getElementById(createBottomName).className = createBottomName;

    //create min container


    thermoContainerMin.type = 'text/css';
    thermoContainerMin.innerHTML = '<style> .'+createBottomNameMin + '{color: white;  width: 63px;\
    height: 50px; border-radius: 100%; border: 5px solid #d1d1d1; z-index: -1; margin: -7px auto; text-align: center; display: block; background: '+ thermoColorMin +';\
    padding-top: 15px; font-size: 24px;}'+'.' + createFillNameMin + '{ height: '+ (fillHeightMin) +
    'px;width: 30px; min-height: 12px; background: '+ thermoColorMin +' !important;\
    position: absolute; bottom: -5px; left: -5px;\
    border-top-left-radius: 25px; border-top-right-radius: 25px; transition: all .2s; }'+ createBottomNameMin+'{background: '+ thermoColorMin +';}</style>';
    document.getElementsByTagName('div')[0].appendChild(thermoBottomMin);
    //document.getElementsByTagName('div')[0].appendChild(thermoFillMin);
    document.getElementById(createBottomNameMin).className = createBottomNameMin;
    console.log(thermoContainer);
    console.log(thermoContainerMin);

    span.innerHTML = (Math.round(daily.data[i].temperatureMax) +'°');
    spanMin.innerHTML = (Math.round(daily.data[i].temperatureMin) +'°');


    var minAppendingChilds = [thermoFillMin, spanMin, tempTextMin, thermoTopMin, thermoBottomMin, thermoContainerMin];
    var minAppendingParents = [thermoTopMin, thermoBottomMin, thermoLiMin, thermoContainerMin, thermoContainerMin, thermoLiMin];
    var appendingChilds = [thermoFill, span, tempText, thermoTop, thermoBottom, thermoContainer];
    var appendingParents = [thermoTop, thermoBottom, thermoLi, thermoContainer, thermoContainer, thermoLi];
    for (var j = 0; j < minAppendingParents.length; j++) {
        minAppendingParents[j].appendChild(minAppendingChilds[j]);
        appendingParents[j].appendChild(appendingChilds[j]);
    }

    thermoTop.appendChild(thermoFill);
    thermoTopMin.appendChild(thermoFillMin);
    thermoBottom.appendChild(span);
    thermoBottomMin.appendChild(spanMin);
    thermoLi.appendChild(tempText);
    thermoLiMin.appendChild(tempTextMin);
    thermoContainer.appendChild(thermoTop);
    thermoContainer.appendChild(thermoBottom);
    thermoContainerMin.appendChild(thermoTopMin);
    thermoContainerMin.appendChild(thermoBottomMin);
    thermoLi.appendChild(thermoContainer);
    thermoLiMin.appendChild(thermoContainerMin);


    /*<div class="compassButton">
      <div class="compass"></div>
      <div class="msg">Over here !</div>
    </div>*/

    var compassContainer = document.createElement('li');
    compassContainer.setAttribute('class','degrees list-item');
    var compass = document.createElement('div');
    compass.setAttribute('class', 'compass');
    var compassMsg = document.createElement('div');
    compassMsg.setAttribute('class' , 'compass-msg');

    var compassId = ('compass' + i);
    compass.setAttribute('id' , compassId);

    //compassMsg.innerHTML = checkWindDirection(daily.data[i].windBearing, compassId);

    //do stuff
    //daily.data[i].windBearing)


    compassContainer.appendChild(compass);
    compassContainer.appendChild(compassMsg);




    container.appendChild(day);
    container.appendChild(thermoLi);
    container.appendChild(thermoLiMin);
    container.appendChild(windContainer);
    container.appendChild(compassContainer);
    container.appendChild(summary);
    container.appendChild(iconListElement);

    wholeListContainer.appendChild(container);
    compassMsg.innerHTML = checkWindDirection(daily.data[i].windBearing, compassId);

  }


}

function checkWindDirection(degrees, id){
  var val = Math.floor((degrees / 22.5) + 0.5);
  var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

  console.log('#'+ id);

    $('#'+ id)
        .css('-webkit-transform', 'rotate('+(degrees+45)+'deg)')
        .css('-moz-transform', 'rotate('+(degrees+45)+'deg)')
        .css('-ms-transform', 'rotate('+(degrees+45)+'deg)')
        .css('-o-transform', 'rotate('+(degrees+45)+'deg)')
        .css('transform', 'rotate('+(degrees+45)+'deg)');

    return arr[(val % 16)];

}

function setWindmillSpeed(speed, wind){
  if(speed< 0.5  ){
    wind.setAttribute('class','sec1');
  }
  if(speed< 1.0  ){
    wind.setAttribute('class','sec1');
  }
  if(speed< 2.0  ){
    wind.setAttribute('class','sec2');
  }
  else if(speed< 3.0){
    wind.setAttribute('class','sec3');
  }
  else if(speed< 4.0 ){
    wind.setAttribute('class','sec4');
  }
  else if(speed< 5.0 ){
    wind.setAttribute('class','sec5');
  }
  else if(speed< 6.0 ){
    wind.setAttribute('class','sec6');
  }
  else if(speed< 8.0 ){
    wind.setAttribute('class','sec8');
  }
  else if(speed< 10.0 ){
    wind.setAttribute('class','sec10');
  }
  else if(speed< 12.0 ){
    wind.setAttribute('class','sec12');
  }
  else if(speed< 14.0 ){
    wind.setAttribute('class','sec14');
  }
  else if(speed< 16.0 ){
    wind.setAttribute('class','sec16');
  }
  else if(speed< 20.0 ){
    wind.setAttribute('class','sec20');
  }
  else if(speed< 25.0 ){
    wind.setAttribute('class','sec25');
  }
  else if(speed< 30.0 ){
    wind.setAttribute('class','sec30');
  }
}
