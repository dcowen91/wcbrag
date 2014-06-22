var players;
var headings;
$(document).ready(function () {
	console.log("ready");
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
			player[Hv] = line[Hi];  //populate object with KV pairings from csv
		})
		Tplayers.push(player);
	});
	players = $.grep(Tplayers, function(e) {
		return e.Goals > 0;
	});

}

$('#teams').click(function() {
	$('li').removeClass('active');
	$('#teams').parent().addClass('active');
	displayTeams();
});

$('#players').click(function() {
	$('li').removeClass('active');
	$('#players').parent().addClass('active');
	displayPlayers();
});

$('#leagues').click(function() {
	$('li').removeClass('active');
	$('#leagues').parent().addClass('active');
	displayLeagues();
});

$('#countries').click(function() {
	$('li').removeClass('active');
	$('#countries').parent().addClass('active');
	displayCountries();
});

$('#about').click(function() {
	$('li').removeClass('active');
	$('#about').parent().addClass('active');
	displayAbout();
});

function displayAbout() {
	$('#main').html("");
	$('#main').append("<h1>WCBrag</h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae arcu id odio eleifend facilisis. Praesent quis mi et erat luctus aliquam in vitae arcu. Nam sit amet convallis libero. Quisque tincidunt congue ligula eu ornare. Donec blandit arcu ut felis viverra sodales. Vivamus tincidunt ultricies justo sed aliquet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse vehicula aliquam nibh quis blandit. Curabitur egestas sem leo, ut congue erat dapibus a. In quis vulputate ipsum. Nunc ut lobortis nulla, eu lacinia orci. Vivamus fringilla facilisis massa auctor auctor. Curabitur id fermentum enim, vel fermentum.");
}


function displayPlayers() {
	$('#main').html("");
	$.each(players, function(i, val) {
		$('#main').append("<div class='row panel panel-default'> <div class='panel-body'><div class='col-md-4'> <p>" +val.Player + "</p></div> <div class='col-md-4'><p>" + val.Club + "</p></div> <div class='col-md-3'><p>" + val.Country + "</p></div> <div class='col-md-1'><p>" + val.Goals + "</p></div> </div> </div>");
	});
}

function displayTeams() {
	$('#main').html("");
	var teams = {};
	$.each(players, function(i, v) { 
		if (!teams[v.Club]) {
    		teams[v.Club] = 0;
		}
		teams[v.Club] += parseInt(v.Goals);
	});
	teamSorted = Object.keys(teams).sort(function(a,b){return teams[b]-teams[a]});
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
			str +=
				   "<div class='list-group-item'>" +
				        "<div class='row'>" +
				            "<div class='col-md-6'> <p>" + Tv.Player + "</p></div>" + 
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
	var leagues = {};
	$.each(players, function(i, v) { 
		if (!leagues[v.League]) {
    		leagues[v.League] = 0;
		}
		leagues[v.League] += parseInt(v.Goals);
	});
	leagueSorted = Object.keys(leagues).sort(function(a,b){return leagues[b]-leagues[a]});
	$.each(leagueSorted, function(i, v) {
		var str = 
		"<div class='row panel panel-default'>" +
		    "<div class='panel-body'  data-toggle='collapse' data-target='#coll" + i + "'> " +
		        "<div class='col-md-11 clickable'><p>" + v + "</p></div>" +
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
	var countries = {};
	$.each(players, function(i, v) { 
		if (!countries[v.Country]) {
    		countries[v.Country] = 0;
		}
		countries[v.Country] += parseInt(v.Goals);
	});
	countrySorted = Object.keys(countries).sort(function(a,b){return countries[b]-countries[a]});
	$.each(countrySorted, function(i, v) {
		var str = 
		"<div class='row panel panel-default'>" +
		    "<div class='panel-body' data-toggle='collapse' data-target='#coll" + i +"'	>" +
		        "<div class='col-md-11 clickable'><p>" + v + "</p></div> " +
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