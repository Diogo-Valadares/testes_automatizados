export interface IStoreItem {
    id: number;
    image: string;
    name: string;
    category: string;
    weight?: number;
    imageURL: string;
  }
  
  class storeItem implements IStoreItem {
    constructor(
      public id: number,
      public image: string,
      public name: string,
      public category: string,      
      public imageURL: string,   
      public weight?: number
    ) {}
  }

export default storeItem;