export const breadCrumbs = {
   DASH_BOARD: {
      name: "Dashboard",
      url: "",
      id: 1,
   },
   SUMMARY_ORDERS: {
      name: "Summary order",
      url: "dashboard/summary-order",
   },
   ORDER: {
      name: "Order",
      url: "order",
      id: 3,
   },
   PRODUCTS: {
      name: "Products",
      url: "products",
      id: 2,
   },
   CREATE_PRODUCTS: {
      name: "Create product",
      url: "/create-product",
   },
   UPDATE_PRODUCT: {
      name: "Update product",
      url: "products/update-product",
   },
   BIRDS: {
      name: "Birds",
      url: "/birds",
   },
   ACCESSORIES: {
      name: "Accessories",
      url: "/accessories",
   },
   FOOD: {
      name: "Food",
      url: "/food",
   },
   STAFF: {
      name: "Staff",
      url: "staff",
      id: 4,
   },
   REVIEWS: {
      name: "Reviews",
      url: "/reviews",
      id: 5,
   },
   REPORTS: {
      name: "Reports",
      url: "/reports",
      id: 6,
   },
   SUPPORT: {
      name: "Support",
      url: "/support",
      id: 8,
   },
   SETTINGS: {
      name: "Settings",
      url: "/settings",
      id: 7,
   },
};

export const CATEGORY = [
   {
      id: 1,
      name: "Birds",
      url: 'birds',
   },
   {
      id: 2,
      name: "Food",
      url: 'foods'
   },
   {
      id: 3,
      name: "Accessories",
      url: 'accessories'
   },
];
export const category = {
   BIRDS: {
      id: 1,
      name: "Birds",
      url: "birds",
   },
   FOODS: {
      id: 2,
      name: "Food",  
      url: "foods",
   },
   ACCESSORIES: {
      id: 3,
      name: "Accessories",
      url: "accessories",
   },
};

export const userRole = {
   GUEST: {
      code: 0,
   },
   ADMIN: {
      code: 1,

   },
   SHOP_OWNER: {
      code: 2
   },
   SHOP_STAFF: {
      code: 3
   }
}


export const modelStyle = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 'fit-content',
 };
 


export const orderStatus = {
   PENDING: {
      code: 0,
      string : 'PENDING'
   },
   PROCESSING: {
      code: 1,
      string : 'PROCESSING'
   },
   SHIPPED: {
      code: 2, 
      string : 'SHIPPED'
   }
 }