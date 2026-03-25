const axios = require("axios")

async function generateReport(topic, minPages, maxPages) {

  const prompt = `
Escribe un informe académico sobre:

${topic}

Debe tener entre ${minPages} y ${maxPages} páginas aproximadamente.

Formato:

INTRODUCCIÓN
MARCO TEÓRICO
DESARROLLO
CONCLUSIONES
REFERENCIAS APA

Reglas:
No usar markdown
No usar ** ni --
Escribir como documento académico formal
`

  const response = await axios.post(
    "http://localhost:11434/api/generate",
    {
      model:"llama3",
      prompt:prompt,
      stream:false
    }
  )

  return response.data.response
}

module.exports = generateReport