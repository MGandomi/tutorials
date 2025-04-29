/** @odoo-module **/

import { onMounted, useRef } from "@odoo/owl";


/**
 * Custom hook to autofocus an input element
 */
export function useAutofocus() {
    const inputRef = useRef('input');

    onMounted(() => {
        if (inputRef.el) {
            inputRef.el.focus();
        }
    });

    return inputRef;
}
