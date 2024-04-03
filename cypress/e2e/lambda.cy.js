const AWS = require("aws-sdk");
const { it } = require("mocha");
const s3 = new AWS.S3();
const lambda = new AWS.Lambda();

const bucketName = "hellooo-world";
const objectKey = "filename.txt";
const expectedContent = "Hello World";

describe("Lambda to S3", () => {
  it("Lambda Test", () => {
    async function testLambdaWritesToS3() {
      // Lambda fonksiyonunu tetikle
      await lambda
        .invoke({
          FunctionName: "Lambda-to-S3-PutObjectFunction-sAOV1zZ2HgUc",
          // Lambda fonksiyonunuza ek parametreler göndermeniz gerekiyorsa, Payload alanını kullanın.
        })
        .promise();

      // Bekleme (Lambda fonksiyonunun ve S3'e yazmanın tamamlanması için)
      await new Promise((resolve) => setTimeout(resolve, 5000));

      // S3'ten dosyayı al ve içeriğini kontrol et
      const object = await s3
        .getObject({
          Bucket: bucketName,
          Key: objectKey,
        })
        .promise();

      const content = object.Body.toString("utf-8");
      console.assert(
        content === expectedContent,
        "Dosya içeriği beklenen ile uyuşmuyor."
      );

      cy.log(
        "Test başarılı: Lambda fonksiyonu S3 bucketına doğru içerikle dosya yazdı."
      );
    }

    testLambdaWritesToS3().catch(console.error);
  });
});
