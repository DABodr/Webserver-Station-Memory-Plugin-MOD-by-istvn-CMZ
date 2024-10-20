// CONFIG //

var presets = [
    { country: 'F', PI: 'F750', format: 'png', freq: 88.6 }, // RVM
    { country: 'F', PI: 'F22F', format: 'png', freq: 89.7 }, // JAZZ
    { country: 'F', PI: 'F7B1', format: 'png', freq: 90.6 }, // BOUTON
    { country: 'F', PI: 'F742', format: 'png', freq: 91.2 }, // RADIO 8
    { country: 'F', PI: 'F226', format: 'png', freq: 91.8 }, // RIRE
    { country: 'F', PI: 'F225', format: 'png', freq: 92.6 }, // M RADIO
    { country: 'F', PI: 'F220', format: 'png', freq: 93.9 }, // NRJ
    { country: 'F', PI: 'F931', format: 'png', freq: 96.6 }, // CONTACT
    { country: 'F', PI: 'F215', format: 'png', freq: 97.7 }, // RTL2
    { country: 'F', PI: 'F221', format: 'png', freq: 98.4 }, // CLASSIQ
    { country: 'F', PI: 'F214', format: 'png', freq: 99.4 }, // SKYROCK
    { country: 'F', PI: 'F2E2', format: 'png', freq: 99.9 }, // EUROPE2
    { country: 'F', PI: 'F207', format: 'png', freq: 100.9 }, // FRANCE BLEU
    { country: 'F', PI: 'F224', format: 'png', freq: 101.6 }, // CHERIEFM
    { country: 'F', PI: 'F748', format: 'png', freq: 102.2 },  // CHAPAGNEFM
    { country: 'F', PI: 'F213', format: 'png', freq: 102.9 },  // EUROPE 1
    { country: 'F', PI: 'F211', format: 'png', freq: 103.4 },  // RTL
    { country: 'F', PI: 'F217', format: 'png', freq: 103.9 },  // FUN
    { country: 'F', PI: 'F218', format: 'png', freq: 105.1 },  // NOSTALGIE
    { country: 'F', PI: 'F206', format: 'png', freq: 105.9 },  // FRANCE INFO
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
        button.style.backdropFilter = 'blur(5px)';
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
