import { lib, game, ui, get, ai, _status } from "../noname.js";
game.import("card", function () {
	return {
		name: "kaiheiji",
		connect: true,
		card: {
			leigongzhuwo: {
				global: "leigongzhuwo_skill",
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
				/*ai: {
					wuxie(target, card, player, viewer, status) {
						let att = get.attitude(viewer, target),
							eff = get.effect(target, card, player, target);
						if (Math.abs(att) < 1 || status * eff * att >= 0) return 0;
						let evt = _status.event.getParent("useCard"),
							pri = 1,
							bonus = player.hasSkillTag("damageBonus", true, {
								target: target,
								card: card,
							}),
							damage = 1,
							isZhu = function (tar) {
								return tar.isZhu || tar === game.boss || tar === game.trueZhu || tar === game.falseZhu;
							},
							canShan = function (tar, blur) {
								let known = tar.getKnownCards(viewer);
								if (!blur)
									return known.some(card => {
										let name = get.name(card, tar);
										return (name === "shan" || name === "hufu") && lib.filter.cardRespondable(card, tar);
									});
								if (tar.countCards("hs", i => !known.includes(i)) > 3.67 - (2 * tar.hp) / tar.maxHp) return true;
								if (!tar.hasSkillTag("respondShan", true, "respond", true)) return false;
								if (tar.hp <= damage) return false;
								if (tar.hp <= damage + 1) return isZhu(tar);
								return true;
							},
							self = false;
						if (canShan(target)) return 0;
						if (
							bonus &&
							!viewer.hasSkillTag("filterDamage", null, {
								player: player,
								card: card,
							})
						)
							damage = 2;
						if ((viewer.hp <= damage || (viewer.hp <= damage + 1 && isZhu(viewer))) && !canShan(viewer)) {
							if (viewer === target) return status;
							let fv = true;
							if (evt && evt.targets)
								for (let i of evt.targets) {
									if (fv) {
										if (target === i) fv = false;
										continue;
									}
									if (viewer == i) {
										if (isZhu(viewer)) return 0;
										self = true;
										break;
									}
								}
						}
						let mayShan = canShan(target, true);
						if (
							bonus &&
							!target.hasSkillTag("filterDamage", null, {
								player: player,
								card: card,
							})
						)
							damage = 2;
						else damage = 1;
						if (isZhu(target)) {
							if (eff < 0) {
								if (target.hp <= damage + 1 || (!mayShan && target.hp <= damage + 2)) return 1;
								if (mayShan && target.hp > damage + 2) return 0;
								else if (mayShan || target.hp > damage + 2) pri = 3;
								else pri = 4;
							} else if (target.hp > damage + 1) pri = 2;
							else return 0;
						} else if (self) return 0;
						else if (eff < 0) {
							if (!mayShan && target.hp <= damage) pri = 5;
							else if (mayShan) return 0;
							else if (target.hp > damage + 1) pri = 2;
							else if (target.hp === damage + 1) pri = 3;
							else pri = 4;
						} else if (target.hp <= damage) return 0;
						let find = false;
						if (evt && evt.targets)
							for (let i = 0; i < evt.targets.length; i++) {
								if (!find) {
									if (evt.targets[i] === target) find = true;
									continue;
								}
								let att1 = get.attitude(viewer, evt.targets[i]),
									eff1 = get.effect(evt.targets[i], card, player, evt.targets[i]),
									temp = 1;
								if (Math.abs(att1) < 1 || att1 * eff1 >= 0 || canShan(evt.targets[i])) continue;
								mayShan = canShan(evt.targets[i], true);
								if (
									bonus &&
									!evt.targets[i].hasSkillTag("filterDamage", null, {
										player: player,
										card: card,
									})
								)
									damage = 2;
								else damage = 1;
								if (isZhu(evt.targets[i])) {
									if (eff1 < 0) {
										if (evt.targets[i].hp <= damage + 1 || (!mayShan && evt.targets[i].hp <= damage + 2)) return 0;
										if (mayShan && evt.targets[i].hp > damage + 2) continue;
										if (mayShan || evt.targets[i].hp > damage + 2) temp = 3;
										else temp = 4;
									} else if (evt.targets[i].hp > damage + 1) temp = 2;
									else continue;
								} else if (eff1 < 0) {
									if (!mayShan && evt.targets[i].hp <= damage) temp = 5;
									else if (mayShan) continue;
									else if (evt.targets[i].hp > damage + 1) temp = 2;
									else if (evt.targets[i].hp === damage + 1) temp = 3;
									else temp = 4;
								} else if (evt.targets[i].hp > damage + 1) temp = 2;
								if (temp > pri) return 0;
							}
						return 1;
					},
					basic: {
						//改的万箭的basic
						order: 9,
						useful: 1,
						value: 5,
					},
					result: {
						player(player, target) {
							if (player._wanjian_temp || player.hasSkillTag("jueqing", false, target)) return 0;
							if (target.hp > 2 || (target.hp > 1 && !target.isZhu && target != game.boss && target != game.trueZhu && target != game.falseZhu)) return 0;
							player._wanjian_temp = true;
							let eff = get.effect(target, new lib.element.VCard({ name: "wanjian" }), player, target);
							delete player._wanjian_temp;
							if (eff >= 0) return 0;
							if (target.hp > 1 && target.hasSkillTag("respondShan", true, "respond", true)) return 0;
							let known = target.getKnownCards(player);
							if (
								known.some(card => {
									let name = get.name(card, target);
									if (name === "shan" || name === "hufu") return lib.filter.cardRespondable(card, target);
									if (name === "wuxie") return lib.filter.cardEnabled(card, target, "forceEnable");
								})
							)
								return 0;
							if (target.hp > 1 || target.countCards("hs", i => !known.includes(i)) > 3.67 - (2 * target.hp) / target.maxHp) return 0;
							let res = 0,
								att = get.sgnAttitude(player, target);
							res -= att * (0.8 * target.countCards("hs") + 0.6 * target.countCards("e") + 3.6);
							if (get.mode() === "identity" && target.identity === "fan") res += 2.4;
							if ((get.mode() === "guozhan" && player.identity !== "ye" && player.identity === target.identity) || (get.mode() === "identity" && player.identity === "zhu" && (target.identity === "zhong" || target.identity === "mingzhong"))) res -= 0.8 * player.countCards("he");
							return res;
						},
						target(player, target) {
							let zhu = (get.mode() === "identity" && target.isZhu) || target.identity === "zhu";
							if (!lib.filter.cardRespondable({ name: "shan" }, target)) {
								if (zhu) {
									if (target.hp < 2) return -99;
									if (target.hp === 2) return -3.6;
								}
								return -2;
							}
							let known = target.getKnownCards(player);
							if (
								known.some(card => {
									let name = get.name(card, target);
									if (name === "shan" || name === "hufu") return lib.filter.cardRespondable(card, target);
									if (name === "wuxie") return lib.filter.cardEnabled(card, target, "forceEnable");
								})
							)
								return -1.2;
							let nh = target.countCards("hs", i => !known.includes(i));
							if (zhu && target.hp <= 1) {
								if (nh === 0) return -99;
								if (nh === 1) return -60;
								if (nh === 2) return -36;
								if (nh === 3) return -8;
								return -5;
							}
							if (target.hasSkillTag("respondShan", true, "respond", true)) return -1.35;
							if (!nh) return -2;
							if (nh === 1) return -1.65;
							return -1.5;
						},
					},
					tag: {
						//直接用的闪电的tag
						damage: 0.16,
						natureDamage: 0.16,
						thunderDamage: 0.16,
						multitarget: 1,
						multineg: 1,
					},
				},*/
			},
			younantongdang: {
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
			leigongzhuwo_skill: {
				silent: true,
				firstDo: true,
				trigger: { player: "useCardEnd" },
				filter(event, player) {
					return event.card.name == "leigongzhuwo";
				},
				content() {
					const num = game.countPlayer2(target => target.hasHistory("damage", evt => evt.getParent(4) == trigger && evt.notLink()));
					game.log(num);
					if (num > 0) player.draw(num);
				},
			},
		},
		translate: {
			leigongzhuwo: "雷公助我",
			leigongzhuwo_skill: "雷公助我",
			leigongzhuwo_bg: "雷",
			leigongzhuwo_info: "出牌阶段，对所有角色使用，令目标依次进行一次【闪电】判定，然后每有一名角色因此受到非传导伤害，你摸一张牌。",
			younantongdang: "有难同当",
			younantongdang_bg: "难",
			younantongdang_info: "出牌阶段，对所有未处于连环状态的角色使用，令目标进入连环状态。",
		},
		list: [],
	};
});
