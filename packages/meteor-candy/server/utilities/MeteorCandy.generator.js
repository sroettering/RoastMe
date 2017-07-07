MeteorCandy.generator = {};

MeteorCandy.generator.profile = {
	getField: function (userDoc, field, fallback) {
		// if (typeof fallback == "undefined") {
			fallback = fallback || null;	
		// } 

		if (field) {
			field = field.split('.');

			for (var i = 0; i < field.length; i++) {
				if (typeof userDoc[field[i]] == "undefined") {
					return fallback;
				}
				userDoc = userDoc[field[i]];
			}
		}

		return userDoc;
	},
	generateProfile: function (doc) {
		fields = MeteorCandy.server.profile;
		result = {};
		
		fields.forEach(function (item) {
			mlkmlkm = MeteorCandy.generator.profile.getField(doc, item.field);
			
			if (mlkmlkm) {
				if (item.content) {
					result[item.name] = item.content(mlkmlkm)	
				} else {
					result[item.name] = mlkmlkm
				}
			}
		});

		return result;
	},
	generate: function (documents) {
		data = []
		
		if (typeof documents === "object") {
			documents.forEach(function (user) {
				data.push(MeteorCandy.generator.profile.generateProfile(user));
			});
		}

		return data;
	}
};

MeteorCandy.generator.profile.fields = {
	displayName: function (document) {
		
		MeteorCandyNamer = {
			result: "",
			counter: 0,
			addToResult: function (name) {
				if (counter) this.result = this.result + ", ";
				counter = counter + 1;
				this.result = this.result + name;
			},
			add: function (data) {
				if (typeof data === "object") {
					data.forEach(function (item) {
						MeteorCandyNamer.addToResult(item.address)
					})
				}

				if (data && typeof data !== "object") {
					MeteorCandyNamer.addToResult(data);	
				}
			}
		}
		
		MeteorCandy.packages.forEach(function (package) {
			targetField = package.field

			if (package.field === "emails.address") {
				targetField = "emails";
			}

			value = MeteorCandy.generator.profile.getField(document, targetField);

			if (value) {
				MeteorCandyNamer.add(value);
			}
		});

		return MeteorCandyNamer.result;
	},
	avatar: function (document) {
		photo = null;

		MeteorCandy.packages.forEach(function (package) {
			if (package.avatar) {
				targetField = package.avatar

				if (package.avatar === "emails.address") {
					targetField = "emails";
				}

				target = MeteorCandy.generator.profile.getField(document, targetField);	
			
				if (target) {
					if (package.avatarLogic) {
						photo = package.avatarLogic(target);
					} else {
						photo = target;
					}
				}
			}
		});

		return photo;
	}
};