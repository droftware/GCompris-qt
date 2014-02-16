import QtQuick 2.1
import QtQuick.Particles 2.0
import QtMultimedia 5.0
import "colors.js" as Activity
import GCompris 1.0

Image {
    id: item
    property Item main
    property Item bar
    property string audioSrc
    property string question

    Audio {
        id: audioDrip
        source: audioSrc
    }

    MouseArea {
        anchors.fill: parent
        onClicked: {
            if(question === Activity.getCurrentQuestion())
                Activity.nextQuestion()
            else
                Activity.lost()
        }
    }

    SequentialAnimation {
          id: anim
          running: true
          loops: Animation.Infinite
          NumberAnimation {
              target: item
              property: "rotation"
              from: -10; to: 10
              duration: 400 + Math.floor(Math.random() * 400)
              easing.type: Easing.InOutQuad
          }
          NumberAnimation {
              target: item
              property: "rotation"
              from: 10; to: -10
              duration: 400 + Math.floor(Math.random() * 400)
              easing.type: Easing.InOutQuad }
    }

}
