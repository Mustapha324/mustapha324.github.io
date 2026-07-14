(function () {
	const data = window.PORTFOLIO_DATA;

	const isValidUrl = (value) => /^https?:\/\//i.test(value || "");

	const makeElement = (tag, className, text) => {
		const element = document.createElement(tag);
		if (className) {
			element.className = className;
		}
		if (text) {
			element.textContent = text;
		}
		return element;
	};

	const projectInitials = (title) => title
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((word) => word[0])
		.join("")
		.toUpperCase();

	const renderProjectCard = (project) => {
		const article = makeElement("article", "project-card");

		const visual = makeElement("div", "project-card__visual");
		if (project.image) {
			const image = document.createElement("img");
			image.src = project.image.src;
			image.alt = project.image.alt;
			image.loading = "lazy";
			visual.appendChild(image);
		} else {
			visual.setAttribute("aria-hidden", "true");
			visual.textContent = projectInitials(project.title);
		}

		const body = makeElement("div", "project-card__body");
		body.appendChild(makeElement("span", "project-card__status", project.status));
		body.appendChild(makeElement("h3", "", project.title));
		body.appendChild(makeElement("p", "project-card__description", project.description));

		const techList = makeElement("ul", "tech-list");
		techList.setAttribute("aria-label", `${project.title} technologies`);
		project.technologies.forEach((technology) => {
			techList.appendChild(makeElement("li", "", technology));
		});
		body.appendChild(techList);

		const actions = makeElement("div", "project-card__actions");
		if (isValidUrl(project.githubUrl)) {
			const githubLink = makeElement("a", "", "GitHub");
			githubLink.href = project.githubUrl;
			githubLink.target = "_blank";
			githubLink.rel = "noreferrer";
			actions.appendChild(githubLink);
		}
		if (isValidUrl(project.demoUrl)) {
			const demoLink = makeElement("a", "", "Live Demo");
			demoLink.href = project.demoUrl;
			demoLink.target = "_blank";
			demoLink.rel = "noreferrer";
			actions.appendChild(demoLink);
		}
		if (actions.children.length > 0) {
			body.appendChild(actions);
		}

		article.append(visual, body);
		return article;
	};

	const renderProjects = () => {
		const grid = document.querySelector("[data-project-grid]");
		if (!grid || !data) {
			return;
		}

		grid.textContent = "";
		data.projects.forEach((project) => {
			grid.appendChild(renderProjectCard(project));
		});
	};

	const renderSkills = () => {
		const grid = document.querySelector("[data-skills-grid]");
		if (!grid || !data) {
			return;
		}

		data.skillGroups.forEach((group) => {
			const section = makeElement("section", "skill-group");
			section.appendChild(makeElement("h3", "", group.name));

			const list = makeElement("ul", "");
			group.items.forEach((item) => {
				list.appendChild(makeElement("li", "", item));
			});

			section.appendChild(list);
			grid.appendChild(section);
		});
	};

	const markActiveNavLink = () => {
		const sections = Array.from(document.querySelectorAll("main section[id]"));
		const navLinks = Array.from(document.querySelectorAll(".site-nav__links a"));

		if (!("IntersectionObserver" in window)) {
			return;
		}

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				}

				navLinks.forEach((link) => {
					link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
				});
			});
		}, {
			rootMargin: "-35% 0px -55% 0px",
			threshold: 0
		});

		sections.forEach((section) => observer.observe(section));
	};

	const setCurrentYear = () => {
		const yearTarget = document.querySelector("[data-current-year]");
		if (yearTarget) {
			yearTarget.textContent = new Date().getFullYear().toString();
		}
	};

	document.addEventListener("DOMContentLoaded", () => {
		renderProjects();
		renderSkills();
		markActiveNavLink();
		setCurrentYear();
	});
})();
