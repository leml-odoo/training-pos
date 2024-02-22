/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";

patch(ProductScreen.prototype, {
    async updateSelectedOrderline({ buffer, key }) {
        const result = super.updateSelectedOrderline(...arguments);
        const order = this.pos.get_order();
        const selectedLine = order.get_selected_orderline();
        if (!selectedLine) {
            return result;
        }
        selectedLine.product.offset = buffer;
        return result;
    },
});
