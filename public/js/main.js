const outputContainer = document.getElementById("output");
const getUsersBtn = document.getElementById("get-users-btn");

const form = document.querySelector("#add-user-form");

const PORT = 8080;

// get and show all users
async function getUsers() {
  try {
    const res = await fetch(`http://localhost:${PORT}/v1/api/users`);

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await res.json();
    // outputContainer.innerHTML = data.map(user => user.name).join(", ");

    outputContainer.innerHTML = "";

    data.forEach((user) => {
      const div = document.createElement("div");
      div.innerHTML = user.name;
      outputContainer.appendChild(div);
    });
  } catch (error) {
    console.log("Error fetching users:", error);
  }
}

// create event listener for createUserBtn
async function createUser(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const name = formData.get("name");

  try {
    const res = await fetch(`http://localhost:${PORT}/v1/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      throw new Error("Failed to create user");
    }

    const data = await res.json();
    const div = document.createElement("div");
    div.innerHTML = data.name;

    outputContainer.appendChild(div);
    getUsers();
  } catch (error) {
    console.log("Error creating user:", error);
  }
}

getUsersBtn.addEventListener("click", getUsers);
form.addEventListener("submit", createUser);
