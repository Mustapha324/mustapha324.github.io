(function (window) {
	// Add confirmed project repository, demo, report, or screenshot URLs here as they become available.
	window.PORTFOLIO_DATA = {
		projects: [
			{
				title: "MLB Game Outcome Predictor",
				type: "Software Project",
				status: "Full-stack ML application",
				symbol: "MLB",
				description: "A full-stack web application that predicts MLB game winners and displays prediction confidence, daily matchups, model performance, accuracy, and historical results.",
				highlights: [
					"Built a FastAPI backend for prediction and metrics endpoints.",
					"Designed a Next.js and TypeScript frontend for daily matchup exploration.",
					"Connected machine learning outputs to readable confidence and performance views."
				],
				technologies: ["Python", "FastAPI", "Next.js", "TypeScript", "Machine Learning", "REST APIs"],
				githubUrl: "",
				demoUrl: "",
				image: null
			},
			{
				title: "QIF-to-Unity Geometry Parser",
				type: "Internship Project",
				status: "Collaborative engineering project",
				symbol: "QIF",
				description: "A C++ software engineering project that parses Quality Information Framework XML files and converts manufacturing geometry and topology information into structures that can be rendered inside Unity.",
				highlights: [
					"Implemented QIF geometry parsing for points, curves, planes, cylinders, surfaces, and topology references.",
					"Worked with TinyXML2, OpenCascade geometry structures, and parser architecture.",
					"Collaborated through Git and GitHub with developers across Unity, PMI, and interface work."
				],
				technologies: ["C++", "TinyXML2", "OpenCascade", "Unity", "Git"],
				githubUrl: "",
				demoUrl: "",
				image: null
			},
			{
				title: "AI DJ",
				type: "Research Experiment",
				status: "In Development",
				symbol: "AI",
				description: "An experimental AI-powered DJ system designed to analyze songs, identify important sections, create smooth transitions, mix across genres, and adapt the playlist based on live user input.",
				highlights: [
					"Explores audio analysis, transition planning, and adaptive playlist behavior.",
					"Focuses on practical user control instead of a fully automated black box.",
					"Currently in development as a machine learning and audio-processing experiment."
				],
				technologies: ["Python", "Audio Processing", "Machine Learning"],
				githubUrl: "",
				demoUrl: "",
				image: null
			}
		],
		skillGroups: [
			{
				name: "Languages",
				items: ["C++", "C", "Python", "Java", "TypeScript", "JavaScript", "HTML", "CSS"]
			},
			{
				name: "Frameworks",
				items: ["FastAPI", "Next.js", "REST APIs"]
			},
			{
				name: "Tools",
				items: ["Git", "GitHub", "Linux", "Visual Studio", "VS Code", "Docker"]
			},
			{
				name: "AI and Machine Learning",
				items: ["Machine Learning Fundamentals", "Prediction Models", "Audio Processing"]
			},
			{
				name: "Backend Development",
				items: ["API Design", "Data Handling", "Service Architecture", "Debugging"]
			},
			{
				name: "Systems and Geometry",
				items: ["XML Parsing", "OpenCascade", "Geometry Processing", "Topology References"]
			},
			{
				name: "Computer Science",
				items: ["Data Structures", "Algorithms", "Object-Oriented Programming"]
			},
			{
				name: "Professional Skills",
				items: ["Team Development", "Mentorship", "Technical Communication", "Code Integration"]
			}
		]
	};
})(window);
