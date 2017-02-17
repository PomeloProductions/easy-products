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

        this.valueEntered = false;

        this.blankValue = this.field.dataset['blank_value'];

        this.checkInputValue();
    }

    /**
     * Determines if the user has entered a proper value
     */
    checkInputValue () {

        this.valueEntered = false;

        if (this.field.value) {

            if (this.blankValue) {
                this.valueEntered = this.blankValue != this.field.value;
            }
            else {
                this.valueEntered = true;
            }
        }
    }

    /**
     * Checks whether or not this field is ready for submission
     *
     * @returns Boolean
     */
    checkIfComplete () {

        if (this.field.required) {
            return this.valueEntered;
        }

        return true;
    }
}