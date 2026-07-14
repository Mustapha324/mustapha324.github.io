(function (window) {
	// TODO: Add confirmed project GitHub URLs, live demos, and screenshots only after verifying exact links/assets.
	window.PORTFOLIO_DATA = {
		projects: [
			{
				title: "MLB Game Outcome Predictor",
				status: "Full-stack ML application",
				description: "A full-stack web application that predicts MLB game winners and displays prediction confidence, daily matchups, model performance, accuracy, and historical results. The backend provides prediction and metrics endpoints through FastAPI, while the frontend is built using Next.js and TypeScript.",
				technologies: ["Python", "FastAPI", "Next.js", "TypeScript", "Machine Learning", "REST APIs"],
				githubUrl: "",
				demoUrl: "",
				image: null
			},
			{
				title: "QIF-to-Unity Geometry Parser",
				status: "Collaborative engineering project",
				description: "A C++ software engineering project that parses Quality Information Framework XML files and converts manufacturing geometry and topology information into structures that can be rendered inside Unity. Work included parser architecture, geometry maps, curve and surface parsing, and OpenCascade integration.",
				technologies: ["C++", "TinyXML2", "OpenCascade", "Unity", "Git"],
				githubUrl: "",
				demoUrl: "",
				image: null
			},
			{
				title: "AI DJ",
				status: "In Development",
				description: "An experimental AI-powered DJ system designed to analyze songs, identify important sections, create smooth transitions, mix across genres, and adapt the playlist based on live user input.",
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
				name: "Frameworks and Tools",
				items: ["FastAPI", "Next.js", "Git", "GitHub", "Linux", "Visual Studio", "VS Code", "Docker"]
			},
			{
				name: "Concepts",
				items: ["Data Structures", "Algorithms", "Object-Oriented Programming", "REST APIs", "XML Parsing", "Machine Learning Fundamentals", "Backend Development", "Geometry Processing"]
			}
		]
	};
})(window);
