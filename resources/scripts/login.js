/*global $:false,browser:true*/
require([
	"manager",
	"lang",
	"utils",
	"pageinit"
], function(manager, L, utils) {

	"use strict";

	$(function() {
		manager.start();
		$("#email").focus();
	});
});
