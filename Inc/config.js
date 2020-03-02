// @ts-check

const config = {
  endpoint: "https://wechatdemo.documents.azure.com:443/",
  key: "yScvG76WQloUaOmJwKFNop7Q7dj94qPYmmaYqTtVz90uCJi44XShaIMUqpUwiKBarnJMu9bGNTLJc6ugN7jYEA==",
  databaseId: "Tasks",
  containerId: "Items",
  partitionKey: { kind: "Hash", paths: ["/category"] }
};

module.exports = config;
