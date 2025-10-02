import { useState, useRef } from 'react';
import './App.css';

// Função auxiliar fora do componente
function gerarNumeroSecreto() {
  return Math.floor(Math.random() * 10) + 1;
}

function JogoAdivinhacao() {
  const [numeroSecreto, setNumeroSecreto] = useState(gerarNumeroSecreto());
  console.log (numeroSecreto)
  const [tentativas, setTentativas] = useState(0);
  const [palpite, setPalpite] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [imagem, setImagem] = useState('');
  const inputRef = useRef(null); // Para dar foco no input

  function jogar(e) {
    e.preventDefault();
    const palpiteNum = parseInt(palpite);

    if (isNaN(palpiteNum)) {
      setMensagem("Digite um número válido.");
      return;
    }

    const novasTentativas = tentativas + 1;
    setTentativas(novasTentativas);

    if (palpiteNum === numeroSecreto) {
      setMensagem(`🎉 Boaaaa, você acertou com ${novasTentativas} tentativas! Número reiniciado.`);
      setImagem("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6JtDWh77ehXOJa9MS3vGukjkhW756NUkLXA&s");
      setNumeroSecreto(gerarNumeroSecreto()); // Reinicia o número
      setTentativas(0);
    } else {
      setMensagem("Errou... tente outro número!");
      setImagem("https://i1.sndcdn.com/artworks-000133255147-3vc43e-t240x240.jpg");
    }

    setPalpite('');
    inputRef.current.focus();
  }

  return (
    <div className='geral'>
      <h1>Jogo de Adivinhação</h1>
      <form onSubmit={jogar}>
        <input
          type="number"
          min="1"
          max="10"
          value={palpite}
          onChange={(e) => setPalpite(e.target.value)}
          ref={inputRef}
          placeholder="Digite um número entre 1 e 10:"
        />
        <button type="submit">Tentar</button>
      </form>
      <p>{mensagem}</p>
      {imagem && <img src={imagem} alt="Resposta" style={{ width: '150px', marginTop: '10px' }} />}
    </div>
  );
}

export default JogoAdivinhacao;