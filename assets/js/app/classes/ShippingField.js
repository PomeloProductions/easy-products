/**
 * Created by bryce on 2/16/17.
 */

export class ShippingField {

    /**
     * Default constructor for a field
     *
     * @param field HTMLNode
     * @param changeCallback Function
     * @param cookieFactory CookieFactory
     * @param cookieKey The key for the stored cookie
     */
    constructor (field, changeCallback, cookieFactory, cookieKey) {

        this.field = field;
        this.changeCallback = changeCallback;
        this.cookieFactory = cookieFactory;
        this.cookieKey = cookieKey;

        this.valueEntered = false;
        this.required = this.field.hasAttribute('required');

        this.blankValue = this.field.dataset['blank_value'];

        let storedValue = this.cookieFactory.loadCookie(this.cookieKey);

        if (storedValue) {
            this.field.value = storedValue;
            this.checkInputValue();
        }

        this.field.addEventListener('change', this.verifyInputValue.bind(this));
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
     * double checks input value when it changes to verify a value was entered properly
     */
    verifyInputValue () {
        this.checkInputValue();

        if (this.valueEntered) {
            this.cookieFactory.saveCookie(this.cookieKey, this.field.value);
            this.changeCallback();
        }
    }

    /**
     * Checks whether or not this field is ready for submission
     *
     * @returns Boolean
     */
    checkIfComplete () {

        return this.required ? this.valueEntered : true;
    }
}