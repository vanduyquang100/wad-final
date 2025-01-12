document.addEventListener("DOMContentLoaded", () => {
  const avatarInput = document.getElementById("avatar");
  const avatarImage = document.getElementById("image-avatar");
  const profilePicInput = document.getElementById("profilePic");
  const updateForm = document.getElementById("update-form");

  avatarInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        // Send the file to the server
        const response = await fetch("/api/images/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await response.json();
        const avatarUrl = data.link;

        avatarImage.src = avatarUrl;
        profilePicInput.value = avatarUrl;
      } catch (error) {
        console.error("Error uploading avatar:", error);
        alert("Failed to upload avatar. Please try again.");
      }
    }
  });

  updateForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(updateForm);
    const jsonData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(updateForm.action, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      // Reload the current page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  });
});
