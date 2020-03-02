const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./config");
const dbContext = require("./databaseContext");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const newItem = {
        id: "3",
        category: "fun",
        name: "Cosmos DB",
        description: "Complete Cosmos DB Node.js Quickstart ⚡",
        isComplete: false
      };
      
    if (req.query.name || (req.body && req.body.name)) {
        const { endpoint, databaseId, containerId } = config;
        
        const key = process.env["KeyToDB"];
        
        const client = new CosmosClient({ endpoint, key });
        const database = client.database(databaseId);
        const container = database.container(containerId);
      
        // Make sure Tasks database is already setup. If not, create it.
        await dbContext.create(client, databaseId, containerId);

      
        try {
          // Create a new item
          const { resource: createdItem } = await container.items.create(newItem);
          console.log(`Created item: %s`, createdItem);
      
          const { id, category } = createdItem;
      
        }catch (err) {
            console.log(err.message);
        }
      
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Thanks for viewing the video, " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};