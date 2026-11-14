
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", () => {
  navigation.classList.toggle("active");

  menuToggle.textContent = navigation.classList.contains("active")
    ? "✕"
    : "☰";
});

navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("active");
    menuToggle.textContent = "☰";
  });
});

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !service || !message) {
    alert("Merci de remplir tous les champs.");
    return;
  }

  const destination = "tonadresse@email.com";

  if (destination === "tonadresse@email.com") {
    alert("Le formulaire est prêt ! Remplace l'adresse e-mail dans script.js par ta propre adresse avant de recevoir des demandes.");
    return;
  }

  const subject = encodeURIComponent("Demande de projet - STUDIO.WEB");

  const body = encodeURIComponent(
    "Nom : " + name +
    "\nE-mail : " + email +
    "\nService : " + service +
    "\n\nProjet :\n" + message
  );

  window.location.href =
    "mailto:" + destination +
    "?subject=" + subject +
    "&body=" + body;
});
