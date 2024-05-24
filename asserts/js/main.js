// Faz uma requisição para o arquivo data.json
fetch('data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('A resposta da rede não foi bem-sucedida');
    }
    return response.json();
  })
  .then(res => {
    // Obtém a lista de estatísticas do elemento com o ID "statsList"
    const statsList = document.getElementById("statsList");

    // Itera sobre cada elemento da resposta
    res.forEach(element => {
      // Cria um contêiner para o dia
      const dayFigure = document.createElement("figure");
      dayFigure.classList.add("main__day");

      // Cria uma barra de gastos
      const bar = document.createElement("div");
      bar.classList.add("bar");
      bar.setAttribute("data-amount", "$" + element.amount);

      // Calcula a altura da barra (ajuste conforme necessário)
      const barHeight = element.amount * 2;
      bar.style.height = barHeight + "px";
      bar.style.transitionDuration = (barHeight / 50) + "s";

      // Define um ID para a barra se a altura for maior que 100
      if (barHeight > 100) {
        bar.setAttribute("id", "max");
      }

      // Adiciona um evento de mouseover à barra
      bar.addEventListener("mouseover", () => {
        // Exibe o valor do gasto em um balãozinho
        const balao = document.getSelection(".bar");
        balao.innerText = "$" + element.amount;
      });

      // Adiciona a barra ao contêiner do dia
      dayFigure.appendChild(bar);

      // Cria um rótulo para o dia
      const figCaption = document.createElement("figcaption");
      figCaption.innerText = element.day;
      dayFigure.appendChild(figCaption);

      // Adiciona o contêiner do dia à lista de estatísticas
      statsList.appendChild(dayFigure);
    });
  })
  .catch(error => {
    console.error('Erro ao buscar os dados:', error);
  });
