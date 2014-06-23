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
	<div class="container ">
		<div id='filtercontrol' class="panel panel-default" hidden>
			<div class="panel-heading" data-toggle='collapse' data-target='#filters'>
				<h4 class="clickable text-center clickable"> Filters </h4>
			</div>
			<div id="filters" class=" panel-collapse collapse">
				<div class="panel-info">
					<div class="btn-group btn-group-justified">
						<div class="btn-group">
							<button type='button' class='btn btn-default'><h4>Position</h4></button>
						</div>
						<div class="btn-group">
							<button type='button' class='btn btn-default'><h4>Age</h4></button>
						</div>
						<div class="btn-group">
							<button type='button' class='btn btn-default'><h4>League</h4></button>
						</div>
						<div class="btn-group">
							<button type='button' class='btn btn-default'><h4>Plays in Home Country</h4></button>
						</div>
					</div>
				</div>
			</div>	
		</div> 
		<div class='jumbotron'>
			<div id = 'main'>
				<h1>
					World Cup Brag
				</h1>
				<p>
					Which Club team has done the best in the 2014 World Cup? Which professional league has performed the best? Every single goal of the world cup is tracked in this comparative stats site! Navigate using the tabs above, and then click on players/teams to expand for more information!
				</p>
			</div>
		</div>
	</div>
	<footer>
		<div class='container' id='foot'>
			<p><small> Last updated after Game #32 6/22</small></p>
			<p><small> All stats via <a href='http://www.theguardian.com/football/datablog/2014/jun/06/world-cup-squads-rosters-broken-down-club-age-height'> The Guardian</a></small></p>
			<p><small> Created by Drew Owen</small></p>
			<p><small> View on <a href='https://github.com/dcowen91/wcbrag'> Github</a></small></p>
			
		</div>
	</footer>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" rel="script"></script>
	<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js" rel="script"></script>
	<script>
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-40383417-2', 'wcbrag.herokuapp.com');
	ga('send', 'pageview');
	</script>
	<script src="app/app.js"></script>
</body>
</html>