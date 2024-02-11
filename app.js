// get picture

try {
  const res = await fetch(
    "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
  );
  const data = await res.json();
  document.body.style.backgroundImage = `url('${data.urls.regular}')`;
  document.getElementById("author").textContent = `By: ${data.user.name}`;
} catch (error) {
  // This is where I can handle the error
  // Choose to use a default background image
  document.body.style.backgroundImage = `url('https://images.unsplash.com/photo-1503614472-8c93d56e92ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc1MDA2MzN8&ixlib=rb-4.0.3&q=80&w=1080')`;
  document.getElementById("author").textContent = `By: John Lee`;
}

// get crypto

try {
  const resp = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin");
  const dat = await resp.json();
  document.getElementById("crypto-top").innerHTML = `
              <img src=${dat.image.small} />
              <span>${dat.name}</span>
          `;

  document.getElementById("crypto").innerHTML += `
              <p>🎯: $${dat.market_data.current_price.usd}</p>
              <p>👆: $${dat.market_data.high_24h.usd}</p>
              <p>👇: $${dat.market_data.low_24h.usd}</p>
          `;
} catch (error) {
  document.getElementById("crypto").textContent =
    "Not available at this moment";
}

// get time and update it every second

function getCurrentTime() {
  const currentDate = new Date().toLocaleTimeString("en-us", {
    timeStyle: "short",
  });
  document.getElementById("time").textContent = currentDate;
}

setInterval(getCurrentTime, 1000);

//get current position
navigator.geolocation.getCurrentPosition(async (position) => {

  try {
    
    const res = await fetch(
      `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`
    );
    if (!res.ok) {
      throw Error("Weather data not available");
    }
    const data = await res.json();
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.getElementById("weather").innerHTML = `
          <img src=${iconUrl} />
          <p>${Math.round(data.main.temp)}º</p>
          <p class="city">${data.name}</p>
          `;
  } catch (error) {
    console.error(err);
  }
  
});
