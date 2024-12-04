const data = [];
for (let i = 1; i <= 10; i++) {
  const amount = parseFloat((Math.random() * 50000000 + 10000000).toFixed(0));
  const collected = parseFloat(
    (Math.random() * 50000000 + 10000000).toFixed(0)
  );
  data.push({
    id: i,
    month: `05-2024`,
    date: `25-05-2024`,
    invoiceNumber: `${1000 + i}`,
    amount: amount,
    collected: collected,
    remaining: amount - collected,
  });
}

let currentPage = 1;
let rowsPerPage = 20;

// Hàm load bảng
function loadTable() {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = data.slice(start, end);

  pageData.forEach((row) => {
    const tr = document.createElement("tr");
    tr.setAttribute("onclick", "redirectToDetailPage()");
    tr.innerHTML = `
                    <td class="fixed-column">${row.month}</td>
                    <td class="fixed-column-2">${row.date}</td>
                    <td>${row.invoiceNumber}</td>
                    <td>${formatNumber(row.amount)}</td>
                    <td>${formatNumber(row.collected)}</td>
                    <td>${formatNumber(row.remaining)}</td>
                `;
    tableBody.appendChild(tr);
  });

  updatePagination();
}

// Cập nhật phân trang
function updatePagination() {
  const pageCount = Math.ceil(data.length / rowsPerPage);
  const paginationDiv = document.getElementById("pagination");
  paginationDiv.innerHTML = "";

  for (let i = 1; i <= pageCount; i++) {
    const button = document.createElement("button");
    button.classList.add("btn", "btn-sm", "btn-primary");
    button.textContent = i;
    button.onclick = () => {
      currentPage = i;
      loadTable();
    };
    paginationDiv.appendChild(button);
  }
}

// Thay đổi số dòng trên mỗi trang
function changeRowsPerPage() {
  const select = document.getElementById("rowsPerPage");
  rowsPerPage = parseInt(select.value);
  currentPage = 1; // Reset lại trang hiện tại
  loadTable();
}

loadTable();

function searchFunction() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toUpperCase();
  const ul = document.getElementById("quotationList");
  const li = ul.getElementsByTagName("li");

  for (let i = 0; i < li.length; i++) {
    const txtValue0 = li[i].textContent || li[i].innerText;
    const txtValue3 = li[i].textContent || li[i].innerText;
    if (
      txtValue0.toUpperCase().indexOf(filter) > -1 ||
      txtValue3.toUpperCase().indexOf(filter) > -1
    ) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

function redirectToDetailPage(quotationId) {
  window.location.href = `details.html?id=${quotationId}`;
}

function formatNumber(number) {
  return number.toLocaleString('en-US');
}
