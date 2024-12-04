const data = [];

for (let i = 1; i <= 50; i++) {
    data.push({
        id: i,
        customer: `CTY 0${i}`,
        invoice: `BG240801-${i * 10}`,
        date: "23-08-2024",
        item: `Đinh F${i * 10}`,
        specs: `F${i * 10}`,
        quantity: Math.floor(Math.random()*i + 1),
        unit: "Hộp",
        price: Math.floor(Math.random() * 1000000),
        value: Math.floor(Math.random() * 1000000),
        vat: Math.floor(Math.random() * 1000000),
        total: Math.floor(Math.random() * 15000000) + 1000000,
        weight: (Math.random() * 500).toFixed(2),
        debt: ""
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

    pageData.forEach(row => {
        const tr = document.createElement("tr");
        tr.setAttribute("onclick", "redirectToDetailPage()");
        tr.innerHTML = `
            <td class="fixed-column">${row.customer}</td>
            <td>${row.invoice}</td>
            <td>${row.date}</td>
            <td>${row.item}</td>
            <td>${row.specs}</td>
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

// Hàm tìm kiếm
function searchFunction() {
    const input = document.getElementById("searchInput").value.toUpperCase();
    const table = document.getElementById("quotationTable");
    const tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        const customerName = tr[i].getElementsByTagName("td")[0];
        const itemName = tr[i].getElementsByTagName("td")[3];
        if (customerName && itemName) {
            const txtValue0 = customerName.textContent || customerName.innerText;
            const txtValue3 = itemName.textContent || itemName.innerText;
            if (txtValue0.toUpperCase().indexOf(input) > -1 || txtValue3.toUpperCase().indexOf(input) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function redirectToDetailPage(quotationId) {
    window.location.href = `ChiTietdon.html`;
}
