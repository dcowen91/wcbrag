var players;
var headings;
var ALLplayers;
var latest;
var filters;

$(document).ready(function () {
	filters = {};
	filters.pos = "ALL";
	filters.min = 19;
	filters.max = 36;
	filters.lg = "ALL";
	window.location.hash = "";
	$("#filtercontrol").hide();
	loadCSV();
});

function loadCSV() {
	$.ajax({
        type: "GET",
        url: "/app/data.csv",
        dataType: "text",
        success: function(data) {
        	processCSV(data);
        }
     });
}

function processCSV(allText) {
	var lines = allText.split("\n");
	headings = lines[0].split(",");
	headings.pop(); //remove empty string
	lines.splice(0, 1); //remove headings from array
	var Tplayers = [];
	$.each(lines, function(index, value) {
		var line = value.split(",");
		var player = {};
		$.each(headings, function(Hi, Hv) {
			if (Hv == "Player") {
				var temp = [];
				$.each(line[Hi].split(" "), function(i, v) {
					temp.push(v.charAt(0).toUpperCase() + v.slice(1).toLowerCase());
				});
				line[Hi] = temp.join(" ");
			}
			player[Hv] = line[Hi];  //populate object with KV pairings from csv
		})
		Tplayers.push(player);
	});
	players = $.grep(Tplayers, function(e) {
		return e.Goals > 0;
	});
	var names = [];
	$.each(players, function(i, v) { names.push(v.Player);});
	
	names.sort(function(a,b) { //alphabetical sort
		var bName = getName(b);
		var aName = getName(a);
		if (bName < aName) 
			return 1; 
		else if (bName > aName) 
			return -1; 
		else return 0;
	});
	players.sort(function(a, b) {
		if (a.Goals != b.Goals)
			return b.Goals - a.Goals; //sort by goals desc
		return names.indexOf(a.Player) - names.indexOf(b.Player); //sort by previous alphabetical sort
	});

	ALLplayers = players.slice();
}

$('.POSfilter').click(function(e) {
	if (this.id == "POSall") {
		filters.pos = "ALL";
	}
	else if (this.id == "POSfwd") {
		filters.pos = "Forward";
	}
	else if (this.id == "POSmid") {
		filters.pos = "Midfielder";
	}
	else if (this.id == "POSdef") {
		filters.pos = "Defender";
	}	
	$("#" + this.id + "_radio").prop("checked", true)
	applyFilters();
	e.stopPropagation();
});

$('.LGfilter').click(function(e) {
	if (this.id == "LGall") {
		filters.lg = "ALL";
	}
	else if (this.id == "LGdom") {
		filters.lg = "TRUE";
	}
	else {
		filters.lg = "FALSE";
	}
	$("#" + this.id + "_radio").prop("checked", true)
	applyFilters();
	e.stopPropagation();
});

$('.AGEfilter').click(function(e) {
	e.stopPropagation();
});

$('#AGEreset').click(function(e) {
	console.log("reset");
	filters.min = 19;
	filters.max = 36;
	$('#AGEmin_picker').val('19');
	$('#AGEmax_picker').val('36');
	applyFilters();
});

$('#AGEapply').click(function(e) {
	console.log("apply");
	filters.min = $('#AGEmin_picker').val();
	filters.max = $('#AGEmax_picker').val();
	applyFilters();
});


$('#teams').click(function() {
	$('li').removeClass('active');
	$('#teams').parent().addClass('active');
	displayTeams();
	$("#filtercontrol").show();
});

$('#players').click(function() {
	$('li').removeClass('active');
	$('#players').parent().addClass('active');
	displayPlayers();
	$("#filtercontrol").show();
});

$('#leagues').click(function() {
	$('li').removeClass('active');
	$('#leagues').parent().addClass('active');
	displayLeagues();
	$("#filtercontrol").show();
});

$('#countries').click(function() {
	$('li').removeClass('active');
	$('#countries').parent().addClass('active');
	displayCountries();
	$("#filtercontrol").show();
});

$('#about').click(function() {
	$('li').removeClass('active');
	$('#about').parent().addClass('active');
	displayAbout();
	$("#filtercontrol").hide();
});

function applyFilters() {
	players = ALLplayers.slice();
	//pos filter
	if (filters.pos != "ALL") {
		players = $.grep(players, function(e) {
			return e.Position == filters.pos;
		});
	}

	//age filter
	players = $.grep(players, function(e) {
		return e.Age <= filters.max;
	});
	players = $.grep(players, function(e) {
		return e.Age >= filters.min;
	});

	//lg filter
	if (filters.lg != "ALL") {
		players = $.grep(players, function(e) {
			return e.Domestic == filters.lg;
		});
	}

	displayLatest();
}

function getName(name) {
	var spaceIndex = name.indexOf(" ");
	if (spaceIndex == -1)
		return name;
	return name.substr(spaceIndex + 1);

}

function displayAbout() {
	$('#main').html("");
	$('#main').append("<h2>World Cup Brag</h2>Which Club team has done the best in the 2014 World Cup? Which professional league has performed the best? Every single goal(excluding Own Goals) of the world cup is tracked in this comparative stats site! Navigate using the tabs above, and then click on players/teams to expand for more information!");
}


function displayPlayers() {
	latest = "players";
	$('#main').html("");
	$('#main').append("<div class='row panel panel-default legend'>" +
		    "<div class='panel-body'>" +
		         "<div class='col-xs-5 col-sm-3 col-sm-offset-1 col-md-3 col-md-offset-1'>" + "Name" + "</div>" +
		         "<div class='hidden-xs col-sm-3 col-md-3'>" + "Club" + "</div>" +
		         "<div class='col-xs-5 col-sm-4 col-md-4'>" + "Country" + "</div>" +
		         "<div class='col-xs-2 col-sm-1 col-md-1'>" + "Goals" + "</div>" +
		    "</div></div>" );
	// console.log(players);
	// var PlayerSorted = players.slice();
	// console.log(players);
		$.each(players, function(i, v) {
		var V = v.Country.replace(/\s+/g, '');
		var str = 
		"<div class='row panel panel-default'>" +
		    "<div class='panel-body' data-toggle='collapse' data-target='#coll" + i + "'>" +
		    	 "<div class='hidden-xs col-sm-1 col-md-1 clickable'> <img class='" + V + "'> </div>" +
		         "<div class='col-xs-5 col-sm-3 col-md-3 clickable'>" + v.Player + "</div>" +
		         "<div class='hidden-xs col-sm-3 col-md-3 clickable'>" + v.Club + "</div>" +
		         "<div class='col-xs-5 col-sm-4 ol-md-4 clickable'>" + v.Country + "</div>" +
		         "<div class='col-xs-2 col-sm-1 col-md-1 clickable'>" + v.Goals + "</div>" +
		    "</div>";
		str += "<div class='list-group collapse' id='coll" + i + "'>" +
				   "<div class='list-group-item'>" +
				        "<div class='row'>" +
				        	"<div class='col-xs-6 hidden-md hidden-lg hidden-sm'>" + v.Club + "</div>" +
				            "<div class='col-xs-6 col-sm-3 col-sm-offset-1 col-md-3 col-md-offset-1'>" + v.Position + "</div>" +
				            "<div class='col-xs-6 col-sm-3 col-md-3'>" + v.Age + " Years Old" + "</div>";
				            // console.log(v.Domestic);
				            var txt = v.Domestic != "FALSE" ? "Plays Domestically" : "Plays Abroad"; 
				            str += "<div class='col-xs-6 col-sm-3 col-md-3'>" + txt + " </div>" +
				        "</div></div>";
		


		str += "</div>";
		$('#main').append(str);
	});
}

function displayTeams() {
	latest = "teams";
	$('#main').html("");
	$('#main').append(
		"<div class='row panel panel-default legend'>" +
		    "<div class='panel-body' >" +
		         "<div class='col-xs-10 col-sm-11 col-md-11 '>" + "Club" + "</div>" +
		         "<div class='col-xs-2 col-sm-1 col-md-1 '>" + "Goals" + "</div>" +
		    "</div>"
		);
	var teams = {};
	$.each(players, function(i, v) { 
		if (!teams[v.Club]) {
    		teams[v.Club] = 0;
		}
		teams[v.Club] += parseInt(v.Goals);
	});
	teamNameSorted = Object.keys(teams).sort();  //alphabetical sort
	teamSorted = Object.keys(teams).sort(function(a,b){
		if (teams[b] != teams[a])
			return teams[b]-teams[a];
		return teamNameSorted.indexOf(a) - teamNameSorted.indexOf(b);  //defer to alpha ordering if tied on goals
	});
	$.each(teamSorted, function(i, v) {
		var str =
			"<div class='row panel panel-default'>" +
			    "<div class='panel-body' data-toggle='collapse' data-target='#coll" + i + "'>" +
			        "<div class='col-xs-10 col-sm-11 col-md-11 clickable'>" + v + "</div>" + 
			        "<div class='col-xs-2 col-sm-1 col-md-1 clickable'>" + teams[v] + "</div>" + 
			    "</div>" + 
			    "<div class='list-group collapse' id='coll" + i + "'>";
		var TeamMembers = $.grep(players, function(e) { return e.Club === v});
		$.each(TeamMembers, function(Ti, Tv) {
			var V = Tv.Country.replace(/\s+/g, '');
			str +=
				   "<div class='list-group-item'>" +
				        "<div class='row'>" +
				        	"<div class='hidden-xs col-sm-1 col-md-1 clickable'><img class='" + V + "'></div>" +
				            "<div class='col-xs-5 col-sm-5 col-md-5'>" + Tv.Player + "</div>" + 
				            "<div class='col-xs-5 col-sm-5 col-md-5'>" + Tv.Country + "</div>" +
				            "<div class='col-xs-2 col-sm-1 col-md-1'>" + Tv.Goals + "</div> "+
				        "</div></div>";
		});
		str +='</div>';
		$("#main").append(str);
	});
}

function displayLeagues() {
	latest = "leagues";
	$('#main').html("");
	$('#main').append(
		"<div class='row panel panel-default legend'>" +
		    "<div class='panel-body'>" +
		         "<div class='col-xs-10 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1'>" + "League System" + "</div>" +
		         "<div class='col-xs-2 col-sm-1 col-md-1 '>" + "Goals" + "</div>" +
		    "</div>"
		);
	var leagues = {};
	$.each(players, function(i, v) { 
		if (!leagues[v.League]) {
    		leagues[v.League] = 0;
		}
		leagues[v.League] += parseInt(v.Goals);
	});
	leagueNameSorted = Object.keys(leagues).sort();
	leagueSorted = Object.keys(leagues).sort(function(a,b){
		if (leagues[b] != leagues[a])
			return leagues[b]-leagues[a];
		return leagueNameSorted.indexOf(a) - leagueNameSorted.indexOf(b);
	});
	$.each(leagueSorted, function(i, v) {
		var V = v.replace(/\s+/g, '');
		var str = 
		"<div class='row panel panel-default'>" +
		    "<div class='panel-body'  data-toggle='collapse' data-target='#coll" + i + "'> " +
		    "<div class='hidden-xs col-sm-1 col-md-1 clickable'><img class='" + V + "'></div>" +
		        "<div class='col-xs-10 col-sm-10 col-md-10 clickable'>" + v + "</div>" +
		        "<div class='col-xs-2 col-sm-1 col-md-1 clickable'>" + leagues[v] + "</div> " +
		    "</div>" +
		    "<div class='list-group collapse' id='coll" + i + "'>";
		    var LPlayers = $.grep(players, function(e) { return e.League == v;});
		    var Lteam = {};
		    $.each(LPlayers, function(i, v) {
		    	if (!Lteam[v.Club]) {
		    		Lteam[v.Club] = 0;
		    	}
		    	Lteam[v.Club] += parseInt(v.Goals);
		    });
		    LteamSorted = Object.keys(Lteam).sort(function(a,b){return Lteam[b]-Lteam[a]});
		    $.each(LteamSorted, function(Ti, Tv) {
		    	str +=
				   "<div class='list-group-item'>" +
				        "<div class='row'>" +
				            "<div class='col-xs-10 col-sm-11 col-md-11'>" + Tv + "</div>" + 
				            "<div class='col-xs-2 col-sm-1 col-md-1'>" + Lteam[Tv] + "</div>" +
				        "</div></div>";
		    });
		str += "</div>";
		$("#main").append(str);
	});
}

function displayCountries() {
	latest = "countries";
	$('#main').html("");
	$('#main').append(
		"<div class='row panel panel-default legend'>" +
		    "<div class='panel-body'>" +
		         "<div class='col-xs-10 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1 '>" + "National Team" + "</div>" +
		         "<div class='col-xs-2 col-sm-1 col-md-1 '>" + "Goals" + "</div>" +
		    "</div>"
		);
	var countries = {};
	$.each(players, function(i, v) { 
		if (!countries[v.Country]) {
    		countries[v.Country] = 0;
		}
		countries[v.Country] += parseInt(v.Goals);
	});

	//making sure sort is in-place
	var countrySorted = Object.keys(countries).sort(); //sort alphabetically
	var countryNameSorted = countrySorted.slice(); //Copy array so we have a reference
	countrySorted.sort(function(a,b){
		if (countries[b]!=countries[a])
			return countries[b]-countries[a]; //sort by position
		return countryNameSorted.indexOf(a) - countryNameSorted.indexOf(b); // sort by existing order (alphabetically)
	});

	$.each(countrySorted, function(i, v) {
		var V = v.replace(/\s+/g, '');
		var str = 
		"<div class='row panel panel-default'>" +
		    "<div class='panel-body' data-toggle='collapse' data-target='#coll" + i +"'	>" +
		    "<div class='hidden-xs col-sm-1 col-md-1 clickable'><img class='" + V + "'></div>" +
		        "<div class='col-xs-10 col-sm-10 col-md-10 clickable'>" + v + "</div> " +
		        "<div class='col-xs-2 col-sm-1 col-md-1 clickable'>" + countries[v] + "</div>" +
		    "</div>" + 
		    "<div class='list-group collapse' id='coll" + i + "'>";
		var NTeamMembers = $.grep(players, function(e) { return e.Country === v});
		$.each(NTeamMembers, function(Ti, Tv) {
			str +=
				   "<div class='list-group-item'>" +
				        "<div class='row'>" +
				            "<div class='col-xs-5 col-sm-6 col-md-6'>" + Tv.Player + "</div>" + 
				            "<div class='col-xs-5 col-sm-5 col-md-5'>" + Tv.Club + "</div>" +
				            "<div class='col-xs-2 col-sm-1 col-md-1'>" + Tv.Goals + "</div> "+
				        "</div></div>";
		});
		str += "</div>";
		$("#main").append(str);
	});
}



function displayLatest () {
	if (latest == "players")
		displayPlayers();
	else if (latest == "teams")
		displayTeams();
	else if (latest == "leagues")
		displayLeagues();
	else displayCountries();
}