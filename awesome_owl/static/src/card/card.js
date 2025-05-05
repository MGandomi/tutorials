/** @odoo-module **/

import { Component, xml } from "@odoo/owl";

export class Card extends Component {
    static template = "awesome_owl.card";
    static props = {
        title: { type: String },
        isMarkup: { type: Boolean, optional: true },
	     slots: {
             type: Object,
             shape: {
                 default: true
             },
         }
    };
}
