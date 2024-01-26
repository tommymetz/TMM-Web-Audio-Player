import express from 'express'
import http from 'http'
import { pathToFileURL, fileURLToPath } from 'url'
import { dirname } from 'path'
import { engine } from 'express-handlebars'

const app = express()
app.set('port', process.env.PORT || 3000)
export const server = http.createServer(app)
app.engine('.hbs', engine({extname: '.hbs', defaultLayout: 'main'}))
app.set('view engine', '.hbs')

////////////////////////////////////////////////////////////////////////////////
//Setup/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const setupApp = async () => {

  //Middleware//////////////////////////////////////////////////////////////////
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  app.use(express.static(__dirname + '/public', {index: false, maxAge: 1000 * 60 * 60 * 24 * 7 } ))
  app.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    next();
  });

  app.get('/', function(req, res){
    res.render('home')
  })
}

//Final/////////////////////////////////////////////////////////////////////////
export const startServer = async () => {
  await setupApp()
  server.listen(app.get('port'), () => {
    console.log(app.get('env')+' mode http://localhost:'+app.get('port'))
  })
}

export const stopServer = () => {
  server.close()
}

if(import.meta.url === pathToFileURL(process.argv[1]).href) startServer()
