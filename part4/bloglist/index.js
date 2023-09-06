const config = require('./utils/config')
const middleware = require('./utils/middleware')
const app = require('./app')

app.listen(config.PORT, () => {
  middleware.info(`Server running on port ${config.PORT}`)
})