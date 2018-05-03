var gaugeNames = ['pee', 'inebriety', 'tired', 'dirty'];
var products = [
    [ 'water',    [+0.2,0.5 ], [0   ,0  ], [0   ,0  ], [-0.5,0.1], 7],
    [ 'beer',     [+0.5,0.2 ], [+0.4,0.5], [+0.1,0.5], [0   ,0  ], 1],
    [ 'Cologne',  [+0.1,0.3 ], [0   ,0  ], [+0.1,0.1], [-0.6,0.05],5],
    [ 'LSD',      [-0.2,1.0 ], [+0.2,0.1], [-0.3,0.1], [+0.1,0.2], 4],
    [ 'toilets',  [-0.7,0.05], [0   ,0  ], [0   ,0  ], [+0.2,0.1], 2],
    [ 'coffee',   [+0.1,0.5 ], [-0.1,0.5], [-0.2,0.1], [-0.1,0.5], 3],
    [ 'redbull',  [+0.1,0.5 ], [0   ,0  ], [-0.5,0.2], [0   ,0  ], 8],
    [ 'coca',     [+0.2,0.2 ], [0   ,0  ], [0   ,0  ], [-0.1,0.1], 6],
    [ 'puke',     [-0.2,0.2 ], [-0.4,0.2], [+0.1,0.2], [+0.4,0.1], 10],
    [ 'kebab',    [0   ,0   ], [-0.2,0.3], [+0.2,0.3], [0   ,0  ], 9]
];
var events = [
    [ 'You\'re loosing your prostate!',
        [+0.5, 0.05], [0, 0], [0, 0], [0, 0]
    ],
    [ 'Mmh, you pee on your pants... Cool, no need to go to the bathroom!',
        [-1.0, 0.05], [0, 0], [0, 0], [0, 0]
    ],
    [ 'Your girlfriend calls you! You are not drunk anymore!',
        [0, 0], [-1.0, 0.05], [0, 0], [0, 0]
    ],
    [ 'Come on, general tour of the bartender!!!',
        [0, 0], [+0.5, 0.05], [0, 0], [0, 0]
    ],
    [ 'The DJ is playing your favorite song! You are no longer tired!',
        [0, 0], [0, 0], [-1.0, 0.05], [0, 0]
    ],
    [ 'Your neighbor dances better than you and attracts all girls... Tired...',
        [0, 0], [0, 0], [+0.5, 0.05], [0, 0]
    ],
    [ 'A cougar is checking on you... You won sex-appeal!',
        [0, 0], [0, 0], [0, 0], [-1.0, 0.05]
    ],
    [ 'Oh... God... You shit on you... Hardcore',
        [0, 0], [0, 0], [0, 0], [+0.5, 0.05]
    ]
];
var eventsFrequency = [0,0,0,0,0,0,0,0];
var musics = ['korn', 'megadeth', 'pantera', 'queen', 'tenaciousd' ];

var pendingGauges = [[], [], [], [], []];

var progressGap = 1;
var currentDancer = 0;
var time = 8*60;
var currentMusic = 0;

$(function() {
    $.each(gaugeNames, function (i, gaugeName) {
        $('#gauges').append(
            $('<div>').addClass('gauge').attr('gauge', gaugeName).attr('percentage', 0.25 + Math.random() * 0.5)
                .append($('<div>').addClass('gaugeInner')
                    .append($('<div>').addClass('gaugeInnerTop')))
                .append($('<div>').addClass('gaugeText').html(gaugeName))
        )
    });

    $.each(products, function (i, product) {
        $('#products').append(
            $('<div>')
                .addClass('product')
                .attr('product', product[0])
                .attr('index', i)
                .css('background-image', 'url(' + product[0] + '.png)')
                .append(
                    $('<div>').addClass('productHide')
                )
        );
    });

    refreshGauges();
    refreshTime();

    window.setInterval(function(){
        refreshGauges();
        refreshProducts();
        refreshDancer();
        refreshTime();
    }, 500);

    window.setInterval(function() {
        generateEvent();
    }, 8000);

    window.setInterval(function(){
        $.each(gaugeNames, function (i, gaugeName) {
            var gauge = $('#gauges .gauge[gauge="' + gaugeName + '"]');
            var newPercentage = percentageFromGauge(i, parseFloat(gauge.attr('percentage')));
            gauge.attr('percentage', newPercentage);
        });
    }, 100);

    $('.product').hover(function (e) {
        var productName = $(this).attr('product');
        $('#hover').show().html(productName);
    }, function () {
        $('#hover').hide();
    });

    $('.product').click(function () {
        if (!$(this).hasClass('disabled')) {
            var index = $(this).attr('index');
            for (var i = 0; i < gaugeNames.length; i++) {
                if (products[index][i + 1][0] != 0) {
                    pendingGauges[i].push(
                        [products[index][i + 1][0], products[index][i + 1][1]]
                    );
                }
            }
            $(this).addClass('disabled').attr('wait', '100').find('.productHide').css('height', '100%');
            currentDancer = products[index][5];
        }
    });

    $('#jukebox').click(function() {
        currentMusic = (currentMusic + 1) % musics.length;
        $('#musicplayer').remove();
        $('body').append($('<embed hidden="true" autostart="true" loop="1" id="musicplayer">').attr('src', musics[currentMusic] + '.wav'));
    })

    $('#jukebox').hover(function (e) {
        var nextMusic = musics[(currentMusic + 1) % musics.length];
        $('#hover').show().html('Next song: ' + nextMusic);
    }, function () {
        $('#hover').hide();
    });
});

function refreshGauges() {
    $.each(gaugeNames, function (i, gaugeName) {
        var gauge = $('#gauges .gauge[gauge="' + gaugeName + '"]');
        var percentage = parseFloat(gauge.attr('percentage'));
        gauge.find('.gaugeInner').css('width', 'calc(' + parseInt(percentage*(100/progressGap))*progressGap + '% - 20px)');
        if (percentage > 0.8) {
            gauge.find('.gaugeInner').addClass('red');
            if (percentage >= 1) {
                if (gauge.attr('loose') != '') {
                    var newLoose = parseInt(gauge.attr('loose')) + 1;
                    gauge.attr('loose', newLoose);
                    if (newLoose >= 10) {
                        loose(gaugeName);
                    }
                } else {
                    gauge.attr('loose', 1);
                }
                if (gauge.find('.gaugeText').html().length) {
                    gauge.find('.gaugeText').html('');
                } else {
                    gauge.find('.gaugeText').html(gaugeName);
                }
            } else {
                gauge.find('.gaugeText').html(gaugeName);
                gauge.attr('loose', '');
            }
        } else {
            gauge.find('.gaugeInner').removeClass('red');
            gauge.find('.gaugeText').html(gaugeName);
            gauge.attr('loose', '');
        }
    });
}

function refreshProducts() {
    $('.product').each(function (i, product) {
        if ($(product).hasClass('disabled')) {
            var newWait = parseInt($(product).attr('wait')) - 5;
            $(product).attr('wait', newWait);
            $(product).find('.productHide').css('height', newWait + '%');
            if (newWait <= 0) {
                $(product).removeClass('disabled').attr('wait', null);
            }
        }
        var top = parseInt($(product).css('top'));
        var left = parseInt($(product).css('left'));
    });
}

function percentageFromGauge(index, actualPercentage) {
    var result = actualPercentage + 0.0005 * (getDays() + 1);

    for (var i=pendingGauges[index].length - 1; i>=0; i--) {
        var change = ((pendingGauges[index][i][0] > 0) ? 1 : -1) / (pendingGauges[index][i][1] * 1000);
        if (((pendingGauges[index][i][0] > 0) && (pendingGauges[index][i][0] - change <= 0)) ||
            ((pendingGauges[index][i][0] < 0) && (pendingGauges[index][i][0] - change >= 0))) {
            pendingGauges[index].splice(i,1);
        } else {
            pendingGauges[index][i][0] -= change;
        }

        result += change;
    }

    if (result <= 0) {
        pendingGauges[index] = [];
        result = 0;
    } else if (result >= 1) {
        pendingGauges[index] = [];
        result = 1;
    }

    return result;
}

function refreshDancer() {
    var posY = parseInt($('#dancer').css('background-position-y'));
    var posX = parseInt($('#dancer').css('background-position-x'));
    if (getPosY(currentDancer) != posY) {
        // New dance !
        posX = 0;
        posY = getPosY(currentDancer);
    } else {
        posX = (posX - 182) % (182*4);
        if ((posX == 0) && (currentDancer != 0)) {
            currentDancer = 0;
            posY = 0;
        }
    }

    $('#dancer').css('background-position-x', posX + 'px').css('background-position-y', posY + 'px');
}

function getPosY(d) {
    return parseInt(-d * 304.4);
}

function refreshTime() {
    time += 6 + getDays() * 2;
    var days = getDays();
    var hours = Math.floor((time - (days * 60 * 24)) / 60);
    var minutes = Math.floor(time - (days * 60 * 24 + hours * 60));
    var moment = ((hours >= 20) || (hours < 8)) ? 'Night' : 'Day';
    $('#time').html(moment + " " + (days+1) + " " + pad(hours,2) + ":" + pad(minutes,2));
}

function getDays() {
    return Math.floor(time / (60*24));
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function loose(gaugeName) {
    var text = 'You loose!<br/>';

    switch(gaugeName) {
        case 'pee': text += 'You pee on yourself!'; break;
        case 'inebriety': text += 'You made an ethical coma!'; break;
        case 'tired': text += 'You fall asleep!'; break;
        case 'dirty': text += 'All customers have left!'; break;
    }

    text += "<br/>You held " + getDays() + " days!";

    text += '<br/><a class="play" href="index.html">Retry</a>';

     $('#bigHover').html(text).show();
}

function generateEvent() {
    var event = events[getRandom()];

    $('#hover2').show().html(event[0]);
    for (var i = 0; i < gaugeNames.length; i++) {
        if (event[i + 1][0] != 0) {
            pendingGauges[i].push(
                [event[i + 1][0], event[i + 1][1]]
            );
        }
    }

    setTimeout(function() {
        $('#hover2').hide();
    }, 5000);
}

function getRandom() {
    var rand = parseInt(Math.random() * events.length);
    var min = 10000;
    var max = -1;
    for (var i = 0; i<eventsFrequency.length; i++) {
        min = Math.min(min, eventsFrequency[i]);
        max = Math.max(max, eventsFrequency[i]);
    }
    if (min === max) {
        console.log(min + ' === ' + max);
        eventsFrequency[rand]++;
        return rand;
    } else if (eventsFrequency[rand] === min) {
        console.log('!' + eventsFrequency[rand] + ' === ' + min);
        eventsFrequency[rand]++;
        return rand;
    } else {
        return getRandom();
    }
}
