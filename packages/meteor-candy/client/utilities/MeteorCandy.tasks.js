MeteorCandy.tasks = {
	data: {},
	isLoading: function () {
		return MeteorCandy.get('taskRunning');
	},
	prepare: function () {
		MeteorCandy.shared.tasks.forEach(function (task) {
			MeteorCandy.tasks.data[task.name] = task;
		});
	},
	run: function (name, userId) {
		task = MeteorCandy.tasks.data[name],
		param = "";

		// If there is a question, then run the prompt
		if (typeof task.prompt !== "undefined") {
			param = prompt(task.prompt);

			if (!param) {
				return;
			}
		}

		if (task.server) {
			MeteorCandy.set('taskRunning', true);

			Meteor.call("MeteorCandy/runTask", name, userId, param, function (e,r) {
				MeteorCandy.delete('taskRunning');
				if (e) {
					alert("There was an error running this task. Please check the console and/or try again later.");
				} else {
					if (task.client) {
						task.client(r);
					}
					if (task.refresh) {
						MeteorCandy.reloadAllData();
					}
				}
			})
		} else {
			task.client();
		}
	}
};