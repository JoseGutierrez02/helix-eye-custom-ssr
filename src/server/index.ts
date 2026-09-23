import express, { Express, Request, Response } from 'express'
import { config } from './config'
import { render } from './render'
import axios from 'axios'
import { webpackMiddleware } from './middlewares/webpackMiddleware'

const app: Express = express()
const isDev = process.env.NODE_ENV !== 'production'

if (isDev) {
  app.use(webpackMiddleware())
} else {
  app.use(express.static('dist'))
}


app.get('/galaxias', async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get('https://images-api.nasa.gov/search?q=galaxies')

    const initialProps = {
      status: 'ready',
      galaxies: data?.collection?.items || []
    }

    res.send(render(req.url, initialProps))
  } catch (error) {
    console.error('Error fetching galaxies:', error)

    const initialProps = {
      status: 'error',
      galaxies: []
    }

    res.send(render(req.url, initialProps))
  }
})

app.get('/', (req: Request, res: Response) => {
  res.send(render(req.url))
})

app.listen(config.PORT, () => {
  console.log(`Server is running in http://localhost:${config.PORT}`)
})
