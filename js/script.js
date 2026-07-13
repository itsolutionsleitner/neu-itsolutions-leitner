"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-nav");

  if (menuToggle && navigation) {
    const closeMenu = () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Menü öffnen");
      navigation.classList.remove("is-open");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Menü öffnen" : "Menü schließen",
      );
      navigation.classList.toggle("is-open", !isOpen);
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const cookieBanner = document.querySelector("[data-cookie-banner]");
  const cookieAccept = document.querySelector("[data-cookie-accept]");

  if (cookieBanner && cookieAccept) {
    let cookieNoticeAccepted = false;
    try {
      cookieNoticeAccepted =
        localStorage.getItem("cookie-notice-accepted") === "true";
    } catch (error) {
      cookieNoticeAccepted = false;
    }

    cookieBanner.hidden = cookieNoticeAccepted;
    cookieAccept.addEventListener("click", () => {
      cookieBanner.hidden = true;
      try {
        localStorage.setItem("cookie-notice-accepted", "true");
      } catch (error) {
        // Das Banner bleibt für die aktuelle Sitzung geschlossen.
      }
    });
  }

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  document.querySelectorAll(".accordion details").forEach((detail) => {
    detail.addEventListener("toggle", () => {
      if (!detail.open) return;
      document
        .querySelectorAll(".accordion details[open]")
        .forEach((otherDetail) => {
          if (otherDetail !== detail) otherDetail.removeAttribute("open");
        });
    });
  });

  const contactForm = document.querySelector("[data-contact-form]");
  const formSuccess = document.querySelector("[data-form-success]");
  const formError = document.querySelector("[data-form-error]");

  if (contactForm && formSuccess && formError) {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const defaultButtonText = submitButton ? submitButton.innerHTML : "";

    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      formError.hidden = true;
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Wird gesendet …";
      }

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
          headers: { Accept: "application/json" },
        });

        if (!response.ok)
          throw new Error("Formular konnte nicht gesendet werden.");

        contactForm.reset();
        contactForm.hidden = true;
        formSuccess.hidden = false;
        formSuccess.focus();
      } catch (error) {
        formError.hidden = false;
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = defaultButtonText;
        }
      }
    });
  }
});
