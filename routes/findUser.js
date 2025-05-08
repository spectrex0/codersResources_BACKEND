import express from 'express'
import { Router } from 'express'

const findUser = Router()

findUser.use('findUser', async (req, res) => {
    const {userById} = req.body;
})



module.exports = {
    findUser
}