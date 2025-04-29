/** @odoo-module **/

import { Component, useState, markup } from "@odoo/owl";
import { Counter } from './counter/counter';
import { Card } from './card/card';

export class Playground extends Component {
    static template = "awesome_owl.playground";
    static components = { Counter, Card };
	static props={}

    setup() {
        this.sum = useState({ value: 0 });
        this.xml1 = markup("<div>This is the content of card 1</div>");
        this.xml2 = markup("<div>This is the content of card 2</div>");

		this.incrementSum = this.incrementSum.bind(this);
    }

    incrementSum() {
        this.sum.value += 1;
    }
}
