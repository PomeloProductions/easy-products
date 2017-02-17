/**
 * Created by bryce on 2/16/17.
 */

export class ShippingField {

    /**
     * Default constructor for a field
     *
     * @param field HTMLNode
     * @param cookieFactory CookieFactory
     * @param cookieKey The key for the stored cookie
     */
    constructor (field, cookieFactory, cookieKey) {

        this.field = field;
        this.cookieFactory = cookieFactory;
        this.cookieKey = cookieKey;
    }
}