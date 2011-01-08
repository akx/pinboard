var $ = Pentu;

function fadeOut(el, duration) {
	var steps = 20, step = steps;
	var fadeOutTimer = setInterval(function(){
		$(el, {css: {opacity: --step / steps}});
		if(step <= 0) clearInterval(fadeOutTimer);
	}, duration / steps);
}

function init() {
	var optCtr = $("#options");
	optionGroups.forEach(function(group) {
		var groupDiv = $("div", {"class": "option-group", "html": "<h2>" + group.name + "</h2>"});
		var optTable = $("table");
		group.options.forEach(function(option) {
			var optTr = $("<tr><td class=\"option-name\">" + option.text + "</td><td class=\"option-control\"></td></tr>");
			var optInput = $("input", {"id": "opt-" + option.name});
			if(option.type == "bool") {
				$(optInput, {"type": "checkbox", "value": "yes"});
			} else {
				$(optInput, {"type": "text"});
			}
			var controlTd = $.find(".option-control", optTr)[0];
			controlTd.appendChild(optInput);
			if(option.help) controlTd.appendChild($("div", {"class": "option-help", "text": option.help}));
			optTable.appendChild(optTr);
		});
		groupDiv.appendChild(optTable);
		optCtr.appendChild(groupDiv);
	});
	
	loadOptions();
}

function loadOptions() {
	for(var optName in options) {
		var option = options[optName];
		var optInput = $("#opt-" + option.name);
		var optVal = getOptionValue(option.name);
		if(option.type == "bool") {
			$(optInput, {checked: optVal ? "checked": false});
		} else {
			$(optInput, {value: optVal ? optVal : ""});
		}
	}
}

function saveOptions() {
	for(var optName in options) {
		var option = options[optName];
		var optInput = $("#opt-" + option.name);
		if(option.type == "bool") {
			setOptionValue(optName, (optInput.checked ? true : false));
		} else {
			setOptionValue(optName, optInput.value);
		}
		
	}
	var optSaved = $("#optionsSavedMessage", {"css": {"display": "block", "opacity": 1}});
	setTimeout(function() { fadeOut(optSaved, 500); }, 1000);
}

function resetOptions() {
	if(confirm("Are you sure?")) {
		resetAllOptions();
		loadOptions();
		saveOptions();
	}
}