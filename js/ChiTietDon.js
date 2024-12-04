const data = [];

for (let i = 1; i <= 10; i++) {
    data.push({
        id: i,
        customer: `Đinh F${i * 10}`,
        specs: `F${i * 10}`,
        quantity: Math.floor(Math.random() * 1000) + 100,
        unit: "Hộp",
        price: Math.floor(Math.random() * 20000) + 10000,
        value: Math.floor(Math.random() * 10000000) + 1000000,
        vat: Math.floor(Math.random() * 1000000),
        total: Math.floor(Math.random() * 15000000) + 1000000,
        weight: (Math.random() * 500).toFixed(2),
        debt: ""
    });
}
let currentPage = 1;
let rowsPerPage = 10;

// Hàm load bảng
function loadTable() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    // const start = (currentPage - 1) * rowsPerPage;
    // const end = start + rowsPerPage;
    const pageData = data;

    pageData.forEach(row => {
        const tr = document.createElement("tr");
        tr.setAttribute("onclick", "redirectToDetailPage()");
        tr.innerHTML = `
            <td class="fixed-column">${row.customer}</td>
            <td class="fixed-column-2">${row.specs}</td>
            <td>${formatQuantity(row.quantity)}</td>
            <td>${row.unit}</td>
            <td>${formatNumber(row.price)}</td>
            <td>${formatNumber(row.value)}</td>
            <td>${formatNumber(row.vat)}</td>
            <td>${formatNumber(row.total)}</td>
            <td>${formatWeight(row.weight)}</td>
            <td>${row.debt}</td>
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

function formatQuantity(quantity) {
    return quantity.toFixed(2);
}

function formatWeight(weight) {
    return weight.toLocaleString() + '0';
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function formatNumber(number) {
    return number.toLocaleString('en-US');
}