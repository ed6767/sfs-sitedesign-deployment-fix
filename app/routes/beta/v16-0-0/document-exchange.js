module.exports = function(router) {

	var version = 'beta/v16-0-0';

	/**********
	 * EXTERNAL USERS CHILD VIEW (SCHOOL & SINGLE ACADEMY)
	 * **********/

	// GLOBAL (Child) - Set global variables for all pages in the '/child/' folder
	router.get('/' + version + '/external/child/*', function (req, res, next) {	
		
		req.session.parent = "Child";

		next();
	});
	
	// Start
	router.get('/' + version + '/external/child/document-exchange/start', function (req, res) {
		res.render(version + '/start', {
			'version' : version
		});
	});
	router.post('/' + version + '/external/child/document-exchange/start', function (req, res) {		
		res.redirect('/' + version + '/external/child/document-exchange/idams');
	});

	// User roles and permissions
	router.get('/' + version + '/external/child/document-exchange/roles-permissions', function (req, res) {
		res.render(version + '/roles-permissions', {
			'version' : version
		});
	});

	// IDAMS
	router.get('/' + version + '/external/child/document-exchange/idams', function (req, res) {
		res.render(version + '/idams', {
			'version' : version
		});
	});
	router.post('/' + version + '/external/child/document-exchange/idams', function (req, res) {		
		res.redirect('/' + version + '/external/child/document-exchange/dashboard');
	});

	// Dashboard
	router.get('/' + version + '/external/child/document-exchange/dashboard', function (req, res) {
		
		req.session.idams = "dashboard";
		
		res.render(version + '/external/dashboard', {
			'version' : version,
			'idams' : req.session.idams,
			'parent' : req.session.parent
		});
	});

	// Document Exchange (Home)
	router.get('/' + version + '/external/child/document-exchange/home', function (req, res) {
		
		req.session.idams = "external";
		
		res.render(version + '/external/child/document-exchange/home', {
			'version' : version,
			'idams' : req.session.idams
		});
	});

	// Received from ESFA
	router.get('/' + version + '/external/child/document-exchange/received-from-esfa', function (req, res) {
		
		req.session.idams = "external";
		
		res.render(version + '/external/child/document-exchange/received-from-esfa', {
			'version' : version,
			'idams' : req.session.idams
		});
	});

	// Sent to ESFA
	router.get('/' + version + '/external/child/document-exchange/sent-to-esfa', function (req, res) {
		
		req.session.idams = "external";

		// Reset all session variables for document upload (START)
		req.session.uploadedDocumentStatus = "";
		req.session.uploadedDocumentName = "";
		req.session.fileType = "";
		req.session.fileTypeVersion = "";
		
		res.render(version + '/external/child/document-exchange/sent-to-esfa', {
			'version' : version,
			'idams' : req.session.idams
		});
	});

	// Document Upload File Type
	router.get('/' + version + '/external/child/document-exchange/document-upload-file-type', function (req, res) {
		
		req.session.idams = "external";

		// Reset all session variables for document upload (START)
		req.session.uploadedDocumentStatus = "";
		req.session.uploadedDocumentName = "";
		req.session.fileType = "";
		req.session.fileTypeVersion = "";
		
		res.render(version + '/external/child/document-exchange/document-upload-file-type', {
			'version' : version,
			'idams' : req.session.idams,
			'error' : req.query.error,
			'uploadedDocumentStatus' : req.session.uploadedDocumentStatus,
			'uploadedDocumentName' : req.session.uploadedDocumentName,
			'fileType' : req.session.fileType
		});
	});
	router.post('/' + version + '/external/child/document-exchange/document-upload-file-type', function (req, res) {		
		
		// Set the chosen document type as a session variable
		req.session.fileType = req.body.fileType;
		var fileType = req.session.fileType;

		// Set the version for any new document users send to the ESFA (based on what they have already sent)
		if (fileType == "Business case") {
			req.session.fileTypeVersion = "3";
		}
		else if (fileType == "Business case audit evidence") {
			req.session.fileTypeVersion = "2";
		}
		else {
			req.session.fileTypeVersion = "1";
		}

		// Make sure the user chooses an option
		if (fileType == undefined) {
			res.redirect('/' + version + '/external/child/document-exchange/document-upload-file-type?error=true');
		}
		// Success
		else {
			res.redirect('/' + version + '/external/child/document-exchange/document-upload');
		}
		
	});

	// Document Upload
	router.get('/' + version + '/external/child/document-exchange/document-upload', function (req, res) {

		req.session.idams = "external";

		// Set the session variable if is does not exist
		req.session.uploadedDocumentStatus = req.session.uploadedDocumentStatus || "";
		req.session.uploadedDocumentName = req.session.uploadedDocumentName || "";
		req.session.fileType = req.session.fileType || "";
		req.session.fileTypeVersion = req.session.fileTypeVersion || "";
		
		res.render(version + '/external/child/document-exchange/document-upload', {
			'version' : version,
			'idams' : req.session.idams,
			'uploadedDocumentStatus' : req.session.uploadedDocumentStatus,
			'uploadedDocumentName' : req.session.uploadedDocumentName,
			'fileType' : req.session.fileType,
			'fileTypeVersion' : req.session.fileTypeVersion
		});		
	});
	router.post('/' + version + '/external/child/document-exchange/document-upload', function (req, res) {		

		req.session.fileName = req.body.fileName;
		
		res.redirect('/' + version + '/external/child/document-exchange/document-upload-complete');
	});

	// Document Upload - Remove Document
	router.get('/' + version + '/external/child/document-exchange/document-upload-remove', function (req, res) {
	
		req.session.idams = "external";

		if (!req.session.uploadedDocumentName || req.session.uploadedDocumentName === undefined) {
			req.session.uploadedDocumentName = req.query.uploadedDocumentName;
		}
		
		res.render(version + '/external/child/document-exchange/document-upload-remove', {
			'version' : version,
			'idams' : req.session.idams,
			'error' : req.query.error,
			'uploadedDocumentName' : req.session.uploadedDocumentName
		});
	});
	router.post('/' + version + '/external/child/document-exchange/document-upload-remove', function (req, res) {
		
		if (!req.session.uploadedDocumentName || req.session.uploadedDocumentName === undefined) {
			req.session.uploadedDocumentName = req.query.uploadedDocumentName;
		}

		var deleteDocument = req.body.deleteDocument;

		if (deleteDocument == "Yes") {
			res.redirect('/' + version + '/external/child/document-exchange/document-upload-file-type');
		}
		else if (deleteDocument == "No") {

			// Tell the next page to show the last uploaded document information
			req.session.uploadedDocumentStatus = "Show";

			res.redirect('/' + version + '/external/child/document-exchange/document-upload');
		}
		// Make sure the user chooses an option
		else {
			res.redirect('/' + version + '/external/child/document-exchange/document-upload-remove?error=true');
		}
		
	});

	// Document Upload Complete
	router.get('/' + version + '/external/child/document-exchange/document-upload-complete', function (req, res) {
	
		req.session.idams = "external";
		
		res.render(version + '/external/child/document-exchange/document-upload-complete', {
			'version' : version,
			'idams' : req.session.idams,
			'fileName' : req.session.fileName
		});
	});
	router.post('/' + version + '/external/child/document-exchange/document-upload-complete', function (req, res) {		
		
		// Reset all session variables for document upload (END)
		req.session.uploadedDocumentStatus = "";
		req.session.uploadedDocumentName = "";
		req.session.fileType = "";
		
		res.redirect('/' + version + '/external/child/document-exchange/home');
	});

	// Document Upload (Replace)
	router.get('/' + version + '/external/child/document-exchange/document-upload-replace', function (req, res) {

		// Set the session variable if is does not exist
		req.session.uploadedDocumentStatus = req.session.uploadedDocumentStatus || "";
		req.session.uploadedDocumentName = req.session.uploadedDocumentName || "";
		req.session.fileType = req.session.fileType || "";
		req.session.idams = "external";
		
		res.render(version + '/external/child/document-exchange/document-upload-replace', {
			'version' : version,
			'idams' : req.session.idams,
			'uploadedDocumentStatus' : req.session.uploadedDocumentStatus,
			'uploadedDocumentName' : req.session.uploadedDocumentName,
			'fileType' : req.session.fileType
		});		
	});
	router.post('/' + version + '/external/child/document-exchange/document-upload-replace', function (req, res) {		

		req.session.fileName = req.body.fileName;
		
		res.redirect('/' + version + '/external/child/document-exchange/document-upload-replace-complete');
	});

	// Document Upload - Remove Document (Replace)
	router.get('/' + version + '/external/child/document-exchange/document-upload-replace-remove', function (req, res) {

		req.session.idams = "external";

		if (!req.session.uploadedDocumentName || req.session.uploadedDocumentName === undefined) {
			req.session.uploadedDocumentName = req.query.uploadedDocumentName;
		}
		
		res.render(version + '/external/child/document-exchange/document-upload-replace-remove', {
			'version' : version,
			'idams' : req.session.idams,
			'error' : req.query.error,
			'uploadedDocumentName' : req.session.uploadedDocumentName
		});
	});
	router.post('/' + version + '/external/child/document-exchange/document-upload-replace-remove', function (req, res) {
		
		if (!req.session.uploadedDocumentName || req.session.uploadedDocumentName === undefined) {
			req.session.uploadedDocumentName = req.query.uploadedDocumentName;
		}

		var deleteDocument = req.body.deleteDocument;

		if (deleteDocument == "Yes") {
			res.redirect('/' + version + '/external/child/document-exchange/document-upload-replace');
		}
		else if (deleteDocument == "No") {

			// Tell the next page to show the last uploaded document information
			req.session.uploadedDocumentStatus = "Show";

			res.redirect('/' + version + '/external/child/document-exchange/document-upload-replace');
		}
		// Make sure the user chooses an option
		else {
			res.redirect('/' + version + '/external/child/document-exchange/document-upload-replace-remove?error=true');
		}
		
	});

	// Document Upload Complete (Replace)
	router.get('/' + version + '/external/child/document-exchange/document-upload-replace-complete', function (req, res) {

		req.session.idams = "external";
		
		res.render(version + '/external/child/document-exchange/document-upload-replace-complete', {
			'version' : version,
			'idams' : req.session.idams,
			'fileName' : req.session.fileName
		});
	});
	router.post('/' + version + '/external/child/document-exchange/document-upload-replace-complete', function (req, res) {		
		
		// Reset all session variables for document upload (END)
		req.session.uploadedDocumentStatus = "";
		req.session.uploadedDocumentName = "";
		req.session.fileType = "";
		
		res.redirect('/' + version + '/external/child/document-exchange/home');
	});

	/**********
	 * EXTERNAL USERS PARENT VIEW (LA & MAT)
	 * **********/

	// Start
	router.get('/' + version + '/external/parent/document-exchange/start', function (req, res) {
		res.render(version + '/start', {
			'version' : version
		});
	});
	router.post('/' + version + '/external/parent/document-exchange/start', function (req, res) {		
		res.redirect('/' + version + '/external/parent/document-exchange/idams');
	});

	// User roles and permissions
	router.get('/' + version + '/external/parent/document-exchange/roles-permissions', function (req, res) {
		res.render(version + '/roles-permissions', {
			'version' : version
		});
	});

	// IDAMS
	router.get('/' + version + '/external/parent/document-exchange/idams', function (req, res) {
		res.render(version + '/idams', {
			'version' : version,
			'error' : req.query.error
		});
	});
	router.post('/' + version + '/external/parent/document-exchange/idams', function (req, res) {		
		
		req.session.userID = req.body.id.toLowerCase();
		var userID = req.session.userID;

		// User is signing in as a Local Authority (LA)
		if (userID == "la") {

			req.session.idams = "LA";
			req.session.parent = "LA";

			res.redirect('/' + version + '/external/parent/document-exchange/dashboard');
		}
		// User is signing in as a Multi Academy Trust (MAT)
		else if (userID == "mat") {
			
			req.session.idams = "MAT";
			req.session.parent = "MAT";

			res.redirect('/' + version + '/external/parent/document-exchange/dashboard');
		}
		// Make sure the user chooses an option
		else {
			res.redirect('/' + version + '/external/parent/document-exchange/idams?error=true');
		}
		
	});

	// Dashboard
	router.get('/' + version + '/external/parent/document-exchange/dashboard', function (req, res) {
		
		req.session.dashboard = "Yes";
		// Only set the session variable if it does not exist
		req.session.idams = req.session.idams || "MAT";
		req.session.parent = req.session.parent || "MAT";
		
		res.render(version + '/external/dashboard', {
			'version' : version,
			'dashboard' : req.session.dashboard,
			'idams' : req.session.idams,
			'parent' : req.session.parent
		});
	});

	// Document Exchange (Home)
	router.get('/' + version + '/external/parent/document-exchange/home', function (req, res) {
		
		req.session.dashboard = "No";
		// Only set the session variable if it does not exist
		req.session.idams = req.session.idams || "MAT";
		req.session.parent = req.session.parent || "MAT";
		
		res.render(version + '/external/parent/document-exchange/home', {
			'version' : version,
			'dashboard' : req.session.dashboard,
			'idams' : req.session.idams,
			'parent' : req.session.parent
		});
	});

	// Received from ESFA
	router.get('/' + version + '/external/parent/document-exchange/received-from-esfa', function (req, res) {
		
		// Only set the session variable if it does not exist
		req.session.dashboard = req.session.dashboard || "No";
		req.session.idams = req.session.idams || "MAT";
		req.session.parent = req.session.parent || "MAT";
		
		res.render(version + '/external/parent/document-exchange/received-from-esfa', {
			'version' : version,
			'dashboard' : req.session.dashboard,
			'idams' : req.session.idams,
			'parent' : req.session.parent,
			'error' : req.query.error,
			'paginationRequired' : req.query.paginationRequired,
			'page1' : req.query.page1,
			'page2' : req.query.page2
		});
	});

	// Sent to ESFA
	router.get('/' + version + '/external/parent/document-exchange/sent-to-esfa', function (req, res) {
		
		// Only set the session variable if it does not exist
		req.session.dashboard = req.session.dashboard || "No";
		req.session.idams = req.session.idams || "MAT";
		req.session.parent = req.session.parent || "MAT";
		// Reset all session variables for document upload (START)
		req.session.uploadedDocumentStatus = "";
		req.session.uploadedDocumentName = "";
		req.session.fileType = "";
		req.session.fileTypeVersion = "";
		
		res.render(version + '/external/parent/document-exchange/sent-to-esfa', {
			'version' : version,
			'dashboard' : req.session.dashboard,
			'idams' : req.session.idams,
			'parent' : req.session.parent
		});
	});

	// Select an organisation
	router.get('/' + version + '/external/parent/document-exchange/select-organisation', function (req, res) {
		
		// Only set the session variable if it does not exist
		req.session.dashboard = req.session.dashboard || "No";
		req.session.idams = req.session.idams || "MAT";
		req.session.parent = req.session.parent || "MAT";
		// Reset all session variables for document upload (START)
		req.session.uploadedDocumentStatus = "";
		req.session.uploadedDocumentName = "";
		req.session.organisationType = "";
		
		res.render(version + '/external/parent/document-exchange/select-organisation', {
			'version' : version,
			'dashboard' : req.session.dashboard,
			'idams' : req.session.idams,
			'parent' : req.session.parent,
			'error' : req.query.error,
			'uploadedDocumentStatus' : req.session.uploadedDocumentStatus,
			'uploadedDocumentName' : req.session.uploadedDocumentName,
			'organisationType' : req.session.organisationType
		});
	});
	router.post('/' + version + '/external/parent/document-exchange/select-organisation', function (req, res) {		
		
		req.session.organisationType = req.body.organisationType;
		var organisationType = req.session.organisationType;

		if (organisationType == "01") {

			// Check to see whether the parent is LA or MAT (so we can set the correct dummy content)
			if (req.session.parent == "LA") {

				req.session.sendFrom = "Redhill Council (10770003)";
				
				res.redirect('/' + version + '/external/parent/document-exchange/document-upload-file-type');
			}
			else if (req.session.parent == "MAT") {

				req.session.sendFrom = "Rupert Shoggins Academy Trust";

				res.redirect('/' + version + '/external/parent/document-exchange/document-upload-file-type');
			}
			else {

				req.session.sendFrom = "LA/MAT name";

				res.redirect('/' + version + '/external/parent/document-exchange/document-upload-file-type');
			}

		}
		else if (organisationType == "02") {

			// Check to see whether the parent is LA or MAT (so we can set the correct dummy content)
			if (req.session.parent == "LA") {
				
				req.session.sendFrom = "Redhill Council (491)";

				res.redirect('/' + version + '/external/parent/document-exchange/document-upload-file-type');
			}
			else if (req.session.parent == "MAT") {				
				res.redirect('/' + version + '/external/parent/document-exchange/select-academy-or-school?paginationRequired=true&page1=true');
			}
			else {				
				res.redirect('/' + version + '/external/parent/document-exchange/select-academy-or-school?paginationRequired=true&page1=true');
			}

		}
		// Make sure the user chooses an option
		else {
			res.redirect('/' + version + '/external/parent/document-exchange/select-organisation?error=true');
		}
		
	});

	// Select an academy or school
	router.get('/' + version + '/external/parent/document-exchange/select-academy-or-school', function (req, res) {
		
		// Only set the session variable if it does not exist
		req.session.dashboard = req.session.dashboard || "No";
		req.session.idams = req.session.idams || "MAT";
		req.session.parent = req.session.parent || "MAT";

		res.render(version + '/external/parent/document-exchange/select-academy-or-school', {
			'version' : version,
			'dashboard' : req.session.dashboard,
			'idams' : req.session.idams,
			'parent' : req.session.parent,
			'error' : req.query.error,
			'paginationRequired' : req.query.paginationRequired,
			'page1' : req.query.page1,
			'page2' : req.query.page2,
			'page3' : req.query.page3
		});
	});
	router.post('/' + version + '/external/parent/document-exchange/select-academy-or-school', function (req, res) {		
		
		req.session.academyOrSchoolName = req.body.academyOrSchoolName;
		var academyOrSchoolName = req.session.academyOrSchoolName;

		// Make sure the user chooses an option
		if (academyOrSchoolName == undefined) {
			res.redirect('/' + version + '/external/parent/document-exchange/select-academy-or-school?paginationRequired=true&page1=true&error=true');
		}
		// Success
		else {
			
			req.session.sendFrom = academyOrSchoolName;
			
			res.redirect('/' + version + '/external/parent/document-exchange/document-upload-file-type');
		}
		
	});

	// Document Upload File Type
	router.get('/' + version + '/external/parent/document-exchange/document-upload-file-type', function (req, res) {
		
		// Only set the session variable if it does not exist
		req.session.dashboard = req.session.dashboard || "No";
		req.session.idams = req.session.idams || "MAT";
		req.session.parent = req.session.parent || "MAT";
		// Reset all session variables for document upload (START)
		req.session.uploadedDocumentStatus = "";
		req.session.uploadedDocumentName = "";
		req.session.fileType = "";
		req.session.fileTypeVersion = "";
		
		res.render(version + '/external/parent/document-exchange/document-upload-file-type', {
			'version' : version,
			'dashboard' : req.session.dashboard,
			'idams' : req.session.idams,
			'parent' : req.session.parent,
			'sendFrom' : req.session.sendFrom,
			'error' : req.query.error,
			'uploadedDocumentStatus' : req.session.uploadedDocumentStatus,
			'uploadedDocumentName' : req.session.uploadedDocumentName,
			'fileType' : req.session.fileType
		});
	});
	router.post('/' + version + '/external/parent/document-exchange/document-upload-file-type', function (req, res) {

		// Set the chosen document type as a session variable
		req.session.fileType = req.body.fileType;
		var fileType = req.session.fileType;

		// Set the version for any new document users send to the ESFA (based on what they have already sent)
		if (fileType == "Business case") {
			req.session.fileTypeVersion = "3";
		}
		else if (fileType == "Business case audit evidence") {
			req.session.fileTypeVersion = "2";
		}
		else {
			req.session.fileTypeVersion = "1";
		}

		// Make sure the user chooses an option
		if (fileType == undefined) {
			res.redirect('/' + version + '/external/parent/document-exchange/document-upload-file-type?error=true');
		}
		// Success
		else {
			res.redirect('/' + version + '/external/parent/document-exchange/document-upload');
		}
		
	});

	// Document Upload
	router.get('/' + version + '/external/parent/document-exchange/document-upload', function (req, res) {

		// Only set the session variable if it does not exist
		req.session.dashboard = req.session.dashboard || "No";
		req.session.idams = req.session.idams || "MAT";
		req.session.parent = req.session.parent || "MAT";
		// Set the session variable if is does not exist
		req.session.uploadedDocumentStatus = req.session.uploadedDocumentStatus || "";
		req.session.uploadedDocumentName = req.session.uploadedDocumentName || "";
		req.session.fileType = req.session.fileType || "";
		req.session.fileTypeVersion = req.session.fileTypeVersion || "";
		
		res.render(version + '/external/parent/document-exchange/document-upload', {
			'version' : version,
			'dashboard' : req.session.dashboard,
			'idams' : req.session.idams,
			'parent' : req.session.parent,
			'sendFrom' : req.session.sendFrom,
			'uploadedDocumentStatus' : req.session.uploadedDocumentStatus,
			'uploadedDocumentName' : req.session.uploadedDocumentName,
			'fileType' : req.session.fileType,
			'fileTypeVersion' : req.session.fileTypeVersion
		});		
	});
	router.post('/' + version + '/external/parent/document-exchange/document-upload', function (req, res) {		

		req.session.fileName = req.body.fileName;
		
		res.redirect('/' + version + '/external/parent/document-exchange/document-upload-complete');
	});

	// Document Upload - Remove Document
	router.get('/' + version + '/external/parent/document-exchange/document-upload-remove', function (req, res) {
	
		// Only set the session variable if it does not exist
		req.session.dashboard = req.session.dashboard || "No";
		req.session.idams = req.session.idams || "MAT";
		req.session.parent = req.session.parent || "MAT";

		if (!req.session.uploadedDocumentName || req.session.uploadedDocumentName === undefined) {
			req.session.uploadedDocumentName = req.query.uploadedDocumentName;
		}
		
		res.render(version + '/external/parent/document-exchange/document-upload-remove', {
			'version' : version,
			'dashboard' : req.session.dashboard,
			'idams' : req.session.idams,
			'parent' : req.session.parent,
			'sendFrom' : req.session.sendFrom,
			'error' : req.query.error,
			'uploadedDocumentName' : req.session.uploadedDocumentName
		});
	});
	router.post('/' + version + '/external/parent/document-exchange/document-upload-remove', function (req, res) {
		
		if (!req.session.uploadedDocumentName || req.session.uploadedDocumentName === undefined) {
			req.session.uploadedDocumentName = req.query.uploadedDocumentName;
		}

		var deleteDocument = req.body.deleteDocument;

		if (deleteDocument == "Yes") {
			res.redirect('/' + version + '/external/parent/document-exchange/document-upload-file-type');
		}
		else if (deleteDocument == "No") {

			// Tell the next page to show the last uploaded document information
			req.session.uploadedDocumentStatus = "Show";

			res.redirect('/' + version + '/external/parent/document-exchange/document-upload');
		}
		// Make sure the user chooses an option
		else {
			res.redirect('/' + version + '/external/parent/document-exchange/document-upload-remove?error=true');
		}
		
	});

	// Document Upload Complete
	router.get('/' + version + '/external/parent/document-exchange/document-upload-complete', function (req, res) {
	
		// Only set the session variable if it does not exist
		req.session.dashboard = req.session.dashboard || "No";
		req.session.idams = req.session.idams || "MAT";
		req.session.parent = req.session.parent || "MAT";
		
		res.render(version + '/external/parent/document-exchange/document-upload-complete', {
			'version' : version,
			'dashboard' : req.session.dashboard,
			'idams' : req.session.idams,
			'parent' : req.session.parent,
			'sendFrom' : req.session.sendFrom,
			'fileName' : req.session.fileName
		});
	});
	router.post('/' + version + '/external/parent/document-exchange/document-upload-complete', function (req, res) {		
		
		// Reset all session variables for document upload (END)
		req.session.uploadedDocumentStatus = "";
		req.session.uploadedDocumentName = "";
		req.session.fileType = "";
		
		res.redirect('/' + version + '/external/parent/document-exchange/home');
	});

	// Document Upload (Replace)
	router.get('/' + version + '/external/parent/document-exchange/document-upload-replace', function (req, res) {

		// Only set the session variable if it does not exist
		req.session.dashboard = req.session.dashboard || "No";
		req.session.idams = req.session.idams || "MAT";
		req.session.parent = req.session.parent || "MAT";
		// Set the session variable if is does not exist
		req.session.uploadedDocumentStatus = req.session.uploadedDocumentStatus || "";
		req.session.uploadedDocumentName = req.session.uploadedDocumentName || "";
		req.session.fileType = req.session.fileType || "";
		
		res.render(version + '/external/parent/document-exchange/document-upload-replace', {
			'version' : version,
			'dashboard' : req.session.dashboard,
			'idams' : req.session.idams,
			'parent' : req.session.parent,
			'sendFrom' : req.session.sendFrom,
			'uploadedDocumentStatus' : req.session.uploadedDocumentStatus,
			'uploadedDocumentName' : req.session.uploadedDocumentName,
			'fileType' : req.session.fileType
		});		
	});
	router.post('/' + version + '/external/parent/document-exchange/document-upload-replace', function (req, res) {		

		req.session.fileName = req.body.fileName;
		
		res.redirect('/' + version + '/external/parent/document-exchange/document-upload-replace-complete');
	});

	// Document Upload - Remove Document (Replace)
	router.get('/' + version + '/external/parent/document-exchange/document-upload-replace-remove', function (req, res) {

		// Only set the session variable if it does not exist
		req.session.dashboard = req.session.dashboard || "No";
		req.session.idams = req.session.idams || "MAT";
		req.session.parent = req.session.parent || "MAT";

		if (!req.session.uploadedDocumentName || req.session.uploadedDocumentName === undefined) {
			req.session.uploadedDocumentName = req.query.uploadedDocumentName;
		}
		
		res.render(version + '/external/parent/document-exchange/document-upload-replace-remove', {
			'version' : version,
			'dashboard' : req.session.dashboard,
			'idams' : req.session.idams,
			'parent' : req.session.parent,
			'sendFrom' : req.session.sendFrom,
			'error' : req.query.error,
			'uploadedDocumentName' : req.session.uploadedDocumentName
		});
	});
	router.post('/' + version + '/external/parent/document-exchange/document-upload-replace-remove', function (req, res) {
		
		if (!req.session.uploadedDocumentName || req.session.uploadedDocumentName === undefined) {
			req.session.uploadedDocumentName = req.query.uploadedDocumentName;
		}

		var deleteDocument = req.body.deleteDocument;

		if (deleteDocument == "Yes") {
			res.redirect('/' + version + '/external/parent/document-exchange/document-upload-replace');
		}
		else if (deleteDocument == "No") {

			// Tell the next page to show the last uploaded document information
			req.session.uploadedDocumentStatus = "Show";

			res.redirect('/' + version + '/external/parent/document-exchange/document-upload-replace');
		}
		// Make sure the user chooses an option
		else {
			res.redirect('/' + version + '/external/parent/document-exchange/document-upload-replace-remove?error=true');
		}
		
	});

	// Document Upload Complete (Replace)
	router.get('/' + version + '/external/parent/document-exchange/document-upload-replace-complete', function (req, res) {

		// Only set the session variable if it does not exist
		req.session.dashboard = req.session.dashboard || "No";
		req.session.idams = req.session.idams || "MAT";
		req.session.parent = req.session.parent || "MAT";
		
		res.render(version + '/external/parent/document-exchange/document-upload-replace-complete', {
			'version' : version,
			'dashboard' : req.session.dashboard,
			'idams' : req.session.idams,
			'parent' : req.session.parent,
			'sendFrom' : req.session.sendFrom,
			'fileName' : req.session.fileName
		});
	});
	router.post('/' + version + '/external/parent/document-exchange/document-upload-replace-complete', function (req, res) {		
		
		// Reset all session variables for document upload (END)
		req.session.uploadedDocumentStatus = "";
		req.session.uploadedDocumentName = "";
		req.session.fileType = "";
		
		res.redirect('/' + version + '/external/parent/document-exchange/home');
	});

	/**********
	 * INTERNAL USERS
	 * **********/

	// Start
	router.get('/' + version + '/internal/document-exchange/start', function (req, res) {
		res.render(version + '/start', {
			'version' : version
		});
	});
	router.post('/' + version + '/internal/document-exchange/start', function (req, res) {		
		res.redirect('/' + version + '/internal/document-exchange/idams');
	});

	// User roles and permissions
	router.get('/' + version + '/internal/document-exchange/roles-permissions', function (req, res) {
		res.render(version + '/roles-permissions', {
			'version' : version
		});
	});

	// IDAMS
	router.get('/' + version + '/internal/document-exchange/idams', function (req, res) {
		res.render(version + '/idams', {
			'version' : version
		});
	});
	router.post('/' + version + '/internal/document-exchange/idams', function (req, res) {		
		res.redirect('/' + version + '/internal/document-exchange/dashboard');
	});

	// Dashboard
	router.get('/' + version + '/internal/document-exchange/dashboard', function (req, res) {
		
		req.session.idams = "internal";
		
		res.render(version + '/internal/dashboard', {
			'version' : version,
			'idams' : req.session.idams
		});
	});

	// Document Exchange (Home)
	router.get('/' + version + '/internal/document-exchange/home', function (req, res) {
		
		req.session.idams = "internal";
		
		res.render(version + '/internal/document-exchange/home', {
			'version' : version,
			'idams' : req.session.idams
		});
	});

	// File Share
	router.get('/' + version + '/internal/document-exchange/file-share', function (req, res) {
		
		req.session.idams = "internal";
		
		res.render(version + '/internal/document-exchange/file-share', {
			'version' : version,
			'idams' : req.session.idams
		});
	});

	// Documents to Publish
	router.get('/' + version + '/internal/document-exchange/documents-to-publish', function (req, res) {		
		
		req.session.idams = "internal";
		
		res.render(version + '/internal/document-exchange/documents-to-publish', {
			'version' : version,
			'idams' : req.session.idams,
			'error' : req.query.error,
			'paginationRequired' : req.query.paginationRequired,
			'page1' : req.query.page1,
			'page2' : req.query.page2,
			'page3' : req.query.page3
		});
	});
	router.post('/' + version + '/internal/document-exchange/documents-to-publish', function (req, res) {		
		res.redirect('/' + version + '/internal/document-exchange/documents-to-publish-confirm');
	});

	// Documents to Publish (Are you sure?)
	router.get('/' + version + '/internal/document-exchange/documents-to-publish-confirm', function (req, res) {		
	
		req.session.idams = "internal";
		
		res.render(version + '/internal/document-exchange/documents-to-publish-confirm', {
			'version' : version,
			'idams' : req.session.idams,
			'error' : req.query.error
		});
	});
	router.post('/' + version + '/internal/document-exchange/documents-to-publish-confirm', function (req, res) {		

		var publishConfirm = req.body.publishConfirm;
		
		if (publishConfirm == "Yes") {
			res.redirect('/' + version + '/internal/document-exchange/documents-to-publish-confirmation');
		}
		else if (publishConfirm == "No") {
			res.redirect('/' + version + '/internal/document-exchange/documents-to-publish?paginationRequired=true&page1=true');
		}
		// Make sure the user chooses an option
		else {
			res.redirect('/' + version + '/internal/document-exchange/documents-to-publish-confirm?error=true');
		}
		
	});

	// Documents to Publish (Confirmation)
	router.get('/' + version + '/internal/document-exchange/documents-to-publish-confirmation', function (req, res) {		

		req.session.idams = "internal";
		
		res.render(version + '/internal/document-exchange/documents-to-publish-confirmation', {
			'version' : version,
			'idams' : req.session.idams
		});
	});
	router.post('/' + version + '/internal/document-exchange/documents-to-publish-confirmation', function (req, res) {		
		res.redirect('/' + version + '/internal/document-exchange/file-share');
	});

	// Documents to Publish > Remove (Are you sure?)
	router.get('/' + version + '/internal/document-exchange/documents-to-publish-remove-confirm', function (req, res) {		
	
		req.session.idams = "internal";
		
		res.render(version + '/internal/document-exchange/documents-to-publish-remove-confirm', {
			'version' : version,
			'idams' : req.session.idams,
			'error' : req.query.error
		});
	});
	router.post('/' + version + '/internal/document-exchange/documents-to-publish-remove-confirm', function (req, res) {		

		var removeConfirm = req.body.removeConfirm;
		
		if (removeConfirm == "Yes") {
			res.redirect('/' + version + '/internal/document-exchange/documents-removed-confirmation');
		}
		else if (removeConfirm == "No") {
			res.redirect('/' + version + '/internal/document-exchange/documents-to-publish?paginationRequired=true&page1=true');
		}
		// Make sure the user chooses an option
		else {
			res.redirect('/' + version + '/internal/document-exchange/documents-to-publish-remove-confirm?error=true');
		}
		
	});
	
	// Documents to Review
	router.get('/' + version + '/internal/document-exchange/documents-to-review', function (req, res) {		
		
		req.session.idams = "internal";
		
		res.render(version + '/internal/document-exchange/documents-to-review', {
			'version' : version,
			'idams' : req.session.idams,
			'error' : req.query.error,
			'paginationRequired' : req.query.paginationRequired,
			'page1' : req.query.page1,
			'page2' : req.query.page2,
			'page3' : req.query.page3
		});
	});

	// Documents to Review > Remove (Are you sure?)
	router.get('/' + version + '/internal/document-exchange/documents-to-review-remove-confirm', function (req, res) {		
		
		req.session.idams = "internal";
		
		res.render(version + '/internal/document-exchange/documents-to-review-remove-confirm', {
			'version' : version,
			'idams' : req.session.idams,
			'error' : req.query.error
		});
	});
	router.post('/' + version + '/internal/document-exchange/documents-to-review-remove-confirm', function (req, res) {		

		var removeConfirm = req.body.removeConfirm;
		
		if (removeConfirm == "Yes") {
			res.redirect('/' + version + '/internal/document-exchange/documents-removed-confirmation');
		}
		else if (removeConfirm == "No") {
			res.redirect('/' + version + '/internal/document-exchange/documents-to-review');
		}
		// Make sure the user chooses an option
		else {
			res.redirect('/' + version + '/internal/document-exchange/documents-to-review-remove-confirm?error=true');
		}
		
	});

	// Documents Removed (Remove Confirmation)
	router.get('/' + version + '/internal/document-exchange/documents-removed-confirmation', function (req, res) {		

		req.session.idams = "internal";
		
		res.render(version + '/internal/document-exchange/documents-removed-confirmation', {
			'version' : version,
			'idams' : req.session.idams
		});
	});
	router.post('/' + version + '/internal/document-exchange/documents-removed-confirmation', function (req, res) {		
		res.redirect('/' + version + '/internal/document-exchange/file-share');
	});

	// Download Documents
	router.get('/' + version + '/internal/document-exchange/download-documents', function (req, res) {		
		
		req.session.idams = "internal";
		
		res.render(version + '/internal/document-exchange/download-documents', {
			'version' : version,
			'idams' : req.session.idams,
			'error' : req.query.error,
			'paginationRequired' : req.query.paginationRequired,
			'page1' : req.query.page1,
			'page2' : req.query.page2,
			'page3' : req.query.page3
		});
	});

}
