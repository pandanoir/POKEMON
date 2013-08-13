var POKEMON=(function(){
	var poke=function(name){
		this.attack=pokemonValue[name].attack;
		this.defence=pokemonValue[name].defence;
		this.speed=pokemonValue[name].speed;
		this.hp=pokemonValue[name].hp;
		this.src="pokemon/"+pokemonValue[name].src+".png";
		this.name=name;
		this.nickname=name;
	}
	poke.fn=poke.prototype;
	return poke;
})();
var pokemonValue={
	"まさる":{attack:30,defence:30,speed:30,hp:30,src:"masaru2"},
	"ドドロノゴメス":{attack:42,defence:27,speed:95,hp:54,src:"dodoronogomesu"},
	"アクサワー":{attack:20,defence:13,speed:20,hp:44,src:"akusawa"},
	"ヂヴァザン":{attack:49,defence:29,speed:88,hp:43,src:"divazan"},
	"ブロロウ":{attack:107,defence:101,speed:36,hp:88,src:"burorou"},
	"ヘィローセ":{attack:1,defence:9.5,speed:5,hp:2,src:"heirose"},
	"ビョロボロ":{attack:69,defence:21,speed:46,hp:125,src:"byoroboro"},
	"ボボヌザウルス":{attack:37,defence:29,speed:27,hp:29,src:"bobonuzaurusu"},
	"イパサスコ":{attack:15,defence:22,speed:34,hp:87,src:"ipasasuko"},
	"チュパンディ":{src:"tyupandhi"},
	"スサイミ":{src:"susaimi"},
	"ハンシー":{attack:60,defence:43,speed:51,hp:81,src:"hanshi"},
	"サイコ":{attack:97,defence:66,speed:91,hp:73,src:"saiko"},
	"ジャネン":{attack:40,defence:45,speed:17,hp:150,src:"janen"},
	"コムシ":{attack:0.1,defence:0.1,speed:20,hp:1,src:"komushi"},
	"ンバジョー":{attack:67,defence:24,speed:50,hp:59,src:"nbajo"},
	"ヒネリ":{attack:84,defence:74,speed:58,hp:97,src:"hineri"},
	"コロゾウ":{attack:89,defence:75,speed:55,hp:44,src:"korozou"},
	"ブベツ":{attack:20,defence:24,speed:52,hp:10,src:"bubetu"},
	"ウラミ":{attack:33,defence:23,speed:34,hp:82,src:"urami"},
	"ごんざれす":{attack:20,defence:18,speed:33,hp:12,src:"gonzaresu"},
	"イテカ":{attack:70,defence:24,speed:18,hp:40}
};