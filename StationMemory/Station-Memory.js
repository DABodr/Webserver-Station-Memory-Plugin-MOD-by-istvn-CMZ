// CONFIG //

var presets = [
    { country: 'SVK', PI: '5218', format: 'png', freq: 101.8 }, // VLNA
    { country: 'AUT', PI: 'A203', format: 'png', freq: 99.9 }, // OE 3
    { country: 'HNG', PI: 'B41F', format: 'png', freq: 96.4 }, // BASE FM
    { country: 'HNG', PI: 'B208', format: 'png', freq: 103.3 }, // RETRO
    { country: 'SVK', PI: '5354', format: 'svg', freq: 88.0 }, // MELODY
    { country: 'SVK', PI: '521D', format: 'png', freq: 97.0 }, // EXPRES
    { country: 'HNG', PI: 'B09A', format: 'png', freq: 107.0 }, // LAKIHEGY
    { country: 'HNG', PI: 'B317', format: 'png', freq: 89.5 }, // RADIO 1
    { country: 'SVK', PI: '5201', format: 'png', freq: 96.6 }, // SRO 1
    { country: 'SVK', PI: '534F', format: 'svg', freq: 95.2 }, // EUROPA 2
    { country: 'AUT', PI: 'AC0C', format: 'png', freq: 89.9 }, // RADIO-W
    { country: 'HNG', PI: 'B409', format: 'png', freq: 90.9 }, // Jazzy
    { country: 'HNG', PI: 'B40C', format: 'png', freq: 95.8 }, // SLAGERFM
    { country: 'HNG', PI: 'B416', format: 'png', freq: 98.0 }, // radiocafe
    { country: 'SVK', PI: '5340', format: 'png', freq: 94.3 }, // FUNRADIO
    { country: 'AUT', PI: 'A602', format: 'svg', freq: 97.9 }, // RADIO-N
    { country: 'HNG', PI: 'B41E', format: 'png', freq: 103.9 }, // ROCK FM
    { country: 'HNG', PI: 'B413', format: 'png', freq: 98.6 }, // MANNA FM
    { country: 'HNG', PI: 'B33C', format: 'png', freq: 99.5 }, // BEST FM
    { country: 'AUT', PI: 'A3FF', format: 'png', freq: 105.8 }  // kronehit
];

// CONFIG END //

//////////////////////////////////////////////////////////////////////////
// Webserver Station Memory Plugin (Ver: Developer Beta)                //
//                                                                      //
// Thanks to OpenRadio Community and Highpoint2000 for picons database! //
//                                                                      //
// Basing on webserver-station-logos                                    //
//                                                                      //
//                                                   5.06.2024 mateuszz //
//                                                     [MOD by istvn]   //
//////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    var buttonHeight = 50;
    var buttonMargin = 10;
    var buttonsPerSide = 10;
    var totalButtonHeight = buttonsPerSide * buttonHeight + (buttonsPerSide - 1) * buttonMargin;
    var screenWidth = window.innerWidth;

    var lastClickTime = 0;

    function buildButton(preset, index, side) {
        var button = document.createElement('button');
        button.style.position = 'fixed';
        button.style[side] = '20px';
        button.style.top = 'calc(50% - ' + (totalButtonHeight / 2) + 'px + ' + (index * (buttonHeight + buttonMargin)) + 'px)';
        button.style.width = '50px';
        button.style.height = '50px';
        button.style.borderRadius = '10px';
        button.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
        button.style.marginBottom = buttonMargin + 'px';
        button.style.padding = '0';
        button.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        button.classList.add('button');

        button.onmouseover = function() {
            this.style.backgroundColor = 'var(--color-3)';
        };
        
        button.onmouseout = function() {
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        };        

        var img = document.createElement('img');
        img.src = buildImageUrl(preset.country, preset.PI, preset.format);
        img.alt = 'Button Image ' + preset.freq;
        img.style.width = '95%';
        img.style.height = '95%';
        img.style.objectFit = 'contain';
        img.style.borderRadius = '10px';

        img.onerror = function() {
            img.src = 'https://tef.noobish.eu/logos/default-logo.png';
        };

        button.appendChild(img);
        document.body.appendChild(button);

        button.addEventListener('click', function() {
            var currentTime = new Date().getTime();
            if (currentTime - lastClickTime > 1000) {
                lastClickTime = currentTime;
                tuneTo(preset.freq);
            } else {
                console.log('Please wait before pressing again.');
            }
        });
    }

    function buildImageUrl(country, PI, format) {
        var baseUrl = 'https://tef.noobish.eu/logos/';
        var region = getRegionFromCountry(country);
        var stationImageUrl = baseUrl + region + '/' + PI + '.' + format;
        return stationImageUrl;
    }

    function getRegionFromCountry(country) {
        return country;
    }

    // Build buttons
    presets.forEach(function(preset, index) {
        var side = index < buttonsPerSide ? 'right' : 'left';  // Swap sides
        var positionIndex = index < buttonsPerSide ? index : index - buttonsPerSide;
        buildButton(preset, positionIndex, side);
    });

    window.addEventListener('resize', function() {
        screenWidth = window.innerWidth;

        if (screenWidth <= 1400) {
            var buttons = document.querySelectorAll('.button');
            buttons.forEach(function(button) {
                button.style.display = 'none'; 
            });
        } else {
            var buttons = document.querySelectorAll('.button');
            buttons.forEach(function(button) {
                button.style.display = ''; 
            });
        }
    });

    
    if (screenWidth <= 1400) {
        var buttons = document.querySelectorAll('.button');
        buttons.forEach(function(button) {
            button.style.display = 'none'; 
        });
    }
});