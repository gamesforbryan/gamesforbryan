// Berzerker Queen - Script

// Global Variables
console.log("RUNNING...");	
var playerCharacter = new function()
{
	var _self = this;
	_self.MaxLifePoints = 20;
	_self.CurrentLifePoints = _self.MaxLifePoints;
	_self.CurrentShieldPoints = 0;
	_self.MaxActionPoints = 3;
	_self.CurrentActionPoints = _self.MaxActionPoints;
	_self.Deck = [];
	_self.DrawPile = [];
	_self.Hand = [];
	_self.DiscardPile = [];
	_self.ExhaustedPile = [];
	return _self;
};

// Start game in Fortress of Tyranny
var TerrainSetQueue = [];
var CurrentTerrainSet = [];
var CurrentTerrain = undefined;
var CurrentEncounterSet = [];
var CurrentEncounter = undefined;
var CurrentEncounterCount = 0; // serialize
var PreviousEncounterCount = 0; // serialize
var AllTimeHighestEncounterCount = 0; // serialize
var AllTimeEncounterCount = 0; // serialize
var CurrentGold = 0;  // serialize
var GoldThisRun = 0;
var GoldPreviousRun = 0; // serialize
var AllTimeHighestGold = 0; // serialize
var AllTimeGold = 0;  // serialize

var IsFirstGame = true; // serialize
var FirstGameLoadout = ["sword_3", "sword_3", "sword_3", "shield_2", "health_potion_5", "sneak", "sneak", "sneak", "trip", "trip"];
var TutorialEncounterSet = ["guard_5", "dagger_1", "sword_5", "gold_5", "guard_5", "creaky_boards_1", "creaky_boards_1", "creaky_boards_1"];

if (IsFirstGame === true)
{
	// Assigned a preset loadout for first game
	playerCharacter.Deck = FirstGameLoadout;
	// Assigned a preset first X dungeon cards for tutorial ("The Escape")
	CurrentEncounterSet = TutorialEncounterSet;
}
else
{
	// After the tutorial has been completed, subsequent playthroughs will allow a player to start from the Tutorial or begin with a randomly assigned loadout
	// With a randomly assigned loadout, the player is given a randomly selected set of cards and intrinsic aptitudes for a particular archetype (of which, we will have a database of 10 or so)
	// The player chooses the set of starting cards from a superset available for their archetype
}

function step()
{
	// If there aren't any more encounters in the current set, they are presented with next encounter set to choose from.
	if (CurrentEncounterSet.length === 0)
	{
		// Players are presented with a choice of subsequent encounter sets (1 ~ 3)
		// The selected encounter set is expanded into encounters;
		// In each set are multiple encounters (1 ~ 9) presented in more or less linear order.

		CurrentEncounterSet = TutorialEncounterSet; // \stub: 
	}

	CurrentEncounter = CurrentEncounterSet.pop();

	// Each encounter type has a different subroutine that we'll route between
	if (CurrentEncounter === "sneak_0" || CurrentEncounter === "sneak_1" || CurrentEncounter === "sneak_2")
	{
		console.log("sneaking!");
		// \todo: sneaking minigame based on card draw
		if (Math.random() > 0.5)
		{
			console.log("success!");
		}
		else
		{
			console.log("fail!");
			// \todo: draw until next combat or trap encounter
		}
	}
	else
	{
		console.log(CurrentEncounter);
	}
		
	if (playerCharacter.CurrentLifePoints <= 0)
	{
		// Once an encounter has resolved, if the player's Life Points are below 0, they die.  Go to the On Death subroutine.
		// Otherwise, they are presented with the next encounter in the current set

		// On Death, display an indicator of the player's current progress.
		// Also display their highest progress.
		// Also display their previous run's progress.
		// Display their portrait, name, archetype
		// They get to pick one piece of equipment to cache for later
		return false;
	}
		// The arc is that they move from the Fortress of Tyranny
		// Escape to the North
		// They Fight their way through a savage wilderness
		// They hide from soldiers of the Fortress near crossroads and highways
		// They fight rats, disease, and the undead in Swamps
		// They face pirates and time-saving ferries on Rivers
		// They can eat fresh fish and fight giant mosquitoes at Lakes
		// They can resupply, rest, and hear rumors and lies in Village
		// Cliffs - Raptors, Climbing
		// Forests - Spiders, Pixies
		// Mountain - Avalanches, Yetis
		// Hills - Lookouts / Barrow Wights
		// Graveyard - Cursed treasure, ghosts, skeletons, zombies, rumors
		// Ruins - Treasure, bandits, barrow wights, bats, spiders, rumors
		// Tomb - Ruins x Graveyard
		// Wasteland - Thirst, Raptors
		// Tinker - Village with higher variance of quality of supplies
		// Hag's Cave - Healing, Curses/Curse Removal, Rumors
		// Warwitches' Tower - Either join the Warwitch or defeat the Warwitch
		// Joining the Warwitch means a character upgrade and return through all of the encounters in reverse order, with the chosen encounters eliminated.
		// Once they've managed to go through all of the encounters in reverse, they are presented with a final challenge, fighting their way through to defeat The Council of Tyranny.
		// Or, they can Join the Council of Tyranny, which means there's a random chance they could spawn as that character in a future run.
		// If they Defeat the Warwitch, they can keep going forever, with cards just getting harder and weirder.

		// Defeat enemies by playing a card-based minigame
		// The game is hybrid between Slay the Spire and one of those Choose an Adventure books
		// Players draw up to their hand limit at the start of combat
		// The enemy also draws a hand of cards
		// The player or enemy with the highest initiative goes first.  Ties are settled on a biased coin toss (in favor of the player).
		// Player can select and play any card in their hand that they can currently activate
		// Whether or not a card can be activated depends on resource cost, curse effects, card in hand effects, unplayable status, and target availability
		// Flourish effect - When active, if a player can empty their hand before ending their turn, they draw back up to their hand limit
		// Stun - Force opponent to randomly discard a card from their hand
		// Stagger - Force opponent to move a card from their discard pile to the exhausted stack
		// Revive - Move all exhausted cards to your hand.
		// Finesse - Defeat an enemy by reducing their Life Points to exactly 0.  Improved loot drop.
		// If a player goes to draw a card, and their draw deck is empty, they shuffle their discard pile and set it face down as the new draw pile
		// If the enemy is reduced to 0 or fewer Life Points, they lose.
		// When an enemy loses to the Player, the Player is presented with a selection of loot that has dropped off of it
		// This should be a varying amount of gold, experience, and a choice of cards representing cards that the enemy had in their hand when they were defeated

		// Cards have different tags and values
		// Draw X cards
		// Do X Damage
		// Heal X Life Points
		// Multiply next damage by X
		// Add X Armor
		// Set character state Dodge X
		// Set character state Bleeding X
		// Discard X cards from your hand
		// Discard X cards from your hand at random
		// Force opponent to discard X cards
		// Force opponent to discard X cards at random
		// Exhaust X Cards
	return true;
}

var EffectStack = [];

function player_trip()
{
	EffectStack.push("stagger_player(1)");
	step();
}

function player_attack(damage)
{
	if (CurrentEncounter["type"] == mob)
	{
		CurrentEncounter["lifePoints"] = CurrentEncounter["lifePoints"] - damage;
		if (CurrentEncounter["lifePoints"] <= 0)
		{
			step();
			return true;
		}
	}
	return false;
}

var Cards = {
	"sword_3" : {
		"type": "attack",
		"ap_cost": 1,
		"effect": "player_attack(3)"
	},
	"sword_5" : {
		"type": "attack",
		"ap_cost": 1,
		"effect": "player_attack(5)"
	},
	"shield_2" : {
		"type": "defense",
		"ap_cost": 1,
		"effect": "player_block(1)"
	},
	"health_potion_5" : {
		"type": "potion",
		"ap_cost": 1,
		"effect": "player_heal(5)"
	},
	"sneak" : {
		"type": "passive",
		"passive_effect" : "player_sneak()"
	},
	"trip" : {
		"type": "passive",
		"passive_effect" : "player_trip()"
	},
	"creaky_boards_1" : {
		"type": "passive",
		"passive_effect" : "player_trip()"
	},
	"guard_5" : {
		"type": "mob",
		"lifePoints": 5,
		"attackPoints": 1
	},
	"gold_5" : {
		"type" : "gold",
		"value" : 5
	},
	"dagger_1" : {
		"type" : "attack",
		"ap_cost" : 0,
		"effect" : "player_attack(1)"
	}
};