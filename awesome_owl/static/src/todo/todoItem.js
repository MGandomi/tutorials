/** @odoo-module **/

import {Component} from "@odoo/owl";

export class TodoItem extends Component {
	static template = "awesome_owl.todoItem";
	static props = {
		todo: {type: Object, optional: false},
		toggleState: {type: Function, optional: false},
		removeTodo: { type: Function, optional: true }
	};


	setup() {


	}


}