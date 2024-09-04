import axios from "axios";
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

export const getLoading = () => ({
  type: GET_USER_LOADING,
});

export const setLoading = () => ({
  type: SET_USER_LOADING,
});

export const getError = () => ({
  type: GET_USER_ERROR,
});

export const setUser = (payload) => ({
  type: GET_USER,
  payload,
});

export const setMode = (payload) => ({
  type: GET_USER_MODE,
  payload,
});

export const setProducts = (payload) => ({
  type: GET_USER_STORE,
  payload,
});

export const setAlert = (payload) => ({
  type: GET_USER_ALERT,
  payload,
});

export const setOrders = (payload) => ({
  type: GET_USER_ORDERS,
  payload,
});

export const setReport = (payload) => ({
  type: GET_USER_REPORT,
  payload,
});

export const setWinners = (payload) => ({
  type: GET_WEEKLY_WINNERS,
  payload,
});

export const setPaymentHistory = (payload) => ({
  type: GET_USER_PAYMENT_HISTORY,
  payload,
});

export const setOqad = (payload) => ({
  type: GET_OQAD,
  payload,
});

export const setUrlQuery = (payload) => ({
  type: GET_URL_QUERY,
  payload,
});

const dummyUserData = {
  user: {
    email: "teststudent@wisechamps.com",
    phone: "91XXXXXX1234",
    name: "Student",
    credits: 12,
    coins: 2200,
    id: "123456",
    studentName: "Student",
    address: null,
    referrals: [
      {
        Student_Name: "Advik",
        Phone: "91XXXXXX1254",
        id: "1",
        quizAttempted: 0,
      },
      {
        Student_Name: "Simran",
        Phone: "91XXXXXX1254",
        id: "2",
        quizAttempted: 1,
      },
      {
        Student_Name: "Raman",
        Phone: "91XXXXXX1254",
        id: "3",
        quizAttempted: 2,
      },
      {
        Student_Name: "Shiv",
        Phone: "91XXXXXX1254",
        id: "4",
        quizAttempted: 3,
      },
      {
        Student_Name: "Rahul",
        Phone: "91XXXXXX1254",
        id: "5",
        quizAttempted: 5,
      },
      {
        Student_Name: "Rashmi",
        Phone: "91XXXXXX1254",
        id: "6",
        quizAttempted: 6,
      },
      {
        Student_Name: "Aarav",
        Phone: "91XXXXXX1254",
        id: "7",
        quizAttempted: 7,
      },
      {
        Student_Name: "Vivek",
        Phone: "91XXXXXX1254",
        id: "8",
        quizAttempted: 8,
      },
    ],
    quizzes: [
      {
        contactId: "4878003000003001027",
        Session_Name: null,
        id: "4878003000015013025",
        Quiz_Score: 7,
        Session_Date_Time: "2024-04-14T11:00:00+05:30",
      },
      {
        contactId: "4878003000003001027",
        Session_Name: null,
        id: "4878003000015013043",
        Quiz_Score: 10,
        Session_Date_Time: "2024-04-13T19:00:00+05:30",
      },
      {
        contactId: "4878003000003001027",
        Session_Name: "Math Live Quiz Grade 4 Data Handling 03 May",
        id: "4878003000015013061",
        Quiz_Score: 10,
        Session_Date_Time: "2024-04-12T19:00:00+05:30",
      },
      {
        contactId: "4878003000003001027",
        Session_Name:
          "Science Live Quiz Grade 4 Food and Nutrition with the help of a computer 02 May",
        id: "4878003000015013079",
        Quiz_Score: 11,
        Session_Date_Time: "2024-04-11T21:00:00+05:30",
      },
    ],
    age: 213,
    category: "Active",
    session: [
      {
        Session_Name: "Vocabulary",
        Total_Questions: 12,
        id: "4878003000022106041",
        Subject: "English",
        Session_Date_Time: "2024-06-03T11:00:00+05:30",
      },
      {
        Session_Name: "The World of Living",
        Total_Questions: 10,
        id: "4878003000022106046",
        Subject: "Science",
        Session_Date_Time: "2024-06-04T11:00:00+05:30",
      },
      {
        Session_Name: "Playing with Numbers",
        Total_Questions: 10,
        id: "4878003000022127101",
        Subject: "Math",
        Session_Date_Time: "2024-06-05T11:00:00+05:30",
      },
      {
        Session_Name: "Verbs",
        Total_Questions: 12,
        id: "4878003000022127106",
        Subject: "English",
        Session_Date_Time: "2024-06-06T11:00:00+05:30",
      },
      {
        Session_Name:
          "Paper Folding and Paper Cutting, Cubes and Dice, Dot situation",
        Total_Questions: 10,
        id: "4878003000022127111",
        Subject: "Math",
        Session_Date_Time: "2024-06-07T11:00:00+05:30",
      },
      {
        Session_Name: "Fibre to Fabric",
        Total_Questions: 10,
        id: "4878003000022127116",
        Subject: "Science",
        Session_Date_Time: "2024-06-08T11:00:00+05:30",
      },
      {
        Session_Name: "Data Handling",
        Total_Questions: 10,
        id: "4878003000022127121",
        Subject: "Math",
        Session_Date_Time: "2024-06-09T11:00:00+05:30",
      },
    ],
    coinsHistory: [
      {
        Coins: 1500,
        Updated_Date: "2024-04-28",
        id: "1",
        Action_Type: "Credit",
        Description: "First 100 quizzes completed",
      },
      {
        Coins: 200,
        Updated_Date: "2024-03-28",
        id: "2",
        Action_Type: "Credit",
        Description: "Lucky Draw Winner",
      },
      {
        Coins: 1000,
        Updated_Date: "2023-12-05",
        id: "3",
        Action_Type: "Credit",
        Description: "First 50 quizzes completed",
      },
    ],
    newUser: true,
    difficulty: false,
  },
  mode: "user",
  products: [
    {
      Description:
        "Convert your 5000 coins to get 25 quiz balance & enjoy 25 free quizzes.",
      Product_Id: "4878003000018975081",
      Product_Name: "25 Quiz Balance",
      Product_Image_URL:
        "https://dl.dropboxusercontent.com/scl/fi/5r0rwnuab870gqe7r4hjh/25-quin.jpg?rlkey=3hq0cvmyqqpmntr8rq2874mtn&dl=0",
      Unit_Price: 5000,
      Product_Stock: null,
    },
    {
      Description:
        "The space eraser is a great stationary stuff that can be carried to school or art class.\nSmooth erasing capability and colorful design",
      Product_Id: "4878003000019519001",
      Product_Name: "Asera Space Erasers",
      Product_Image_URL:
        "https://dl.dropboxusercontent.com/scl/fi/ufn709tmz57lees3endpo/dsfds.jpg?rlkey=i29b1nvjf2bwzgoctmr321k8v&dl=0",
      Unit_Price: 700,
      Product_Stock: null,
    },
    {
      Description:
        "Great for Anxiety & Stress Relief: Sensory fidget toy is great for the person with autism, the elderly, adults and children who need to relieve stress. It will effectively help to relieve anxiety and stress, restore the mood. The fidget toy with Popping sounds, it’s very enjoyable and decompressed.",
      Product_Id: "4878003000018837056",
      Product_Name: "VGRASSP Pop It Fidget Sensory Toys",
      Product_Image_URL:
        "https://m.media-amazon.com/images/I/71zT99OtJPL._SX679_.jpg",
      Unit_Price: 1000,
      Product_Stock: null,
    },
    {
      Description:
        "Package Includes - Flair Wooden Pencil 1 Pc , Flair 12 Pcs Sketch Pens (Pack 1) , 12 Psc Flair Wax Crayons (Pack 1) , Flair 1 Pc Eraser , Flair Plastic Scale 1 Pc (15 cm) , Flair Sharpener 1 Pc . Set of 2 Student Kit.\nIt Is A Well Curated Kit Which Includes A Wide Range Of Products Required By Your Child.",
      Product_Id: "4878003000019174012",
      Product_Name: "Flair Creative Series Student Kit",
      Product_Image_URL:
        "https://m.media-amazon.com/images/I/61P-SqFsOpL._SX679_.jpg",
      Unit_Price: 1000,
      Product_Stock: null,
    },
    {
      Description:
        "This book is brimming with memory, word and number workouts, codes, battleships and mind-bending spot the differences, as well as Japanese puzzles including hanjie, kakuro, futoshiki, sudoku and lots more.",
      Product_Id: "4878003000018837013",
      Product_Name: "BRAIN GAMES [Paperback] Moore",
      Product_Image_URL:
        "https://m.media-amazon.com/images/I/81lmGXLmjuL._SY466_.jpg",
      Unit_Price: 1500,
      Product_Stock: null,
    },
    {
      Description:
        "SMOOTH WRITING FEELING : We Use Low Viscosity Ink For An Effortless Writing Experience. These Pens Are Designed For A Consistent Flow Of Ink Through The Fine Point Tip, Even With Heavy Usage.",
      Product_Id: "4878003000018975016",
      Product_Name: "Pentonic Multicolor Gel Pen With Hard Box Case",
      Product_Image_URL:
        "https://m.media-amazon.com/images/I/618k-RIZB4S._SX679_.jpg",
      Unit_Price: 1500,
      Product_Stock: null,
    },
    {
      Description:
        "Specially designed self centering compass, for ease and accuracy while drawing circles and angles.\nBoth divider and compass are made with non-rusting strong material to last long and remain in shape and shine.\nThe plastic used in ruler, protractor and set square are made of high transparency plastic and comes with precise marking for easy reading and accurate drawings",
      Product_Id: "4878003000018975021",
      Product_Name: "Camlin Scholar Mathematical Drawing Instruments",
      Product_Image_URL:
        "https://m.media-amazon.com/images/I/71WcwtLvJfL._SX679_.jpg",
      Unit_Price: 1500,
      Product_Stock: null,
    },
    {
      Description:
        "These printer paper are great essentials for scrapbook layers, school educational games, kids craft. With this cardstock, your crafting possibilities are endless. It is an ideal raw material for a range of DIY projects. A variety of colors can exercise children's color recognition ability, stimulate imagination, creativity, cultivate manual skills and practical operation ability.",
      Product_Id: "4878003000018975031",
      Product_Name: "Eclet A4 100 Coloured Sheets",
      Product_Image_URL:
        "https://m.media-amazon.com/images/I/51U6mPGApHL._SX679_.jpg",
      Unit_Price: 1500,
      Product_Stock: null,
    },
    {
      Description:
        "Easily To Keep Notes Organized & Up To Date. Separate sign and date column.\nAssignment / Project/ School Work Etc.\nSmooth surface and Both Side ruled lines. Multipurpose Sheets\nA4 Size Both Side Ruled colour Sheet for Project/Assignment/Practical/Homework.",
      Product_Id: "4878003000018975036",
      Product_Name: "Eclet A4 Size Both Side Ruled colour Sheet",
      Product_Image_URL:
        "https://m.media-amazon.com/images/I/712ONrHRQQL._SX679_.jpg",
      Unit_Price: 1500,
      Product_Stock: null,
    },
    {
      Description:
        "Best for scrapbooking, hobby crafts, project making, decorations.\nAssignment / Project Work/ Home Work etc.\nGlorious colour and each sheet made with supreme finish.",
      Product_Id: "4878003000018975041",
      Product_Name: "Eclet One Side Ruled Designer Sheets",
      Product_Image_URL: "https://m.media-amazon.com/images/I/411ImLGHslL.jpg",
      Unit_Price: 1500,
      Product_Stock: null,
    },
    {
      Description:
        "Eye Protection: Writing tablet adopt newest pressure-sensitive technology LCD screen for easy viewing and no glare and without radiation, blue light, your eyes will not be tired at all even with a long time usage on this electronic writing tablet. No worry about vision loss.",
      Product_Id: "4878003000018975001",
      Product_Name:
        "Gizga Essentials Magic Slate Digital LCD Writing Tablet with Stylus Pen",
      Product_Image_URL:
        "https://m.media-amazon.com/images/I/615XRh8q9-L._SX679_.jpg",
      Unit_Price: 2000,
      Product_Stock: null,
    },
    {
      Description:
        "[LATEST IMPROVED TECHNOLOGY] : Portronics New RuffPad 8.5E LCD Writing Tablet uses the Newest LCD pressure-sensitive technology and lets you draw thick and thin lines as per your preference based on the pressure on the stylus. It comes with a large 8.5 inches display. The LCD screen is totally safe, radiation free, glare free, non-toxic, light-weight, comfortable and perfect in your or your little one’s hands.",
      Product_Id: "4878003000018975006",
      Product_Name: "Portronics Ruffpad 8.5E Re-Writable LCD Writing Pad",
      Product_Image_URL:
        "https://m.media-amazon.com/images/I/51nzIs6jTCL._SX679_.jpg",
      Unit_Price: 2000,
      Product_Stock: null,
    },
    {
      Description:
        "Cable World Toys & Games Pack contains: 1 Glitter 1 Metal Pencil Box, 2 Pencils, 1 Eraser, 1 Sharper, 1 Scale, 6 Crayons Color.Cable World.",
      Product_Id: "4878003000018975011",
      Product_Name: "Cable World Stationary Kit Set",
      Product_Image_URL:
        "https://m.media-amazon.com/images/I/71dmdFUrSuL._SY879_.jpg",
      Unit_Price: 2000,
      Product_Stock: null,
    },
    {
      Description:
        "Scrapper tool for effective colouring techniques\nEven colouring texture\nIdeal for intermixing, shading, highlighting and texturing\nCountry of Origin: India",
      Product_Id: "4878003000018975056",
      Product_Name: "DOMS 50 Shades Oil Pastel With Case",
      Product_Image_URL:
        "https://m.media-amazon.com/images/I/61FLzg6ZAXS._SX679_.jpg",
      Unit_Price: 2300,
      Product_Stock: null,
    },
    {
      Description:
        "Enjoy Blending & Experimenting Different Art Shades.\nNon-Toxic, Easy To Use & Safe For Childrens.\nExperience Opaque Effect & Matte Finish of Poster Colors.",
      Product_Id: "4878003000018975066",
      Product_Name: "Doms 14 Shades Poster Colours",
      Product_Image_URL:
        "https://m.media-amazon.com/images/I/61schqFP62S._SX425_.jpg",
      Unit_Price: 2300,
      Product_Stock: null,
    },
    {
      Description:
        "THIS IS QUIRKY AND USEFUL GIFT PERFECT FOR OFFICE / HOME WHICH MAKES IT A MUST HAVE .\nIT IS A DIARY STYLE DESK ORGANIZER,MEMO NOTE PAD WITH A CLOSED SIZE OF 7.5 X 4.5 INCH approx.\nIT HAS 3 SIZES OF STICKY NOTE PAD& 1 PAD OF LOOSE SHEETS WITH CLIP HOLDER AND A PEN.",
      Product_Id: "4878003000018975026",
      Product_Name:
        "COI Memo Note Pad/Memo Note Book with Sticky Notes & Clip Holder in Diary Style",
      Product_Image_URL:
        "https://m.media-amazon.com/images/I/71LUXxtx26L._SX679_.jpg",
      Unit_Price: 2500,
      Product_Stock: null,
    },
    {
      Description:
        "he cute unicorn pencil case with fantastic colors, 3D unicorn embossed technique adds more vivacity to pencil case, depicting the colorful dreams of every child. Flip cover design with zipper, easy to access all the items inside. Unicorn pattern makes it more exquisite and creative. Kids will love it.",
      Product_Id: "4878003000018975051",
      Product_Name:
        "Sanghariyat 3D Unicorn Pencil Case, Cute Large Capacity Pen Box",
      Product_Image_URL:
        "https://m.media-amazon.com/images/I/61uPN4sW3bL._SX679_.jpg",
      Unit_Price: 2700,
      Product_Stock: null,
    },
    {
      Description:
        "This carrying pencil case is made of durable and stylish EVA material, compressive, shockproof, waterproof, all-round protection of stationery. this cute pencil case comes with a embossed SPACE ASTRONAUT pattern on the front that gives a vivid look and make your kid happy.",
      Product_Id: "4878003000018975061",
      Product_Name:
        "Okean® 3D Cover EVA Space Astronaut Theme Pencil Case Large Capacity Pencil Pouch",
      Product_Image_URL:
        "https://m.media-amazon.com/images/I/515pLbTWFjL._SX425_.jpg",
      Unit_Price: 2700,
      Product_Stock: null,
    },
    {
      Description:
        "Double Layer Metal Pencil Case for Kids Boys/Pencil Case for Students.",
      Product_Id: "4878003000018837008",
      Product_Name: "FunBlast Metal Car Pencil Box",
      Product_Image_URL:
        "https://m.media-amazon.com/images/I/71FGMud5-PL._SX679_.jpg",
      Unit_Price: 3000,
      Product_Stock: null,
    },
    {
      Description:
        "Linen Material Spectacle Case.\nComfortable Size case for most spectacles.\nL: 16 cm B: 6 cm W: 3 cm.\nWeight: 165 gm.",
      Product_Id: "4878003000019174007",
      Product_Name: "Sunshades Linen Spectacle Case Sunglass Case",
      Product_Image_URL:
        "https://m.media-amazon.com/images/I/51j7G-SI0yL._SX522_.jpg",
      Unit_Price: 3000,
      Product_Stock: null,
    },
    {
      Description:
        "This pencil box is the best stationary kit organizer for school going kids and children. Suitable for Nursery to secondary school children.\nPencil Case for Students – This unique design pouch can accommodate all the necessary stationery that your child would need to carry to school with separate slots for pencil, rubber, eraser, geometric set.",
      Product_Id: "4878003000018975046",
      Product_Name: "Okean 3D Astronaut Pencil Box Space Pencil Case for Kids,",
      Product_Image_URL:
        "https://m.media-amazon.com/images/I/51Lb-uwKaHL._SX679_.jpg",
      Unit_Price: 3500,
      Product_Stock: null,
    },
    {
      Description:
        "Leakproof & Unmixed: lid is available for locking food in lunch box tightly, inner divider for keeping food in compartments, not mixed up in the box.\n4 Compartments: the lunch box with 4 isolation compartments - two small and two large, can allow to store different food for adults and kids.",
      Product_Id: "4878003000018975071",
      Product_Name:
        "PURAM 4 Compartment Lunch Box Reusable Microwave Freezer Safe Food Containers with Spoon",
      Product_Image_URL:
        "https://m.media-amazon.com/images/I/61XMukZxQaL._SX425_.jpg",
      Unit_Price: 3500,
      Product_Stock: null,
    },
    {
      Description:
        "Material: Inner Stainless Steel; Color: Cyan; Package Contents: 1 - Piece Steel Convey Water Bottle (630 ml).\nInsulated 304 stainless steel interior that regulates the temperature and keeps the drink hot or cold for hours.",
      Product_Id: "4878003000018975076",
      Product_Name:
        "Milton Steel Convey 900 Insulated Inner Stainless Steel Water Bottle",
      Product_Image_URL:
        "https://m.media-amazon.com/images/I/51JA6JE6boS._SY450_.jpg",
      Unit_Price: 3500,
      Product_Stock: null,
    },
    {
      Description:
        "DREAM BIG & BUILD BIG - No limitations, scalable to build as big as desired by adding more pieces to create the master piece. PicassoTiles in colossal styles.",
      Product_Id: "4878003000018837051",
      Product_Name: "Wembley Magnetic Tiles",
      Product_Image_URL:
        "https://m.media-amazon.com/images/I/61OQQZpTwsL._SX679_.jpg",
      Unit_Price: 5000,
      Product_Stock: null,
    },
    {
      Description:
        "1.83” HD Large Touch Screen - Fire-Boltt Ninja 3 comes with a 1.83” HD Full Touch Display for smooth swipes and clear vision\n100 workout modes- This smartwatch consists of 60 sports mode to track. Keep a track of all your activities and compare history to analyse your performance. Count steps, distance, and calories burned\nCharging Specs - The watch needs to be charged for 3 hours to reach 100%. The charger should be a 3.7V to 5V adapter or any laptop output. For a bare minimum of 20% charge the watch needs to be charged for about 30-40 mins",
      Product_Id: "4878003000019473016",
      Product_Name:
        'Fire-Boltt Ninja 3 Plus 1.83" Display Smartwatch Full Touch',
      Product_Image_URL:
        "https://m.media-amazon.com/images/I/61nb3mSEQzL._SX679_.jpg",
      Unit_Price: 10000,
      Product_Stock: null,
    },
  ],
  orders: [
    {
      Order_Id: "4878003000019719061",
      Order_Status: "Placed",
      Expected_Delivery_Date: null,
      Product_Name: "Pentonic Multicolor Gel Pen With Hard Box Case",
      Product_Image_URL:
        "https://m.media-amazon.com/images/I/618k-RIZB4S._SX679_.jpg",
      Order_Date: "2024-04-26",
      Unit_Price: 1500,
    },
    {
      Order_Id: "4878003000019729089",
      Order_Status: "Processed",
      Expected_Delivery_Date: "2024-04-28",
      Product_Name: "VGRASSP Pop It Fidget Sensory Toys",
      Product_Image_URL:
        "https://m.media-amazon.com/images/I/71zT99OtJPL._SX679_.jpg",
      Order_Date: "2024-04-21",
      Unit_Price: 1000,
    },
    {
      Order_Id: "4878003000019697417",
      Order_Status: "Delivered",
      Expected_Delivery_Date: "2024-04-18",
      Product_Name:
        "Milton Steel Convey 900 Insulated Inner Stainless Steel Water Bottle",
      Product_Image_URL:
        "https://m.media-amazon.com/images/I/51JA6JE6boS._SY450_.jpg",
      Order_Date: "2024-04-10",
      Unit_Price: 3500,
    },
    {
      Order_Id: "1",
      Order_Status: "Cancelled",
      Expected_Delivery_Date: "2024-03-29",
      Product_Name: "Flair Creative Series Student Kit",
      Product_Image_URL:
        "https://m.media-amazon.com/images/I/61P-SqFsOpL._SX679_.jpg",
      Order_Date: "2024-03-25",
      Unit_Price: 1000,
    },
  ],
  alert: ["credits", "inProgress", "community", "address", "doubt"],
};

const checkTimeAlerts = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const alertObj = [];

  if (
    dayOfWeek === 6 &&
    ((hours > 16 && hours < 18) ||
      (hours === 16 && minutes >= 45) ||
      (hours === 18 && minutes <= 0))
  ) {
    alertObj.push("doubt");
  }

  return alertObj;
};

export const fetchUser = (email) => async (dispatch) => {
  try {
    dispatch(getLoading());
    const authToken = import.meta.env.VITE_APP_AUTH_TOKEN;
    const previousCoins = Number(localStorage.getItem("wise_coins") || 0);
    const url = `https://backend.wisechamps.com/student`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const res = await axios.post(url, { email }, config);
    const alertObj = [];
    if (res.data.credits === 0) {
      alertObj.push("credits");
    }

    const timeAlerts = checkTimeAlerts();
    alertObj.push(...timeAlerts);

    if (!res.data.joinedWisechamps) {
      alertObj.push("community");
    }

    if (!alertObj.includes("credits") && res.data.credits <= 2) {
      alertObj.push("lowCredits");
    }

    if (!res.data.address) {
      alertObj.push("address");
    }

    if (Number(res.data.coins) > previousCoins) {
      localStorage.setItem("wise_coins", res.data.coins);
      alertObj.push("coins");
    }

    dispatch(setAlert(alertObj));

    if (res.data.status === 200) {
      localStorage.setItem("wise_email", email);
      if (email === "teststudent@wisechamps.com") {
        dispatch(
          setUser({
            name: dummyUserData.user.name,
            credits: dummyUserData.user.credits,
            coins: dummyUserData.user.coins,
            email,
            phone: dummyUserData.user.phone,
            id: res.data.contactId,
            studentName: dummyUserData.user.studentName,
            grade: res.data.grade,
            address: res.data.address,
            referrals: dummyUserData.user.referrals,
            quizzes: dummyUserData.user.quizzes || [],
            age: dummyUserData.user.age,
            category: dummyUserData.user.category,
            coinsHistory: dummyUserData.user.coinsHistory,
            weeklyQuizzes: res.data.weeklyQuizzes,
            newUser: res.data.newUser,
            difficulty: res.data.difficulty,
          })
        );
        dispatch(setOrders(dummyUserData.orders));
        dispatch(setMode(res.data.mode));
        return;
      }

      dispatch(
        setUser({
          name: res.data.name,
          credits: res.data.credits,
          coins: res.data.coins,
          email,
          phone: res.data.phone,
          id: res.data.contactId,
          studentName: res.data.studentName,
          grade: res.data.grade,
          address: res.data.address,
          referrals: res.data.referrals === 0 ? [] : res.data.referrals,
          quizzes: res.data.quizzes === 0 ? [] : res.data.quizzes,
          age: res.data.age,
          category: res.data.category,
          coinsHistory:
            res.data.coinsHistory === 0 ? [] : res.data.coinsHistory,
          weeklyQuizzes: res.data.weeklyQuizzes,
          newUser: res.data.newUser,
          difficulty: res.data.difficulty,
        })
      );
    }

    dispatch(setMode(res.data.mode));
  } catch (error) {
    dispatch(getError());
  }
};

export const getProducts = () => async (dispatch) => {
  try {
    const authToken = import.meta.env.VITE_APP_AUTH_TOKEN;
    const url = `https://backend.wisechamps.com/student/store`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const res = await axios.get(url, config);
    if (res.data.status === 200) {
      dispatch(setProducts(res.data.products));
    }
  } catch (error) {
    console.log("Error :", error);
  }
};

export const getOrders = (contactId) => async (dispatch) => {
  try {
    const authToken = import.meta.env.VITE_APP_AUTH_TOKEN;
    const url = `https://backend.wisechamps.com/student/store/orders`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const res = await axios.post(url, { contactId: contactId }, config);
    if (res.data.status === 200) {
      dispatch(setOrders(res.data.orders));
    }
  } catch (error) {
    console.log("Error :", error);
  }
};

export const getReportDataNew = (email) => async (dispatch) => {
  try {
    dispatch(getLoading());
    const url = `https://backend.wisechamps.com/quiz/report`;
    const res = await axios.post(url, { email: email });
    if (res.data.mode === "user") {
      dispatch(
        setReport({
          percentage: res.data.percentage,
          sessions: res.data.sessions,
        })
      );
    }
  } catch (error) {
    console.log("Error :", error);
  }
};

export const getWinnersData = (grade) => async (dispatch) => {
  try {
    const authToken = import.meta.env.VITE_APP_AUTH_TOKEN;
    const url = `https://backend.wisechamps.com/student/weekly/winners`;
    const res = await axios.post(
      url,
      { grade: grade },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    if (res.data.status === 200) {
      dispatch(setWinners(res.data));
    }
  } catch (error) {
    console.log("Error :", error);
  }
};

export const getUserPaymentHistory = (contactId) => async (dispatch) => {
  try {
    const authToken = import.meta.env.VITE_APP_AUTH_TOKEN;
    const url = `https://backend.wisechamps.com/student/payment/history`;
    const res = await axios.post(
      url,
      { contactId: contactId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    dispatch(
      setPaymentHistory({
        status: res.data.status,
        data: res.data.status === 200 ? res.data.paymentHistory : [],
      })
    );
  } catch (error) {
    console.log("Error :", error);
  }
};

export const getDailyQuestion = (grade, contactId) => async (dispatch) => {
  try {
    const authToken = import.meta.env.VITE_APP_AUTH_TOKEN;
    const url = `https://backend.wisechamps.com/question/daily`;
    const res = await axios.post(
      url,
      { grade, contactId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    dispatch(setOqad(res.data));
  } catch (error) {
    console.log("Error :", error);
  }
};

export const captureDailyQuestionAttempt =
  ({ contactId, questionId, optionSelected, correctAnswer }) =>
  async (dispatch) => {
    try {
      const authToken = import.meta.env.VITE_APP_AUTH_TOKEN;
      const url = `https://backend.wisechamps.com/question/attempt`;
      await axios.post(
        url,
        {
          contactId,
          questionId,
          optionSelected,
          correctAnswer,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    } catch (error) {
      dispatch(getError());
    }
  };

export const updateDifficultyLevel =
  (contactId, difficulty, user) => async (dispatch) => {
    try {
      const authToken = import.meta.env.VITE_APP_AUTH_TOKEN;
      const url = `https://backend.wisechamps.com/user/update`;
      const res = await axios.post(
        url,
        { contactId, difficulty },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (res.status === 200 || res.data.status === 200) {
        dispatch(setUser({ ...user, difficulty: difficulty }));
      }

      return {
        status: res.status || res.data.status,
      };
    } catch (error) {
      console.log("Error :", error);
      return {
        status: error.status || 500,
      };
    }
  };
