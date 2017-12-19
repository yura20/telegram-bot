const TelegramBot = require('node-telegram-bot-api');
const fs = require("fs");
const TOKEN = 'Your token';

const bot = new TelegramBot(TOKEN, {polling:true});
// array of words needed for playing game 'words'
var arr = ["рука", "око", "час", "голова", "слово", "земля", "життя", "день", "жінка", "нога", "сила", "людина", "місце", "рік", "чоловік", "обличчя", "голос", "двері", "думка", "батько", "серце", "бік", "україна", "бог", "хлопець", "пан", "ніч", "правда", "вода", "погляд", "дівчина", "сонце", "стіл", "небо", "тіло", "річ", "народ", "місто", "плече", "раз", "вікно", "син", "смерть", "стіна", "хвилина", "мама", "кінь", "кімната", "справа", "мова", "село", "князь", "Іван", "вулиця", "палець", "година", "дерево", "розмова", "машина", "місяць", "увага", "тисяча", "брат", "історія", "мить", "шлях", "ім'я", "вітер", "товариш", "дід", "вогонь", "мати", "хвиля", "Петро", "повітря", "козак", "ворог", "дорога", "військо", "крок", "вечір", "Микола", "будинок", "дружина", "частина", "дитина", "сльоза", "церква", "школа", "берег", "дух", "влада", "кінець", "щастя", "вухо", "любов", "лист", "капітан", "двір", "лице", "Андрій", "сон", "хліб", "рух", "держава", "корабель", "гора", "відповідь", "дім", "випадок", "біль", "книжка", "праця", "гетьман", "волосся", "кий", "Василь", "долоня", "ліжко", "розум", "доля", "сестра", "питання", "Марія", "сніг", "слава", "бій", "країна", "професор", "коліно", "дядько", "баба", "книга", "закон", "вигляд", "тиждень", "душа", "річка", "боротьба", "радість", "надія", "кров", "степ", "дощ", "Дмитро", "ідея", "камінь", "початок", "наука", "почуття", "тінь", "пам'ять", "сотня", "форма", "допомога", "трава", "дочка", "роман", "тиша", "темрява", "гра", "хмара", "поріг", "друг", "постать", "система", "кишеня", "війна", "лікар", "Іванович", "ніс", "Михайло", "полковник", "сорочка", "природа", "чоло", "господар", "зустріч", "проблема", "істота", "армія", "крик", "група", "цар", "табір", "спокій", "чорт", "ворота", "стан", "господа", "собака", "газета", "знак", "море", "член", "бажання", "король", "запитання", "план", "Степан", "папір", "човен", "Дніпро", "віра", "квартира", "служба", "острів", "сміх", "город", "звук", "особа", "центр", "гроші", "черга", "кабінет", "язик", "Київ", "глибина", "рід", "спосіб", "половина", "гріх", "наказ", "ласка", "риба", "крісло", "захід", "дим", "межа", "Москва", "дівчинка", "вихід", "Росія", "куток", "українець", "суд", "спина", "зброя", "хлопчик", "чин", "пора", "могила", "право", "можливість", "полк", "жах", "щока", "пляшка", "сад", "кохання", "клас", "поле", "герой", "зуб", "партія", "губа", "момент", "імператор", "біда", "уста", "колір", "Тарас", "ситуація", "шапка", "Олег", "коридор", "енергія", "простір", "старшина", "чобіт", "таємниця", "порядок", "доктор", "лава", "картина", "організація", "кухня", "команда", "юнак", "шкіра", "скеля", "солдат", "факт", "селянин", "враження", "честь", "решта", "обід", "товариство", "музика", "пісок", "начальник", "сумнів", "генерал", "туман", "запорожець", "Оксана", "метр", "вовк", "пес", "тітка", "вірш", "озеро", "нація", "командир", "письменник", "культура", "інформація", "маса", "брова", "прізвище", "сторона", "стежка"];
var obj = {};
for(var i=0; i<arr.length; i++){
	arr[i] = arr[i].toLowerCase();

	var lol = arr[i].slice(0, 1);
	if(obj[lol] == undefined){
		obj[lol]=[];
	}
	obj[lol].push(arr[i]);
}
var arrStickers = ['CAADAgADYQMAAmDJIQupOT02M_fHKwI', 'CAADAgADvQMAAmDJIQsKH8PQW9H3pgI', 'CAADAgADJAADNMoRCo9ibEFncPl2Ag', 'CAADAgADIQADuhxDEu-dwyGaRClbAg', 'CAADAgADqwIAAmDJIQuTcHMYzZFCnwI', 'CAADAgADMQgAAmDJIQuOIA4wqL5l_QI', 'CAADAgAD_gEAAsE8ngaWE8SzM2BG4AI', 'CAADAgADdQADtraCEkdC77gBY_YoAg', 'CAADAgAD8gMAAipVGALxzsfH7hW5SQI', 'CAADAgADXgIAAmDJIQuTiRDbcObgvwI', 'CAADAgADbQADtraCEgLmj-gAAQVaygI', 'CAADAgADDAIAAsE8nga-TR-rQYAIhwI', 'CAADAgADKwgAAmDJIQtVZ5_cmCm1egI', 'CAADAgADQwgAAmDJIQvqo5p6r6babAI', 'CAADAgADMggAAmDJIQthcQ8rUwo5LQI', 'CAADAgADMAgAAmDJIQvEf6nLoNyHMQI', 'CAADAgADjAcAAmDJIQvop1sD7lq-rgI', 'CAADAgADwAMAAmDJIQv4CmGLIyLW2gI', 'CAADAgADDQADuhxDEkX7A1kGDHm2Ag', 'CAADAgADxwEAAo5EEQIMNBoYMPR1FAI', 'CAADAgADbQUAAtJaiAEoiKOa2Gs7mAI', 'CAADAgADbgEAAjbsGwVfHkWISq9DiQI', 'CAADAgADlgUAAjbsGwWPgaTVkUai-wI', 'CAADBAADagADXSupAQsbG7vJr-NUAg', 'CAADAgADOgYAAp7OCwABwOsY7KjDkbUC', 'CAADAgADXiQAAp7OCwABfgfex9ZOpL0C', 'CAADAgADWyMAAp7OCwABwLfT_b7ryMYC', 'CAADAgADQAYAAp7OCwABdguh_v-a80QC', 'CAADAgADhQYAAp7OCwABOaSvr9lZejUC', 'CAADBAADMgMAAjW7NgABlVCQJLpuDZIC'];
function randomInteger(min, max) {
  var rand = min + Math.random() * (max - min)
  rand = Math.round(rand);
  return rand;
}
var repeatWords = {};
var lll = {};
bot.on('message', msg=>{
	console.log(msg.from.first_name+" - "+msg.text);
	if(msg.text != '/love' && msg.text != '/start' && msg.text != '/hate' && msg.text != '/song'  && msg.text != '/song_of_the_day' && msg.text != '/question' && msg.text != '/game' && msg.text != '/end_game'){
		const { chat:{id}} = msg
		try{
			msg.sticker.file_id;
			bot.sendSticker(id, arrStickers[randomInteger(0,arrStickers.length-1)]);
		}catch(e){
			if(game[msg.from.id] != undefined && game[msg.from.id] != 0 && msg.text != undefined){
				
			var len = repeatWords[msg.from.id].length;
			var k = 0;
			msg.text = msg.text.toLowerCase();				
			if(lll[msg.from.id] == undefined || lll[msg.from.id] == msg.text.slice(0,1)){
				repeatWords[msg.from.id].push(msg.text);
			for(var i=0; i<len; i++){
				if(msg.text != repeatWords[msg.from.id][i]){
					k++;
				}
			}
			if(k == len){
				if(obj[msg.text.slice(-1)] != undefined){
					for(var i=0; i<obj[msg.text.slice(-1)].length; i++){
						var l = 0;
						for(var j=0; j<repeatWords[msg.from.id].length; j++){
							if(obj[msg.text.slice(-1)][i] != repeatWords[msg.from.id][j]){
								l++;
								
							}
						}						
						if(l == repeatWords[msg.from.id].length){
							var mess = obj[msg.text.slice(-1)][i];
							if(mess.slice(-1) != 'ь' && mess.slice(-1) != 'и'){
								bot.sendMessage(id,  mess.slice(0,1).toLocaleUpperCase()+mess.slice(1)+'\nToбі на "'+mess.slice(-1).toUpperCase()+'"');
								repeatWords[msg.from.id].push(mess)
								lll[msg.from.id] = mess.slice(-1);
								break;
							}else{
								bot.sendMessage(id, mess.slice(0,1).toLocaleUpperCase()+mess.slice(1)+'\nToбі на "'+mess.slice(-2,-1).toUpperCase()+'"');
								repeatWords[msg.from.id].push(mess)
								lll[msg.from.id] = mess.slice(-2,-1);
								break;
							}
							
						}
						if(obj[msg.text.slice(-1)][i] == obj[msg.text.slice(-1)][obj[msg.text.slice(-1)].length-1]){
							bot.sendMessage(id, "Перемога за тобою!\n/game - якщо бажаєте почати спочатку");
							game[msg.from.id]=0;
							lll[msg.from.id] = undefined;
							
						}
						
					}
				}else if(obj[msg.text.slice(-2, -1)] != undefined){
					for(var i=0; i<obj[msg.text.slice(-2, -1)].length; i++){
						var l = 0;
						for(var j=0; j<repeatWords[msg.from.id].length; j++){
							if(obj[msg.text.slice(-2, -1)][i] != repeatWords[msg.from.id][j]){
								l++;
								
							}
							
						}
						
						if(l == repeatWords[msg.from.id].length){
							var mess = obj[msg.text.slice(-2, -1)][i];
							if(mess.slice(-1) != 'ь' && mess.slice(-1) != 'и'){
								bot.sendMessage(id,  mess.slice(0,1).toLocaleUpperCase()+mess.slice(1)+'\nToбі на "'+mess.slice(-1).toUpperCase()+'"');
								repeatWords[msg.from.id].push(mess)
//								repeatWords[msg.from.id].push(msg.text);
								lll[msg.from.id] = mess.slice(-1);
								break;
							}else{
								bot.sendMessage(id,  mess.slice(0,1).toLocaleUpperCase()+mess.slice(1)+'\nToбі на "'+mess.slice(-2,-1).toUpperCase()+'"');
								repeatWords[msg.from.id].push(mess)
								lll[msg.from.id] = mess.slice(-2,-1);
								break;
							}
							
						}
						if(obj[msg.text.slice(-2, -1)][i] == obj[msg.text.slice(-2, -1)][obj[msg.text.slice(-2, -1)].length-1]){
							bot.sendMessage(id, "Перемога за тобою!\n/game - якщо бажаєте почати спочатку");
							game[msg.from.id]=0;
							lll[msg.from.id] = undefined;
							
						}
						}
				}else{
					bot.sendMessage(id, "Упс, щось пішло не так :(");
				}
				
			}else{
				bot.sendMessage(id, "Це слово вже було");
			}		
			}else{
				
				bot.sendMessage(id, 'Слово має починатися на "'+lll[msg.from.id].toUpperCase()+'"\nТакож ви можете завершити гру /end_game');
			}
		}else{
			bot.sendSticker(id, arrStickers[randomInteger(0,arrStickers.length-1)]);
		}
		}
		
	}
})
bot.onText(/\/love/, function (msg, match) {
    var fromId = msg.from.id;
   	var photo = __dirname+'/photo/1.jpg';
	bot.sendPhoto(fromId, photo, {caption: "Любові тобі<3"});
});
bot.onText(/\/start/, function (msg, match) {
    var fromId = msg.from.id;
    bot.sendMessage(msg.from.id, "Привіт, "+msg.from.first_name+"! Я LoveBot.\nЯ створений для любові і не тільки.\nКоманди:\n/love /hate /song /song_of_the_day /question /game /end_game\nТакож ти можеш просто написати мені щось!");
});
bot.onText(/\/hate/, function (msg, match) {
    var fromId = msg.from.id;
    bot.sendMessage(msg.from.id, "Ти поганий!");
});
bot.onText(/\/song/, function (msg, match) {
	if(msg.text != '/song_of_the_day'){
	const { chat:{id}} = msg
			var audio = __dirname+'/audio/'+randomInteger(1, 22)+'.mp3';
			var stream = fs.createReadStream(audio);
			bot.sendAudio(id, stream);
	}
});
bot.onText(/\/song_of_the_day/, function (msg, match) {
	const { chat:{id}} = msg
			var audio = __dirname+'/audio/'+1+'.mp3';
			var stream = fs.createReadStream(audio);
			bot.sendAudio(id, stream);
});
var game = {}
bot.onText(/\/game/, function (msg, match) {
    var fromId = msg.from.id;
	game[msg.from.id]=1;
	lll[msg.from.id] = undefined;
	repeatWords[msg.from.id]=[];
	repeatWords[msg.from.id].push('qqq');
    bot.sendMessage(msg.from.id, "Гра почалася, за тобою перше слово)");
});
bot.onText(/\/end_game/, function (msg, match) {
    var fromId = msg.from.id;
	game[msg.from.id]=0;
	lll[msg.from.id] = undefined;
    bot.sendMessage(msg.from.id, "Гра закінчена)");
});
