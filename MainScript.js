let mouseMoveTimeout;
let isMouseIdle = false;
let musicaAgora = false;

function onMouseMove() {
    if (isMouseIdle) {
        onActivityResumed();
        isMouseIdle = false;
    }
    clearTimeout(mouseMoveTimeout);
    mouseMoveTimeout = setTimeout(onMouseIdle, 10000); // 60000ms = 1 minuto
}

function onMouseIdle() {
    isMouseIdle = true;
    console.log("Mouse está parado por 10 segundos.");
    // Chame a função desejada aqui quando o mouse estiver parado por 1 minuto
    onMouseStop();
}

function onActivityResumed() {
    console.log("Mouse voltou a se mover.");
    // Chame a função desejada aqui quando o mouse voltar a se mover
    if (bar.style.display === 'none') {
        NAFK();
    }
}

function onMouseStop() {
    console.log("Executando ação porque o mouse ficou parado por 1 minuto.");
    // Implementação da ação desejada
  if (bar.style.display === 'none') {
    AFK();
  }
}

var originalVolume;
var isFading = false;

function fadeOutAndPause() {
  var audio = document.getElementById('audio');
  if (!isFading) {
    originalVolume = audio.volume;
    var fadeDuration = 180; // 0 segundos
    var fadeStep = 10; // Intervalo de tempo em milissegundos
    var volumeStep = audio.volume / (fadeDuration / fadeStep);
    isFading = true;

    var fadeAudio = setInterval(function() {
      if (audio.volume > volumeStep) {
        audio.volume -= volumeStep;
      } else {
        audio.volume = 0;
        audio.pause();
        clearInterval(fadeAudio);
        isFading = false;
        audio.volume = originalVolume; // Restaurar o volume após pausar
      }
    }, fadeStep);
  }
}

document.getElementById('audio').addEventListener('play', function() {
  if (!isFading) {
    var audio = document.getElementById('audio');
    audio.volume = originalVolume;
  }
});

function AFK() {

    const bigscreen = document.getElementById('big');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const progressb = document.getElementById('progress-container');
    const music = document.getElementById('mslogo');
    const volBar = document.getElementById('vol');
    const mute = document.getElementById('muteButton');
    const mus = document.getElementById('music');
    const time = document.getElementById('hora');
    const perfilElements = document.getElementsByClassName('perfil');
    Array.from(perfilElements).forEach(perfil => {
        perfil.style.display = 'none';
    });

    volBar.style.display = 'none';
    mute.style.display = 'none';
    playPauseBtn.style.display = 'none';
    bigscreen.style.display = 'none';
    music.style.width = '120px';
    progressb.style.width = '1200px';
    mus.style.left = '80px';
    time.style.display = 'block';
    perfil.style.display = 'none';
    ativarEstilo();

}

function handleFileUpload(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
      var imgData = e.target.result;
      localStorage.setItem('fotoPerfil', imgData);
      exibirFotosPerfil();
    };

    reader.readAsDataURL(file);
  }

  function exibirFotosPerfil() {
    var imgData = localStorage.getItem('fotoPerfil');
    if (imgData) {
      var imgElements = document.querySelectorAll('.perfil');
      imgElements.forEach(function(imgElement) {
        imgElement.src = imgData;
        imgElement.style.display = 'block';
      });
    }
  }

  // Exibe as fotos de perfil ao carregar a página
  window.onload = exibirFotosPerfil;

function NAFK() {
    const cartao = document.getElementById('sidebar');
    const cartao2 = document.getElementById('cardbtn');
    const bar = document.getElementById('bar');
    const bar2 = document.getElementById('down');
    const searchbar = document.getElementById('searchBar');
    const bigscreen = document.getElementById('big');
    const musicas = document.getElementById('musicas');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const button = document.getElementById('button');
    const progressb = document.getElementById('progress-container');
    const le = document.getElementById('lyrics');
    const control = document.getElementById('control');
    const content = document.getElementById('content');
    const music = document.getElementById('mslogo');
    const volBar = document.getElementById('vol');
    const mute = document.getElementById('muteButton');
    const mus = document.getElementById('music');
    const time = document.getElementById('hora');
    const perfil = document.getElementById('perfil');

    volBar.style.display = 'block';
    mute.style.display = 'block';
    playPauseBtn.style.display = 'block';
    bigscreen.style.display = 'block';
    music.style.width = '200px';
    progressb.style.width = '1000px';
    mus.style.left = '240px';
    time.style.display = 'none';
    perfil.style.right = '0px';
    desativarEstilo();

}

document.addEventListener('mousemove', onMouseMove); 


// Função para ajustar o tempo da música ao clicar na barra de progresso
document.querySelector('.progress-bar').addEventListener('click', function(event) {
            const progressBar = this;
            const rect = progressBar.getBoundingClientRect(); // Pega as dimensões da barra
            const offsetX = event.clientX - rect.left; // Posição do clique na barra
            const percent = offsetX / progressBar.offsetWidth; // Percentual do clique na barra
            const newTime = percent * audio.duration; // Calcula o novo tempo da música
            audio.currentTime = newTime; // Atualiza o tempo da música
});

document.addEventListener('contextmenu', function(event) {
    event.preventDefault();

    // Verifica se o menu personalizado já está presente e o remove
    let existingMenu = document.getElementById('customMenu');
    if (existingMenu) {
        document.body.removeChild(existingMenu);
    }

    // Cria e mostra sua interface personalizada aqui
    var customMenu = document.createElement('div');
    customMenu.id = 'customMenu';
    customMenu.innerHTML = '<h3>Opções</h3>';
    document.body.appendChild(customMenu);

    // Calcular a posição do menu para não ultrapassar os limites da tela
    const menuWidth = 200;  // Defina a largura do menu personalizado
    const menuHeight = 100; // Defina a altura do menu personalizado
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let posX = event.clientX;
    let posY = event.clientY;

    if (posX + menuWidth > screenWidth) {
        posX = screenWidth - menuWidth;
    }
    if (posY + menuHeight > screenHeight) {
        posY = screenHeight - menuHeight;
    }

    customMenu.style.position = 'absolute';
    customMenu.style.top = posY + 'px';
    customMenu.style.left = posX + 'px';

    // Elementos específicos para monitorar
    var elemento1 = document.getElementById('mslogo');
    var elemento2 = document.getElementById('muteButton');

    // Verifica se o evento ocorreu em um dos elementos específicos
    if (elemento1.contains(event.target)) {
        console.log("Menu chamado no elemento 1");
        customMenu.innerHTML += '<button style="background: none; border: none; color: #8c00ff;">Adicionar Comentário</button><br><button style="background: none; border: none; color: #8c00ff;" onclick="big();">Entrar/Sair da Tela Cheia</button>';
    } else if (elemento2.contains(event.target)) {
        console.log("Menu chamado no elemento 2");
        customMenu.innerHTML += "<button style='background: none; border: none; color: #8c00ff;' onclick='muteHide();'>Ativar Mudo</button><br>";
    } else {
        console.log("Menu chamado fora dos elementos especificados");
        customMenu.innerHTML += "<button style='background: none; border: none; color: #8c00ff;' id='big2' onclick='big();'>Entrar/Sair da Tela Cheia</button><br>";
    }

    // Adiciona um ouvinte de evento para esconder a interface personalizada ao clicar fora dela
    document.addEventListener('click', function(event) {
        if (!customMenu.contains(event.target)) {
            document.body.removeChild(customMenu);
        }
    });
});


function muteHide() {

    const audio = document.getElementById('audio');
    const volumeControl = document.getElementById('vol');
    const muteButton = document.getElementById('muteButton');

    audio.volume = '0';
    volumeControl.value = audio.volume;
    muteButton.style.display = 'none';

}


document.addEventListener('DOMContentLoaded', (event) => {
    const audio = document.getElementById('audio');
    const volumeControl = document.getElementById('vol');
    const muteButton = document.getElementById('muteButton');
  
    volumeControl.addEventListener('input', function () {
      audio.volume = this.value;
      if (audio.volume > 0) {
        audio.muted = false;
        muteButton.style.display = 'block';
      } else {
        audio.muted = true;
        muteButton.style.display = 'none';
      }
    });
  
    muteButton.addEventListener('click', function () {
      if (audio.muted) {
        audio.muted = false;
        audio.volume = volumeControl.value > 0 ? volumeControl.value : 0.5; // Retorna ao volume anterior ou padrão
        volumeControl.value = audio.volume;
        muteButton.style.display = 'block';
      } else {
        audio.muted = true;
        volumeControl.value = 0;
        muteButton.style.display = 'none';
      }
    });
  });

  function HideSearch() {
    const pesquisa = document.getElementById('search');
    const btn = document.getElementById('hidebtn');

    if (getComputedStyle(pesquisa).display == 'block') {
        btn.textContent = 'Exibir Barra De Pesquisa';
        pesquisa.style.display = 'none';
    } else {
        pesquisa.style.display = 'block';
        btn.textContent = 'Ocultar Barra De Pesquisa';
    }
}





   // Função para verificar se o vídeo está disponível
function checkVideo() {
    var video = document.getElementById('musicvideo');
    var image = document.getElementById('musiclogo');
    var container = document.getElementById('container');

    if (video.querySelector('source').getAttribute('src')) {
        image.style.display = 'none'; // Esconde a imagem
        video.style.display = 'block'; // Mostra o vídeo
        container.className = 'container video-container'; // Ajusta o tamanho do container para vídeo
    } else {
        video.style.display = 'none'; // Esconde o vídeo
        image.style.display = 'block'; // Mostra a imagem
        container.className = 'container image-container'; // Ajusta o tamanho do container para imagem
    }
}
checkVideo();

    // Referências aos elementos
var audio = document.getElementById('audio');
var video = document.getElementById('musicvideo');
var playPauseBtn = document.getElementById('playPauseBtn');
var loopBtn = document.getElementById('loopBtn');

    // Controle de Play/Pause para o áudio e o vídeo
    playPauseBtn.addEventListener('click', function() {
controlarMusica();
    });

    // Função para ativar/desativar o loop
    loopBtn.addEventListener('click', function() {
        if (audio.loop) {
            audio.loop = false;
            video.loop = false;
            isShuffle = true;
            shuffleBtn.style.backgroundColor = '#8c00ff';
        } else {
            audio.loop = true;
            video.loop = true;
            isShuffle = false;
            shuffleBtn.style.backgroundColor = '#520096';
        }
    });

    // Sincronizando o vídeo com o estado do áudio
    audio.addEventListener('pause', function() {
        video.pause();
    });

    audio.addEventListener('play', function() {
        video.play();
    });

    // Controle da barra de progresso
    var progress = document.getElementById('progress');
    var currentTimeEl = document.getElementById('currentTime');
    var totalTimeEl = document.getElementById('totalTime');

    function formatTime(time) {
        var minutes = Math.floor(time / 60);
        var seconds = Math.floor(time % 60);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return minutes + ':' + seconds;
    }

    audio.addEventListener('loadedmetadata', function() {
        totalTimeEl.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', function() {
        var currentTime = audio.currentTime;
        var progressPercent = (currentTime / audio.duration) * 100;
        progress.style.width = progressPercent + '%';
        currentTimeEl.textContent = formatTime(currentTime);

        const video2 = document.getElementById('video-background');
        video2.currentTime = currentTime;
    
    });

 var lyricsNow = false;
function toggleLyrics() {
        var lyrics = document.getElementById('lyrics');
        var lyrics2 = document.getElementById('lyricsBtn');
        var bar = document.getElementById('searchBar');
        var content = document.getElementById('content');

        if (lyrics.style.display === 'block') {
            lyrics.style.display = 'none';
            lyrics.style.opacity = '0.9';
            bar.style.display = 'block';
            content.style.display = 'block';
            lyricsNow = false;

        } else {
            lyrics.style.display = 'block';
            lyrics.style.opacity = '1';
            bar.style.display = 'none';
            content.style.display = 'none';
            lyricsNow = true;

}
        mostrarmusicas();
}

function setBackgroundColor() {
        var img = document.getElementById('musiclogo');  // Garantindo o ID correto
        var colorThief = new ColorThief();

        // Função para calcular a luminância
        function getLuminance(r, g, b) {
            return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        }

        // Função para ajustar a cor do texto
        function adjustTextColor(r, g, b) {
            var luminance = getLuminance(r, g, b);
            var textColor = luminance > 128 ? 'black' : 'white';  // Se a cor for clara, texto preto, se for escura, texto branco
            document.getElementById('lyrics').style.color = textColor;
            document.getElementById('hora').style.color = textColor;
            document.getElementById('music').style.color = textColor;
            document.getElementById('close').style.color = textColor;
            document.getElementById('upload').style.color = textColor;
            document.getElementById('cart').style.color = textColor;
            const buttons = document.getElementsByClassName('button');
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].style.color = textColor;
                buttons[i].style.borderColor = textColor;
            }

            const anuncios = document.getElementsByClassName('anuncio');
            for (let i = 0; i < anuncios.length; i++) {
                anuncios[i].style.color = textColor;
            }

        }

        // Aguarda o carregamento da imagem
        img.onload = function() {
            var dominantColor = colorThief.getColor(img);
            var rgb = 'rgb(' + dominantColor[0] + ',' + dominantColor[1] + ',' + dominantColor[2] + ')';
            
            // Aplica o fundo no elemento de letras
            document.getElementById('searchBar').style.backgroundColor = rgb;
            document.getElementById('lyrics').style.backgroundColor = rgb;
            document.querySelectorAll('.musicbtn').forEach(button => {
                button.addEventListener('mouseover', function() {
                    this.style.background = `linear-gradient(to left, ${rgb}, black)`;
                });
                button.addEventListener('mouseout', function() {
                    this.style.background = ''; // Reset background on mouse out
                });
            });
            document.getElementById('sidebar').style.background = `linear-gradient(to bottom, ${rgb}, #1d1d1d)`;
            document.getElementById('content').style.background = `linear-gradient(to bottom, ${rgb}, #1d1d1d)`;
            const buttons = document.getElementsByClassName('button');
            document.getElementById('progress').style.background = rgb;
            document.getElementById('carousel-container').style.backgroundColor = rgb;
            document.getElementById('fotoDiv').style.backgroundColor = rgb;
            document.getElementById('text').style.color = rgb;

            

            // Ajusta a cor do texto para ser o oposto do fundo
            adjustTextColor(dominantColor[0], dominantColor[1], dominantColor[2]);
        }

        // Caso a imagem já esteja carregada
        if (img.complete && img.naturalWidth !== 0) {
            var dominantColor = colorThief.getColor(img);
            var rgb = 'rgb(' + dominantColor[0] + ',' + dominantColor[1] + ',' + dominantColor[2] + ')';
            document.getElementById('lyrics').style.backgroundColor = rgb;
            adjustTextColor(dominantColor[0], dominantColor[1], dominantColor[2]);
        }
}

let isBackgroundChanged = false;
let originalBackground = document.body.style.backgroundColor;
    document.getElementById('big').addEventListener('click', function() {
        var img = document.getElementById('musiclogo');
        var colorThief = new ColorThief();
        var lyrics2 = document.getElementById('lyricsBtn');

        if (lyricsNow) {

        isBackgroundChanged = false;
        lyrics2.style.backgroundColor = '#520096';
        lyricsNow = false;

        } else {}

        if (!isBackgroundChanged) {
            var dominantColor = colorThief.getColor(img);
            var rgb = 'rgb(' + dominantColor[0] + ',' + dominantColor[1] + ',' + dominantColor[2] + ')';
            document.body.style.backgroundColor = rgb;
            isBackgroundChanged = true;
            document.getElementById('big2').textContent = 'Sair Da Tela Cheia';
        } else {
            document.body.style.backgroundColor = originalBackground;
            isBackgroundChanged = false;
            document.getElementById('big2').textContent = 'Entrar Em Tela Cheia';
        }
    })
    document.getElementById('lyricsBtn').addEventListener('click', function() {
        var img = document.getElementById('musiclogo');
        var colorThief = new ColorThief();

        if (!isBackgroundChanged) {
            var dominantColor = colorThief.getColor(img);
            var rgb = 'rgb(' + dominantColor[0] + ',' + dominantColor[1] + ',' + dominantColor[2] + ')';
            isBackgroundChanged = true;
        } else {
            document.body.style.backgroundColor = originalBackground;
            isBackgroundChanged = false;
        }
    });

function mostrar() {
    const bar = document.getElementById('bar');
    const bar2 = document.getElementById('down');
    const searchbar = document.getElementById('searchBar');
    const bigscreen = document.getElementById('big');
    const musicas = document.getElementById('musicas');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const button = document.getElementById('button');
    const progressb = document.getElementById('progress-container');
    const le = document.getElementById('lyrics');
    const control = document.getElementById('control');
    
    function isMobile() {
  const userAgent = navigator.userAgent.toLowerCase();
  return /android|iphone|ipad|ipod|windows phone/.test(userAgent);
}

if (isMobile()) {
    console.log("Está em um celular!");
} else {
    console.log("Não está em um celular!");
}
bar.style.display = 'block';
searchbar.style.display = 'block';
musicas.style.display = 'block';
playPauseBtn.style.display = 'block';
button.style.display = 'block';
progressb.style.width = '320px';
le.style.maxHeight = '700px';
le.style.display = 'none';
control.style.display = 'flex';
bar2.style.display = 'block';
progressb.style.display = 'flex';
bigscreen.style.display = 'block';
document.body.style.backgroundImage = 'none'; // Remove o fundo da página
}

function showElement() {
    const elemento = document.getElementById('music');
    elemento.style.display = 'block'; // Mostra o elemento
    elemento.classList.add('visible'); // Adiciona a classe que faz o fade-in
    elemento.classList.remove('hide'); // Remove a classe que faz o fade-out
}

function hideElement() {
    const elemento = document.getElementById('music');
    elemento.style.display = 'none'; // Esconde o elemento
    elemento.classList.add('hide'); // Adiciona a classe que faz o fade-in
    elemento.classList.remove('visible'); // Remove a classe que faz o fade-out
}

// Função para controlar a música
function controlarMusica() {

const audio = document.getElementById('audio');
const video = document.getElementById('musicvideo');
const video2 = document.getElementById('video-background');
const btn = document.getElementById('playPauseBtn');
const img = document.getElementById('pause img');

if (musicaTocando) {
    fadeOutAndPause();
    video.pause();
    video2.pause();
    musicaTocando = false;
    btn.innerHTML = '<img src="Material/20250323_214016_0000.png" alt="Play" style="width: 40px;">';
    
} else {
    audio.play();
    video.play();
    video2.play();
    musicaTocando = true;
    btn.innerHTML = '<img src="Material/20250323_214131_0000.png" alt="Pause" style="width: 40px;">';


}
}

// Sincroniza o tempo do vídeo com o áudio
document.getElementById('audio').addEventListener('play', function() {
const audio = document.getElementById('audio');
const video = document.getElementById('musicvideo');
const video2 = document.getElementById('video-background');

// Quando o áudio começa, o vídeo começa do mesmo ponto
video.currentTime = audio.currentTime;
video2.currentTime = audio.currentTime;
video.play();
});

function card() {

// Mostra ou esconde o cartão
const cartao = document.getElementById('sidebar');
const searchbar = document.getElementById('searchBar');
const content = document.getElementById('content');


if (cartao.style.display === 'flex') {
    cartao.style.display = 'none';
    searchbar.style.width = '94%';
    content.style.maxWidth = '94%';

} else {
    cartao.style.display = 'flex';
    searchbar.style.width = '67%';
    content.style.maxWidth = '67%';

  }
}

function mostrarmusicas () {
// Mostra as músicas
const musicas = document.getElementById('musicas');
if (lyrics.style.display === 'none') {
    musicas.style.display = 'block';
} else {
    musicas.style.display = 'none';
}
}

// Função de pesquisa
function pesquisar() {
    var input = document.getElementById("searchBar").value.toLowerCase(); // Pega o valor digitado e converte para minúsculas
    var musicButtons = document.getElementsByClassName("musicbtn"); // Pega todos os botões de música
    var btnTcar = document.getElementById("categoria"); // Pega o botão de play/pause
    var extra = document.getElementById("extra"); // Pega o botão de play/pause
    var rel = document.getElementById("relax"); // Pega o botão de play/pause
    var sad = document.getElementById("sad"); // Pega o botão de play/pause
    var mus = document.getElementById("musicas"); // Pega o botão de play/pause

    // Loop pelos botões de música para comparar o texto com o valor da pesquisa
    for (var i = 0; i < musicButtons.length; i++) {
        var musicName = musicButtons[i].innerText.toLowerCase(); // Pega o nome da música e converte para minúsculas
        if (musicName.includes(input)) {
            musicButtons[i].style.display = ""; // Mostra o botão se houver correspondência
            extra.style.display = "block"; // Esconde o botão se não houver correspondência

        } else {
            musicButtons[i].style.display = "none"; // Esconde o botão se não houver correspondência
        }
    }

    // Verifica se o valor digitado tem exatamente 0 caracteres
    if (input.length === 0) {
        btnTcar.textContent = "Em Alta:";
        extra.style.display = "none"; // Esconde o botão se não houver correspondência
        sad.style.display = "block"; // Esconde o botão se não houver correspondência
        rel.style.display = "block"; // Esconde o botão se não houver correspondência
        mus.style.width = '45%';
    } else {
        btnTcar.textContent = "Resultado:";
        mus.style.width = '100%';
        rel.style.display = "none"; // Esconde o botão se não houver correspondência
        sad.style.display = "none"; // Esconde o botão se não houver correspondência
    }
}

let urlFundo = ''; // Variável para armazenar a URL do fundo, inicialmente vazia

function mudarFundo(musica) {

    

    // Verificando qual música foi selecionada e atribuindo a URL do fundo
    if (musica === 'musica1') {
      urlFundo = ''; // Coloque o URL da imagem que você deseja para música1
    } else if (musica === 'musica6') {
        urlFundo = 'https://cdn.wikiwiki.jp/to/w/undertale_/Toby%20Fox/::ref/Toby%20Fox%E6%B0%8F.jpeg.webp?rev=1fffbb0201976b523ed2c82771b7f131&t=20220725172425'; // Coloque o URL da imagem que você deseja para música3
    } else if (musica === 'musica7') {
        urlFundo = 'https://i.ytimg.com/vi/_r0vlyp33pw/maxresdefault.jpg'; // Coloque o URL da imagem que você deseja para música3
    } else {
        urlFundo = ''; // Resetando a URL do fundo para vazio se nenhuma música corresponder
    }
  }
  let fundoAlterado = false; // Variável de controle para saber se o fundo foi alterado

function carregarFundo() {
      const cartao = document.getElementById('sidebar');
      const bar = document.getElementById('bar');
      const bar2 = document.getElementById('down');
      const searchbar = document.getElementById('searchBar');
      const bigscreen = document.getElementById('big');
      const musicas = document.getElementById('musicas');
      const playPauseBtn = document.getElementById('playPauseBtn');
      const button = document.getElementById('button');
      const progressb = document.getElementById('progress-container');
      const le = document.getElementById('lyrics');
      const control = document.getElementById('control');
      const content = document.getElementById('content');
      const music = document.getElementById('mslogo');
      const volBar = document.getElementById('vol');
      const mute = document.getElementById('muteButton');
      const mus = document.getElementById('music');
      const video = document.getElementById('video-background');


      if (bar.style.display === 'none') {
        cartao.style.display = 'none';
        bar.style.display = 'block';
        document.body.style.overflowY = 'hidden';
        searchbar.style.display = 'block';
        bar.style.width = '100%';
        musicas.style.display = 'block';
        playPauseBtn.style.display = 'block';
        button.style.display = 'block';
        progressb.style.width = '320px';
        le.style.maxHeight = '700px';
        le.style.display = 'none';
        control.style.display = 'block';
        bar2.style.display = 'block';
        progressb.style.right = '500px';
        playPauseBtn.style.right = '585px';
        playPauseBtn.style.width = '100px';
        playPauseBtn.style.bottom = "10px";
        content.style.display = 'block';
        music.style.display = 'none';
        video.style.display = 'none';
        content.style.maxWidth = '94%';
        volBar.style.width = '130px';
        volBar.style.top = '925px';
        volBar.style.right = '180px';
        mute.style.right = '310px';
        mute.style.bottom = '0px';
        mus.classList = 'hide';

        fundoAlterado = false; // Marca que o fundo foi alterado
        hideElement();
        document.exitFullscreen();

        document.getElementById('progress').style.background = document.getElementById('searchBar').style.backgroundColor;

    } else {
        cartao.style.display = 'none';
        bar.style.display = 'none';
        document.body.style.overflowY = 'auto';
        searchbar.style.display = 'none';
        searchbar.style.width = '93%';
        musicas.style.display = 'none';
        playPauseBtn.style.display = 'block';
        button.style.display = 'none';
        progressb.style.width = '1000px';
        le.style.maxHeight = '100%';
        le.style.display = 'block';
        control.style.display = 'none';
        bar2.style.display = 'none';
        progressb.style.right = '50px';
        playPauseBtn.style.right = '1050px';
        playPauseBtn.style.width = '200px';
        playPauseBtn.style.bottom = "40px";
        content.style.display = 'none';
        music.style.display = 'block';
        video.style.display = 'block';
        volBar.style.right = '1050px';
        volBar.style.top = '905px';
        volBar.style.width = '145px';
        mute.style.right = '1190px';
        mute.style.bottom = '80px';
        mus.classList = 'visible';

        showElement();
        document.documentElement.requestFullscreen();
        document.getElementById('progress').style.background = mus.style.color;


            // Verificando se há uma URL de fundo definida e se o fundo ainda não foi alterado
            if (urlFundo && !fundoAlterado) {
                console.log('Mudando o fundo da página...');
                document.body.style.backgroundImage = `url(${urlFundo})`;
                fundoAlterado = true; // Marca que o fundo foi alterado
            } else if (!urlFundo) {
            }

            const audio = document.getElementById('audio');
const video2 = document.getElementById('video-background');

// Quando o áudio começa, o vídeo começa do mesmo ponto
video2.currentTime = audio.currentTime;
    }
  }

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
        event.preventDefault(); // Evita o comportamento padrão de rolar a página
        controlarMusica();
    }
});

document.addEventListener('keydown', function(event) {
    const bigscreen = document.getElementById('big');

    if (bigscreen.style.display === 'block' && event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
        if (event.key === 'b') {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().then(carregarFundo);
            } else {
                document.exitFullscreen().then(carregarFundo);
            }
            var img = document.getElementById('musiclogo');
            var colorThief = new ColorThief();
            var lyrics2 = document.getElementById('lyricsBtn');
    
            if (lyricsNow) {
    
            isBackgroundChanged = false;
            lyrics2.style.backgroundColor = '#520096';
            lyricsNow = false;
    
            } else {}
    
            if (!isBackgroundChanged) {
                var dominantColor = colorThief.getColor(img);
                var rgb = 'rgb(' + dominantColor[0] + ',' + dominantColor[1] + ',' + dominantColor[2] + ')';
                document.body.style.backgroundColor = rgb;
                isBackgroundChanged = true;
            } else {
                document.body.style.backgroundColor = originalBackground;
                isBackgroundChanged = false;
            }
        }
    }
});

document.addEventListener('keydown', function(event) {
    const bigscreen = document.getElementById('big');

    if (bigscreen.style.display === 'block' && event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
        if (event.key === 'f') {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().then(carregarFundo);
            } else {
                document.exitFullscreen().then(carregarFundo);
            }
            var img = document.getElementById('musiclogo');
            var colorThief = new ColorThief();
            var lyrics2 = document.getElementById('lyricsBtn');
    
            if (lyricsNow) {
    
            isBackgroundChanged = false;
            lyrics2.style.backgroundColor = '#520096';
            lyricsNow = false;
    
            } else {}
    
            if (!isBackgroundChanged) {
                var dominantColor = colorThief.getColor(img);
                var rgb = 'rgb(' + dominantColor[0] + ',' + dominantColor[1] + ',' + dominantColor[2] + ')';
                document.body.style.backgroundColor = rgb;
                isBackgroundChanged = true;
            } else {
                document.body.style.backgroundColor = originalBackground;
                isBackgroundChanged = false;
            }
        }
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'c' && !event.ctrlKey) {
        if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
            event.preventDefault();
            card();
        }
    }
});


document.addEventListener('keydown', function(event) {
    if (event.key === '/') {
        if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
            event.preventDefault();
            document.getElementById('searchBar').focus();
        }
    }
});

document.getElementById('searchBar').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.target.blur();
    }
});

let slides = document.querySelectorAll('.carousel-slide');
let currentSlide = 0;
let progressBar2 = document.getElementById('progress2');

function showNextSlide() {
    // Remove a classe active do slide atual
    slides[currentSlide].classList.remove('active');
    // Atualiza para o próximo slide
    currentSlide = (currentSlide + 1) % slides.length;
    // Adiciona a classe active ao novo slide
    slides[currentSlide].classList.add('active');
    // Reinicia a barra de progresso
    resetProgressBar();
}

function resetProgressBar() {
    // Remove a transição anterior para reiniciar instantaneamente
    progressBar2.style.transition = 'none';
    progressBar2.style.width = '0%';
    
    // Força um reflow para garantir que a transição seja aplicada corretamente
    setTimeout(() => {
        progressBar2.style.transition = 'width 5s linear';
        progressBar2.style.width = '100%';
    }, 10); // Pequeno atraso para garantir o reinício da transição
}

// Muda o slide e reinicia a barra de progresso a cada 5 segundos (5000 milissegundos)
setInterval(showNextSlide, 5000);

// Inicia a barra de progresso no primeiro slide
resetProgressBar();

function anuncio() {
let close = document.getElementById('carousel-container');

close.style.display = 'none';
}

// Função para salvar o estado da música e do loop no localStorage
function saveMusicState() {
    const audio = document.getElementById('audio');
    const isLooping = audio.loop;
    const currentTime = audio.currentTime;
    const isPlaying = !audio.paused;
    const volume = audio.volume;

    localStorage.setItem('musicState', JSON.stringify({
        isLooping: isLooping,
        currentTime: currentTime,
        isPlaying: isPlaying,
        musnow: musnow,
        volume: volume
    }));
}

// Função para carregar o estado da música e do loop do localStorage
function loadMusicState() {
    const savedState = JSON.parse(localStorage.getItem('musicState'));
    if (savedState) {
        const audio = document.getElementById('audio');
        mudarMusica(savedState.musnow);
        audio.currentTime = savedState.currentTime;
        audio.loop = savedState.isLooping;
        audio.volume = savedState.volume;
        document.getElementById('vol').value = savedState.volume;

        if (savedState.isLooping) {
            document.getElementById('loopBtn').style.backgroundColor = '#8c00ff';
        } else {
            document.getElementById('loopBtn').style.backgroundColor = '#520096';
            isShuffle = true;
        }

        if (savedState.isPlaying) {
            document.getElementById('audio').play();
            document.getElementById('playPauseBtn').innerHTML = '<img src="Material/20250323_214131_0000.png" alt="Pause" style="width: 40px;">';
        } else {
            document.getElementById('audio').pause();
            document.getElementById('playPauseBtn').innerHTML = '<img src="Material/20250323_214016_0000.png" alt="Play" style="width: 40px;">';
        }

        musicaTocando = savedState.isPlaying;
        musicaAtual = audio.src;

        const bar = document.getElementById('bar');
        const bar2 = document.getElementById('down');
        const searchbar = document.getElementById('searchBar');
        const bigscreen = document.getElementById('big');
        const musicas = document.getElementById('musicas');
        const playPauseBtn = document.getElementById('playPauseBtn');
        const button = document.getElementById('button');
        const progressb = document.getElementById('progress-container');
        const le = document.getElementById('lyrics');
        const control = document.getElementById('control');

        bar.style.display = 'block';
        searchbar.style.display = 'block';
        musicas.style.display = 'block';
        playPauseBtn.style.display = 'block';
        button.style.display = 'block';
        progressb.style.width = '320px';
        le.style.maxHeight = '700px';
        le.style.display = 'none';
        control.style.display = 'flex';
        bar2.style.display = 'block';
        progressb.style.display = 'flex';
        bigscreen.style.display = 'block';
        document.body.style.backgroundImage = 'none'; // Remove o fundo da página
    }
}

// Salva o estado da música antes de sair da página
window.addEventListener('beforeunload', saveMusicState);

// Carrega o estado da música ao carregar a página
window.addEventListener('load', loadMusicState);

let isShuffle = false;
const shuffleBtn = document.getElementById('shuffleBtn');

shuffleBtn.addEventListener('click', function() {
    isShuffle = !isShuffle;
    if (isShuffle) {
        shuffleBtn.style.backgroundColor = '#8c00ff';
        audio.loop = false;
        loopBtn.style.backgroundColor = '#520096';
    } else {
        shuffleBtn.style.backgroundColor = '#520096';
        audio.loop = true;
        loopBtn.style.backgroundColor = '#8c00ff';
    }
});

audio.addEventListener('ended', function() {
    if (isShuffle) {
        const musicButtons = document.getElementsByClassName('musicbtn');
        const randomIndex = Math.floor(Math.random() * musicButtons.length);
        const randomMusic = musicButtons[randomIndex];
        randomMusic.click();
        document.body.style.backgroundColor = 'black';
    }
});

function atualizarHora() {
    var agora = new Date();
    var horas = agora.getHours().toString().padStart(2, '0');
    var minutos = agora.getMinutes().toString().padStart(2, '0');
    var horaAtual = horas + ':' + minutos;
    document.getElementById('hora').innerText = horaAtual;
  }

  setInterval(atualizarHora, 1000); // Atualiza a cada segundo
  atualizarHora(); // Atualiza imediatamente ao carregar

  var estiloPersonalizado;

  function ativarEstilo() { 
    if (!estiloPersonalizado) {
      estiloPersonalizado = document.createElement('style');
      estiloPersonalizado.innerHTML = `
        ::-webkit-scrollbar {
          display: none;
        }
      `;
      document.head.appendChild(estiloPersonalizado);
    }
  }

  function desativarEstilo() {
    if (estiloPersonalizado) {
      document.head.removeChild(estiloPersonalizado);
      estiloPersonalizado = null;
    }
  }

  function perfil() {

const perfil = document.getElementById('fotoDiv');

perfil.style.display = 'block';
  }

  function perfilC() {

    const perfil = document.getElementById('fotoDiv');
    
    perfil.style.display = 'none';
      }

function letra() {

    const letra = document.getElementById('lyrics');

    if (letra.style.opacity  == '0') {
      letra.style.opacity = '0.8';
      desativarEstilo();
    } else {
      letra.style.opacity = '0';
      ativarEstilo();
    }
}

function big() {
    const bigscreen = document.getElementById('big');

    if (bigscreen.style.display === 'block') {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(carregarFundo);
            bigscreen.style.backgroundColor = "#8c00ff"
        } else {
            document.exitFullscreen().then(carregarFundo);
            bigscreen.style.backgroundColor = "#520096"
        }
        var img = document.getElementById('musiclogo');
        var colorThief = new ColorThief();
        var lyrics2 = document.getElementById('lyricsBtn');

        if (lyricsNow) {

        isBackgroundChanged = false;
        lyrics2.style.backgroundColor = '#520096';
        lyricsNow = false;

        } else {}

        if (!isBackgroundChanged) {
            var dominantColor = colorThief.getColor(img);
            var rgb = 'rgb(' + dominantColor[0] + ',' + dominantColor[1] + ',' + dominantColor[2] + ')';
            document.body.style.backgroundColor = rgb;
            isBackgroundChanged = true;
        } else {
            document.body.style.backgroundColor = originalBackground;
            isBackgroundChanged = false;
        }
    }
}

let previousMusics = [];
let currentMusicIndex = -1;

function playPreviousMusic() {
    if (previousMusics.length > 0 && currentMusicIndex > 0) {
        currentMusicIndex--;
        const previousMusic = previousMusics[currentMusicIndex];
        previousMusic.click();
    } else {
        console.log("No previous music to play.");
    }
}

function playRandomMusic() {
    const musicButtons = document.getElementsByClassName('musicbtn');
    if (currentMusicIndex < previousMusics.length - 1) {
        currentMusicIndex++;
        const nextMusic = previousMusics[currentMusicIndex];
        nextMusic.click();
    } else {
        const randomIndex = Math.floor(Math.random() * musicButtons.length);
        const randomMusic = musicButtons[randomIndex];
        previousMusics.push(randomMusic);
        currentMusicIndex = previousMusics.length - 1;
        randomMusic.click();
    }
}

// Função das Musicas:

let musnow = false;
let musicaTocando = false;
function mudarMusica(musica) {
const audio = document.getElementById('audio');
const video = document.getElementById('musicvideo');
const btnTocar = document.getElementById('playPauseBtn');
document.body.style.backgroundImage = 'none'; // Remove o fundo da página

if (musica === '1') {
    // Muda para a primeira música
    let texto = "<strong>intro</strong><br>Fica de quatro, fica de quatro<br>Fica de, fi-fi-fi-fica de quatro<br>Fica de quatro, fica de quatro (esse é o Fennecxx)<br>(É o brabo da putaria)<br><strong>verse</strong><br>Queima ou não queima? Que-queima ou não<br>Queima ou não, queima ou não, queima ou não<br>Queima ou não, queima ou não, queima ou não<br>Queima ou não, queima ou não, queima ou não<br><strong>verse</strong><br>Queima ou não queima? Queima ou não queima?<br>Queima ou não queima? Queima ou não queima?<br>Queima ou não queima? Queima ou não queima?<br>Queima ou não queima? Queima ou não queima?<br><strong>verse</strong><br>Queima ou não queima? Queima ou não queima?<br>Queima ou não queima? Queima ou não queima?<br>Queima ou não queima? Queima ou não queima?<br>Queima ou não queima? Queima ou não queima?<br>Queima ou não queima? Queima ou não queima?<br><strong>verse</strong><br>Queima ou não queima? Queima ou não queima?<br>Queima ou não queima? Queima ou não queima?<br>Queima ou não queima? Queima ou não queima?<br>Queima ou não queima? Queima ou não queima?<br><strong>verse</strong><br>Queima ou não queima? Queima ou não queima?<br>Queima ou não queima? Queima ou não queima?<br>Queima ou não queima? Queima ou não queima?<br>Queima ou não queima? Queima ou não queima?<br><strong>verse</strong><br>Es-esse é o DJ Alex, o mago de Montenegro<br>Aqui na Mangueira, é o bonde do piru sem freio<br>Fica de quatro, fica de quatro<br>Fica de quatro pro DJ<br><strong>verse</strong><br>Fica de quatro, fica de quatro<br>Fica de quatro, fi-fi-fi-fi-fi<br>Fica de quatro, fica de quatro<br>Fica de quatro, fica de quatro<br>Fica de quatro, fica de quatro<br>Fica de quatro pro DJ<br><strong>verse</strong><br>Tô com tesão de urso, tô com tesão de urso<br>Senta na, senta na, senta na, senta na<br>Senta na, senta na Norte pro mundo<br><strong>verse</strong><br>Oi, oi, oi, oi, oi, oi, oi, oi<br>Oi, oi, oi, oi, oi, oi, oi, oi<br>Tô, tô, tô, tô, tô, tô, tô, tô<br>Tô, tô, tô, tô, tô, tô, tô, tô<br>Tô, tô, tô, tô, tô, tô, tô, tô<br><strong>verse</strong><br>Tô, tô, tô, tô, tô, tô, tô, tô<br>Tô, tô, tô, tô, tô, tô, tô, tô<br>Tô, tô, tô, tô, tô, tô, tô, tô<br>Tô, tô, tô, tô, tô, tô, tô, tô<br>Tô, tô, tô, tô, tô, tô, tô, tô<br><br><strong>Writer(s): Dj Alex, Fennecxx</strong>";
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('musicname').textContent = "SPOOKY";
    document.getElementById('music').textContent = "SPOOKY";
    document.getElementById('musicartist').textContent = "fennecxx, DJ ALEX";
    document.getElementById('msgartist').textContent = "Fennecxx is a 17-year-old music artist from Brazil who has quickly risen to international fame. In January 2025, his track 'SPOOKY' reached #14 on the Billboard Hot Dance/Electronic chart, making him the youngest Brazilian artist to achieve this milestone. The song also charted in over 190 countries, solidifying his place as a global rising star.";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = "Material/InShot_20250123_095742240.mp4"; // Vídeo da música
    document.getElementById('artistimg').src = "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/0a/f5/1e/0af51e30-fa8e-1321-5b8c-091ae7dc06b1/640948812510.png/1200x1200bf-60.jpg"; // Foto do artista
    document.getElementById('sobre').style.backgroundImage = "url('https://th.bing.com/th/id/OIP.IylQjsResl68F1YEl2RzLgHaEK?w=310&h=180&c=7&r=0&o=5&pid=1.7')"; // Foto do artista
    document.getElementById('video-background').src = '';
    mudarFundo('musica1');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/SPOOKY - fennecxx.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();

} else if (musica === '2') {
    // Muda para a primeira música
    let texto = "Fall Asleep<br>ChewieCatt<br><br>I've been dreaming, you are scheming<br>Crawl under my skin, I am feeling<br>Like a need to wake up<br><br>Bloodshot eyes, ragged clothes<br>Holding on to a lost hope<br>I don't know who I am anymore<br>Just need to wake up<br><br>Fall asleep<br>My darkest dreams<br>Are taking me underneath it all<br>Fall asleep<br>Dying intensity<br>Is it real or is it me?<br>When I fall asleep<br><br>I see blood, blood and rain<br>Fire all around me bursting out through my veins<br>Wish it was all a dream<br>But I can feel the heat it's coming up behind me<br><br>Wish it was over now<br>I can see your eyes, I know that I have been found<br>Teeth so deep into my lungs<br>I can never hide, but I can no longer run<br><br>Fall asleep<br>My darkest dreams<br>Are taking me underneath it all<br>Fall asleep<br>Dying intensity<br>Is it real or is it me?<br>When I fall asleep<br><br>Give me a hug<br>My teeth will sink so deep into your lungs<br>I think I'm in love<br>This is my playground and playtime has just begun<br><br>Fall asleep<br>My darkest dreams<br>Are taking me underneath it all<br>Fall asleep<br>Dying intensity<br>Is it real or is it me?<br>When I fall asleep";
    document.getElementById('musicname').textContent = "Fall Asleep";
    document.getElementById('music').textContent = "Fall Asleep";
    document.getElementById('musicartist').textContent = "ChewieCatt";
    document.getElementById('msgartist').textContent = "Just someone making his way through life one song at a time...";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://i.scdn.co/image/ab6761610000e5eba57c71ff631d56e9cf418d73"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('https://cdn.discordapp.com/splashes/711677090860367974/6413be97479a4445b853d2b02216d176.jpg?size=1024')"; // Foto do artista
    document.getElementById('credits').innerHTML = "    Fall Asleep<br>Interpretada por<br>ChewieCatt<br><br>Composta por<br><br>Matthew Moreland";
    document.getElementById('video-background').src = 'Material/Fall Asleep - A Poppy Playtime Song  by ChewieCatt.mp4';
    mudarFundo('musica2');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/Fall Asleep - ChewieCatt.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();

} else if (musica === '3') {
    let texto = "<strong>verse</strong><br>" +
    "Isn′t he wonderful?<br>" +
    "So tall and smiley and colorful<br>" +
    "Built to spread happiness<br>" +
    "What a handful, yet so magical<br>" +
    "Innovation is key<br>" +
    "To create good friends like you and me<br>" +
    "Let's roam around this facility<br>" +
    "What do you see?<br>" +
    "<strong>pre-chorus</strong><br>" +
    "Experiments by monsters<br>" +
    "Look what it cost her<br>" +
    "Manufactured souls that kill for fun (fun)<br>" +
    "Making you run (run)<br>" +
    "<strong>chorus</strong><br>" +
    "Welcome home<br>" +
    "You′re not alone<br>" +
    "Give me a hug and your flesh and blood<br>" +
    "Tell me, do you feel so loved?<br>" +
    "Secrets to hide<br>" +
    "More than just toys inside<br>" +
    "Take a deep breath, I'll squeeze you to death<br>" +
    "But she needs the last one left<br>" +
    "<strong>verse</strong><br>" +
    "Isn't he wonderful?<br>" +
    "So tall and creepy and colorful<br>" +
    "Built to kill<br>" +
    "What a hand′, yet so magical<br>" +
    "Playtime is all you need<br>" +
    "Missing incidents are guaranteed<br>" +
    "Take a step-up and let us proceed<br>" +
    "Watch us all bleed<br>" +
    "<strong>pre-chorus</strong><br>" +
    "Experiments by monsters<br>" +
    "Look what it cost her<br>" +
    "Manufactured souls that kill for fun (fun)<br>" +
    "Making you run<br>" +
    "<strong>chorus</strong><br>" +
    "Welcome home<br>" +
    "You′re not alone<br>" +
    "Give me a hug and your flesh and blood<br>" +
    "Tell me, do you feel so loved?<br>" +
    "Secrets to hide<br>" +
    "More than just toys inside<br>" +
    "Take a deep breath, I'll squeeze you to death<br>" +
    "But she needs the last one left<br>" +
    "<strong>hook</strong><br>" +
    "Bla-ra-da, bla-ra-da<br>" +
    "Bla-ra-da, la-ra-da, la-ra-da-da-da<br>" +
    "Bla-ra-ra-da<br>" +
    "<strong>verse</strong><br>" +
    "You are so kind to stay<br>" +
    "Open her case so that she can play<br>" +
    "Poppy won′t stay away, away, ay-ay-ay<br>" +
    "<strong>chorus</strong><br>" +
    "Welcome home<br>" +
    "You′re not alone<br>" +
    "Give me a hug and your flesh and blood<br>" +
    "Tell me, do you feel so loved?<br>" +
    "Secrets to hide<br>" +
    "More than just toys inside<br>" +
    "Take a deep breath, I'll squeeze you to death<br>" +
    "But she needs the last one left<br>" +
    "<strong>Writer(s)</strong>: Tyson August";
    

    document.getElementById('musicname').textContent = "Welcome Home";
    document.getElementById('music').textContent = "Welcome Home";
    document.getElementById('musicartist').textContent = "ApangryPiggy";
    document.getElementById('msgartist').textContent = "Hey, I'm Tyson! Also known as APAngryPiggy on YouTube! :D";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://akamai.sscdn.co/uploadfile/letras/fotos/d/a/2/c/da2c69bf421fb5ad50767241df17cde0.jpg"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('video-background').src = 'Material/Welcome Home  POPPY PLAYTIME ORIGINAL SONG.mp4';
    mudarFundo('musica3');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/Welcome Home - Apangrypiggy.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();

} else if (musica === '4') {
    // Muda para a primeira música
        let texto = `
            <span data-time="0:05"><strong>verse</strong><br>And when the ice sets in, I'll need you</span><br>
            <span data-time="0:12">If only when we met, we knew you</span><br>
            <span data-time="0:20">And then our time concludes</span><br>
            <span data-time="0:23">And far beyond the stars, we flew forever</span><br>
            <span data-time="0:30"><strong>chorus</strong><br>Tell myself I lost my soul for you</span><br>
            <span data-time="0:38">Go thereafter</span><br>
            <span data-time="0:40">See you never</span><br>

            <strong>Writer(s): Aj Dispirito</strong><br>
            <a style="text-decoration: none; color: orange;" href="https://www.musixmatch.com/pt/letras/AJ-Dispirito/FOREVER">Letra disponibilizada por MusixMatch</a>
            `;

        audio.addEventListener('timeupdate', function() {
            const currentTime = audio.currentTime;
            const lyrics = document.querySelectorAll('#lyrics span, #lyrics h3');
            lyrics.forEach(span => {
                const time = span.getAttribute('data-time').split(':');
                const spanTime = parseInt(time[0]) * 60 + parseInt(time[1]);
                if (Math.floor(currentTime) >= spanTime) {
                    span.outerHTML = `<h3 data-time="${span.getAttribute('data-time')}">${span.innerHTML}</h3>`;
                }
            });
        });
        audio.addEventListener('timeupdate', function() {
            const currentTime = audio.currentTime;
            const lyrics = document.querySelectorAll('#lyrics span, #lyrics h3');
            lyrics.forEach(span => {
                const time = span.getAttribute('data-time').split(':');
                const spanTime = parseInt(time[0]) * 60 + parseInt(time[1]);
                if (Math.floor(currentTime) >= spanTime) {
                    span.outerHTML = `<h3 data-time="${span.getAttribute('data-time')}">${span.innerHTML}</h3>`;
                    span.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        });

        audio.addEventListener('timeupdate', function() {
            const currentTime = audio.currentTime;
            const lyrics = document.querySelectorAll('#lyrics span');
            lyrics.forEach(span => {
            const time = span.getAttribute('data-time').split(':');
            const spanTime = parseInt(time[0]) * 60 + parseInt(time[1]);
            if (Math.floor(currentTime) === spanTime) {
                span.outerHTML = `<h3 data-time="${span.getAttribute('data-time')}">${span.innerHTML}</h3>`;
            }
            });
        });

    audio.addEventListener('timeupdate', function() {
        const currentTime = audio.currentTime;
        const lyrics = document.querySelectorAll('#lyrics span');
        lyrics.forEach(span => {
            const time = span.getAttribute('data-time').split(':');
            const spanTime = parseInt(time[0]) * 60 + parseInt(time[1]);
            if (Math.floor(currentTime) === spanTime) {
                span.outerHTML = `<h3 data-time="${span.getAttribute('data-time')}">${span.innerHTML}</h3>`;
            } else {
                span.outerHTML = `<span data-time="${span.getAttribute('data-time')}">${span.innerHTML}</span>`;
            }
        });
    });

        // Sincroniza a letra com o tempo da música
        audio.addEventListener('timeupdate', function() {
            const currentTime = audio.currentTime;
            const lyrics = document.querySelectorAll('#lyrics span');
            lyrics.forEach(span => {
                const time = span.getAttribute('data-time').split(':');
                const spanTime = parseInt(time[0]) * 60 + parseInt(time[1]);
                if (Math.floor(currentTime) === spanTime) {
                    span.style.fontSize = '25px';
                } else {
                    span.style.fontSize = '18px';
                }
            });
        });
    document.getElementById('music').textContent = "Forever";
    document.getElementById('musicartist').textContent = "AJ Dispirito";
    document.getElementById('msgartist').textContent = "I like making music.";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://yt3.googleusercontent.com/EX73jiRXmMnzsWaRWj1CCilgX3KBIxomsGfL2ifU4kVrNvOuKdm6SgLA_9kAJ0Va4mgH2agO=s160-c-k-c0x00ffffff-no-rj"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('video-background').src = '';
    mudarFundo('musica4');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/FOREVER - AJ Dispirito.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();

} else if (musica === '5') {
    // Muda para a primeira música
    let texto = `<strong>Intro</strong><br>
Esse é o Rick 013, sucesso com a mulherada<br>
<strong>Verse</strong><br>
Que ela já tá louca, embrazada
Ela quica, ela desce travan-travando na vara
Travan-travan-travan-travan-travan-travando na vara
Travan-travan-travan-travan-travan-travando na vara
Travan-travan-travan-travan-travan-travando na vara
Travan-travan-travan-travan-travan-travando na vara
Tu vai tomar, vai tomar
Vai tomar em alto mar
Tu vai, tu vai tomar, tomar
Tomar, tomar, tomar, tomar
Tomar, tomar, tomar, tomar
Tomar em alto mar
Vai-vai tomar, tomar, tomar
Tomar, tomar, tomar, tomar
Vai-vai tomar, tomar, tomar
Tomar, tomar em alto mar
Que ela já tá louca, embrazada
Travan-travan-travan-travan-travan-travando na vara
Travan-travan-travan-travan-travan-travando na vara
Travan-travan-travan-travan-travan-travando na vara
Travan-travan-travan-travan-travan-travando na vara
Tu vai tomar, vai tomar
Vai tomar em alto mar
Tu vai, tu vai tomar, tomar
Tomar, tomar, tomar, tomar
Tomar, tomar, tomar, tomar
Tomar em alto mar
Vai-vai tomar, tomar, tomar
Tomar, tomar, tomar, tomar
Vai-vai tomar, tomar, tomar
Tomar, tomar em alto mar<br>
<strong>Writer(s): Walace Matheus Mello Da Rocha</strong>
`;
    document.getElementById('musicname').textContent = "Montagem Sombra Estelar 1.0";
    document.getElementById('music').textContent = "Montagem Sombra Estelar 1.0";
    document.getElementById('musicartist').textContent = "DJ RICK 013";
    document.getElementById('msgartist').textContent = "DJ Rick 013 Com apenas 17 anos, (Rikelme Gonçalves Vieira) já é referência na cena, acumulando mais de 100 milhões de streams e com vários hits virais em outras plataformas. Suas produções misturam elementos únicos do funk, criando um som que conquista cada vez mais espaço nas pistas e playlists. oficial Instagram: @DJ_rick013";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://yt3.googleusercontent.com/PLPD0mcmAcLGvRwxXVPrvVJFvKcUtNCEVEa-Jjd7T5xlkOboxVHVJht33ZZGMNtjnTh0rtDKWg=s160-c-k-c0x00ffffff-no-rj"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('video-background').src = '';
    mudarFundo('musica5');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/Montagem sombra estelar 1.0 - DJ RICK 013.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();

} else if (musica === '6') {
    // Muda para a primeira música
    let texto = "<strong>Música Sem Letra!</strong>";
    document.getElementById('musicname').textContent = "Fallen Down";
    document.getElementById('music').textContent = "Fallen Down";
    document.getElementById('musicartist').textContent = "Toby Fox";
    document.getElementById('msgartist').textContent = "An American music composer and video game developer, Toby Fox became known for his hit 2015 indie game Undertale, which evoked the sounds of 1980s arcade classics like Mario Bros. and Dig Dug with its score. Spanning orchestral and choral arrangements, playful computer music, rock guitar, and atmospheric sound effects, his diverse 2018 soundtrack for DELTARUNE, Chapter 1 landed on the Billboard Independent Albums chart. The sequel DELTARUNE, Chapter 2 reached the Top 20 of the Soundtracks and Heatseekers Albums charts in 2021.";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://th.bing.com/th/id/OIP.5EeHN_MRiUTtBW1zZJjORgAAAA?rs=1&pid=ImgDetMain"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "Fallen Down<br>Interpretada por<br><br>Toby Fox<br>Composta por<br><br>Toby Fox<br>Produzida por<br><br>Toby Fox<br>Fonte: Materia Collective.";
    document.getElementById('video-background').src = '';
    mudarFundo('musica6');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/Fallen Down - Toby Fox.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();

} else if (musica === '7') {
    // Muda para a primeira música
    let texto = "<strong>Música Sem Letra!</strong>";
    document.getElementById('musicname').textContent = "snowfall";
    document.getElementById('music').textContent = "snowfall";
    document.getElementById('musicartist').textContent = "Øneheart";
    document.getElementById('msgartist').innerHTML = "Commencing his musical odyssey at 11 years of age, Dmitry Volynkin, professionally known as Øneheart, is a visionary multigenre artist creating ambient, wave, and electronic landscapes. Øneheart's journey is driven by an innate desire to express complex emotions and connect with others.<br><br>Within a short amount of time, Dmitry has achieved extraordinary feats, notably securing a RIAA gold certified plaque and an impressive 2 Billion Global Streams on Spotify alone. His viral sensation, 'snowfall,' eclipsed a billion streams, dominating TikTok with 10M+ videos and securing the 26th spot on TikTok Viral Music Charts. His influence extends through multiple hits, including 'this feeling,' 'apathy' and 'watching the stars'.<br><br>Despite the admirable young age of 18, a recent collaboration with Monstercat further solidifies Øneheart's status as a rising star, attesting to an artist whose music transcends unimaginable boundaries. Øneheart's other-worldly, ethereal compositions serve as a comforting embrace, inspiring listeners worldwide with the universal language of his music.<br><br>Management: <a style='color: #8c00ff;' href='https://kuratemusic.com/'>joey@kuratemusic.com</a>";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://global-uploads.webflow.com/62158cc7e1cd8f0ec3729390/63ee72e0ca97ba6cc54fd005_oneheart-wFp7E.jpeg"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('https://i.ytimg.com/vi/FjNCnOSR6JY/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGBEgXyhyMA8=&rs=AOn4CLBE__hPfv98JnBqyrZWsq5p3WMRwA')"; // Foto do artista
    document.getElementById('credits').innerHTML = "snowfall<br><br>Interpretada por<br><br>reidenshi, Øneheart<br>Composta por<br><br>Dmitry Volynkin<br>Produzida por<br><br>Øneheart, reidenshi<br>Fonte: Øneheart & reidenshi";
    document.getElementById('video-background').src = '';
    mudarFundo('musica7');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/snowfall - Øneheart.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();

} else if (musica === '8') {
    // Muda para a primeira música
    let texto = "<strong>verse</strong><br>" +
    "Not done fighting, I don't feel I've lost<br>" +
    "Am I dreamin', is there more like us?<br>" +
    "Got me feeling like it's all too much<br>" +
    "I feel beaten, but I can't give up<br>" +
    "I'm still fighting (Metro), I don't feel I've lost<br>" +
    "Am I dreamin', is there more like us?<br>" +
    "Got me feelin' like it's all too much<br>" +
    "I feel beaten, but I can't give up<br>" +
    "<strong>verse</strong><br>" +
    "Uh (no way), wakin' up, feelin' like the thankful one<br>" +
    "Count up my ones, lacin' up my favorite ones<br>" +
    "One of a kind, one of one, the only one<br>" +
    "Got one shot and one chance to take it once<br>" +
    "Kiss my mama on the forehead, 'fore I get the code red<br>" +
    "'Cause I was born, bred to go in, toast red<br>" +
    "And swing by four-ten, beef patty, cornbread<br>" +
    "In the concrete jungle, where my home is<br>" +
    "All get focused, all range of toast is<br>" +
    "For nickname, it's the king that do the mostest<br>" +
    "I was livin' down bad in my folk's crib<br>" +
    "Now I'm laughin' to the bank and the joke is<br>" +
    "They want things them folks did or folks get<br>" +
    "We've been gettin' this fly since some poor kids<br>" +
    "My rich friends and my broke friends co-exist<br>" +
    "They love to mix 'em, we know what it is<br>" +
    "<strong>verse</strong><br>" +
    "Not done fightin' (no way), I don't fear I've lost<br>" +
    "Am I dreamin', is there more like us?<br>" +
    "Got me feeling (no way), like it's all too much<br>" +
    "I feel beaten, but I can't give up<br>" +
    "I'm still fighting (no way), I don't fear I've lost<br>" +
    "Am I dreamin', is there more like us?<br>" +
    "Got me feelin' (no way), like it's all too much<br>" +
    "I feel beaten (no way), but I can't give up<br>" +
    "<strong>bridge</strong><br>" +
    "I can't find it in myself to just walk away<br>" +
    "I can't find it in myself to lose everything<br>" +
    "Feel everyone's against me, don't want me to be great<br>" +
    "Things might look bad, not afraid to look death in the face<br>" +
    "I'm good now, now, now (no way), who's really bad?<br>" +
    "I choose me now, now, now, what's wrong with that?<br>" +
    "Wish you could see me (no way)<br>" +
    "Now, now, hmm, who had my back, baby?<br>" +
    "You don't know no love, always will win<br>" +
    "<strong>verse</strong><br>" +
    "Not done fightin' (no way) (fightin'), I don't fear I've lost (fear I)<br>" +
    "Am I dreamin' (dreamin'), is there more like us? (More like)<br>" +
    "Got me feeling (no way) (feelin'), like it's all too much<br>" +
    "I feel beaten (beaten), but I can't give up (can't give)<br>" +
    "I'm still fighting (no way), I don't fear I've lost<br>" +
    "Am I dreamin', is there more like us?<br>" +
    "Got me feelin' (no way), like it's all too much<br>" +
    "I feel beaten (no way), but I can't give up<br>" +
    "<strong>outro</strong><br>" +
    "Can't give up<br>" +
    "Can't give, can't give up<br>" +
    "Can't give, can't give up<br>" +
    "Can't give, can't give up<br>" +
    "Can't give up<br>" +
    "<strong>Writer(s)</strong>: Tyson August";    
    document.getElementById('musicname').textContent = "Am I Dreaming";
    document.getElementById('music').textContent = "Am I Dreaming";
    document.getElementById('musicartist').textContent = "Metro booming";
    document.getElementById('msgartist').textContent = "";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://global-uploads.webflow.com/62158cc7e1cd8f0ec3729390/63ee72e0ca97ba6cc54fd005_oneheart-wFp7E.jpeg"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "";
    document.getElementById('video-background').src = 'Material/Spider-Man Across the Spider-Verse  Am I Dreaming Metro Boomin x A$AP Rocky x Roisee  Lyrics.mp4';
    mudarFundo('musica8');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/Am I Dreaming.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();

} else if (musica === '9') {
    // Muda para a primeira música
    let texto = "<strong>verse</strong><br>" +
    "Quando a noite cai, toda a luz se esvai<br>" +
    "Junto dela, toda nossa paz<br>" +
    "Mas agindo nas sombras a fé ainda está viva<br>" +
    "Com a Batfamília<br>" +
    "Depois de tudo o Coringa morreu<br>" +
    "Mas o crime em Gotham nunca vai parar<br>" +
    "O Espantalho apenas reviveu<br>" +
    "Jurando toda a cidade infectar<br>" +
    "Batman, não sabe tudo que fiz<br>" +
    "Juntei seus vilões para me ajudar<br>" +
    "A minha máscara costurada<br>" +
    "Com minha face pro medo espalhar<br>" +
    "Eu vou buscando por toda a cidade<br>" +
    "Hera sabe como não sentir o gás do medo<br>" +
    "Mas no momento tenho coisas piores pra lidar<br>" +
    "Porque Gotham tem um novo cavaleiro<br>" +
    "Mascarado e controlado por esses planos do Espantalho<br>" +
    "Manipulado e acompanhado pela milícia de mercenários<br>" +
    "Mas ele entende cada golpe que foi dado<br>" +
    "Quantos mais vão morrer somente por estar ao seu lado?<br>" +
    "Barbara, saia daí<br>" +
    "O Espantalho já sabe onde fica sua base<br>" +
    "Não é seguro de verdade<br>" +
    "A explosão da bomba eu irei reduzir, com isso vou conseguir<br>" +
    "E aí morcego, sentiu saudades?<br>" +
    "Uma criança assustada com os pais mortos no chão<br>" +
    "Aquele garoto era eu<br>" +
    "Se tornou a vingança, a noite e a justiça<br>" +
    "E foi assim que o Batman nasceu<br>" +
    "Quando a noite cai<br>" +
    "Um cavaleiro espreita por Gotham City até de manhã<br>" +
    "E cada vilão que ameaçar minha cidade<br>" +
    "Vão dizer: 'Quem é você!?'<br>" +
    "E eu vou dizer: 'Eu sou o Batman'<br>" +
    "<strong>verse</strong><br>" +
    "Estou tendo alucinações frequentes<br>" +
    "O meu pior inimigo não sai da minha mente<br>" +
    "Mais quatro pessoas no mesmo incidente<br>" +
    "Seu plano era se dividir na gente<br>" +
    "Então Morcego, e a Oráculo?<br>" +
    "Avisarei o comissário<br>" +
    "Que cê mentiu, e foi um otário?<br>" +
    "Isso é necessário<br>" +
    "Com o sequestro de Barbara Gordon<br>" +
    "Eu fiz Batman perder seu maior aliado<br>" +
    "Meu plano não acabou, ele apenas começou<br>" +
    "Enquanto Batman está atrás de vilões menores<br>" +
    "Meu gás irá se espalhar e o medo irá aumentar<br>" +
    "Quanto mais sombrio o homem, seus medos são bem piores<br>" +
    "Mr. Pig, Charada<br>" +
    "Talvez tenha uma ligação<br>" +
    "Eu sinto do nada<br>" +
    "Piora na alucinação<br>" +
    "Morcego, está cercado pelo seu medo<br>" +
    "De novo eu perdi a chave da solução<br>" +
    "Cobaias humanas estão sendo usadas<br>" +
    "Eu preciso logo acabar com isso aqui<br>" +
    "Espantalho, não tem mais pra onde correr<br>" +
    "E quem disse que eu quero fugir?<br>" +
    "Uma criança assustada com os pais mortos no chão<br>" +
    "Aquele garoto era eu<br>" +
    "Se tornou a vingança, a noite e a justiça<br>" +
    "E foi assim que o Batman nasceu<br>" +
    "Quando a noite cai<br>" +
    "Um cavaleiro espreita por Gotham City até de manhã<br>" +
    "E cada vilão que ameaçar minha cidade<br>" +
    "Vão dizer: 'Quem é você!?'<br>" +
    "E eu vou dizer: 'Eu sou o Batman'<br>" +
    "<strong>verse</strong><br>" +
    "Barbara morreu, Hera também morreu<br>" +
    "Pra todos que me ajudam o destino é a morte<br>" +
    "O problema sou eu, mas antes de um adeus<br>" +
    "O cavaleiro de Gotham é o Robin, Jason Todd<br>" +
    "Não ouse pra mim mentir<br>" +
    "Enquanto eu sofria, foi só me substituir?<br>" +
    "Eu confiei em você, me abandonou pra morrer<br>" +
    "Disse pra eu fazer o que eu quero, eu quero é te ver sofrer<br>" +
    "Jason não foi morto, apenas torturado<br>" +
    "Nas mãos de algum sujo e frio palhaço<br>" +
    "Eu escapei mas deixei meu recado<br>" +
    "Meu antigo parceiro eu me importo, volte pro meu lado<br>" +
    "Na frente de todos e todos na frente<br>" +
    "Seu maior amigo dará seu presente<br>" +
    "Tirando sua máscara, todos presentes<br>" +
    "Verão que Batman é Bruce Wayne<br>" +
    "Confronte seus medos<br>" +
    "Eu não tenho medo de nada mais<br>" +
    "Tirei o Coringa da minha cabeça<br>" +
    "E você sentirá o efeito do seu próprio gás<br>" +
    "Você tem medo de virar cinzas, medo de ser esquecido<br>" +
    "Não! Espera, Morcego!<br>" +
    "Não faça isso, Bruce!<br>" +
    "Eu preciso de você<br>" +
    "ALBK<br>" +
    "A única solução pro fim do crime<br>" +
    "É o Cavaleiro das Trevas dar seu adeus<br>" +
    "Bruce explodindo com sua mansão<br>" +
    "E foi assim que o Batman morreu<br>";
    
    document.getElementById('musicname').textContent = "Foi Assim Que O Batman Morreu (Batman Arkham Knight)";
    document.getElementById('music').textContent = "Foi Assim Que O Batman Morreu (Batman Arkham Knight)";
    document.getElementById('musicartist').textContent = "ALBK";
    document.getElementById('msgartist').textContent = "";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://yt3.googleusercontent.com/za9Bl9iKEuekYj4LDmQ0SXSb6Vpxw1FZDcbrCto2eHuRlGw3oLM95xYZzK9_9-gGq7kar086gA=s160-c-k-c0x00ffffff-no-rj"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "Foi Assim Que O Batman Morreu (Batman Arkham Knight)<br>Interpretada por<br><br>ALBK<br>Composta por<br><br>André Kishi, Antonio Clarete.";
    document.getElementById('video-background').src = 'Material/Rap do Batman (Arkham Knight) - FOI ASSIM QUE O BATMAN MORREU  ALBK 10.mp4';
    mudarFundo('musica9');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/Foi Assim Que O Batman Morreu (Batman Arkham Knight) - ALBK.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();

} else if (musica === '10') {
    // Muda para a primeira música
    let texto = "<strong>verse</strong><br>" +
    "Who\'d you die for? <br>" +
    "Who\'d you lie for, lie for? <br>" +
    "This ain\'t the Bible, \'cause I got a rifle, rifle <br>" +
    "Don\'t ever fuck with me, \'cause I got enemies, I got enemies <br>" +
    "Nobody\'s there for me<br>" +
    "<strong>pre-chorus</strong><br>" +
    "So, Father, forgive me, for You know that I am always sinnin\' <br>" +
    "I take no interest partyin\' with liquor, fuckin\' up my system <br>" +
    "Excuse my language, that\'s a hang-up on how shitty I been feelin\' <br>" +
    "Sorry I feel no attraction, I know that it\'s been a minute<br>" +
    "<strong>chorus</strong><br>" +
    "\'Cause I\'ve been so low for so long<br>" +
    "Oh-oh-oh, yeah, yeah<br>" +
    "\'Cause I\'ve been so low for so long<br>" +
    "Oh, oh-oh-oh, yeah, yeah, yeah<br>" +
    "<strong>verse</strong><br>" +
    "Who do you ride for?<br>" +
    "Who do you cry for, cry for?<br>" +
    "It\'s now or never, gotta keep it together, oh, Lord<br>" +
    "It\'s takin\' over me, \'cause I got enemies, I got enemies<br>" +
    "Nobody\'s there for me<br>" +
    "<strong>pre-chorus</strong><br>" +
    "So, Father, forgive me, for You know that I am always sinnin\'<br>" +
    "I take no interest partyin\' with liquor, fuckin\' up my system<br>" +
    "Excuse my language, that\'s a hang-up on how shitty I been feelin\'<br>" +
    "Sorry I feel no attraction, I know that it\'s been a minute<br>" +
    "<strong>chorus</strong><br>" +
    "\'Cause I\'ve been so low for so long<br>" +
    "Oh-oh-oh, yeah, yeah<br>" +
    "\'Cause I\'ve been so low for so long<br>" +
    "Oh, oh-oh-oh, yeah, yeah, yeah<br>" +
    "<strong>bridge</strong><br>" +
    "You do know I<br>" +
    "I tried my best, yeah<br>" +
    "Only to fuck up<br>" +
    "Going in and out of love<br>" +
    "Burning rubber, ridin\' solo, yeah, head too fucked up<br>" +
    "Tell me what you really want from me, is that too much?<br>" +
    "Is that too much? Is that too much, oh?<br>" +
    "<strong>chorus</strong><br>" +
    "\'Cause I\'ve been so low for so long<br>" +
    "Oh-oh-oh, yeah, yeah<br>" +
    "\'Cause I\'ve been so low for so long<br>" +
    "Oh, oh-oh, yeah, yeah, yeah<br>" +
    "<strong>outro</strong><br>" +
    "(So low...)<br>" +
    "(So low...)<br>" +
    "Writer(s): Ciara Simms";
    document.getElementById('musicname').textContent = "So Low (Slowed)";
    document.getElementById('music').textContent = "So Low (Slowed)";
    document.getElementById('musicartist').textContent = "CPRCRN";
    document.getElementById('msgartist').textContent = "CPRCRN is a revolutionary artist carving a niche in the music world with a distinctive ability to blend and transcend genres. This elusive musician creates tracks that defy categorization, offering listeners a fresh, genre-bending sound with every release. CPRCRN’s music is a seamless fusion of unexpected styles, combining elements from various genres to craft tracks that are both innovative and immersive. Each song is a journey into uncharted sonic territory, captivating audiences with its originality and depth. Despite the anonymity shrouding CPRCRN, the artist's work speaks volumes, resonating with listeners who crave music that breaks the mold and offers something truly new.";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://yt3.googleusercontent.com/mCCIUkIKVFtHDMbty3_UGrUOuucwKnIUVVXwVV_Ab2ivPjszq7b2jlBs0vcNnkex3g06dbuS-A=s160-c-k-c0x00ffffff-no-rj"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "So Low<br>Interpretada por<br><br>CORBAL, CPRCRN, Shiloh Dynasty.<br>Composta por<br><br>Ciara Nicole Simms, CORBAL Records, Dibyo Choudhury.";
    document.getElementById('video-background').src = '';
    mudarFundo('musica10');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/so low (Slowed) - GenriX - Topic.m4a"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();

} else if (musica === '11') {
    // Muda para a primeira música
    let texto = "Música Sem Letra!";
    document.getElementById('musicname').textContent = "BLUE HORIZON FUNK";
    document.getElementById('music').textContent = "BLUE HORIZON FUNK";
    document.getElementById('musicartist').textContent = "NXGHT!";
    document.getElementById('msgartist').textContent = "Aspiring multi-genre producer striving to become great 💜 I hope you enjoy my music as much as I love making it. Jesus is King.";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://yt3.googleusercontent.com/H_LMiHQvmMNhxuL27AmcMJkcXFFV9SnKzW_IBM3jjByZjA4OIWPmoCcBDF1x08zT98jh0MEq=s160-c-k-c0x00ffffff-no-rj"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "BLUE HORIZON FUNK<br>Interpretada por<br><br>DJ ANXVAR, DJ ZAP, NXGHT!<br>Composta por<br><br>DJ ANXVAR DJ ANXVAR, DJ ZAP DJ ZAP, NXGHT! NXGHT!<br>Produzida por<br><br>NXGHT!, DJ ANXVAR DJ ANXVAR, DJ ZAP<br>Fonte: NXGHT!, DJ ZAP.";
    document.getElementById('video-background').src = '';
    mudarFundo('musica11');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/BLUE HORIZON FUNK - NXGHT!.m4a"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();

} else if (musica === '12') {
    // Muda para a primeira música
    let texto = "<strong>verse</strong><br>" +
    "Uma meta a cumprir<br>" +
    "Pra chegar no final<br>" +
    "Sei que se eu não conseguir<br>" +
    "Vai ser letal, letal<br>" +
    "Colete as peças (letal, letal)<br>" +
    "Bata sua meta (letal, letal)<br>" +
    "Faça tudo certo, finja que é normal<br>" +
    "Ou nossa companhia pode se tornar letal<br>" +
    "<strong>verse</strong><br>" +
    "Já selecionei a Lua que iremos<br>" +
    "E dessa vez, não podemos perder tempo<br>" +
    "Alguém sabe o quanto nós ainda temos?<br>" +
    "Não, não, não, não, não<br>" +
    "<strong>pre-chorus</strong><br>" +
    "Sei que da última vez nós morremos<br>" +
    "Mas eu sei que juntos, nós conseguiremos<br>" +
    "Então parem de agir como animais<br>" +
    "Se verem algo, corram sem olhar pra trás<br>" +
    "<strong>chorus</strong><br>" +
    "Então vasculhem essas terras<br>" +
    "Coletem esses lixos<br>" +
    "Temos que bater a meta<br>" +
    "Ou seremos despedidos<br>" +
    "<strong>verse</strong><br>" +
    "Façam tudo antes do anoitecer<br>" +
    "Por que ninguém tá respondendo aqui?<br>" +
    "Eu acho que só sobrou eu e você<br>" +
    "Uh, tô indo aí<br>" +
    "<strong>verse</strong><br>" +
    "Orbitando outro planeta<br>" +
    "Tentando não perder a cabeça<br>" +
    "Propulsores ativados, então vamos coletar<br>" +
    "Porque no espaço, ninguém vai te ouvir gritar<br>" +
    "<strong>chorus</strong><br>" +
    "Uma meta a cumprir<br>" +
    "Pra chegar no final<br>" +
    "Sei que se eu não conseguir<br>" +
    "Vai ser letal, letal<br>" +
    "Colete as peças (letal, letal)<br>" +
    "Bata sua meta (letal, letal)<br>" +
    "Faça tudo certo, finja que é normal<br>" +
    "Ou nossa companhia pode se tornar letal<br>" +
    "<strong>verse</strong><br>" +
    "Ligaram o walkie talkie? Ainda não liguei<br>" +
    "Como que cê tá falando? Vish, não sei<br>" +
    "Vai ser impossível bater essa meta<br>" +
    "Com essa equipe de patetas<br>" +
    "<strong>chorus</strong><br>" +
    "Vamos voar<br>" +
    "Comprei uma lanterna pro nosso caminho iluminar<br>" +
    "Então bem-vindo a companhia, acabamos de pousar<br>" +
    "Vendam todo esse lixo, vamos continuar<br>" +
    "<strong>chorus</strong><br>" +
    "A meta dobrou, o jogo continuou<br>" +
    "Primeira manhã, bem-vindos a titan<br>" +
    "Alguém não tomou cuidado onde piso-<br>" +
    "Todos morreram? Ah não<br>" +
    "<strong>outro</strong><br>" +
    "Último dia, não podemos falhar<br>" +
    "Leram todos os avisos?<br>" +
    "Nem metade da meta conseguimos completar<br>" +
    "Estão demitidos<br>" +
    "<strong>chorus</strong><br>" +
    "Orbitando outro planeta<br>" +
    "Tentando não perder a cabeça<br>" +
    "Propulsores ativados, então vamos coletar<br>" +
    "Porque no espaço, ninguém vai te ouvir gritar<br>" +
    "<strong>outro</strong><br>" +
    "Uma meta a cumprir<br>" +
    "Pra chegar no final<br>" +
    "Sei que se eu não conseguir<br>" +
    "Vai ser letal, letal<br>" +
    "Colete as peças (letal, letal)<br>" +
    "Bata sua meta (letal, letal)<br>" +
    "Faça tudo certo, finja que é normal<br>" +
    "Ou nossa companhia pode se tornar letal<br>" +
    "Writer(s): Iron Master / Papyrus da Batata.";
    
    document.getElementById('musicname').textContent = "Companhia Letal";
    document.getElementById('music').textContent = "Companhia Letal";
    document.getElementById('musicartist').textContent = "Iron Master";
    document.getElementById('msgartist').textContent = "Danilo Trujillano, mais conhecido como Iron Master é um jovem de 22 anos que se tornou a mais nova revelação dentro da cena Geek no Brasil. Começou a fazer músicas com uma brincadeira entre amigos e após a segunda postagem, se tornou viral nas demais plataformas com a famosa frase 'Raça absoluta, além da consciência'. A partir deste momento, Iron começou a produzir músicas voltadas para o público Nerd/Geek, Gamer e Amante de desenhos, expandindo o nicho Geek, que até então, era voltado para a produção de músicas sobre animes. Suas músicas variam desde Rock à Jazz, contando com guitarras, batidas eletrônicas e muito mais. Sua música mais popular é o rap da animação 'Ben 10 Força Alienígena' lançada em 24 de Dezembro de 2020. Atualmente Iron tem uma linha de camisetas com as frases mais marcantes de suas músicas mais famosas e vem se aprimorando cada vez mais para abranger toda a comunidade. O canal Iron Master conta com mais de 1 milhão de inscritos e mais de 270 milhões de visualizações, recebendo feedbacks e comentários constantes do público da comunidade geek.";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://yt3.googleusercontent.com/LbhsmbjV50pJngJrXoCPlwLNvh6dsNhSAepCZHGGL92Vexks7GxPuvR_eztGYW7-uJYiSa2C2w=s160-c-k-c0x00ffffff-no-rj"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "Companhia Letal | Lethal CompanyInterpretada por<br><br>Iron Master<br>Composta por<br><br>Antonio ClareteDanilo Trujillano<br>Produzida por<br><br>-<br>Fonte: 3001695 Records DK.";
    document.getElementById('video-background').src = 'Material/Companhia Letal  Lethal Company  Iron Master.mp4';
    mudarFundo('musica12');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/Companhia Letal   Lethal Company - Iron Master.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();

} else if (musica === '13') {
    // Muda para a primeira música
    let texto = "<strong>verse</strong><br>" +
    "Só eu tento encontrar respostas<br>" +
    "Pra gente poder parar de sobreviver<br>" +
    "Naquele dia, além das portas<br>" +
    "Foi quando conheci você<br>" +
    "<strong>verse</strong><br>" +
    "Robô de desmanche perto de mim vindo<br>" +
    "Um tiro não basta, pois se regenera<br>" +
    "Rebootando a mente de um Robô Assassino<br>" +
    "Mandados por humanos vindos da Terra<br>" +
    "<strong>verse</strong><br>" +
    "Não há nada a questionar<br>" +
    "Então me responda<br>" +
    "Por que a nave vem, mas não volta?<br>" +
    "Reparo problemas<br>" +
    "<strong>verse</strong><br>" +
    "Essa porta precisa fechar, mas não vai<br>" +
    "Por favor, tem que me ajudar, não, pai!<br>" +
    "Vejo essa chacina, então<br>" +
    "Questiono se isso é certo ou não<br>" +
    "<strong>verse</strong><br>" +
    "Seria a desculpa perfeita pra me eliminar<br>" +
    "Mas Uzi não deixaria isso acontecer<br>" +
    "N, Robôs Operários não devemos matar<br>" +
    "Mas sim humanos na Terra que estão no poder!<br>" +
    "<strong>verse</strong><br>" +
    "Não dá mais<br>" +
    "Pra ignorar os motivos que me fazem enxergar além<br>" +
    "Pois sempre há maldade no bom<br>" +
    "E no mal, há bondade também<br>" +
    "<strong>verse</strong><br>" +
    "Corpo do Robô Assassino despertou<br>" +
    "Pessoas desaparecendo, mas não é ele<br>" +
    "E quem diria, um Robô Operário<br>" +
    "Poderia obter tamanho poder<br>" +
    "<strong>verse</strong><br>" +
    "Mas também tenho esse dom, precisamos de respostas<br>" +
    "Descontrole, maldição, está tudo bem agora<br>" +
    "Tentaram apagar suas memórias no fim<br>" +
    "A culpa disso tudo é dela? Cyn? Sim!<br>" +
    "<strong>verse</strong><br>" +
    "Uma solução absoluta<br>" +
    "Em outro planeta, preciso de ajuda<br>" +
    "Então N, eu já cansei desses seus jogos<br>" +
    "Mandei vocês pra me darem pilhas de corpos<br>" +
    "<strong>verse</strong><br>" +
    "Apaguei suas memórias, pois causamos a guerra<br>" +
    "Fiz matarem humanos e destruí a Terra<br>" +
    "Não existe mais a sua amiga Tessa<br>" +
    "Corte a cabeça, pois roubei o corpo dela<br>" +
    "<strong>verse</strong><br>" +
    "Dentro da sua cabeça<br>" +
    "Correção destruída por Uzi<br>" +
    "N tem que sair do planeta<br>" +
    "Pegue a chave, não olhe pra trás<br>" +
    "<strong>verse</strong><br>" +
    "Dentro da sua cabeça<br>" +
    "Correção destruída por Uzi<br>" +
    "Aonde isso vai?<br>" +
    "<strong>verse</strong><br>" +
    "Não pode usar os seus poderes<br>" +
    "Pois se usar, eu posso te controlar<br>" +
    "Mãos te cercam por essas paredes<br>" +
    "Pode se esconder, mas eu vou te achar<br>" +
    "<strong>pre-chorus</strong><br>" +
    "A única solução é lutarmos juntos<br>" +
    "Mais do que amigos, vamos salvar o nosso mundo<br>" +
    "<strong>verse</strong><br>" +
    "Controle absoluto, prevendo seu algoritmo<br>" +
    "Cyn não pode ser parada, é só seguir o ritmo<br>" +
    "Não pode ser anulada? Então vai ser consumida<br>" +
    "Duas mentes em um só corpo, um corpo com duas vidas!<br>" +
    "<strong>pre-chorus</strong><br>" +
    "Não dá mais<br>" +
    "Pra ignorar os motivos que me fazem enxergar além<br>" +
    "Pois sempre há maldade no bom<br>" +
    "E no mal, há bondade também<br>" +
    "<strong>chorus</strong><br>" +
    "Não dá mais<br>" +
    "Pra ignorar os motivos que me fazem enxergar além<br>" +
    "Pois sempre há maldade no bom<br>" +
    "E no mal, há bondade também.<br>";


    
    document.getElementById('musicname').textContent = "Solução Absoluta | Murder Drones.";
    document.getElementById('music').textContent = "Solução Absoluta | Murder Drones.";
    document.getElementById('musicartist').textContent = "Iron Master";
    document.getElementById('msgartist').textContent = "Danilo Trujillano, mais conhecido como Iron Master é um jovem de 22 anos que se tornou a mais nova revelação dentro da cena Geek no Brasil. Começou a fazer músicas com uma brincadeira entre amigos e após a segunda postagem, se tornou viral nas demais plataformas com a famosa frase 'Raça absoluta, além da consciência'. A partir deste momento, Iron começou a produzir músicas voltadas para o público Nerd/Geek, Gamer e Amante de desenhos, expandindo o nicho Geek, que até então, era voltado para a produção de músicas sobre animes. Suas músicas variam desde Rock à Jazz, contando com guitarras, batidas eletrônicas e muito mais. Sua música mais popular é o rap da animação 'Ben 10 Força Alienígena' lançada em 24 de Dezembro de 2020. Atualmente Iron tem uma linha de camisetas com as frases mais marcantes de suas músicas mais famosas e vem se aprimorando cada vez mais para abranger toda a comunidade. O canal Iron Master conta com mais de 1 milhão de inscritos e mais de 270 milhões de visualizações, recebendo feedbacks e comentários constantes do público da comunidade geek.";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://yt3.googleusercontent.com/LbhsmbjV50pJngJrXoCPlwLNvh6dsNhSAepCZHGGL92Vexks7GxPuvR_eztGYW7-uJYiSa2C2w=s160-c-k-c0x00ffffff-no-rj"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "Solução Absoluta | Murder Drones<br><br>Interpretada por<br>Iron Master, Mistery<br><br>Composta por<br>Antonio Clarete, Danilo Trujillano<br></br>Fonte: 3001695 Records DK.";
    document.getElementById('video-background').src = 'Material/Solução Absoluta  Murder Drones  Iron Master.mp4';
    mudarFundo('musica13');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/Solução Absoluta   Murder Drones (Nightcore) - Iron Master.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();

} else if (musica === '14') {
    // Muda para a primeira música
    let texto = "<strong>verse</strong><br>" +
    "Eu não sei onde estou mais<br>" +
    "Acordo após o acidente<br>" +
    "Como ela foi capaz?<br>" +
    "Ouço falar de Criaturas Sorridentes<br>" +
    "<strong>verse</strong><br>" +
    "Então vá até o Berçário<br>" +
    "Funciona como uma creche<br>" +
    "Talvez seja necessário<br>" +
    "Melhorar seu GrabPack<br>" +
    "<strong>pre-chorus</strong><br>" +
    "Mas esteja avisado<br>" +
    "Algo que ninguém esquece<br>" +
    "Que quem manda no Berçário<br>" +
    "É o CatNap<br>" +
    "<strong>chorus</strong><br>" +
    "Eu não sei como sair<br>" +
    "Caindo em pesadelos<br>" +
    "Sinto que minha mente caiu<br>" +
    "Mas meu corpo já levantou<br>" +
    "<strong>verse</strong><br>" +
    "Eu não sei como sair<br>" +
    "Caindo em pesadelos<br>" +
    "Sinto que minha mente caiu<br>" +
    "Mas meu corpo já levantou<br>" +
    "<strong>pre-chorus</strong><br>" +
    "Você já se perguntou<br>" +
    "O que precisamos no mundo?<br>" +
    "O dinheiro já se esgotou<br>" +
    "Compreensão é tão profundo<br>" +
    "<strong>chorus</strong><br>" +
    "Consegui ver a resposta no sorriso<br>" +
    "Das crianças<br>" +
    "Esperança!<br>" +
    "Então para protegê-las, fiz o que foi necessário<br>" +
    "O Berçário<br>" +
    "<strong>verse</strong><br>" +
    "Você está caindo<br>" +
    "Em meio a escuridão (escuridão)<br>" +
    "Os velhos sorrisos<br>" +
    "Escondidos no porão (no porão)<br>" +
    "O que abandonou um dia, terá que enfrentar<br>" +
    "E a Hora da Alegria de novo volta<br>" +
    "Você veio ao nosso mundo, então vamos todos juntos<br>" +
    "Cair em um Sono Profundo<br>" +
    "<strong>chorus</strong><br>" +
    "Um Sono Profundo<br>" +
    "Vivemos num Sono Profundo<br>" +
    "Nosso mundo, nosso mundo<br>" +
    "Existe em um Sono Profundo<br>" +
    "<strong>verse</strong><br>" +
    "Recebo uma ajuda interna<br>" +
    "Até que chegou em boa hora<br>" +
    "Vasculhe o lugar e veja<br>" +
    "Que tal voltarmos pra escola?<br>" +
    "<strong>pre-chorus</strong><br>" +
    "Desculpe pela nossa queda<br>" +
    "Só que eu não tive escolha<br>" +
    "Você merece uma explicação<br>" +
    "Depois de passar por tanta coisa<br>" +
    "<strong>chorus</strong><br>" +
    "Você matou o Huggy<br>" +
    "Você matou a Mommy<br>" +
    "Pode nos livrar de todo esse mal<br>" +
    "Juntos, mataremos o original<br>" +
    "<strong>verse</strong><br>" +
    "Eles derramaram sangue<br>" +
    "O Protótipo é seu nome<br>" +
    "E CatNap acredito que seja<br>" +
    "O obstáculo final<br>" +
    "<strong>pre-chorus</strong><br>" +
    "Então no Berçário agora<br>" +
    "Só restaram histórias e velhas memórias<br>" +
    "Debaixo dos escombros, como dizem os contos<br>" +
    "O velho CatNap se tornou um monstro!<br>" +
    "<strong>chorus</strong><br>" +
    "Tem que ter como escapar<br>" +
    "Antes que me encontre<br>" +
    "Se estiver com fome<br>" +
    "Se for como estão a falar<br>" +
    "O CatNap é pior que a Mommy!<br>" +
    "<strong>verse</strong><br>" +
    "O que?<br>" +
    "Você é o anjo da Poppy?<br>" +
    "Olhe o estado em que tudo está<br>" +
    "Ele está com fome<br>" +
    "Não restou nada mais pra salvar<br>" +
    "<strong>pre-chorus</strong><br>" +
    "Eu sou o último que sobrou<br>" +
    "Eu sou, condenado a tanta dor<br>" +
    "Eu sou, CatNap te encontrou<br>" +
    "Então agora, a presa foge do seu predador!<br>" +
    "<strong>chorus</strong><br>" +
    "Ninguém nesse lugar tem mais sossego<br>" +
    "Está caindo! Caindo! Em um pesadelo<br>" +
    "Estou sentindo! Está vindo! Deus está vendo<br>" +
    "Contra ele, eu me rendo<br>" +
    "<strong>pre-chorus</strong><br>" +
    "Você já se perguntou<br>" +
    "Sobre a Hora da Alegria?<br>" +
    "O que a desencadeou?<br>" +
    "Basta assistir essa fita<br>" +
    "<strong>chorus</strong><br>" +
    "Todos foram mortos, culpados e inocentes<br>" +
    "Foram devorados, sem restar sobreviventes<br>" +
    "O Huggy, a Mommy, até o CatNap<br>" +
    "Com o Protótipo não será diferente<br>" +
    "<strong>verse</strong><br>" +
    "Você está caindo<br>" +
    "Em meio a escuridão (escuridão)<br>" +
    "Os velhos sorrisos<br>" +
    "Escondidos no porão (no porão)<br>" +
    "O que abandonou um dia, terá que enfrentar<br>" +
    "E a Hora da Alegria de novo voltar<br>" +
    "Você veio ao nosso mundo, então vamos todos juntos<br>" +
    "Cair em um Sono Profundo<br>" +
    "<strong>outro</strong><br>" +
    "Ô, pequeno gato roxo, que me pôs para dormir<br>" +
    "Sinto pelos seus amigos que não moram mais aqui<br>" +
    "Ô, pequeno gato roxo, que me pôs em pesadelos<br>" +
    "Nas mãos de quem o salvará<br>" +
    "Tece a morte em seus dedos<br>";


    
    document.getElementById('musicname').textContent = "Sono Profundo | Poppy Playtime (Capítulo 3).";
    document.getElementById('music').textContent = "Sono Profundo | Poppy Playtime (Capítulo 3).";
    document.getElementById('musicartist').textContent = "Iron Master";
    document.getElementById('msgartist').textContent = "Danilo Trujillano, mais conhecido como Iron Master é um jovem de 22 anos que se tornou a mais nova revelação dentro da cena Geek no Brasil. Começou a fazer músicas com uma brincadeira entre amigos e após a segunda postagem, se tornou viral nas demais plataformas com a famosa frase 'Raça absoluta, além da consciência'. A partir deste momento, Iron começou a produzir músicas voltadas para o público Nerd/Geek, Gamer e Amante de desenhos, expandindo o nicho Geek, que até então, era voltado para a produção de músicas sobre animes. Suas músicas variam desde Rock à Jazz, contando com guitarras, batidas eletrônicas e muito mais. Sua música mais popular é o rap da animação 'Ben 10 Força Alienígena' lançada em 24 de Dezembro de 2020. Atualmente Iron tem uma linha de camisetas com as frases mais marcantes de suas músicas mais famosas e vem se aprimorando cada vez mais para abranger toda a comunidade. O canal Iron Master conta com mais de 1 milhão de inscritos e mais de 270 milhões de visualizações, recebendo feedbacks e comentários constantes do público da comunidade geek.";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://yt3.googleusercontent.com/LbhsmbjV50pJngJrXoCPlwLNvh6dsNhSAepCZHGGL92Vexks7GxPuvR_eztGYW7-uJYiSa2C2w=s160-c-k-c0x00ffffff-no-rj"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "Sono Profundo | Poppy Playtime (Capítulo 3)<br><br>Interpretada por<br>Iron Master<br><br>Composta por<br>Antonio Clarete<br>Danilo Trujillano<br><br>Fonte: 3001695 Records DK.";
    document.getElementById('video-background').src = 'Material/Sono Profundo  Poppy Playtime (Capítulo 3)  Iron Master.mp4';
    mudarFundo('musica14');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/Sono Profundo   Poppy Playtime (Capítulo 3) - Iron Master.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();


} else if (musica === '15') {
    // Muda para a primeira música
    let texto = "<strong>verse</strong><br>" +
"よ！ じゃぁ 行くぞ！ ジャンケンポン！<br>" +
"They tell me, 'Keep it simple,' I tell them, 'Take it slow'<br>" +
"I feed and water an idea so I let it grow<br>" +
"I tell them, 'Take it easy,' they laugh and tell me, 'No'<br>" +
"It's cool, but I don't see them laughin' at my money, though<br>" +
"They spittin' facts at me, I'm spittin' tracks, catch me?<br>" +
"I'm spinning gold out my records, know you can't combat me<br>" +
"<strong>verse</strong><br>" +
"They tell me, 'Jesus walks,' I tell them, 'Money talks'<br>" +
"Bling got me chill, 'cause I'm living in an icebox<br>" +
"They tell me I've been sleepin', I say, 'I'm wide awake'<br>" +
"Tracks hot and ready, so they call me Mr. Easy-Bake<br>" +
"They say the grass is greener, I think my grass is dank<br>" +
"Drivin' with a drank on an empty tank to the bank<br>" +
"<strong>pre-chorus</strong><br>" +
"Do you feel me? Take a look inside my brain<br>" +
"The people always different, but it always feels the same<br>" +
"That's the real me, pop the champagne<br>" +
"The haters wanna hurt me, and I'm laughin' at the pain<br>" +
"<strong>chorus</strong><br>" +
"Stayin' still, eyes closed<br>" +
"Let the world just pass me by<br>" +
"Pain pills, nice clothes<br>" +
"If I fall, I think I'll fly<br>" +
"Touch me, Midas<br>" +
"Make me part of your design<br>" +
"None to guide us<br>" +
"I feel fear for the very last time<br>" +
"<strong>verse</strong><br>" +
"They tell me that I'm special, I smile and shake my head<br>" +
"I'll give them stories to tell friends about the things I said<br>" +
"They tell me I'm so humble, I say, 'I'm turning red'<br>" +
"They let me lie to them and don't feel like they've been misled<br>" +
"They give so much to me, I'm losing touch, get me?<br>" +
"Served on a silver platter, ask for seconds, they just let me<br>" +
"<strong>verse</strong><br>" +
"They tell me I'm a god, I'm lost in the façade<br>" +
"Six feet off the ground at all times, I think I'm feelin' odd<br>" +
"No matter what I make, they never see mistakes<br>" +
"Makin' so much bread, I don't care that they're just being fake<br>" +
"They tell me they're below me, I act like I'm above<br>" +
"The people blend together, but I would be lost without their love<br>" +
"<strong>pre-chorus</strong><br>" +
"Can you heal me? Have I gained too much?<br>" +
"When you become untouchable, you're unable to touch<br>" +
"Is there a real me? Pop the champagne<br>" +
"It hurts me just to think, and I don't do pain<br>" +
"<strong>chorus</strong><br>" +
"Stayin' still, eyes closed<br>" +
"Let the world just pass me by<br>" +
"Pain pills, nice clothes<br>" +
"If I fall, I think I'll fly<br>" +
"Touch me, Midas<br>" +
"Make me part of your design<br>" +
"None to guide us<br>" +
"I feel fear for the very last time<br>" +
"<strong>outro</strong><br>" +
"Lay still, restless<br>" +
"Losing sleep while I lose my mind<br>" +
"All thrill, no stress<br>" +
"All my muses left behind<br>" +
"World is below<br>" +
"So high up, I'm near-divine<br>" +
"Lean in, let go<br>" +
"I feel fear for the very last time<br>";
    
    document.getElementById('musicname').textContent = "My Ordinary Life";
    document.getElementById('music').textContent = "My Ordinary Life";
    document.getElementById('musicartist').textContent = "The Living Tombstone";
    document.getElementById('msgartist').textContent = "The Living Tombstone is a musical project which takes elements from the electronic dance genres of today and combines it with rock genre influences. Founded by music producer and vocalist Yoav Landau, and partnered with songwriter and vocalist Sam Haft, TLT has grown a cross-platform following of over 10 million fans and over 3 billion streams.  The characters of TLT, titled 'the Tombsonas' are: 🧡zero_one 💚Rust ❤️Armstrong 💜Tesla 💙Doc  On TLT's 'zero_one' record, our drummer is Maxime Cholley, bassist is Guy Berenfeld, and guitarist is Or 'Orko' Cohen.You may reach us at inquiries@thelivingtombstone.com.";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://yt3.ggpht.com/-Gxy25qYOrKQ/AAAAAAAAAAI/AAAAAAAAAAA/eVEXzALqfVU/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('https://images.squarespace-cdn.com/content/v1/571d536ccf80a16cec8796b1/1649794679531-6X606FWD6J89V7ZNDCCF/Screen+Shot+2022-04-12+at+1.01.19+PM+(2).png?format=2500w')"; // Foto do artista
    document.getElementById('credits').innerHTML = "My Ordinary Life<br>Interpretada por<br><br>The Living Tombstone<br>Composta por<br><br>The Living Tombstone<br>Fonte: Ghost Pixel.";
    document.getElementById('video-background').src = 'Material/My Ordinary Life-The Living Tombstone.mp4';
    mudarFundo('musica15');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/My Ordinary Life - The Living Tombstone.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();


} else if (musica === '16') {
    // Muda para a primeira música
    let texto = `<strong>Intro</strong><br>
Come along, down with me<br>
You're not alone, you will see<br>
The children, they have each other<br>
And each other is all they need<br><br>

<strong>Verse</strong><br>
In the hour of joy in this paradise<br>
I thought about all that could have been<br>
If we had never done the things we did<br>
If we had realized all our sins<br><br>

<strong>Hook</strong><br>
Come along, down with me (come along, come a-, come along)<br>
You're not alone, you will see (come along, come a-, come along)<br>
We children, we have each other<br>
And each other is all we need<br>
In the hour of joy, in the hour of joy<br><br>

<strong>Pre-chorus</strong><br>
In the hour of joy, in the hour of joy<br>
In the hour of joy, in the hour of joy<br>
In the hour of joy, in the hour of joy<br>
In the hour of joy, in the hour of joy<br><br>

<strong>Chorus</strong><br>
Artificial façade from a fraud of a God<br>
All due to the path that we trod<br>
We just wanted to heal, but now our nightmares are real<br>
And now we'll never wake up, for we've torn apart<br>
We want freedom, freedom<br>
Freedom, freedom, freedom (we all fall down)<br>
We'll sleep well now, dream dreams knocked out<br>
New blooms when Playtime sprouts<br><br>

<strong>Verse</strong><br>
Come along, go to sleep (come along, come a-, come along)<br>
And leave here without a trace (come along, come a-, come along)<br>
Though life in the shadows isn't much<br>
It's better than living in a cage<br><br>

<strong>Bridge</strong><br>
Can you see us?<br>
Can you hear us?<br><br>

<strong>Chorus</strong><br>
Artificial façade from a fraud of a God<br>
All due to the path that we trod (we trod)<br>
We just wanted to heal, but now our nightmares are real<br>
And now we'll never wake up, for we've torn apart<br>
We want freedom, freedom<br>
Freedom, freedom, freedom (we all fall down)<br>
We'll sleep well now, dream dreams knocked out<br>
New blooms when Playtime sprouts<br>
Artificial façade from a fraud of a God (la-la-la-la, la, la-la)<br>
All due to the path that we trod<br>
We just wanted to heal, but now our nightmares are real (la-la-la-la, la, la-la)<br>
And now we'll never wake up, we've torn apart<br><br>

<strong>Outro</strong><br>
Artificial façade (la-la-la-la, la, la-la)<br>
(La-la-la-la, la, la-la)<br><br>

<strong>Writer(s): Charles Green</strong>
`;
    
    document.getElementById('musicname').textContent = "Sleep Well";
    document.getElementById('music').textContent = "Sleep Well";
    document.getElementById('musicartist').textContent = "CG5";
    document.getElementById('msgartist').textContent = "Project U MOVE. New EP coming soon.";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://yt3.ggpht.com/-JUwGjh_bt4w/AAAAAAAAAAI/AAAAAAAAAAA/ZvAcb9w52ME/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('https://pmstudio.com/pmstudio/images/CG5-1.jpg')"; // Foto do artista
    document.getElementById('credits').innerHTML = "Sleep Well<br><br>Interpretada por<br>Cami-Cat, CG5, Chi-Chi, Kathy-Chan<br><br>Composta por<br>CG5, Zachary Preciado<br><br>Produzida por<br>CG5<br><br>Fonte: CG5 LLC.";
    document.getElementById('video-background').src = 'Material/CG5 - Sleep Well (from Poppy Playtime Chapter 3).mp4';
    mudarFundo('musica16');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/Sleep Well - Cg5.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();


} else if (musica === '17') {
    // Muda para a primeira música
    let texto = "Letra Disponível em Breve!";
    
    document.getElementById('musicname').textContent = "Se Paciente Funk";
    document.getElementById('music').textContent = "Se Paciente Funk";
    document.getElementById('musicartist').textContent = "RD12";
    document.getElementById('msgartist').textContent = "mgmt: go@0to8.us Hola soy RD12 xd kqjwkajjajwjajw |  https://www.tiktok.com/@rd12p5?_t=ZS-8tsDqfYXp33&_r=1";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://i.scdn.co/image/ab6761610000e5eb2d2a5655d5644aa7b98d2f83"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "Se Paciente Funk<br><br>Interpretada por<br>RD12<br><br>Composta por<br>RD12<br><br>Fonte: 0to8.";
    document.getElementById('video-background').src = '';
    mudarFundo('musica17');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/Se Paciente Funk - RD12.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();


} else if (musica === '18') {
    // Muda para a primeira música
    let texto = "Letra Disponível em Breve!";
    
    document.getElementById('musicname').textContent = "REINDEER";
    document.getElementById('music').textContent = "REINDEER";
    document.getElementById('musicartist').textContent = "Dj Samir";
    document.getElementById('msgartist').textContent = "Dj Samir Produtor musical 🎶 ◇ 🎥 ʏᴏᴜᴛᴜʙᴇ | + 100ᴋ";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://i.scdn.co/image/ab6761610000e5eb270d26c1be427fd625aa56dd"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "REINDEER<br><br>Interpretada por<br>Dj Samir, fennecxx<br><br>Composta por<br>Dj Samir, fennecxx<br><br>Produzida por<br>Dj Samir, fennecxx<br><br>Fonte: Dj Samir";
    document.getElementById('video-background').src = '';
    mudarFundo('musica18');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/REINDEER - Dj Samir.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();


} else if (musica === '19') {
    // Muda para a primeira música
    let texto = "<strong>[Intro]</strong><br>Da-da-da-da, da-da, da-da-daa<br>Da-da-da, daa<br>Oh-oh, oh-oh<br><br><strong>[Verse 1]</strong><br>Fading away in the sun today<br>I’m running the way I wanna run<br>See the light outside my window<br> (oh-ho)<br>See the grass blow in the breeze<br><br><strong>[Refrain]</strong><br>Can I get it please?<br><br><strong>[Chorus]</strong><br>Take a break from the killing fields<br>Drop your worries in the sand<br><br><strong>[Verse 2]</strong><br>It’s a brand new day<br>The world awaits for us to make the<br> most of everything (everything)<br>Feel the warmth outside my window<br> (oh-oh-oh-oh-oh)<br>See the light shine through the trees<br><br><strong>[Refrain]</strong><br>Can I get it please?<br>See upcoming pop shows<br>Get tickets for your favorite artists<br>You might also like<br>The Super Smash Bros Ultimate Cypher<br>NerdOut<br>Abracadabra<br>Lady Gaga<br>NOKIA<br>Drake<br><br><strong>[Chorus]</strong><br>Take a break from the killing fields<br> (from the killing fields)<br>Drop your worries in the sand (in the sand)<br>Take a break to just be still (just be still, oh-oh-oh-oh)<br>Drop the burdens from your hands<br> (from your hands)<br><br><strong>[Outro]</strong><br>Take a break from the killing fields<br>Drop your worries in the sand<br><br><strong>Writer(s): ChewieCatt</strong><br><h3 style='color: white; border-radius: 5px; border: purple solid 5px; width: auto;'>Digitalizado por: <strong>(Sryxs)</strong><h3>";
    
    document.getElementById('musicname').textContent = "Killing Fields";
    document.getElementById('music').textContent = "Killing Fields";
    document.getElementById('musicartist').textContent = "ChewieCatt";
    document.getElementById('msgartist').textContent = "Just someone making his way through life one song at a time...";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://i.scdn.co/image/ab6761610000e5eba57c71ff631d56e9cf418d73"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('https://cdn.discordapp.com/splashes/711677090860367974/6413be97479a4445b853d2b02216d176.jpg?size=1024')"; // Foto do artista
    document.getElementById('credits').innerHTML = "Killing Fields<br><br>Interpretada por<br>ChewieCatt<br><br>Composta por<br>Matthew Moreland<br><br>Fonte: CCG Records";
    document.getElementById('video-background').src = '';
    mudarFundo('musica19');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/Killing Fields - ChewieCatt.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();


} else if (musica === '20') {
    // Muda para a primeira música
    let texto = "Música sem letra!";
    
    document.getElementById('musicname').textContent = "New Jeans (Jersey Club)";
    document.getElementById('music').textContent = "New Jeans (Jersey Club)";
    document.getElementById('musicartist').textContent = "Dxrkaii";
    document.getElementById('msgartist').textContent = "";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://i.scdn.co/image/ab67616d0000b273953e23b01375bffa8b75e380"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "";
    document.getElementById('video-background').src = '';
    mudarFundo('musica20');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/New Jeans (Jersey Club) - Dxrkaii.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();


} else if (musica === '21') {
    // Muda para a primeira música
    let texto = "Música sem letra!";
    
    document.getElementById('musicname').textContent = "BOUNCE FUNK";
    document.getElementById('music').textContent = "BOUNCE FUNK";
    document.getElementById('musicartist').textContent = "Sapfir";
    document.getElementById('msgartist').textContent = "";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://i.scdn.co/image/ab6761610000e5ebfba1dc4cb653d3fe0972b11d"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "";
    document.getElementById('video-background').src = '';
    mudarFundo('musica21');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/BOUNCE FUNK - Sapfir.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();


} else if (musica === '22') {
    // Muda para a primeira música
    let texto = "Música sem letra!";
    
    document.getElementById('musicname').textContent = "Cuando Se Te Moja La Tarea";
    document.getElementById('music').textContent = "Cuando Se Te Moja La Tarea";
    document.getElementById('musicartist').textContent = "LDRR";
    document.getElementById('msgartist').textContent = "";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://i.scdn.co/image/ab6761610000e5ebce74c325cb07fc695be87d53"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "";
    document.getElementById('video-background').src = '';
    mudarFundo('musica22');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/Cuando Se Te Moja La Tarea - LDRR.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();


} else if (musica === '23') {
    // Muda para a primeira música
    let texto = "Música sem letra!";
    
    document.getElementById('musicname').textContent = "Cuando Se Te Moja La Tarea 2";
    document.getElementById('music').textContent = "Cuando Se Te Moja La Tarea 2";
    document.getElementById('musicartist').textContent = "LDRR";
    document.getElementById('msgartist').textContent = "";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://i.scdn.co/image/ab6761610000e5ebce74c325cb07fc695be87d53"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "";
    document.getElementById('video-background').src = '';
    mudarFundo('musica23');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/Cuando se te moja la tarea 2 - LDRR.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();


} else if (musica === '24') {
    // Muda para a primeira música
    let texto = "Música sem letra!";
    
    document.getElementById('musicname').textContent = "JOKING";
    document.getElementById('music').textContent = "JOKING";
    document.getElementById('musicartist').textContent = "DJ Samir";
    document.getElementById('msgartist').textContent = "";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://i.scdn.co/image/ab6761610000e5eb270d26c1be427fd625aa56dd"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "";
    document.getElementById('video-background').src = '';
    mudarFundo('musica24');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/JOKING - DJ Samir.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();


} else if (musica === '25') {
    // Muda para a primeira música
    let texto = "Música sem letra!";
    
    document.getElementById('musicname').textContent = "A1 - It's just a burning memory";
    document.getElementById('music').textContent = "A1 - It's just a burning memory";
    document.getElementById('musicartist').textContent = "The Caretaker";
    document.getElementById('msgartist').textContent = "";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://th.bing.com/th/id/R.cb218e4f80586bd0a8ce5d2b546930ae?rik=%2b6EYieeI%2b%2bmxtQ&pid=ImgRaw&r=0"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "";
    document.getElementById('video-background').src = '';
    mudarFundo('musica25');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/A1 - It's just a burning memory - The Caretaker.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();


} else if (musica === '26') {
    // Muda para a primeira música
    let texto = "Música sem letra!";
    
    document.getElementById('musicname').textContent = "MONTAGEM LADRAO";
    document.getElementById('music').textContent = "MONTAGEM LADRAO";
    document.getElementById('musicartist').textContent = "ATLXS";
    document.getElementById('msgartist').textContent = "";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://i.scdn.co/image/ab67616d0000b273bd60de90e1db1750011919ae"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "";
    document.getElementById('video-background').src = '';
    mudarFundo('musica26');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/MONTAGEM LADRAO - ATLXS.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();


} else if (musica === '27') {
    // Muda para a primeira música
    let texto = "Música sem letra!";
    
    document.getElementById('musicname').textContent = "TAKEN";
    document.getElementById('music').textContent = "TAKEN";
    document.getElementById('musicartist').textContent = "DJ Samir";
    document.getElementById('msgartist').textContent = "";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://th.bing.com/th/id/OIP.2gpLkPiVnjC3mOs1KJQx8wHaHa?rs=1&pid=ImgDetMain"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "";
    document.getElementById('video-background').src = '';
    mudarFundo('musica27');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/TAKEN - DJ Samir.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();

} else if (musica === '28') {
    // Muda para a primeira música
    let texto = "Música sem letra!";
    
    document.getElementById('musicname').textContent = "CADDILAC!";
    document.getElementById('music').textContent = "CADDILAC!";
    document.getElementById('musicartist').textContent = "Guga e Carneiro";
    document.getElementById('msgartist').textContent = "";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://i.scdn.co/image/ab67616d00001e02c13cbabb8ce68958a6668810"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "";
    document.getElementById('video-background').src = '';
    mudarFundo('musica28');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/WhatsApp Audio 2025-03-15 at 4.03.33 PM.mpeg"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();

} else if (musica === '29') {
    // Muda para a primeira música
    let texto = "Música sem letra!";
    
    document.getElementById('musicname').textContent = "BUG ZAP";
    document.getElementById('music').textContent = "BUG ZAP";
    document.getElementById('musicartist').textContent = "Peter McConnell";
    document.getElementById('msgartist').textContent = "";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://images.app.goo.gl/82BV2tMzytKyCKod6"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "";
    document.getElementById('video-background').src = '';
    mudarFundo('musica29');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/WhatsApp Audio 2025-03-15 at 4.02.09 PM.mpeg"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();

} else if (musica === '30') {
    // Muda para a primeira música
    let texto = "Música sem letra!";
    
    document.getElementById('musicname').textContent = "stellar";
    document.getElementById('music').textContent = "stellar";
    document.getElementById('musicartist').textContent = ".diedlonely, énouement";
    document.getElementById('msgartist').textContent = "never fade away";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://i1.sndcdn.com/artworks-5e173vCpk2pgsKpf-jkdlfA-t500x500.jpg"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('https://th.bing.com/th/id/OIP.2RQ5j-wDP-vbejfxVqHQ6wHaEK?rs=1&pid=ImgDetMain')"; // Foto do artista
    document.getElementById('credits').innerHTML = "stellar<br><br>Interpretada por<br>.diedlonely, énouement<br><br>Composta por<br>Edgar Movsisyan, Jonas Rumpf<br><br>Produzida por<br>.diedlonely, énouement<br><br>Fonte: .diedlonely x énouement";
    document.getElementById('video-background').src = '';
    mudarFundo('musica30');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/stellar - .diedlonely.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();

} else if (musica === '31') {
    // Muda para a primeira música
    let texto = "Letra em breve!";
    
    document.getElementById('musicname').textContent = "LOUCURA EM ALTO MAR";
    document.getElementById('music').textContent = "LOUCURA EM ALTO MAR";
    document.getElementById('musicartist').textContent = "DJ RICK 013, DJ DAZAI, Mc Charles";
    document.getElementById('msgartist').textContent = "DJ Rick 013 Com apenas 17 anos, (Rikelme Gonçalves Vieira) já é referência na cena, acumulando mais de 100 milhões de streams e com vários hits virais em outras plataformas. Suas produções misturam elementos únicos do funk, criando um som que conquista cada vez mais espaço nas pistas e playlists. oficial Instagram: @DJ_rick013";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://yt3.googleusercontent.com/PLPD0mcmAcLGvRwxXVPrvVJFvKcUtNCEVEa-Jjd7T5xlkOboxVHVJht33ZZGMNtjnTh0rtDKWg=s160-c-k-c0x00ffffff-no-rj"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "LOUCURA EM ALTO MAR<br><br>Interpretada por<br>DJ DAZAI, DJ RICK 013, Mc Charles<br><br>Composta por<br>Charles Santos silva, Rikelme Gonçalves Vieira<br><br>Produzida por<br>DJ RICK 013<br><br>Fonte: FLUXOS MEDIA";
    document.getElementById('video-background').src = '';
    mudarFundo('musica31');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/LOUCURA EM ALTO MAR - DJ RICK 013.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();

} else if (musica === '32') {
    // Muda para a primeira música
    let texto = "Música sem letra!";
    
    document.getElementById('musicname').textContent = "green to blue";
    document.getElementById('music').textContent = "green to blue";
    document.getElementById('musicartist').textContent = "daniel.mp3";
    document.getElementById('msgartist').textContent = "";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://i.scdn.co/image/ab6761610000e5eb08eb1d8a67a540f5c78e1983"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('https://i.ytimg.com/vi/Zo4S8l4Jx_E/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGHIgQyhPMA8=&rs=AOn4CLDYDkvTYA0jgPCtDFvsx2O96WGDbQ')"; // Foto do artista
    document.getElementById('credits').innerHTML = "green to blue<br><br>Interpretada por<br>daniel.mp3<br><br>Composta por<br>Daniel Vogel<br><br>Produzida por<br>daniel.mp3<br><br>Fonte: daniel.mp3. Distributed exclusively by Amuseio AB";
    document.getElementById('video-background').src = '';
    mudarFundo('musica32');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/green to blue - Daniel.mp3.mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();

} else if (musica === '33') {
    // Muda para a primeira música
    let texto = "Música sem letra!";
    
    document.getElementById('musicname').textContent = "As Time Flies (Special Version) - Pitched + Slowed - Deluxe";
    document.getElementById('music').textContent = "As Time Flies (Special Version) - Pitched + Slowed - Deluxe";
    document.getElementById('musicartist').textContent = "Ty's Music";
    document.getElementById('msgartist').textContent = "";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://i.scdn.co/image/ab67616d0000b27385c963264e709701bb0aafda"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "As Time Flies (Special Version) - Pitched + Slowed - Deluxe<br><br>= Interpretada por<br>Ty's Music<br><br>Composta por<br>Tyrique Rashad Payne<br><br>Fonte:<br> College Music Records";
    document.getElementById('video-background').src = '';
    mudarFundo('musica33');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/Pitched   Slowed - As Time Flies  .mp3"; // Troca o áudio
    audio.load(); // Recarrega o áudio
    audio.play();
    video.play();

} else if (musica === '34') {
    // Muda para a primeira música
    let texto = "Letra disponivel em breve!";
    
    document.getElementById('musicname').textContent = "Die With A Smile";
    document.getElementById('music').textContent = "Die With A Smile";
    document.getElementById('musicartist').textContent = "Lady Gaga";
    document.getElementById('msgartist').textContent = "Academy Award and 14-time GRAMMY-winner Lady Gaga is a one-of-a-kind artist and performer. She has amassed an outstanding 110 million global album sales, 175 billion streams, and 758 million song consumption units, making her one of the best-selling musicians of all time. Her most recent pop album, Chromatica, became her sixth consecutive #1 on the Billboard 200 chart, making her the first female artist to achieve this over a ten-year period (2011-2020). Gaga's collaboration with Ariana Grande on “Rain On Me” had the biggest Spotify debut of 2020, reaching #1 on the Global and US Spotify Charts. In 2023, her debut single “Just Dance” became her third diamond-certified single by the RIAA, joining 'Bad Romance' and 'Poker Face.' In 2018, she won an Academy Award for Best Original Song for “Shallow,” featured on the soundtrack of Best Picture nominee A Star is Born (2018), in addition to claiming a Golden Globe, a Critics’ Choice Award, and four GRAMMYs for both “Shallow” and “I’ll Never Love Again,” also from the same soundtrack. Lady Gaga knows no bounds, from producing her classic pop hits to exploring the classic American Songbook with her albums Cheek to Cheek and Love For Sale with Tony Bennett, both #1 albums. Beyond music, she excels in business as the founder of Haus Labs and thrives as an actress (A Star Is Born, House of Gucci, Joker: Folie à Deux), as well as a passionate activist for mental health and LGBTQ+ rights through her Born This Way Foundation.";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://celebmafia.com/wp-content/uploads/2019/07/lady-gaga-haus-beauty-promo-photoshoot-july-2019-7.jpg"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "Die With A Smile<br> Interpretada por Lady Gaga<br><br> Composta por<br> Bruno Mars, James Fauntleroy, Lady Gaga<br><br>Produzida por<br> Bruno Mars, Dernst \"D'Mile\" Emile II, Lady Gaga, Andrew Watt<br><br>Fonte:<br> Interscope, BMG Publishing, Kobalt Music Publishing";
    document.getElementById('video-background').src = '';
    mudarFundo('musica34');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/Die With A Smile - Lady Gaga.mp3"; // Troca o áudio


} else if (musica === '35') {
    // Muda para a primeira música
    let texto = "Letra disponivel em breve!";
    
    document.getElementById('musicname').textContent = "DIA DELÍCIA";
    document.getElementById('music').textContent = "DIA DELÍCIA";
    document.getElementById('musicartist').textContent = "Nakama";
    document.getElementById('msgartist').textContent = "Academy Award and 14-time GRAMMY-winner Lady Gaga is a one-of-a-kind artist and performer. She has amassed an outstanding 110 million global album sales, 175 billion streams, and 758 million song consumption units, making her one of the best-selling musicians of all time. Her most recent pop album, Chromatica, became her sixth consecutive #1 on the Billboard 200 chart, making her the first female artist to achieve this over a ten-year period (2011-2020). Gaga's collaboration with Ariana Grande on “Rain On Me” had the biggest Spotify debut of 2020, reaching #1 on the Global and US Spotify Charts. In 2023, her debut single “Just Dance” became her third diamond-certified single by the RIAA, joining 'Bad Romance' and 'Poker Face.' In 2018, she won an Academy Award for Best Original Song for “Shallow,” featured on the soundtrack of Best Picture nominee A Star is Born (2018), in addition to claiming a Golden Globe, a Critics’ Choice Award, and four GRAMMYs for both “Shallow” and “I’ll Never Love Again,” also from the same soundtrack. Lady Gaga knows no bounds, from producing her classic pop hits to exploring the classic American Songbook with her albums Cheek to Cheek and Love For Sale with Tony Bennett, both #1 albums. Beyond music, she excels in business as the founder of Haus Labs and thrives as an actress (A Star Is Born, House of Gucci, Joker: Folie à Deux), as well as a passionate activist for mental health and LGBTQ+ rights through her Born This Way Foundation.";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://celebmafia.com/wp-content/uploads/2019/07/lady-gaga-haus-beauty-promo-photoshoot-july-2019-7.jpg"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "Die With A Smile<br> Interpretada por Lady Gaga<br><br> Composta por<br> Bruno Mars, James Fauntleroy, Lady Gaga<br><br>Produzida por<br> Bruno Mars, Dernst \"D'Mile\" Emile II, Lady Gaga, Andrew Watt<br><br>Fonte:<br> Interscope, BMG Publishing, Kobalt Music Publishing";
    document.getElementById('video-background').src = '';
    mudarFundo('musica35');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/DIA DELÍCIA - Nakama.mp3"; // Troca o áudio


} else if (musica === '36') {
    // Muda para a primeira música
    let texto = "Letra disponivel em breve!";
    
    document.getElementById('musicname').textContent = "FUNK SIGILO (SUPER SLOWED)";
    document.getElementById('music').textContent = "FUNK SIGILO (SUPER SLOWED)";
    document.getElementById('musicartist').textContent = "h6itam";
    document.getElementById('msgartist').textContent = "Academy Award and 14-time GRAMMY-winner Lady Gaga is a one-of-a-kind artist and performer. She has amassed an outstanding 110 million global album sales, 175 billion streams, and 758 million song consumption units, making her one of the best-selling musicians of all time. Her most recent pop album, Chromatica, became her sixth consecutive #1 on the Billboard 200 chart, making her the first female artist to achieve this over a ten-year period (2011-2020). Gaga's collaboration with Ariana Grande on “Rain On Me” had the biggest Spotify debut of 2020, reaching #1 on the Global and US Spotify Charts. In 2023, her debut single “Just Dance” became her third diamond-certified single by the RIAA, joining 'Bad Romance' and 'Poker Face.' In 2018, she won an Academy Award for Best Original Song for “Shallow,” featured on the soundtrack of Best Picture nominee A Star is Born (2018), in addition to claiming a Golden Globe, a Critics’ Choice Award, and four GRAMMYs for both “Shallow” and “I’ll Never Love Again,” also from the same soundtrack. Lady Gaga knows no bounds, from producing her classic pop hits to exploring the classic American Songbook with her albums Cheek to Cheek and Love For Sale with Tony Bennett, both #1 albums. Beyond music, she excels in business as the founder of Haus Labs and thrives as an actress (A Star Is Born, House of Gucci, Joker: Folie à Deux), as well as a passionate activist for mental health and LGBTQ+ rights through her Born This Way Foundation.";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://celebmafia.com/wp-content/uploads/2019/07/lady-gaga-haus-beauty-promo-photoshoot-july-2019-7.jpg"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "Die With A Smile<br> Interpretada por Lady Gaga<br><br> Composta por<br> Bruno Mars, James Fauntleroy, Lady Gaga<br><br>Produzida por<br> Bruno Mars, Dernst \"D'Mile\" Emile II, Lady Gaga, Andrew Watt<br><br>Fonte:<br> Interscope, BMG Publishing, Kobalt Music Publishing";
    document.getElementById('video-background').src = '';
    mudarFundo('musica36');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/FUNK SIGILO (SUPER SLOWED) - h6itam.mp3"; // Troca o áudio


} else if (musica === '37') {
    // Muda para a primeira música
    let texto = "Letra disponivel em breve!";
    
    document.getElementById('musicname').textContent = "Slide Tem Que Tirar";
    document.getElementById('music').textContent = "Slide Tem Que Tirar";
    document.getElementById('musicartist').textContent = "Dj Ikeraus";
    document.getElementById('msgartist').textContent = "Academy Award and 14-time GRAMMY-winner Lady Gaga is a one-of-a-kind artist and performer. She has amassed an outstanding 110 million global album sales, 175 billion streams, and 758 million song consumption units, making her one of the best-selling musicians of all time. Her most recent pop album, Chromatica, became her sixth consecutive #1 on the Billboard 200 chart, making her the first female artist to achieve this over a ten-year period (2011-2020). Gaga's collaboration with Ariana Grande on “Rain On Me” had the biggest Spotify debut of 2020, reaching #1 on the Global and US Spotify Charts. In 2023, her debut single “Just Dance” became her third diamond-certified single by the RIAA, joining 'Bad Romance' and 'Poker Face.' In 2018, she won an Academy Award for Best Original Song for “Shallow,” featured on the soundtrack of Best Picture nominee A Star is Born (2018), in addition to claiming a Golden Globe, a Critics’ Choice Award, and four GRAMMYs for both “Shallow” and “I’ll Never Love Again,” also from the same soundtrack. Lady Gaga knows no bounds, from producing her classic pop hits to exploring the classic American Songbook with her albums Cheek to Cheek and Love For Sale with Tony Bennett, both #1 albums. Beyond music, she excels in business as the founder of Haus Labs and thrives as an actress (A Star Is Born, House of Gucci, Joker: Folie à Deux), as well as a passionate activist for mental health and LGBTQ+ rights through her Born This Way Foundation.";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://celebmafia.com/wp-content/uploads/2019/07/lady-gaga-haus-beauty-promo-photoshoot-july-2019-7.jpg"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "Die With A Smile<br> Interpretada por Lady Gaga<br><br> Composta por<br> Bruno Mars, James Fauntleroy, Lady Gaga<br><br>Produzida por<br> Bruno Mars, Dernst \"D'Mile\" Emile II, Lady Gaga, Andrew Watt<br><br>Fonte:<br> Interscope, BMG Publishing, Kobalt Music Publishing";
    document.getElementById('video-background').src = '';
    mudarFundo('musica37');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/Slide Tem Que Tirar   - Dj Ikeraus.mp3"; // Troca o áudio


} else if (musica === '38') {
    // Muda para a primeira música
    let texto = "Letra disponivel em breve!";
    
    document.getElementById('musicname').textContent = "Porto Seguro  Poppy Playtime (Capítulo 4)";
    document.getElementById('music').textContent = "Porto Seguro  Poppy Playtime (Capítulo 4)";
    document.getElementById('musicartist').textContent = "Iron Master";
    document.getElementById('msgartist').textContent = "Danilo Trujillano, mais conhecido como Iron Master é um jovem de 22 anos que se tornou a mais nova revelação dentro da cena Geek no Brasil. Começou a fazer músicas com uma brincadeira entre amigos e após a segunda postagem, se tornou viral nas demais plataformas com a famosa frase 'Raça absoluta, além da consciência'. A partir deste momento, Iron começou a produzir músicas voltadas para o público Nerd/Geek, Gamer e Amante de desenhos, expandindo o nicho Geek, que até então, era voltado para a produção de músicas sobre animes. Suas músicas variam desde Rock à Jazz, contando com guitarras, batidas eletrônicas e muito mais. Sua música mais popular é o rap da animação 'Ben 10 Força Alienígena' lançada em 24 de Dezembro de 2020. Atualmente Iron tem uma linha de camisetas com as frases mais marcantes de suas músicas mais famosas e vem se aprimorando cada vez mais para abranger toda a comunidade. O canal Iron Master conta com mais de 1 milhão de inscritos e mais de 270 milhões de visualizações, recebendo feedbacks e comentários constantes do público da comunidade geek.";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://yt3.googleusercontent.com/LbhsmbjV50pJngJrXoCPlwLNvh6dsNhSAepCZHGGL92Vexks7GxPuvR_eztGYW7-uJYiSa2C2w=s160-c-k-c0x00ffffff-no-rj"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "Porto Seguro | Poppy Playtime (Capítulo 4)<br><br>Interpretada por<br>Iron Master<br><br>Composta por<br>Antonio Clarete, Danilo Trujillano<br><br>Produzida por<br>Danilo Trujillano<br><br>Fonte: 3001695 Records DK";
    document.getElementById('video-background').src = '';
    mudarFundo('musica38');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/Porto Seguro  Poppy Playtime (Capítulo 4)  Iron Master.m4a"; // Troca o áudio


} else if (musica === '39') {
    // Muda para a primeira música
    let texto = "Letra disponivel em breve!";
    
    document.getElementById('musicname').textContent = "O Homem de Roxo";
    document.getElementById('music').textContent = "O Homem de Roxo";
    document.getElementById('musiclogo').src = "https://i.scdn.co/image/ab67616d0000b2734d9481fd3558b4b11afc70d2";
    document.getElementById('musicartist').textContent = "NeKo Music";
    document.getElementById('msgartist').textContent = "Danilo Trujillano, mais conhecido como Iron Master é um jovem de 22 anos que se tornou a mais nova revelação dentro da cena Geek no Brasil. Começou a fazer músicas com uma brincadeira entre amigos e após a segunda postagem, se tornou viral nas demais plataformas com a famosa frase 'Raça absoluta, além da consciência'. A partir deste momento, Iron começou a produzir músicas voltadas para o público Nerd/Geek, Gamer e Amante de desenhos, expandindo o nicho Geek, que até então, era voltado para a produção de músicas sobre animes. Suas músicas variam desde Rock à Jazz, contando com guitarras, batidas eletrônicas e muito mais. Sua música mais popular é o rap da animação 'Ben 10 Força Alienígena' lançada em 24 de Dezembro de 2020. Atualmente Iron tem uma linha de camisetas com as frases mais marcantes de suas músicas mais famosas e vem se aprimorando cada vez mais para abranger toda a comunidade. O canal Iron Master conta com mais de 1 milhão de inscritos e mais de 270 milhões de visualizações, recebendo feedbacks e comentários constantes do público da comunidade geek.";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://yt3.googleusercontent.com/LbhsmbjV50pJngJrXoCPlwLNvh6dsNhSAepCZHGGL92Vexks7GxPuvR_eztGYW7-uJYiSa2C2w=s160-c-k-c0x00ffffff-no-rj"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "O Homem de Roxo<br><br>Interpretada por<br>NeKo Music<br><br>Composta por<br>Alisson Barbosa Chagas<br><br>Produzida por<br>-<br><br>Fonte: Neko";
    document.getElementById('video-background').src = '';
    mudarFundo('musica39');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/O Homem de Roxo - NeKo Music.mp3"; // Troca o áudio


} else if (musica === '40') {
    // Muda para a primeira música
    let texto = "Letra disponivel em breve!";
    
    document.getElementById('musicname').textContent = "Montagem Santa Fè";
    document.getElementById('music').textContent = "Montagem Santa Fè";
    document.getElementById('musiclogo').src = "https://i.scdn.co/image/ab67616d0000b2734d9481fd3558b4b11afc70d2";
    document.getElementById('musicartist').textContent = "qaraqshy";
    document.getElementById('msgartist').textContent = "Danilo Trujillano, mais conhecido como Iron Master é um jovem de 22 anos que se tornou a mais nova revelação dentro da cena Geek no Brasil. Começou a fazer músicas com uma brincadeira entre amigos e após a segunda postagem, se tornou viral nas demais plataformas com a famosa frase 'Raça absoluta, além da consciência'. A partir deste momento, Iron começou a produzir músicas voltadas para o público Nerd/Geek, Gamer e Amante de desenhos, expandindo o nicho Geek, que até então, era voltado para a produção de músicas sobre animes. Suas músicas variam desde Rock à Jazz, contando com guitarras, batidas eletrônicas e muito mais. Sua música mais popular é o rap da animação 'Ben 10 Força Alienígena' lançada em 24 de Dezembro de 2020. Atualmente Iron tem uma linha de camisetas com as frases mais marcantes de suas músicas mais famosas e vem se aprimorando cada vez mais para abranger toda a comunidade. O canal Iron Master conta com mais de 1 milhão de inscritos e mais de 270 milhões de visualizações, recebendo feedbacks e comentários constantes do público da comunidade geek.";
    document.getElementById('musicvideo').style.display = "block"; // Mostra o vídeo
    document.getElementById('musicvideo').querySelector('source').src = ""; // Vídeo da música
    document.getElementById('artistimg').src = "https://yt3.googleusercontent.com/LbhsmbjV50pJngJrXoCPlwLNvh6dsNhSAepCZHGGL92Vexks7GxPuvR_eztGYW7-uJYiSa2C2w=s160-c-k-c0x00ffffff-no-rj"; // Foto do artista
    document.getElementById("lyrics").innerHTML = texto;
    document.getElementById('sobre').style.backgroundImage = "url('')"; // Foto do artista
    document.getElementById('credits').innerHTML = "O Homem de Roxo<br><br>Interpretada por<br>NeKo Music<br><br>Composta por<br>Alisson Barbosa Chagas<br><br>Produzida por<br>-<br><br>Fonte: Neko";
    document.getElementById('video-background').src = '';
    mudarFundo('musica40');

    // Atualiza o áudio que vai tocar
    document.getElementById('audio').src = "Material/MONTAGEM SANTA FÈ - qaraqshy.mp3"; // Troca o áudio


}

audio.load(); // Recarrega o áudio
audio.play();
video.play();

const video2 = document.getElementById('video-background');

atualizarCapaMusica()
buscarDescricaoDoArtista()

video2.play();
checkVideo();
setBackgroundColor();
musicaTocando = true;
document.getElementById('credits').style.color = "rgb(161, 161, 161)";
musicaAtual = audio.src;
musnow = musica;
musicaAgora = music;
playPauseBtn.innerHTML = '<img src="Material/20250323_214131_0000.png" alt="Play" style="width: 50px;">';
mostrar();


document.title = document.getElementById('music').textContent + "  -  " + document.getElementById('musicartist').textContent;

audio.addEventListener('pause', function() {
    document.title = "Nebulus - Ao seu Dispor";
    let titleText = "Nebulus - Ao seu Dispor";
    let index = titleText.length;

    const animateTitle = () => {
        if (index >= 7) { // "Nebulus" tem 7 caracteres
            document.title = titleText.substring(0, index);
            index--;
            setTimeout(animateTitle, 100); // Ajuste o intervalo para controlar a velocidade da animação
        }
    };

    setTimeout(() => {
        animateTitle();
    }, 2000); // Delay de 2 segundos antes de iniciar a animação
});

audio.addEventListener('play', function() {
    document.title = document.getElementById('music').textContent + "  -  " + document.getElementById('musicartist').textContent;
});

// Quando o áudio começa, o vídeo começa do mesmo ponto
video2.currentTime = audio.currentTime;
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'F11') {
        event.preventDefault(); // Evita o comportamento padrão do F11
        const bEvent = new KeyboardEvent('keydown', { key: 'b' });
        document.dispatchEvent(bEvent); // Dispara o evento da tecla B
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'F5') {
        event.preventDefault(); // Evita o comportamento padrão do F5
    }
});
// Adiciona o evento de hover para o elemento com id "content"
const contentElement = document.getElementById('content');

// Cria a imagem que será exibida no hover
const hoverImage = document.createElement('img');
hoverImage.src = 'Material/20250323_214837_0000.png'; // Substitua pelo caminho da sua imagem
hoverImage.style.position = 'absolute';
hoverImage.style.top = '120px';
hoverImage.style.right = '65px';
hoverImage.style.display = 'none';
hoverImage.style.cursor = 'pointer';
hoverImage.style.zIndex = '1000';
hoverImage.style.width = '50px'; // Ajuste o tamanho conforme necessário
hoverImage.style.height = '50px'; // Ajuste o tamanho conforme necessário

// Adiciona a imagem ao body
document.body.appendChild(hoverImage);

// Adiciona o evento de hover para mostrar a imagem somente se o sidebar estiver oculto
contentElement.addEventListener('mouseenter', () => {
    const sidebar = document.getElementById('sidebar');
    if (getComputedStyle(sidebar).display === 'none') {
        hoverImage.style.display = 'block';
    }
});

// Adiciona o evento de sair do hover para esconder a imagem
contentElement.addEventListener('mouseleave', () => {
    hoverImage.style.display = 'none';
});

// Adiciona o evento de clique na imagem para chamar a função card()
hoverImage.addEventListener('click', () => {
    card();
});

// Adiciona o evento de hover para manter a imagem visível enquanto estiver em hover
hoverImage.addEventListener('mouseenter', () => {
    hoverImage.style.display = 'block';
});

// Adiciona o evento de sair do hover para esconder a imagem apenas se o mouse não estiver sobre ela
hoverImage.addEventListener('mouseleave', () => {
    hoverImage.style.display = 'none';
});


function animateMarquee() {
    const marquee = document.getElementById('marquee');
    if (!marquee) return;

    let position = window.innerWidth;
    marquee.style.position = 'absolute';
    marquee.style.whiteSpace = 'nowrap';

    function moveMarquee() {
        if (document.fullscreenElement) {
            position -= 2; // Velocidade do movimento
            if (position < -marquee.offsetWidth) {
                position = window.innerWidth;
            }
            marquee.style.left = `${position}px`;

            // Alterar a cor para arco-íris
            const hue = (Date.now() / 10) % 360; // Gera um valor de matiz baseado no tempo
            marquee.style.color = `hsl(${hue}, 100%, 50%)`;

            requestAnimationFrame(moveMarquee);
        }
    }

    moveMarquee();
}

document.addEventListener('fullscreenchange', () => {
    const marquee = document.getElementById('marquee');
    if (document.fullscreenElement) {
        marquee.style.display = 'block';
        animateMarquee();
    } else {
        marquee.style.display = 'none';
    }
});

// Função para obter o nome do dispositivo
function getDeviceName() {
    return navigator.userAgent;
}

// Função para verificar se há múltiplas guias abertas
function checkMultipleTabs() {
    const deviceName = getDeviceName();
    const storageKey = 'nebulus-tab';
    const currentTabId = Date.now(); // Identificador único para a guia atual

    // Salva o identificador da guia no localStorage
    localStorage.setItem(storageKey, JSON.stringify({ deviceName, tabId: currentTabId }));

    // Verifica se há outra guia aberta
    window.addEventListener('storage', (event) => {
        if (event.key === storageKey) {
            const otherTabData = JSON.parse(event.newValue);
            if (otherTabData.tabId !== currentTabId) {
                // Obtém apenas o nome do navegador
                const browserName = navigator.userAgent.match(/(Edg|Firefox|Chrome|Safari|Opera|MSIE|Trident)/i)?.[0].replace('Edg', 'Edge') || 'Desconhecido';

                // Exibe a mensagem na nova guia
                const message = document.createElement('div');
                message.id = 'tab-warning-message';
                message.textContent = `Tocando em: ${browserName}`;
                message.style.position = 'fixed';
                message.style.top = '10px';
                message.style.left = '0';
                message.style.width = '100%';
                message.style.color = 'lime';
                message.style.textAlign = 'center';
                message.style.zIndex = '10000';
                message.style.cursor = 'pointer';
                document.body.appendChild(message);

                // Adiciona evento de clique para fechar a guia
                message.addEventListener('click', () => {
                    window.close();
                });

                // Muta o áudio na nova guia
                const audio = document.getElementById('audio');
                if (audio) {
                    audio.muted = true;
                }
            }
        }
    });

    // Remove a mensagem se a outra guia for fechada
    window.addEventListener('storage', (event) => {
        if (event.key === storageKey) {
            const otherTabData = JSON.parse(event.newValue);
            if (!otherTabData || otherTabData.tabId === currentTabId) {
                const message = document.getElementById('tab-warning-message');
                if (message) {
                    message.remove();
                    const audio = document.getElementById('audio');
                    if (audio) {
                        audio.muted = false;
                        audio.volume = originalVolume; // Restaura o volume original
                    }
                }
            }
        }
    });

    // Remove o identificador da guia ao fechar
    window.addEventListener('beforeunload', () => {
        const storedData = JSON.parse(localStorage.getItem(storageKey));
        if (storedData && storedData.tabId === currentTabId) {
            localStorage.removeItem(storageKey);
        }
    });
}

// Chama a função ao carregar a página
checkMultipleTabs();

// Sincroniza o estado de pausa entre guias
function syncAudioState() {
    const audio = document.getElementById('audio');
    const storageKey = 'nebulus-audio-state';

    // Atualiza o estado de pausa no localStorage
    function updateAudioState() {
        localStorage.setItem(storageKey, JSON.stringify({ paused: audio.paused }));
    }

    // Escuta mudanças no localStorage para sincronizar o estado
    window.addEventListener('storage', (event) => {
        if (event.key === storageKey) {
            const newState = JSON.parse(event.newValue);
            if (newState && newState.paused !== audio.paused) {
                if (newState.paused) {
                    audio.pause();
                } else {
                    audio.play();
                }
            }
        }
    });

    // Atualiza o estado sempre que o áudio é pausado ou reproduzido
    audio.addEventListener('play', updateAudioState);
    audio.addEventListener('pause', updateAudioState);
}

// Chama a função ao carregar a página
syncAudioState();

async function atualizarCapaMusica() {
    const musica = document.getElementById('music').textContent.trim();
    const artista = document.getElementById('musicartist').textContent.trim();
    const termoBusca = `${musica} ${artista}`;
  
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(termoBusca)}&entity=song&limit=1`;
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.results.length > 0) {
        const resultado = data.results[0];
        const capaAltaRes = resultado.artworkUrl100.replace("100x100", "600x600");
        document.getElementById('musiclogo').src = capaAltaRes;
        document.getElementById('mslogo').src = capaAltaRes;

      } else {
        console.warn("Música não encontrada na iTunes API.");
      }
    } catch (error) {
      console.error("Erro ao buscar capa:", error);
    }
    
    atualizarJanelaSecundaria(musica, document.getElementById('mslogo').src)

  }
  
  async function buscarDescricaoDoArtista() {
    const artista = document.getElementById('musicartist').textContent.trim().replace(/\s+/g, '_');
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(artista)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Só altera se houver descrição válida
      if (data.extract) {
        document.getElementById('msgartist').textContent = data.extract;
      } else {
        console.warn("Nenhuma descrição encontrada para:", artista);
        // Não altera o conteúdo de msgartist
      }

    } catch (error) {
      console.error("Erro ao buscar a descrição do artista:", error);
      // Também não altera nada em caso de erro
    }
  }

  const { ipcRenderer } = require('electron');

document.getElementById('abrirJanela').addEventListener('click', () => {
    ipcRenderer.send('abrir-janela-secundaria');
});

