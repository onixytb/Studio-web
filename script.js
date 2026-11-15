
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

// FORMULAIRE DE CONTACT

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !service || !message) {
    alert("Merci de remplir tous les champs.");
    return;
  }

  const originalText = submitButton.textContent;

  submitButton.disabled = true;
  submitButton.textContent = "ENVOI EN COURS...";

  try {
    const response = await fetch("https://formspree.io/f/xppdpdvn", {
      method: "POST",
      body: new FormData(contactForm),
      headers: {
        "Accept": "application/json"
      }
    });

    if (response.ok) {
      contactForm.reset();

      submitButton.textContent = "MESSAGE ENVOYÉ ✓";

      let confirmation = document.getElementById("formConfirmation");

      if (!confirmation) {
        confirmation = document.createElement("p");
        confirmation.id = "formConfirmation";
        confirmation.style.color = "#39ff88";
        confirmation.style.marginTop = "15px";
        confirmation.style.textAlign = "center";
        contactForm.appendChild(confirmation);
      }

      confirmation.textContent =
        "Merci ! Votre demande a bien été envoyée. Je vous répondrai prochainement.";

    } else {
      throw new Error("Erreur lors de l'envoi.");
    }

  } catch (error) {
    submitButton.textContent = "RÉESSAYER";
    alert("Impossible d'envoyer votre message. Vérifiez votre connexion et réessayez.");
  }

  setTimeout(() => {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }, 3000);
});
