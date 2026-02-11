// CHANGE THIS URL after you upload services.xlsx
const EXCEL_URL = "https://raw.githubusercontent.com/YOUR_USERNAME/dental-clinic-site/main/services.xlsx";

async function loadExcel() {
  try {
    const response = await fetch(EXCEL_URL);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const table = document.getElementById('excel-table');
    table.innerHTML = '';

    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Header row
    const headerRow = document.createElement('tr');
    jsonData[0].forEach(header => {
      const th = document.createElement('th');
      th.textContent = header || '';
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Data rows
    for (let i = 1; i < jsonData.length; i++) {
      const row = document.createElement('tr');
      jsonData[i].forEach(cell => {
        const td = document.createElement('td');
        td.textContent = cell || '';
        row.appendChild(td);
      });
      tbody.appendChild(row);
    }

    table.appendChild(thead);
    table.appendChild(tbody);
  } catch (error) {
    document.getElementById('excel-table').innerHTML = 
      '<p style="color: #ef4444; text-align: center; padding: 20px;">⚠️ Upload services.xlsx file first! Or check console (F12).</p>';
  }
}

window.addEventListener('load', loadExcel);
