import {Router} from 'express'
import {getAllTickets, createTicket, getTicketById, updateTicket} from '../controller/ticket.controller.js'

const router = Router()
router.route('/getalltickets').get(getAllTickets)
router.route('/createnewticket').post(createTicket)
router.route('/getTicketById/:id').get(getTicketById)
router.route('/updateTicket/:id').get(updateTicket)



export default router;