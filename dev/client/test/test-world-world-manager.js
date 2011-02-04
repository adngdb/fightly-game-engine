/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/
//var worldManager_ = require("../lib/world/world-manager.js");

WorldManagerTest = TestCase("WorldManagerTest");

WorldManagerTest.prototype.testUpdateValues = function() {
  var worldmanager = new WorldManager();
  var obj1 = {
  		attr1:"value1",
  		attr2:"",
  		methode: function(p1,p2){return "parametres : "+p1+", "+p2 ;}
  		};
  var obj2 = {
  		attr1:"valeur1",
  		attr2:"valeur2",
  		};
  worldmanager.updateValues(obj1,obj2);
  assertEquals("parametres : valeur1, valeur2", obj1.methode(obj1.attr1,obj1.attr2));
  jstestdriver.console.log("+ testUpdateValues [OK]");
  
};

WorldManagerTest.prototype.testGameData = function() {
  var worldmanager = new WorldManager();
  var jsontext = '{"id":"-1","players":[{"id":"1","name":"player1","turn":"30","units":[]}],"map":{"length":"-1","width":"-1","cells":[{"type":"null","x":"-1","y":"-1"}]}}';
  var data = JSON.parse(jsontext);
  worldmanager.gameData(data);
  assertEquals("-1", worldmanager.game.id);
  assertEquals("1", worldmanager.game.players[0].id);
  assertEquals("player1", worldmanager.game.players[0].name);
  assertEquals("30", worldmanager.game.players[0].turn);
  assertEquals("-1", worldmanager.game.map.length);
  assertEquals("-1", worldmanager.game.map.width);
  assertEquals("null", worldmanager.game.map.cells[0].type);
  assertEquals("-1", worldmanager.game.map.cells[0].x);
  assertEquals("-1", worldmanager.game.map.cells[0].y);
  
  jstestdriver.console.log("+ testGameData [OK]");
};

WorldManagerTest.prototype.testGameUpdate = function() {
  var worldmanager = new WorldManager();
  var jsontext = '{"id":"-1","players":[{"id":"1","name":"player1","turn":"30","units":[]}],"map":{"length":"-1","width":"-1","cells":[{"type":"null","x":"-1","y":"-1"}]}}';
  var data = JSON.parse(jsontext);
  worldmanager.gameData(data);
  assertEquals("30", worldmanager.game.players[0].turn);
  
  jsontext = '{"id":"-1","players":[{"id":"1","name":"player1","turn":"29","units":[]}],"map":{"length":"40","width":"100","cells":[{"type":"null","x":"-1","y":"-1"}]}}';
  data = JSON.parse(jsontext);
  worldmanager.gameUpdate(data);
  assertEquals("29", worldmanager.game.players[0].turn);
  assertEquals("40", worldmanager.game.map.length);
  assertEquals("100", worldmanager.game.map.width);
 
  jstestdriver.console.log("+ testGameUpdate [OK]");
};

WorldManagerTest.prototype.testMapUpdate = function() {

  var worldmanager = new WorldManager();
  var jsontext = '{"id":"-1","players":[{"id":"1","name":"player1","turn":"30","units":[]}],"map":{"length":"-1","width":"-1","cells":[{"type":"null","x":"-1","y":"-1"}]}}';
  var data = JSON.parse(jsontext);
  
  worldmanager.gameData(data);
  assertEquals("-1", worldmanager.game.map.length);
  assertEquals("-1", worldmanager.game.map.width);
  assertEquals("null", worldmanager.game.map.cells[0].type);
  assertEquals("-1", worldmanager.game.map.cells[0].x);
  assertEquals("-1", worldmanager.game.map.cells[0].y);

  jsontext = '{"length":"40","width":"100","cells":[{"type":"null","x":"0","y":"0"}]}';
  data = JSON.parse(jsontext);
  worldmanager.mapUpdate(data);
  assertEquals("40", worldmanager.game.map.length);
  assertEquals("100", worldmanager.game.map.width);
  assertEquals("null", worldmanager.game.map.cells[0].type);
  assertEquals("0", worldmanager.game.map.cells[0].x);
  assertEquals("0", worldmanager.game.map.cells[0].y);

  jstestdriver.console.log("+ testMapUpdate [OK]");
};

WorldManagerTest.prototype.testPlayerData = function() {

  var worldmanager = new WorldManager();
  var jsontext = '{"id":"-1","players":[{"id":"1","name":"player1","turn":"30","units":[]}],"map":{"length":"-1","width":"-1","cells":[{"type":"null","x":"-1","y":"-1"}]}}';
  var data = JSON.parse(jsontext);  
  worldmanager.gameData(data);
  assertEquals("1", worldmanager.game.players[0].id);
  assertEquals("player1", worldmanager.game.players[0].name);
  assertEquals("30", worldmanager.game.players[0].turn);

  jsontext = '{"id":"2","name":"player2","turn":"30","units":[]}';
  data = JSON.parse(jsontext);
  worldmanager.playerData(data);
  assertEquals("2", worldmanager.game.players[1].id);
  assertEquals("player2", worldmanager.game.players[1].name);
  assertEquals("30", worldmanager.game.players[1].turn);

  jstestdriver.console.log("+ testPlayerData [OK]");
};

WorldManagerTest.prototype.testPlayerUpdate = function() {

  var worldmanager = new WorldManager();
  var jsontext = '{"id":"-1","players":[{"id":"1","name":"player1","turn":"30","units":[]}],"map":{"length":"-1","width":"-1","cells":[{"type":"null","x":"-1","y":"-1"}]}}';
  var data = JSON.parse(jsontext);
  worldmanager.gameData(data);
  assertEquals("1", worldmanager.game.players[0].id);
  assertEquals("30", worldmanager.game.players[0].turn);

  jsontext = '{"id":"2","name":"player2","turn":"30","units":[]}';
  data = JSON.parse(jsontext);
  worldmanager.playerData(data);
  assertEquals("2", worldmanager.game.players[1].id);
  assertEquals("30", worldmanager.game.players[1].turn);
  
  jsontext = '{"id":"2","name":"player2","turn":"29","units":[]}';
  data = JSON.parse(jsontext);
  worldmanager.playerUpdate(data);
  assertEquals("2", worldmanager.game.players[1].id);
  assertEquals("29", worldmanager.game.players[1].turn);

  jstestdriver.console.log("+ testPlayerUpdate [OK]");
};

WorldManagerTest.prototype.testUnitCreate = function() {

  var worldmanager = new WorldManager();
  var jsontext = '{"id":"-1","players":[{"id":"1","name":"player1","turn":"30","units":[]},{"id":"2","name":"player1","turn":"30","units":[]}],"map":{"length":"-1","width":"-1","cells":[{"type":"null","x":"-1","y":"-1"}]}}';
  var data = JSON.parse(jsontext);
  worldmanager.gameData(data);
  
  var jsontext = '{"id":1,"name":"alpha","owner":2,"type":"monstre","attack":2,"defence":3,"view":5,"move":"null","properties":["prop1","prop2"]}';
  data = JSON.parse(jsontext);
  worldmanager.unitCreate(data);
  assertEquals("alpha", worldmanager.game.players[1].units[0].name);
  assertEquals("monstre", worldmanager.game.players[1].units[0].type);
  assertEquals("2", worldmanager.game.players[1].units[0].attack);

  jstestdriver.console.log("+ testUnitCreate [OK]");
};

WorldManagerTest.prototype.testUnitUpdate = function() {

  var worldmanager = new WorldManager();
  var jsontext = '{"id":"-1","players":[{"id":"1","name":"player1","turn":"30","units":[]},{"id":"2","name":"player1","turn":"30","units":[]}],"map":{"length":"-1","width":"-1","cells":[{"type":"null","x":"-1","y":"-1"}]}}';
  var data = JSON.parse(jsontext);
  worldmanager.gameData(data);
  
  var jsontext = '{"id":1,"name":"alpha","owner":2,"type":"monstre","attack":2,"defence":3,"view":5,"move":"null","properties":["prop1","prop2"]}';
  data = JSON.parse(jsontext);
  worldmanager.unitCreate(data);
  
  jsontext = '{"id":1,"owner":2,"attack":3,"defence":4,"view":6,"properties":["prop1","prop2","prop3"]}';
  data = JSON.parse(jsontext);
  worldmanager.unitUpdate(data);
  
  assertEquals("alpha", worldmanager.game.players[1].units[0].name);
  assertEquals("monstre", worldmanager.game.players[1].units[0].type);
  assertEquals("3", worldmanager.game.players[1].units[0].attack);
  assertEquals("4", worldmanager.game.players[1].units[0].defence);
  assertEquals("6", worldmanager.game.players[1].units[0].view);
  assertEquals("prop3", worldmanager.game.players[1].units[0].properties[2]);

  jstestdriver.console.log("+ testUnitUpdate [OK]");
};
