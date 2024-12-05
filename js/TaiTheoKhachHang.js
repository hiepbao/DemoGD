const data = [];
for (let i = 1; i <= 50; i++) {
  data.push({
    id: i,
    customer: "海派沙发 1 公司：\n CTY HAPPY FURNITURE - MIỀN TRUNG",
    manager: i % 2 === 0 ? "Tân An Bel" : "Lê Khác Hòa",
    recent: "20-08-2024",
    total:  Math.floor(Math.random() * 15000000) + 1000000,
    nw: (Math.random() * 50000).toFixed(2),
    gw: (Math.random() * 50000 + 500).toFixed(2),
    invoice: `BG240801-${i * 10}`,
    date: "23-08-2024",
    item: `Đinh F${i * 10}`,
    specs: `F${i * 10}`,
    quantity: Math.floor(Math.random() * i + 1),
    unit: "Hộp",
    price: Math.floor(Math.random() * 1000000),
    value: Math.floor(Math.random() * 1000000),
    vat: Math.floor(Math.random() * 1000000),
    weight: (Math.random() * 500).toFixed(2),
    debt: Math.random() < 0.5 ? "0" : "1",
  });
}


let currentPage = 1;
let rowsPerPage = 20;


// Hàm load bảng chung
function loadTableGeneric(data, tableBodyId) {
  const tableBody = document.getElementById(tableBodyId);
  tableBody.innerHTML = "";

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = data.slice(start, end);

  pageData.forEach((row) => {
    const tr = document.createElement("tr");
    

    // Tạo nội dung bảng chung cho cả hai loại bảng
    let rowContent = `
      <td class="fixed-column">${row.customer}</td>
    `;

    if (tableBodyId === "tableBody") {
      // Cột dành cho bảng đầu tiên (quotationTable)
      tr.setAttribute("onclick", "redirectToDetailPage()");
      rowContent += `
        <td class="fixed-column-2">${row.manager}</td>
        <td class="fixed-column-2">${formatNumber(row.total)}</td>
        <td class="fixed-column-2">${formatWeight(row.nw)}</td>
        <td class="fixed-column-2">${formatWeight(row.gw)}</td>
        <td class="fixed-column-2">${row.recent}</td>
      `;
    } else if (tableBodyId === "tableBodyTai") {
      // Cột dành cho bảng thứ hai (quotationTableTai)
      tr.setAttribute("onclick", "redirectToDetailPage2()");
      rowContent += `
        <td class="fixed-column-2">${row.date}</td>
        <td class="fixed-column-2">${row.invoice}</td>
        <td class="fixed-column-2">${row.item}</td>
        <td class="fixed-column-2">${row.specs}</td>
        <td class="fixed-column-2">${formatQuantity(row.quantity)}</td>
        <td class="fixed-column-2">${row.unit}</td>
        <td class="fixed-column-2">${formatNumber(row.price)}</td>
        <td class="fixed-column-2">${formatNumber(row.value)}</td>
        <td class="fixed-column-2">${formatNumber(row.vat)}</td>
        <td class="fixed-column-2">${formatNumber(row.total)}</td>
        <td class="fixed-column-2">${formatWeight(row.weight)}</td>
        <td class="fixed-column-2">${row.debt === "1" ? "✔" : ""}</td>
      `;
      
    }
    
    tr.innerHTML = rowContent;
    tableBody.appendChild(tr);
  });

  updatePagination(data.length);
}

// Hàm gọi loadTableGeneric cho các bảng khác nhau
function loadTable() {
  loadTableGeneric(data, "tableBody");
}

function loadTableTai() {
  loadTableGeneric(data, "tableBodyTai");
}



// Hàm phân trang cho từng bảng
function updatePagination(dataLength) {
  const pageCount = Math.ceil(dataLength / rowsPerPage);
  const pageCount2 = Math.ceil(dataLength / rowsPerPage);
  const paginationDiv = document.getElementById("pagination");
  const paginationDiv2 = document.getElementById("pagination2");
  paginationDiv.innerHTML = "";
  paginationDiv2.innerHTML = "";

  for (let i = 1; i <= pageCount; i++) {
    const button = document.createElement("button");
    button.classList.add("btn", "btn-sm", "btn-primary");
    button.textContent = i;
    if (i === currentPage) {
      button.classList.add("active");
  }
    button.onclick = () => {
      currentPage = i;
      loadTable();   // Cập nhật bảng đầu tiên
    };
    paginationDiv.appendChild(button);
  }
  for (let i = 1; i <= pageCount2; i++) {
    const button2 = document.createElement("button");
    button2.classList.add("btn", "btn-sm", "btn-primary");
    button2.textContent = i;
    button2.onclick = () => {
      currentPage = i;  // Cập nhật bảng đầu tiên
      loadTableTai(); // Cập nhật bảng thứ hai
    };
    paginationDiv2.appendChild(button2);
  }
}

// Cập nhật phân trang sau khi thay đổi số dòng trên mỗi trang
function changeRowsPerPage() {
  const select = document.getElementById("rowsPerPage");
  rowsPerPage = parseInt(select.value);
  currentPage = 1; // Reset lại trang hiện tại
  loadTable();     // Cập nhật bảng đầu tiên
}
// Cập nhật phân trang sau khi thay đổi số dòng trên mỗi trang
function changeRowsPerPage2() {
  const select = document.getElementById("rowsPerPage2");
  rowsPerPage = parseInt(select.value);
  currentPage = 1; // Reset lại trang hiện tại
  loadTableTai();  // Cập nhật bảng thứ hai
}


function searchFunction() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toUpperCase();
  const table = document.getElementById("quotationTable");
  const tr = table.getElementsByTagName("tr");

  for (let i = 1; i < tr.length; i++) {
    const td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      const txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function redirectToDetailPage(quotationId) {
  window.location.href = `ChiTietTai.html`;
}
function redirectToDetailPage2(quotationId) {
  window.location.href = `../pages/ChiTietDon.html`;
}

function formatWeight(weight) {
  return weight.toLocaleString() + '0';
}

function formatNumber(number) {
  return number.toLocaleString('en-US');
}

function formatQuantity(quantity) {
  return quantity.toFixed(2);
}

loadTable();
loadTableTai();

// Lấy ngày hiện tại
const currentDate = new Date();

// Thiết lập "Tới ngày" là ngày hiện tại
const endDateInput = document.getElementById("endDate");
endDateInput.value = currentDate.toISOString().split("T")[0]; // Định dạng: yyyy-mm-dd

// Thiết lập "Từ ngày" là ngày đầu tháng
const startDateInput = document.getElementById("startDate");
startDateInput.value =
  currentDate.toISOString().split("T")[0].slice(0, 8) + "01"; // Đặt ngày là 01 của tháng hiện tại
