const path = require('path');
const { extname, basename, join } = path;

module.exports = (name) => {
    const file = parseFile(name);
    return file;
}

function parseFile(name) {
    let file = {
        name : name,
        extension : extname(name).toLowerCase(),
        inputPath : join(config.inputDir, name),
        processedPath : join(config.processedDir, name),
        outputPath : join(config.outputDir, name),
    }

    file.nameWithoutExt = basename(name, file.extension)
    file.nameWithoutExt = file.nameWithoutExt.replace(/-x\d+$/, '')

    file.outputName = `${file.nameWithoutExt}-split.pdf`;
    file.outputPath = join(config.outputDir, file.outputName);
    return file
}