'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClienteSchema extends Schema {
  up () {
    this.create('clientes', (table) => {
      table.increments()
      table.string('nome',100)
      table.string('sobrenome',100)
      table.string('telefone',20)
      table.string('telefone2',20)
      table.string('rua',200)
      table.string('bairro',100)
      table.string('cidade',10)
      table.string('numero',10)
      table.string('cep ',10)
      table.string('tipo ',20)
      table.timestamps()
    })
  }

  down () {
    this.drop('clientes')
  }
}

module.exports = ClienteSchema
