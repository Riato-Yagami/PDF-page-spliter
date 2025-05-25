module.exports = (title) => {
    let sub = replaceSpecialChars(title.sub);
    // console.log(title)
    parsedTitle = title.sections.prefixes.join('-') + '-'
    + sub.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens

    return parsedTitle;
}

const specialChars = {
    'é': 'e',
    'è': 'e',
    'ê': 'e',
    'ë': 'e',
    'à': 'a',
    'â': 'a',
    'ä': 'a',
    'ç': 'c',
    'î': 'i',
    'ï': 'i',
    'ô': 'o',
    'ö': 'o',
    'ù': 'u',
    'û': 'u',
    'ü': 'u',
    'ÿ': 'y',
    'É': 'E',
    'È': 'E',
    'Ê': 'E',
    'Ë': 'E',
    'À': 'A',
    'Â': 'A',
    'Ä': 'A',
    'Ç': 'C',
    'Î': 'I',
    'Ï': 'I',
    'Ô': 'O',
    'Ö': 'O',
    'Ù': 'U',
    'Û': 'U',
    'Ü': 'U',
    'Ÿ': 'Y'
};

const replaceSpecialChars = (str) => {
    return str.replace(/[éèêëàâäçîïôöùûüÿÉÈÊËÀÂÄÇÎÏÔÖÙÛÜŸ]/g, match => specialChars[match]);
};