var Pokemon=Backbone.Model.extend({
	initialize:function(option){
		this.set("attack",parseInt(pokemonValue.get(option.name).get("attack"),10));
		this.set("defence",parseInt(pokemonValue.get(option.name).get("defence"),10));
		this.set("speed",parseInt(pokemonValue.get(option.name).get("speed"),10));
		this.set("hp",parseInt(pokemonValue.get(option.name).get("hp"),10));
		this.set("maxHp",parseInt(pokemonValue.get(option.name).get("hp"),10));
		this.set("src","pokemon/"+pokemonValue.get(option.name).get("src")+".png");
		this.set("name",option.name);
		this.set("nickname",option.name);
		this.set("description",pokemonValue.get(option.name).get("description")||"none");
		this.set("type",pokemonValue.get(option.name).get("type"));
		this.set("lv",option.lv);
		this.set("technique",["叩く","殴る","ける","押し倒す"]);
	},
	attack:function(){
		return (((this.get("attack")*2/*+個体値+努力値/4*/)*this.get("lv")/100)+5);
	},
	defence:function(){
		return (((this.get("defence")*2/*+個体値+努力値/4*/)*this.get("lv")/100)+5);
	},
	defaults:{
		exp:0
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
var poke=Backbone.Model.extend({});
var pokemonValue=Backbone.Collection.extend({});
pokemonValue=new pokemonValue([new poke({id:"アクサワー",attack:20,defence:13,speed:20,hp:44,src:"akusawa",no:1}),new poke({id:"ビビン",attack:78,defence:56,speed:23,hp:38,src:"bibin",no:2}),new poke({id:"ボボヌザウルス",attack:37,defence:29,speed:27,hp:29,src:"bobonuzaurusu",description:"ボノロフ島に生息",no:3}),new poke({id:"ブベツ",attack:20,defence:24,speed:52,hp:10,src:"bubetu",no:4}),new poke({id:"ブロロウ",attack:107,defence:101,speed:36,hp:88,src:"burorou",no:5}),new poke({id:"ビョロボロ",attack:69,defence:21,speed:46,hp:85,src:"byoroboro",no:6}),new poke({id:"ヂヴァザン",attack:49,defence:29,speed:88,hp:43,src:"divazan",no:7}),new poke({id:"ドドロノゴメス",attack:42,defence:27,speed:95,hp:54,src:"dodoronogomesu",no:8}),new poke({id:"ドフ",attack:85,defence:86,speed:93,hp:52,src:"dohu",no:9}),new poke({id:"フェイク",attack:59,defence:53,speed:46,hp:84,src:"feiku",no:10}),new poke({id:"フォッド",attack:34,defence:76,speed:30,hp:46,src:"foddo",no:11}),new poke({id:"ごんざれす",attack:20,defence:18,speed:33,hp:12,src:"gonzaresu",no:12}),new poke({id:"ハンシー",attack:60,defence:43,speed:51,hp:81,src:"hanshi",no:13}),new poke({id:"ヘィローセ",attack:10,defence:94.5,speed:59,hp:21,src:"heirose",no:14}),new poke({id:"ヒネリ",attack:84,defence:74,speed:58,hp:97,src:"hineri",no:15}),new poke({id:"イパサスコ",attack:15,defence:22,speed:34,hp:87,src:"ipasasuko",type:"あく ひこう",no:16}),new poke({id:"ジャネン",attack:40,defence:45,speed:17,hp:90,src:"janen",no:17}),new poke({id:"コムシ",attack:0.1,defence:0.1,speed:20,hp:13,src:"komushi",no:18}),new poke({id:"コロゾウ",attack:89,defence:75,speed:55,hp:44,src:"korozou",no:19}),new poke({id:"マクジョウ",attack:29,defence:12,speed:27,hp:10,src:"makujou",no:20}),new poke({id:"マムー",attack:6,defence:4,speed:9,hp:3,src:"mamu-",no:21}),new poke({id:"まさる",attack:33,defence:24,speed:43,hp:51,src:"masaru2",no:22}),new poke({id:"ンバジョー",attack:67,defence:24,speed:50,hp:59,src:"nbajo",no:23}),new poke({id:"ピサンチョー",attack:3,defence:9,speed:10,hp:40,src:"pisantyo",no:24}),new poke({id:"ラストダンケ",attack:26,defence:31,speed:53,hp:46,src:"rasutodanke",no:25}),new poke({id:"サイコ",attack:97,defence:66,speed:91,hp:73,src:"saiko",no:26}),new poke({id:"スサイミ",attack:37,defence:87,speed:47,hp:78,src:"susaimi",no:27}),new poke({id:"テカイン",attack:70,defence:24,speed:18,hp:40,src:"tekain",no:28}),new poke({id:"チュパンディ",attack:30,defence:42,speed:84,hp:46,src:"tyupandhi",no:29}),new poke({id:"ウラミ",attack:33,defence:23,speed:34,hp:82,src:"urami",no:30}),new poke({id:"ハットゥ",attack:45,defence:35,speed:21,hp:58,src:"hatto",no:31}),new poke({id:"ドンブゥディー",attack:155,defence:205,speed:11,hp:308,src:"donbudhi",no:32}),new poke({id:"ピャーラン",attack:85,defence:35,speed:101,hp:78,src:"pyaran",no:33}),new poke({id:"闇",attack:1005,defence:1005,speed:1001,hp:1008,src:"yami",no:34}),new poke({id:"ギャンキュー",attack:20,defence:4,speed:2,hp:18,src:"gyankyu",no:35})]);
(function(){
	var count=0;
	var result=[];
	for(var i=0;i<pokemonValue.models.length;i++){
		result.push(pokemonValue.models[i].get("id"))
		pokemonValue.models[i].set("no",i);//番号更新時のみ
	}
//	console.log(JSON.stringify(result))//番号更新時のみ
	pokemonValue.Length=i+1;
})()