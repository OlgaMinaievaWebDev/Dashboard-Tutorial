// get picture

fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=natuhghjfhkfkfre"
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url('${data.urls.regular}')`;
    document.getElementById("author").textContent = `By: ${data.user.name}`;
  })
  .catch((err) => {
    // This is where I can handle the error
    // Choose to use a default background image
    document.body.style.backgroundImage = `url('https://images.unsplash.com/photo-1503614472-8c93d56e92ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc1MDA2MzN8&ixlib=rb-4.0.3&q=80&w=1080')`;
    document.getElementById("author").textContent = `By: John Lee`;
  });

// get crypto
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
  .then((res) => {
    if (!res.ok) {
      throw Error();
    }
    return res.json();
  })
  .then((data) => {
    console.log(data.name);
    document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `;

    document.getElementById("crypto").innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `;
  })
  .catch((err) => {
    document.getElementById("crypto").textContent =
      "Not available at this moment";
    console.error(err);
  });

// get time and update it every second

function getCurrentTime() {
  const currentDate = new Date().toLocaleTimeString("en-us", {
    timeStyle: "short",
  });
  document.getElementById("time").textContent = currentDate;
}

setInterval(getCurrentTime, 1000);

//get current position
navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => {
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      document.getElementById("weather").innerHTML = `
        <img src=${iconUrl} />
        <p>${Math.round(data.main.temp)}º</p>
        <p>${data.name}</p>
        `;
    })
    .catch((err) => console.error(err));
});
