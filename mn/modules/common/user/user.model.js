"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, default: "" },
  email: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
  },
  countryCode: { type: String, required: true },
  plantCode:{ type: String, default:""},
  mobile: {type: String, default: "" },
  permissions: { type: String, default: "all" },
  companyUserId: { type: String, default: "" },
  userType: { type: String, default: "admin" },
  hash: { type: String, required: true },
  sessionToken: { type: String, required: true },
  uniqueId: { type: String, required: true },
  referredBy: { type: String, default: "" },
  loginAs: { type: String, default: "5" },
  permissionTypes: { type: String, default: "" },
  status: { type: Number, default: 1 },
  databaseName: { type: String, default: "" },
  userSlug: { type: String, default: "" },
  userRelation: { type: Array, default: [] },
  sendOtp: { type: Number, default: "" },
  userVerify: { type: Number, default: 0 },
  address: { type: String, default: "" },
  profileImg: { type: String, default: "" },
  genderSatatus: { type: String, default: "" },
  dob: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


const loginSchema = new Schema({
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  userSlug: { type: String, default: "" },
  userRelation: { type: Array, default: [] },
  countryCode: { type: String, default: "" },
  permissions: { type: String, default: "all" },
  companyUserId: { type: String, default: "" },
  userType: { type: String, default: "admin" },
  hash: { type: String, default: "" },
  sessionToken: { type: String, default: "" },
  uniqueId: { type: String, default: "" },
  referredBy: { type: String, default: "" },
  loginAs: { type: String, default: "5" },
  permissionTypes: { type: String, default: "" },
  status: { type: Number, default: 1 },
  databaseName: { type: String, default: "" },
  email: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
  },
  sendOtp: { type: Number, default: "" },
  userVerify: { type: Number, default: 0 },
  address: { type: String, default: "" },
  genderSatatus: { type: String, default: "" },
  dob: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const profileSchema = new Schema({
  firstName: { type: String, default: "" },
  lastname: { type: String, default: "" },
  dob: { type: String, required: true },
  genderSatatus: { type: String, required: true },
  address: { type: String, default: "" },
  alterMobile: { type: String, default: "" },
  alterEmail: { type: String, default: "" },
});

const superAdminSchema = new Schema({
  firstName: { type: String, required: true },
  userName: { type: String, required: true },
  lastName: { type: String, default: "" },
  email: { type: String, required: true, unique: true, sparse: true },
  mobile: { type: Number, required: true, unique: true, sparse: true },
  hash: { type: String, required: true },
  status: { type: Number, default: 1 },
  sessionToken: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const companyVerifiedSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  status: { type: Number, default: 1 },
  verified: { type: Number, default: 0 },
  userType: { type: Number, required: true },
});

const userAssignDataBaseSchema1 = new Schema({
  userRelation: { type: Array, default: [] },
  updateDate: { type: Date, default: Date.now },
});

const informationSchema = new Schema({
  ip_address: { type: String, default: "" },
  mobile: { type: Number, default: "" },
  coOrdinates: { type: Object, default: "" },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const userAssignDataBase1 = mongoose.model(
  "userAssignDataBase1",
  userAssignDataBaseSchema1,
  "tbl_user"
);

const User = mongoose.model("user", userSchema, "tbl_user");
const Profile = mongoose.model("Profile", profileSchema, "tbl_user");
const SuperAdmin = mongoose.model("superAdmin", superAdminSchema, "tbl_admin");
const CompanyVerified = mongoose.model(
  "companyVerified",
  companyVerifiedSchema,
  "tbl_company_info"
);

const informationData = mongoose.model(
  "informationData",
  informationSchema,
  "tbl_information"
);

const loginUser = mongoose.model("loginUser", loginSchema, "tbl_user");

// Exporting our model objects
module.exports = {
  userAssignDataBase1,
  User,
  Profile,
  SuperAdmin,
  CompanyVerified,
  informationData,
  loginUser,
};
