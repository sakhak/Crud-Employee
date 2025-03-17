// Get a cookie by name
function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (const c of cookies) {
    const [cookieName, cookieValue] = c.trim().split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

// Helper function to set cookies with an expiration date
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Fix time calculation
  document.cookie = `${name}=${encodeURIComponent(
    value
  )};expires=${date.toUTCString()};path=/`;
}

// Load employees from cookies
function loadEmployees() {
  const employeeCookie = getCookie("employees");
  return employeeCookie ? JSON.parse(employeeCookie) : [];
}

// Save employees to cookies
function saveEmployees() {
  setCookie("employees", JSON.stringify(employees), 30); // Store for 30 days
}

// Variables
const form = document.getElementById("employees-form");
const nameInput = document.getElementById("employee-name");
const positionInput = document.getElementById("employee-position");
const hiredateInput = document.getElementById("employee-hiredate");
const employeeList = document.getElementById("employee-list");
const edittingIndexInput = document.getElementById("editting-index");
const submit = document.getElementById("submit-btn");

let employees = loadEmployees();

// Function to render employees
function renderEmployees() {
  employeeList.innerHTML = "";
  employees.forEach((employee, index) => {
    employeeList.innerHTML += `
        <tr>
          <td>${(index + 1).toString().padStart(3, "0")}</td>
          <td>${employee.name}</td>
          <td>${employee.position}</td>
          <td>${employee.hiredate}</td>
          <td>
            <button class="btn btn-success btn-sm " style="width:90px" onclick="editEmployee(${index})">
              Edit
            </button>
            <button class="btn btn-danger btn-sm" style="width:90px" onclick="deleteEmployee(${index})">
              Delete
            </button>
          </td>
        </tr>
      `;
  });
}

// Add or update an employee
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const position = positionInput.value.trim();
  const hiredate = hiredateInput.value.trim();
  const editIndex = edittingIndexInput.value;

  if (name && position && hiredate) {
    const newEmployee = { name, position, hiredate };

    if (editIndex) {
      // Update existing employee
      employees[editIndex] = newEmployee;
      submit.textContent = "Add Employee";
      edittingIndexInput.value = "";
    } else {
      // Add new employee
      employees.push(newEmployee);
    }

    // Clear the form
    nameInput.value = "";
    positionInput.value = "";
    hiredateInput.value = "";

    saveEmployees();
    renderEmployees();
  }
});

// Delete employee
window.deleteEmployee = (index) => {
  if (confirm("Are you sure you want to delete this employee?")) {
    employees.splice(index, 1); // Fix: Use splice instead of split
    saveEmployees();
    renderEmployees();
  }
};

// Edit an employee
window.editEmployee = (index) => {
  const employee = employees[index];
  nameInput.value = employee.name;
  positionInput.value = employee.position;
  hiredateInput.value = employee.hiredate;
  edittingIndexInput.value = index;
  submit.textContent = "Update Employee";
};

// Initial render
renderEmployees();

// Show/Hide form
function showpopup() {
  const container = document.getElementById("container");
  const button = document.getElementById("show-button");

  container.style.opacity = container.style.opacity === "1" ? "0" : "1";

  if (container.style.opacity === "1") {
    button.textContent = "Close";
    button.classList.add("btn-danger");
    button.classList.remove("btn-primary");
  } else {
    button.textContent = "Show";
    button.classList.add("btn-primary");
    button.classList.remove("btn-danger");
  }
}
