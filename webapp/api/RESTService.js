sap.ui.define([], function () {
	"use strict";

	// Reference App REST Service
	return {

		buildUrl: function (url) {
			return "/app/api" + url;
		},

		getSalesPerMonth: function () {
			return $.ajax({
				url: "/api/salesMonth",
				method: "GET",
				contentType: "application/json; charset=utf-8"
			});
		},

	};
});
