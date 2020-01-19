'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with clientes
 */

 const Cliente = use('App/Models/Cliente')

class ClienteController {

  async index ({ request, response, view }) {
    const {page, pageSize} =  request.get()
    const clientes = await Cliente.query().paginate(pageSize, page);
    return clientes
  }

  async store ({ request, response }) {
    const data = request.all()
    try {
      const cliente = await Cliente.create(data)
      return cliente
    } catch (error) {
      console.log(error);
      response.status(409).send({error:error})
    }

  }

  async show ({ params, request, response, view }) {
    try {
      const cliente = await Cliente.findOrFail(params.id)
      return cliente
    } catch (error) {
      return response.status(400).send({ error: 'Cliente não encontrado' })
    }
  }

  async update ({ params, request, response }) {
    const data = request.all()
    try {
      const cliente = await Cliente.findOrFail(request.params.id)
      console.log(cliente);
      cliente.merge(data)
      await cliente.save()
      return cliente
    } catch (error) {

      console.log(error);
      response.status(409).send({error:"Cliente não encontrado"})
    }
  }

  async destroy ({ params, request, response }) {
    try {
      const cliente = await Cliente.findOrFail(request.params.id)
      console.log(cliente);
      cliente.delete()
      return response.status(200).send({message:'Cliente removido com sucesso'})
    } catch (error) {
      console.log(error);
      response.status(409).send({error:"Cliente não encontrado"})
    }
  }
}

module.exports = ClienteController
