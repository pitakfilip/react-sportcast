
export const Language = {
    EN: 'EN',
    CZ: 'CZ',
}
export const Languages = [Language.EN, Language.CZ];

const storageKey = 'lang'
const defaultLang = Language.EN;

export const changeLang = ((lang) => {
    if (Language[lang] !== undefined) {
        localStorage.setItem(storageKey, lang);
    }
});

export const getLang = (() => {
    const val = localStorage.getItem(storageKey);
    if (val === undefined || val === null) {
        changeLang(defaultLang);
        return defaultLang;
    } else {
        return val;
    }
});