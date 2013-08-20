var Pokemon=Backbone.Model.extend({
	initialize:function(option){
		this.set("attack",parseInt(pokemonValue[option.name].attack,10));
		this.set("defence",parseInt(pokemonValue[option.name].defence,10));
		this.set("speed",parseInt(pokemonValue[option.name].speed,10));
		this.set("hp",parseInt(pokemonValue[option.name].hp,10));
		this.set("src","pokemon/"+pokemonValue[option.name].src+".png");
		this.set("name",option.name);
		this.set("nickname",option.name);
		this.set("description",pokemonValue[option.name].description||"none");
		this.set("type",pokemonValue[option.name].type);
		this.set("lv",option.lv);
		this.set("exp",0);//exp=経験値
		this.set("technique",["叩く","殴る","ける","押し倒す"]);
	},
	attack:function(){
		return (((this.get("attack")*2/*+個体値+努力値/4*/)*this.get("lv")/100)+5);
	},
	defence:function(){
		return (((this.get("defence")*2/*+個体値+努力値/4*/)*this.get("lv")/100)+5);
	}
});
var Technique=Backbone.Model.extend({
	initialize:function(name){
		this.set("damage",technique[name].damage)
	}
});
var technique={
	"叩く":{damage:30},
	"殴る":{damage:50},
	"ける":{damage:15},
	"押し倒す":{damage:15}
}
var pokemonValue={
	"アクサワー":{attack:20,defence:13,speed:20,hp:44,src:"akusawa"},
	"ビビン":{attack:78,defence:56,speed:23,hp:38,src:"bibin"},
	"ボボヌザウルス":{attack:37,defence:29,speed:27,hp:29,src:"bobonuzaurusu",description:"ボノロフ島に生息"},
	"ブベツ":{attack:20,defence:24,speed:52,hp:10,src:"bubetu"},
	"ブロロウ":{attack:107,defence:101,speed:36,hp:88,src:"burorou"},
	"ビョロボロ":{attack:69,defence:21,speed:46,hp:85,src:"byoroboro"},
	"ヂヴァザン":{attack:49,defence:29,speed:88,hp:43,src:"divazan"},
	"ドドロノゴメス":{attack:42,defence:27,speed:95,hp:54,src:"dodoronogomesu"},
	"ドフ":{attack:85,defence:86,speed:93,hp:52,src:"dohu"},
	"フェイク":{attack:59,defence:53,speed:46,hp:84,src:"feiku"},
	"フォッド":{attack:34,defence:76,speed:30,hp:46,src:"foddo"},
	"ごんざれす":{attack:20,defence:18,speed:33,hp:12,src:"gonzaresu"},
	"ハンシー":{attack:60,defence:43,speed:51,hp:81,src:"hanshi"},
	"ヘィローセ":{attack:10,defence:94.5,speed:59,hp:21,src:"heirose"},
	"ヒネリ":{attack:84,defence:74,speed:58,hp:97,src:"hineri"},
	"イパサスコ":{attack:15,defence:22,speed:34,hp:87,src:"ipasasuko",type:"あく ひこう"},
	"ジャネン":{attack:40,defence:45,speed:17,hp:90,src:"janen"},
	"コムシ":{attack:0.1,defence:0.1,speed:20,hp:13,src:"komushi"},
	"コロゾウ":{attack:89,defence:75,speed:55,hp:44,src:"korozou"},
	"マクジョウ":{attack:29,defence:12,speed:27,hp:10,src:"makujou"},
	"マムー":{attack:6,defence:4,speed:9,hp:3,src:"mamu-"},
	"まさる":{attack:33,defence:24,speed:43,hp:51,src:"masaru2"},
	"ンバジョー":{attack:67,defence:24,speed:50,hp:59,src:"nbajo"},
	"ラストダンケ":{attack:26,defence:31,speed:53,hp:46,src:"rasutodanke"},
	"サイコ":{attack:97,defence:66,speed:91,hp:73,src:"saiko"},
	"スサイミ":{attack:37,defence:87,speed:47,hp:78,src:"susaimi"},
	"テカイン":{attack:70,defence:24,speed:18,hp:40,src:"tekain"},
	"チュパンディ":{attack:30,defence:42,speed:84,hp:46,src:"tyupandhi"},
	"ウラミ":{attack:33,defence:23,speed:34,hp:82,src:"urami"}
};