# v1.10.17.1版本更新内容

- 新武将
OL：裴元绍、族杨修、族杨赐、界关张、夏侯恩、界郭淮、界伏皇后、曹纯、赵忠、谋张让、谋文丑、谋贾诩、闪赵云、闪刘宏、祢衡
新杀：谋荀彧（带〖先识〗）、谋董承、谋曹洪、田忌、曹媛、刘衿刘佩、威董卓
手杀：谋吕布、庞羲、孙韶、夏侯尚、杨弘、吴珂、势陈到、邢道荣、雍闿、清河公主、势娄圭、谋夏侯渊、势于吉、友崔均、友石韬、(玄)司马昭
TW：张允、幻曹丕、幻典韦、幻曹植、幻曹冲
线下：四象封印太阳
- 调整文鸳、界刘表、星丁奉、徐馨、SP祝融、乐蔡邕、张怀、武陆抗技能至最新版
-  解禁隐藏武将：张任、张臶、陆伯言、周公瑾、英雄杀荆轲、四季映姬、年兽、昆特牌伊欧菲斯、轩辕剑陈辅、程咬金、麦尔斯、秦叔宝、张烈，并为张烈补图
- 增补线下1v1华佗、DIY周公瑾【劫焰】、四季映姬·夜魔仙那度【映冢】，四季映姬·夜魔仙那度可自选挑战，同时提供十殿阎罗的隐藏BOSS触发
- `lib.element.player.say`现在会过滤不为表情包的html标签，服务器的新建约战标题会自动削去HTML标签。
- 修复两个鲍信的prompt错误
- 修复backup子技能的filterOk有定义时直接赋值，没有再走一遍filterCard导致印牌不走条件的bug
- 势太史慈〖振锋〗切换原画条件变更
- 颜良文丑prompt文本错误
- 修复角色死亡弃置装备区黑桃牌不能触发OL董翓凤瑶回血的bug
- 手杀界顾雍秉壹交互优化
- 修改如意金箍棒的技能翻译
- 修复手杀毌丘俭征荣无人可选但仍有弹窗的bug
- 修复direct+chooseToUse导致的计时器异常
- 修复OL程普疠火打中后ai弃牌报错
- 修复陈蕃印桃因没有save的tag的报错
- 修复势太史慈振锋修改后酣战摸牌数异常
- 修复二版武陆抗超过两人的拼点事件报错
- 幻丁尚涴技能id命名错误
- 修复满宠御策ai错误
- 调整OL郭照【椒遇】【内训】
- 修复OL界廖化【伏枥】报错
- 修复王匡【任侠】部分情况下（如手里有如董白给的黠慧黑杀选择弃牌）死循环的bug
- 优化SP刘备【誓仇】【昭烈】、星SP张飞【大喝】
- 3D精选武将包添加ddd前缀
- 修复3d甄宓未对“水相”牌进行牌数判定的bug
- 修复手杀谋郭淮【精策】因化身类技能获得后回合结束时没有判定精策牌数的bug
- 修复SP刘备【煮酒】联机未生效、OL谋张绣【仇猎】不能弃置装备区的武器牌的bug
- 修复银月枪使用【杀】未进行限制的bug
- 修复侯成【献酿】失去体力条件错误的bug
- 优化3d甄宓【水相】【淼形】、卑弥呼【纵傀】、【骨疽】、【拜假】、【蚕食】、【秉诏】
- 修复【五谷丰登】的fixedShownCards在置入处理区的relatedEvent设置错误
- 修复未开启自动确定时托管的bug
- 修复刘禅【享乐】、【推心置腹】角色死亡报错的bug
- 修复曹髦【清正】、张怀【诀言】托管报错的bug
- 修复装备【冲应神符】受到无来源伤害的bug
- 修复【固国安邦】联机报错的bug
- 修复OL谋邓艾【积谷】不为判断体力上限最大的bug
- 修复谋曹丕及TW谋曹丕【行殇】增加体力上限效果未对角色进行体力上限小于10判断的bug
- 修复刘永【诛佞】不选择使用伤害牌报错的bug
- 修复孙霸【结党】不弃置延时锦囊牌的bug
- 修复OL蒲元托管默认助力的bug
- 调整SP甄宓【惠济】、友诸葛【演策】、手杀董昭【妙略】、手杀彭羕【达命】结算
- 优化枣祗任峻【粮策】【坚壁】、TW葛玄【丹法】、【灵宝】、【司道】、【太极拂尘】、薛灵芸【暗织】操作方式
- 修复汉末南华老仙【御风】与类似十常侍对局只有一人而卡死的bug
- 修复眭固角色名错误及其【吞天】技能描述和结算错误的bug
- 修复手杀贾充【悖逆】可以对自己发动的bug
- 修复合赵云【镇胆】使用牌不触发神孙权【圣质】的bug
- 修复衰董卓【观势】火攻被抵消后续结算不改为决斗的bug
- 旧杨芷【婉嫕】、龙凤【游龙】适配中流
- 优化一些执行额外阶段的技能
- 优化含当你受到1点伤害后/当你失去1点体力后的描述的技能
- 修复转黄忠【摧锋】【登难】未检测不为卡牌造成的伤害而报错的bug
- 修复浮云【余热】仅检测弃牌阶段弃牌的bug
- 优化浮云【余热】
- 地道的黄豆表情包
- 修复神司马联机忍戒不能获得忍标记的bug
- 优化本体delete event.result.skill的技能的操作改为log:false
- 线下武将暗影调整
- 修复伏完【持重】无技能描述的bug
- 修复起孔融【争义】报错的bug
- 优化get.cardsetion方法中对势力色底的get方式
- 修复OL武安国【厉勇】、卢氏【驻颜】联机客机报错
- 修复OL界张春华【翦灭】、谋华雄【搏决】、马玩【浑疆】、谋孔融【争义】、年兽【岁崇】等联机报错且不为同时选择的bug
- 修复OLSP曹操【西向】结算错误的bug
- 调整威吕布【骁武】、【霸关】；调整韩氏五虎分包
- 优化梦曹操【政略】、与【求援】相关的多个伏皇后
- 补充遗漏的addskills和removeskills的popup参数
- 修复谋貂蝉【离间】和起皇甫嵩【居下】的bug
- 修复吾彦【澜疆】没有手牌数小于自己的目标角色仍然摸牌的bug
- 修复晋贾充【凶竖】未检测出牌结束时未与发动技能时的阶段不为同一个阶段而导致可以对下一个触发此时机的角色而非目标角色造成伤害的bug
- 修复用间曹操【义兵】不为转化杀的bug
- 修复OL刘璋【丰蔚】受到牌的伤害未加伤的bug
- 修复韩五虎【披靡】未适配联机且未进行await的bug
- 修复OL李异【缠双】使用杀计入次数限制的bug
- 修复友庞统【养名】未进行await的bug
- 修复神张辽【止啼】受到无来源伤害报错的bug
- 修复族王允【铭戒】联机效果显示错误的bug
- 修复族王沈【岸然】点击取消发动报错的bug
- 修复孙笨觉醒【制霸】拒绝拼点报错的bug
- 修复周姬【炎谋】遇到八卦阵报错的bug
- 修复汉末神皇甫嵩对死亡玩家仍能发动【破怠】的bug
- OL冯妤、SP张郃、OL朱灵、郭照、OL胡班、OL董昭、OL王荣、左芬、写轮眼、DIY于吉优化
- 庞宏【评骘】翻译勘误；
- 初步修复部分需要打出牌的本体卡牌未限制合法性的问题
- 修复界左慈【化身】翻页会导致已选择的制衡化身牌丢失bug并调整此技能结算为OL操作方式
- 将十周年版本的曹纯移动至限定专属包的祈福小包
- 修复江山如故娄圭【沙城】【凝寒】配音台词写反的bug
- 修复神庞统【鸾锁】不能弃置的牌也得是回合开始时打上“鸾锁”标记牌的bug
- 修改应天神司马【戢鳞】初始“志”张数为全模式两张
- 修复谋程昱【告谏】选择交换牌但是不进行交换的弹窗bug
- 修复旧伏皇后【求援】进行两次角色选择的bug
- 修复幻曹昂【离渊】storage的e被吃掉的bug
- 删除鲍信【毅谋】、刘晔【破橹】的技能中的!!及技能相关的衍生bug
- 修复薛灵芸【霞泪】部分情况下无法触发的bug
- 修复SP甄姬【惠济】开五谷不判定角色数和是否有可使用目标的bug
- 管宁【遁世】技能筛选优化，不会筛选描述中含有“游戏开始时”的技能
- 调整本体所有“一轮游戏开始时”的技能描述为“每轮开始时
- 将character下的`lib.character`和mode下除国战外的`lib.characterPack\[mode\]`中的武将改为类Character写法，Character具体属性详见`noname/library/element/character.js`，旧写法改新写法步骤可参考其中的`setPropertiesFromTrash`方法
- 使用传统方法引用`lib.characterPack\[mode\]`的扩展需改用`get.character`等进行检测
- 移除无引用的character/jiange.js、character/boss.js、character/xiake.js
- 移除本体所有带alter标签的技能的alter相关信息，并移除对应的菜单显示机制
- 移除四象彭羕、无图片和技能实现的注释武将和DIY包剩余注释武将
- 移除蛇年错印武将廖化、张飞、朱儁
- 移除部分冗余素材
-  删除部分注释掉的武将和技能代码
- 重写【望梅止渴】ai
- 修复DIY曹操【号令】描述并async化
- 唯一连环的人机被队友属性杀时不会一律不出闪
- 常备主候选武将数支持选3个
- 更新README.md
- 将本体中出现在trashBin下的图片引用改为更规范的img属性
- 适配本体扩展『诸神降临』
- 将yinbin1.mp3和yinbin2.mp3引用更新为yinbing1.mp3和yinbing2.mp3
- 简化Get.rank方法，修改本体绝大多数武将的武将出场率
- 修复手杀薛综【诫询】不能弃置装备牌的bug
- 修复中津静流【念力】被如义绝封印而可以一直发动的bug
- 修复标郭皇后【矫诏】没手牌导致不能替换而报错的bug
- 修复幻陆逊【逆涡】、孙翎鸾【盼睇】dcpandi_effect的mod的selectCard拼写错误的bug
- 修复侯成【献酿】不为基本牌也视为酒的bug
- 修复庞宏【评骘】未显示转换技标记的bug
- 修复OL蒲元【神工】不能替换打造的装备的bug
- 修复OL谋庞统【鸿图】联机不显示手牌上限且报错的bug
- 修复修复当主机处于chooseToUse衍生的chooseButton事件选择中时，客机取消无懈会导致该事件异常被终止且无法正常生成event.resultOL导致_wuxie事件异常暂停的bug；

# 新增函数/函数修改/函数修复
1. 将Get.character方法的返回值改为经get.convertedCharacter包装后的结果
2. 修复联机模式下询问【无懈可击】因chooseButton框架引起的游戏异常暂停
3. 修复了生成onChooseToUse赋值时的cancel会生成“事件cancel”触发节点的bug
4. 移除了markSkill因nobroadcast不向客机广播的设定用于修复客机有些标记看不见的bug
5. 修复`lib.elemet.Player.respond`未全部使用get.autoViewAs包装而导致如通过八卦打出闪而没有event.card.cards和如使用丈八打出杀判断颜色错误的bug
6. 修复了$gain2进行moveDelete动画时不更新卡牌信息的bug
7. 修复客机$gain2卡牌信息缺失、$gain没有卡牌信息的bug；对$draw的卡牌信息代码进行优化
8. 优化get.cardsetion，增加get.sourceSkillFor获取源技能
9. 为给element/content.js的chooseToCompareMultiple和chooseToCompareMeanwhile的step 0加上先检测是否有对应角色的fixedResult，避免出现角色没牌但已经有fixedResult仍结束拼点事件的情况
10. 在precontent或其他可修改_wuxie、chooseToUse、chooseToRespond的event.result(event.wuxieresult2)的地方，将对应result.cancel设置为true，则此次预使用卡牌作废，相应事件将goto(0)
11. 新增`lib.element.player.isMaxMaxHp`、`lib.element.player.isMinMaxHp`方法判断一名角色是否为场上体力上限最大/最小
```js
/**
 * 判断玩家是否是场上体力上限最少的玩家
 * @param { boolean } [only] 是否唯一
 * @returns { boolean }
 */
isMinMaxHp(only) {
	return game.players.every(value => {
		if (value.isOut() || value == this) return true;
		return only ? value.maxHp > this.maxHp : value.maxHp >= this.maxHp;
	});
}
/**
 * 判断玩家是否是场上体力最大的玩家
 * @param { boolean } [only] 是否唯一
 * @param { boolean } [raw]
 * @returns { boolean }
 */
isMaxHp(only, raw) {
	return game.players.every(value => {
		if (value.isOut() || value == this) return true;
		return only ? value.getHp(raw) < this.getHp(raw) : value.getHp(raw) <= this.getHp(raw);
	});
}
```
12. 针对是否拥有XXX牌的判定修复+优化，详细内容如下：
① 修复`lib.element.player.hasUsableCard`不走filter的bug，添加最后的返回值false
② 修改`lib.element.player.hasSha`和`lib.element.player.hasShan`的判断逻辑，不传入参数默认为use使用情况，传入respond为打出情况，传入all为使用和打出的情况，并修复和”自动跳过“选项的联动问题
③ 修复和调整本体诸多使用hasSha和hasShan的地方逻辑和respondSha和respondShan的skillTag的arg逻辑
④ 调整`lib.filter.autoRespondSha`和`lib.filter.autoRespondShan`的逻辑为仅判定打出情况
```js
//新的lib.element.player.hasSha
/**
 * 有没有可用杀
 * @param { string | boolean } [respond] 响应什么类型，默认使用。"use": 使用 / "respond": 打出 / "all": 全部，true
 * @param { boolean } [noauto] 不考虑出牌阶段才能用的（待补充）
 */
hasSha(respond, noauto) {
	if (this.countCards("hs", "sha")) return true;
	if (this.countCards("hs", "hufu")) return true;
	if (!noauto && this.countCards("hs", "yuchanqian")) return true;
	if (typeof respond !== "string") respond = respond ? "all" : "use";
	if (this.hasSkillTag("respondSha", true, respond, true)) return true;
	return this.hasUsableCard("sha", respond);
}
//新的lib.element.player.hasShan
/**
 * 有没有可用闪
 * @param { string | boolean } [respond] 响应什么类型，默认使用。"use": 使用 / "respond": 打出 / "all": 全部，true
 */
hasShan(respond) {
	if (this.countCards("hs", "shan")) return true;
	if (this.countCards("hs", "hufu")) return true;
	if (typeof respond !== "string") respond = respond ? "all" : "use";
	if (this.hasSkillTag("respondShan", true, respond, true)) return true;
	return this.hasUsableCard("shan", respond);
}
//新的lib.element.player.hasUsableCard
/**
 * @param { string } name
 * @param { string } type
 * @returns { boolean | undefined }
 */
hasUsableCard(name, type) {
	const player = this;
	if (typeof type !== "string") type = type ? "limit" : "all";
	let event = get.event();
	let evtNames = typeof type !== "string" || type === "all" ? ["chooseToUse", "chooseToRespond"] : ["chooseTo" + type.slice(0, 1).toUpperCase() + type.slice(1)];
	if (
		player.hasCard(i => {
			if (get.name(i, player) !== name) return false;
			if (type === "all") return true;
			return evtNames.some(evtName => {
				let evt = event.getParent(evtName);
				if (get.itemtype(evt) !== "event") evt = event;
				if (type === "respond") return lib.filter.cardRespondable(i, player, evt);
				return lib.filter.cardEnabled(i, player, type === "limit" ? evt : "forceEnable");
			});
		}, "hs")
	)
		return true;
	const skills = player.getSkills("invisible").concat(lib.skill.global);
	game.expandSkills(skills);
	for (let i = 0; i < skills.length; i++) {
		const skill = skills[i],
			ifo = get.info(skill),
			hiddenCard = ifo.hiddenCard;
		if (ifo.usable !== undefined) {
			let num = ifo.usable;
			if (typeof num === "function") num = ifo.usable(skill, player);
			if (typeof num === "number" && get.skillCount(skill, player) >= num) continue;
		}
		if (ifo.viewAs && typeof ifo.viewAs !== "function" && typeof ifo.viewAs !== "string" && ifo.viewAs.name === name) {
			const goon = !ifo.viewAsFilter || ifo.viewAsFilter(player) !== false;
			const bool =
				!ifo.filter ||
				evtNames.some(evtName => {
					let evt = event.getParent(evtName);
					if (get.itemtype(evt) !== "event") evt = get.event();
					if (ifo["on" + evtName.slice(0, 1).toUpperCase() + evtName.slice(1)]) ifo["on" + evtName.slice(0, 1).toUpperCase() + evtName.slice(1)](evt);
					return ifo.filter(evt, player, evt.triggername);
				});
			if (goon && bool) return true;
		} else if (typeof hiddenCard == "function") {
			if (hiddenCard(player, name)) return true;
		}
	}
	return false;
}
```
13. 现在可以用[vue.js](https://cn.vuejs.org/)/其他前端库/框架编写扩展/模式的“帮助”界面

- 对于vue，如果传入的是带有`data`方式或`setup`方式的对象，则认定为是vue的组件，将通过本体自带的vue创建并挂载到帮助界面上，代码案例如下（以关于游戏为示范，下同）:

```javascript
{
	help: {
		关于游戏: {
			template: html`
				<div style="margin:10px">关于无名杀</div>
				<ul style="margin-top:0">
					<li>
						无名杀官方发布地址仅有GitHub仓库！<br />
						<a :href="repoLink">点击前往Github仓库</a>
						<br/>
					</li>
					<li>
						无名杀基于GPLv3开源协议。
						<br />
						<a :href="licenseLink">点击查看GPLv3协议</a>
						<br />
					</li>
					<li>
						其他所有的所谓“无名杀”社群（包括但不限于绝大多数“官方”QQ群、QQ频道等）均为玩家自发组织，与无名杀官方无关！
					</li>
				</ul>
			`,
			setup() {
				const repoLink = "https://github.com/libnoname/noname";
				const licenseLink = "https://www.gnu.org/licenses/gpl-3.0.html";

				return {
					repoLink,
					licenseLink
				}
			}
		}
	}
}
```

- 对于其他前端库/框架，如果传入的是带有mount方式的对象，则会调用该函数，参数为帮助页面的dom元素；此处兼容已创建的vue应用

例如，创建preact的帮助界面，则代码大致如下:

```javascript
{
	help: {
		关于游戏: {
			mount(node) {
				function App() {
					const repoLink = "https://github.com/libnoname/noname";
					const licenseLink = "https://www.gnu.org/licenses/gpl-3.0.html";
					
					return html`
						<div style="margin:10px">关于无名杀</div>
						<ul style="margin-top:0">
							<li>
								无名杀官方发布地址仅有GitHub仓库！<br />
								<a href=${repoLink}>点击前往Github仓库</a>
								<br/>
							</li>
							<li>
								无名杀基于GPLv3开源协议。
								<br />
								<a href=${licenseLink}>点击查看GPLv3协议</a>
								<br />
							</li>
							<li>
								其他所有的所谓“无名杀”社群（包括但不限于绝大多数“官方”QQ群、QQ频道等）均为玩家自发组织，与无名杀官方无关！
							</li>
						</ul>
					`;
				}
				
				h(html`<App />`, node);
			}
		}
	}
}
```

- 对于不满足上述条件的对象，则直接按照以前的字符串解析

14. 现在无名杀会在当前事件变动后通过`lib.announce`广播变动前后的事件

大致用法如下:

```javascript
lib.announce.subscribe("Noname.Game.Event.Changed", ([now, last]) => {
	// 在事件变更前后打印相关事件的名字
	// now是变更后的事件，last是变更前的事件
	console.log(`[Event Change] To "${now.name}" From "${last.name}"`);
});
```

- Q: 广播的时机是事件变更前还是事件变更后
  A: 事件变更后，此时当前事件已经变成了新事件
