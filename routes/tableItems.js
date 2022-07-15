import { Router } from 'express'
import { getAll } from '../controllers/tableItems.js'

const router = Router()

router.get('/api/table-items', getAll)

export default router