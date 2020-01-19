'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PedidoSchema extends Schema {
  up () {
    this.create('pedidos', (table) => {
      table.increments()
      table.integer('atendente_id')
      .references('id')
      .inTable('clientes')
      .notNullable()
      table.integer('cliente_id')
      .references('id')
      .inTable('clientes')
      table.integer('mesa')
      table.string('tipo_pedido')
      table.decimal('desconto')
      table.timestamps()
    })
  }

  down () {
    this.drop('pedidos')
  }
}

module.exports = PedidoSchema
