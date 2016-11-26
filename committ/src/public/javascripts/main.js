
function getWeather(longi, latti) {
  const mainurl = 'https://api.darksky.net/forecast/';
  const code = '0fe876b2f29e459c7d7b163d9be370e1';

  $.ajax({
    url: 'http://localhost:3000/data',
    type: 'GET',
    dataType: 'json',
    cache: true,
    success(data, status, error) {
      console.log('success', data);
      $('#container-loading')
            .delay(0).queue(function (next) {
              $(this).fadeOut(200);
              next();
            });
      createWeek(data);
      createDay(data);
      waitForHourPress(data);
      setAddress();
    },
    error(data, status, error) {
      console.log('error', data, status, error);
      var error = document.getElementById('loading');
      error.innerHTML = error;
    },
  });
}

function init() {
  getWeather(64.1265, -21.8174);

  document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    /*$("#top5-list").click(function() {
      $('#top5-list').toggleClass('top5-display')
    });*/
    let displayCounter = 1
    $("#top5-container").click(function() {
      displayCounter++;
      console.log(displayCounter);
      if (displayCounter % 2){
        console.log('remove');
        $('#top5-list').removeClass('top5-display')
        $('#top5-list').addClass('top5-no-display')
      }
      else{
        console.log('show');
        $('#top5-list').removeClass('top5-no-display')
        $('#top5-list').addClass('top5-display')

      }

    });
    $("#current-container").click(function() {
      const thisInput = document.getElementById('inner-current-loc');
      console.log(thisInput.innerHTML);
      $("#pac-input").val(thisInput.innerHTML)
      $("#address").val(thisInput.innerHTML);
      document.getElementById("submit").click();
    });
    $(".top5-element").click(function() {
      const thisInput = this.innerHTML;
      console.log(this.innerHTML);
      $("#pac-input").val(thisInput.substring(2));
      $("#address").val(thisInput.substring(2));
      document.getElementById("submit").click();
    });

    if(document.getElementById('show').innerHTML == 0){
      console.log('hallo');
    }
    else {
      $('#weekSection').removeClass('section-display')
      $('#daySection').removeClass('section-display')
    }

  });
}
init();

function waitForHourPress(data) {
  createDayIcons(0, data)
  $("#hour-list").change(function() {
    var id = $(this).children(":selected").attr("id");
    var selectedHour = id.match(/\d+/)[0]
    createDayIcons(selectedHour, data);
  });
}

function createDayIcons(hour, data) {
  console.log(hour);
  const hourly = data.hourly;
  const iconContainer = document.getElementById('icon-container');
  const iconListElement = appendIconChilds(hourly.data[hour].icon);
  iconListElement.setAttribute('class', 'hourly-weather-icon')
  const weatherIconContainer = document.createElement('li');
  weatherIconContainer.appendChild(iconListElement);
  weatherIconContainer.setAttribute('class', 'grid-item');
  const tmpContainer = createHourlyTempIcon(hourly.data[hour].apparentTemperature, false)
  tmpContainer.setAttribute('class','grid-item')
  const apparentTempContainer = createHourlyTempIcon(hourly.data[hour].apparentTemperature, true);
  apparentTempContainer.setAttribute('class', 'grid-item');
  const windContainer = createWindmill(Math.round(hourly.data[hour].windSpeed), true);
  const windHeader = document.createElement('div');
  windHeader.setAttribute('class', 'card-header');
  windHeader.innerHTML = 'Wind speed';
  windContainer.prepend(windHeader);
  windContainer.setAttribute('class', 'grid-item hourly-wind-container');
  const percContainer = createPercip(hourly.data[hour].precipProbability);
  percContainer.setAttribute('class', 'grid-item');

  const windBearing = document.createElement('li');

  const winddir = checkWindDirection(hourly.data[hour].windBearing);
  const windText = document.createElement('div')
  windBearing.innerHTML = `winddirection = ${winddir}`;
  windBearing.setAttribute('class', 'degrees list-item');

  const compassContainer = document.createElement('li');
  compassContainer.setAttribute('class', 'degrees list-item');
  const compass = document.createElement('div');
  compass.setAttribute('class', 'hourly-compass');
  const compassMsg = document.createElement('div');
  compassMsg.setAttribute('class', 'hourly-compass-msg');
  windText.innerHTML = 'Wind direction'
  windText.setAttribute('class','card-header');
  compassContainer.appendChild(windText);

  compass.setAttribute('id', 'compasshourly');

  compassContainer.setAttribute('class', 'grid-item');
  compassMsg.innerHTML = checkWindDirection(hourly.data[hour].windBearing, 'compasshourly');
  compassContainer.appendChild(compass);
  compassContainer.appendChild(compassMsg);
  compass.style.transform ='rotate('+ (hourly.data[hour].windBearing + 225)+'deg)'

  while (iconContainer.firstChild) {
    iconContainer.removeChild(iconContainer.firstChild);
  }
  iconContainer.appendChild(weatherIconContainer);
  iconContainer.appendChild(tmpContainer);
  iconContainer.appendChild(apparentTempContainer);
  iconContainer.appendChild(windContainer);
  iconContainer.appendChild(compassContainer);
  iconContainer.appendChild(percContainer);
}
function createHourlyTempIcon(data, apparentOrNot) {
  const thermoLi = document.createElement('div');
  thermoLi.setAttribute('class', 'temp-flex');
  const thermoContainer = document.createElement('div');

  thermoContainer.setAttribute('class', 'hour-temp-container');
  const thermoTop = document.createElement('div');
  thermoTop.setAttribute('class', 'thermometer-top');
  const thermoFill = document.createElement('div');
  thermoFill.setAttribute('class', 'thermometer-fill');
  const fillPercentage = Math.abs(data / 100);
  const fillHeight = fillPercentage * 1000;
  const thermoBottom = document.createElement('div');
  thermoBottom.setAttribute('class', 'thermometer-bottom');
  const thermoColor = tempColor(Math.round(data));
  thermoFill.style.height = `${fillHeight}px`;
  thermoFill.style.background = `${thermoColor}`;
  thermoBottom.style.background = `${thermoColor}`;

  $('.thermometer-bottom').css('background', thermoColor);

  $('.thermometer-fill').css('height', '100px');


  const span = document.createElement('span');
  span.setAttribute('class', 'bottom-text');

  const tempText = document.createElement('p');
  tempText.setAttribute('class', 'card-header');
  apparentOrNot ? tempText.innerHTML = 'Feels Like' : tempText.innerHTML = 'Temperature';

  span.innerHTML = (`${Math.round(data)}°`);

  thermoTop.appendChild(thermoFill);
  thermoBottom.appendChild(span);
  thermoLi.appendChild(tempText);
  thermoContainer.appendChild(thermoTop);
  thermoContainer.appendChild(thermoBottom);
  thermoLi.appendChild(thermoContainer);
  return thermoLi;
}
function createPercip(data) {
  var percContainer = document.createElement('li');
  var percTopText = document.createElement('div');
  percTopText.innerHTML = "Precipitation probability"
  var percPercent = document.createElement('div');
  percTopText.setAttribute('class', 'card-header')
  percPercent.setAttribute('class', 'hourly-percentage')
  percPercent.innerHTML = Math.round(data * 100) + '%';
  percContainer.appendChild(percTopText);
  percContainer.appendChild(percPercent);
  return percContainer;

}

function createHumid(data) {
  console.log(data);
  var humidContainer = document.createElement('li');
  var humidTopText = document.createElement('div');
  humidTopText.innerHTML = "Humididy"
  var humidPercent = document.createElement('div');
  humidTopText.setAttribute('class', 'card-header')
  humidPercent.setAttribute('class', 'hourly-percentage')
  humidPercent.innerHTML = Math.round(data * 100) + '%';
  humidContainer.appendChild(humidTopText);
  humidContainer.appendChild(humidPercent);
  return humidContainer;

}

function createDay(data) {
  const hourly = data.hourly;
  const hourList = document.getElementById('hour-list');
  for (i = 0; i < 24; i++) {
    const todayDate = new Date(hourly.data[i].time * 1000);
    const hour = todayDate.getHours();
    var hourListItem = document.createElement('div');
    const createHourId = `hour${i}`;
    //var hourListItem = document.getElementById(`hour${i}`);
    //hourListItem.innerHTML = hour + ':00';
    //console.log(hourListItem.innerHTML)
    document.getElementById('hour-list').options[i].text = hour +':00'
    console.log(document.getElementById('hour-list').options[i].value)
    hourList.appendChild(hourListItem);
  }
  $('select').niceSelect();
}
function createWindmill(data, hourWindOrNot) {
  const windContainer = document.createElement('li');
  const windAmountIcon = document.createElement('li');
  hourWindOrNot ? windAmountIcon.setAttribute('class', 'hourly-windmill') : windAmountIcon.setAttribute('class', 'windmill');
  const stick = document.createElement('div');
  const wind = document.createElement('div');
  const wind1 = document.createElement('div');
  const wind2 = document.createElement('div');
  const wind3 = document.createElement('div');
  const wind4 = document.createElement('div');
  const windText = document.createElement('p');
  hourWindOrNot ? windText.setAttribute('class', 'hourly-wind-text') : windText.setAttribute('class', 'wind-mill-text');

  windText.innerHTML = `${data}m/s`;
  windContainer.setAttribute('class', 'list-item degrees wind-container');
  stick.setAttribute('class', 'stick');
  wind.setAttribute('class', 'wind');
  wind1.setAttribute('class', 'wind1');
  wind2.setAttribute('class', 'wind2');
  wind3.setAttribute('class', 'wind3');
  wind4.setAttribute('class', 'wind4');
  windAmountIcon.appendChild(stick);
  wind.appendChild(wind1);
  wind.appendChild(wind2);
  wind.appendChild(wind3);
  wind.appendChild(wind4);
  windAmountIcon.appendChild(wind);
  windContainer.appendChild(windText);
  windContainer.appendChild(windAmountIcon);
  setWindmillSpeed(data, wind);
  return windContainer;


}

function createWeek(data) {
  const daily = data.daily;
  const timedays = [];

  const months = ['Januar', 'Februar', 'Mars', 'April', 'May', 'Juni', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const wholeListContainer = document.getElementById('whole-list');

  for (let i = 0; i < 8; i++) {
    const container = document.createElement('ul');
    if (i % 2 === 0) {
      container.setAttribute('class', 'list-container mod2-color');
    } else {
      container.setAttribute('class', 'list-container');
    }

    const date = new Date(daily.data[i].time * 1000);
    timedays[i] = `${days[date.getDay()]}.${date.getDate()}.${months[date.getMonth()]}`;

    const day = document.createElement('li');
    day.innerHTML = timedays[i];
    day.setAttribute('class', 'day list-item');

    const tempMax = document.createElement('li');
    tempMax.innerHTML = `maxtemp = ${daily.data[i].temperatureMax}°C`;
    tempMax.setAttribute('class', 'degrees list-item');

    const tempMin = document.createElement('li');
    tempMin.innerHTML = `mintemp = ${daily.data[i].temperatureMin}°C`;
    tempMin.setAttribute('class', 'degrees list-item');

    const windBearing = document.createElement('li');
    windbear = daily.data[i].windBearing;
    winddir = checkWindDirection(windbear);
    const windText = document.createElement('div')
    windBearing.innerHTML = `winddirection = ${winddir}`;
    windBearing.setAttribute('class', 'degrees list-item');


    const summary = document.createElement('li');
    summary.innerHTML = daily.data[i].summary;
    summary.setAttribute('class', 'list-item summary');
    day.appendChild(summary)



    const windContainer = createWindmill(Math.round(daily.data[i].windSpeed));
    const iconListElement = appendIconChilds(daily.data[i].icon);

    const thermoLi = document.createElement('li');
    thermoLi.setAttribute('class', 'list-item temp-flex');
    // create min thermoLi
    const thermoLiMin = document.createElement('li');
    thermoLiMin.setAttribute('class', 'list-item temp-flex');
    const createFillName = (`thermometer-fill${i}`);
    const createFillNameMin = (`thermometer-fill-min${i}`);

    const createBottomName = (`thermometer-bottom${i}`);
    const thermoContainer = document.createElement('div');
    const createBottomNameMin = (`thermometer-bottom-min${i}`);
    thermoContainer.setAttribute('class', 'thermo-container');
    const thermoTop = document.createElement('div');
    thermoTop.setAttribute('class', 'thermometer-top');
    const thermoTopMin = document.createElement('div');
    thermoTopMin.setAttribute('class', 'thermometer-top');
    const thermoFill = document.createElement('div');
    thermoFill.setAttribute('class', createFillName);
    thermoFill.setAttribute('id', 'thermoFillId');

    const thermoFillMin = document.createElement('div');
    thermoFillMin.setAttribute('class', createFillNameMin);
    thermoFillMin.setAttribute('id', 'thermoFillMinId');

    const fillPercentage = Math.abs(daily.data[i].temperatureMax) / 100;
    const fillHeight = fillPercentage * 1000;

    // create min values
    const fillPercentageMin = Math.abs(daily.data[i].temperatureMin) / 100;
    const fillHeightMin = fillPercentageMin * 1000;
    const thermoBottom = document.createElement('div');
    const thermoBottomMin = document.createElement('div');
    thermoBottom.setAttribute('class', createBottomName);
    thermoBottom.setAttribute('id', createBottomName);
    thermoBottomMin.setAttribute('class', createBottomNameMin);
    thermoBottomMin.setAttribute('id', createBottomNameMin);
    const span = document.createElement('span');
    const spanMin = document.createElement('span');
    span.setAttribute('class', 'bottom-text-week');
    spanMin.setAttribute('class', 'bottom-text-week');
    const thermoColorMax = tempColor(Math.round(daily.data[i].temperatureMax));
    const thermoColorMin = tempColor(Math.round(daily.data[i].temperatureMin));
    const thermoContainerMin = document.createElement('div');
    thermoContainerMin.setAttribute('class', 'thermo-container');


    const tempText = document.createElement('p');
    tempText.setAttribute('class', 'temp-text');
    tempText.innerHTML = 'Max temperature';
    const tempTextMin = document.createElement('p');
    tempTextMin.setAttribute('class', 'temp-text');
    tempTextMin.innerHTML = 'Min temperature';
    thermoContainer.type = 'text/css';

    thermoContainer.innerHTML = `<style> .${createBottomName}{color: white;  width: 63px;\
    height: 50px; border-radius: 100%; border: 5px solid #d1d1d1; z-index: -1; margin: -7px auto ;text-align: center; display: block; background: ${thermoColorMax};\
    padding-top: 15px; font-size: 24px;}` + `.${createFillName}{ height: ${fillHeight
    }px;width: 30px; min-height: 12px; background: ${thermoColorMax}; !important;\
    position: absolute; bottom: -5px; left: -5px;\
    border-top-left-radius: 25px; border-top-right-radius: 25px; transition: all .2s; }${createBottomName} createBottomName{background: ${thermoColorMax};}</style>`;
    document.getElementsByTagName('div')[0].appendChild(thermoBottom);
    document.getElementsByTagName('div')[0].appendChild(thermoFill);
    document.getElementById(createBottomName).className = createBottomName;

    // create min container


    thermoContainerMin.type = 'text/css';
    thermoContainerMin.innerHTML = `<style> .${createBottomNameMin}{color: white;  width: 63px;\
    height: 50px; border-radius: 100%; border: 5px solid #d1d1d1; z-index: -1; margin: -7px auto; text-align: center; display: block; background: ${thermoColorMin};\
    padding-top: 15px; font-size: 24px;}` + `.${createFillNameMin}{ height: ${fillHeightMin
    }px;width: 30px; min-height: 12px; background: ${thermoColorMin} !important;\
    position: absolute; bottom: -5px; left: -5px;\
    border-top-left-radius: 25px; border-top-right-radius: 25px; transition: all .2s; }${createBottomNameMin}{background: ${thermoColorMin};}</style>`;
    document.getElementsByTagName('div')[0].appendChild(thermoBottomMin);
    // document.getElementsByTagName('div')[0].appendChild(thermoFillMin);
    document.getElementById(createBottomNameMin).className = createBottomNameMin;

    span.innerHTML = (`${Math.round(daily.data[i].temperatureMax)}°`);
    spanMin.innerHTML = (`${Math.round(daily.data[i].temperatureMin)}°`);

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

    const compassContainer = document.createElement('li');
    compassContainer.setAttribute('class', 'degrees list-item');
    const compass = document.createElement('div');
    compass.setAttribute('class', 'compass');
    const compassMsg = document.createElement('div');
    compassMsg.setAttribute('class', 'compass-msg');
    windText.innerHTML = 'Wind direction'
    windText.setAttribute('class','wind-direction-text');
    compassContainer.appendChild(windText);

    const compassId = (`compass${i}`);
    compass.setAttribute('id', compassId);

    compassContainer.appendChild(compass);
    compassContainer.appendChild(compassMsg);

    container.appendChild(day);
    container.appendChild(iconListElement);
    container.appendChild(thermoLi);
    container.appendChild(thermoLiMin);
    container.appendChild(windContainer);
    container.appendChild(compassContainer);

    // var weekSection = document.createElement('section')
    // weekSection.setAttribute('id', 'weekSection');

    wholeListContainer.appendChild(container);

    // weekSection.appendChild(wholeListContainer);

    compassMsg.innerHTML = checkWindDirection(daily.data[i].windBearing, compassId);
  }
}

function appendIconChilds(data) {
  const iconListElement = document.createElement('li');
  iconListElement.setAttribute('class', 'list-item icon degrees');
  var firstDiv = document.createElement('div');
  var secondDiv = document.createElement('div');
  var thirdDiv = document.createElement('div');
  var fourthDiv = document.createElement('div');
  var fifthDiv = document.createElement('div');

  if (data === 'clear-day') {
    firstDiv.setAttribute('class', 'sun');
    secondDiv.setAttribute('class', 'rays');
    firstDiv.appendChild(secondDiv);
    iconListElement.appendChild(firstDiv);
  }
  if (data === 'clear-night') {
    firstDiv.setAttribute('class', 'moon');
    iconListElement.appendChild(firstDiv);
  }
  if (data === 'cloudy') {
    firstDiv.setAttribute('class', 'cloud');
    secondDiv.setAttribute('class', 'cloud');
    iconListElement.appendChild(firstDiv);
    iconListElement.appendChild(secondDiv);
  }
  if (data === 'fog') {
    firstDiv.setAttribute('class', 'fog');
    secondDiv.setAttribute('class', 'fog');
    iconListElement.appendChild(firstDiv);
    iconListElement.appendChild(secondDiv);
  }
  if (data === 'partly-cloudy-day') {
    firstDiv.setAttribute('class', 'partly-cloud');
    secondDiv.setAttribute('class', 'sun');
    thirdDiv.setAttribute('class', 'rays');
    secondDiv.appendChild(thirdDiv);
    iconListElement.appendChild(firstDiv);
    iconListElement.appendChild(secondDiv);
  }
  if (data === 'partly-cloudy-night') {
    firstDiv.setAttribute('class', 'cloud');
    secondDiv.setAttribute('class', 'cloud');
    thirdDiv.setAttribute('class', 'partly-cloudy-moon');
    iconListElement.appendChild(firstDiv);
    iconListElement.appendChild(secondDiv);
    iconListElement.appendChild(thirdDiv);
  }
  if (data === 'rain') {
    firstDiv.setAttribute('class', 'cloud');
    secondDiv.setAttribute('class', 'rain');
    iconListElement.appendChild(firstDiv);
    iconListElement.appendChild(secondDiv);
  }
  if (data === 'sleet') {
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
  if (data === 'wind') {
    firstDiv.setAttribute('class', 'sky-wind');
    secondDiv.setAttribute('class', 'sky-wind');
    iconListElement.appendChild(firstDiv);
    iconListElement.appendChild(secondDiv);
  }
  if (data === 'snow') {
    firstDiv.setAttribute('class', 'snow-cloud');
    secondDiv.setAttribute('class', 'snow');
    thirdDiv.setAttribute('class', 'flake');
    fourthDiv.setAttribute('class', 'flake');
    secondDiv.appendChild(thirdDiv);
    secondDiv.appendChild(fourthDiv);
    iconListElement.appendChild(firstDiv);
    iconListElement.appendChild(secondDiv);
  }
  return iconListElement;
}

function tempColor(data) {
  let color;
  if (data < 0) {
    color = 'royalblue';
  } else if (data >= 0) {
    color = 'tomato';
  }
  return color;
}

function checkWindDirection(degrees, id) {
  const val = Math.floor((degrees / 22.5) + 0.5);
  const arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

  console.log('hallo' +degrees + id)
  $(`#${id}`)
        .css('-webkit-transform', `rotate(${degrees + 225}deg) scale(0.9,0.9) `)
        .css('-moz-transform', `rotate(${degrees + 225}deg) scale(0.9,0.9) `)
        .css('-ms-transform', `rotate(${degrees + 225}deg) scale(0.9,0.9) `)
        .css('-o-transform', `rotate(${degrees + 225}deg) scale(0.9,0.9) `)
        .css('transform', `rotate(${degrees + 225}deg) scale(0.9,0.9) `);

  return arr[(val % 16)];
}

function setWindmillSpeed(speed, wind) {
  if (speed < 0.5) {
    wind.setAttribute('class', 'sec1');
  } else if (speed < 1.0) {
    wind.setAttribute('class', 'sec1');
  } else if (speed < 2.0) {
    wind.setAttribute('class', 'sec2');
  } else if (speed < 3.0) {
    wind.setAttribute('class', 'sec3');
  } else if (speed < 4.0) {
    wind.setAttribute('class', 'sec4');
  } else if (speed < 5.0) {
    wind.setAttribute('class', 'sec5');
  } else if (speed < 6.0) {
    wind.setAttribute('class', 'sec6');
  } else if (speed < 8.0) {
    wind.setAttribute('class', 'sec8');
  } else if (speed < 10.0) {
    wind.setAttribute('class', 'sec10');
  } else if (speed < 12.0) {
    wind.setAttribute('class', 'sec12');
  } else if (speed < 14.0) {
    wind.setAttribute('class', 'sec14');
  } else if (speed < 16.0) {
    wind.setAttribute('class', 'sec16');
  } else if (speed < 20.0) {
    wind.setAttribute('class', 'sec20');
  } else if (speed < 25.0) {
    wind.setAttribute('class', 'sec25');
  } else if (speed < 30.0) {
    wind.setAttribute('class', 'sec30');
  }
}
function setAddress(){
  $.ajax({
      url: 'http://localhost:3000/address',
      type: "GET",
      dataType: 'json',
      cache: true,
      success: function(data, status, error) {
          var hourheader = document.getElementById('hour-head');
          hourheader.innerHTML = 'TODAY IN ' + data.address.toUpperCase();
          var weekheader = document.getElementById('week-header');
          weekheader.innerHTML = 'TODAY IN ' + data.address.toUpperCase();
      },
      error: function(data, status, error) {
          console.log('error', data, status, error);
          var error = document.getElementById('loading')
          error.innerHTML = error;
      }
  });
}
