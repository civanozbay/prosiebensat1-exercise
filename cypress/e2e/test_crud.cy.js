const apiUrl = Cypress.env("apiUrl");

describe("API Gateway with Lambda Token Authorizer Tests", () => {
  it("Should return 401 Forbidden if authorizationToken header is missing", () => {
    cy.log(apiUrl);
    cy.request({
      method: "GET",
      url: apiUrl,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
  it('Should return 401 Unauthorized if authorizationToken header is "unauthorized"', () => {
    cy.request({
      method: "GET",
      url: apiUrl,
      headers: {
        authorizationToken: "unauthorized",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
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
    });
  });
});
