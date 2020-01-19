'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PedidoItem extends Model {
  produto ()
  {
    return this.hasOne('App/Models/Produto', 'produto_id', 'id')
  }
}

module.exports = PedidoItem
