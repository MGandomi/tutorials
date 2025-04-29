/** @odoo-module **/

import {Component, useState} from "@odoo/owl";
import {TodoItem} from './todoItem';
import {useAutofocus} from '@awesome_owl/utils';

export class TodoList extends Component {
	static template = "awesome_owl.todoList";
	static components = {TodoItem};
	static props = {};

	setup() {
		this.todos = useState([]);
		this.nextId = 1;

		 this.inputRef = useAutofocus();
		 this.toggleState = this.toggleState.bind(this);
		 this.removeTodo = this.removeTodo.bind(this);
	}

	addTodo(ev) {
		if (ev.keyCode !== 13) return;
		const value = ev.target.value.trim();
		if (value) {
			this.todos.push({id: this.nextId++, description: value, isCompleted: false});
			ev.target.value = "";
		}
	}

	toggleState(id) {
		const todo = this.todos.find(t => t.id === id);
		if (todo) {
			todo.isCompleted = !todo.isCompleted;
		}
	}

	removeTodo(id) {
    const index = this.todos.findIndex(t => t.id === id);
    if (index >= 0) {
        this.todos.splice(index, 1);
    }
}


}