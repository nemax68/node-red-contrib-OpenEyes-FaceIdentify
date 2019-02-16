/**
 * Copyright 2018 OPEN-EYES S.r.l.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 **/

module.exports = function(RED) {
  "use strict";

	function faceid(config) {
        RED.nodes.createNode(this,config);
        var context = this.context();
        this.swtag = config.swtag;
        this.hwtag = config.hwtag;
        this.urltag = config.urltag;
        var node = this;

        this.on('input', function(msg) {

          const { exec } = require('child_process');

          var cmd="oe_face_identify --swtag " + node.swtag + " --hwtag " + node.hwtag + " --url " + node.urltag;
          console.log(cmd);
          exec(cmd, (err, stdout, stderr) => {
            if (err) {
              var outMsg = {payload: `${err}`};
              node.send(outMsg);
              return;
            }
            var outMsg = {payload: `${stdout}`};
            node.send(outMsg);
          });

        });
    }
    RED.nodes.registerType("face identify",faceid);
};
