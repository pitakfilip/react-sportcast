
export const Languages = {
    EN: 'en',
    CZ: 'cz',
    SK: 'sk'
}
const storageKey = 'lang'
const defaultLang = Languages.EN;

export const changeLang = ((lang) => {
    if (Languages[lang] !== undefined) {
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