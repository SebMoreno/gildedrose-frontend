import {Item} from "../../src/interfaces/item";

export class ItemsListPage {
  private static readonly addItemButton = ".list-add-button";
  private static readonly deleteItemButton = "[data-automation=list-delete-button]";
  private static readonly editItemButton = "[data-automation=list-edit-button]";
  private static readonly nameInput = "[data-automation=item-form-name]";
  private static readonly sellInInput = "[data-automation=item-form-sell-in]";
  private static readonly qualityInput = "[data-automation=item-form-quality]";
  private static readonly typeInput = "[data-automation=item-form-type]";
  private static readonly matOption = "mat-option";
  private static readonly itemFormConfirmButton = "[data-automation=item-form-confirm-button]";
  private static readonly deleteItemConfirmButton = "[data-automation=delete-dialog-confirm-button]";
  private static readonly getItemsRequestAlias = "getItems";
  private static readonly deleteItemRequestAlias = "deleteItem";
  private static readonly itemsListAlias = "itemsList";
  private static readonly loadingSpinner = ".list-empty .mat-progress-spinner";
  private static readonly itemsListRows = "[data-automation=list-item-row]";
  private static readonly qualityErrorMessage = "[data-automation=item-form-quality] .mat-error";

  public static visit() {
    cy.intercept("GET", "/api/items").as(this.getItemsRequestAlias);
    cy.visit("/list");
    this.waitListToRender(this.getItemsRequestAlias);
  }

  public static openAddItemDialog() {
    cy.get(this.addItemButton).click();
  }

  public static openEditItemDialog(item: Item) {
    this.getItem(item).siblings().find(this.editItemButton).click();
  }

  public static filloutItemAttributes(item: Item) {
    cy.get(this.nameInput).clear().type(item.name);
    cy.get(this.sellInInput).clear().type(item.sellIn.toString());
    cy.get(this.qualityInput).clear().type(item.quality.toString());
    cy.get(this.typeInput).click();
    cy.get(this.matOption).contains(item.type).click();
  }

  public static confirmItemCreationOrModification() {
    cy.intercept("GET", "/api/items").as(this.getItemsRequestAlias);
    cy.get(this.itemFormConfirmButton).click();
    this.waitListToRender(this.getItemsRequestAlias)
  }

  public static getItem(item: Item) {
    return cy.get(".mat-card > :nth-child(1)").filter(`:contains('${item.name}')`)
      .siblings(":nth-child(2)").filter(`:contains('${item.sellIn}')`)
      .siblings(":nth-child(3)").filter(`:contains('${item.quality}')`)
      .siblings(":nth-child(4)").filter(`:contains('${item.type}')`);
  }

  public static deleteItem(item: Item) {
    cy.intercept("DELETE", "/api/items/*").as(this.deleteItemRequestAlias);
    this.getItem(item).siblings().find(this.deleteItemButton).click();
    cy.get(this.deleteItemConfirmButton).contains("Delete").click();
    this.waitListToRender(this.deleteItemRequestAlias);
  }

  public static waitListToRender(requestAlias: string) {
    cy.wait("@" + requestAlias);
    cy.get(this.loadingSpinner).should("not.exist")
  }

  public static validateItemIsListed(item: Item) {
    this.getItem(item).should("exist")
  }

  public static setAliasItemsList() {
    cy.get(this.itemsListRows).should(() => true).as(this.itemsListAlias)
  }

  public static validateItemsListLengthIncreasedBy(change: number) {
    cy.get("@" + this.itemsListAlias).then(initialItemsList =>
      cy.get(this.itemsListRows).its("length")
        .should("equal", initialItemsList.length + change)
    );
  }

  public static validateConfirmAddButtonIs(state: string) {
    cy.get(this.itemFormConfirmButton).should(state);
  }
  public static validateQualityErrorMessage(expectedMessage: string) {
    cy.get(this.qualityErrorMessage).should("contain.text", expectedMessage);
  }
}
