var Pokemon=Backbone.Model.extend({
	initialize:function(name){
		this.set("attack",parseInt(pokemonValue[name].attack,10));
		this.set("defence",parseInt(pokemonValue[name].defence,10));
		this.set("speed",parseInt(pokemonValue[name].speed,10));
		this.set("hp",parseInt(pokemonValue[name].hp,10));
		this.set("src","pokemon/"+pokemonValue[name].src+".png");
		this.set("name",name);
		this.set("nickname",name);
		this.set("description",pokemonValue[name].description||"none");
		this.set("type",pokemonValue[name].type);
	}
});
var pokemonValue={
	"まさる":{attack:10,defence:20,speed:40,hp:30,src:"masaru2"},
	"ドドロノゴメス":{attack:42,defence:27,speed:95,hp:54,src:"dodoronogomesu"},
	"アクサワー":{attack:20,defence:13,speed:20,hp:44,src:"akusawa"},
	"ヂヴァザン":{attack:49,defence:29,speed:88,hp:43,src:"divazan"},
	"ブロロウ":{attack:107,defence:101,speed:36,hp:88,src:"burorou"},
	"ヘィローセ":{attack:10,defence:94.5,speed:59,hp:21,src:"heirose"},
	"ビョロボロ":{attack:69,defence:21,speed:46,hp:125,src:"byoroboro"},
	"ボボヌザウルス":{attack:37,defence:29,speed:27,hp:29,src:"bobonuzaurusu",description:"ボノロフ島に生息"},
	"イパサスコ":{attack:15,defence:22,speed:34,hp:87,src:"ipasasuko",type:"あく ひこう"},
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
	"ごんざれす2":{attack:20,defence:18,speed:33000000000,hp:12,src:"gonzaresu"},
	"イテカ":{attack:70,defence:24,speed:18,hp:40}
};