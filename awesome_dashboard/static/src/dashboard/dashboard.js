/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { DashboardItem } from "./dashboardItem";
import { Dialog } from "@web/core/dialog/dialog";
import { CheckBox } from "@web/core/checkbox/checkbox";

class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";
    static components = { Layout, DashboardItem };

    setup() {
        this.action = useService("action");
        this.statistics = useState(useService("awesome_dashboard.statistics"));
        this.items = registry.category("awesome_dashboard").getAll() || [];
        this.disabledItems = useState(
            (localStorage.getItem("disabledDashboardItems")?.split(",") || [])
        );
        this.dialog = useService('dialog');
    }

    get filteredItems() {
        return this.items.filter(item => !this.disabledItems.includes(item.id));
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

    openSettings() {
        this.dialog.add(SettingsDialog, {
            items: this.items,
            disabledItems: this.disabledItems,
            onUpdateConfiguration: this.updateConfiguration.bind(this),
        });
    }

    updateConfiguration(newDisabledItems) {
        this.disabledItems = newDisabledItems;
        localStorage.setItem("disabledDashboardItems", newDisabledItems.join(","));
    }
}

class SettingsDialog extends Component {
    static template = "awesome_dashboard.SettingsDialog";
    static components = { Dialog, CheckBox };

    static props = ["close", "items", "disabledItems", "onUpdateConfiguration"];

    setup() {
        this.itemsState = useState(
            (this.props.items || []).map(item => ({
                ...item,
                enabled: !this.props.disabledItems.includes(item.id)
            }))
        );
    }

    done() {
        this.props.close();
    }

    onChange(checked, changedItem) {
        changedItem.enabled = checked;
        const newDisabledItems = this.itemsState.filter(
            (item) => !item.enabled
        ).map((item) => item.id);

        this.props.onUpdateConfiguration(newDisabledItems); // بروزرسانی وضعیت کامپوننت اصلی
    }
}

registry.category("lazy_components").add("AwesomeDashboard", AwesomeDashboard);
