import models from '../../../models'
import { asyncMiddleware } from '../../../lib/middlewares'

import config from '../../../../config'

export const get = asyncMiddleware(async (req, res, next) => {
  const page = req.page
  const pageSize = req.pageSize

  try {
    const result = await models.Post.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize
    })

    res.set('x-page', page)
    res.set('x-page-size', pageSize)
    res.set('x-total-count', result.count)
    res.json(result.rows)
  } catch (err) {
    next(err)
  }
})

export const remove = asyncMiddleware(async (req, res, next) => {
  const id = req.params.id

  try {
    await models.Post.update(
      {
        deleted: true
      },
      {
        where: { id }
      }
    )

    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
