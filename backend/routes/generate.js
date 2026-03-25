const express = require("express")
const router = express.Router()

const generateReport = require("../ai/generateReport")
const { createWord, createPDF } = require("../services/documentService")

router.post("/generate", async (req, res) => {

  try {

    const { topic, format, minPages, maxPages } = req.body

    const report = await generateReport(topic, minPages, maxPages)

    if(format === "word") {

      const file = await createWord(report)

      return res.download(file)

    }

    if(format === "pdf") {

      const file = await createPDF(report)

      return res.download(file)

    }

    res.json({ report })

  } catch(error) {

    console.log(error)

    res.status(500).json({
      error:"Error generando informe"
    })

  }

})

module.exports = router