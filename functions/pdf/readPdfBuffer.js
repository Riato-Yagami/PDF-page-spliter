const { PdfReader } = require('pdfreader');
const fs = require('fs');
const pdf = require('pdf-parse');

module.exports = async (pdfBuffer) => {
    const textArrayA = await readPdfBufferA(pdfBuffer);
    const textArrayB = await readPdfBufferB(pdfBuffer);

    const title = reconstructTitle(textArrayA[0], textArrayB);
    console.log(title);
    return title;
}

const readPdfBufferA = async (pdfBuffer) => {
    const data = await pdf(pdfBuffer);
    let rawArray = data.text.split('\n');
    let textArray = [];
    rawArray.forEach(element => {
        if (element.trim() !== '') {
            textArray.push(element.trim());
        }
    });
    return textArray;
}

const readPdfBufferB = (pdfBuffer) => {
    return new Promise((resolve, reject) => {
        let text = [];
        new PdfReader().parseBuffer(pdfBuffer, (err, item) => {
            if (err) {
                reject(err);
            } else if (!item) {
                resolve(text);
            } else if (item.text) {
                text.push(item.text);
            }
        });
    });
}

const reconstructTitle = (titleRaw, textArray) => {
    const titleArray = [];

    for (let i = 0; i < textArray.length; i++) {
        let word = textArray[i]
        // console.log(titleRaw.includes(word));
        if (titleRaw.includes(word)) {
            titleArray.push(word);
        }else{
            break;
        }
    }

    return titleArray.join(' ');
}