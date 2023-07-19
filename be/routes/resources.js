const express = require('express');
const resource = express.Router();
const ResourceModel = require('../models/resourceModel');

// ! Chiamata get per tutti gli elementi
resource.get('/resources', async (req, res) => {
    try {
        const resources = await ResourceModel.find();
        res.status(200).send({
            statusCode: 200,
            message: 'File trovato ',
            resources
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server Error", 
            error
        });      
    }
})

// ! Chiamata get per tutti gli elementi ATTIVI
resource.get('/resource/active', (req, res) => {
    ResourceModel.find({isActive: true})
    .then(resource => 
        res.status(200).send({
            statusCode: 200,
            resource
        }))
    .catch(error => res.status(500).send({
        statusCode: 500,
        error
    }))
});

// ! Chiamata get per tutti gli elementi con età maggiore di 26
resource.get('/resource/age26', (req, res) => {
    ResourceModel.find({age: {$gt:26}})
    .then(resource => 
        res.status(200).send({
            statusCode: 200,
            resource
        }))
    .catch(error => res.status(500).send({
        statusCode: 500,
        error
    }))
});

// ! Chiamata get per tutti gli elementi con età comrpesa tra 26 e 30 (30 compreso)
resource.get('/resource/age26-30', (req, res) => {
    ResourceModel.find({$and: [{age:{$gt:26}},{age:{$lte:30}}]})
    .then(resource => 
        res.status(200).send({
            statusCode: 200,
            resource
        }))
    .catch(error => res.status(500).send({
        statusCode: 500,
        error
    }))
});

// ! Chiamata get per tutti gli elementi con occhi blue OPPURE marroni
resource.get('/resource/eyeColor', (req, res) => {
    ResourceModel.find({$or:[{eyeColor: "brown"},{eyeColor: "blue"}]})
    .then(resource => 
        res.status(200).send({
            statusCode: 200,
            resource
        }))
    .catch(error => res.status(500).send({
        statusCode: 500,
        error
    }))
});

// ! Chiamata get per tutti gli elementi che NON contengono gli occhi VERDI
resource.get('/resource/eyeColorNotGreen', (req, res) => {
    ResourceModel.find({eyeColor: {$not: {$regex: 'green'}}})
    .then(resource => 
        res.status(200).send({
            statusCode: 200,
            resource
        }))
    .catch(error => res.status(500).send({
        statusCode: 500,
        error
    }))
});

// ! Chiamata get per tutti gli elementi che NON contengono gli occhi VERDI E BLUE
resource.get('/resource/eyeColorNotGreenAndBlue', (req, res) => {
    ResourceModel.find({$and: [{eyeColor: {$not: {$regex: 'green'}}},{eyeColor: {$not: {$regex: 'blue'}}}]})
    .then(resource => 
        res.status(200).send({
            statusCode: 200,
            resource
        }))
    .catch(error => res.status(500).send({
        statusCode: 500,
        error
    }))
});

// ! Chiamata get per tutti gli elementi con il dato company = FITCORE
resource.get('/resource/fitcore', (req, res) => {
    ResourceModel.find({company: {$regex: 'FITCORE'}})
    .then(resource => 
        res.status(200).send({
            statusCode: 200,
            resource
        }))
    .catch(error => res.status(500).send({
        statusCode: 500,
        error
    }))
});

// ! THE END
module.exports = resource;