/** @odoo-module */

import { _t } from "@web/core/l10n/translation";
import { patch } from "@web/core/utils/patch";
import { PaymentScreen } from "@point_of_sale/app/screens/payment_screen/payment_screen";
import { NoStockPopup } from "@pos_product_qty/app/errors/popups/no_stock_popup";


patch(PaymentScreen.prototype, {

    async validateOrder(isForceValidate) {
        console.log(this.pos.selectedOrder.orderlines);
        const productIds = this.pos.selectedOrder.orderlines.map(line => line.product.id)
        const result = await this.orm.silent.call('product.product', 'get_products_qty', [productIds, this.pos.config.warehouse_id])
        const noStockLines = [];
        for (const id in result) {
            if (result[id] == 0){
                noStockLines.push(this.pos.selectedOrder.orderlines.filter(line => line.product.id == id).map(line => line.full_product_name)[0]);
            }
          }
        if (noStockLines.length > 0){
            this.popup.add(NoStockPopup, { 
                keepBehind: true, 
                validateOrder: super.validateOrder.bind(this, isForceValidate),
                productNames: noStockLines,
            });
            return false;
        }
        super.validateOrder(isForceValidate); 
    }
});
