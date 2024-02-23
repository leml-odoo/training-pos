/** @odoo-module */

import { _t } from "@web/core/l10n/translation";
import { onMounted } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { AbstractAwaitablePopup } from "@point_of_sale/app/popup/abstract_awaitable_popup";

export class NoStockPopup extends AbstractAwaitablePopup {
    static template = "pos_product_qty.NoStockPopup";
    static defaultProps = {
        confirmText: _t("Continue"),
        cancelText: _t("Return"),
        title: _t('No stock!'),
        cancelKey: false,
        sound: true,
    };

    setup() {
        super.setup();
        onMounted(this.onMounted);
        this.sound = useService("sound");
        this.validateOrder = this.props.validateOrder;
        this.body1 = _t(
            "There is no stock of the product%s:", 
            this.props.productNames.length == 1 ? '' : 's'
            );
        this.body2 = _t("Do you still want to continue?");
    }

    onMounted() {
        if (this.sound) {
            this.sound.play("error");
        }
    }

    confirm() {
        super.cancel()
        this.validateOrder();
    }
}
