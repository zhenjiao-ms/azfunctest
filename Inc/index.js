const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./config");
const dbContext = require("./databaseContext");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const newItem = {
        id: "student",
        owner:"teacher",
        video: "azure",
        viewedCount: "1",
      };
      
    if (req.query.name || (req.body && req.body.name)) {
        const { endpoint, databaseId, containerId } = config;
        
        const key = process.env["KeyToDB"];
        
        const client = new CosmosClient({ endpoint, key });
        const database = client.database(databaseId);
        const container = database.container(containerId);
        context.log(`start`); 
      
        // Make sure Tasks database is already setup. If not, create it.
        await dbContext.create(client, databaseId, containerId);
        context.log(`db created`); 

      
        try {
          // Create a new item
          const { resource: createdItem } = await container.items.create(newItem);
          context.log(`Created item: ${createdItem.id} - ${createdItem.owner}`); 
          context.log(`Created count to ${createdItem.viewedCount}\r\n`);      
        const {id} = createdItem;
          createdItem.viewedCount = "2";

          const { resource: updatedItem } = await container
            .item(id)
            .replace(createdItem);          
            context.log(`Updated item: ${updatedItem.id} - ${updatedItem.owner}`); 
            context.log(`Updated count to ${updatedItem.viewedCount}\r\n`);      
        }catch (err) {
            context.log(err.message);
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