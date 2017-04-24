var queryURL = ""
// randomNumber returns a random number between min and max
function randomNumber(min,max)
{
  return Math.floor(Math.random()*(max-min+1)+min)
}
function getOverwatchAjax() {
  $.ajax({
    url: queryURL,
    success:function(data){
      displayOverwatch(data)
    },
    error: function(data){
      alert('Unable to find player. Make sure you have followed the directions!');
    }
  })
}

var heroes = [];
var images = ["Dva-portrait.png","Orisa-portrait.png","Widowmaker-portrait.png","Mei-portrait.png","Tracer-portrait.png","Bastion-portrait.png","Roadhog-portrait.png","Junkrat-portrait.png","Ana-portrait.png","Lucio-portrait.png","Sombra-portrait.png","Reaper-portrait.png","Hanzo-portrait.png",
"Winston-portrait.png","Zarya-portrait.png","Mercy-portrait.png","Genji-portrait.png","McCree-portrait.png","Reinhardt-portrait.png","Soldier76-portrait.png","Torbjorn-portrait.png","Symmetra-portrait.png","Zenyatta-portrait.png","Pharah-portrait.png"];
var names = ["D.Va","Orisa","Widowmaker","Mei","Tracer","Bastion","Roadhog","Junkrat","Ana","Lucio","Sombra","Reaper","Hanzo","Winston","Zarya","Mercy","Genji","McCree","Reinhardt","Soldier76","Torbjorn","Symmetra","Zenyatta","Pharah"];
var desc = [
  "D.Va’s mech is nimble and powerful — its twin Fusion Cannons blast away with autofire at short range, and she can use its Boosters to barrel over enemies and obstacles, or deflect attacks with her projectile-dismantling Defense Matrix.",
  "Orisa serves as the central anchor of her team, and defends her teammates from the frontline with a protective barrier. She can attack from long range, fortify her own defenses, launch graviton charges to slow and move enemies, and deploy a Supercharger to boost the damage output of multiple allies at once.",
  "A cold-blooded assassin, Widowmaker is the archetypal sniper, grappling up to vantage points and lining up the perfect kill shot. Her sniper rifle and sticky mines make her a strong Defense hero, staking out choke-points and picking off any target that stands still for too long.",
  "Mei’s weather-altering devices slow opponents and protect locations. Her Endothermic Blaster unleashes damaging icicles and frost streams, and she can Cryo-Freeze herself to guard against counterattacks, or obstruct the opposing team's movements with an Ice Wall.",
  "With a unique ability to control the speed of her own passage through time, Tracer zips and blinks around the battlefield, eluding attackers and sneaking past defenses. A perfect skirmisher hero, Tracer is fragile but hard to hit, keeping one step ahead of her attackers while she harasses and harries the enemy team. Tracer excels at getting behind enemy lines, but it is inadvisable to move her through chokepoints. Should she find herself blinking into an ambush, she can rewind time to her position and state a few seconds earlier, giving her a second chance.",
  "Repair protocols and the ability to transform between stationary Assault, mobile Recon and devastating Tank configurations provide Bastion with a high probability of victory.",
  "Roadhog uses his signature Chain Hook to pull his enemies close before shredding them with blasts from his Scrap Gun. He’s hardy enough to withstand tremendous damage, and can recover his health with a short breather.",
  "Junkrat uses his Frag Launcher to bounce grenades at his enemies while planting Concussion Mines and Steel Traps to defend targets.",
  "Ana's versatile arsenal allows her to affect heroes all over the battlefield. Her Biotic Rifle rounds and Biotic Grenades heal allies and damage or impair enemies; her sidearm tranquilizes key targets, and Nano Boost gives one of her comrades a considerable increase in power.",
  "On the battlefield, Lúcio’s cutting-edge Sonic Amplifier buffets enemies with projectiles and knocks foes back with blasts of sound. His songs can both heal his team or boost their movement speed, and he can switch between tracks on the fly.",
  "Stealth and debilitating attacks make Sombra a powerful infiltrator. Her hacking can disrupt her enemies, ensuring they're easier to take out, while her EMP provides the upper hand against multiple foes at once. Sombra’s ability to Translocate and camouflage herself makes her a hard target to pin down.",
  "Reaper is a deadly assassin that can move like a ghost through the battlefield, dispatching enemies and draining the life from their corpses, disappearing before their allies can catch him. Reaper is most effective at close quarters, and uses his movement abilities to get close to vulnerable targets. He is at his best when ambushing and swiftly silencing targets before slipping back into the shadows. With his Death Blossom turning him into a deadly whirlwind, Reaper can be devastating in confined spaces, turning an enemy charge into a massacre.",
  "A lethal bowman and assassin without peer, Hanzo’s versatile arrows can reveal his enemies or fragment to strike multiple targets. He can scale walls to fire his bow from on high, or summon a titanic spirit dragon.",
  "Winston wields impressive inventions—a jump pack, electricity-blasting Tesla Cannon, portable shield projector and more—with literal gorilla strength.",
  "Aleksandra 'Zarya' Zaryanova is a Russian, pink-haired soldier who loves to play around with particles and gravity. Her primary weapon of choice is a particle cannon which can shoot beams and balls of energy, and create shields for herself and her allies. A powerful Tank, Zarya can turn the damage she absorbs into energy to fuel her weapons, dishing out damage as she defends her team.",
  "Mercy is capable of dealing damage, but is best played by following friendly heroes and healing and buffing them.",
  "Genji flings precise and deadly Shuriken at his targets, and uses his wakizashi to deflect projectiles or delivers a Swift Strike with his technologically-advanced katana that cuts down enemies.",
  "Gunslinger and vigilante, McCree makes use of his revolver to slay his foes, flashbangs to stun, and has a combat roll to avoid danger.",
  "Reinhardt is a powerful Tank. His iconic ability Barrier Field allows him to shield allies and defend objectives, while his melee Rocket Hammer makes him a threat at close range. Charge allows him to charge and pin enemies, further enabling him to push and harass the front line.",
  "The archetypal soldier hero, Soldier: 76 is intended to be a gateway hero for players more rooted in Call of Duty-styled gameplay.",
  "One of the world's greatest engineers, Torbjörn can swiftly construct and upgrade turrets, producing powerful units capable of defending areas against attackers.",
  "Symmetra utilizes her light-bending Photon Projector to dispatch adversaries, shield her associates, construct teleportation pads and deploy particle-blasting Sentry Turrets.",
  "Zenyatta calls upon orbs of harmony and discord to heal his teammates and weaken his opponents, all while pursuing a transcendent state of immunity to damage.",
  "Pharah is a versatile and mobile Offense hero, capable of limited-duration flight. This gives her good escape capabilities, excellent vantage in open-air situations, and enables her to reach enemy snipers with ease. Her Ultimate ability Barrage allows her to rain heavy damage down on her enemies."
]
var curMax = -1;
var index = -1;

function displayOverwatch(data) {
  var mostPlayed
  var name = document.getElementById("owname").value
  var num = document.getElementById("ownum").value
  var sprite = data['us']['stats']['quickplay']['overall_stats']['avatar']
  var levelImg = data['us']['stats']['quickplay']['overall_stats']['rank_image']
  var winrt = data['us']['stats']['quickplay']['overall_stats']['win_rate']
  var wins = data['us']['stats']['quickplay']['overall_stats']['wins']
  var ttlg = data['us']['stats']['quickplay']['overall_stats']['games']
  var rank = data['us']['stats']['quickplay']['overall_stats']['tier']
  var crank = data['us']['stats']['quickplay']['overall_stats']['comprank']
  // CHARACTER PLAY TIMES
  var dvatime = data['us']['heroes']['playtime']['quickplay']['dva']
  var orisatime = data['us']['heroes']['playtime']['quickplay']['orisa']
  var widowmakertime = data['us']['heroes']['playtime']['quickplay']['widowmaker']
  var meitime = data['us']['heroes']['playtime']['quickplay']['mei']
  var tracertime = data['us']['heroes']['playtime']['quickplay']['tracer']
  var bastiontime = data['us']['heroes']['playtime']['quickplay']['bastion']
  var roadhogtime = data['us']['heroes']['playtime']['quickplay']['roadhog']
  var junkrattime = data['us']['heroes']['playtime']['quickplay']['junkrat']
  var anatime = data['us']['heroes']['playtime']['quickplay']['ana']
  var luciotime = data['us']['heroes']['playtime']['quickplay']['lucio']
  var sombratime = data['us']['heroes']['playtime']['quickplay']['sombra']
  var reapertime = data['us']['heroes']['playtime']['quickplay']['reaper']
  var hanzotime = data['us']['heroes']['playtime']['quickplay']['hanzo']
  var winstontime = data['us']['heroes']['playtime']['quickplay']['winston']
  var zaryatime = data['us']['heroes']['playtime']['quickplay']['zarya']
  var mercytime = data['us']['heroes']['playtime']['quickplay']['mercy']
  var genjitime = data['us']['heroes']['playtime']['quickplay']['genji']
  var mccreetime = data['us']['heroes']['playtime']['quickplay']['mcree']
  var reinhardttime = data['us']['heroes']['playtime']['quickplay']['reinhardt']
  var soldier76time = data['us']['heroes']['playtime']['quickplay']['soldier76']
  var torbjorntime = data['us']['heroes']['playtime']['quickplay']['torbjorn']
  var symmetratime = data['us']['heroes']['playtime']['quickplay']['symmetra']
  var zenyattatime = data['us']['heroes']['playtime']['quickplay']['zenyatta']
  var pharahtime = data['us']['heroes']['playtime']['quickplay']['pharah']

  heroes.push(dvatime);
  heroes.push(orisatime);
  heroes.push(widowmakertime);
  heroes.push(meitime);
  heroes.push(tracertime);
  heroes.push(bastiontime);
  heroes.push(roadhogtime);
  heroes.push(junkrattime);
  heroes.push(anatime);
  heroes.push(luciotime);
  heroes.push(sombratime);
  heroes.push(reapertime);
  heroes.push(hanzotime);
  heroes.push(winstontime);
  heroes.push(zaryatime);
  heroes.push(mercytime);
  heroes.push(genjitime);
  heroes.push(mccreetime);
  heroes.push(reinhardttime);
  heroes.push(soldier76time);
  heroes.push(torbjorntime);
  heroes.push(symmetratime);
  heroes.push(zenyattatime);
  heroes.push(pharahtime);

  // END OF MOST PLAYED HEROES
  for(i = 0; i< heroes.length;i++){
    if(heroes[i]>curMax){
      curMax = heroes[i];
      index = i;
    }
  }
  if(rank !== null){
    var cpwinrt = data['us']['stats']['competitive']['overall_stats']['win_rate']
  }
  if(rank == null){
    rank= "unranked"
    crank= "unranked"
    cpwinrt= "(Unplayed)"
  }
  document.getElementById("chardesc").innerHTML =  name + "'s" + " most played hero is " + names[index];
  document.getElementById("charpho").src = "images/"+images[index];
  document.getElementById("ttlname").innerHTML = "<strong>" + name + "</strong>"+" #" + num;
  document.getElementById("rankdesc").innerHTML =  name +" is currently a "+rank+" player.";
  document.getElementById("heroinfo").innerHTML = desc[index];
  document.getElementById("comprank").innerHTML = name + "'s current rank is " + crank +" which would place them into the " + rank + " tier." + " Overwatch ranks consist of: Bronze, Silver, Gold, Platinum, Diamond, Master, Grand Master, and Top 500."
  document.getElementById("winrt").innerHTML = name + "'s quickplay win rate is currently " + winrt + "%. " + "This will determine the Match Making Rank of the player.";
  document.getElementById("cpwinrt").innerHTML = name + "'s competitive win rate is currently " + cpwinrt + "%. " + "This will determine the SR gained in matchmaking to filter out poor performers.";
  document.getElementById("charmain").innerHTML = name + "'s most played hero is " + names[index] + ". Haha, what a nerd! I mean really? Maining " + names[index] + "? You know you need to more of a diverse player. Don't be sneaking away with maining " + names[index] + "!"
  document.getElementById("learnmore").href = "http://overwatch.gamepedia.com/" + names[index];
}

function overwatchButtonClick() {
  heroes = [];
  curMax= -1;
  index= -1;
  var owname = document.getElementById("owname").value
  var ownum = (document.getElementById("ownum").value).toLowerCase()
  queryURL = "https://owapi.net/api/v3/u/" + owname + "-" + ownum + "/blob"
  console.log(queryURL)
  getOverwatchAjax()
}
