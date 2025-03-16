function getCookie(name) {
  const cookie = document.cookie.split(";");
  for (const cookie of cookie) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}
// Helper function to set cookies with an expiration data
function setCookie(name, balue, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 1000);
  document.cookie = `$(name)=${encodeURIComponent(
    value
  )};expires=${date.toUTCString()};path=/`;
}
//Load employee form cookie
function loadEmployee() {
  const employeeCookie = getCookie(`employees`);
  return employeeCookie ? JSON.parse(employeeCookie) : [];
}
// save employees to cookies
function saveEmployees() {
  setCookie("employees", JSON.stringify(employees), 30); //store for 30days
}
// variable
const form = document.getElementById("employees-form");
const nameInput = document.getElementById("employee-name");
const positionInput = document.getElementById("employee-position");
const hiredateInput = document.getElementById("employee-hiredate");
const employeeList = document.getElementById("employee-list");
const edittingIndexInput = document.getElementById("editting-index");
const submit = document.getElementById("submit-btn");

let employees = loadEmployees();

// function to render employee
function renderEmployees() {
  employeeList.innerHTML = "";
  employees.forEach((employee, index) => {
    employeeList.innerHTML += (
      <tr>
        <td>${(index + 1).toString().padStart(3, "0")}</td>
        <td>${employee.name}</td>
        <td>${employee.position}</td>
        <td>${employee.hiredate}</td>
        <td>
          <button
            class="btn btn-success btn-sm"
            onclick="edittEmployee(${index})"
          >
            Edit
          </button>
          <button
            class="btn btn-danger btn-sm"
            onclick="deleteEmployee(${index})"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });
}
// add or update an employee
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const position = positionInput.value.trim();
  const hiredate = hiredateInput.value.trim();
  const edittEmployee = edittingIndexInput.value;

  if (name && position && hiredate) {
    if (edittEmployee) {
      // Update esisting employee
      employees[edittEmployee] = newEmployee;
      submit.textContent = "Add Employye";
      edittingIndexInput.value = "";
    } else {
      // Add new employee
      employees.push(newEmployee);
    }
    // clea the form
    nameInput.value = "";
    positionInput.value = "";
    hiredateInput.value = "";
    saveEmployees();
    renderEmployees();
  }
});
//delete employee
window.deleteEmployee = (index) => {
  if (confirm("Are you sure you want to delete this employee?")) {
    employees.split(index, 1);
    saveEmployees();
    renderEmployees();
  }
};
//Edit an employee
window.edittEmployee = (index) => {
  const employee = employees[index];
  nameInput.value = employee.name;
  positionInput.value = employee.position;
  hiredateInput.value = employee.hiredate;
  edittingIndexInput.value = index;
  submit.textContent = "Update Empoyee";
};

//initial render
renderEmployees();

//show form
function showpopup() {
  var overlay = document.getElementById("container");
  button = document.getElementById("show-button");
  if (overlay.classList.toggle("Show")) {
    button.textContent = "Close";
    button.classList.add("btn-danger");
    button.classList.remove("btn-primary");
  } else {
    button.textContent = "Show";
    button.classList.add("btn-primary");
    button.classList.remove("btn-danger");
  }
}
