document.addEventListener("DOMContentLoaded", () => {
   
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    renderExpenses(expenses);
  

  });

  function handleForm(event){
    event.preventDefault();
    const amount = event.target.amount.value
    const description = event.target.description.value
    const category = event.target.category.value

    if (!amount || !description || !category) {
        alert("All fields are required!");
        return;
      }
  
    // Load expenses from local storage on page load
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    

      const newExpense = {
        id: Date.now(), 
        amount,
        description,
        category,
      };
  
      expenses.push(newExpense);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      renderExpenses(expenses)
      event.target.reset();

  }
  

   // Render the expenses
   function renderExpenses(expenses) {
     const expenseList = document.getElementById("expense-list");

    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.dataset.id = expense.id;

      li.innerHTML = `
        <div>
          <strong>${expense.amount}</strong> - ${expense.description} (${expense.category})
        </div>
        <div>
          <button onclick="edit(${expense.id})" class="btn btn-sm btn-warning btn-edit me-2">Edit</button>
          <button onclick="deleteExpense(${expense.id})" class="btn btn-sm btn-danger btn-delete">Delete</button>
        </div>
      `;

      expenseList.appendChild(li);
    });
  }

  // Function to edit an expense
function edit(id) {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const index = expenses.findIndex((expense) => expense.id == id);
  
    if (index !== -1) {
      const expense = expenses[index];
      const form = document.querySelector("form");
  
      // Populate the form with existing expense details
      form.amount.value = expense.amount;
      form.description.value = expense.description;
      form.category.value = expense.category;
  
      // Temporarily remove the expense from the list
      expenses.splice(index, 1);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      renderExpenses(expenses);
    }
    else{
        alert("expense doesnt exsist")
    }
  }

  // Function to delete an expense
function deleteExpense(id) {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const updatedExpenses = expenses.filter((expense) => expense.id != id);
  
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    renderExpenses(updatedExpenses);
  }