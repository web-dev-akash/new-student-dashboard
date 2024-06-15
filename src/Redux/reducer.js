import {
  GET_USER,
  GET_USER_ALERT,
  GET_USER_ERROR,
  GET_USER_LOADING,
  GET_USER_MODE,
  GET_USER_ORDERS,
  GET_USER_STORE,
  SET_USER_LOADING,
} from "./actionTypes";

// const initialState = {
//   loading: false,
//   error: false,
//   user: {
//     email: "",
//     phone: "",
//     name: "",
//     credits: 0,
//     coins: 0,
//     id: "",
//     studentName: "",
//     address: null,
//     referrals: [],
//     quizzes: 0,
//     age: 0,
//     category: "",
//     session: [],
//     coinsHistory: [],
//   },
//   mode: "",
//   products: [],
//   orders: [],
//   alert: [],
// };

const initialState = {
  loading: false,
  error: false,
  user: {
    email: "akash@gmail.com",
    phone: "917018178377",
    name: "Akash",
    credits: 155,
    coins: 3456,
    id: "4878003000003001027",
    studentName: "Akash Kumar",
    address: null,
    referrals: [
      {
        Student_Name: "Akash Kumar",
        Phone: "91407878454",
        id: "4878003000003001028",
        quizAttempted: 0,
      },
      {
        Student_Name: "Akash Kumar",
        Phone: "91407878454",
        id: "4878003000003001028",
        quizAttempted: 1,
      },
      {
        Student_Name: "Akash Kumar",
        Phone: "91407878454",
        id: "4878003000003001028",
        quizAttempted: 2,
      },
      {
        Student_Name: "Akash Kumar",
        Phone: "91407878454",
        id: "4878003000003001028",
        quizAttempted: 3,
      },
      {
        Student_Name: "Akash Kumar",
        Phone: "91407878454",
        id: "4878003000003001028",
        quizAttempted: 4,
      },
      {
        Student_Name: "Akash Kumar",
        Phone: "91407878454",
        id: "4878003000003001028",
        quizAttempted: 5,
      },
      {
        Student_Name: "Akash Kumar",
        Phone: "91407878454",
        id: "4878003000003001028",
        quizAttempted: 6,
      },
      {
        Student_Name: "Akash Kumar",
        Phone: "91407878454",
        id: "4878003000003001028",
        quizAttempted: 7,
      },
      {
        Student_Name: "Akash Kumar",
        Phone: "91407878454",
        id: "4878003000003001028",
        quizAttempted: 50,
      },
    ],
    quizzes: 45,
    age: 213,
    category: "Active",
    session: [],
    coinsHistory: [
      {
        Coins: 500,
        Updated_Date: "2024-03-05",
        id: "4878003000017076271",
        Action_Type: "Credit",
        Description: "First 50 quizzes completed with the help of zoho",
      },
      {
        Coins: 2000,
        Updated_Date: "2024-03-03",
        id: "4878003000017076272",
        Action_Type: "Debit",
        Description: "Purchased a Gift",
      },
      {
        Coins: 200,
        Updated_Date: "2024-02-28",
        id: "4878003000017076273",
        Action_Type: "Credit",
        Description: "Lucky Draw Winner",
      },
    ],
  },
  mode: "user",
  products: [
    {
      Description:
        "Live Quiz Annual Subscription for all subjects for 365 days.",
      Product_Name: "Live Quiz Annual Subscription - Super",
      Product_Id: "4878003000000630266",
      Product_Image_URL: null,
      Unit_Price: 2400,
      Product_Stock: null,
    },
    {
      Description: null,
      Product_Name: "Math Live Class - 6 month",
      Product_Id: "4878003000000673001",
      Product_Image_URL: null,
      Unit_Price: 6000,
      Product_Stock: null,
    },
    {
      Description: null,
      Product_Name: "Science Live Class - 6 month",
      Product_Id: "4878003000000673011",
      Product_Image_URL: null,
      Unit_Price: 6000,
      Product_Stock: null,
    },
    {
      Description: null,
      Product_Name: "English Live Class - 3 month",
      Product_Id: "4878003000000673589",
      Product_Image_URL: null,
      Unit_Price: 3000,
      Product_Stock: null,
    },
    {
      Description:
        "Live Quiz Annual Subscription for any one subject for 365 days.",
      Product_Name: "Live Quiz Annual Subscription - Basic",
      Product_Id: "4878003000000673609",
      Product_Image_URL: null,
      Unit_Price: 1500,
      Product_Stock: null,
    },
    {
      Description:
        "Live Quiz Annual Subscription for all subjects for 365 days, including access to revision modules.",
      Product_Name: "Live Quiz Annual Subscription - Legend",
      Product_Id: "4878003000000673614",
      Product_Image_URL: null,
      Unit_Price: 3500,
      Product_Stock: null,
    },
    {
      Description: "this is a testing product for store",
      Product_Name: "testing1",
      Product_Id: "4878003000018663008",
      Product_Image_URL: "https://m.media-amazon.com/images/I/81aTYb7hYvL.jpg",
      Unit_Price: 200,
      Product_Stock: 20,
    },
  ],
  orders: [
    {
      Order_Status: "Placed",
      Expected_Delivery_Date: "",
      Product_Name: "Colored Pen Set of 5",
      Order_Id: "4878003000018753001",
      Product_Image_URL: "https://m.media-amazon.com/images/I/81aTYb7hYvL.jpg",
      Order_Date: "2024-04-02",
      Unit_Price: 200,
    },
    {
      Order_Status: "Processed",
      Expected_Delivery_Date: "2024-04-13",
      Product_Name: "Product 1",
      Order_Id: "4878003000018753002",
      Product_Image_URL: "https://m.media-amazon.com/images/I/81aTYb7hYvL.jpg",
      Order_Date: "2024-04-02",
      Unit_Price: 200,
    },
    {
      Order_Status: "Delivered",
      Expected_Delivery_Date: "2024-04-08",
      Product_Name: "Live Quiz Annual Subscription Basic",
      Order_Id: "4878003000018753003",
      Product_Image_URL: "https://m.media-amazon.com/images/I/41mX1tTEFmL.jpg",
      Order_Date: "2024-04-01",
      Unit_Price: 1500,
    },
  ],
  alert: ["credits", "doubt"],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER_LOADING: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case SET_USER_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }
    case GET_USER_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case GET_USER: {
      return {
        ...state,
        loading: false,
        error: false,
        user: payload,
      };
    }
    case GET_USER_MODE: {
      return {
        ...state,
        loading: false,
        error: false,
        mode: payload,
      };
    }
    case GET_USER_STORE: {
      return {
        ...state,
        products: payload,
      };
    }
    case GET_USER_ALERT: {
      return {
        ...state,
        alert: payload,
      };
    }
    case GET_USER_ORDERS: {
      return {
        ...state,
        orders: payload,
      };
    }
    default: {
      return state;
    }
  }
};
