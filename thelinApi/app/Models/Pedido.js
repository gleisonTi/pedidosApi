'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pedido extends Model {

  cliente ()
  {
    return this.hasOne('App/Models/Cliente','cliente_id', 'id')
  }
  representate ()
  {
    return this.hasOne('App/Models/Cliente','atendente_id','id')
  }

  pedidoitens ()
  {
    return this.hasMany('App/Models/PedidoItem','id', 'pedido_id')
  }
}

module.exports = Pedido
