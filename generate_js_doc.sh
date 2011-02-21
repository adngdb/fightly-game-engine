#!/bin/sh
# Generate code API documentation

# Client code
java -jar docs/tools/jsdoc_toolkit/jsrun.jar docs/tools/jsdoc_toolkit/app/run.js -a -t=docs/tools/jsdoc_toolkit/templates/jsdoc -d=docs/api/client/ dev/client/lib/ dev/client/lib/*/

#Server code
java -jar docs/tools/jsdoc_toolkit/jsrun.jar docs/tools/jsdoc_toolkit/app/run.js -a -S -t=docs/tools/jsdoc_toolkit/templates/jsdoc -d=docs/api/server/ dev/server/lib/ dev/server/lib/*/
