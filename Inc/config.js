// @ts-check

const config = {
  endpoint: "https://wechatdemo.documents.azure.com:443/",
  databaseId: "Tasks",
  containerId: "Items",
  partitionKey: { kind: "Hash", paths: ["/category"] }
};

module.exports = config;
