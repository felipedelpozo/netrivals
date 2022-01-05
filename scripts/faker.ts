import FormulaModel from "../src/models/formula";
import ProductModel from "../src/models/product";

require("dotenv").config();

const bestbuy = require("bestbuy")(process.env.BESTBUY_APIKEY);
const cliProgress = require("cli-progress");
const { applicationDefault, initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const formulasData = require("./data/formulas.json");

const app = initializeApp({
  credential: applicationDefault(),
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
});

const db = getFirestore(app);

const createBarProcess = () =>
  new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const fakerProducts = () => {
  const barProcess = createBarProcess();

  const productCollection = db.collection("products");
  let batch = db.batch();

  const addProduct = (product: ProductModel) => {
    try {
      batch.set(productCollection.doc(), {
        ...product,
        equation: formulasData[Math.floor(Math.random() * formulasData.length)],
      });
    } catch (error) {
      console.log(error, "database seed failed");
    }
  };

  let productsStream = bestbuy.productsAsStream(
    process.env.BESTBUY_SEARCH_QUERY,
    {
      show: "image,modelNumber,name,regularPrice,salePrice,sku,thumbnailImage,type,upc,url",
    }
  );

  productsStream.on("total", function (total: number) {
    barProcess.start(total, 0);
  });

  productsStream.on("data", (data: ProductModel) => {
    addProduct(data);
    barProcess.increment();
  });

  productsStream.on("end", () => {
    batch.commit();
    barProcess.stop();
  });

  productsStream.on("error", function (error: any) {
    console.error(`Error status: ${error.status}`);
    console.error(`Error headers: ${error.headers}`);
    console.error(`Error body: ${error.body}`);
    console.error(`Error cause: ${error.cause}`);
    barProcess.stop();
  });
};

const fakerFormulas = () => {
  const barProcess = createBarProcess();

  const formulasCollection = db.collection("formulas");
  let batch = db.batch();

  const addFormula = (formula: FormulaModel) => {
    try {
      batch.set(formulasCollection.doc(), formula);
    } catch (error) {
      console.log(error, "database seed failed");
    }
  };

  formulasData.forEach((formula: FormulaModel) => {
    addFormula(formula);
    barProcess.increment();
  });

  batch.commit();
  barProcess.stop();
};

const init = () => {
  fakerFormulas();
  fakerProducts();
};

init();
