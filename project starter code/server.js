import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util.js';


  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get("/filteredimage", async (req, res) => {

    try {
        const image_url = req.query.image_url.toString();

        //the image_url query check validate
        if (!image_url) {
            res.status(404).send("Image URL is not found.");
        } else {
            // call method filter the image
            const filteredImage = await filterImageFromURL(image_url);

            //Result response
            res.status(200).sendFile(filteredImage);

            res.on('finish', function () {
                // delete file local
                deleteLocalFiles[filteredImage];
            });

        }
    } catch (error) {
        console.log('Error', error);
        res.status(422).send(`[${error.errno}] Exception error occurred, please check server logs. `);
    }

  });

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
