const data = [
    {id: 1, customer: "Đinh F10", specs: "F10", quantity: 450, unit: "Hộp", price: 13000, value: 5875000, vat: 587500, total: 6462720, weight: 219.15, debt: ""},
    {id: 2, customer: "Đinh F20", specs: "F20", quantity: 590, unit: "Hộp", price: 15456, value: 9119040, vat: 911904, total: 10030944, weight: 353.41, debt: ""}
];

for (let i = 3; i <= 10; i++) {
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
            <td>${row.quantity}</td>
            <td>${row.unit}</td>
            <td>${row.price}</td>
            <td>${row.value}</td>
            <td>${row.vat}</td>
            <td>${row.total}</td>
            <td>${row.weight}</td>
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