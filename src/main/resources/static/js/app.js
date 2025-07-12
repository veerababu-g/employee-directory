const form = document.getElementById("employeeForm");
const addBtn = document.getElementById("addBtn");
const cancelBtn = document.getElementById("cancelBtn");
const formContainer = document.getElementById("form-container");
const listContainer = document.getElementById("employee-list");
const searchInput = document.getElementById("searchInput");

let employees = [];

// Render all employees (optionally filtered)
function renderEmployees(filter = "") {
  listContainer.innerHTML = '';
  const filtered = employees.filter(emp =>
    `${emp.firstName} ${emp.lastName} ${emp.email}`.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(emp => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
    listContainer.appendChild(card);
  });
}

// Add or Edit Employee
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const id = form.empId.value;

  const newEmp = {
    id: id ? Number(id) : Date.now(),
    firstName: form.firstName.value.trim(),
    lastName: form.lastName.value.trim(),
    email: form.email.value.trim(),
    department: form.department.value.trim(),
    role: form.role.value.trim()
  };

  if (id) {
    const index = employees.findIndex(emp => emp.id === Number(id));
    if (index !== -1) employees[index] = newEmp;
  } else {
    employees.push(newEmp);
  }

  form.reset();
  formContainer.classList.add("hidden");
  renderEmployees(searchInput.value);
});

// Cancel Form
cancelBtn.addEventListener("click", () => {
  form.reset();
  formContainer.classList.add("hidden");
});

// Show Form
addBtn.addEventListener("click", () => {
  form.reset();
  form.empId.value = "";
  formContainer.classList.remove("hidden");
});

// Search Employees
searchInput.addEventListener("input", () => {
  renderEmployees(searchInput.value);
});

// Edit Employee
window.editEmployee = function (id) {
  const emp = employees.find(e => e.id === id);
  if (!emp) return;

  form.empId.value = emp.id;
  form.firstName.value = emp.firstName;
  form.lastName.value = emp.lastName;
  form.email.value = emp.email;
  form.department.value = emp.department;
  form.role.value = emp.role;

  formContainer.classList.remove("hidden");
};

// Delete Employee
window.deleteEmployee = function (id) {
  if (!confirm("Are you sure you want to delete this employee?")) return;
  employees = employees.filter(emp => emp.id !== id);
  renderEmployees(searchInput.value);
};

// Initial Render
renderEmployees();
