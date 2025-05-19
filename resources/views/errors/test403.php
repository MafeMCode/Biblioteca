<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuh-uh</title>
  <style>
    body, html {
      margin: 0;
      padding: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color:rgb(53, 53, 53);
    }

    .gif-container {
      height: 80vh; /* 4/5 of the viewport height */
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .gif-container img {
      max-height: 100%;
      max-width: 100%;
    }

    .animated-gif {
      height: 10vh;
      animation: growGif 2s ease-out forwards;
    }
    @keyframes growGif {
      from {
        height: 10vh;
      }
      to {
        height: 80vh;
      }
    }

    .text-below {
      margin-top: 20px;
      font-size: 1.2em;
      color: white;
      text-align: center;
    }
  </style>
</head>
<body>

  <div class="gif-container">
    <img class="animated-gif" style="height:80vh" src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjd5bnNsM3lmNG12bm91bG5kOXRzbDM3OWl5dDQ4dG05aGFldnp0NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TdQa3kLq1kTKH6zyV8/giphy.gif" alt="Centered GIF">
  </div>
  <div class="text-below">
    ¿Dónde vas guachín? Pa tu casa anda.
  </div>
  <Link href="http://biblioteca.test/">
  <Button>
    Perdón, ya me voy
  </Button>
</Link>
</body>
</html>
