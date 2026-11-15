
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

// MENU MOBILE

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

// FORMULAIRE DE CONTACT FORMSPREE

const contactForm = document.getElementById("contactForm");
const confirmation = document.getElementById("formConfirmation");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = contactForm.querySelector('button[type="submit"]');

  if (!contactForm.reportValidity()) return;

  submitButton.disabled = true;
  submitButton.textContent = "ENVOI EN COURS...";
  confirmation.textContent = "";
  confirmation.style.color = "";

  try {
    const response = await fetch("https://formspree.io/f/xppdpdvn", {
      method: "POST",
      body: new FormData(contactForm),
      headers: {
        "Accept": "application/json"
      }
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.errors?.map(error => error.message).join(", ") || "Erreur d'envoi.");
    }

    contactForm.reset();

    confirmation.textContent =
      "✓ Votre demande a bien été envoyée ! Merci pour votre confiance.";

    confirmation.style.color = "#39ff88";
    submitButton.textContent = "MESSAGE ENVOYÉ ✓";

  } catch (error) {
    confirmation.textContent =
      "Impossible d'envoyer votre demande. Vérifiez votre connexion et réessayez.";

    confirmation.style.color = "#ff6b6b";
    submitButton.textContent = "RÉESSAYER";

  } finally {
    submitButton.disabled = false;

    if (submitButton.textContent === "MESSAGE ENVOYÉ ✓") {
      setTimeout(() => {
        submitButton.textContent = "Envoyer ma demande ↗";
      }, 4000);
    } else if (submitButton.textContent === "RÉESSAYER") {
      // Le bouton reste disponible pour un nouvel essai.
    }
  }
});
