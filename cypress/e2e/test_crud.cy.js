const apiUrl = Cypress.env("apiUrl");

describe("API Gateway with Lambda Token Authorizer Tests", () => {
  it("Should return 401 Forbidden if authorizationToken header is missing", () => {
    cy.request({
      method: "GET",
      url: apiUrl,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.headers).to.have.property("content-length");
      expect(response.body).to.have.property("message", "Unauthorized");
      expect(response.duration).to.be.lessThan(1000);
    });
  });
  it("Should return 403 Unauthorized if http method is POST", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      headers: {},
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.headers).to.have.property("content-length");
      expect(response.body).to.have.property(
        "message",
        "Missing Authentication Token"
      );
      expect(response.duration).to.be.lessThan(1000);
    });
  });

  it('Should return 403 if authorizationToken header is "Bearer deny"', () => {
    cy.request({
      method: "GET",
      url: apiUrl,
      headers: {
        authorizationToken: "Bearer deny",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.headers).to.have.property("content-length");
      expect(response.body).to.have.property(
        "Message",
        "User is not authorized to access this resource with an explicit deny"
      );
      expect(response.duration).to.be.lessThan(1000);
    });
  });

  it('Should successfully invoke Lambda integration and return 200 if authorizationToken header is "Bearer allow"', () => {
    cy.request({
      method: "GET",
      url: apiUrl,
      headers: {
        authorizationToken: "Bearer allow",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.headers).to.have.property("content-length");
      expect(response.body).to.have.property("body", null);
      expect(response.duration).to.be.lessThan(1000);
    });
  });

  it("Should return 500 for any other authorizationToken header values", () => {
    cy.request({
      method: "GET",
      url: apiUrl,
      headers: {
        authorizationToken: "Bearer unknownValue",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(500);
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.headers).to.have.property("content-length");
      expect(response.duration).to.be.lessThan(1000);
    });
  });
});
