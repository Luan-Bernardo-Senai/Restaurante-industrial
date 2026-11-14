// Lista de alunos do sistema
const CHAVE_ALUNOS = "alunos";

let alunos = JSON.parse(localStorage.getItem(CHAVE_ALUNOS)); //Transforma a lista de alunos em um texto que o Javascript pode utilizar

// Se ainda não existem alunos salvos, cadastra os iniciais
if (!Array.isArray(alunos)) {

    alunos = [
        { matricula: "1234a", nome: "Luan", turno: "manha" },
        { matricula: "4321", nome: "Maria", turno: "manha" },
        { matricula: "abcd", nome: "Rafael", turno: "manha" },
        { matricula: "1025", nome: "João", turno: "tarde" },
        { matricula: "2048", nome: "Mateus", turno: "tarde" },
        { matricula: "1a2b", nome: "Leandro", turno: "tarde" },
        { matricula: "3090", nome: "Pedro", turno: "noite" },
        { matricula: "1098", nome: "Rodrigo", turno: "noite" }
    ];

    localStorage.setItem(CHAVE_ALUNOS, JSON.stringify(alunos)); //Armazena os alunos no navegador
}