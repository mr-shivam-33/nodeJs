const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productInfoSchema = new Schema({
  customerId: { type: String, default:''},
  productCode: { type: String, required: true },
  batchNo: { type: String, required: true, unique: true, sparse: true},
  placeOfManufacturing: { type: String, required: true },
  dateOfManufacturing: { type: Date, default: Date.now },
  dateOfDispatch: { type: Date, default: Date.now },
  dispatchPlace: { type: String, required: true },
  retailPrice: { type: String, required: true },
  salePrice: { type: String, required: true },
  mrpPerKg: { type: String, default: "" },
  unit: { type: String, default: "" },
  website: { type: String, required: true },
  customerCare: { type: String, required: true }, 
   status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ProductInfo = mongoose.model("productInfo", productInfoSchema, 'tbl_product_info');

module.exports = { ProductInfo }