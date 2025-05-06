/** @odoo-module **/

import {loadJS} from "@web/core/assets";
import {Component, onMounted, onWillStart, onWillUnmount, useRef} from "@odoo/owl";

export class PieChart extends Component {
	static template = "awesome_dashboard.PieChart";
	static props = {
		label: String,
		data: Object,
	};

	setup() {
		this.canvasRef = useRef("canvas");
		onWillStart(() => loadJS("/web/static/lib/Chart/Chart.js"));
		onMounted(() => {
			this.renderChart();
		});
		onWillUnmount(() => {
			this.chart?.destroy();
		});
	}

	renderChart() {
		const labels = Object.keys(this.props.data);
		const data = Object.values(this.props.data);

		const colors = [
			'#FF5733',
			'#ADD8E6',
			'#003366',
		];

		const chartColors = colors.slice(0, labels.length);
		this.chart = new Chart(this.canvasRef.el, {
			type: "pie",
			data: {
				labels,
				datasets: [{
					label: this.props.label,
					data,
					backgroundColor: chartColors,
				}],
			},
		});
	}

}
