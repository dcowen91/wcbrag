var players;
var headings;
$(document).ready(function () {
	console.log("ready");
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
	})


}

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

function getName(name) {
	var spaceIndex = name.indexOf(" ");
	if (spaceIndex == -1)
		return name;
	return name.substr(spaceIndex + 1);

}

function displayAbout() {
	$('#main').html("");
	$('#main').append("<h1>World Cup Brag</h1><p>Which Club team has done the best in the 2014 World Cup? Which professional league has performed the best? Every single goal of the world cup is tracked in this comparative stats site! Navigate using the tabs above, and then click on players/teams to expand for more information!</p>");
}


function displayPlayers() {
	$('#main').html("");
	$('#main').append("<div class='row well legend'>" +
		    "<div >" +
		         "<div class='col-md-4'><p>" +"Name" + "</p></div>" +
		         "<div class='col-md-4'><p>" + "Club" + "</p></div>" +
		         "<div class='col-md-3'><p>" + "Country" + "</p></div>" +
		         "<div class='col-md-1'><p>" + "Goals" + "</p></div>" +
		    "</div>");
	// console.log(players);
	// var PlayerSorted = players.slice();
	// console.log(players);
		$.each(players, function(i, v) {
		var V = v.Country.replace(/\s+/g, '');
		var str = 
		"<div class='row panel panel-default'>" +
		    "<div class='panel-body' data-toggle='collapse' data-target='#coll" + i + "'>" +
		    	"<div class='col-md-1 clickable'><img class='" + V + "'></div>" +
		         "<div class='col-md-3 clickable'><p>" +v.Player + "</p></div>" +
		         "<div class='col-md-4 clickable'><p>" + v.Club + "</p></div>" +
		         "<div class='col-md-3 clickable'><p>" + v.Country + "</p></div>" +
		         "<div class='col-md-1 clickable'><p>" + v.Goals + "</p></div>" +
		    "</div>";
		str += "<div class='list-group collapse' id='coll" + i + "'>" +
				   "<div class='list-group-item'>" +
				        "<div class='row'>" +
				            "<div class='col-md-3 col-md-offset-1'><p>" + v.Position + "</p></div>" +
				            "<div class='col-md-4'> <p>" + v.Age + " Years Old" + "</p></div>";
				            // console.log(v.Domestic);
				            var txt = v.Domestic != "FALSE" ? "Plays in Home Country" : "Plays Abroad"; 
				            str += "<div class='col-md-3'><p>" + txt + "</p> </div>" +
				        "</div></div>";
		


		str += "</div>";
		$('#main').append(str);
	});
}

function displayTeams() {
	$('#main').html("");
	$('#main').append(
		"<div class='row well legend'>" +
		    "<div >" +
		         "<div class='col-md-11 '> <p>" + "Club" + "</p></div>" +
		         "<div class='col-md-1 '><p>" + "Goals" + "</p></div>" +
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
	console.log(teamNameSorted);
	teamSorted = Object.keys(teams).sort(function(a,b){
		if (teams[b] != teams[a])
			return teams[b]-teams[a];
		return teamNameSorted.indexOf(a) - teamNameSorted.indexOf(b);  //defer to alpha ordering if tied on goals
	});
	$.each(teamSorted, function(i, v) {
		var str =
			"<div class='row panel panel-default'>" +
			    "<div class='panel-body' data-toggle='collapse' data-target='#coll" + i + "'>" +
			        "<div class='col-md-11 clickable'> <p>" + v + "</p> </div>" + 
			        "<div class='col-md-1 clickable'><p>" + teams[v] + "</p></div>" + 
			    "</div>" + 
			    "<div class='list-group collapse' id='coll" + i + "'>";
		var TeamMembers = $.grep(players, function(e) { return e.Club === v});
		$.each(TeamMembers, function(Ti, Tv) {
			var V = Tv.Country.replace(/\s+/g, '');
			str +=
				   "<div class='list-group-item'>" +
				        "<div class='row'>" +
				        	"<div class='col-md-1 clickable'><img class='" + V + "'></div>" +
				            "<div class='col-md-5'> <p>" + Tv.Player + "</p></div>" + 
				            "<div class='col-md-5'><p>" + Tv.Country + "</p></div>" +
				            "<div class='col-md-1'><p>" + Tv.Goals + "</p> </div> "+
				        "</div></div>";
		});
		str +='</div>';
		$("#main").append(str);
	});
}

function displayLeagues() {
	$('#main').html("");
	$('#main').append(
		"<div class='row well legend'>" +
		    "<div >" +
		         "<div class='col-md-11 '> <p>" + "League System" + "</p></div>" +
		         "<div class='col-md-1 '><p>" + "Goals" + "</p></div>" +
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
	console.log(leagueNameSorted);
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
		    "<div class='col-md-1 clickable'><img class='" + V + "'></div>" +
		        "<div class='col-md-10 clickable'><p>" + v + "</p></div>" +
		        "<div class='col-md-1 clickable'><p>" + leagues[v] + "</p></div> " +
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
				            "<div class='col-md-11'> <p>" + Tv + "</p></div>" + 
				            "<div class='col-md-1'><p>" + Lteam[Tv] + "</p></div>" +
				        "</div></div>";
		    });
		str += "</div>";
		$("#main").append(str);
	});
}

function displayCountries() {
	$('#main').html("");
	$('#main').append(
		"<div class='row well legend'>" +
		    "<div >" +
		         "<div class='col-md-11 '> <p>" + "National Team" + "</p></div>" +
		         "<div class='col-md-1 '><p>" + "Goals" + "</p></div>" +
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
		    "<div class='col-md-1 clickable'><img class='" + V + "'></div>" +
		        "<div class='col-md-10 clickable'><p>" + v + "</p></div> " +
		        "<div class='col-md-1 clickable'><p>" + countries[v] + "</p></div>" +
		    "</div>" + 
		    "<div class='list-group collapse' id='coll" + i + "'>";
		var NTeamMembers = $.grep(players, function(e) { return e.Country === v});
		$.each(NTeamMembers, function(Ti, Tv) {
			str +=
				   "<div class='list-group-item'>" +
				        "<div class='row'>" +
				            "<div class='col-md-6'> <p>" + Tv.Player + "</p></div>" + 
				            "<div class='col-md-5'><p>" + Tv.Club + "</p></div>" +
				            "<div class='col-md-1'><p>" + Tv.Goals + "</p> </div> "+
				        "</div></div>";
		});
		str += "</div>";
		$("#main").append(str);
	});
}