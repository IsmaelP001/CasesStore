import { InferQueryModel } from "@/lib/utils/types";

export type SearchParams = Record<string, string>;
export type Params = {
  id: string[];
};

export type Product = InferQueryModel<
  "product",
  {
    columns: {
      id: true;
      name: true;
      price: true;
      coverImage:true;
    };
    with: {
      collection: {
        columns: {
          id: true;
          name: true;
        };
      };
      images: {
        columns: {
          id: true;
          image: true;
        };
      };
      color: {
        columns: {
          id: true;
          name: true;
        };
      },
      printPattern:{
        columns:{
          id:true,
          name:true
        }
      },
      material:{
        columns:{
          id:true,
          name:true
        }
      }

    };
  }
>;


export type CartItem=InferQueryModel<'cartDetails',{
  with: {
    product: {
      with: {
        images: true,
      },
    },
    discount: true,
    configirationImage: true,
    device: true,
  },
}>