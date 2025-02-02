// \newsec{sec}{pr}{Propriété}
// \newsec{sec}{df}{Définition}
// \newsec{sec}{thm}{Théorème}
// \newsec{sec}{scnSUB}{Séance}

// \newsec{sub}{cor}{Corollaire}
// \newsec{sub}{lem}{Lemme}
// \newsec{sub}{ctr}{Contraposée}
// \newsec{sub}{rcp}{Réciproque}
// \newsec{sub}{rmdr}{Rappel}
// \newsec{sub}{mthd}{Méthode}
// \newsec{sub}{vc}{Vocabulaire}
// \newsec{sub}{nt}{Notation}
// \newsec{sub}{hist}{Histoire}
// \newsec{sub}{axio}{Axiome}
// \newsec{sub}{objSUB}{Objectifs}

// \def\explColor{gray}
// \newsec{subsub}{rmk}{Remarque}
// \newsec{subsub}{expl}{Exemple}
// \newsec{subsub}{app}{Application}
// \newsec{subsub}{exo}{Exercice}
// \newsec{subsub}{corr}{Correction}
// \newsec{subsub}{act}{Activité}
// \newsec{subsub}{dmsec}{Devoir maison}

// \newsec{subsub}{nullsubsec}{}

// \newsec{subsub}{demoSUB}{$\rightarrow$ Démonstration}
// \newsec{subsub}{ticeSUB}{TICE}
// \newsec{subsub}{qfSUB}{\Large Questions flash}
// \newsec{sub}{rl}{Règle n\deg\therl}

// Todo: Parse the above LaTeX commands to generate a list of sections
const sectionTypes = {
    'pr': 'Propriété',
    'df': 'Définition',
    'thm': 'Théorème',
    'scnSUB': 'Séance',
    'cor': 'Corollaire',
    'lem': 'Lemme',
    'ctr': 'Contraposée',
    'rcp': 'Réciproque',
    'rmdr': 'Rappel',
    'mthd': 'Méthode',
    'vc': 'Vocabulaire',
    'nt': 'Notation',
    'hist': 'Histoire',
    'axio': 'Axiome',
    'objSUB': 'Objectifs',
    'rmk': 'Remarque',
    'expl': 'Exemple',
    'app': 'Application',
    'exo': 'Exercice',
    'corr': 'Correction',
    'act': 'Activité',
    'dmsec': 'Devoir maison',
    'nullsubsec': '',
    'demoSUB': 'Démonstration',
    'ticeSUB': 'TICE',
    'qfSUB': 'Questions flash',
    'rl': 'Règle'
};

module.exports = (textArray) => {
    const names = [];
    const prefixes = [];
    textArray.forEach(element => {
        Object.keys(sectionTypes).forEach(type => {
            if (element.includes(sectionTypes[type]) && sectionTypes[type] !== '') {
                // console.log(sectionTypes[type]);
                names.push(sectionTypes[type]);
                prefixes.push(type);
            }
        });
    });

    return {names,prefixes};
}