/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class Counter extends Component {
    static template = "awesome_owl.counter"; // link to component
	static props = {};

    setup(){
        this.state = useState({value: 0});
    }

    increment(){
        this.state.value++;
    }
}
