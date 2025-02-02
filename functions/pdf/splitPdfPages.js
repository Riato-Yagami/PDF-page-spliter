const clc = require('cli-color');
const PDFDocument = require('pdf-lib').PDFDocument;

module.exports = async (file) => {
    const pdfBufferArray = await splitPdf(file);
    return pdfBufferArray;
}

async function splitPdf(file) {
    let buffers = [];
    try {
        const pdfDoc = await PDFDocument.load(file.pdfBuffer);
        const numPages = pdfDoc.getPageCount();

        for (let i = 0; i < numPages; i++) {
            const newPdfDoc = await PDFDocument.create();
            const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
            newPdfDoc.addPage(copiedPage);

            const pdfBytes = await newPdfDoc.save();
            buffers.push(pdfBytes);
            // const title = await fun.parsePdfTitle(pdfBytes);
            // // const parsedTitle = fun.parseTitle(pdfTitle);

            // const outputFilePath = path.join(config.outputDir, `${title.parsed}.pdf`);
            // fs.writeFileSync(outputFilePath, pdfBytes);

            // console.log(`Split page ${i + 1}: ${clc.green(outputFilePath)}`);
        }
    } catch (error) {
        console.error(clc.red(`Failed to split pages for ${file}:`), error);
    }

    return buffers;
}