let char_name = ""
let max_health = 0
let health = 0
let strength = 0
let defense = -1
let max_stamina = -1
let stamina = 0

function createCharacter() {
	let allocation = 40
	char_name = String(document.getElementById("char_name").value)
	max_health = Number(document.getElementById("max_health").value)
	strength = Number(document.getElementById("strength").value)
	defense = Number(document.getElementById("defense").value)
	max_stamina = Number(document.getElementById("max_stamina").value)
	allocation -= (max_health + strength + defense + max_stamina)
	
	if (allocation >= 0 && max_health % 1 == 0 && strength % 1 == 0 && defense % 1 == 0 && max_stamina % 1 == 0 && max_health > 0 && strength > 0 && defense >= 0 && max_stamina >= 3) {
		document.getElementById("char_creator").style.display = "none"
		document.getElementById("game").style.display = "block"
		health = max_health
		stamina = max_stamina
		adventure()
		stats()
	} else if (allocation < 0) {
		alert("you've used " + (-allocation) + " too many points.")
	} else if (max_health % 1 != 0 || strength % 1 != 0 || defense % 1 != 0 || max_stamina % 1 != 0) {
		alert("all stats must be an integer.")
	} else if (max_health < 1 || strength < 1 || defense < 0 || max_stamina < 3) {
		alert("health and strength must be >= 1, defense must be >= 0, and stamina must be >= 3.")
	} else {
		alert("error")
	}
}

function stats() {
	document.getElementById("stats").style.display = "block"
	document.getElementById("char_name_display").innerHTML = char_name
	document.getElementById("health_display").innerHTML = health + "/" + max_health
	if (rage_effect == 0.85) {
		document.getElementById("strength_display").innerHTML = strength + " + 5"
	} else {
		document.getElementById("strength_display").innerHTML = strength
	}
	if (stone_effect) {
		document.getElementById("defense_display").innerHTML = defense + " + 10" 
	} else {
		document.getElementById("defense_display").innerHTML = defense
	}
	document.getElementById("stamina_display").innerHTML = stamina + "/" + max_stamina
}

const leftB = document.getElementById("go_left_button")
const rightB = document.getElementById("go_right_button")
const forwardsB = document.getElementById("go_forwards_button")
const downB = document.getElementById("go_down_button")
const upB = document.getElementById("go_up_button")
const backB = document.getElementById("go_back_button")
let roomID = 0

async function adventure() {
	textBox("You wake up in a wet puddle. You look around and realize you are in a cave. You do not remember how you got here, but you know you must find a way out.")
	
	textBox("You can go left or right.")
	await until(_ => choice != "")
	if (choice == "go left") {
		roomID = 1
		textBox("You go left. The walls cave in behind you, making you unable to go back.")
	} else if (choice == "go right") {
		roomID = 2
		textBox("You go right. The walls cave in behind you, making you unable to go back.")
	}
	room(roomID)
}

async function room(roomID) {
	console.log(`room` + roomID)
	if (roomID == 1) {
		choice = ""
		startFight()
		await until(_ => in_battle == false)
		textBox("You can go either left or right")
		leftB.style.display = "inline"
		rightB.style.display = "inline"
		forwardsB.style.display = "inline"
		downB.style.display = "none"
		upB.style.display = "none"
		backB.style.display = "none"
		await until(_ => choice != "")
		if (choice == "go left") {
			textBox("You go left.")
			roomID = 4
		} else if (choice == "go right") {
			textBox("You go right.")
			roomID = 5
		}
		room(roomID)
	} else if (roomID == 2) {
		choice = ""
		startFight()
		await until(_ => in_battle == false)
		textBox("There are three paths ahead of you. You can go left, right, or forwards.")
		leftB.style.display = "inline"
		rightB.style.display = "inline"
		forwardsB.style.display = "inline"
		downB.style.display = "none"
		upB.style.display = "none"
		backB.style.display = "none"
		await until(_ => choice != "")
		if (choice == "go left") {
			textBox("You go left.")
			roomID = 6
		} else if (choice == "go right") {
			textBox("You go right.")
			roomID = 3
		} else if (choice == "go forwards") {
			textBox("You go forwards.")
			roomID = 7
		}
		room(roomID)
	} else if (roomID == 3) {
		choice = ""
		startFight()
		await until(_ => in_battle == false)
		textBox("You can go back or move forwards.")
		leftB.style.display = "none"
		rightB.style.display = "inline"
		forwardsB.style.display = "inline"
		downB.style.display = "none"
		upB.style.display = "none"
		backB.style.display = "none"
		await until(_ => choice != "")
		if (choice == "go back") {
			textBox("You go to the previous room.")
			roomID = 2
		} else if (choice == "go forwards") {
			textBox("You move forwards. The walls cave in behind you.")
			roomID = 11
		}
		room(roomID)
	} else if (roomID == 4) {
		choice = ""
		startFight()
		await until(_ => in_battle == false)
		textBox("You can go back or keep moving forwards.")
		leftB.style.display = "none"
		rightB.style.display = "none"
		forwardsB.style.display = "inline"
		downB.style.display = "none"
		upB.style.display = "none"
		backB.style.display = "inline"
		await until(_ => choice != "")
		if (choice == "go back") {
			textBox("You go to the previous room.")
			roomID = 1
		} else if (choice == "go forwards") {
			textBox("You continue forwards.")
			roomID = 8
		}
		room(roomID)
	} else if (roomID == 5) {
		choice = ""
		startFight()
		await until(_ => in_battle == false)
		textBox("You can go back, go right, or keep moving forwards.")
		leftB.style.display = "none"
		rightB.style.display = "inline"
		forwardsB.style.display = "inline"
		downB.style.display = "none"
		upB.style.display = "none"
		backB.style.display = "inline"
		await until(_ => choice != "")
		if (choice == "go back") {
			textBox("You go to the previous room.")
			roomID = 1
		} else if (choice == "go right") {
			textBox("You head right. The walls cave in behind you.")
			roomID = 6
		} else if (choice == "go forwards") {
			textBox("You head forwards.")
			roomID = 9
		}
		room(roomID)
	} else if (roomID == 6) {
		choice = ""
		startFight()
		await until(_ => in_battle == false)
		textBox("You can only move forwards")
		leftB.style.display = "none"
		rightB.style.display = "none"
		forwardsB.style.display = "none"
		downB.style.display = "inline"
		upB.style.display = "none"
		backB.style.display = "none"
		await until(_ => choice != "")
		if (choice == "go down") {
			textBox("You jump down into the next area. It's too steep to climb back up.")
			roomID = 10
		}
		room(roomID)
	} else if (roomID == 7) {
		choice = ""
		textBox("A shield rests against the wall.")
		getItem("shield")
		textBox("You can go back, left, or right.")
		leftB.style.display = "inline"
		rightB.style.display = "inline"
		forwardsB.style.display = "none"
		downB.style.display = "none"
		upB.style.display = "none"
		backB.style.display = "inline"
		await until(_ => choice != "")
		if (choice == "go back") {
			textBox("You go to the previous room.")
			roomID = 2
		} else if (choice == "go left") {
			textBox("You move left. The walls cave in behind you.")
			roomID = 6
		} else if (choice == "go right") {
			roomID = 11
		}
		room(roomID)
	} else if (roomID == 8) {
		choice = ""
		startFight()
		await until(_ => in_battle == false)
		textBox("You can go back, forwards, or right.")
		leftB.style.display = "none"
		rightB.style.display = "inline"
		forwardsB.style.display = "inline"
		downB.style.display = "none"
		upB.style.display = "none"
		backB.style.display = "inline"
		await until(_ => choice != "")
		if (choice == "go back") {
			textBox("you go backwards.")
			roomID = 4
		} else if (choice == "go right") {
			textBox("You head right.")
			roomID = 9
		} else if (choice == "go forwards") {
			textBox("You continue forwards. The walls cave in behind you.")
			roomID = 12
		}
		room(roomID)
	} else if (roomID == 9) {
		choice = ""
		textBox("You found a stamina potion on the ground")
		getItem("stamina potion")
		textBox("You can go back, left, or forwards")
		leftB.style.display = "inline"
		rightB.style.display = "none"
		forwardsB.style.display = "inline"
		downB.style.display = "none"
		upB.style.display = "none"
		backB.style.display = "inline"
		await until(_ => choice != "")
		if (choice == "go left") {
			textBox("You go left.")
			roomID = 8
		} else if (choice == "go forwards") {
			textBox("You head forwards. The walls cave in behind you.")
			roomID = 13
		} else if (choice == "go back") {
			roomID = 5
		}
		room(roomID)
	} else if (roomID == 10) {
		choice = ""
		textBox("You find an old set of armor on the ground")
		getItem("armor")
		textBox("You can go left or right")
		leftB.style.display = "inline"
		rightB.style.display = "inline"
		forwardsB.style.display = "none"
		downB.style.display = "none"
		upB.style.display = "none"
		backB.style.display = "none"
		await until(_ => choice != "")
		if (choice == "go left") {
			textBox("You go left.")
			roomID = 13
		} else if (choice == "go right") {
			textBox("You go right.")
			roomID = 14
		}
		room(roomID)
	} else if (roomID == 11) {
		choice = ""
		startFight()
		await until(_ => in_battle == false)
		textBox("You can go left or right.")
		leftB.style.display = "inline"
		rightB.style.display = "inline"
		forwardsB.style.display = "none"
		downB.style.display = "none"
		upB.style.display = "none"
		backB.style.display = "none"
		await until(_ => choice != "")
		if (choice == "go left") {
			textBox("You go left. The walls cave in behind you.")
			roomID = 15
		} else if (choice == "go right") {
			textBox("You go right.")
			roomID = 16
		}
		room(roomID)
	} else if (roomID == 12) {
		choice = ""
		textBox("A sword is lying on the ground.")
		getItem("sword")
		textBox("You can go right")
		leftB.style.display = "none"
		rightB.style.display = "inline"
		forwardsB.style.display = "none"
		downB.style.display = "none"
		upB.style.display = "none"
		backB.style.display = "none"
		await until(_ => choice != "")
		if (choice == "go right") {
			textBox("You go right.")
			roomID = 17
		}
		room(roomID)
	} else if (roomID == 13) {
		choice = ""
		startFight()
		await until(_ => in_battle == false)
		textBox("You can only go left.")
		leftB.style.display = "inline"
		rightB.style.display = "none"
		forwardsB.style.display = "none"
		downB.style.display = "none"
		upB.style.display = "none"
		backB.style.display = "none"
		if (choice == "go left") {
			textBox("You go left. The walls cave in behind you.")
			roomID = 12
		}
		room(roomID)
	} else if (roomID == 14) {
		choice = ""
		startFight()
		await until(_ => in_battle == false)
		textBox("There is a ladder in the room.")
		textBox("You can go back or climb the ladder.")
		leftB.style.display = "none"
		rightB.style.display = "none"
		forwardsB.style.display = "none"
		downB.style.display = "none"
		upB.style.display = "inline"
		backB.style.display = "inline"
		if (choice == "go back") {
			textBox("You go back.")
			roomID = 10
		} else if (choice == "go up") {
			textBox("You climb the ladder. It falls over as you reach the top.")
			roomID = 11
		}
		room(roomID)
	} else if (roomID == 15) {
		choice = ""
		startFight()
		await until(_ => in_battle == false)
		textBox("You can only go forwards.")
		leftB.style.display = "none"
		rightB.style.display = "none"
		forwardsB.style.display = "inline"
		downB.style.display = "none"
		upB.style.display = "none"
		backB.style.display = "none"
		await until(_ => choice != "")
		if (choice == "go forwards") {
			textBox("You go forwards. The walls cave in behind you.")
			roomID = 18
		}
		room(roomID)
	} else if (roomID == 16) {
		choice = ""
		textBox("You find a rage poition and a stone potion on the ground.")
		getItem("rage potion")
		getItem("stone potion")
		textBox("You can only go back")
		leftB.style.display = "none"
		rightB.style.display = "none"
		forwardsB.style.display = "none"
		downB.style.display = "none"
		upB.style.display = "none"
		backB.style.display = "inline"
		await until(_ => choice != "")
		if (choice == "go back") {
			textBox("You go back.")
			roomID = 11
		}
		room(roomID)
	} else if (roomID == 17) {
		choice = ""
		startFight()
		await until(_ => in_battle == false)
		textBox("You can go left, down, or forwards. You see a faint light in the forwards direction")
		if (choice == "go left") {
			textBox("You go left.")
			roomID = 12
		} else if (choice == "go down") {
			textBox("You go down.")
			roomID = 14
		} else if (choice == "go forwards") {
			textBox("You go forwards. The light slowly increases in brightness.")
			roomID = 19
		}
		room(roomID)
	} else if (roomID == 18) {
		choice = ""
		textBox("There is a chest on the ground. You open it.")
		getItem("bracelet")
		textBox("You can only go forwards. You see a faint light in that direction.")
		leftB.style.display = "none"
		rightB.style.display = "none"
		forwardsB.style.display = "inline"
		downB.style.display = "none"
		upB.style.display = "none"
		backB.style.display = "none"
		await until(_ => choice != "")
		if (choice == "go forwards") {
			textBox("You continue forwards. The light slowly increases in brightness.")
			roomID = 19
		}
		room(roomID)
	} else if (roomID == 19) {
		choice = ""
		textBox("You see the outside. A large figure is guarding the exit. No going back now.")
		startFight(4) //final boss
		await until(_ => in_battle == false)
		leftB.style.display = "none"
		rightB.style.display = "none"
		forwardsB.style.display = "inline"
		downB.style.display = "none"
		upB.style.display = "none"
		backB.style.display = "none"
		await until(_ => choice != "") 
		if (choice == "go forwards") {
			document.getElementById("game").style.display = "none"
			document.getElementById("end").innerHTML="<h1>As you exit the cave, your eyes readjust to the light. You look around and find yourself in a lush forest. You have escaped.</h1><h1 style='color: lightgreen;'>You win!</h1>"
		}
	}
	console.log(`room` + roomID)
}

function until(conditionFunction) {

	const poll = resolve => {
		if(conditionFunction()) resolve();
		else setTimeout(_ => poll(resolve), 200);
	}

	return new Promise(poll);
}

let choice = ""

function decision(input) {
	choice = input
	console.log(choice)
}

let textID = 1
const startDate = Date.now();

function textBox(text, textColor) {
	const textBox = document.createElement(`text${textID}`);
	const textTime = document.createElement(`textTime${textID}`);
	const textBreak = document.createElement(`break${textID}`);
	textBox.id = `text${textID}`;
	textTime.id = `textTime${textID}`
	textBreak.id = `break${textID}`;
	textBox.textContent = text;
	const currentDate = Date.now();
	textTime.textContent = " " + ((currentDate - startDate) / 1000);
	textBreak.innerHTML = "<br>";
	document.getElementById("text").appendChild(textBox);
	document.getElementById("text").appendChild(textTime);
	document.getElementById("text").appendChild(textBreak);
	textBox.classList.add("text");
	textTime.classList.add("textTime");
	textBox.classList.add(textColor);
	let currentTextID = textID;
	textBox.classList.add("fade");
	textTime.classList.add("fade");
	setTimeout(function() {removeText(currentTextID)}, 60000);
	textID++;
}

function removeText(id) {
	console.log(`text${id} deleted`);
	document.getElementById(`text${id}`).remove();
	document.getElementById(`break${id}`).remove();
	document.getElementById(`textTime${id}`).remove();
}

const inventory = document.getElementById("inventory")
const equipment = document.getElementById("equipment")
	
function openInventory() {
	if (inventory.style.display == "none") {
		equipment.style.display="none"
		book.style.display="none"
		inventory.style.display="block"
	} else {
		inventory.style.display="none"
	}
}

function openEquipment() {
	if (equipment.style.display == "none") {
		inventory.style.display="none"
		book.style.display="none"
		equipment.style.display="block"
	} else {
		equipment.style.display="none"
	}
}

function openInfo() {
	if (book.style.display == "none") {
		inventory.style.display="none"
		equipment.style.display="none"
		book.style.display="block"
	} else {
		book.style.display="none"
	}
}

const itemsDiv = document.getElementById("items")
let health_potions = 3
let stamina_potions = 3
let rage_potions = 1
let stone_potions = 1
let rage_effect = 1
let stone_effect = false
let smoke_bombs = 2
let smoke_effect = false

function items() {
	itemsDiv.innerHTML = ""
	if (health_potions > 0) {
		itemsDiv.innerHTML += `<p onclick="useItem('health potion'); items()">Health potion x${health_potions}</p>`
	} if (stamina_potions > 0) {
		itemsDiv.innerHTML += `<p onclick="useItem('stamina potion'); items()">Stamina potion x${stamina_potions}</p>`
	} if (rage_potions > 0) {
		itemsDiv.innerHTML += `<p onclick="useItem('rage potion'); items()">Rage potion x${rage_potions}</p>`
	} if (stone_potions > 0) {
		itemsDiv.innerHTML += `<p onclick="useItem('stone potion'); items()">Stone potion x${stone_potions}</p>`
	} if (smoke_bombs > 0) {
		itemsDiv.innerHTML += `<p onclick="useItem('smoke bomb'); items()">Smoke bomb x${smoke_bombs}</p>`
	}
}

const equipment_items = document.getElementById("equipment_items")
let bracelet = 0
let bracelet_equipped = 3 //3=false, 2=true
let armor = 0
let armor_equipped = false
let sword = 0
let sword_equipped = false
let shield = 0
let shield_equipped = false

function showEquipment() {
	equipment_items.innerHTML = ""
	if (bracelet == 1) {
		if (bracelet_equipped == 2) {
			equipment_items.innerHTML += `<p onclick="useItem('bracelet'); items()">Stamina bracelet (x)</p>`
		} else {
			equipment_items.innerHTML += `<p onclick="useItem('bracelet'); items()">Stamina bracelet ( )</p>`
		}
	} if (armor == 1) {
		if (armor_equipped) {
			equipment_items.innerHTML += `<p onclick="useItem('armor'); useArmor('off'); items()">Armor (x)</p>`
		} else {
			equipment_items.innerHTML += `<p onclick="useItem('armor'); useArmor('on'); items()">Armor ( )</p>`
		}
	} if (sword == 1) {
		if (sword_equipped) {
			equipment_items.innerHTML += `<p onclick="useItem('sword'); useSword('off'); items()">Sword (x)</p>`
		} else {
			equipment_items.innerHTML += `<p onclick="useItem('sword'); useSword('on'); items()">Sword ( )</p>`
		}
	} if (shield == 1) {
		if (shield_equipped) {
			equipment_items.innerHTML += `<p onclick="useItem('shield'); items()">Shield (x)</p>`
		} else {
			equipment_items.innerHTML += `<p onclick="useItem('shield'); items()">Shield ( )</p>`
		}
	}
}

function useSword(on) {
	if (on == "on") {
		strength += 5
	} else {
		strength -= 5
	}
	stats()
	items()
	showEquipment()
}

function useArmor(on) {
	if (on == "on") {
		defense += 5
	} else {
		defense -= 5
	}
	stats()
	items()
	showEquipment()
}

function getItem(item, count) {
	if (count > 1) {
		textBox(`You got ${count} ${item}s.`)
	} else {
		textBox(`You got a ${item}.`)
	}
	
	if (item == "health potion") {
		health_potions += count
	} else if (item == "stamina potion") {
		stamina_potions += count
	} else if (item == "rage potion") {
		rage_potions += count
	} else if (item == "stone potion") {
		stone_potions += count
	} else if (item == "smoke bomb") {
		smoke_bombs += count
	} else if (item == "bracelet") {
		bracelet = 1		
	} else if (item == "armor") {
		armor = 1
	} else if (item == "sword") {
		sword = 1
	} else if (item == "shield") {
		shield = 1
	}
	items()
	showEquipment()
}

let battle_strength = strength
let battle_defense = defense

function useItem(item) {
	if (item == "health potion") {
		health += 10
		if (health > max_health) {
			health = max_health
		}
		health_potions -= 1
		items()
		stats()
		textBox("Health potion drank.", "health")
	} else if (item == "stamina potion") {
		stamina += 5
		if (stamina > max_stamina) {
			stamina = max_stamina
		}
		stamina_potions -= 1
		items()
		stats()
		textBox("Stamina potion drank.", "stamina")
	} else if (item == "rage potion") {
		if (in_battle == true) {
			rage_effect = 0.85
			rage_potions -= 1
			battle_strength = strength + 5
			items()
			textBox("Rage potion drank.", "strength")
		} else {
			textBox("Rage potions are only usable in battle.", "strength")
		}
	} else if (item == "stone potion") {
		if (in_battle == true) {
			stone_effect = true
			battle_defense = defense + 10
			stone_potions -= 1
			items()
			textBox("Stone potion drank.", "defense")
		} else {
			textBox("Stone potions are only usable in battle.", "defense")
		}
	} else if (item == "smoke bomb") {
		if (in_battle == true) {
			smoke_effect = 3
			smoke_bombs -= 1
			items()
			textBox("Smoke bomb used.", "defense")
		} else {
			textBox("Smoke bombs are only usable in battle.", "defense")
		}
	} else if (item == "bracelet") {
		if (bracelet_equipped == 3) {
			bracelet_equipped = 2
		} else {
			bracelet_equipped = 3
		}
	} else if (item == "armor") {
		if (armor_equipped == false) {
			armor_equipped = true
		} else {
			armor_equipped = false
		}
	} else if (item == "sword") {
		if (sword_equipped == false) {
			sword_equipped = true
		} else {
			sword_equipped = false
		}
	} else if (item == "shield") {
		if (shield_equipped == false) {
			shield_equipped = true
		} else {
			shield_equipped = false
		}
	}
	stats()
	items()
	showEquipment()
}

let pageID = 1

function previousPage() {
	document.getElementById("page" + pageID).style.display="none"
	pageID--
	if (pageID == 0) {
		pageID = 16
	}
	document.getElementById("page" + pageID).style.display="block"
}

function nextPage() {
	document.getElementById("page" + pageID).style.display="none"
	pageID++
	if (pageID == 17) {
		pageID = 1
	}
	document.getElementById("page" + pageID).style.display="block"
}

let turn = 0
let damage = 0

function attack() {
	if (turn == 0) {
		if (enemy_health <= 0) {
			endFight()
		} else {
			if (stamina >= 3) {
				let chance = Math.random()
				if (chance < 0.15) {
					textBox("You missed! 0 damage dealt.", "strength")
				} else if (chance > 0.85 * rage_effect) {
					damage = Math.round((Math.random() + 1) * battle_strength)
					//crits ignore defense
					textBox(`Critical hit! ${damage} damage dealt.`, "strength")
				} else {
					damage = Math.round((Math.random() + 1) * battle_strength)
					damage -= enemy_defense
					if (damage < 1) {
						damage = 1
						textBox(`You could not pierce the enemy's defense. 1 damage dealt`, "strength")
					} else {
						textBox(`${damage} damage dealt.`, "strength")
					}
				}
				enemy_health -= damage
				stamina -= bracelet_equipped
				stats()
				if (enemy_health <= 0) {
					textBox("You defeated the enemy.", "health")
					endFight()
				} else {
					turn = 1
					if (enemy_stamina < enemy_max_stamina) {
						enemy_stamina++
					}
					setTimeout(function(){enemyTurn()}, 1500)
				}
			} else {
				textBox("You are too tired to attack.", "stamina")
			}
		}
	}
}

let blocking = 1;

function block() {
	if (turn == 0) {
		if (enemy_health <= 0) {
			endFight()
		} else {
			textBox("You readied yourself for the enemy's attack.", "defense")	
			blocking = 1.5
			if (enemy_stamina < enemy_max_stamina) {
				enemy_stamina++
			}
			turn = 1
			setTimeout(function(){enemyTurn()}, 1500)
		}
	}
}

let enemy_name = ""
let enemy_damage = 0
let enemy_health = 0
let enemy_strength = 0
let enemy_defense = 0
let enemy_stamina = 0
let enemy_max_stamina = 0
let in_battle = false

function startFight(enemy) {
	rage_effect = 1
	stone_effect = false
	smoke_effect = 1
	battle_strength = strength
	battle_defense = defense
	items()
	showEquipment()
	stats()
	if (isNaN(enemy)) {
		enemy = Math.round(Math.random() * 3)
	}
	console.log(enemy)
	document.getElementById("adventure_menu").style.display="none"
	document.getElementById("fight_menu").style.display="block"
	switch (enemy) {
		case 0:
			enemy_name = "goblin"
			enemy_health = 10 +  Math.round(Math.random() * 15)
			enemy_strength = 5
			enemy_defense = 8
			enemy_max_stamina = 15
			break
		case 1:
			enemy_name = "slime"
			enemy_health = 5 +  Math.round(Math.random() * 10)
			enemy_strength = 4
			enemy_defense = 10
			enemy_max_stamina = 10
			break
		case 2:
			enemy_name = "skeleton"
			enemy_health = 20 +  Math.round(Math.random() * 20)
			enemy_strength = 8
			enemy_defense = 10
			enemy_max_stamina = 8
			break
		case 3:
			enemy_name = "haunted knight"
			enemy_health = 5
			enemy_strength = 12
			enemy_defense = 15
			enemy_max_stamina = 5
			break
		case 4:
			enemy_name = "gate keeper"
			enemy_health = 50
			enemy_strength = 12
			enemy_defense = 10
			enemy_max_stamina = 7
			break
	}
	enemy_stamina = enemy_max_stamina
	textBox(`You encountered a ${enemy_name}!`)
	in_battle = true
	turn = Math.round(Math.random())
	if (turn == 0) {
		textBox("You get the first move!")
	} else if (turn == 1) {
		textBox(`The ${enemy_name} moves first!`)
		setTimeout(function(){enemyTurn()}, 1500)
	} else {
		textBox("error")
	}
}

function endFight() {
	textBox(`You won the fight.`)
	stamina = max_stamina
	in_battle = false
	rage_effect = 1
	stone_effect = false
	smoke_effect = 1
	battle_strength = strength
	battle_defense = defense
	loot()
	items()
	showEquipment()
	stats()
	document.getElementById("adventure_menu").style.display="block"
	document.getElementById("fight_menu").style.display="none"
}

function loot() {
	chance = Math.random()
	if (chance < 0.2) {
		textBox("The enemy dropped nothing.")
	} else if (chance < 0.3) {
		getItem("health potion", 1)
	} else if (chance < 0.4) {
		getItem("stamina potion", 1)
	} else if (chance < 0.45) {
		getItem("rage potion", 1)
	} else if (chance < 0.5) {
		getItem("stone potion", 1)
	} else if (chance < 0.6) {
		getItem("smoke bomb", 1)
	} else if (chance < 0.7) {
		getItem("health potion", 1)
		getItem("stamina potion", 1)
	} else if (chance < 0.8) {
		getItem("health potion", 1)
		getItem("smoke bomb", 1)
	} else if (chance < 0.85) {
		getItem("stamina potion", 1)
		getItem("rage potion", 1)
	} else if (chance < 9) {
		getItem("stamina potion", 1)
		getItem("stone potion", 1)
	} else if (chance < 0.95) {
		getItem("health potion", 1)
		getItem("rage potion", 1)
	} else if (chance < 1) {
		getItem("health potion", 1)
		getItem("stone potion", 1)
	}
}

function enemyTurn() {
	if (turn == 1) {
		if (enemy_health >= 1) {
			if (enemy_stamina >= 3) {
				let chance = Math.random()
				if (chance < 0.15 * smoke_effect) {
					enemy_damage = 0
					textBox(`The ${enemy_name} missed! 0 damage taken.`, "strength")
				} else if (chance > 0.85) {
					enemy_damage = Math.round((Math.random() + 1) * enemy_strength)
					//crits ignore defense, unless the player is blocking, they do normal defense
					if (blocking == 1.5) {
						enemy_damage -= battle_defense
						if (enemy_damage < 1) {
							if (stone_effect || shield_equipped) {
								enemy_damage = 0
							} else {
								enemy_damage = 1
							}
							textBox(`The ${enemy_name} got a critical hit, but you blocked it! ${enemy_damage} damage taken.`, "strength")
						} else {
							textBox(`The ${enemy_name} got a critical hit, but you blocked some of the damage. ${enemy_damage} damage taken`, "strength")
						}
					} else {
					textBox(`The ${enemy_name} got a critical hit! ${enemy_damage} damage taken.`, "strength")
					}
				} else {
					enemy_damage = Math.round((Math.random() + 1) * enemy_strength)
					enemy_damage -= (battle_defense * blocking)
					if (enemy_damage < 1) {
						if (stone_effect || shield_equipped) {
							enemy_damage = 0
						} else {
							enemy_damage = 1
						}
						textBox(`The ${enemy_name} could not pierce your defense. ${enemy_damage} damage taken`, "strength")
					} else {
						textBox(`${enemy_damage} damage taken.`, "strength")
					}
				}
				health -= enemy_damage
				enemy_stamina -= 3
				stats()
				if (health <= 0) {
					document.getElementById("game").style.display="none"
					document.getElementById("end").innerHTML=`<h1 style="color: red;">${char_name} met a terrible fate</h1>`
				} else {
					let block = 1
					if (stamina < max_stamina) {
						stamina++
					}
					stats()
					turn = 0
				}
			} else {
				textBox(`The enemy is too tired to attack.`, "stamina")
				let block = 1
				if (stamina < max_stamina) {
					stamina++
				}
				stats()
				turn = 0
			}
		} else {
			endFight()
		}
	}
}
