from odoo import models

class PosSession(models.Model):
    _inherit = "pos.session"
    
    def _get_pos_ui_product_product(self, params):
        params['search_params']['fields'].append('stock_quant_ids')
        return super()._get_pos_ui_product_product(params)

    def _process_pos_ui_product_product(self, products):
        super()._process_pos_ui_product_product(products)
        
        for product in products:
            product['available_quantity'] = sum(self.env['stock.quant'].
                                        browse(product['stock_quant_ids']).
                                        filtered(lambda q: q.warehouse_id.id == self.config_id.warehouse_id.id).
                                        mapped('available_quantity'))
