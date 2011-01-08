var optionGroups = [
	{
		name: "General",
		options: [
			{name: "userName", text: "User name", default: "", help: "You need to set your user name in order to use the bookmark view shortcuts."},
		]
	},
	{
		name: "Menu Items",
		options: [
			{name: "showSaveBookmark", text: "Save Bookmark", default: true, type: "bool", pinboardAction: "saveBookmark"},
			{name: "showReadLater", text: "Read Later", default: false, type: "bool", pinboardAction: "readLater"},
			{name: "showAllBookmarks", text: "All Bookmarks", default: false, type: "bool", pinboardUrl: ""},
			{name: "showPrivateBookmarks", text: "Private Bookmarks", default: false, type: "bool", pinboardUrl: "private/"},
			{name: "showPublicBookmarks", text: "Public Bookmarks", default: false, type: "bool", pinboardUrl: "public/"},
			{name: "showUnreadBookmarks", text: "Unread Bookmarks", default: false, type: "bool", pinboardUrl: "unread/"},
			{name: "showUntaggedBookmarks", text: "Untagged Bookmarks", default: false, type: "bool", pinboardUrl: "untagged/"},
			{name: "showStarredBookmarks", text: "Starred Bookmarks", default: false, type: "bool", pinboardUrl: "starred/"},
		]
	},
	{
		name: "Behavior",
		options: [
			{name: "openPopup", text: "Open Popup Windows", default: false, type: "bool", help: "Open popup windows instead of inlining the Pinboard dialog into the popup bubble."},
			{name: "useHTTPS", text: "Use HTTPS", default: true, type: "bool", help: "Use secure HTTPS URLs for Pinboard."}
		]
	}
];

var options = {};
optionGroups.forEach(function(group) {
	optionGroups[group.name] = group;
	group.options.forEach(function(option) {
		options[option.name] = option;
	});
});

function getOptionValue(name) {
	var opt = options[name];
	if(!opt) {
		console.log("Trying to get nonexistent option " + name);
		return null;
	}
	var val = localStorage.getItem(name);
	if(val !== undefined) {
		if(opt.type === "bool") {
			return ((val == "true" || val == "yes" || val == "on" || !!parseInt(opt, 10)) ? true : false);
		}
		return val;
	}
	return opt.default;
}

function setOptionValue(name, value) {
	var opt = options[name];
	if(opt) {
		if(opt.type == "bool") {
			value = (value ? "true" : "false");
		}
		if (value !== null) {
			localStorage.setItem(name, value);
		}
		else {
			localStorage.removeItem(name);
		}
	} else {
		console.log("Trying to set nonexistent option " + name);
	}
}

function resetAllOptions() {
	for(var optName in options) setOptionValue(optName, options[optName].default);
}