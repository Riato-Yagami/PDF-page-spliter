const fs = require('fs');
const path = require('path');
const clc = require('cli-color');

module.exports = async (file) => {
    await processPdf(file);
    return;
}

async function processPdf(file) {
    try {
        file.pdfBuffer = await fun.getPdfBuffer(file);
        
        file.pageBuffers = await fun.splitPdfPages(file);

        await savePages(file);

        if(config.moveProcessedFile){ // Move processed file
            fs.rename(file.inputPath, file.processedPath, function (err) {
                if (err) throw err
            })
        }
        
        // console.log(`Processed: ${clc.blue(file.name)} -> ${clc.blue(file.outputName)}`);
    } catch (error) {
        console.error(clc.red(`Failed to process ${file}:`), error);
    }
}

async function savePages(file) {
    try {
        const outputDir = path.join(config.outputDir, file.nameWithoutExt);
        fun.checkDir(outputDir);

        for await (const pageBuffer of file.pageBuffers) {
            const title = await fun.parsePdfTitle(pageBuffer);
            // const parsedTitle = fun.parseTitle(pdfTitle);
            // console.log(title);
            const outputFilePath = path.join(outputDir, `${title.parsed}.pdf`);
            fs.writeFileSync(outputFilePath, pageBuffer);

            console.log(`Split page : ${clc.green(outputFilePath)}`);
        }
    } catch (error) {
        console.error(clc.red(`Failed to split pages for ${file}:`), error);
    }
    return
}