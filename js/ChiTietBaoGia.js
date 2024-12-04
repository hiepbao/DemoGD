const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    id: i,
    name: `Đinh F${i * 5}`,
    specs: `F${i * 5}`,
    unit: "Hộp",
    price: Math.floor(Math.random() * 20000) + 10000,
    oldPrice: Math.floor(Math.random() * 20000) + 10000,
    note: "",
  });
}

let currentPage = 1;
let rowsPerPage = 10;

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
                    <td class="fixed-column"> ${row.id}</td>
                    <td class="fixed-column-2">${row.name}</td>
                    <td>${row.specs}</td>
                    <td>${row.unit}</td>
                    <td>${row.price}</td>
                    <td>${row.oldPrice}</td>
                    <td>${row.note}</td>
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
