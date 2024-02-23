/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { PosStore } from "@point_of_sale/app/store/pos_store";

patch(PosStore.prototype, {
    async addProductFromUi(product, options) {
        const result = super.addProductFromUi(product, options);
        const order = this.get_order();
        const selectedLine = order.get_selected_orderline();
        product.offset = selectedLine.quantity;
        return result;
    },
});
