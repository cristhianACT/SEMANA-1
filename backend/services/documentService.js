const { Document, Packer, Paragraph } = require("docx")
const PDFDocument = require("pdfkit")
const fs = require("fs")

async function createWord(report) {

  const doc = new Document({
    sections:[
      {
        children: report.split("\n").map(
          line => new Paragraph(line)
        )
      }
    ]
  })

  const buffer = await Packer.toBuffer(doc)

  const file = "informe.docx"

  fs.writeFileSync(file, buffer)

  return file
}

function createPDF(report) {

  const file = "informe.pdf"

  const doc = new PDFDocument()

  doc.pipe(fs.createWriteStream(file))

  doc.fontSize(12).text(report, {align:"justify"})

  doc.end()

  return file
}

module.exports = {
  createWord,
  createPDF
}