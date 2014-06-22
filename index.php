<!DOCTYPE html>
<html>
<head>
	<title>WCBrag</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="description" content="WCBrag: compare leagues' and teams' performances at the World Cup!">
	<link href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet" />
	<link href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
	<link rel="stylesheet" href="app/app.css">
</head>
<body>
	<nav class="navbar navbar-default" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" id='brand'>WCBrag</a>
			</div>
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav">
					<li><a href="#/players" id='players'>Players</a></li>
					<li><a href="#/teams" id='teams'>Teams</a></li>
					<li><a href="#/leagues" id='leagues'>Leagues</a></li>
					<li><a href="#/countries" id='countries'>Countries</a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li class="active"><a href="#/about" id='about'>About</a></li>
				</ul>
			</div><!-- /.navbar-collapse -->
		</div><!-- /.container -->
	</nav>
	<div class="container">
		<div id = 'main' class='jumbotron'>
			<h1>
				World Cup Brag
			</h1>
			<p>
				Which Club team has done the best in the 2014 World Cup? Which professional league has performed the best? Every single goal of the world cup is tracked in this comparative stats app! Navigate using the tabs above, and then click on players/teams to expand for more information!
			</p>
		</div>
	</div>
	<footer>
		<div class='container' id='foot'>
			<p><small> Last updated after Game #29</small></p>
			<p><small> All stats via <a href='http://www.theguardian.com/football/datablog/2014/jun/06/world-cup-squads-rosters-broken-down-club-age-height'> The Guardian</a></small></p>
			<p><small> Created by Drew Owen</small></p>
			<p><small> View on <a href='https://github.com/dcowen91/wcbrag'> Github</a></small></p>
			
		</div>
	</footer>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" rel="script"></script>
	<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js" rel="script"></script>
	<script src="app/app.js"></script>
</body>
</html>