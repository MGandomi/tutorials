/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class Counter extends Component {
    static template = "awesome_owl.counter";
    static props = {
        onChange: { type: Function, optional: false },
        value: { type: Number, optional: false },
    };

    setup() {
        this.state = useState({ value: this.props.value });
    }

    increment() {
        this.state.value++;
        this.props.onChange();
    }
}
