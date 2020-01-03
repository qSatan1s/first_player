var playlist = [{
        song: 'Across the Stars: Love Theme',
        album: 'StarWars',
        artist: 'John Williams',
        artwork: 'https://priscree.ru/img/1b308004f130cd.jpg',
        mp3: 'https://cs1-64v4.vkuseraudio.net/p14/710f8bf762a9a0.mp3?extra=fEEwsKeRcZ9V2bOGDCeJWvaaKGoMT8ROOR14WAaB6IVeyP0rPQEDgpI8cgKdx5mrVjT4gwUMcMW047U2jvniss67Bm4IwGf5ViIlRdvJdQlwKUpzk9Y1Mmh7G3fksDm4DWd6TZ20X5z0lBbQPuLdf2dFbg',
    },

    {
        song: 'Odd Look',
        album: '',
        artist: 'Kavinsky feat. The Weeknd',
        artwork: 'https://muzplus.info/storage/covers/song/11768_300.jpg',
        mp3: 'https://cs1-75v4.vkuseraudio.net/p6/59de27c0b5a00d.mp3?extra=iYsoj7oFS96pjCI5vAmL0VEbnmNg5v9aKD3GYGKk0z3hs3N0QwvE7OnUl9pptioe-EOidhE_WAw80LRQ6LwWAu9ErnGBvNmKGMtwso8MugALDG3Wy9pje3Ph7_wLQdAUDAwgegl8OxbQsm-ecE57B5xvyA',
    },

    {
        song: 'Star Shopping',
        album: 'Star Shopping',
        artist: 'Lil Peep',
        artwork: 'https://lastfm.freetls.fastly.net/i/u/500x500/b25873aebf4b51b6e4a16015a97c1ec0.jpg',
        mp3: 'https://cs1-76v4.vkuseraudio.net/p19/44d40b6ec26fb6.mp3?extra=Yfy5hRgteXwR3djXB-CO237HdjZ3cYm-kPXixKQjWOl7jJmBY6HQqa2vvTy3ko1nmER-kkctZStBK9KDC7WJmBHyfoyakRYE2Pmz8DaPMq56w5uqfc7cNxg7zc2fJlFFCKYeLdVl9vfSbETxyQAPqcCx8Q',
    },
];

var rot = 0;
var duration;
var playPercent;
var rotate_timer;
var armrot = -45;
var bufferPercent;
var currentSong = 0;
var arm_rotate_timer;
var arm = document.getElementById('arm');
var next = document.getElementById('next');
var song = document.getElementById('song');
var timer = document.getElementById('timer');
var music = document.getElementById('music');
var link_music = document.getElementById('music');
var album = document.getElementById('album');
var artist = document.getElementById('artist');
var volume = document.getElementById('volume');
var menu_music = document.getElementById('menu_music');
var menu_music_2 = document.getElementById('menu_music_2');
var button_dowland = document.getElementById('button_dowland');
var playButton = document.getElementById('play');
var timeline = document.getElementById('slider');
var playhead = document.getElementById('elapsed');
var previous = document.getElementById('previous');
var pauseButton = document.getElementById('pause');
var bufferhead = document.getElementById('buffered');
var artwork = document.getElementsByClassName('artwork')[0];
var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
var visablevolume = document.getElementsByClassName('volume')[0];

music.addEventListener('ended', _next, false);
music.addEventListener('timeupdate', timeUpdate, false);
music.addEventListener('progress', bufferUpdate, false);
load();

function load() {
    pauseButton.style.visibility = 'hidden';
    song.innerHTML = playlist[currentSong]['song'];
    song.title = playlist[currentSong]['song'];
    album.innerHTML = playlist[currentSong]['album'];
    album.title = playlist[currentSong]['album'];
    artist.innerHTML = playlist[currentSong]['artist'];
    artist.title = playlist[currentSong]['artist'];
    artwork.setAttribute(
        'style',
        "background:url(https://i.imgur.com/3idGgyU.png), url('" +
        playlist[currentSong]['artwork'] +
        "') center no-repeat;",
    );
    music.innerHTML = '<source src="' + playlist[currentSong]['mp3'] + '" type="audio/mp3">';

    music.load();
}

function reset() {
    rotate_reset = setInterval(function() {
        Rotate();
        if (rot == 0) {
            clearTimeout(rotate_reset);
        }
    }, 1);
    fireEvent(pauseButton, 'click');
    armrot = -45;
    playhead.style.width = '0px';
    bufferhead.style.width = '0px';
    timer.innerHTML = '0:00';
    music.innerHTML = '';
    currentSong = 0;
    song.innerHTML = playlist[currentSong]['song'];
    song.title = playlist[currentSong]['song'];
    album.innerHTML = playlist[currentSong]['album'];
    album.title = playlist[currentSong]['album'];
    artist.innerHTML = playlist[currentSong]['artist'];
    artist.title = playlist[currentSong]['artist'];
    artwork.setAttribute(
        'style',
        "background:url(https://i.imgur.com/3idGgyU.png), url('" +
        playlist[currentSong]['artwork'] +
        "') center no-repeat;",
    );
    music.innerHTML = '<source src="' + playlist[currentSong]['mp3'] + '" type="audio/mp3">';
    music.load();
}

function formatSecondsAsTime(secs, format) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - hr * 3600) / 60);
    var sec = Math.floor(secs - hr * 3600 - min * 60);
    if (sec < 10) {
        sec = '0' + sec;
    }
    return min + ':' + sec;
}

function timeUpdate() {
    bufferUpdate();
    playPercent = timelineWidth * (music.currentTime / duration);
    playhead.style.width = playPercent + 'px';
    timer.innerHTML = formatSecondsAsTime(music.currentTime.toString());
}

function bufferUpdate() {
    bufferPercent = timelineWidth * music.buffered.end(0);
    bufferhead.style.width = bufferPercent + 'px';
}

function fireEvent(el, etype) {
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

function _next() {
    if (currentSong == playlist.length - 1) {
        reset();
    } else {
        fireEvent(next, 'click');
    }
}
playButton.onclick = function() {
    music.play();
};
pauseButton.onclick = function() {
    music.pause();
};
music.addEventListener(
    'play',
    function() {
        playButton.style.visibility = 'hidden';
        pause.style.visibility = 'visible';
        rotate_timer = setInterval(function() {}, 10);
        if (armrot != -45) {
            arm.setAttribute('style', 'transition: transform 800ms;');
            arm.style.transform = 'rotate(' + armrot + 'deg)';
        }
        arm_rotate_timer = setInterval(function() {
            if (!music.paused && !music.ended && 0 < music.currentTime) {
                if (armrot == -45) {
                    arm.setAttribute('style', 'transition: transform 800ms;');
                    arm.style.transform = 'rotate(-38deg)';
                    armrot = -38;
                }
                if (arm.style.transition != '') {
                    setTimeout(function() {
                        arm.style.transition = '';
                    }, 1000);
                }
            }
        }, 1000);
    },
    false,
);
music.addEventListener(
    'pause',
    function() {
        arm.setAttribute('style', 'transition: transform 800ms;');
        arm.style.transform = 'rotate(-45deg)';
        playButton.style.visibility = 'visible';
        pause.style.visibility = 'hidden';
        clearTimeout(rotate_timer);
        clearTimeout(arm_rotate_timer);
    },
    false,
);
next.onclick = function() {
    arm.setAttribute('style', 'transition: transform 800ms;');
    arm.style.transform = 'rotate(-45deg)';
    clearTimeout(rotate_timer);
    clearTimeout(arm_rotate_timer);
    playhead.style.width = '0px';
    bufferhead.style.width = '0px';
    timer.innerHTML = '0:00';
    music.innerHTML = '';
    arm.style.transform = 'rotate(-45deg)';
    armrot = -45;
    if (currentSong + 1 == playlist.length) {
        currentSong = 0;
        music.innerHTML = '<source src="' + playlist[currentSong]['mp3'] + '" type="audio/mp3">';
    } else {
        currentSong++;
        music.innerHTML = '<source src="' + playlist[currentSong]['mp3'] + '" type="audio/mp3">';
    }
    song.innerHTML = playlist[currentSong]['song'];
    song.title = playlist[currentSong]['song'];
    album.innerHTML = playlist[currentSong]['album'];
    album.title = playlist[currentSong]['album'];
    artist.innerHTML = playlist[currentSong]['artist'];
    artist.title = playlist[currentSong]['artist'];
    artwork.setAttribute(
        'style',
        'transform: rotate(' +
        rot +
        "deg); background:url(https://i.imgur.com/3idGgyU.png), url('" +
        playlist[currentSong]['artwork'] +
        "') center no-repeat;",
    );
    music.load();
    duration = music.duration;
    music.play();
};

menu_music.onclick = function() {
    document.querySelector('#menu').style.display = 'block';
    document.querySelector('#menu_music').style.display = 'none';
    document.querySelector('#menu_music_2').style.display = 'block';
};

menu_music_2.onclick = function() {
    document.querySelector('#menu').style.display = 'none';
    document.querySelector('#menu_music').style.display = 'block';
    document.querySelector('#menu_music_2').style.display = 'none';
};

button_dowland.onclick = function() {
    link_music.innerHTML = playlist[currentSong]['mp3'];
    window.open(link_music.innerHTML);
};

previous.onclick = function() {
    arm.setAttribute('style', 'transition: transform 800ms;');
    arm.style.transform = 'rotate(-45deg)';
    clearTimeout(rotate_timer);
    clearTimeout(arm_rotate_timer);
    playhead.style.width = '0px';
    bufferhead.style.width = '0px';
    timer.innerHTML = '0:00';
    music.innerHTML = '';
    arm.style.transform = 'rotate(-45deg)';
    armrot = -45;
    if (currentSong - 1 == -1) {
        currentSong = playlist.length - 1;
        music.innerHTML = '<source src="' + playlist[currentSong]['mp3'] + '" type="audio/mp3">';
    } else {
        currentSong--;
        music.innerHTML = '<source src="' + playlist[currentSong]['mp3'] + '" type="audio/mp3">';
    }
    song.innerHTML = playlist[currentSong]['song'];
    song.title = playlist[currentSong]['song'];
    album.innerHTML = playlist[currentSong]['album'];
    album.title = playlist[currentSong]['album'];
    artist.innerHTML = playlist[currentSong]['artist'];
    artist.title = playlist[currentSong]['artist'];
    artwork.setAttribute(
        'style',
        'transform: rotate(' +
        rot +
        "deg); background:url(https://i.imgur.com/3idGgyU.png), url('" +
        playlist[currentSong]['artwork'] +
        "') center no-repeat;",
    );
    music.load();
    duration = music.duration;
    music.play();
};
volume.oninput = function() {
    music.volume = volume.value;
    visablevolume.style.width = (80 - 11) * volume.value + 'px';
};
music.addEventListener(
    'canplay',
    function() {
        duration = music.duration;
    },
    false,
);