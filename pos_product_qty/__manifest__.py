{
    'name': 'Product Qty on Hand in POS',
    'description': '''
        This module adds the product qty on hand inside the product widget on pos
        and enables an auto update for the value on a defined interval
    ''',
    'license': 'OPL-1',
    'author': 'LEML-JLOM-RALB',
    'maintainer': 'LEML-JLOM-RALB',
    'website': '',
    'category': 'Point of Sale',
    'version': '1.0.0',
    'depends': [
        'point_of_sale'
    ],
    'data': [
    ],
    'assets': {
        'point_of_sale._assets_pos': [
            'pos_product_qty/static/src/**/*'
        ]
    }
}
