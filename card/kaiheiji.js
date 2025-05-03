import { lib, game, ui, get, ai, _status } from "../noname.js";
game.import("card", function () {
	return {
		name: "kaiheiji",
		connect: true,
		card: {
			//无天无界照搬无中ai
			wutian: {
				audio: true,
				fullskin: true,
				type: "trick",
				enable: true,
				selectTarget: -1,
				toself: true,
				filterTarget(card, player, target) {
					return target == player;
				},
				modTarget: true,
				async content(event, trigger, player) {
					const next = get.info("olzhouxi").content(event, trigger, player);
					if (next) await next;
				},
				//用的无中的ai改的
				ai: {
					wuxie(target, card, player, viewer) {
						if (get.mode() == "guozhan") {
							if (!_status._aozhan) {
								if (!player.isMajor()) {
									if (!viewer.isMajor()) return 0;
								}
							}
						}
						if (target.countCards("h") * Math.max(target.hp, 5) > 6) return 0;
					},
					basic: {
						order: 7,
						useful: 4.5,
						value: 9.5,
					},
					result: {
						target: 2,
					},
				},
			},
			//兄弟齐心无ai
			qixin: {
				audio: true,
				fullskin: true,
				enable: true,
				type: "trick",
				filterTarget: lib.filter.notMe,
				modTarget: lib.filter.notMe,
				async content(event, trigger, player) {
					const target = event.target,
						cards1 = player.getCards("h"),
						cards2 = target.getCards("h");
					for (const targetx of [player, target]) {
						await targetx
							.lose(targetx == player ? cards1 : cards2, ui.ordering, "visible")
							.set("getlx", false)
							.set("log", false);
						targetx.$throw(targetx == player ? cards1 : cards2);
					}
					const result = await target
						.chooseToMove("兄弟同心：请分配" + get.translation(player) + "和你的手牌", true)
						.set("list", [
							[get.translation(player) + "获得的牌", cards1],
							["你获得的牌", cards2],
						])
						.set("processAI", function (list) {
							const player = get.player(),
								target = get.event().getParent().player,
								att = get.attitude(player, target),
								cards1 = get.event().cards1,
								cardx1 = cards1.filter(card => card.name == "du"),
								cardy1 = cards1.removeArray(cardx1),
								cards2 = get.event().cards2,
								cardx2 = cards2.filter(card => card.name == "du"),
								cardy2 = cards2.removeArray(cardx2);
							switch (get.sgn(att)) {
								case 1: //这里的ai写得很糙
									const cards = cards1.concat(cards2),
										cardsx = cards.randomGets(Math.floor(cards.length / 2));
									return [cardsx, cards.removeArray(cardsx)];
								case 0:
								case -1:
									return [cardx1.concat(cardx2), cardy1.concat(cardy2)];
							}
						})
						.set("cards1", cards1)
						.set("cards2", cards2)
						.forResult();
					if (result?.bool) {
						await player.gain(result.moved[0], "gain2");
						await target.gain(result.moved[1], "gain2");
						const num = player.countCards("h") - target.countCards("h");
						if (num > 0) await target.draw();
						else if (num < 0) await player.draw();
					}
				},
			},
			//两肋插刀照搬增兵减灶ai
			chadao: {
				audio: true,
				fullskin: true,
				enable: true,
				type: "trick",
				filterTarget: lib.filter.notMe,
				modTarget: true,
				content() {
					const cards = [];
					while (cards.length < 2) {
						const card = get.cardPile(card => get.tag(card, "damage") > 0.5 && !cards.includes(card));
						if (card) cards.add(card);
						else break;
					}
					if (cards.length) target.gain(cards, "gain2");
				},
				//增兵减灶的ai
				ai: {
					order: 7,
					useful: 4,
					value: 10,
					tag: {
						draw: 2,
					},
					result: {
						target(player, target) {
							if (target.hasJudge("lebu")) return 0;
							return Math.max(1, 2 - target.countCards("h") / 10);
						},
					},
				},
			},
			//劝酒无ai
			khquanjiu: {
				audio: true,
				fullskin: true,
				type: "trick",
				enable: true,
				selectTarget: -1,
				filterTarget: true,
				reverseOrder: true,
				async content(event, trigger, player) {
					const result = await event.target
						.chooseToUse("劝酒：使用一张【酒】或点数为9的牌，否则失去1点体力", function (card) {
							if (get.name(card) != "jiu" && get.number(card) != 9) return false;
							return lib.filter.cardEnabled.apply(this, arguments);
						})
						.set("ai2", function () {
							return get.effect_use.apply(this, arguments) + 0.01;
						})
						.set("addCount", false)
						.forResult();
					if (!result.bool) await event.target.loseHp();
				},
			},
			//落井下石无ai
			luojing: {
				global: "luojing_skill",
				audio: true,
				fullskin: true,
				type: "trick",
				ai: {
					basic: {
						useful: [6, 4, 3],
						value: [6, 4, 3],
					},
					result: { player: 1 },
					expose: 0.2,
				},
				filterTarget(card, player, target) {
					return player != target && target.isDying();
				},
				content() {
					const evt = event.getParent("dying");
					if (evt.player == target) {
						evt.set("skipTao", true);
					}
				},
			},
			//红运当头用的树上开花的ai
			hongyun: {
				enable: true,
				fullskin: true,
				type: "trick",
				selectTarget: 2,
				toself: true,
				filterTarget(card, player, target) {
					return target == player || (target != player && target.countCards("h"));
				},
				filterOk() {
					return ui.selected.targets.includes(get.player());
				},
				modTarget: true,
				async content(event, trigger, player) {
					const target = event.target;
					const result = await target
						.chooseToDiscard(`红运当头：是否弃置至多两张牌然后获得等量红桃牌`, [1, 2], "he")
						.set("ai", card => 6 - get.value(card))
						.forResult();
					if (result?.bool && result.cards) {
						const cards = [];
						while (cards.length < result.cards.length) {
							const card = get.cardPile(card => get.suit(card) == "heart" && !cards.includes(card));
							if (card) cards.add(card);
							else break;
						}
						if (cards.length) await target.gain(cards, "gain2", "log");
						else target.chat("无事发生");
					}
				},
				//修改树上开花的ai
				ai: {
					wuxie() {
						return 0;
					},
					basic: {
						useful: 3,
						value: 3,
						order: 5,
					},
					result: {
						target(player, target, card) {
							var cards = ui.selected.cards.concat(card.cards || []);
							var num = player.countCards("he", function (card) {
								if (cards.includes(card)) return false;
								return 6 > get.value(card);
							});
							if (!num) return 0;
							if (num < 2) return 0.5;
							return 1.2;
						},
					},
					tag: {
						loseCard: 1,
						discard: 1,
						//norepeat: 1,
					},
				},
			},
			//生死与共照搬草船的ai
			shengsi: {
				fullskin: true,
				type: "trick",
				wuxieable: true,
				savable(card, player, dying) {
					return dying != player;
				},
				filterTarget(card, player, target) {
					return player != target && target.isDying();
				},
				selectTarget: 1,
				modTarget: true,
				content() {
					player.addSkill("shengsi_debuff");
					player.markAuto("shengsi_debuff", target);
					target.recover(2);
				},
				//照搬草船ai
				ai: {
					basic: {
						useful: [6, 4],
						value: [6, 4],
					},
					result: { target: 1 },
				},
			},
			//雷公没ai
			leigong: {
				global: ["leigong_skill"],
				audio: true,
				fullskin: true,
				type: "trick",
				enable: true,
				selectTarget: -1,
				filterTarget: true,
				reverseOrder: true,
				content() {
					target.executeDelayCardEffect("shandian");
				},
			},
			//有难同当照搬铁索ai
			younan: {
				audio: true,
				fullskin: true,
				type: "trick",
				enable: true,
				selectTarget: -1,
				filterTarget(card, player, target) {
					return !target.isLinked();
				},
				reverseOrder: true,
				content() {
					target.link();
				},
				//照搬铁索的ai
				ai: {
					wuxie: (target, card, player, viewer, status) => {
						if (status * get.attitude(viewer, player._trueMe || player) > 0 || target.hasSkillTag("noLink") || target.hasSkillTag("nodamage") || target.hasSkillTag("nofire") || target.hasSkillTag("nothunder")) return 0;
						if (get.damageEffect(target, player, viewer, "thunder") >= 0 || get.damageEffect(target, player, viewer, "fire") >= 0) return 0;
						if (target.hp + target.hujia > 2 && target.mayHaveShan(viewer, "use")) return 0;
					},
					basic: {
						order: 7.3,
						useful: 1.2,
						value: 4,
					},
					result: {
						target: (player, target) => {
							if (target.hasSkillTag("link") || target.hasSkillTag("noLink")) return 0;
							let curs = game.filterPlayer(current => {
								if (current.hasSkillTag("noLink") || current.hasSkillTag("nodamage")) return false;
								return !current.hasSkillTag("nofire") || !current.hasSkillTag("nothunder");
							});
							if (curs.length < 2) return 0;
							let f = target.hasSkillTag("nofire"),
								t = target.hasSkillTag("nothunder"),
								res = 0.9;
							if ((f && t) || target.hasSkillTag("nodamage")) return 0;
							if (f || t) res = 0.45;
							if (!f && target.getEquip("tengjia")) res *= 2;
							if (!target.isLinked()) res = -res;
							if (ui.selected.targets.length) return res;
							let fs = 0,
								es = 0,
								att = get.attitude(player, target),
								linkf = false,
								alink = true;
							curs.forEach(i => {
								let atti = get.attitude(player, i);
								if (atti > 0) {
									fs++;
									if (i.isLinked()) linkf = true;
								} else if (atti < 0) {
									es++;
									if (!i.isLinked()) alink = false;
								}
							});
							if (es < 2 && !alink) {
								if (att <= 0 || (att > 0 && linkf && fs < 2)) return 0;
							}
							return res;
						},
					},
					tag: {
						multitarget: 1,
						multineg: 1,
						norepeat: 1,
					},
				},
			},
		},
		skill: {
			luojing_skill: {
				trigger: { player: "dying" },
				priority: 5,
				popup: false,
				forced: true,
				silent: true,
				forceLoad: true,
				forceDie: true,
				chooseToUse(current, source, eventId) {
					const next = current.chooseToUse();
					next.set("prompt", "是否对" + get.translation(source) + "使用【落井下石】？");
					next.set("filterCard", function (card, player) {
						if (get.name(card) != "luojing") return false;
						return lib.filter.cardEnabled(card, player, "forceEnable");
					});
					next.set("filterTarget", function (card, player, target) {
						if (target != _status.event.sourcex) return false; // && !ui.selected.targets.includes(_status.event.sourcex)
						return lib.filter.targetEnabled.apply(this, arguments);
					});
					next.set("sourcex", source);
					next.set("goon", -get.attitude(current, source));
					next.set("ai1", function (card) {
						return _status.event.goon;
					});
					next.set("id", eventId);
					next.set("_global_waiting", true);
					return next;
				},
				async content(event, trigger, player) {
					const source = trigger.player,
						targets = game.filterPlayer(target => target != source).sortBySeat();
					if (!targets.some(target => target.hasUsableCard("luojing"))) return;
					//处理问题
					let luojing_ok = undefined,
						results = {};
					//人类和AI
					let humans = targets.filter(current => current === game.me || current.isOnline());
					let locals = targets.slice(0).randomSort();
					locals.removeArray(humans);
					const eventId = get.id();
					const send = (current, source, eventId) => {
						lib.skill.luojing_skill.chooseToUse(current, source, eventId);
						game.resume();
					};
					//让读条不消失并显示读条
					event._global_waiting = true;
					let time = 90000;
					if (lib.configOL && lib.configOL.choose_timeout) time = parseInt(lib.configOL.choose_timeout) * 1000;
					targets.forEach(current => current.showTimer(time));
					//先处理单机的他人控制玩家/AI玩家
					if (!luojing_ok && locals.length > 0) {
						for (const current of locals) {
							const result = await lib.skill.luojing_skill.chooseToUse(current, source).forResult();
							if (result && result.bool) {
								luojing_ok = current;
								results[current.playerid] = result;
							}
						}
					}
					//再处理人类玩家
					if (humans.length > 0) {
						const solve = function (resolve, reject) {
							return function (result, player) {
								if (result && result.bool && !luojing_ok) {
									luojing_ok = player;
									results[player.playerid] = result;
									resolve();
								} else reject();
							};
						};
						//等待第一位使用（兑现Promise）的玩家，若不使用（Promise被拒绝）则继续等待
						await Promise.any(
							humans.map(current => {
								return new Promise(async (resolve, reject) => {
									if (current.isOnline()) {
										current.send(send, current, source, eventId);
										current.wait(solve(resolve, reject));
									} else {
										const next = lib.skill.luojing_skill.chooseToUse(current, source, eventId);
										const solver = solve(resolve, reject);
										if (_status.connectMode) game.me.wait(solver);
										const result = await next.forResult();
										if (_status.connectMode && !luojing_ok) game.me.unwait(result, current);
										else solver(result, current);
									}
								});
							})
						).catch(() => {});
						game.broadcastAll("cancel", eventId);
					}
					//清除读条
					delete event._global_waiting;
					for (const i of targets) {
						i.hideTimer();
					}
					await luojing_ok.useResult(results[luojing_ok.playerid]);
					//await game.delay();
					await luojing_ok.draw();
				},
			},
			/*shengsi_skill: {
				trigger: { global: "dying" },
				forced: true,
				priority: 10,
				filter(event, player) {
					return player.hasUsableCard("shengsi") && player != event.player;
				},
				content() {
					const next = player.chooseToUse();
					next.set("prompt", "是否对" + get.translation(trigger.player) + "使用【生死与共】？");
					next.set("filterCard", function (card, player) {
						if (get.name(card) != "shengsi") return false;
						return lib.filter.cardEnabled(card, player, "forceEnable");
					});
					next.set("filterTarget", function (card, player, target) {
						if (target != _status.event.sourcex) return false;// && !ui.selected.targets.includes(_status.event.sourcex)
						return lib.filter.targetEnabled.apply(this, arguments);
					});
					next.set("sourcex", trigger.player);
					next.set("goon", get.attitude(player, trigger.player));
					next.set("ai1", function (card) {
						return _status.event.goon;
					});
				},
			},*/
			shengsi_debuff: {
				charlotte: true,
				forced: true,
				intro: {
					content: "你与$生死与共",
				},
				marktext: "生",
				mark: true,
				trigger: { global: "dieAfter" },
				filter(event, player) {
					return player.getStorage("shengsi_debuff").includes(event.player);
				},
				content() {
					player.unmarkAuto(event.name, trigger.player);
					player.die();
				},
			},
			leigong_skill: {
				silent: true,
				firstDo: true,
				trigger: { player: "useCardEnd" },
				filter(event, player) {
					return event.card.name == "leigong";
				},
				content() {
					const num = game.countPlayer2(target => target.hasHistory("damage", evt => evt.getParent(4) == trigger && evt.notLink()));
					if (num > 0) player.draw(num);
				},
			},
		},
		translate: {
			wutian: "无天无界",
			wutian_bg: "界",
			wutian_info: "出牌阶段，对自己使用，从三个可造成伤害的技能中选择一个获得至你的下回合开始。",
			qixin: "兄弟齐心",
			qixin_bg: "齐",
			qixin_info: "出牌阶段，对一名其他角色使用，令其重新分配你们的手牌，然后你们中手牌较少的角色摸一张牌。",
			chadao: "两肋插刀",
			chadao_bg: "插",
			chadao_info: "出牌阶段，对一名其他角色使用，令其获得两张伤害牌。",
			khquanjiu: "劝酒",
			khquanjiu_bg: "劝",
			khquanjiu_info: "出牌阶段，对所有角色使用，令目标使用一张【酒】或点数为9的牌，不使用牌的角色失去1点体力。",
			luojing: "落井下石",
			luojing_bg: "落",
			luojing_skill: "落井下石",
			luojing_info: "一名其他角色进入濒死状态时，对其使用，结束其濒死结算，你摸一张牌。",
			hongyun: "红运当头",
			hongyun_bg: "红",
			hongyun_info: "出牌阶段，对你和一名有手牌的其他角色使用，令你与其各弃置至多两张牌，从牌堆或弃牌堆中获得等量红桃牌。",
			shengsi: "生死与共",
			shengsi_bg: "生",
			shengsi_skill: "生死与共",
			shengsi_debuff: "生死与共",
			shengsi_info: "其他角色濒死时，对其使用，令其回复2点体力，其死亡后你立即死亡。",
			younan: "有难同当",
			younan_bg: "难",
			younan_info: "出牌阶段，对所有未处于连环状态的角色使用，令目标进入连环状态。",
			leigong: "雷公助我",
			leigong_skill: "雷公助我",
			leigong_bg: "雷",
			leigong_info: "出牌阶段，对所有角色使用，令目标依次进行一次【闪电】判定，然后每有一名角色因此受到非传导伤害，你摸一张牌。",
		},
		list: [
			["heart", 13, "wutian"],
			["club", 13, "wutian"],

			["diamond", 11, "qixin"],
			["heart", 11, "qixin"],

			["spade", 10, "chadao"],
			["diamond", 10, "chadao"],
			["heart", 10, "chadao"],
			["club", 10, "chadao"],

			["diamond", 12, "khquanjiu"],
			["heart", 12, "khquanjiu"],

			["heart", 5, "hongyun"],
			["spade", 5, "hongyun"],
			["club", 5, "hongyun"],

			["heart", 7, "luojing"],
			["club", 7, "luojing"],

			["diamond", 4, "shengsi"],
			["heart", 4, "shengsi"],

			["diamond", 8, "leigong"],
			["heart", 8, "leigong"],
			["spade", 8, "leigong"],

			["spade", 6, "younan"],
			["diamond", 6, "younan"],
			["heart", 6, "younan"],
			["club", 6, "younan"],
		],
	};
});
