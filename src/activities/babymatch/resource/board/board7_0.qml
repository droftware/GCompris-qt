/* GCompris
 *
 * Copyright (C) 2015 Bruno Coudoin <bruno.coudoin@gcompris.net>
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
import QtQuick 2.0

QtObject {
   property variant levels: [
      {
          "pixmapfile" : "images/bell.svg",
          "x" : "0.5",
          "y" : "0.7",
          "height" : 0.25,
          "width" : 0.25
      },
      {
          "pixmapfile" : "images/lamp.svg",
          "x" : "0.2",
          "y" : "0.7",
          "height" : 0.25,
          "width" : 0.25
      },
      
      {
          "pixmapfile" : "images/lifebuoy.svg",
          "x" : "0.8",
          "y" : "0.7",
          "height" : 0.25,
          "width" : 0.25
      },
      {
          "pixmapfile" : "images/sun.svg",
          "x" : "0.2",
          "y" : "0.3",
          "type" : "SHAPE_BACKGROUND",
          "height" : 0.25,
          "width" : 0.25
      },
      {
          "pixmapfile" : "images/sound.svg",
          "x" : "0.5",
          "y" : "0.3",
          "type" : "SHAPE_BACKGROUND",
          "height" : 0.25,
          "width" : 0.25
      },
      {
          "pixmapfile" : "images/umbrella.svg",
          "x" : "0.8",
          "y" : "0.3",
          "type" : "SHAPE_BACKGROUND",
          "height" : 0.25,
          "width" : 0.25
      }
   ]
}
