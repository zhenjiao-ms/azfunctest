// @ts-check

const config = {
  endpoint: "https://wechatdemo.documents.azure.com:443/",
  key: "",
  databaseId: "Tasks",
  containerId: "Items",
  partitionKey: { kind: "Hash", paths: ["/category"] }
};

module.exports = config;
