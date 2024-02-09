fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data.urls.regular)
    document.body.style.backgroundImage = `url('${data.urls.regular}')`;
    document.getElementById("author").textContent = `By: ${data.user.name}`;
  })
  .catch((err) => {
    // This is where I can handle the error
    // Choose to use a default background image
   document.body.style.backgroundImage = `url('https://images.unsplash.com/photo-1470770903676-69b98201ea1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc0OTk3NTZ8&ixlib=rb-4.0.3&q=80&w=1080')`;
  });
