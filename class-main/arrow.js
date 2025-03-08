async function (req, res) {
  
  const nombre = req.query.nombre;
  console.log(nombre);
  const result = await client.query("SELECT * FROM students WHERE nombre = $1", [nombre])

  res.json(result.rows);

  }

async (req, res) => {
  
    const nombre = req.query.nombre;
    console.log(nombre);
    const result = await client.query("SELECT * FROM students WHERE nombre = $1", [nombre])
  
    res.json(result.rows);
  
    }