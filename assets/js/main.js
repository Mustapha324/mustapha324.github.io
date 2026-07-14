(function () {
	document.documentElement.classList.add("js");

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

	const uniqueFilters = () => {
		const filters = ["All"];
		data.projects.forEach((project) => {
			[project.type, project.status === "In Development" ? project.status : ""].forEach((value) => {
				if (value && !filters.includes(value)) {
					filters.push(value);
				}
			});
		});
		return filters;
	};

	const projectMatchesFilter = (project, filter) => filter === "All" || project.type === filter || project.status === filter;

	const renderProjectCard = (project, index) => {
		const article = makeElement("article", "project-card reveal");
		article.style.setProperty("--card-index", index.toString());
		article.dataset.reactiveSurface = "";

		const visual = makeElement("div", "project-card__visual");
		if (project.image) {
			const image = document.createElement("img");
			image.src = project.image.src;
			image.alt = project.image.alt;
			image.loading = "lazy";
			visual.appendChild(image);
		} else {
			visual.setAttribute("aria-hidden", "true");
			visual.appendChild(makeElement("span", "project-card__symbol", project.symbol || "MS"));
		}

		const body = makeElement("div", "project-card__body");
		const badges = makeElement("div", "project-card__badges");
		badges.appendChild(makeElement("span", "status-pill", project.type));
		badges.appendChild(makeElement("span", "status-pill status-pill--violet", project.status));
		body.appendChild(badges);
		body.appendChild(makeElement("h3", "", project.title));
		body.appendChild(makeElement("p", "project-card__description", project.description));

		if (project.highlights && project.highlights.length) {
			const highlightList = makeElement("ul", "project-card__highlights");
			project.highlights.forEach((highlight) => {
				highlightList.appendChild(makeElement("li", "", highlight));
			});
			body.appendChild(highlightList);
		}

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

	const renderProjects = (filter = "All") => {
		const grid = document.querySelector("[data-project-grid]");
		if (!grid || !data) {
			return;
		}

		grid.textContent = "";
		data.projects
			.filter((project) => projectMatchesFilter(project, filter))
			.forEach((project, index) => {
				grid.appendChild(renderProjectCard(project, index));
			});
		bindReactiveSurfaces(grid);
		revealOnScroll(grid);
	};

	const renderProjectFilters = () => {
		const filtersTarget = document.querySelector("[data-project-filters]");
		if (!filtersTarget || !data) {
			return;
		}

		uniqueFilters().forEach((filter, index) => {
			const button = makeElement("button", "filter-chip", filter);
			button.type = "button";
			button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
			button.addEventListener("click", () => {
				filtersTarget.querySelectorAll("button").forEach((filterButton) => {
					filterButton.setAttribute("aria-pressed", String(filterButton === button));
				});
				renderProjects(filter);
			});
			filtersTarget.appendChild(button);
		});
	};

	const renderSkills = () => {
		const grid = document.querySelector("[data-skills-grid]");
		if (!grid || !data) {
			return;
		}

		data.skillGroups.forEach((group, index) => {
			const section = makeElement("section", "skill-group reveal");
			section.style.setProperty("--card-index", index.toString());
			section.dataset.reactiveSurface = "";
			section.appendChild(makeElement("h3", "", group.name));

			const list = makeElement("ul", "");
			group.items.forEach((item) => {
				const listItem = makeElement("li", "");
				const button = makeElement("button", "skill-chip", item);
				button.type = "button";
				button.setAttribute("aria-pressed", "false");
				button.dataset.skill = item;
				button.dataset.skillGroup = group.name;
				button.addEventListener("click", () => focusSkill(button));
				listItem.appendChild(button);
				list.appendChild(listItem);
			});

			section.appendChild(list);
			grid.appendChild(section);
		});
	};

	const focusSkill = (button) => {
		document.querySelectorAll(".skill-chip.is-active").forEach((chip) => {
			chip.classList.remove("is-active");
			chip.setAttribute("aria-pressed", "false");
		});
		button.classList.add("is-active");
		button.setAttribute("aria-pressed", "true");

		const focusTarget = document.querySelector("[data-skill-focus]");
		if (focusTarget) {
			focusTarget.textContent = `Skill focus: ${button.dataset.skill} in ${button.dataset.skillGroup}`;
		}
	};

	const markActiveNavLink = (root = document) => {
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

	const revealOnScroll = (root = document) => {
		const targets = Array.from(root.querySelectorAll(".reveal:not(.is-visible)"));
		if (!("IntersectionObserver" in window)) {
			targets.forEach((target) => target.classList.add("is-visible"));
			return;
		}

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				}
			});
		}, {
			rootMargin: "0px 0px -10% 0px",
			threshold: 0.1
		});

		targets.forEach((target) => observer.observe(target));
	};

	const bindReactiveSurfaces = (root = document) => {
		const surfaces = Array.from(root.querySelectorAll("[data-reactive-surface], .hero-art, .glass-panel, .timeline-item, .education-panel"));
		const canUsePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		surfaces.forEach((surface) => {
			if (surface.dataset.reactiveBound === "true") {
				return;
			}
			surface.dataset.reactiveBound = "true";

			surface.addEventListener("pointermove", (event) => {
				const rect = surface.getBoundingClientRect();
				const x = ((event.clientX - rect.left) / rect.width) * 100;
				const y = ((event.clientY - rect.top) / rect.height) * 100;
				surface.style.setProperty("--pointer-x", `${x}%`);
				surface.style.setProperty("--pointer-y", `${y}%`);

				if (canUsePointer && !prefersReducedMotion) {
					surface.style.setProperty("--tilt-x", `${(50 - y) / 16}deg`);
					surface.style.setProperty("--tilt-y", `${(x - 50) / 18}deg`);
				}
			});

			surface.addEventListener("pointerleave", () => {
				surface.style.removeProperty("--tilt-x");
				surface.style.removeProperty("--tilt-y");
			});
		});
	};

	const setupCopyEmail = () => {
		const button = document.querySelector("[data-copy-email]");
		const status = document.querySelector("[data-copy-status]");
		if (!button) {
			return;
		}

		button.addEventListener("click", async () => {
			const email = button.dataset.copyEmail;
			try {
				await navigator.clipboard.writeText(email);
				button.textContent = "Email Copied";
				if (status) {
					status.textContent = "Email copied to clipboard.";
				}
				window.setTimeout(() => {
					button.textContent = "Copy Email";
				}, 2200);
			} catch (error) {
				window.location.href = `mailto:${email}`;
				if (status) {
					status.textContent = "Opening your email app.";
				}
			}
		});
	};

	const setupAmbientPointer = () => {
		const root = document.documentElement;
		let frame = null;
		let nextX = 50;
		let nextY = 20;

		window.addEventListener("pointermove", (event) => {
			nextX = (event.clientX / window.innerWidth) * 100;
			nextY = (event.clientY / window.innerHeight) * 100;

			if (frame) {
				return;
			}

			frame = window.requestAnimationFrame(() => {
				root.style.setProperty("--mouse-x", `${nextX}%`);
				root.style.setProperty("--mouse-y", `${nextY}%`);
				frame = null;
			});
		}, { passive: true });
	};

	const setupSparkEffects = () => {
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReducedMotion) {
			return;
		}

		document.addEventListener("pointerdown", (event) => {
			const interactiveTarget = event.target.closest("a, button, .project-card, .skill-group, .hero-art");
			if (!interactiveTarget) {
				return;
			}

			for (let index = 0; index < 6; index += 1) {
				const spark = document.createElement("span");
				spark.className = "spark";
				const angle = (Math.PI * 2 * index) / 6;
				const distance = 28 + Math.random() * 18;
				spark.style.left = `${event.clientX}px`;
				spark.style.top = `${event.clientY}px`;
				spark.style.setProperty("--spark-x", `${Math.cos(angle) * distance}px`);
				spark.style.setProperty("--spark-y", `${Math.sin(angle) * distance}px`);
				document.body.appendChild(spark);
				window.setTimeout(() => spark.remove(), 720);
			}
		});
	};

	const setCurrentYear = () => {
		const yearTarget = document.querySelector("[data-current-year]");
		if (yearTarget) {
			yearTarget.textContent = new Date().getFullYear().toString();
		}
	};

	document.addEventListener("DOMContentLoaded", () => {
		renderProjectFilters();
		renderProjects();
		renderSkills();
		markActiveNavLink();
		revealOnScroll();
		bindReactiveSurfaces();
		setupCopyEmail();
		setupAmbientPointer();
		setupSparkEffects();
		setCurrentYear();
	});
})();
