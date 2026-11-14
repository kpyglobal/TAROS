/* Content data: foods, recipes, villages, rules, map islands, etc. Edit here to change site content. */
/* ============ 資料（雛形：標示待確認，待族人審定） ============ */
const VERIFY = {zh:"待族人確認", en:"To be verified"};
const PENDING_TAO = "【族語待補】";

const SEASONS = {
  rayon:{tao:"Rayon", zh:"飛魚季", en:"Flying fish season", months:[2,3,4,5,6], color:"var(--red)",
    zhd:"捕飛魚、處理與曬飛魚。禁忌最多，旅人行動限制最嚴格。", end:"Catching, processing and drying flying fish. The season with the most taboos and the strictest visitor limits."},
  teyteyka:{tao:"Teyteyka", zh:"飛魚結束期", en:"End of flying fish season", months:[7,8,9,10], color:"var(--ochre)",
    zhd:"收藏飛魚乾，進行其他漁撈，也是陸蟹活動的季節。", end:"Storing dried flying fish, other fishing, and land crab season."},
  amiyan:{tao:"Amiyan", zh:"等待飛魚期", en:"Waiting for flying fish", months:[11,12,1], color:"var(--kuroshio)",
    zhd:"農耕、整地、造船，食用存糧。", end:"Farming, preparing fields, building boats, and living on stored food."}
};

const CATS = {
  sea:{zh:"海洋", en:"Ocean", color:"var(--kuroshio)"},
  tide:{zh:"潮間帶", en:"Intertidal", color:"var(--ochre)"},
  land:{zh:"土地", en:"Land", color:"var(--taro)"},
  stored:{zh:"保存食物", en:"Preserved", color:"var(--red)"}
};
const ROLES = {
  m:{zh:"男性", en:"Men"}, f:{zh:"女性", en:"Women"}, both:{zh:"男女分工合作", en:"Shared, divided by task"}
};

const FOODS = [
 {id:"alibangbang", tao:"alibangbang", zh:"飛魚", en:"Flying fish", cat:"sea", seasons:["rayon"], role:"both",
  get:{zh:"男性划拼板舟出海捕撈；女性處理、分類與曬魚。", en:"Men catch them from tatala boats; women process, sort and dry them."},
  eat:{zh:"依種類與時節有不同規範", en:"Rules differ by species and time"},
  d:{zh:"達悟族最核心的季節性食物，飛魚季的開始與結束組織了一整年的生活與飲食。不同種類的飛魚有不同名稱與地位。", en:"The central seasonal food of the Tao. The start and end of the flying fish season organize the whole year. Different species carry different names and status."},
  taboo:{zh:"飛魚季期間有許多處理、烹煮與食用的規矩，各部落細節不同。", en:"Many rules govern handling, cooking and eating during the season, varying by village."},
  src:["lit","int"], verify:true, game:true},
 {id:"dried", tao:PENDING_TAO, zh:"飛魚乾", en:"Dried flying fish", cat:"stored", seasons:["rayon","teyteyka"], role:"f",
  get:{zh:"女性負責曬製與保存。", en:"Women dry and store them."},
  eat:{zh:"家庭共食；過了特定時間點後剩餘飛魚乾不再食用", en:"Shared by the household; leftovers are not eaten after a set point in the year"},
  d:{zh:"一整年重要的蛋白質來源，也是「剛好就好」的保存智慧：存太少會挨餓，存太多則浪費。", en:"A key year-round protein, and a lesson in storing just enough."},
  taboo:{zh:"終食時間點與剩餘飛魚乾的處理方式待確認。", en:"The cut-off date and what happens to leftovers need verification."},
  src:["lit","int"], verify:true, game:true},
 {id:"dorado", tao:PENDING_TAO, zh:"鬼頭刀", en:"Mahi-mahi (dorado)", cat:"sea", seasons:["rayon"], role:"m",
  get:{zh:"男性於飛魚季捕撈，鬼頭刀會追捕飛魚。", en:"Caught by men during the flying fish season; it hunts flying fish."},
  eat:{zh:"待確認", en:"To be verified"},
  d:{zh:"與飛魚一起出現的大型魚，是飛魚季的重要漁獲。", en:"A large fish that follows the flying fish; an important catch of the season."},
  taboo:{zh:"待確認", en:"To be verified"}, src:["lit"], verify:true, game:true},
 {id:"oyod", tao:"oyod", zh:"女人魚（好魚）", en:"Women's fish (oyod)", cat:"sea", seasons:["teyteyka","amiyan"], role:"both",
  get:{zh:"男性捕撈，女性處理與烹煮。", en:"Caught by men, prepared and cooked by women."},
  eat:{zh:"女性、孩童、長者可食，男性也可食", en:"Women, children and elders may eat it; men may too"},
  d:{zh:"達悟族依魚的特性分類，女人魚被視為好的魚，適合全家食用。辨認魚類的知識本身就是食物主權。", en:"Fish are classified by their qualities. Oyod are considered good fish for everyone. Knowing how to classify fish is itself food sovereignty."},
  taboo:{zh:"不同類別的魚是否分開鍋具、餐具處理，待確認。", en:"Whether different fish classes need separate pots and dishes is to be verified."},
  src:["lit","int"], verify:true, game:true},
 {id:"rahet", tao:"rahet", zh:"男人魚（壞魚）", en:"Men's fish (rahet)", cat:"sea", seasons:["teyteyka","amiyan"], role:"m",
  get:{zh:"男性捕撈。", en:"Caught by men."},
  eat:{zh:"僅男性食用", en:"Eaten by men only"},
  d:{zh:"只有男性能吃的魚。分錯魚，家人就無法進食。", en:"Fish only men may eat. Misclassifying them means family members cannot eat."},
  taboo:{zh:"具體魚種清單待確認。", en:"The species list is to be verified."}, src:["lit"], verify:true, game:true},
 {id:"elderfish", tao:PENDING_TAO, zh:"老人魚", en:"Elders' fish", cat:"sea", seasons:["teyteyka","amiyan"], role:"m",
  get:{zh:"待確認", en:"To be verified"}, eat:{zh:"長者食用", en:"Eaten by elders"},
  d:{zh:"專屬長者的魚類，具體魚種與規範待確認。", en:"Fish reserved for elders; species and rules to be verified."},
  taboo:{zh:"待確認", en:"To be verified"}, src:["lit"], verify:true, game:true},
 {id:"taro", tao:PENDING_TAO, zh:"水芋", en:"Wetland taro", cat:"land", seasons:["rayon","teyteyka","amiyan"], role:"both",
  get:{zh:"男性開墾、整地與引水；女性種植、除草、照顧與採收。", en:"Men clear land and build irrigated fields; women plant, weed, tend and harvest."},
  eat:{zh:"全家主食", en:"Staple for everyone"},
  d:{zh:"達悟族主食，也是新船、新屋落成等場合的重要禮儀食物。芋頭也連結了整個太平洋的南島民族。", en:"The Tao staple, and a key ceremonial food when new boats or houses are completed. Taro links Austronesian peoples across the Pacific."},
  taboo:{zh:"水芋田的照顧規矩待補充。", en:"Field-care rules to be added."}, src:["lit","int"], verify:true, game:true},
 {id:"sweetpotato", tao:PENDING_TAO, zh:"地瓜", en:"Sweet potato", cat:"land", seasons:["rayon","teyteyka","amiyan"], role:"f",
  get:{zh:"待確認", en:"To be verified"}, eat:{zh:"全家主食", en:"Staple for everyone"},
  d:{zh:"重要主食之一。", en:"One of the main staples."}, taboo:{zh:"待確認", en:"To be verified"}, src:["lit"], verify:true},
 {id:"millet", tao:PENDING_TAO, zh:"小米", en:"Foxtail millet", cat:"land", seasons:[], role:"both",
  get:{zh:"待確認", en:"To be verified"}, eat:{zh:"待確認", en:"To be verified"},
  d:{zh:"與歲時活動相關的穀物，相關活動與分工待確認。", en:"A grain linked to seasonal activities; details to be verified."},
  taboo:{zh:"待確認", en:"To be verified"}, src:["lit"], verify:true},
 {id:"yam", tao:"ovi（待確認）", zh:"山藥", en:"Yam", cat:"land", seasons:[], role:"both",
  get:{zh:"待確認", en:"To be verified"}, eat:{zh:"待確認", en:"To be verified"},
  d:{zh:"根莖類食物，名稱可與其他南島語言比較。", en:"A root crop whose name can be compared with other Austronesian languages."},
  taboo:{zh:"待確認", en:"To be verified"}, src:["lit"], verify:true},
 {id:"landcrab", tao:PENDING_TAO, zh:"陸蟹", en:"Land crab", cat:"land", seasons:["teyteyka"], role:"f",
  get:{zh:"女性於夜間捕捉。", en:"Caught by women at night."}, eat:{zh:"待確認", en:"To be verified"},
  d:{zh:"夏季夜晚的食物。今日面臨道路路殺的威脅。", en:"A summer night food, now threatened by road traffic."},
  taboo:{zh:"避開抱卵母蟹，讓族群延續。", en:"Leave egg-carrying females so the population continues."}, src:["int"], verify:true, game:true},
 {id:"shellfish", tao:PENDING_TAO, zh:"潮間帶貝類與螺類", en:"Intertidal shellfish", cat:"tide", seasons:["rayon","teyteyka","amiyan"], role:"f",
  get:{zh:"女性於退潮時採集。", en:"Gathered by women at low tide."}, eat:{zh:"待確認", en:"To be verified"},
  d:{zh:"潮間帶是女性重要的食物來源，物種名稱待族人補充。", en:"The intertidal zone is an important food source for women; species to be added."},
  taboo:{zh:"只取需要的量，太小的不採（待確認）。", en:"Take only what is needed; leave small ones (to be verified)."}, src:["int"], verify:true, game:true},
 {id:"seaweed", tao:PENDING_TAO, zh:"海藻", en:"Seaweed", cat:"tide", seasons:[], role:"f",
  get:{zh:"女性採集。", en:"Gathered by women."}, eat:{zh:"待確認", en:"To be verified"},
  d:{zh:"種類與採集季節待補充。", en:"Species and season to be added."}, taboo:{zh:"待確認", en:"To be verified"}, src:["int"], verify:true},
 {id:"livestock", tao:PENDING_TAO, zh:"豬與羊", en:"Pigs and goats", cat:"land", seasons:[], role:"m",
  get:{zh:"男性飼養與宰殺。", en:"Raised and slaughtered by men."}, eat:{zh:"慶典時分享", en:"Shared at celebrations"},
  d:{zh:"在新船、新屋落成等場合分享的肉類。", en:"Meat shared when new boats or houses are completed."},
  taboo:{zh:"分享方式待確認。", en:"Sharing customs to be verified."}, src:["lit"], verify:true},
 {id:"coconutcrab", tao:PENDING_TAO, zh:"椰子蟹（保育類）", en:"Coconut crab (protected)", cat:"land", seasons:[], role:"both",
  get:{zh:"現為保育類，不可捕捉。", en:"Now protected; not to be caught."}, eat:{zh:"現今不可食用", en:"Not to be eaten today"},
  d:{zh:"「現在不能吃的食物」：說明生態保育如何改變飲食。", en:"A food no longer eaten, showing how conservation reshapes diets."},
  taboo:{zh:"依法保育。", en:"Protected by law."}, src:["lit"], verify:false}
];

const RECIPES = [
 {id:"r1", zh:"水煮飛魚", en:"Boiled flying fish", tao:PENDING_TAO, season:"rayon", who:{zh:"女性烹煮",en:"Cooked by women"},
  ing:{zh:["新鮮飛魚","水（是否使用海水待確認）"], en:["Fresh flying fish","Water (whether seawater is used: to be verified)"]},
  steps:{zh:["飛魚依規矩處理與切割（方式待族人示範）","放入鍋中以水煮熟","與芋頭一同食用"], en:["Prepare and cut the fish the customary way (to be demonstrated)","Boil until cooked","Eat with taro"]},
  note:{zh:"飛魚季期間的鍋具、烹煮方式可能有專門規矩，請以族人說明為準。", en:"Pots and cooking methods may follow special rules in the season; follow community guidance."}},
 {id:"r2", zh:"曬飛魚乾", en:"Drying flying fish", tao:PENDING_TAO, season:"rayon", who:{zh:"女性負責",en:"Women's work"},
  ing:{zh:["處理好的飛魚","鹽（用量待確認）"], en:["Prepared flying fish","Salt (amount to be verified)"]},
  steps:{zh:["剖開飛魚（切法待族人示範）","抹鹽（待確認）","掛在曬魚架上日曬","曬乾後收藏，作為非飛魚季的存糧"], en:["Open the fish (method to be shown)","Salt (to be verified)","Hang on drying racks in the sun","Store as food for the off-season"]},
  note:{zh:"旅人請勿觸碰曬魚架上的魚，那是家庭一整年的糧食。", en:"Visitors: please don't touch fish on the racks; it is a family's food for the year."}},
 {id:"r3", zh:"水煮芋頭", en:"Boiled taro", tao:PENDING_TAO, season:"all", who:{zh:"女性烹煮",en:"Cooked by women"},
  ing:{zh:["水芋","水"], en:["Wetland taro","Water"]},
  steps:{zh:["採收後清洗","整顆或切塊放入鍋中","水煮至熟透","搭配魚類食用"], en:["Wash after harvest","Put in the pot whole or in pieces","Boil until soft","Serve with fish"]},
  note:{zh:"可與夏威夷的 poi（芋泥）比較，看同一種作物在太平洋的不同吃法。", en:"Compare with Hawaiian poi to see one crop eaten differently across the Pacific."}},
 {id:"r4", zh:"水煮陸蟹", en:"Boiled land crab", tao:PENDING_TAO, season:"teyteyka", who:{zh:"女性捕捉與烹煮",en:"Caught and cooked by women"},
  ing:{zh:["陸蟹（不取抱卵母蟹）","水"], en:["Land crab (no egg-carrying females)","Water"]},
  steps:{zh:["夜間捕捉後清洗","水煮至變色熟透"], en:["Clean after night catch","Boil until cooked through"]},
  note:{zh:"捕捉季節與數量規範待確認。", en:"Season and quantity rules to be verified."}},
 {id:"r5", zh:"達悟餐桌：魚與芋頭", en:"A Tao meal: fish and taro", tao:PENDING_TAO, season:"all", who:{zh:"全家共食，依魚類分配",en:"Shared, served by fish class"},
  ing:{zh:["芋頭或地瓜","當季魚類（依女人魚、男人魚分類）"], en:["Taro or sweet potato","Seasonal fish (sorted by class)"]},
  steps:{zh:["主食與魚分別烹煮","依魚的類別分配給適合的家人","全家共食"], en:["Cook staples and fish separately","Serve each fish class to the right family members","Eat together"]},
  note:{zh:"學生練習：比較你家的一餐和達悟餐桌，誰決定吃什麼？食材從哪裡來？", en:"Student task: compare your family meal with a Tao meal. Who decides what is eaten? Where does the food come from?"}}
];

const VILLAGES = [
 {tao:"Imorod", zh:"紅頭", status:"rayon", zhn:"每年由紅頭率先舉行招魚祭，宣告飛魚季開始。", en:"Imorod holds the first ceremony each year to open the flying fish season."},
 {tao:"Iratay", zh:"漁人", status:"rayon", zhn:"與紅頭相鄰。部落飲食特色待族人提供。", en:"Neighbors Imorod. Food traditions to be added by the community."},
 {tao:"Yayo", zh:"椰油", status:"rayon", zhn:"旅人常見的入島接觸點。部落飲食特色待族人提供。", en:"A common first stop for visitors. Food traditions to be added."},
 {tao:"Iraraley", zh:"朗島", status:"rayon", zhn:"島的北端。部落飲食特色待族人提供。", en:"On the north coast. Food traditions to be added."},
 {tao:"Iranmeylek", zh:"東清", status:"rayon", zhn:"觀光活動較多。部落飲食特色待族人提供。", en:"Busy with tourism. Food traditions to be added."},
 {tao:"Ivalino", zh:"野銀", status:"rayon", zhn:"傳統地下屋保存完整。部落飲食特色待族人提供。", en:"Known for well-kept traditional semi-underground houses. Food traditions to be added."}
];

const RULES = [
 {no:true, zh:["飛魚季不進入灘頭","灘頭是拼板舟的地方。請確認當地部落是否已進入飛魚季。"], en:["Stay off boat beaches in the season","Beaches belong to the boats. Check whether this village's season has begun."]},
 {no:true, zh:["飛魚季不觸碰拼板舟","包括倚靠、拍照時接觸。季節結束後，可在族人帶領下體驗。"], en:["Don't touch boats in the season","Not even to lean or pose. After the season, you can try one with a local guide."]},
 {no:true, zh:["不接近祭典","請在遠處安靜離開，不拍攝。"], en:["Keep away from ceremonies","Leave quietly from a distance and don't film."]},
 {no:true, zh:["不觸碰曬魚架上的魚","那是一個家庭一整年的糧食。"], en:["Don't touch drying fish","It is a family's food for the year."]},
 {no:false, zh:["拍人、拍家屋前先詢問","對方同意後再拍。"], en:["Ask before photographing people or homes","Shoot only with permission."]},
 {no:false, zh:["主動問能不能幫忙","族人會帶你參與適合的工作，例如潮間帶或水芋田。"], en:["Ask how you can help","Hosts may invite you to suitable work, like the shore or taro fields."]}
];

const GAME = "https://claude.ai/artifact/Hk3pXi1bKbNeKcVk3j9ach";
const GAME_ROLE_IDS = ["tm","tw","vm","vw"];
const GAME_ROLES = [
 {zh:"族人男青年", en:"Tao young man", d:{zh:"拼板舟、飛魚、開墾", en:"Boats, flying fish, clearing land"}},
 {zh:"族人女青年", en:"Tao young woman", d:{zh:"潮間帶、陸蟹、水芋田、曬魚", en:"Shore, land crabs, taro, drying fish"}},
 {zh:"男旅人", en:"Male visitor", d:{zh:"學結網、看造船、學習尊重", en:"Net-making, boat-building, learning respect"}},
 {zh:"女旅人", en:"Female visitor", d:{zh:"潮間帶、水芋田、學料理", en:"Shore, taro fields, cooking"}}
];

const WORDS = [
 {lang:{zh:"達悟語（蘭嶼）",en:"Tao (Lanyu)"}, taro:"【待確認】", yam:"ovi【待確認】", ff:"alibangbang"},
 {lang:{zh:"伊瓦坦語（菲律賓巴丹群島）",en:"Ivatan (Batanes, Philippines)"}, taro:"【待確認】", yam:"【待確認】", ff:"dibang【待確認】"},
 {lang:{zh:"夏威夷語",en:"Hawaiian"}, taro:"kalo", yam:"uhi", ff:"mālolo"},
 {lang:{zh:"薩摩亞語",en:"Samoan"}, taro:"talo", yam:"ufi", ff:"【待確認】"},
 {lang:{zh:"東加語",en:"Tongan"}, taro:"talo", yam:"ʻufi", ff:"【待確認】"},
 {lang:{zh:"斐濟語",en:"Fijian"}, taro:"dalo", yam:"uvi", ff:"【待確認】"},
 {lang:{zh:"毛利語（奧特亞羅瓦）",en:"Māori (Aotearoa)"}, taro:"taro", yam:"uwhi", ff:"【待確認】"}
];

const PARTNERS = [
 {zh:"巴丹群島（伊瓦坦族）", en:"Batanes (Ivatan)", d:{zh:"與達悟族語言最接近的鄰居，同樣有飛魚與海洋文化，可比較季節與分工。", en:"The Tao's closest linguistic relatives, also with flying fish and ocean traditions."}},
 {zh:"夏威夷", en:"Hawaiʻi", d:{zh:"水芋田（loʻi kalo）復興運動，可對照蘭嶼水芋田的保存與傳承。", en:"The revival of loʻi kalo, wetland taro fields, parallels Lanyu's taro fields."}},
 {zh:"奧特亞羅瓦（紐西蘭）", en:"Aotearoa", d:{zh:"毛利族的原住民資料主權與食物主權實踐，可作為資料治理參考。", en:"Māori work on Indigenous data and food sovereignty offers governance models."}},
 {zh:"斐濟、薩摩亞、東加", en:"Fiji, Samoa, Tonga", d:{zh:"芋頭與海洋飲食在進口食物衝擊下的韌性經驗。", en:"Experiences of taro and ocean foodways under pressure from imported food."}}
];

const PEOPLES = [
 ["阿美族","Amis"],["泰雅族","Atayal"],["排灣族","Paiwan"],["布農族","Bunun"],["卑南族","Puyuma"],
 ["魯凱族","Rukai"],["鄒族","Tsou"],["賽夏族","Saisiyat"],["雅美族（達悟族）","Yami / Tao"],["邵族","Thao"],
 ["噶瑪蘭族","Kavalan"],["太魯閣族","Truku"],["撒奇萊雅族","Sakizaya"],["賽德克族","Seediq"],
 ["拉阿魯哇族","Hla'alua"],["卡那卡那富族","Kanakanavu"]
];
const AUSTRO = [["台灣","Taiwan"],["菲律賓","Philippines"],["印尼","Indonesia"],["馬來西亞","Malaysia"],["密克羅尼西亞","Micronesia"],["美拉尼西亞","Melanesia"],["玻里尼西亞","Polynesia"],["馬達加斯加","Madagascar"]];

const ISLANDS = [
 {id:"taiwan", lon:121.0, lat:23.7, zh:"台灣", en:"Taiwan", who:{zh:"台灣原住民族（政府認定 16 族）",en:"Indigenous peoples of Taiwan (16 recognized)"}, foods:{zh:["小米","芋頭","山藥","地瓜","各族內容建置中"],en:["Millet","Taro","Yam","Sweet potato","More as each people joins"]}, d:{zh:"多數語言學家認為台灣是南島語族向外擴散的起點，太平洋與印度洋的南島語言都與台灣有親屬關係。資料庫將從達悟族出發，逐步連結台灣 16 族。",en:"Most linguists see Taiwan as the starting point of the Austronesian expansion; Austronesian languages across the Pacific and Indian Oceans are related to Taiwan's. The database will grow from the Tao to all 16 peoples."}, inset:true},
 {id:"lanyu", lon:121.55, lat:22.05, zh:"蘭嶼", en:"Lanyu (Pongso no Tao)", who:{zh:"達悟族（雅美族）",en:"Tao (Yami)"}, foods:{zh:["飛魚","水芋","山藥","陸蟹"],en:["Flying fish","Wetland taro","Yam","Land crab"]}, d:{zh:"本資料庫的起點，位於台灣東南方的黑潮上。三季曆依飛魚洄游安排一整年的工作與飲食。",en:"Where this database begins, in the Kuroshio southeast of Taiwan. The three-season calendar follows the flying fish."}, home:true, inset:true},
 {id:"batanes", lon:121.97, lat:20.45, zh:"巴丹群島", en:"Batanes", who:{zh:"伊瓦坦族（菲律賓）",en:"Ivatan (Philippines)"}, foods:{zh:["飛魚","芋頭","山藥"],en:["Flying fish","Taro","Yam"]}, d:{zh:"與達悟語最接近的語言。同樣有飛魚文化，可比較季節、分工與保存方式。",en:"Closest linguistic kin of the Tao, also with flying fish traditions to compare."}, inset:true},
 {id:"palau", lon:134.6, lat:7.5, zh:"帛琉", en:"Palau", who:{zh:"帛琉人",en:"Palauans"}, foods:{zh:["水芋田","海洋漁撈"],en:["Taro patches","Reef fishing"]}, d:{zh:"水芋田與性別分工的比較案例（待確認）。",en:"A comparison case for taro fields and gendered work (to be verified)."}},
 {id:"guam", lon:144.8, lat:13.4, zh:"關島與馬里亞納", en:"Guåhan & Marianas", who:{zh:"查莫洛族",en:"CHamoru"}, foods:{zh:["【待補】"],en:["[to be added]"]}, d:{zh:"密克羅尼西亞的南島民族，食物內容待合作夥伴提供。",en:"Austronesian people of Micronesia; food content to come from partners."}},
 {id:"fiji", lon:178, lat:-17.7, zh:"斐濟", en:"Fiji", who:{zh:"iTaukei 斐濟原住民",en:"iTaukei Fijians"}, foods:{zh:["dalo 芋頭","海洋漁撈"],en:["Dalo (taro)","Fishing"]}, d:{zh:"芋頭在進口食物衝擊下的韌性經驗。",en:"How taro holds up under pressure from imported food."}},
 {id:"tonga", lon:184.8, lat:-21.2, zh:"東加", en:"Tonga", who:{zh:"東加人",en:"Tongans"}, foods:{zh:["talo 芋頭","ʻufi 山藥"],en:["Talo (taro)","ʻUfi (yam)"]}, d:{zh:"山藥在東加飲食與禮儀中的地位，可與蘭嶼對照。",en:"The place of yam in Tongan food and ceremony, compared with Lanyu."}},
 {id:"samoa", lon:188, lat:-13.8, zh:"薩摩亞", en:"Samoa", who:{zh:"薩摩亞人",en:"Samoans"}, foods:{zh:["talo 芋頭","palusami 芋葉椰奶"],en:["Talo (taro)","Palusami"]}, d:{zh:"芋頭與芋葉的多種吃法，適合做學生食譜比較。",en:"Many ways of eating taro and its leaves; good for student recipe comparisons."}},
 {id:"aotearoa", lon:174, lat:-41, zh:"奧特亞羅瓦", en:"Aotearoa", who:{zh:"毛利族",en:"Māori"}, foods:{zh:["kūmara 地瓜","māra kai 食物園"],en:["Kūmara","Māra kai gardens"]}, d:{zh:"原住民資料主權與食物園復興的經驗，可作為本計畫資料治理的參考。",en:"Indigenous data sovereignty and food garden revival as governance models."}},
 {id:"hawaii", lon:204.4, lat:19.9, zh:"夏威夷", en:"Hawaiʻi", who:{zh:"夏威夷原住民（Kanaka Maoli）",en:"Kanaka Maoli"}, foods:{zh:["kalo 芋頭","poi 芋泥","loʻi 水芋田"],en:["Kalo","Poi","Loʻi"]}, d:{zh:"水芋田復興運動，可對照蘭嶼水芋田的保存與傳承。",en:"The loʻi kalo revival parallels Lanyu's wetland taro fields."}},
 {id:"tahiti", lon:210.6, lat:-17.7, zh:"大溪地", en:"Tahiti", who:{zh:"毛希人（Māʻohi）",en:"Māʻohi"}, foods:{zh:["taro 芋頭","ʻuru 麵包樹"],en:["Taro","ʻUru (breadfruit)"]}, d:{zh:"芋頭與麵包樹構成的島嶼主食體系。",en:"An island staple system of taro and breadfruit."}},
 {id:"rapanui", lon:250.6, lat:-27.1, zh:"拉帕努伊", en:"Rapa Nui", who:{zh:"拉帕努伊人",en:"Rapa Nui people"}, foods:{zh:["【待補】"],en:["[to be added]"]}, d:{zh:"玻里尼西亞三角的東端，食物內容待合作夥伴提供。",en:"The eastern corner of the Polynesian Triangle; content to come from partners."}}
];

const TAROS = [
 {L:"T", zh:"傳統生態知識", en:"Traditional Ecological Knowledge", d:{zh:"三季曆、魚類分類、採集規矩：禁忌本身就是資源管理。", en:"Seasons, fish classes and harvest rules: taboos as resource management."}},
 {L:"A", zh:"人工智慧", en:"AI", d:{zh:"AI 助理只依族人審定的資料回答，標示來源，族人可撤回資料。AI 不取代族人知識。", en:"The assistant answers only from reviewed data, cites sources, and communities can withdraw data. AI never replaces community knowledge."}},
 {L:"R", zh:"韌性", en:"Resilience", d:{zh:"存糧、分享網絡、生態休養，面對氣候變遷、海洋變化與進口食物。", en:"Food stores, sharing networks and resting ecosystems in the face of climate, ocean change and imported food."}},
 {L:"O", zh:"大洋洲食物之路", en:"Oceanic Foodways", d:{zh:"芋頭、飛魚與拼板舟，連結蘭嶼與太平洋的南島民族。", en:"Taro, flying fish and plank boats link Lanyu with Austronesian peoples."}},
 {L:"S", zh:"主權", en:"Sovereignty", d:{zh:"誰決定吃什麼、誰擁有知識、誰從資料中受益。", en:"Who decides what is eaten, who holds knowledge, who benefits from data."}}
];

const METHOD = [
 {h:{zh:"文獻回顧",en:"Literature review"}, d:{zh:"整理民族誌、學位論文、政府報告與族人著作。每筆資料標註出處，待補引用處以【待補】標示。",en:"Ethnographies, theses, government reports and works by Tao authors. Every entry is cited; gaps are marked."}},
 {h:{zh:"族人訪談",en:"Community interviews"}, d:{zh:"以知情同意進行訪談，受訪者以代碼呈現。受訪者可決定哪些內容公開、哪些只供研究使用。",en:"Interviews with informed consent, identified by code. Interviewees decide what is public and what stays in research only."}},
 {h:{zh:"族人審定",en:"Community review"}, list:{zh:["研究團隊整理資料","各部落族人審閱","族語老師校對族語","審定後公開上線","族人可隨時要求修正或撤回"],en:["Research team compiles data","Village members review","Language teachers check Tao terms","Published after approval","Communities may correct or withdraw at any time"]}}
];
