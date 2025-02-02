global.__basedir = __dirname;
global.config = require(__basedir + '/config/config');
global.fun = require(__basedir + '/loaders/load-functions');


fun.checkDir(config.inputDir);
fun.checkDir(config.outputDir);
fun.checkDir(config.processedDir);

require(__basedir + '/loaders/load-objects.js');

const fs = require('fs');
const clc = require('cli-color');

async function processAllPdfs() {
    const files = fs.readdirSync(config.inputDir);
    console.log(`Found ${clc.yellow(files.length)} files to process`);

    for (const fileName of files) {
        const file = await fun.parseFile(fileName); // await if parseFile is async
        console.log(`Processing: ${clc.blue(file.name)}`);
        await fun.processPdf(file); // await to ensure each file is processed sequentially
    }
}

const main = async () => {
    try {
        await processAllPdfs();
        console.log(clc.bgGreen(`All files processed successfully !`));
    } catch (err) {
        console.error(clc.bgRed(`Error processing files`), err);
    }
};

const args = process.argv.slice(2);

main(args);