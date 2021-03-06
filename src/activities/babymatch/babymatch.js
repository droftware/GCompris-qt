/* GCompris - babymatch.js
 *
 * Copyright (C) 2015 Pulkit Gupta
 *
 * Authors:
 *   Bruno Coudoin <bruno.coudoin@gcompris.net> (GTK+ version)
 *   Pulkit Gupta <pulkitgenius@gmail.com> (Qt Quick port)
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

var currentLevel = 1
var currentSubLevel = 0
var numberOfLevel
var numberOfSubLevel
var items
var url
var glowEnabled
var glowEnabledDefault
var spots = []
var showText = []
var displayDropCircle

function start(items_, url_, levelCount_, answerGlow_, displayDropCircle_) {
    items = items_
    url = url_
    numberOfLevel = levelCount_
    glowEnabledDefault = answerGlow_
    displayDropCircle = displayDropCircle_
    currentLevel = 1
    currentSubLevel = 0
    numberOfSubLevel = 0
    spots = []
    showText = []
    initLevel()
}

function stop() {
    for(var i = 0 ; i < spots.length ; ++ i) 
        spots[i].destroy()
}

function initLevel() {
    items.bar.level = currentLevel
    var filename = url + "board" + "/" + "board" + currentLevel + "_" + currentSubLevel + ".qml"
    items.dataset.source = filename
    var levelData = items.dataset.item
    
    items.availablePieces.model.clear()
    for(var i = 0 ; i < spots.length ; ++ i) 
        spots[i].destroy()
    spots = []
    
    for(var i = 0 ; i < showText.length ; ++ i) 
        showText[i].destroy()
    showText = []
    
    items.backgroundPiecesModel.clear()
    items.backgroundImage.source = ""

    items.availablePieces.view.currentDisplayedGroup = 0
    items.availablePieces.view.itemsDropped = 0
    items.availablePieces.view.previousNavigation = 1
    items.availablePieces.view.nextNavigation = 1
    items.availablePieces.view.okShowed = false
    items.availablePieces.view.showGlow = false
    items.availablePieces.view.ok.height = 0

    var dropItemComponent = Qt.createComponent("qrc:/gcompris/src/activities/babymatch/DropAnswerItem.qml")
    var textItemComponent = Qt.createComponent("qrc:/gcompris/src/activities/babymatch/TextItem.qml")
    //print(dropItemComponent.errorString())
    
    if(currentSubLevel == 0 && levelData.numberOfSubLevel != undefined)
        numberOfSubLevel = levelData.numberOfSubLevel
        
    items.score.currentSubLevel = currentSubLevel + 1
    items.score.numberOfSubLevels = numberOfSubLevel + 1
    
    if(levelData.glow == undefined)
        glowEnabled = glowEnabledDefault
    else 
        glowEnabled = levelData.glow

    // BUG352639: tooltip is not clear when changing level
    items.toolTip.visible = false

    if(levelData.instruction == undefined) {
        items.instruction.opacity = 0
        items.instruction.text = ""
    } else if(!displayDropCircle) {
        items.instruction.opacity = 0
        items.instruction.text = levelData.instruction
    }
    else {
        items.instruction.opacity = 1
        items.instruction.text = levelData.instruction
    }
	
    // Fill available pieces
    var arr=[], levelDataLength = levelData.levels.length
    for(var i=0 ; i < levelDataLength ; i++)
        arr[i] = i
        
    var i = 0, j = 0, k = 0, n = 0 
    while(levelDataLength--) {
        
        //Randomize the order of pieces 
        var rand = Math.floor(Math.random() * levelDataLength)
        i = arr[rand]
        arr.splice(rand,1)
        
        //Create answer pieces
        if(levelData.levels[i].type === undefined) {
            items.availablePieces.model.append( {
                "imgName": levelData.levels[i].pixmapfile,
                "imgSound": levelData.levels[i].sound ? levelData.levels[i].sound : "",
                "imgHeight": levelData.levels[i].height == undefined ? 0 : levelData.levels[i].height,
                "imgWidth": levelData.levels[i].width == undefined ? 0 : levelData.levels[i].width,
                "toolTipText":
                   // We remove the text before the pipe symbol if any (translation disembiguation)
                   levelData.levels[i].toolTipText == undefined ?
                                                       "" :
                                                       (levelData.levels[i].toolTipText.split('|').length > 1 ?
                                                        levelData.levels[i].toolTipText.split('|')[1] :
                                                        levelData.levels[i].toolTipText),
                "pressSound": levelData.levels[i].soundFile == undefined ? 
							  "qrc:/gcompris/src/core/resource/sounds/bleep.wav" : url + levelData.levels[i].soundFile
            });

            spots[j++] = dropItemComponent.createObject(
                         items.backgroundImage, {
                            "posX": levelData.levels[i].x,
                            "posY": levelData.levels[i].y,
                            "imgHeight": levelData.levels[i].height == undefined ? 0 : levelData.levels[i].height,
                            "imgWidth": levelData.levels[i].width == undefined ? 0 : levelData.levels[i].width,
                            "dropAreaSize": levelData.levels[i].dropAreaSize == undefined ? 15 : levelData.levels[i].dropAreaSize,
                            "imageName" : levelData.levels[i].pixmapfile
                         });
        }
        //Create Text pieces for the level which has to display additional information
        else if(levelData.levels[i].type == "DisplayText") {
			showText[k++] = textItemComponent.createObject(
                            items.backgroundImage, {
                                "posX": levelData.levels[i].x,
                                "posY": levelData.levels[i].y,
                                "textWidth": levelData.levels[i].width,
                                "showText" : levelData.levels[i].text
                            });
        }
        //Create static background pieces
        else {
            if(levelData.levels[i].type === "SHAPE_BACKGROUND_IMAGE") {
                items.backgroundImage.source = url + levelData.levels[i].pixmapfile
            }
            else {
                items.backgroundPiecesModel.append( {
                    "imgName": levelData.levels[i].pixmapfile,
                    "posX": levelData.levels[i].x,
                    "posY": levelData.levels[i].y,
                    "imgHeight": levelData.levels[i].height == undefined ? 0 : levelData.levels[i].height,
                    "imgWidth": levelData.levels[i].width == undefined ? 0 : levelData.levels[i].width, 
                });
            }
        }
    }
    
    //Initialize displayedGroup variable which is used for showing navigation bars
    for(var i=0;i<items.availablePieces.view.nbDisplayedGroup;++i)
        items.availablePieces.view.displayedGroup[i] = true
}

function nextSubLevel() {
	if(numberOfSubLevel < ++currentSubLevel) {
        currentSubLevel = 0
        numberOfSubLevel = 0
        nextLevel()
    }
    else
        initLevel()
}

function nextLevel() {
    currentSubLevel = 0
    numberOfSubLevel = 0
    if(numberOfLevel < ++currentLevel) {
        currentLevel = 1
    }
    initLevel()
}

function previousLevel() {
    currentSubLevel = 0
    numberOfSubLevel = 0
    if(--currentLevel < 1) {
        currentLevel = numberOfLevel
    }
    initLevel();
}

function win() {
    items.bonus.good("flower")
}

function wrong() {
    items.bonus.bad("flower")
}
