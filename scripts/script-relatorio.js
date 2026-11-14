const CHAVE_ALUNOS_RELATORIO = "alunos"; //Chave do aluno para o relatório
const CHAVE_RETIRADAS_RELATORIO = "retiradas"; //Chave das retiradas que foram realizadas

function carregarDados(chave) { // Carrega os dados salvos
    try {
        const dados = JSON.parse(localStorage.getItem(chave));

        if (Array.isArray(dados)) {
            return dados; //Se existir carrega
        }
    }
    catch (erro) { //Senão mostra erro
        console.error("Erro ao carregar:", chave, erro);
    }

    return []; //Retorna a lista
}

function obterDataAtual() { //Verifica o dia, mês e o ano e o turno atual
    const agora = new Date();

    const ano = agora.getFullYear(); //Pega o ano
    const mes = String(agora.getMonth() + 1).padStart(2, "0"); //Pega o mês
    const dia = String(agora.getDate()).padStart(2, "0"); //Pega o dia

    return `${ano}-${mes}-${dia}`; //Retorna o dia, mês e ano
}

function obterTurnoAtual() { //Pega a hora e o turno atual
    const hora = new Date().getHours();

    if (hora >= 6 && hora < 12) {
        return "manha";
    }
    else if (hora >= 12 && hora < 18) {
        return "tarde";
    }
    else {
        return "noite";
    }
}

function atualizarRelatorio() { //Atualiza o relátorio

    const alunos = carregarDados(CHAVE_ALUNOS_RELATORIO); // Busca alunos e retiradas
    const retiradas = carregarDados(CHAVE_RETIRADAS_RELATORIO);

    const hoje = obterDataAtual(); //Identifica que dia é hoje

    const turnoAtual = obterTurnoAtual(); //Identificar o turno atual

    const retiradasHoje = retiradas.filter(retirada => {
        return retirada.data === hoje; //Filtra somente as retiradas de hoje
    });

    const totalManha = retiradasHoje.filter(retirada => {
        return retirada.turno === "manha"; //Conta quantos retiraram de manhã
    }).length;

    const totalTarde = retiradasHoje.filter(retirada => {
        return retirada.turno === "tarde"; //Conta quantos retiraram de tarde
    }).length;

    const totalNoite = retiradasHoje.filter(retirada => {
        return retirada.turno === "noite"; //Conta quantos retiraram de noite
    }).length;

    const totalTurnoAtual = retiradasHoje.filter(retirada => {
        return retirada.turno === turnoAtual; //Identifica quantos alunos do total retiraram
    }).length;

    document.getElementById("retiradasHoje").textContent =
        retiradasHoje.length; //Mostra quantos alunos ja retiraram

    document.getElementById("alunosMatriculados").textContent =
        alunos.length; //Mostra quantos alunos estão matrículados

    document.getElementById("retiradasTurnoAtual").textContent =
        totalTurnoAtual; //Mostra quantos retiraram no turno atual

    document.getElementById("retiradasManha").textContent =
        totalManha; //Mostra quantos retiraram de manhã

    document.getElementById("retiradasTarde").textContent =
        totalTarde; //Mostra quantos retiraram de tarde

    document.getElementById("retiradasNoite").textContent =
        totalNoite; //Mostra quantos retiraram de noite

    const nomesTurnos = { //Mostra qual o turno atual
        manha: "Manhã",
        tarde: "Tarde",
        noite: "Noite"
    };

    document.getElementById("nomeTurno").textContent =
        `(${nomesTurnos[turnoAtual]})`;

    const dataFormatada = new Date(hoje + "T12:00:00") //Coloca no horário de Brasilia
        .toLocaleDateString("pt-BR");

    document.getElementById("dataRelatorio").textContent =
        dataFormatada;
}

//Executa quando liga a página
atualizarRelatorio();