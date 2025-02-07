let jsonData = [];

const postData = async () => {
  try {
    const response = await fetch("../json/sampleData.json");
    jsonData = await response.json();
    console.log("Fetched successfully.");
  } catch (error) {
    console.error("Error", error);
  }
};

const populateDiv = (data) => {
  const container = document.getElementById("dataContainer");
  container.innerHTML = "";

  data.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.innerHTML = `
      <p><strong>Name:</strong> ${user.name}</p>
      <hr/>
    `;
    container.appendChild(userDiv);
  });
};

const populatebtn = (data) => {
  const container = document.getElementById("dataContainer");
  container.innerHTML = "";

  data.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.innerHTML = `
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Username:</strong> ${user.username}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <hr/>
    `;
    container.appendChild(userDiv);
  });
};

const filterTable = (showDetails = false) => {
  const input = document.getElementById("searchInput").value.toLowerCase();

  if (input.trim() === "") {
    document.getElementById("dataContainer").innerHTML = "";
    return;
  }

  const filteredData = jsonData.filter(
    (user) =>
      user.name.toLowerCase().includes(input) ||
      user.username.toLowerCase().includes(input) ||
      user.email.toLowerCase().includes(input)
  );

  if (filteredData.length === 0) {
    document.getElementById("dataContainer").innerHTML =
      "<p>No results found.</p>";
  } else {
    if (showDetails) {
      populatebtn(filteredData); 
    } else {
      populateDiv(filteredData);
    }
  }
};

document
  .getElementById("searchInput")
  .addEventListener("input", () => filterTable(false));
document
  .getElementById("searchButton")
  .addEventListener("click", () => filterTable(true));

postData();
