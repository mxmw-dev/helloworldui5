sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageBox",
   "sap/m/MessageToast",
   "sap/ui/model/json/JSONModel"
],
   /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
   function (Controller, MessageBox, MessageToast, JSONModel) {
      "use strict";

      return Controller.extend("sap.btp.helloworldui5.controller.View1", {
         onInit: function () {
            this.getUserInfo();
         },
         onPress: function () {

            MessageBox.alert("You have been alerted, {userInfo>/firstname} !");
         },
         getUserInfo: function () {

            //          const url = this.getOwnerComponent().getManifestObject().resolveUri("/user-api/currentUser");
            //          const url = this.getView().getModel() + "/user-api/currentUser";
            //           const url = this.getOwnerComponent().getManifestObject().resolveUri()+ "/user-api/currentUser";
                       const url = this.getBaseURL() + "/user-api/currentUser";
            //           const url = "user-api/currentUser";
            var oModel = new JSONModel();
            var mock = {
               firstname: "Dummy",
               lastname: "User",
               email: "dummy.user@com",
               name: "dummy.user@com",
               displayName: "Dummy User (dummy.user@com)"
            };

            oModel.loadData(url);
            oModel.dataLoaded()
               .then(() => {
                  //check if data has been loaded
                  //for local testing, set mock data
                  if (!oModel.getData().email) {
                     oModel.setData(mock);
                  }
                  this.getView().setModel(oModel, "userInfo");
               })
               .catch(() => {
                  oModel.setData(mock);
                  this.getView().setModel(oModel, "userInfo");
               });
         },

         getBaseURL: function () {
            var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
            var appPath = appId.replaceAll(".", "/");
            var appModulePath = sap.ui.require.toUrl(appPath);
            return appModulePath;
         }
      });
   });