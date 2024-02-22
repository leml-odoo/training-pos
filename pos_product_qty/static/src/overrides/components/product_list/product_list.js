/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { ConnectionLostError } from "@web/core/network/rpc_service";
import { ProductsWidget } from "@point_of_sale/app/screens/product_screen/product_list/product_list";
import { onMounted, onWillUnmount } from "@odoo/owl"

patch(ProductsWidget.prototype, {
    setup() {
        super.setup(),
        onMounted(() => {
            this.updateProductQtyInterval = setInterval(() => {
                if (this.pos.synch.status != 'disconnected') {
                    this.updateQtyOnHand(this.productsToDisplay)
                }
            }, 10000);
        })

        onWillUnmount(() => {
            clearInterval(this.interval);
            this.updateProductQtyInterval = null
        });
    },

    async updateQtyOnHand(productsList) {
        const productIds = productsList.map((p) => p.id)
        this.pos.set_synch('connecting', productIds.length)
        try {
            const result = await this.orm.silent.call('product.product', 'get_products_qty', [productIds, this.pos.config.warehouse_id])
            this.pos.set_synch('connected')
            productsList.forEach((p) => p.available_quantity = result[p.id])
        } catch(error) {
            if (error instanceof ConnectionLostError) {
                this.pos.set_synch('disconnected')
            }
        }
    }
})
