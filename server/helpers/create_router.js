const express = require('express')
const ObjectId = require('mongodb').ObjectID

const createRouter = function(collection){

  const router = express.Router()

  router.get('/', (req, res) => {
    collection
    .find()
    .toArray()
    .then((docs) => res.json(docs))
  })

  router.get('/:id', (req, res) => {
    const id = req.params.id
    collection
    .find({_id: ObjectId(id)})
    .toArray()
    .then((docs) => res.json(docs))
  })

  return router
}


module.exports = createRouter
