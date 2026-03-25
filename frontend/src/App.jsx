import { useState } from "react"
import axios from "axios"

function App() {

  const [topic, setTopic] = useState("")
  const [minPages, setMinPages] = useState(1)
  const [maxPages, setMaxPages] = useState(3)
  const [report, setReport] = useState("")
  const [loading, setLoading] = useState(false)

  const generateReport = async () => {

    setLoading(true)

    const response = await axios.post(
      "http://localhost:5000/api/generate",
      {
        topic: topic,
        minPages: minPages,
        maxPages: maxPages
      }
    )

    setReport(response.data.report)

    setLoading(false)
  }

  const exportFile = async (format) => {

    const response = await axios.post(
      "http://localhost:5000/api/generate",
      {
        topic: topic,
        minPages: minPages,
        maxPages: maxPages,
        format: format
      },
      {
        responseType: "blob"
      }
    )

    const blob = new Blob([response.data])
    const url = window.URL.createObjectURL(blob)

    const link = document.createElement("a")

    link.href = url

    link.download = format === "pdf"
      ? "informe.pdf"
      : "informe.docx"

    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)
  }

  return (

    <div style={{padding:40,fontFamily:"Arial"}}>

      <h1>Generador de Informes con IA</h1>

      <input
        type="text"
        placeholder="Tema del informe"
        value={topic}
        onChange={(e)=>setTopic(e.target.value)}
        style={{width:"400px",padding:"10px"}}
      />

      <div style={{marginTop:20}}>

        <label>Hojas mínimas:</label>

        <input
          type="number"
          value={minPages}
          onChange={(e)=>setMinPages(e.target.value)}
          style={{marginLeft:10,width:60}}
        />

        <label style={{marginLeft:20}}>Hojas máximas:</label>

        <input
          type="number"
          value={maxPages}
          onChange={(e)=>setMaxPages(e.target.value)}
          style={{marginLeft:10,width:60}}
        />

      </div>

      <br/>

      <button onClick={generateReport}>
        Generar informe
      </button>

      {loading && <p>Generando informe...</p>}

      {report && (
        <>

          <div
            style={{
              marginTop:30,
              whiteSpace:"pre-wrap",
              border:"1px solid #ccc",
              padding:20
            }}
          >
            {report}
          </div>

          <div style={{marginTop:20}}>

            <button onClick={()=>exportFile("word")}>
              Descargar Word
            </button>

            <button
              onClick={()=>exportFile("pdf")}
              style={{marginLeft:10}}
            >
              Descargar PDF
            </button>

          </div>

        </>
      )}

    </div>

  )

}

export default App