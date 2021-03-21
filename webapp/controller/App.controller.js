sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/viz/ui5/data/FlattenedDataset',
	"../api/RESTService",
], function (Controller, FlattenedDataset, API) {
	"use strict";

	return Controller.extend("app.controller.App", {
		onInit: function () {
			//this.createTableContent();
			this.initControls()
			this.initModels();
			//this.updateVizFrame();
		},

		initControls() {
			this.homePage = this.byId('homePageId');
			this.vizFrame = this.getView().byId("idStackedChart");
		},

		initModels() {
			this.model = this.getOwnerComponent().getModel("model");
			this.homePage.setBusy(true);
			API.getSalesPerMonth().done((data) => {
				this.model.setData(data);
				this.getView().setModel(this.model, "Model");
				this.vizFrame.setVizProperties({
					plotArea: {
						colorPalette: d3.scale.category20().range(),
						dataLabel: {
							showTotal: true
						}
					},
					tooltip: {
						visible: true
					},
					title: {
						text: ""
					}
				});
				var oDataset = new FlattenedDataset({
					dimensions: [{
						name: "Mês",
						value: "{monthText}"
					}],
					measures: [{
						name: "Vendas (R$)",
						value: "{totalsales}"
					}],
					data: {
						path: "/items"
					},
					dataLabel: {
						name: "Value Label",
						defaultState: true
					}
				});

				this.vizFrame.setDataset(oDataset);

				this.vizFrame.setModel(this.model);

				var oFeedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
					"uid": "valueAxis",
					"type": "Measure",
					"values": ["Vendas (R$)"]
				}),

					oFeedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
						"uid": "categoryAxis",
						"type": "Dimension",
						"values": ["Mês"]
					});

				this.vizFrame.setVizProperties({
					plotArea: {
						dataLabel: {
							visible: true
						}
					}
				});
				this.vizFrame.addFeed(oFeedValueAxis);
				this.vizFrame.addFeed(oFeedCategoryAxis);
				this.homePage.setBusy(false);
			});
		},

		createTableContent() {

		},

		updateVizFrame() {
			this.createDataset()
		},

		createDataset() {
		}

	});

}
);
