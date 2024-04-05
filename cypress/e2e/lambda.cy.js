const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
  accessKeyId: "AKIAT2ZYTAFKX32ZRDF5",
  secretAccessKey: "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",
});
const s3 = new AWS.S3({});
describe("Lambda Function Integration Test", () => {
  it("should invoke Lambda function successfully", async () => {
    const lambda = new AWS.Lambda();

    const params = {
      FunctionName: "Lambda-to-S3-PutObjectFunction-sAOV1zZ2HgUc",
    };

    const result = await lambda.invoke(params).promise();

    expect(result.StatusCode).to.equal(200);

    const payload = JSON.parse(result.Payload);
    expect(payload).to.equal(true);
  });
  it("should get the file from S3 and check its content", async () => {
    cy.exec("bash scripts/getS3Object.sh").then((result) => {
      // verify script result
      expect(result.code).to.eq(0);
      cy.log(result.stdout);
    });
  });
});
