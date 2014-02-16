/* GCompris - Colors.qml
 *
 * Copyright (C) 2014 Bruno Coudoin
 *
 *   This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program; if not, see <http://www.gnu.org/licenses/>.
 */

.pragma library
.import QtQuick 2.0 as Quick

var colors =
        [
            [ // Level 1
             {
                 "image": "yellow_duck.svgz",
                 "text": "Find the yellow duck",
                 "audio": "voices/$LOCALE/colors/yellow.ogg"
             },
             {
                 "image": "black_duck.svgz",
                 "text": "Find the black duck",
                 "audio": "voices/$LOCALE/colors/black.ogg"
             },
             {
                 "image": "green_duck.svgz",
                 "text": "Find the green duck",
                 "audio": "voices/$LOCALE/colors/green.ogg"
             },
             {
                 "image": "red_duck.svgz",
                 "text": "Find the red duck",
                 "audio": "voices/$LOCALE/colors/red.ogg"
             },
             {
                 "image": "white_duck.svgz",
                 "text": "Find the white duck",
                 "audio": "voices/$LOCALE/colors/white.ogg"
             },
             {
                 "image": "blue_duck.svgz",
                 "text": "Find the blue duck",
                 "audio": "voices/$LOCALE/colors/blue.ogg"
             }
            ],
            [ // Level 2
             {
                 "image": "yellow_duck.svgz",
                 "text": "Find the yellow duck",
                 "audio": "voices/$LOCALE/colors/yellow.ogg"
             },
             {
                 "image": "black_duck.svgz",
                 "text": "Find the black duck",
                 "audio": "voices/$LOCALE/colors/black.ogg"
             },
             {
                 "image": "brown_duck.svgz",
                 "text": "Find the brown duck",
                 "audio": "voices/$LOCALE/colors/brown.ogg"
             },
             {
                 "image": "green_duck.svgz",
                 "text": "Find the green duck",
                 "audio": "voices/$LOCALE/colors/green.ogg"
             },
             {
                 "image": "grey_duck.svgz",
                 "text": "Find the grey duck",
                 "audio": "voices/$LOCALE/colors/grey.ogg"
             },
             {
                 "image": "orange_duck.svgz",
                 "text": "Find the orange duck",
                 "audio": "voices/$LOCALE/colors/orange.ogg"
             },
             {
                 "image": "purple_duck.svgz",
                 "text": "Find the purple duck",
                 "audio": "voices/$LOCALE/colors/purple.ogg"
             },
             {
                 "image": "red_duck.svgz",
                 "text": "Find the red duck",
                 "audio": "voices/$LOCALE/colors/red.ogg"
             },
             {
                 "image": "white_duck.svgz",
                 "text": "Find the white duck",
                 "audio": "voices/$LOCALE/colors/white.ogg"
             },
             {
                 "image": "blue_duck.svgz",
                 "text": "Find the blue duck",
                 "audio": "voices/$LOCALE/colors/blue.ogg"
             }
            ]
        ]

var _currentLevel = 0
var _numberOfLevel = colors.length
var _main
var _background
var _bar
var _bonus
var _containerModel
var _questionItem

var _currentQuestion

function start(main, background, bar, bonus,
               containerModel, questionItem) {
    _main = main
    _background = background
    _bar = bar
    _bonus = bonus
    _currentLevel = 0
    _containerModel = containerModel
    _questionItem = questionItem
    initLevel()
}

function stop() {
}

function initLevel() {
    _bar.level = _currentLevel + 1
    _containerModel.clear()
    _currentQuestion = 0
    colors[_currentLevel] = shuffle(colors[_currentLevel])

    for(var i = 0;  i < colors[_currentLevel].length; ++i) {
        _containerModel.append(colors[_currentLevel][i])
    }

    // Shuffle again not to ask the question in the model order
    colors[_currentLevel] = shuffle(colors[_currentLevel])
    initQuestion()
}

function initQuestion() {
    // We just set the opacity to 0, the questionItem will then grab
    // the new question by itself
    _questionItem.opacity = 0
}

function nextQuestion() {
    if(colors[_currentLevel].length <= ++_currentQuestion ) {
        _bonus.good("flower")
    } else {
        initQuestion()
    }
}

function nextLevel() {
    if(_numberOfLevel <= ++_currentLevel ) {
        _currentLevel = 0
    }
    initLevel();
}

function previousLevel() {
    if(--_currentLevel < 0) {
        _currentLevel = _numberOfLevel - 1
    }
    initLevel();
}

function getCurrentQuestion() {
    return colors[_currentLevel][_currentQuestion].text
}

function lost() {
    _bonus.bad("flower")
}

function shuffle(o) {
    for(var j, x, i = o.length; i;
        j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
