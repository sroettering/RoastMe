MeteorCandy.tasks = {
	data: {},
	prepare: function () {
		MeteorCandy.shared.tasks.forEach(function (task) {
			MeteorCandy.tasks.data[task.name] = task;
		});
	}
};
