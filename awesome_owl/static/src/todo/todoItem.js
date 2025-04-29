/** @odoo-module **/

import {Component, useState} from "@odoo/owl";

export class TodoItem extends Component {
	static template = "awesome_owl.todoItem";
	static props = {
		todo: { type: Object, optional: false },
	};

	setup() {


	}


}