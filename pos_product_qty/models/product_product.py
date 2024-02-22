from odoo import models

class ProductProduct(models.Model):
    _inherit = "product.product"
    
    def get_products_qty(self, warehouse_id):
        
        result = {
           product.id: sum(product.stock_quant_ids.
                           filtered(lambda q: q.warehouse_id.id == warehouse_id[0]).
                           mapped(lambda q: q.available_quantity))
           for product in self
        }
        return result 
            
