/** @odoo-module **/

import { Component } from "@odoo/owl";

export class NumberCard extends Component {}

NumberCard.template = "awesome_dashboard.NumberCard";
NumberCard.props = {
    title: String,
    value: [String, Number],
};
