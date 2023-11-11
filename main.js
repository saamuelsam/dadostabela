function mudarCor(rowId) {
  var row = document.getElementById(rowId);
  row.classList.toggle('clicked');

  // Adicione o código para mudar a cor da linha aqui
  var isClicked = row.classList.contains('clicked');
  if (isClicked) {
    row.style.backgroundColor = '#f6ff00'; // Altere para a cor desejada
  } else {
    // Defina a cor de fundo padrão quando não clicado
    row.style.backgroundColor = '';
  }

  // Verifica se a linha está clicada e salva o estado no armazenamento local
  localStorage.setItem(rowId, isClicked.toString()); // Convertido para string
}

// Restaurar o estado das linhas da tabela ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
  const tableBody = document.querySelector('tbody');
  const rows = tableBody.getElementsByTagName('tr');
  const rowsCount = rows.length;

  for (let i = 1; i <= rowsCount; i++) {
    var rowId = 'row' + i;
    var isClicked = localStorage.getItem(rowId) === 'true';
    var row = document.getElementById(rowId);

    if (isClicked) {
      row.classList.add('clicked');
      row.style.backgroundColor = '#f6ff00'; // Altere para a cor desejada
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const tableBody = document.querySelector('tbody');
  const rows = tableBody.getElementsByTagName('tr');
  const rowsCount = rows.length;
  const rowsPerPage = 5; // Altere conforme necessário
  const pageCount = Math.ceil(rowsCount / rowsPerPage);

  function showPage(page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    for (let i = 0; i < rowsCount; i++) {
      if (i >= start && i < end) {
        rows[i].style.display = 'table-row';
      } else {
        rows[i].style.display = 'none';
      }
    }
  }

  function updatePagination(currentPage) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= pageCount; i++) {
      const li = document.createElement('li');
      li.textContent = i;

      if (i === currentPage) {
        li.classList.add('active');
      }

      li.addEventListener('click', function () {
        showPage(i);
        updatePagination(i);
      });

      pagination.appendChild(li);
    }

    // Adiciona seta para a próxima página se houver mais páginas
    if (currentPage < pageCount) {
      const li = document.createElement('li');
      li.innerHTML = '&raquo;';

      li.addEventListener('click', function () {
        const nextPage = currentPage + 1;
        showPage(nextPage);
        updatePagination(nextPage);
      });

      pagination.appendChild(li);
    }
  }

  // Exibe a primeira página por padrão
  showPage(1);
  updatePagination(1);
});
