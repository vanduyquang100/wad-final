const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+]{8,}$/;

const registerUser = async (event) => {
  event.preventDefault();
  const buttonSpinner = document.getElementsByClassName("register-spinner")[0];
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  try {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!passwordRegex.test(data.password)) {
      alert(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
      );
      return;
    }

    buttonSpinner.classList.remove("hidden");
    let response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.error || "An error occurred");
    } else {
      const responseData = await response.json();
      alert("User registered successfully");
      form.reset();
    }
  } catch (error) {
    alert(error);
  } finally {
    buttonSpinner.classList.add("hidden");
  }
};
