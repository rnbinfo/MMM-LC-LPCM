
const recorder = require('node-record-lpcm16');
const fs = require('fs');
const Log = require("logger");
let recordingStream = null;
let isKill = false;

let NodeHelper = require("node_helper");

module.exports = NodeHelper.create({

	// Override socketNotificationReceived method.

	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the noitication.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: function(notification, payload) {
		if (notification === "start-record") {
			this.record();
		}

		if(notification==="kill-record"){
			this.kill();
		}
	},

	// // Test another function
	// anotherFunction: function() {
	// 	return {date: new Date()};
	// }

	record(ctx) {
		Log.info("Start recording...");
		let file = fs.createWriteStream(__dirname + '/sound/question.wav', {encoding: 'binary'})

		recordingStream = recorder.record({
			recorder: 'sox',
			device: "plughw:3",
			sampleRate: 48000,
			channels: 1,
			threshold: 5,
			silence: '2.0',
			endOnSilence: true
		})

		recordingStream.stream()
			.on('end', async () => {
				// Create a buffer from our recording, it should only be a few seconds long.
				Log.info("Stop recording...");
				// ctx.emit("stop.recording", ctx);
				if(!isKill) {
					this.sendSocketNotification("stop-record", null);
				}
				isKill = false;
			})
			.pipe(file);

		// ctx.emit("dectecting.slience", ctx);
	},

	async kill() {
		Log.info(`no sound capture in 30 secs, will stop recording and start snowboy`);
		isKill = true;
		recordingStream.stop();
		await this.sleep("1000");
		this.sendSocketNotification("kill-record", null);

	},

	sleep(time) {
		return new Promise(function (resolve) {
			setTimeout(resolve, time);
		});
	}

});
