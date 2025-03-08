export function renderIndex(req, res) {
  res.send(`
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Página web en express</title>
  <script defer>
      document.addEventListener("DOMContentLoaded", async () => {
        const data = await fetch("/students?query=SELECT * FROM students;", {
          method: "GET",
        });
          const dataParsed = await data.json()
          console.log(dataParsed);
          const lista = document.getElementById("lista")
          console.log(dataParsed);
          for (let i = 0; i < dataParsed.length; i++){
            lista.innerHTML += \`<li>\${dataParsed[i].nombre}</l1>\`
          }
      })
  </script>
</head>
<body>
<h1>ESTA ES LA MEJOR PAGINA </h1> 
  <ul id="lista">

  </ul>
</body>
</html
    `);
}
