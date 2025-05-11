/** @odoo-module **/

import {Component, xml} from "@odoo/owl";

export class DashboardItem extends Component {
	static props = {
		size: {type: Number, optional: true, default: 1},
	};

	get style() {
		const width = 18 * this.props.size;
		return `
      width: ${width}rem;
      min-height: 10rem;
      flex-grow: 1;
    `;
	}

	static template = xml/* xml */`
    <div class="dashboard_item" t-att-style="style">
      <t t-slot="default" />
    </div>
  `;
}
