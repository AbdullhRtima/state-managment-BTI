

// get data local storage 
export const getDataLocalStorage = (formName) => {
    const data = localStorage.getItem(formName);
    if (data) {
        return JSON.parse(data);
    }
    return "";
};

// set data local storage
export const setDataLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
};

// remove data local storage
export const removeDataLocalStorage = (key) => {
    localStorage.removeItem(key);
    return true;
};

// clear data local storage
export const clearDataLocalStorage = () => {
    localStorage.clear();
    return true;
}
