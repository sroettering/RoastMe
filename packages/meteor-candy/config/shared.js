MeteorCandy.shared = {
	// instead of defining permissions, you can just write the userId's of who is allowed to use it
	whitelist: [],

	// Meteor Candy uses Meteor.isDevelopment to determine the application state
	// However, you can force development off with the flag below
	disableDevelopmentMode: false,

	// These are tasks that would be run against user accounts
 	tasks: [{
		name: "Sign Into Account",
		server: function (userId) {
			self._setUserId(userId)
		},
		client: function (result) {
			Meteor.connection.setUserId(userId);
			MeteorCandy.set("impersonation", true);
		}
	},
	{
		name: "Delete Account",
		prompt: "To remove, please enter REMOVE to confirm.",
		refresh: true,
		server: function (userId, param) {
			if (param === "REMOVE") {
				return Meteor.users.remove(userId)
			}
		},
		client: function (result) {
			if (result === 1) {
				alert("The account has been deleted.");
			} else {
				alert("There might have been an error removing this account. Please reload and check.");
			}
		}
	}]

};
