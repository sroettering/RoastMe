MeteorCandy.ui = {
	show: function () {
		if (MeteorCandy.checkPermission())  {
			MeteorCandy.set("display", true);
			MeteorCandy.initialize();
		}
	},
	hide: function () {
		MeteorCandy.set("display", false);
	},
	toggle: function () {
		if (MeteorCandy.get("display")) {
			MeteorCandy.ui.hide();
		} else {
			MeteorCandy.ui.show();
		}
	}
}