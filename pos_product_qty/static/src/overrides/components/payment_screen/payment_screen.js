/** @odoo-module */

import { _t } from "@web/core/l10n/translation";
import { patch } from "@web/core/utils/patch";
import { PaymentScreen } from "@point_of_sale/app/screens/payment_screen/payment_screen";
import { NoStockPopup } from "@pos_product_qty/app/errors/popups/no_stock_popup";
import { ErrorPopup } from "@point_of_sale/app/errors/popups/error_popup";

patch(PaymentScreen.prototype, {

    async validateOrder(isForceValidate) {
        const productIds = this.pos.selectedOrder.orderlines.map(line => line.product.id)
        const result = await this.orm.silent.call('product.product', 'get_products_qty', [productIds, this.pos.config.warehouse_id])
        const noStockLines = [];
        for (const id in result) {
            let orderLine = this.pos.selectedOrder.orderlines.filter(line => line.product.id == id)[0];
            if (result[id] - orderLine.quantity < 0){
                noStockLines.push(orderLine.full_product_name);
            }
          }
        if (noStockLines.length > 0){
            const { confirmed } = await this.popup.add(NoStockPopup, { 
                productNames: noStockLines,
            });
            if (!confirmed) {
                return false;
            }
        }
        super.validateOrder(isForceValidate); 
    }
});
