MeteorCandy = {};

MeteorCandy.adapter = {
	email: {
		name: "Email",
		package: "accounts-password",
		field: "emails.address",
		
		avatar: "emails.address",
		avatarLogic: function (emails) {
			firstEmail = emails[0].address;
			avatar = false;
			// Could implement Gravatar here
			// but hard to find a MD5 library
			// that doesn't have licensing issues
			return avatar;
		}
	},
	username: {
		name: "Username",
		package: "accounts-password",
		field: "username"
	},
	facebook: {
		name: "Facebook",
		package: "accounts-facebook",
		field: "services.facebook.name",
		avatar: "services.facebook.id",
		avatarLogic: function (avatar) {
			return "http://graph.facebook.com/" + avatar + "/picture/?type=large";
		}
	},
	github: {
		name: "GitHub",
		package: "accounts-github",
		field: "services.github.username",
		avatar: "services.github.username",
		avatarLogic: function (avatar) {
			return "http://avatars.githubusercontent.com/" + avatar + "?s=200";
		}
	},
	google: {
		name: "Google",
		package: "accounts-google",
		field: "services.google.email",
		avatar: "services.google.picture",
		avatarLogic: function (avatar) {
			return avatar;
		}
	},
	meetup: {
		name: "Meetup",
		package: "accounts-meetup",
		field: "services.meetup.id",
		avatar: ""
	},
	twitter: {
		name: "Twitter",
		package: "accounts-twitter",
		field: "services.twitter.screenName",
		avatar: "services.twitter.profile_image_url_https",
		avatarLogic: function (avatar) {
			return avatar.replace("_normal", "_bigger");
		}
	},
	weibo: {
		name: "Weibo",
		package: "accounts-weibo",
		field: "services.weibo.screenName",
		avatar: ""
	}
};

MeteorCandy.detectConfig = function () {
	detectedPackages = [];
	packages = Object.keys(MeteorCandy.adapter);

	packages.forEach(function (package) {
		packageData = MeteorCandy.adapter[package];

		if (Package[packageData.package]) {
			detectedPackages.push(packageData);
		}
	});

	return detectedPackages;
}


MeteorCandy.checkPermission = function (userId) {
	if (Meteor.isDevelopment && !MeteorCandy.shared.disableDevelopmentMode) {
		return true;
	} else {
		whitelist = MeteorCandy.shared.whitelist || [];

		if (whitelist.length > 0) {
			if (whitelist.indexOf(userId) > -1) {
				return true;
			}
		} else if (MeteorCandy.server.validation(userId)) {
			return true;
		}
	}
}