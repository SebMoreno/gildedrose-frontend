import { Utils } from "cypress/utils/utils";
import { Item } from "../../src/interfaces/item";

export class ItemsListPage {
  private static readonly addItemButton = ".list-add-button";
  private static readonly deleteItemButton = "[data-automation=list-delete-button]";
  private static readonly editItemButton = "[data-automation=list-edit-button]";
  private static readonly nameInput = "[data-automation=item-form-name] input";
  private static readonly sellInInput = "[data-automation=item-form-sell-in] input";
  private static readonly qualityInput = "[data-automation=item-form-quality] input";
  private static readonly typeInput = "[data-automation=item-form-type]";
  private static readonly matOption = "mat-option";
  private static readonly itemFormConfirmButton = "[data-automation=item-form-confirm-button]";
  private static readonly deleteItemConfirmButton = "[data-automation=delete-dialog-confirm-button]";
  private static readonly itemsListAlias = "itemsList";
  private static readonly loadingSpinner = ".list-empty .mat-progress-spinner";
  private static readonly itemsListRows = "[data-automation=list-item-row]";
  private static readonly qualityErrorMessage = "[data-automation=item-form-quality] .mat-error";
  private static readonly nameCol = ":nth-child(1)";
  private static readonly sellInCol = ":nth-child(2)";
  private static readonly qualityCol = ":nth-child(3)";
  private static readonly typeCol = ":nth-child(4)";


  public static visit() {
    cy.visit("/list");
    this.waitListToRender();
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
    cy.get(this.itemFormConfirmButton).click();
    this.waitListToRender();
  }

  public static getItem(item: Item, shouldExist = true) {
    const itemName = cy.get(".mat-card > " + this.nameCol).filter(`:contains('${item.name}')`);
    if (shouldExist) {
      return itemName.siblings(this.sellInCol).filter(`:contains('${item.sellIn}')`)
        .siblings(this.qualityCol).filter(`:contains('${item.quality}')`)
        .siblings(this.typeCol).filter(`:contains('${item.type}')`);
    }
    return itemName.should($name => {
      if (!$name.length) return;
      const $sellIn = $name.siblings(this.sellInCol).filter(`:contains('${item.sellIn}')`);
      if (!$sellIn.length) return;
      const $quality = $sellIn.siblings(this.qualityCol).filter(`:contains('${item.quality}')`);
      if (!$quality.length) return;
      const $type = $quality.siblings(this.typeCol).filter(`:contains('${item.type}')`);
      if (!$type.length) return;
      expect($type.parent(), "item must not me rendered").to.not.exist;
    });
  }

  public static deleteItem(item: Item) {
    this.getItem(item).siblings().find(this.deleteItemButton).click();
    cy.get(this.deleteItemConfirmButton).click();
    this.waitListToRender();
  }

  public static waitListToRender() {
    cy.wait("@" + Utils.getItemsRequestAlias);
    cy.get(this.loadingSpinner).should("not.exist");
    cy.wait(2000);
  }

  public static validateItemIsListed(item: Item) {
    this.getItem(item).should("exist");
  }

  public static setAliasItemsList() {
    cy.get(this.itemsListRows).should(() => {
    }).its("length").as(this.itemsListAlias);
  }

  public static validateItemsListLengthChangedBy(change: number) {
    cy.get("@" + this.itemsListAlias).then(initialItemsList =>
      cy.get(this.itemsListRows).its("length")
        .should("equal", initialItemsList as unknown as number + change)
    );
  }

  public static validateConfirmAddButtonIs(state: string) {
    cy.get(this.itemFormConfirmButton).should(state);
  }

  public static validateQualityErrorMessage(expectedMessage: string) {
    cy.get(this.qualityErrorMessage).should("contain.text", expectedMessage);
  }
}
