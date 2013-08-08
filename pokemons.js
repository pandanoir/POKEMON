var POKEMON=(function(){
	var poke=function(name){
		this.attack=pokemonValue[name].attack;
		this.defence=pokemonValue[name].defence;
		this.speed=pokemonValue[name].speed;
		this.hp=pokemonValue[name].hp;
		this.img=pokemonValue[name].img;
		this.name=name;
		this.nickname=name;
	}
	poke.fn=poke.prototype;
	return poke;
})();
var pokemonValue={
	"まさる":{attack:30,defence:30,speed:30,hp:30,src:"masaru2"},
	"ドドロノゴメス":{attack:4,defence:2,speed:9,hp:5,src:"dodoronogomesu"},
	"アクサワー":{attack:2,defence:1,speed:2,hp:4,src:"akusawa"},
	"ヂヴァザン":{attack:4,defence:2,speed:8,hp:4,src:"divazan"},
	"ブロロウ":{attack:10,defence:10,speed:3,hp:8,src:"burorou"},
	"ヘィローセ":{attack:1,defence:9.5,speed:5,hp:2,src:"heirose"},
	"ビョロボロ":{attack:6,defence:12,speed:4,hp:15,src:"byoroboro"},
	"ボボヌザウルス":{attack:3,defence:2,speed:2,hp:2,src:"bobonuzaurusu"},
	"イパサスコ":{attack:15,defence:2,speed:3,hp:8,src:"ipasasuko"},
	"チュパンディ":{src:"tyupandhi"},
	"スサイミ":{src:"susaimi"},
	"ハンシー":{attack:6,defence:4,speed:15,hp:8,src:"hanshi"},
	"サイコ":{attack:9,defence:6,speed:9,hp:7,src:"saiko"},
	"ジャネン":{attack:4,defence:4,speed:10,hp:10,src:"janen"},
	"コムシ":{attack:0.1,defence:0.1,speed:20,hp:1,src:"komushi"},
	"ンバジョー":{attack:6,defence:2,speed:5,hp:5,src:"nbajo"},
	"ヒネリ":{attack:8,defence:7,speed:5,hp:9,src:"hineri"},
	"コロゾウ":{attack:8,defence:7,speed:5,hp:4,src:"korozou"},
	"ブベツ":{attack:2,defence:2,speed:5,hp:1,src:"bubetu"},
	"ウラミ":{attack:3,defence:2,speed:3,hp:8,src:"urami"},
	"ごんざれす":{attack:2,defence:1,speed:3,hp:1,src:"gonzaresu"}
};