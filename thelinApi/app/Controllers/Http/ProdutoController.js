'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with produtos
 */

 const Produto = use('App/Models/Produto')
class ProdutoController {

  async index ({ request, response, view }) {
    const {page, pageSize} =  request.get()
    const produtos = await Produto.query().paginate(pageSize, page);
    return produtos
  }

  async store ({ request, response }) {
    const data = request.all()
    try {
      const produto = await Produto.create(data)
      return produto
    } catch (error) {
      response.status(409).send({error:error})
    }

  }

  async show ({ params, request, response, view }) {
    try {
      const produto = await Produto.findOrFail(params.id)
      return produto
    } catch (error) {
      return response.status(400).send({ error: 'Produto não encontrado' })
    }
  }

  async update ({ params, request, response }) {
    const data = request.all()
    try {
      const produto = await Produto.findOrFail(request.params.id)
      console.log(produto);
      produto.merge(data)
      await produto.save()
      return produto
    } catch (error) {

      console.log(error);
      response.status(409).send({error:"Produto não encontrado"})
    }
  }

  async destroy ({ params, request, response }) {
    try {
      const produto = await Produto.findOrFail(request.params.id)
      console.log(produto);
      produto.delete()
      return response.status(200).send({message:'Produto removido com sucesso'})
    } catch (error) {
      console.log(error);
      response.status(409).send({error:"Produto não encontrado"})
    }
  }
}

module.exports = ProdutoController
