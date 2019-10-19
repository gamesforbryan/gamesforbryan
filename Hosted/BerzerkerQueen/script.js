// Start game in Fortress of Tyranny
// Assigned a preset loadout for first game
// Assigned a preset first X dungeon cards for tutorial ("The Escape")
// After the tutorial has been completed, subsequent playthroughs will allow a player to start from the Tutorial or begin with a randomly assigned loadout
// With a randomly assigned loadout, the player is given a randomly selected set of cards and intrinsic aptitudes for a particular archetype (of which, we will have a database of 10 or so)
// The player chooses the set of starting cards from a superset available for their archetype
// Players are presented with a choice of subsequent encounters (1 ~ 3)
// The selected encounter triggers.  Each encounter type has a different subroutine that we'll route between
// Once the encounter has resolved, if the player's Life Points are below 0, they die.  Go to the On Death subroutine.
// Otherwise, they are presented with next encounter set.

// On Death, display an indicator of the player's current progress.
// Also display their highest progress.
// Also display their previous run's progress.
// Display their portrait, name, archetype
// They get to pick one piece of equipment to cache for later
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
