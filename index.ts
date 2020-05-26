require("reflect-metadata");
import {createConnection} from "typeorm";
let express = require('express');
let bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
//import * as specs from "./swagger";
const cors = require('cors');
const router = express.Router();
const authRouter = require('./src/routes/auth');
const storiesRouter = require('./src/routes/stories');
const authenticate = require('./src/middlewares').authenticate;



const swaggerJsdoc = require("swagger-jsdoc");
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Time to document that Express API you built",
      version: "1.0.0",
      description:
        "A test project to understand how easy it is to document and Express API",
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/"
      },
      contact: {
        name: "Swagger",
        url: "https://swagger.io",
        email: "Info@SmartBear.com"
      }
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1"
      }
    ]
  },
   apis: ["./src/routes/*", "./src/entity/*"],
};
const specs = swaggerJsdoc(options);


createConnection().then(async connection => {
    function makeServer() {
        // create express app
        const app = express();
        app.use(bodyParser.json());
        app.use(cors());
        //app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
       
        router.use(authRouter);
        router.use("/stories", authenticate, storiesRouter);
        app.use('/api/v1', router);
         app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}));
       
      
        // start express server
        app.set('domain', '172.31.5.79');
        const server = app.listen(3000);
        console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");
        return app
        
    }
    
    let app = makeServer()
    

}).catch(error => console.log(error));

