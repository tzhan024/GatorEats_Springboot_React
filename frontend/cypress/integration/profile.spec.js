/// <reference types="cypress" />

describe("user signin", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/user/profile");
  });
  it("shoud have the following components", () => {
    cy.get("div").contains("GatorEats");
    cy.contains("Restaurant");
    cy.contains("Orders");
    cy.contains("Shopping Cart");
    cy.contains("Account");
    cy.get("#search");
    cy.get("div").contains("Search");
    cy.contains("Email");
    cy.get("#email");
    cy.contains("Address");
    cy.get("#address");
    cy.contains("City");
    cy.get("#city");
    cy.contains("State");
    cy.contains("Zip");
    cy.get("#zipcode");
  });
});
