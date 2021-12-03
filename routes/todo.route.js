const express = require('express')
const todoRoutes = express.Router()
const dbo = require('../db/connection')
const ObjectID = require('mongodb').ObjectId

let collection

function serverError(res, err) {
  res.status(500).send({
    err,
    message: 'Извините, ошибка на сервере.'
  })
}

todoRoutes.all('/', (req, res, next) => {
  collection = dbo.getDb().collection('todo')
  next()
})

//read all data
todoRoutes.get('/', async (req, res) => {
  try {
    const findResult = await collection.find({}).toArray()
    res.status(200).send(findResult)
  } catch (error) {
    serverError(res, err)
  }
})

//read data by id
todoRoutes.get('/:id', async (req, res) => {
  try {
    const {id} = req.params
    const details = {
      _id: new ObjectID(id)
    }
    const findResult = await collection.findOne(details)
    res.status(200).send(findResult)
  } catch (err) {
    serverError(res, err)
  }
})

  //write new data
todoRoutes.post('/', async (req, res) => {
  try {
    const data = req.body
    const result = await collection.insertOne({
      ...data,
      date: Date.now(),
    })
    res.status(201).send({
      ...data,
      _id: result.insertedId
    })      
  } catch (error) {
    serverError(res, err)
  }
})
  //delete data by id
todoRoutes.delete('/:id', async(req, res) => {
  try {
    const {id} = req.params
    const details = {
      _id: new ObjectID(id)
    }
    const result = await collection.deleteOne(details)
    res.status(202).send({
      ...result,
      _id: id
    })
  } catch (error) {
    serverError(res, err)
  }
})

//update data by id
todoRoutes.put('/:id', async (req, res) => {
  try {
    let data = req.body
    const details = {
      _id: new ObjectID(req.params.id)
    }
    delete data._id    
    const result = await collection.updateOne(details, {
      $set: { ...data } 
    })
    res.status(202).send({
      ...result,
      ...data,
      ...details
    })
  } catch (err) {
    serverError(res, err)
  }
})

module.exports = todoRoutes