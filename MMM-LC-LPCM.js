let time = 0;
let isRecording = false;

Module.register("MMM-LC-LPCM", {
	defaults: {
		updateInterval: 60000,
		retryDelay: 5000
	},

	//requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		var self = this;
		var dataRequest = null;
		var dataNotification = null;

		//Flag for check if module is loaded
		this.loaded = false;
		// Schedule update timer.
		this.getData();
		setInterval(function() {
			self.updateDom();
		}, this.config.updateInterval);
	},

	/*
	 * getData
	 * function example return data and show it in the module wrapper
	 * get a URL request
	 *
	 */
	getData: function() {
		// this.sendSocketNotification("start-record",null);
		// isRecording = true;
	},


	/* scheduleUpdate()
	 * Schedule next update.
	 *
	 * argument delay number - Milliseconds before next update.
	 *  If empty, this.config.updateInterval is used.
	 */
	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}
		nextLoad = nextLoad ;
		var self = this;
		setTimeout(function() {
			self.getData();
		}, nextLoad);
	},

	getDom: function() {
		var self = this;

		// create element wrapper for show into the module
		var wrapper = document.createElement("div");

		// Data from helper
		if (this.dataNotification) {
			var wrapperDataNotification = document.createElement("div");
			// translations  + datanotification
			wrapperDataNotification.innerHTML =  this.dataNotification;

			wrapper.appendChild(wrapperDataNotification);
		}
		return wrapper;
	},

	getScripts: function() {
		return [];
	},

	getStyles: function () {
		return [
			"hello.css",
		];
	},

	// Load translations files
	getTranslations: function() {
		//FIXME: This can be load a one file javascript definition
		return {
			en: "translations/en.json",
			es: "translations/es.json"
		};
	},


	// socketNotificationReceived from helper
	socketNotificationReceived: function (notification, payload) {

		if(notification === "stop-record") {
			// set dataNotification
			this.dataNotification = "stop-record";
			this.updateDom();
			this.sendNotification("stop-record");
			isRecording = false;
		}

		if(notification === "kill-record"){
			//restart detect hotword
			this.sendNotification("init-hotword");

		}

	},

	// Override notification handler.
	notificationReceived: function (notification, payload, sender) {
		if( notification === "start-record") {
			if(!isRecording){
				isRecording = true;
				this.dataNotification = "start-record";
				this.updateDom();
				this.sendSocketNotification("start-record", null);
				time = 0;
			}
		}

		if(notification === "CLOCK_SECOND"){

			time++;
			console.log(time);
			console.log(isRecording);
			if(time >=20 && isRecording ){
				this.sendSocketNotification("kill-record",null);
				time = 0;
				isRecording = false;
			}
		}
	},

});
