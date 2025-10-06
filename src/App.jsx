import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const gerarNumeroSecreto = () => Math.floor(Math.random() * 10) + 1;

  const [numeroSecreto, setNumeroSecreto] = useState(gerarNumeroSecreto);
  console.log[numeroSecreto];
  const [tentativas, setTentativas] = useState(0);
  const [palpite, setPalpite] = useState("");
  const [resposta, setResposta] = useState("");
  const [mensagem2, setMensagem2] = useState("");
  const [imagem, setImagem] = useState("");

  useEffect(() => {
    document.getElementById("input-palpite")?.focus();
  }, [resposta]);
  
  const verificarPalpite = () => {
    const numeroPalpite = parseInt(palpite);
    
    if (isNaN(numeroPalpite)) {
      setResposta("Por favor, digite um número válido.");
      setImagem("");
      setMensagem2("");
      return;
    }

    const novaTentativa = tentativas + 1;
    setTentativas(novaTentativa);

    if (numeroPalpite === numeroSecreto) {
      setResposta(`Boaaaa, você acertou com ${novaTentativa} tentativas`);
      setImagem("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6JtDWh77ehXOJa9MS3vGukjkhW756NUkLXA&s");
      setMensagem2("");
    } else {
      const diferenca = Math.abs(numeroPalpite - numeroSecreto);
      console.log("Diferença:", diferenca);

      if (numeroPalpite < numeroSecreto) {
        setResposta("O número é maior 👆");
        setImagem("https://thumbs.dreamstime.com/b/seta-amarela-apontando-para-cima-isolada-no-clipe-branco-de-fundo-%C3%ADcone-s%C3%ADmbolo-indica-amarelo-arte-dire%C3%A7%C3%A3o-ilustra%C3%A7%C3%B5es-d-192401889.jpg");
      } else {
        setResposta("O número secreto é menor 👇");
        setImagem("https://cdn-icons-png.flaticon.com/512/892/892494.png");
      }

      if (diferenca === 1) {
        setMensagem2("🔥 Tá quase!!");
      } else if (diferenca === 2) {
        setMensagem2("🥶 Não está legal");
      } else {
        setMensagem2("");
      }
    
     setPalpite("");
    }
  };

  const reiniciarJogo = () => {
    setNumeroSecreto(gerarNumeroSecreto());
    setTentativas(0);
    setPalpite("");
    setResposta("");
    setImagem("");
    setMensagem2("");
  };

  return (
    <div className='geral'>
      <h1>Jogo de Adivinhação</h1>

      <input
        id="input-palpite"
        type="number"
        value={palpite}
        onChange={(e) => setPalpite(e.target.value)}
        placeholder="Digite seu palpite"
      />
      <button onClick={verificarPalpite}>Enviar</button>
      <button onClick={reiniciarJogo}>Reiniciar</button>

      <p>{resposta}</p>
      {mensagem2 && <p>{mensagem2}</p>}

      {imagem && <img src={imagem} alt="Feedback" style={{ maxWidth: '200px', marginTop: '10px' }} />}
    </div>
  );
};

export default App;