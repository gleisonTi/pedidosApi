'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PedidoItemSchema extends Schema {
  up () {
    this.create('pedido_items', (table) => {
      table.increments()
      table.integer('pedido_id')
      .references('id')
      .inTable('pedidos')
      .notNullable()
      table.integer('produto_id')
      .references('id')
      .inTable('produtos')
      .notNullable()
      table.integer('quantidade')
      table.integer('valor_total_item')
      table.integer('observação')
      table.timestamps()
    })
  }

  down () {
    this.drop('pedido_items')
  }
}

module.exports = PedidoItemSchema
