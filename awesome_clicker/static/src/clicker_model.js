// مدل کلیکر با اصلاحات برای خرید multiplier

import { Reactive } from "@web/core/utils/reactive";
import { EventBus } from "@odoo/owl";
import { rewards } from "./click_rewards";
import { choose } from "./utils";

export class ClickerModel extends Reactive {
    constructor() {
        super();
        this.clicks = 0;
        this.level = 0;
        this.bus = new EventBus();
        this.bots = {
            clickbot: {
                price: 10,
                level: 1,
                increment: 10,
                purchased: 0,
            },
            bigbot: {
                price: 100,
                level: 2,
                increment: 100,
                purchased: 0,
            }
        };
        this.multiplier = 1;
    }

    addClick() {
        this.increment(1);
    }

    tick() {
        for (const bot in this.bots) {
            this.clicks += this.bots[bot].increment * this.bots[bot].purchased * this.multiplier;
        }
    }

    // خرید multiplier با قیمت پایین‌تر
    buyMultiplier() {
        if (this.clicks < 100) {  // قیمت خرید multiplier رو به 100 تغییر دادیم
            return false;
        }
        this.clicks -= 100;  // کاهش کلیک‌ها پس از خرید multiplier
        this.multiplier++;   // افزایش multiplier
        return true;         // تایید اینکه خرید موفقیت‌آمیز بوده
    }

    increment(inc) {
        this.clicks += inc;
        if (
            this.milestones[this.level] &&
            this.clicks >= this.milestones[this.level].clicks
        ) {
            this.bus.trigger("MILESTONE", this.milestones[this.level]);
            this.level += 1;
        }
    }

    buyBot(name) {
        if (!Object.keys(this.bots).includes(name)) {
            throw new Error(`Invalid bot name ${name}`);
        }
        if (this.clicks < this.bots[name].price) {
            return false;
        }

        this.clicks -= this.bots[name].price;
        this.bots[name].purchased += 1;
    }

    giveReward() {
        const availableReward = [];
        for (const reward of rewards) {
            if (reward.minLevel <= this.level || !reward.minLevel) {
                if (reward.maxLevel >= this.level || !reward.maxLevel) {
                    availableReward.push(reward);
                }
            }
        }
        const reward = choose(availableReward);
        this.bus.trigger("REWARD", reward);
        return reward;
    }

    get milestones() {
        return [
            { clicks: 5, unlock: "clickBot" },
            { clicks: 20, unlock: "bigBot" },
            { clicks: 200, unlock: "power multiplier" },
        ];
    }
}
