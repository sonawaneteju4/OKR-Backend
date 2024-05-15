import {Router} from 'express'
import {getAllTickets, createTicket} from '../controller/ticket.controller.js'

const router = Router()
router.route('/getalltickets').get(getAllTickets)
router.route('/createnewticket').post(createTicket)

export default router;