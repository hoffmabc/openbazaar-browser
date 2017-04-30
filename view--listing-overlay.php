<!DOCTYPE html>
<html lang="en">
<head>

	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">

	<title>OpenBazaar Browser</title>

	<link rel="stylesheet" href="./dist/styles/site.min.css">

	<!--[if lt IE 9]>
		<script src="./dist/scripts/ie-only.js"></script>
	<![endif]-->

</head>

<body>
	<div class="Page">
		<header class="Header">
			<div class="Header__left">
				<img class="Header__logo" src=""> <!-- TODO: Check BEM compliance of this class name and the class names of its descendants -->
				<div class="Header__left__branding">
					<div class="Header__branding__top">
						OpenBazaar
					</div>
					<div class="Header__branding__bottom">
						<div class="StoreNav__info__name">
							<img src=""> <!-- small bitcoin image -->
							<img src=""> <!-- small Earth image -->
							<img src=""> <!-- small peace image -->
						</div>
						<div class="StoreNav__info__ratings">
							<img src=""> <!-- small star image -->
							4.2
							(<a href="">192</a>) <!-- link to ratings and reviews -->
						</div>
					</div>
				</div>
				<div class="Header__left__search">
					<input type="text" placeholder="Enter an OpenBazaar @handle or ID">
					<button type="submit" class="Button--search-ids">Go</button>
				</div>
			</div>
			<div class="Header__right">
				<a href="https://openbazaar.org/download.html" target="_blank">Download OpenBazzar</a>
				<a href="https://openbazaar.org/" target="_blank">About OpenBazaar</a>
			</div>
		</header>
		<main class="ListingOverlay">
			<nav class="ListingOverlay__nav">
				<div class="ListingOverlay__nav__left">
					Avatar || Store Name || Return to Store <!-- TODO -->
				</div>
				<div class="ListingOverlay__nav__right">
					X closing <!-- TODO -->
				</div>
			</nav>
			<section class="Section">
				<!-- TODO -->
			</section>
			<section class="Section">
				<h2>Description</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</p>
			</section>
			<section class="ImageSlider">
				<!-- TODO -->
			</section>
			<section>
				<h2>Reviews</h2>
				<!-- TODO -->
			</section>
			<section>
				<h2>Shipping</h2>
				<!-- TODO -->
			</section>
			<section>
				<h2>Return Policy</h2>
				<p>
					All sales are final.
				</p>
			</section>
			<section>
				<h2>Terms of Service</h2>
				<p>
					Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</p>
			</section>
		</main>
	</div>

	<script src="./dist/scripts/site.min.js"></script>

</body>

</html>