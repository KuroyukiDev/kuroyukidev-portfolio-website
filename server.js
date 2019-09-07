let express = require('express');
const hbs = require('express-handlebars');

const reactAppsRoute = require('./routes/reactApps');
const nodejsAppsRoute = require('./routes/nodejsApps');
const mainRoute = require('./routes/mainRoute');
const dataLib = require('./public/projects_lib');

const port = process.env.PORT || 3000;
let app = express();

app.engine('hbs', hbs({ defaultLayout: 'main' }));
// hbs.registerPartials(__dirname + '/views');
app.set('view engine', 'hbs');


// Maintenance Page Activator
// (INFO: Comment out to deactivate Maintenance Page - Uncomment to activate it)

// app.use((req,res,next) => {
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/'));


app.get('/', (req, res) => {
	const mainData = dataLib.mainData;
	const {
		twitterProfile,
		patreonProfile,
		itchioProfile
	} = mainData;
	res.render('home.hbs', {
		subTitle: 'Home',
		twitterLinkUrl: twitterProfile.profileUrl,
		twitterLinkIcon: twitterProfile.btnIconUrl,
		patreonLinkUrl: patreonProfile.profileUrl,
		patreonLinkIcon: patreonProfile.btnIconUrl,
		itchioLinkUrl: itchioProfile.profileUrl,
		itchioLinkIcon: itchioProfile.btnIconUrl
	});
});

app.get('/category/react', (req, res) => {
	const {projects, mainData} = dataLib;
	const {
		reactAppsList
	} = projects;
	const {
		twitterProfile,
		patreonProfile,
		itchioProfile
	} = mainData;
	res.render('reactCategoryList.hbs', {
		subTitle: 'React Projects List',
		hasListData: reactAppsList.length > 0,
		projectItems: reactAppsList,
		twitterLinkUrl: twitterProfile.profileUrl,
		twitterLinkIcon: twitterProfile.btnIconUrl,
		patreonLinkUrl: patreonProfile.profileUrl,
		patreonLinkIcon: patreonProfile.btnIconUrl,
		itchioLinkUrl: itchioProfile.profileUrl,
		itchioLinkIcon: itchioProfile.btnIconUrl
	});
});

app.get('/category/nodejs', (req, res) => {
	const {projects, mainData} = dataLib;
	const {
		nodejsAppsList
	} = projects;
	const {
		twitterProfile,
		patreonProfile,
		itchioProfile
	} = mainData;
	res.render('nodejsCategoryList.hbs', {
		subTitle: 'Node.js Projects List',
		hasListData: nodejsAppsList.length > 0,
		projectItems: nodejsAppsList,
		twitterLinkUrl: twitterProfile.profileUrl,
		twitterLinkIcon: twitterProfile.btnIconUrl,
		patreonLinkUrl: patreonProfile.profileUrl,
		patreonLinkIcon: patreonProfile.btnIconUrl,
		itchioLinkUrl: itchioProfile.profileUrl,
		itchioLinkIcon: itchioProfile.btnIconUrl
	});
});

app.get('/category/other', (req, res) => {
	const {projects, mainData} = dataLib;
	const {
		otherAppsList
	} = projects;
	const {
		twitterProfile,
		patreonProfile,
		itchioProfile
	} = mainData;
	res.render('otherCategoryList.hbs', {
		subTitle: 'Side Projects List',
		hasListData: otherAppsList.length > 0,
		projectItems: otherAppsList,
		twitterLinkUrl: twitterProfile.profileUrl,
		twitterLinkIcon: twitterProfile.btnIconUrl,
		patreonLinkUrl: patreonProfile.profileUrl,
		patreonLinkIcon: patreonProfile.btnIconUrl,
		itchioLinkUrl: itchioProfile.profileUrl,
		itchioLinkIcon: itchioProfile.btnIconUrl
	});
});

app.use((req, res, next) => {
	res.render('bad.hbs');
});

app.listen(port, () => {
	console.log(`Started on port ${port}`);
});
