export interface DescriptionListForProductPage {
  id: number;
  listName: string;
  listKeys: Partial<{
    brand: string;
    breedSize: string;
    type: string;
    packaging: string;
    groupProduct: string;
    countryProduct: string;
    description: string;
    instructionWhyBuy: string;
    composition: string;
    compositionAnalysis: string;
    compositionEnergyValue: string;
    compositionExpiration: string;
    instruction: string;
  }>;
}
