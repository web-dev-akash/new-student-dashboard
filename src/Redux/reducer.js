import {
  GET_OQAD,
  GET_URL_QUERY,
  GET_USER,
  GET_USER_ALERT,
  GET_USER_ERROR,
  GET_USER_LOADING,
  GET_USER_MODE,
  GET_USER_ORDERS,
  GET_USER_PAYMENT_HISTORY,
  GET_USER_REPORT,
  GET_USER_STORE,
  GET_WEEKLY_WINNERS,
  SET_USER_LOADING,
} from "./actionTypes";

const initialState = {
  loading: false,
  error: false,
  user: {
    email: "",
    phone: "",
    name: "",
    credits: 0,
    coins: 0,
    grade: 0,
    id: "",
    studentName: "",
    address: null,
    referrals: [],
    quizzes: [],
    age: 0,
    category: "",
    coinsHistory: [],
    weeklyQuizzes: [],
    newUser: false,
    difficulty: false,
  },
  mode: "",
  products: [],
  orders: [],
  alert: [],
  report: {},
  winners: {},
  paymentHistory: {
    status: 0,
    data: [],
  },
  oqad: {},
  query: "",
};

// const initialState = {
//   loading: false,
//   error: false,
//   user: {
//     email: "akash1.wisechamps@gmail.com",
//     phone: "917018178377",
//     name: "Akash",
//     credits: 155,
//     coins: 34506,
//     grade: 5,
//     id: "4878003000003001027",
//     studentName: "Akash",
//     address: null,
//     referrals: [
//       {
//         Student_Name: "Akash Kumar",
//         Phone: "91407878454",
//         id: "4878003000003001028",
//         quizAttempted: 0,
//       },
//       {
//         Student_Name: "Akash Kumar",
//         Phone: "91407878454",
//         id: "4878003000003001028",
//         quizAttempted: 1,
//       },
//       {
//         Student_Name: "Akash Kumar",
//         Phone: "91407878454",
//         id: "4878003000003001028",
//         quizAttempted: 2,
//       },
//       {
//         Student_Name: "Akash Kumar",
//         Phone: "91407878454",
//         id: "4878003000003001028",
//         quizAttempted: 3,
//       },
//       {
//         Student_Name: "Akash Kumar",
//         Phone: "91407878454",
//         id: "4878003000003001028",
//         quizAttempted: 4,
//       },
//       {
//         Student_Name: "Akash Kumar",
//         Phone: "91407878454",
//         id: "4878003000003001028",
//         quizAttempted: 5,
//       },
//       {
//         Student_Name: "Akash Kumar",
//         Phone: "91407878454",
//         id: "4878003000003001028",
//         quizAttempted: 6,
//       },
//       {
//         Student_Name: "Akash Kumar",
//         Phone: "91407878454",
//         id: "4878003000003001028",
//         quizAttempted: 7,
//       },
//       {
//         Student_Name: "Akash Kumar",
//         Phone: "91407878454",
//         id: "4878003000003001028",
//         quizAttempted: 50,
//       },
//     ],
//     quizzes: [
//       {
//         contactId: "4878003000003001027",
//         Session_Name: null,
//         id: "4878003000015013025",
//         Quiz_Score: 7,
//         Session_Date_Time: "2024-04-14T11:00:00+05:30",
//       },
//       {
//         contactId: "4878003000003001027",
//         Session_Name: null,
//         id: "4878003000015013043",
//         Quiz_Score: 10,
//         Session_Date_Time: "2024-04-13T19:00:00+05:30",
//       },
//       {
//         contactId: "4878003000003001027",
//         Session_Name: "Math Live Quiz Grade 4 Data Handling 03 May",
//         id: "4878003000015013061",
//         Quiz_Score: 10,
//         Session_Date_Time: "2024-04-12T19:00:00+05:30",
//       },
//       {
//         contactId: "4878003000003001027",
//         Session_Name:
//           "Science Live Quiz Grade 4 Food and Nutrition with the help of a computer 02 May",
//         id: "4878003000015013079",
//         Quiz_Score: 11,
//         Session_Date_Time: "2024-04-11T21:00:00+05:30",
//       },
//     ],
//     age: 213,
//     category: "Active",
//     coinsHistory: [
//       {
//         Coins: 500,
//         Updated_Date: "2024-03-05",
//         id: "4878003000017076271",
//         Action_Type: "Credit",
//         Description: "First 50 quizzes completed with the help of zoho",
//       },
//       {
//         Coins: 2000,
//         Updated_Date: "2024-03-03",
//         id: "4878003000017076272",
//         Action_Type: "Debit",
//         Description: "Purchased a Gift",
//       },
//       {
//         Coins: 200,
//         Updated_Date: "2024-02-28",
//         id: "4878003000017076273",
//         Action_Type: "Credit",
//         Description: "Lucky Draw Winner",
//       },
//     ],
//     weeklyQuizzes: [
//       {
//         Session_Video_Link: "https://youtu.be/nVEw3gW2RQc?si=aQdbMUrZ0BeLHOfu",
//         Session_Image_Link:
//           "https://cdn.sketchbubble.com/pub/media/catalog/product/optimized1/6/c/6c2f8292b66d3362e1f674f3fb2af2fcda63f95ab6be0200b46481c1e3da40e6/animals-theme-slide1.png",
//         Session_Name: "Vocabulary",
//         id: "4878003000022486086",
//         Vevox_Survey_Link:
//           "https://vevox.app/#/m/192062760/survey/7b8b72ee-20b5-4801-8f2b-2a7afee7a3bf",
//         Subject: "English",
//         Session_Date_Time: "2024-06-20T19:30:00+05:30",
//       },
//       {
//         Session_Video_Link: "https://youtu.be/nVEw3gW2RQc?si=aQdbMUrZ0BeLHOfu",
//         Session_Image_Link:
//           "https://cdn.sketchbubble.com/pub/media/catalog/product/optimized1/6/c/6c2f8292b66d3362e1f674f3fb2af2fcda63f95ab6be0200b46481c1e3da40e6/animals-theme-slide1.png",
//         Session_Name: "Figure Matrix  Venn diagram",
//         id: "4878003000022486091",
//         Vevox_Survey_Link:
//           "https://vevox.app/#/m/192062760/survey/7b8b72ee-20b5-4801-8f2b-2a7afee7a3bf",
//         Subject: "Math",
//         Session_Date_Time: "2024-06-21T19:30:00+05:30",
//       },
//       {
//         Session_Video_Link: "https://youtu.be/nVEw3gW2RQc?si=aQdbMUrZ0BeLHOfu",
//         Session_Image_Link:
//           "https://cdn.sketchbubble.com/pub/media/catalog/product/optimized1/6/c/6c2f8292b66d3362e1f674f3fb2af2fcda63f95ab6be0200b46481c1e3da40e6/animals-theme-slide1.png",
//         Session_Name: "Sorting and Separation of Materials",
//         id: "4878003000022486096",
//         Vevox_Survey_Link:
//           "https://vevox.app/#/m/192062760/survey/7b8b72ee-20b5-4801-8f2b-2a7afee7a3bf",
//         Subject: "Science",
//         Session_Date_Time: "2024-06-22T19:30:00+05:30",
//       },
//       {
//         Session_Video_Link: "https://youtu.be/nVEw3gW2RQc?si=aQdbMUrZ0BeLHOfu",
//         Session_Image_Link:
//           "https://cdn.sketchbubble.com/pub/media/catalog/product/optimized1/6/c/6c2f8292b66d3362e1f674f3fb2af2fcda63f95ab6be0200b46481c1e3da40e6/animals-theme-slide1.png",
//         Session_Name: "Perimeter",
//         id: "4878003000022797021",
//         Vevox_Survey_Link:
//           "https://vevox.app/#/m/192062760/survey/7b8b72ee-20b5-4801-8f2b-2a7afee7a3bf",
//         Subject: "Math",
//         Session_Date_Time: "2024-06-23T19:30:00+05:30",
//       },
//       {
//         Session_Video_Link: "https://youtu.be/nVEw3gW2RQc?si=aQdbMUrZ0BeLHOfu",
//         Session_Image_Link:
//           "https://cdn.sketchbubble.com/pub/media/catalog/product/optimized1/6/c/6c2f8292b66d3362e1f674f3fb2af2fcda63f95ab6be0200b46481c1e3da40e6/animals-theme-slide1.png",
//         Session_Name: "Plants and Animals",
//         id: "4878003000023039189",
//         Vevox_Survey_Link:
//           "https://vevox.app/#/m/192062760/survey/7b8b72ee-20b5-4801-8f2b-2a7afee7a3bf",
//         Subject: "Science",
//         Session_Date_Time: "2024-06-24T20:00:00+05:30",
//         Session_Video_Link_2:
//           "https://youtu.be/nVEw3gW2RQc?si=aQdbMUrZ0BeLHOfu",
//       },
//       {
//         Session_Video_Link: "aa",
//         Session_Image_Link:
//           "https://cdn.sketchbubble.com/pub/media/catalog/product/optimized1/6/c/6c2f8292b66d3362e1f674f3fb2af2fcda63f95ab6be0200b46481c1e3da40e6/animals-theme-slide1.png",
//         Session_Name: "Knowing our Numbers",
//         id: "4878003000023135021",
//         Vevox_Survey_Link:
//           "https://vevox.app/#/m/192062760/survey/7b8b72ee-20b5-4801-8f2b-2a7afee7a3bf",
//         Subject: "Math",
//         Session_Date_Time: "2024-07-31T16:56:00+05:30",
//       },
//       {
//         Session_Video_Link: "https://youtu.be/nVEw3gW2RQc?si=aQdbMUrZ0BeLHOfu",
//         Session_Image_Link:
//           "https://cdn.sketchbubble.com/pub/media/catalog/product/optimized1/6/c/6c2f8292b66d3362e1f674f3fb2af2fcda63f95ab6be0200b46481c1e3da40e6/animals-theme-slide1.png",
//         Session_Name: "Nouns and Pronouns",
//         id: "4878003000023135111",
//         Vevox_Survey_Link:
//           "https://vevox.app/#/m/192062760/survey/7b8b72ee-20b5-4801-8f2b-2a7afee7a3bf",
//         Subject: "English",
//         Session_Date_Time: "2024-08-13T15:11:00+05:30",
//       },
//       {
//         Session_Video_Link: "https://youtu.be/nVEw3gW2RQc?si=aQdbMUrZ0BeLHOfu",
//         Session_Image_Link:
//           "https://cdn.sketchbubble.com/pub/media/catalog/product/optimized1/6/c/6c2f8292b66d3362e1f674f3fb2af2fcda63f95ab6be0200b46481c1e3da40e6/animals-theme-slide1.png",
//         Session_Name: "Coding Decoding",
//         id: "4878003000023135116",
//         Vevox_Survey_Link:
//           "https://vevox.app/#/m/192062760/survey/7b8b72ee-20b5-4801-8f2b-2a7afee7a3bf",
//         Subject: "Math",
//         Session_Date_Time: "2024-06-27T20:00:00+05:30",
//       },
//       {
//         Session_Video_Link: "https://youtu.be/nVEw3gW2RQc?si=aQdbMUrZ0BeLHOfu",
//         Session_Image_Link:
//           "https://cdn.sketchbubble.com/pub/media/catalog/product/optimized1/6/c/6c2f8292b66d3362e1f674f3fb2af2fcda63f95ab6be0200b46481c1e3da40e6/animals-theme-slide1.png",
//         Session_Name: "Sorting and Separation of Materials",
//         id: "4878003000023135121",
//         Vevox_Survey_Link:
//           "https://vevox.app/#/m/192062760/survey/7b8b72ee-20b5-4801-8f2b-2a7afee7a3bf",
//         Subject: "Science",
//         Session_Date_Time: "2024-06-28T20:00:00+05:30",
//       },
//       {
//         Session_Video_Link: "https://youtu.be/nVEw3gW2RQc?si=aQdbMUrZ0BeLHOfu",
//         Session_Image_Link:
//           "https://cdn.sketchbubble.com/pub/media/catalog/product/optimized1/6/c/6c2f8292b66d3362e1f674f3fb2af2fcda63f95ab6be0200b46481c1e3da40e6/animals-theme-slide1.png",
//         Session_Name: "Integers",
//         id: "4878003000023135126",
//         Vevox_Survey_Link:
//           "https://vevox.app/#/m/192062760/survey/7b8b72ee-20b5-4801-8f2b-2a7afee7a3bf",
//         Subject: "Math",
//         Session_Date_Time: "2024-07-23T15:41:00+05:30",
//       },

//       {
//         Session_Video_Link: "https://youtu.be/nVEw3gW2RQc?si=aQdbMUrZ0BeLHOfu",
//         Session_Image_Link:
//           "https://cdn.sketchbubble.com/pub/media/catalog/product/optimized1/6/c/6c2f8292b66d3362e1f674f3fb2af2fcda63f95ab6be0200b46481c1e3da40e6/animals-theme-slide1.png",
//         Session_Name: "Coding Decoding",
//         id: "4878003000023135116",
//         Vevox_Survey_Link:
//           "https://vevox.app/#/m/192062760/survey/7b8b72ee-20b5-4801-8f2b-2a7afee7a3bf",
//         Subject: "Math",
//         Session_Date_Time: "2024-06-30T20:00:00+05:30",
//       },
//       {
//         Session_Video_Link: "https://youtu.be/nVEw3gW2RQc?si=aQdbMUrZ0BeLHOfu",
//         Session_Image_Link:
//           "https://cdn.sketchbubble.com/pub/media/catalog/product/optimized1/6/c/6c2f8292b66d3362e1f674f3fb2af2fcda63f95ab6be0200b46481c1e3da40e6/animals-theme-slide1.png",
//         Session_Name: "Sorting and Separation of Materials",
//         id: "4878003000023135121",
//         Vevox_Survey_Link:
//           "https://vevox.app/#/m/192062760/survey/7b8b72ee-20b5-4801-8f2b-2a7afee7a3bf",
//         Subject: "Science",
//         Session_Date_Time: "2024-07-01T20:00:00+05:30",
//       },
//       {
//         Session_Video_Link: "https://youtu.be/nVEw3gW2RQc?si=aQdbMUrZ0BeLHOfu",
//         Session_Image_Link:
//           "https://cdn.sketchbubble.com/pub/media/catalog/product/optimized1/6/c/6c2f8292b66d3362e1f674f3fb2af2fcda63f95ab6be0200b46481c1e3da40e6/animals-theme-slide1.png",
//         Session_Name: "Integers",
//         id: "4878003000023135126",
//         Vevox_Survey_Link:
//           "https://vevox.app/#/m/192062760/survey/7b8b72ee-20b5-4801-8f2b-2a7afee7a3bf",
//         Subject: "Math",
//         Session_Date_Time: "2024-07-02T17:50:00+05:30",
//       },
//       {
//         Session_Video_Link: "https://youtu.be/nVEw3gW2RQc?si=aQdbMUrZ0BeLHOfu",
//         Session_Image_Link:
//           "https://cdn.sketchbubble.com/pub/media/catalog/product/optimized1/6/c/6c2f8292b66d3362e1f674f3fb2af2fcda63f95ab6be0200b46481c1e3da40e6/animals-theme-slide1.png",
//         Session_Name: "Coding Decoding",
//         id: "4878003000023135116",
//         Vevox_Survey_Link:
//           "https://vevox.app/#/m/192062760/survey/7b8b72ee-20b5-4801-8f2b-2a7afee7a3bf",
//         Subject: "Math",
//         Session_Date_Time: "2024-07-03T12:27:00+05:30",
//       },
//       {
//         Session_Video_Link: "https://youtu.be/nVEw3gW2RQc?si=aQdbMUrZ0BeLHOfu",
//         Session_Image_Link:
//           "https://cdn.sketchbubble.com/pub/media/catalog/product/optimized1/6/c/6c2f8292b66d3362e1f674f3fb2af2fcda63f95ab6be0200b46481c1e3da40e6/animals-theme-slide1.png",
//         Session_Name: "Sorting and Separation of Materials",
//         id: "4878003000023135121",
//         Vevox_Survey_Link: "",
//         Subject: "Science",
//         Session_Date_Time: "2024-07-04T20:00:00+05:30",
//       },
//       {
//         Session_Video_Link: "https://youtu.be/nVEw3gW2RQc?si=aQdbMUrZ0BeLHOfu",
//         Session_Image_Link:
//           "https://cdn.sketchbubble.com/pub/media/catalog/product/optimized1/6/c/6c2f8292b66d3362e1f674f3fb2af2fcda63f95ab6be0200b46481c1e3da40e6/animals-theme-slide1.png",
//         Session_Name: "Integers",
//         id: "4878003000023135126",
//         Vevox_Survey_Link:
//           "https://vevox.app/#/m/192062760/survey/7b8b72ee-20b5-4801-8f2b-2a7afee7a3bf",
//         Subject: "Math",
//         Session_Date_Time: "2024-07-05T12:00:00+05:30",
//       },
//     ],
//     newUser: true,
//     difficulty: true,
//   },
//   mode: "user",
//   products: [
//     {
//       Description:
//         "Live Quiz Annual Subscription for all subjects for 365 days.",
//       Product_Name: "Live Quiz Annual Subscription - Super",
//       Product_Id: "4878003000000630266",
//       Product_Image_URL: null,
//       Unit_Price: 2400,
//       Product_Stock: null,
//     },
//     {
//       Description: null,
//       Product_Name: "Math Live Class - 6 month",
//       Product_Id: "4878003000000673001",
//       Product_Image_URL: null,
//       Unit_Price: 6000,
//       Product_Stock: null,
//     },
//     {
//       Description: null,
//       Product_Name: "Science Live Class - 6 month",
//       Product_Id: "4878003000000673011",
//       Product_Image_URL: null,
//       Unit_Price: 6000,
//       Product_Stock: null,
//     },
//     {
//       Description: null,
//       Product_Name: "English Live Class - 3 month",
//       Product_Id: "4878003000000673589",
//       Product_Image_URL: null,
//       Unit_Price: 3000,
//       Product_Stock: null,
//     },
//     {
//       Description:
//         "Live Quiz Annual Subscription for any one subject for 365 days.",
//       Product_Name: "Live Quiz Annual Subscription - Basic",
//       Product_Id: "4878003000000673609",
//       Product_Image_URL: null,
//       Unit_Price: 1500,
//       Product_Stock: null,
//     },
//     {
//       Description:
//         "Live Quiz Annual Subscription for all subjects for 365 days, including access to revision modules.",
//       Product_Name: "Live Quiz Annual Subscription - Legend",
//       Product_Id: "4878003000000673614",
//       Product_Image_URL: null,
//       Unit_Price: 3500,
//       Product_Stock: null,
//     },
//     {
//       Description: "this is a testing product for store",
//       Product_Name: "testing1",
//       Product_Id: "4878003000018663008",
//       Product_Image_URL: "https://m.media-amazon.com/images/I/81aTYb7hYvL.jpg",
//       Unit_Price: 200,
//       Product_Stock: 20,
//     },
//   ],
//   orders: [
//     {
//       Order_Status: "Placed",
//       Expected_Delivery_Date: "",
//       Product_Name: "Colored Pen Set of 5",
//       Order_Id: "4878003000018753001",
//       Product_Image_URL: "https://m.media-amazon.com/images/I/81aTYb7hYvL.jpg",
//       Order_Date: "2024-04-02",
//       Unit_Price: 200,
//     },
//     {
//       Order_Status: "Processed",
//       Expected_Delivery_Date: "2024-04-13",
//       Product_Name: "Product 1",
//       Order_Id: "4878003000018753002",
//       Product_Image_URL: "https://m.media-amazon.com/images/I/81aTYb7hYvL.jpg",
//       Order_Date: "2024-04-02",
//       Unit_Price: 200,
//     },
//     {
//       Order_Status: "Delivered",
//       Expected_Delivery_Date: "2024-04-08",
//       Product_Name: "Live Quiz Annual Subscription Basic",
//       Order_Id: "4878003000018753003",
//       Product_Image_URL: "https://m.media-amazon.com/images/I/41mX1tTEFmL.jpg",
//       Order_Date: "2024-04-01",
//       Unit_Price: 1500,
//     },
//   ],
//   report: {
//     mode: "user",
//     name: "",
//     grade: "",
//     credits: "",
//     percentage: 83,
//     sessions: [
//       {
//         Session_Date_Time: "2024-05-27T11:00:00+05:30",
//         Session_Name: "Nouns  Pronouns",
//         Subject: "English",
//         Total_Questions: 12,
//         attempted: true,
//         Quiz_Score: 10,
//         id: "4878003000021707061",
//       },
//       {
//         Session_Date_Time: "2024-05-28T11:00:00+05:30",
//         Session_Name: "Food and Its Components",
//         Subject: "Science",
//         Total_Questions: 10,
//         attempted: true,
//         Quiz_Score: 10,
//         id: "4878003000021707066",
//       },
//       {
//         Session_Date_Time: "2024-05-29T11:00:00+05:30",
//         Session_Name: "Understanding Elementary Shapes",
//         Subject: "Math",
//         Total_Questions: 10,
//         attempted: true,
//         Quiz_Score: 10,
//         id: "4878003000021707071",
//       },
//       {
//         Session_Date_Time: "2024-05-30T11:30:00+05:30",
//         Session_Name: "Vocabulary",
//         Subject: "English",
//         Total_Questions: 12,
//         attempted: true,
//         Quiz_Score: 10,
//         id: "4878003000021808093",
//       },
//       {
//         Session_Date_Time: "2024-05-31T11:00:00+05:30",
//         Session_Name: "Mirror and Water Images, Direction sense",
//         Subject: "Math",
//         Total_Questions: 10,
//         attempted: true,
//         Quiz_Score: 10,
//         id: "4878003000021808098",
//       },
//       {
//         Session_Date_Time: "2024-06-01T11:00:00+05:30",
//         Session_Name: "Fibre to Fabric  June",
//         Subject: "Science",
//         Total_Questions: 10,
//         attempted: true,
//         Quiz_Score: 10,
//         id: "4878003000021808103",
//       },
//       {
//         Session_Date_Time: "2024-06-02T11:00:00+05:30",
//         Session_Name: "Knowing our Numbers  June",
//         Subject: "Math",
//         Total_Questions: 10,
//         attempted: true,
//         Quiz_Score: 10,
//         id: "4878003000021808108",
//       },
//     ],
//   },
//   alert: ["special"],
//   winners: {
//     status: 200,
//     topFiveUsers: [
//       {
//         Email: "sarala.palthady@gmail.com",
//         Student_Name: "Adeepth",
//         contactId: "4878003000016073001",
//         Coins: 5700,
//         Total_Questions: 72,
//         id: "4878003000024631424",
//         Quiz_Score: 63,
//         Student_Grade: "2",
//       },
//       {
//         Email: "shraddhapurohit.bgr@gmail.com",
//         Student_Name: "Aghanya",
//         contactId: "4878003000012653001",
//         Coins: 3500,
//         Total_Questions: 62,
//         id: "4878003000024631426",
//         Quiz_Score: 59,
//         Student_Grade: "2",
//       },
//       {
//         Email: "vishnu02011989@gmail.com",
//         Student_Name: "Sanvi",
//         contactId: "4878003000013442922",
//         Coins: 2000,
//         Total_Questions: 72,
//         id: "4878003000024631427",
//         Quiz_Score: 49,
//         Student_Grade: "1",
//       },
//       {
//         Email: "vedu798541@gmail.com",
//         Student_Name: "Vedansh",
//         contactId: "4878003000017545024",
//         Coins: 4100,
//         Total_Questions: 72,
//         id: "4878003000024631430",
//         Quiz_Score: 47,
//         Student_Grade: "2",
//       },
//       {
//         Email: "priyankapaygude302@gmail.com",
//         Student_Name: "Yuvansh",
//         contactId: "4878003000024633070",
//         Coins: null,
//         Total_Questions: 52,
//         id: "4878003000024631428",
//         Quiz_Score: 46,
//         Student_Grade: "1",
//       },
//     ],
//     topFivePercentageUsers: [
//       {
//         Email: "archana.ujjain85@gmail.com",
//         Student_Name: "Samarth Singh Chauhan",
//         contactId: "4878003000009065146",
//         Coins: 3400,
//         Total_Questions: 10,
//         id: "4878003000025159174",
//         Quiz_Score: 10,
//         Student_Grade: "2",
//         percentage: 100,
//       },
//       {
//         Email: "Sukham.garg@gmail.com",
//         Student_Name: "Dviti",
//         contactId: "4878003000007939408",
//         Coins: 10300,
//         Total_Questions: 32,
//         id: "4878003000024631425",
//         Quiz_Score: 30,
//         Student_Grade: "2",
//         percentage: 93,
//       },
//       {
//         Email: "isha.sharma2765@gmail.com",
//         Student_Name: "Nivaan sharma",
//         contactId: "4878003000021203002",
//         Coins: 1200,
//         Total_Questions: 10,
//         id: "4878003000025033280",
//         Quiz_Score: 9,
//         Student_Grade: "2",
//         percentage: 90,
//       },
//       {
//         Email: "jain.sonam2@gmail.com",
//         Student_Name: "Ayansh jain",
//         contactId: "4878003000025023348",
//         Coins: null,
//         Total_Questions: 10,
//         id: "4878003000025159180",
//         Quiz_Score: 9,
//         Student_Grade: "2",
//         percentage: 90,
//       },
//       {
//         Email: "rahangdale609@gmail.com",
//         Student_Name: "Himanshi Rahangdale",
//         contactId: "4878003000019300001",
//         Coins: 500,
//         Total_Questions: 30,
//         id: "4878003000024931032",
//         Quiz_Score: 21,
//         Student_Grade: "2",
//         percentage: 70,
//       },
//     ],
//     maxReferrals: [
//       {
//         Email: "vishnu02011989@gmail.com",
//         Student_Name: "Sanvi",
//         id: "4878003000013442922",
//         Student_Grade: "1",
//         Referral_Count: 9,
//       },
//     ],
//     maxOrders: [
//       {
//         Email: "makhdhumali.qa@gmail.com",
//         Student_Name: "Myra shaikh",
//         id: "4878003000025040332",
//         Student_Grade: "2",
//         Total_Orders: 1,
//       },
//       {
//         Email: "vishnu02011989@gmail.com",
//         Student_Name: "Sanvi",
//         id: "4878003000025142291",
//         Student_Grade: "1",
//         Total_Orders: 1,
//       },
//     ],
//     maxCoins: [
//       {
//         Email: "makhdhumali.qa@gmail.com",
//         Student_Name: "Myra shaikh",
//         Coins: 1000,
//         id: "4878003000025021143",
//         Student_Grade: "2",
//       },
//     ],
//     maxQuizTaker: [
//       {
//         Email: "makhdhumali.qa@gmail.com",
//         Student_Name: "Myra shaikh",
//         contactId: "4878003000003788342",
//         Coins: 1000,
//         Total_Questions: 10,
//         id: "4878003000011658144",
//         Quiz_Score: 1,
//         Student_Grade: "2",
//         Total_Attempts: 113,
//       },
//     ],
//     megaLuckyDraw: [
//       {
//         Email: "nithya.sasc@gmail.com",
//         Description: "Winning referral of July",
//         Student_Name: "Neelanjana",
//         Coins: 500,
//         Updated_Date: "2024-07-16",
//         id: "4878003000025428051",
//         Student_Grade: "3",
//       },
//       {
//         Email: "kavitha.gokul@gmail.com",
//         Description: "Winning referee of July",
//         Student_Name: "V.Akshay Guru",
//         Coins: 5000,
//         Updated_Date: "2024-07-16",
//         id: "4878003000025428061",
//         Student_Grade: "3",
//       },
//       {
//         Email: "rudramaurya728@gmail.com",
//         Description: "Winning referee of July",
//         Student_Name: "Rudra",
//         Coins: 5000,
//         Updated_Date: "2024-07-16",
//         id: "4878003000025428071",
//         Student_Grade: "4",
//       },
//     ],
//   },
//   paymentHistory: [
//     {
//       Payment_Date: "2024-04-12",
//       Credits: 200,
//       Amount: 1999,
//       id: "4878003000015099001",
//     },
//     {
//       Payment_Date: "2024-04-10",
//       Credits: 1,
//       Amount: 39,
//       id: "4878003000008932116",
//     },
//     {
//       Payment_Date: "2024-04-15",
//       Credits: 1,
//       Amount: 39,
//       id: "4878003000008992001",
//     },
//   ],
//   oqad: {
//     status: 200,
//     question: "This is a test question",
//     answer: "Option 1",
//     options: ["A", "B", "C", "D"],
//     image: "/src/assets/preview.jpg",
//   },
// };

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
    case GET_USER_REPORT: {
      return {
        ...state,
        loading: false,
        error: false,
        report: payload,
      };
    }
    case GET_WEEKLY_WINNERS: {
      return {
        ...state,
        winners: payload,
      };
    }
    case GET_USER_PAYMENT_HISTORY: {
      return {
        ...state,
        paymentHistory: payload,
      };
    }
    case GET_OQAD: {
      return {
        ...state,
        oqad: payload,
      };
    }
    case GET_URL_QUERY: {
      return {
        ...state,
        query: payload,
      };
    }
    default: {
      return state;
    }
  }
};
