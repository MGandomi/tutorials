/** @odoo-module **/

import {Component, useState } from "@odoo/owl";
import {TodoItem} from './todoItem';
import { useAutofocus } from '@awesome_owl/utils';

export class TodoList extends Component {
	static template = "awesome_owl.todoList";
	static components = {TodoItem};
	static props = {};

	setup() {
		this.todos = useState([]);
		this.nextId = 1;

		 this.inputRef = useAutofocus();
	}

	addTodo(ev) {
		if (ev.keyCode !== 13) return;
		const value = ev.target.value.trim();
		if (value) {
			this.todos.push({id: this.nextId++, description: value, isCompleted: false});
			ev.target.value = "";
		}
	}


}