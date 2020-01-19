'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pedidos
 */

const Pedido = use('App/Models/Pedido')
class PedidoController {
  async index ({ request, response, view }) {
    const {page, pageSize} =  request.get()
    const pedidos = await Pedido.query()
    .with('pedidoitens.produto')
    .with('cliente')
    .with('representate')
    .paginate(pageSize, page);
    return pedidos
  }

  async store ({ request, response }) {
    const data = request.all()
    try {
      const pedido = await Pedido.create(data)

      return pedido
    } catch (error) {
      console.log(error);
      response.status(409).send({error:error})
    }

  }

  async show ({ params, request, response, view }) {
    try {
      const pedido = await Pedido.findOrFail(params.id)
      await pedido.load('pedidoitens.produto')
      await pedido.load('cliente')
      await pedido.load('representate')

      return pedido
    } catch (error) {
      console.log(error);
      return response.status(400).send({ error: 'Pedido não encontrado' })
    }
  }

  async update ({ params, request, response }) {
    const data = request.all()
    try {
      const pedido = await Pedido.findOrFail(request.params.id)
      console.log(pedido);
      pedido.merge(data)
      await pedido.save()
      return pedido
    } catch (error) {

      console.log(error);
      response.status(409).send({error:"Pedido não encontrado"})
    }
  }

  async destroy ({ params, request, response }) {
    try {
      const pedido = await Pedido.findOrFail(request.params.id)
      console.log(pedido);
      pedido.delete()
      return response.status(200).send({message:'Pedido removido com sucesso'})
    } catch (error) {
      console.log(error);
      response.status(409).send({error:"Pedido não encontrado"})
    }
  }
}

module.exports = PedidoController
