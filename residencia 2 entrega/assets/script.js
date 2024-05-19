const musicas = [
    {
      titulo: "ATTACK ON BANGTAN",
      artista: "BTS",
      arquivo: "attack-on-bangtan-youtubemp3free.org.mp3",
      imagem: "capa 1.jpg"
    },
    {
      titulo: "TOMORROW",
      artista: "BTS",
      arquivo: "tomorrow-youtubemp3free.org.mp3",
      imagem: "capa 2 no.jpg"
    },
    {
      titulo: "MIC-DROP",
      artista: "BTS",
      arquivo: "mic-drop-steve-aoki-remix-full-length-edition-youtubemp3free.org.mp3",
      imagem: "capa 3.jpg"
    }
  ];
  
  let indiceAtual = 0;
  
  const audio = new Audio(musicas[indiceAtual].arquivo);
  const progressBar = document.getElementById("progressBar");
  const buttonPlay = document.getElementById('play');
  const buttonPause = document.getElementById('pause');
  const buttonVoltar = document.getElementById('voltar');
  const buttonAvancar = document.getElementById('avancar');
  const tempoAtual = document.getElementById("tempoAtual");
  const tempoTotal = document.getElementById("tempoTotal");
  const tituloMusica = document.getElementById("tituloMusica");
  const artistaMusica = document.getElementById("artistaMusica");
  const capaMusica = document.getElementById("capaMusica");
  
  let interval;
  
  function formatarTempo(segundos) {
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    return `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
  }
  
  function updateMusicTime() {
    const progresso = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progresso;
    tempoAtual.textContent = formatarTempo(audio.currentTime);
  }
  
  audio.addEventListener('loadedmetadata', function () {
    tempoTotal.textContent = formatarTempo(audio.duration);
  });
  
  audio.addEventListener('timeupdate', updateMusicTime);
  
  function play() {
    buttonPlay.classList.add('hide');
    buttonPause.classList.remove('hide');
    audio.play();
    interval = setInterval(updateMusicTime, 1000);
  }
  
  function pause() {
    buttonPlay.classList.remove('hide');
    buttonPause.classList.add('hide');
    audio.pause();
    clearInterval(interval);
  }
  
  function changeMusic(index) {
    if (index >= 0 && index < musicas.length) {
      indiceAtual = index;
      audio.src = musicas[indiceAtual].arquivo;
      tituloMusica.textContent = musicas[indiceAtual].titulo;
      artistaMusica.textContent = musicas[indiceAtual].artista;
      capaMusica.src = musicas[indiceAtual].imagem;
      audio.load();
      play();
    }
  }
  
  buttonPlay.addEventListener('click', play);
  buttonPause.addEventListener('click', pause);
  
  buttonVoltar.addEventListener('click', () => {
    if (indiceAtual > 0) {
      changeMusic(indiceAtual - 1);
    } else {
      changeMusic(musicas.length - 1); // Volta para a última musica quando chegar na ultima
    }
  });
  
  buttonAvancar.addEventListener('click', () => {
    if (indiceAtual < musicas.length - 1) {
      changeMusic(indiceAtual + 1);
    } else {
      changeMusic(0); // Vai para a primeira música quando for a ultima
    }
  });
  
  progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
    updateMusicTime();
  });
  
  // Apertando o player para dar inicio a musica
  changeMusic(indiceAtual);