/** @odoo-module **/

import {Component, useState} from "@odoo/owl";

import {registry} from "@web/core/registry";
import {Layout} from "@web/search/layout";
import {useService} from "@web/core/utils/hooks";
import {DashboardItem} from "./dashboardItem";
import {PieChart} from "./pie_chart/pie_chart";


class AwesomeDashboard extends Component {
	static template = "awesome_dashboard.AwesomeDashboard";
    static components = { Layout, DashboardItem, PieChart };


	setup() {
		this.action = useService("action");
		this.statistics = useState(useService("awesome_dashboard.statistics"));


	}


	openCustomers() {
		this.action.doAction("base.action_partner_form");
	}

	openLeads() {
		this.action.doAction({
			type: "ir.actions.act_window",
			name: "Leads",
			res_model: "crm.lead",
			view_mode: "list,form",
			views: [[false, "list"], [false, "form"]],
			target: "current",
		});
	}


}

registry.category("actions").add("awesome_dashboard.dashboard", AwesomeDashboard);
registry.category('components').add('awesome_dashboard.PieChart', PieChart);
