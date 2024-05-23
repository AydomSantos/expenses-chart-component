fetch('data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(res => {
    const statsList = document.getElementById("statsList");

    res.forEach(element => {
      // Criar o contêiner do dia
      const dayFigure = document.createElement("figure");
      dayFigure.classList.add("main__day");

      // Criar a barra
      const bar = document.createElement("div");
      bar.classList.add("bar");
      bar.setAttribute("data-amount", "$" + element.amount);

      // Calcular a altura da barra (ajuste conforme necessário)
      const barHeight = element.amount * 2;
      bar.style.height = barHeight + "px";
      bar.style.transitionDuration = (barHeight / 50) + "s";

      if (barHeight > 100) {
        bar.setAttribute("id", "max");
      }

      // Adicionar evento de clique à barra
      bar.addEventListener("mouseover", () => {
        // Criar o balãozinho
        const balao = document.getSelection(".bar")
        balao.innerText = "$" + element.amount;
      });

      // Adicionar a barra ao contêiner do dia
      dayFigure.appendChild(bar);

      // Criar o rótulo do dia
      const figCaption = document.createElement("figcaption");
      figCaption.innerText = element.day;
      dayFigure.appendChild(figCaption);

      // Adicionar o contêiner do dia à lista de estatísticas
      statsList.appendChild(dayFigure);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
