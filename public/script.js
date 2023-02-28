const getData = async (url) => {
  try {
    const body = await fetch(url);
    const data = await body.json();
    const icon = await fetch(
      `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    );
    const imgBody = await fetch(
      `/img?query=${data.name} landscape ${data.weather[0].description}`
    );
    const imgData = await imgBody.json();
    const imgUrl = imgData.results[Math.floor(Math.random() * 10)].urls.full;
    displayData(data, icon.url, imgUrl);
  } catch (error) {
    alert('Please enter a valid city name');
  }
};

const displayData = (data, iconUrl, imgUrl) => {
  document.querySelector(
    '#city-title'
  ).textContent = `${data.name}, ${data.sys.country}`;
  const d = new Date();
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  d.setSeconds(d.getSeconds() + data.timezone - 3600);
  document.querySelector('#current-time').textContent = `${
    days[d.getDay()]
  }-${d.toLocaleString()}`;
  document.querySelector(
    '#desc'
  ).textContent = `${data.weather[0].description}`;
  document.querySelector('.img-description img').src = iconUrl;
  document.querySelector('#temp').textContent = `${Math.floor(data.main.temp)}`;
  document.querySelector('#feels-like').textContent = `${data.main.feels_like}`;
  document.querySelector('#humidity').textContent = `${data.main.humidity}%`;
  document.querySelector('#wind').textContent = `${data.wind.speed} Km/h`;
  document.body.style.backgroundImage = `url(${imgUrl})`;
};

(function handleInput() {
  const input = document.querySelector('input');
  const searchIcon = document.querySelector('.fa-search');

  const createUrl = (name) => {
    const url = `/weather?q=${name}&units=metric`;
    getData(url);
    input.value = '';
  };
  searchIcon.addEventListener('click', () => createUrl(input.value));
  input.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
      createUrl(e.target.value);
    }
  });
})();
// getData("https://api.openweathermap.org/data/2.5/weather?q=morocco&appid=1f8477c0ecddc564b9091bb123c6f6c4&units=")

//let img_url = ``
