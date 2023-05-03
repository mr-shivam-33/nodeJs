var plantService = require("./plant.service");
mongoose = require("mongoose");

module.exports = {
  addPlant: async (req, res) => {
    try {
      var num = req.body.contactNo;
      var numRegx = /^[0]?[6789]\d{9}$/;

      if (numRegx.test(num)) {
        const validation = await Promise.all([
          plantService.findPlantCode(req.body),
        ]);
        if (validation[0] == null) {
          plantService.addPlant(req.body).then(async (result) => {
            if (result.status == 1) {
              res.json({
                responseStatus: 1,
                responseMsgCode: "success",
                responseData: result.data,
              });
            } else {
              res.json({
                responseStatus: 0,
                responseMsgCode: "failure.",
                responseData: result.data,
              });
            }
          });
        } else if (validation[0].plantCode == req.body.plantCode) {
          res.json({
            responseStatus: 0,
            responseMsgCode: "Plant Code already exists",
            responseData: {},
          });
        }
      } else {
        res.json({
          responseStatus: 0,
          responseMsgCode: "please enter valid mobile number",
          responseData: {},
        });
      }
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },

  getPlantDetails: async (req, res) => {
    try {
      plantService.getPlantDetails(req.body).then(async (result) => {
        if (result.status == 1) {
          res.json({
            responseStatus: 1,
            responseMsgCode: "success",
            responseData: result.data,
          });
        } else {
          res.json({
            responseStatus: 0,
            responseMsgCode: "failure.",
            responseData: result.data,
          });
        }
      });
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },

  updatePlantDetails: async (req, res) => {
    try {
      plantService.updatePlantDetails(req.body).then(async (result) => {
        if (result.status == 1) {
          res.json({
            responseStatus: 1,
            responseMsgCode: "success",
            responseData: result.data,
          });
        } else {
          res.json({
            responseStatus: 0,
            responseMsgCode: "failure.",
            responseData: result.data,
          });
        }
      });
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },

  deletePlant: async (req, res) => {
    try {
      plantService.deletePlant(req.body).then(async (result) => {
        if (result.status == 1) {
          res.json({
            responseStatus: 1,
            responseMsgCode: "success",
            responseData: result.data,
          });
        } else {
          res.json({
            responseStatus: 0,
            responseMsgCode: "failure.",
            responseData: result.data,
          });
        }
      });
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },
};
