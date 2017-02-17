/**
 * Created by bryce on 2/16/17.
 */

export class CookieFactory {

    /**
     * Default constructor, requires a namespace being passed in for prefixing all data
     *
     * @param nameSpace
     */
    constructor(nameSpace) {
        this.nameSpace = nameSpace;
    }

    /**
     * Saves a cookie to persistent storage
     *
     * @param name The key of the cookie
     * @param value The new value of the cookie
     */
    saveCookie(name, value) {
        document.cookie = this.nameSpace + "-" + name + "=" + value + "; path=/";
    }

    /**
     * Saves a json object as a cookie
     *
     * @param name The key for the cookie
     * @param value The json object to save
     */
    saveJSON(name, value) {

        this.saveCookie(name, JSON.stringify(value));
    }

    /**
     * Loads a cookie out of the document cookie list
     *
     * @param name The name of the cookie we are loading
     * @returns {*} the new object
     */
    loadCookie(name) {

        name = this.nameSpace + "-" + name + "=";
        let ca = document.cookie.split(';');

        for (let i=0; i<ca.length; i++) {

            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }

            if (c.indexOf(name) == 0) {
                return c.substring(name.length,c.length);
            }
        }

        return undefined;
    }

    /**
     * Parses a json object from a cookie, or returns an empty JSON
     *
     * @param name The name of the json we are loading
     * @returns {{}} The found object
     */
    loadJSON(name) {
        let content = this.loadCookie(name);

        if (typeof content == "undefined")
            return {};
        else
            return JSON.parse(content);
    }

    /**
     * Parses a number from a cookie
     *
     * @param name The cookie we are looking for
     * @param defaultValue The default to return if the cookie was not found
     * @returns {*}
     */
    loadNumber(name, defaultValue) {
        let content = this.loadCookie(name);

        if (typeof content == "undefined")
            return defaultValue;

        return Number(content);
    }

    /**
     * Parses a boolean value from a cookie
     *
     * @param name The cookie we are looking for
     * @param defaultValue A default to return if the value was undefined
     * @returns {*}
     */
    loadBoolean (name, defaultValue) {
        let content = this.loadCookie(name);

        if (typeof content == "undefined")
            return defaultValue;

        return content == 'true';
    }
}