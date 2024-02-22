/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { PosStore } from "@point_of_sale/app/store/pos_store";

patch(PosStore.prototype, {
    async addProductFromUi(product, options) {
        const result = super.addProductFromUi(product, options);
        product.offset = options.quantity;
        return result;
    },
});
