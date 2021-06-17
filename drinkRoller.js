const charMap = {
    "á": "a",
    "é": "e",
    "í": "i",
    "ó": "o",
    "ö": "o",
    "ő": "o",
    "ú": "u",
    "ű": "u",
    "ü": "u"
}

const drinks = {
    1: "Mézes pálesz",
    2: "Szőlő pálesz",
    3: "Cseresznye pálesz",
    4: "Pohár sör",
    5: "Korsó sör",
    6: "Kis fröccs",
    7: "Nagy fröccs",
    8: "Hosszu lépés",
    9: "Házmester",
    10: "Vice házmester",
    11: "Sport fröccs",
    12: "Mézes pálesz",
    13: "Mézes pálesz",
    14: "Mézes pálesz",
    15: "Szőlő pálesz",
    16: "Mézes pálesz",
    17: "Szőlő pálesz",
    18: "Mézes pálesz",
    19: "Vice házmester",
    20: "Mézes pálesz",
    21: "Mézes pálesz",
    22: "Cseresznye pálesz",
    23: "Pohár sör",
    24: "Korsó sör",
    25: "Kis fröccs",
    26: "Nagy fröccs",
    27: "Sport fröccs",
    28: "Házmester",
    29: "Cseresznye pálesz",
    30: "Mézes pálesz",
    31: "Pohár sör",
    32: "Korsó sör",
    33: "Kis fröccs",
    34: "Nagy fröccs",
    35: "Hosszu lépés",
    36: "Házmester",
    38: "Vice házmester",
    39: "Mézes pálesz",
    40: "Szőlő pálesz",
    41: "Mézes pálesz",
    42: "Kis fröccs",
    43: "Kis fröccs",
    44: "Nagy fröccs",
    45: "Hosszu lépés",
    46: "Korsó sör",
    47: "Korsó sör",
    48: "Mézes pálesz",
    49: "Medence víz heheh",
    50: "ILYEN NÉV NINCS"
}

const getCharsValue = (first, second) => {
    Object.entries(charMap).forEach(([letter, replace]) => {
        first === letter && (first = replace)
        second === letter && (second = replace)
    })
    return first.charCodeAt(0) + second.charCodeAt(0) - 193;
}


export const getDrink = (name) => {
    let [firstName, secondName] = name.replace(/\s+/g, ' ').trim().split(" ");
    let drinkNumber = getCharsValue(firstName.charAt(0).toLowerCase(), secondName.charAt(0).toLowerCase())
    if(drinkNumber<1 || drinkNumber>50){
        drinkNumber=1
    }
    return drinks[drinkNumber]
}

