const config = require('config')
const firebaseService = require('../services/firebaseService')
const Actor = require('../models/Actor')
class ActorController {
    addActor = async (req, res) => {
        try {
            const data = JSON.parse(req.body.data)
            const file = req.file
            let roles = data.roles.split(',')
            roles = roles.map((role) => {
                return role.trim()
            })
            const filePath = await firebaseService.uploadFile(
                config.get('actorsFolder'),
                file
            )
            const actor = Actor({
                image: filePath,
                'name.first': data.name,
                'name.last': data.lastname,
                'born.date': data.bornDate,
                'born.location': data.bornLocation,
                died: data.diedDate,
                'married.marriedOn': data.marriedOn,
                'married.marriedAt': data.marriedAtDate,
                brokeUpAt: data.brokeUpAtDate,
                'parents.father': data.father,
                'parents.mother': data.mother,
                roles: roles,
                shortInfo: data.shortInfo,
            })
            console.log(actor)
            await actor.save()
            return res.status(201).json(actor)
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Server Error' })
        }
    }
    searchActor = async (req, res) => {
        try {
            const { inputValue } = req.body
            
            const actors = await Actor.find({
                $or: [
                    { 'name.first': { $regex: String(inputValue), $options: 'i' } },
                    { 'name.last': { $regex: String(inputValue), $options: 'i' } },
                ],
            })
            return res.status(200).json({ actors })
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Server Error' })
        }
    }
    findActorById = async (req, res) => {
        try {
            const { id } = req.params
            const actor = await Actor.findById(id)
            return res.status(200).json({ actor })
            
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Server Error' })
        }
    }
}

module.exports = new ActorController()
