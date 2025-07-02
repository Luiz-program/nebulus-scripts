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

document.getElementById("lateral").innerHTML = `
<div style="display: flex;" class="pop" id="musicas">

<h2 style="color: white;" id="categoria">Em alta no Nebulus:</h2>

<!--Botões de músicas-->
<button class="musicbtn" onclick="mudarMusica('1')"><img src="https://th.bing.com/th/id/OIP.eieU2Pf0CBzvtdR_L74OdQHaHa?rs=1&pid=ImgDetMain"><br>SPOOKY</button>
<button class="musicbtn" onclick="mudarMusica('2')"><img src="https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/70/7f/d9/707fd990-ab03-c28a-ee1d-9005ac77ed58/artwork.jpg/1200x1200bf-60.jpg"><br>Fall Asleep</button>
<button class="musicbtn" onclick="mudarMusica('3')"><img src="https://m.media-amazon.com/images/I/51+lpcg-DGL._UXNaN_FMjpg_QL85_.jpg"><br>Welcome Home</button>
<button class="musicbtn" onclick="mudarMusica('4')"><img src="https://i1.sndcdn.com/artworks-dBPml1DnccTWMjZS-ASdDzw-t500x500.jpg"><br>Forever</button>

<div id="extra">
<button class="musicbtn" style="display: none;" onclick="mudarMusica('40')"><img src="https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/18/e4/f3/18e4f365-2685-a684-7794-c9c2b02d28f8/663918203361.jpg/600x600bb.jpg"><br>Montagem Santa Fè</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('41')"><img src="https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/18/e4/f3/18e4f365-2685-a684-7794-c9c2b02d28f8/663918203361.jpg/600x600bb.jpg"><br>Montagem</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('6')"><img src="https://i1.wp.com/fontmeme.com/images/undertale-font.jpg"><br>Fallen Down</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('7')"><img src="https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/c3/3d/f1/c33df11e-1244-3f80-672c-9b7f88010f17/1963620475841_cover.jpg/1200x1200bf-60.jpg"><br>snowfall</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('8')"><img src="https://wp.hnhh.com/wp-content/uploads/2023/05/Metro-Boomin-Nav-A-Boogie-Wit-da-Hoodie-w-Swae-Lee-Calling-Spider-Man-Across-the-Spider-Verse.jpg"><br>Am I Dreaming</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('9')"><img src="https://i.scdn.co/image/ab67616d0000b273e4d00d731d05f45d8026628c"><br>Foi Assim Que O Batman Morreu</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('10')"><img src="https://i.scdn.co/image/ab67616d0000b273639c5bb67502edf28e722dd1"><br>So Low</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('11')"><img src="https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/50/5f/2a/505f2abe-950e-1462-95ef-3505c22cb33a/1963622745058_cover.jpg/1200x1200bf-60.jpg"><br>Blue Horizon Funk</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('12')"><img src="https://i.scdn.co/image/ab67616d0000b273e87de16fd8ca422e16e82bd9"><br>Companhia Letal</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('13')"><img src="Material/Solução Absoluta   Murder Drones (Nightcore) - Iron Master.jpg"><br>Solução Absoluta | Murder Drones.</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('14')"><img src="https://images.genius.com/e7f144e6051f1c3240eb64e5cb75e559.1000x1000x1.png"><br>Sono Profundo | Poppy Playtime (Capítulo 3).</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('15')"><img src="https://th.bing.com/th/id/OIP.skhw4HJD8MLCRx9N3LzOjAHaHa?rs=1&pid=ImgDetMain"><br>My Ordinary Life</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('16')"><img src="https://i.scdn.co/image/ab67616d0000b2733a4d8ae3b8341d1ca816d874"><br>Sleep Well</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('17')"><img src="https://lh3.googleusercontent.com/fQRVEW7qwddapvxKkUuOLotcuEjhpsoUnMxBDZeXfs7Cd08Yv7qbKoXOk5vyc-HrgisbFz02c-6t4sOG"><br>Se Paciente Funk</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('18')"><img src="Material/REINDEER - Dj Samir.jpg"><br>REINDEER</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('19')"><img src="https://lh3.googleusercontent.com/mt4uKXu87KcKrs-yXI0LhKvXiZNsOPx1kYh7HeU3IIe9MsFJESfz-bZowd99ExqAqFl3FJ7U_SUHBss"><br>Killing Fields</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('20')"><img src="https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/8b/e9/cf/8be9cf88-a980-52c5-fef0-65070fdbd744/693887118366.jpg/1200x1200bf-60.jpg"><br>New Jeans (Jersey Club)</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('21')"><img src="https://cdn-images.dzcdn.net/images/cover/beeb846d621625fdbe093aabaad6a849/500x500.jpg"><br>BOUNCE FUNK</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('22')"><img src="https://static.qobuz.com/images/covers/oc/4d/k00mfn8pk4doc_600.jpg"><br>Cuando Se Te Moja La Tarea</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('23')"><img src="https://images.genius.com/80a95640b6945c14bc152fde17cfd1e9.1000x1000x1.jpg"><br>Cuando Se Te Moja La Tarea 2</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('24')"><img src="https://i1.sndcdn.com/artworks-6rEA9E6Vw65C-0-t500x500.png"><br>JOKING</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('25')"><img src="https://f4.bcbits.com/img/a0097746462_10.jpg"><br>A1 - It's just a burning memory</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('26')"><img src="https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/68/e3/44/68e344e5-411b-a6bb-5beb-85f5e93ec792/199066739167.jpg/800x800cc.jpg"><br>MONTAGEM LADRAO</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('27')"><img src="Material/TAKEN - DJ Samir.jpg"><br>TAKEN</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('28')"><img src="https://cdn-images.dzcdn.net/images/cover/58b457e0df4ad9fb235e8702dfccde7d/0x1900-000000-80-0-0.jpg"><br>CADDILAC!</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('29')"><img src="https://cdn-images.dzcdn.net/images/cover/58b457e0df4ad9fb235e8702dfccde7d/0x1900-000000-80-0-0.jpg"><br>BUG ZAP</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('30')"><img src="https://i.scdn.co/image/ab67616d00001e0259c72ff3ee769168f8dcdb88"><br>stellar</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('31')"><img src="https://i.scdn.co/image/ab67616d00001e024e8c2eb93651ada57f39bc85"><br>LOUCURA EM ALTO MAR</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('32')"><img src="https://i.scdn.co/image/ab67616d00001e0283ae32caa4aa4ae1e4dac7ed"><br>green to blue</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('33')"><img src="data:image/jpeg;base64,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"><br>As Time Flies (Special Version) - Pitched + Slowed - Deluxe</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('34')"><img src="data:image/jpeg;base64,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"><br>Die With A Smile</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('35')"><img src="https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/04/35/b6/0435b690-6429-b81c-acf7-dea3ef5823b2/4062851142465.jpg/600x600bb.jpg"><br>DIA DELÍCIA</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('36')"><img src="https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/29/04/28/290428ea-71fa-139c-572a-9b4c0c962821/199350129490.jpg/600x600bb.jpg"><br>FUNK SIGILO (SUPER SLOWED)</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('37')"><img src="https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/4a/62/2b/4a622b60-57f9-43b0-9344-49505332278d/artwork.jpg/600x600bb.jpg"><br>Slide Tem Que Tirar</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('38')"><img src="https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/c5/fd/a4/c5fda442-d276-eef6-27f1-b3ee8753ded2/artwork.jpg/600x600bb.jpg"><br>Porto Seguro  Poppy Playtime (Capítulo 4)</button>
<button class="musicbtn" style="display: none;" onclick="mudarMusica('39')"><img src="https://i.scdn.co/image/ab67616d0000b2734d9481fd3558b4b11afc70d2"><br>O Homem de Roxo</button>
</div>

<br>
</div>

<div id="relax" class="pop">

    <h2 style="color: white;" id="categoria">Relax:</h2>

    <button class="musicbtn" onclick="mudarMusica('6')"><img src="https://i1.wp.com/fontmeme.com/images/undertale-font.jpg"><br>Fallen Down</button>
    <button class="musicbtn" onclick="mudarMusica('7')"><img src="https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/c3/3d/f1/c33df11e-1244-3f80-672c-9b7f88010f17/1963620475841_cover.jpg/1200x1200bf-60.jpg"><br>snowfall</button>
    <button class="musicbtn" onclick="mudarMusica('8')"><img src="https://wp.hnhh.com/wp-content/uploads/2023/05/Metro-Boomin-Nav-A-Boogie-Wit-da-Hoodie-w-Swae-Lee-Calling-Spider-Man-Across-the-Spider-Verse.jpg"><br>Am I Dreaming</button>
    <button class="musicbtn" onclick="mudarMusica('15')"><img src="https://th.bing.com/th/id/OIP.skhw4HJD8MLCRx9N3LzOjAHaHa?rs=1&pid=ImgDetMain"><br>My Ordinary Life</button>



</div>   
`;
