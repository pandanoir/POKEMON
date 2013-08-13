var ITEM=(function(){
	var ITEM=function(name){
		this.name=name;
		this.price=itemValue[name].price;
		this.battle=itemValue[name].battle;
		this.effect=itemValue[name].effect;
		this.description=itemValue[name].description;
	}
	ITEM.fn=ITEM.prototype;
	return ITEM;
})();
var itemValue={
	"生命の神秘":{price:0,battle:true,effect:"attck twice",description:"せいめいの しんぴ。わからないこは お父さんに聞こう"},
	"深海へのチケット":{price:0,battle:false,description:"チケットである。通常プレイでは入手不可"},
	"業力の槍":{price:0,battle:false,description:"伝説の槍。通常プレイでは入手不可"},

	"回復薬":{price:100,battle:true,effect:"hp 10",description:"HPを10回復する"},
	"超・回復薬":{price:1000,battle:true,effect:"hp 100",description:"HPを100回復する"},
	"しろい こな":{price:500,battle:true,effect:"hp 50",description:"HPを50回復する"},
	"あやしい しろい こな":{price:30000,battle:false,description:"使用禁止。お薬です。"},
	"まぼろし の しろい こな":{price:300000,battle:false,description:"使用禁止。お薬です。"},

	"銅コイン":{price:100,battle:false,description:"銅でできたコイン。売る以外に使い道はありません。"},
	"銀コイン":{price:1000,battle:false,description:"銀でできたコイン。売る以外に使い道はありません。"},
	"金コイン":{price:10000,battle:false,description:"金でできたコイン。売る以外に使い道はありません。"},
	"ダイヤ":{price:1000000,battle:false,description:"ダイヤモンド。持ってるとお金持ちっぽい。"},

	"なぞの CD":{price:0,battle:false,description:"なぞのCDです。高値で売れるかもしれません"},
	"えたいのしれない CD":{price:0,battle:false,description:"えたいのしれない CDです。高値で売れるかもしれません"},
	"でんせつの ライブCD":{price:10000000,battle:false,description:"A RA S◯I のライブCDです。"},
	"むかしの CD":{price:0,battle:false,description:"むかしの CDです。高値で売れるかもしれません"},

	"きなこ":{price:100,battle:false,description:"きなこです。"},
	"あんこ":{price:100,battle:false,description:"あんこです。"},
	"だんご":{price:100,battle:false,description:"だんごです。"},
	"とうもろこし":{price:300,battle:false,description:"とうもろこしです。"},
	"だいこん":{price:200,battle:false,description:"ふといだいこん(意味深)。"},
	"ケバフさん":{price:500,battle:false,description:"ケバフさんは至高の食べ物ケバフさんは至高の食べ物ケバフさんは至高の食べ物ケバフさんは至高の食べ物ケバフさんは至高の食べ物ケバフさんは至高の食べ物ケバフさんは至高の食べ物"},
	"りんごあめ":{price:300,battle:false,description:"りんごあめです。"},
	"チョコバナナ":{price:300,battle:false,description:"ちょこばななです。"},
	"ところてん":{price:300,battle:false,description:"網戸を使うと簡単にできます(大嘘)。"},
	"なまたまご":{price:100,battle:false,description:"なまたまご。"},
	"くさった なまたまご lv1":{price:0,battle:false,description:"まだお腹を壊すだけで食べられる…?"},
	"くさった なまたまご lv2":{price:0,battle:false,description:"まだ食べ物…?"},
	"くさった なまたまご lv3":{price:0,battle:false,description:"もはや食べ物の領域を超えてしまっている。"},
	"トマト":{price:300000,battle:false,description:"超高級トマトです。"},
	"バナナ(意味深)":{price:10000,battle:false,description:"意味深です"},
	"八ツ橋":{price:3000,battle:false,description:"八ツ橋です。"},

	"週刊少年ジャ◯プ":{price:240,battle:false,description:"少年雑誌です。さいきんはTo L◯VEるなどエッチいのが多くて(自主規制)です。"},
	"週刊少年マガ◯ン":{price:260,battle:false,description:"少年雑誌です。我妻さんは俺のヨメは新潟県民としては読むべき。"},
	"週刊少年サ◯デー":{price:240,battle:false,description:"少年雑誌です。高橋留美子 先生がたくさん漫画を出しておられます。新潟県民としては読むべき。"},
	"り◯ん":{price:500,battle:false,description:"少女漫画雑誌です。ジャ◯プと同じ集◯社が発行していることは意外と知られていない。"},
	"月刊コ◯コ◯コミック":{price:480,battle:false,description:"少女漫画雑誌です。サ◯デーと同じ小◯館が発行していることは意外と知られていない。"},
	"ち◯お":{price:500,battle:false,description:"少女漫画雑誌です。サ◯デーと同じ小◯館が発行していることは意外と知られていない。ちょっとひyな単語に見えます。"},

	"友情":{price:180,battle:false,description:"友情です。通常プレイでは入手不可"},
	"愛":{price:0,battle:false,description:"愛です。通常プレイでは入手不可。愛はプライスレス!"},
	"◯ンピース":{price:2000,battle:false,description:"大人気コミックワン◯ースです。"},
	"時のもと":{price:2013,battle:false,description:"時のもとです。通常プレイでは入手不可"},

	"オリーブオイル":{price:1000,battle:false,description:"も◯みちさん"},
	"きたない ぞうきん":{price:0,battle:false,description:"がんばって掃除をした証です。"},
	"きれいな ぞうきん":{price:100,battle:false,description:"きれいな ぞうきんです。"},
	"借金 1万":{price:-10000,battle:false,description:"借金です。早く返しましょう。"},
	"借金 10万":{price:-100000,battle:false,description:"借金です。早く返しましょう。"},
	"バ○アグラ":{price:6000,battle:true,effect:"attack twice,pp twice",description:""},
	"矢":{price:10000,battle:false,description:"弓道で使う矢。"},
	"ぼろい弓":{price:5000,battle:true,effect:"all 1%",description:"弓道で使う弓。ぼろいです。"},
	"すごい弓":{price:15000,battle:true,effect:"all 3%",description:"弓道で使う弓。すごいです。"},
	"ものすごい弓":{price:1000000,battle:true,effect:"all 5%",description:"弓道で使う弓。ものすごいです。"},
	"センス":{price:0,battle:false,description:"道に落ちてました。"},
	"和傘":{price:100000,battle:false,description:"和傘です。"},
	"まくら":{price:3000,battle:false,description:"磯野〜枕投げしようぜ〜"},
	"低反発まくら":{price:10000,battle:false,description:"低反発のまくら"},
	"お布団":{price:30000,battle:false,description:"日本の伝統。"},
	"野球ボール":{price:1000,battle:false,description:"磯野〜野球しようぜ〜"},
	"東大へのチケット":{price:500,battle:false,description:"東大へのチケットです。(注:東京大学とはいってないです)"},
	"家族":{price:1000000,battle:false,description:"やったね 家族が増えるよ!"},
	"おんなのこ":{price:1000000,battle:false,description:"おんなのこです。通常プレイでは入手不可"},
	"模試の結果":{price:0,battle:false,description:"模試の結果が返ってきた!"},
	"スマートフォン":{price:20000,battle:false,description:"スマートフォンです。便利でやみつきになって前の人にぶつかりそうになったりしないようにね!"},
	"死亡フラグ":{price:0,battle:false,description:"死亡フラグです。ちなみに英語ではMFDです。"},
	"ゆでたまご":{price:100,battle:false,description:"ゅでたまごぉぃしぃ"},
	"家":{price:10000000,battle:false,description:"男のロマン"},
	"扇風機":{price:2000,battle:false,description:"暑い夏はやっぱりこれ!"},
	"風鈴":{price:100,battle:false,description:"風流。とても風流。これを風流と思わない輩は非国民だ!"},
	"かわいさ":{price:500,battle:false,description:"かわいいは作れる!"}
//	"":{price:,battle:false,description:""},
}