const express = require('express')
const {
    registerDeveloper,
    getAllDevelopers,
    getDeveloperByHandle,
    getDeveloperById,
    deleteDeveloperById,
    updateDeveloperInfo,
} = require('../controllers/developersController')

const router = express.Router()

router.get('/', getAllDevelopers)

router.get('/:id', getDeveloperById)

//router.get('/:handle', getDeveloperByHandle)

router.post('/', registerDeveloper)

router.delete('/:id', deleteDeveloperById)

router.patch('/:id', updateDeveloperInfo)

module.exports = router;