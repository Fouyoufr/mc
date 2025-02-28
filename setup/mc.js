function startInstall() {
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  addBtn=document.getElementsByClassName('install')[0];
  addBtn.style.display='block';
  addBtn.addEventListener('click', (e) => {
    addBtn.style.display='none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {deferredPrompt = null;});});});
if ('serviceWorker' in navigator) {navigator.serviceWorker.register('serviceWorker.js');}}

var fsRequestMethod = document.documentElement.requestFullScreen || document.documentElement.webkitRequestFullScreen || document.documentElement.mozRequestFullScreen || document.documentElement.msRequestFullScreen;

function smartPhoneTilt() {
  if (screen) {
    if (screen.orientation.type === "portrait-secondary" || screen.orientation.type === "portrait-primary") {document.getElementById('smartPhoneTilt').style.display='block';}
    screen.orientation.onchange = function (){
    if (screen.orientation.type === "landscape-primary" || screen.orientation.type === "landscape-secondary") {document.getElementById('smartPhoneTilt').style.display='none';}
    else if (screen.orientation.type === "portrait-secondary" || screen.orientation.type === "portrait-primary") {document.getElementById('smartPhoneTilt').style.display='block';}}}
  else {
    if (window.innerWidth > window.innerHeight) {document.getElementById('smartPhoneTilt').style.display='none';} else {document.getElementById('smartPhoneTilt').style.display='block';}
    window.onresize = function(){
      if (window.innerWidth > window.innerHeight) {document.getElementById('smartPhoneTilt').style.display='none';} else {document.getElementById('smartPhoneTilt').style.display='block';}}}}

if (document.addEventListener) {
 document.addEventListener('fullscreenchange', fullScreenExit, false);
 document.addEventListener('mozfullscreenchange', fullScreenExit, false);
 document.addEventListener('MSFullscreenChange', fullScreenExit, false);
 document.addEventListener('webkitfullscreenchange', fullScreenExit, false);}

function fullScreenExit() {
 if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement && !document.fullscreenElement) {
  document.getElementById('fullScreen').className='fsOn';}}

function fullScreen() {
  if (document.getElementById('fullScreen').className=='fsOn') {
    document.getElementById('fullScreen').className='fsOff';
    document.documentElement.requestFullscreen();
    if ('wakeLock' in navigator) {
      navigator.wakeLock.request('screen')
      .then((wakeLock) => {
        wakeLockObj=wakeLock;
        wakeLockObj.addEventListener('relase',()=>{
          //Quitter le pein écran si écran actif perdu
          fullScreenExit;
          wakeLockObj=null;})})}}
  else {
    if (document.exitFullscreen) {document.exitFullscreen();}
    if ('wakeLock' in navigator) {wakeLockObj.release();}}}

function ajaxDot(color) {
  var ajaxDotBox=document.getElementById('ajaxDot');
  if (!ajaxDotBox) {
    var ajaxDotBox = document.createElement('div');
    ajaxDotBox.setAttribute('id','ajaxDot');
    document.body.appendChild(ajaxDotBox);}
  ajaxDotBox.className=color;}

function ajaxPush(partie,traitement) {
  var longPoolReq=new XMLHttpRequest();
  longPoolReq.open('GET','ajax/'+encodeURIComponent(partie+'.xml'));
  longPoolReq.onreadystatechange=function() {
    if (this.readyState == 4 && this.status == 200) traitement(this);}
  longPoolReq.send();
	function longPool() {
    ajaxDot('green');
		var longPoolReq = new XMLHttpRequest();
		longPoolReq.onreadystatechange=function() {
			if (this.readyState === 4 && this.status === 200) {
        ajaxDot('red');
        traitement(this);
        longPool();}}
		longPoolReq.open('GET','longpool.php?p='+partie);
		longPoolReq.send();}
    longPool();}

function ajaxCallCache (ajaxTraite,ajaxUrl) {
    ajaxDot('red');
    ajaxReq=new XMLHttpRequest();
    ajaxReq.open('GET',ajaxUrl);
    ajaxReq.onreadystatechange=function() {
			if (this.readyState === 4 && this.status === 200) {
        ajaxDot('green');
        ajaxTraite(this);}}
    ajaxReq.send();}
  
function ajaxPost (key,value) {
  if (arguments.length==2) postDisplay=''; else postDisplay=arguments[2];
  ajaxDot('red');
  ajaxReqPost=new XMLHttpRequest();
  ajaxReqPost.open('POST','ajax.php',true);
  ajaxReqPost.onreadystatechange=function() {
    if (this.readyState === 4 && this.status === 200) {
  	  if (document.getElementById('changePhase')) document.getElementById('changePhase').style.display='none';
  	  if (document.getElementById('changeMechant')) document.getElementById('changeMechant').style.display='none';
  	  if (document.getElementById('changeName')) document.getElementById('changeName').style.display='none';
      if (document.getElementById('changeHeros')) document.getElementById('changeHeros').style.display='none';
  	  if (this.responseText=='SelectManigance') document.getElementById('NewPrincipale').style.display='block';
      if (this.responseXML) window[postDisplay](this);
      ajaxDot('green');}}
  ajaxReqPost.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  uri=key+'='+encodeURIComponent(value);
  if (document.getElementById('partie')) uri+='&p='+encodeURIComponent(document.getElementById('partie').value);
  if (document.getElementById('jId')) uri+='&j='+encodeURIComponent(document.getElementById('jId').value);
  ajaxReqPost.send(uri);}
  
function ajaxSelecSet(ajaxSelecReq) {
  //Remplissage de l'écran de sélection pour l'affichage mobile.
 	var xmlDoc = ajaxSelecReq.responseXML;
  var nbJoueurs=xmlDoc.getElementsByTagName('joueur').length;
  for (i=1;i<=parseInt(nbJoueurs);i++) {
    var numero=parseInt(xmlDoc.getElementsByTagName('joueur')[i-1].getAttribute('jNumero'));
    if (document.getElementById('selecJ'+numero).style.display!='block') document.getElementById('selecJ'+numero).style.display='block';
    document.getElementById('selecJ'+numero).value=xmlDoc.getElementsByTagName('joueur')[i-1].getAttribute('jNom');
    document.getElementById('selecJ'+numero).setAttribute('onclick','window.location.href="joueur.php?p='+xmlDoc.getElementsByTagName('partie')[0].getAttribute('pUri')+'&j='+xmlDoc.getElementsByTagName('joueur')[i-1].getAttribute('jId')+'";');}
  if (nbJoueurs<4 && document.getElementById('selecJ4').style.display!='none') document.getElementById('selecJ4').style.display='none'
  if (nbJoueurs<3 && document.getElementById('selecJ3').style.display!='none') document.getElementById('selecJ3').style.display='none'
  if (nbJoueurs<2 && document.getElementById('selecJ2').style.display!='none') document.getElementById('selecJ2').style.display='none'
  if (nbJoueurs==0) window.location.href='mechant.php?p='+document.getElementById('partie').value;}

function ajaxJoueurSet(ajaxJoueurReq) {
  //Remplissage de l'écran mobile de joueur.
  var xmlDoc = ajaxJoueurReq.responseXML;
  var partie=xmlDoc.getElementsByTagName('partie')[0];
  var vieMechant=partie.getAttribute('pMechVie');
  var nbJoueurs=xmlDoc.getElementsByTagName('joueur').length;
  var premier=partie.getAttribute('pPremier');
  if (vieMechant<10) vieMechant="0"+vieMechant;
  if (document.getElementById('jId').value==partie.getAttribute('pPremier')) document.getElementById('joueurFirst').className='on';
  else document.getElementById('joueurFirst').className='off';
  document.getElementById('mechantPicJoueur').style.background='url(img/mechants/'+partie.getAttribute('pMechant')+'.png) no-repeat center';
  document.getElementById('mechantLifeJoueur').innerText=vieMechant;
  document.getElementById('phaseMechantJoueur').innerText=phMechant(partie.getAttribute('pMechPhase'));
  document.getElementById('mechantPicJoueur').classList.remove('mechantDesJ','mechantSonJ','mechantTenJ');
  if (partie.getAttribute('pMechDesoriente')==1) document.getElementById('mechantPicJoueur').classList.add('mechantDesJ');
  if (partie.getAttribute('pMechSonne')==1) document.getElementById('mechantPicJoueur').classList.add('mechantSonJ');
  if (partie.getAttribute('pMechTenace')==1) document.getElementById('mechantPicJoueur').classList.add('mechantTenJ');
  Array.prototype.slice.call(partie.getElementsByTagName('joueur')).forEach(function(joueur,index,array) {
    if (joueur.getAttribute('jId')==document.getElementById('jId').value) {
      document.getElementById('picJoueur').style.background='url(img/heros/'+joueur.getAttribute('jHeros')+'.png) no-repeat center';
      document.title='Marvel Champions - '+joueur.getAttribute('jNom');
      document.getElementById('joueur').innerText=joueur.getAttribute('jNom');
      var vie=joueur.getAttribute('jVie');
      if (vie<10) vie="0"+vie;
      document.getElementById('vieJoueur').innerText=vie;
      var etat=joueur.getAttribute('jStatut');
      if (etat=='AE') etat=lang['alter']; else etat=lang['hero'];
      document.getElementById('etatJoueur').innerText=etat;
      if (joueur.getAttribute('jDesoriente')==0) document.getElementById('desJoueur').className='disabledJoueur';
      else document.getElementById('desJoueur').className='desJoueur';
      if (joueur.getAttribute('jSonne')==0) document.getElementById('sonJoueur').className='disabledJoueur';
      else document.getElementById('sonJoueur').className='sonJoueur';
      if (joueur.getAttribute('jTenace')==0) {
        document.getElementById('vieJoueurMoins').className='vieJoueur';
        document.getElementById('tenJoueur').className='disabledJoueur';}
      else {
        document.getElementById('vieJoueurMoins').className='vieJoueurRed';
        document.getElementById('tenJoueur').className='tenJoueur';
      }}});}

function ajaxDeckSet(ajaxDeckReq) {
  //refresh du menu des manigances
  deckId=document.getElementById('deck').value;
  var xmlDoc = ajaxDeckReq.responseXML;
  if (deckId!='0') {
    oldManiList=document.getElementById('newManiganceId').innerHTML;
    newManiList='';
    Array.prototype.slice.call(xmlDoc.getElementsByTagName('deck')).forEach(function(deckValue,index,array) {
      if (deckValue.getAttribute('dId')==deckId) {
        Array.prototype.slice.call(deckValue.getElementsByTagName('maniChoice')).forEach(function(maniChoice,index,array) {
          newManiList+='<option value="'+maniChoice.getAttribute('maId')+'">'+maniChoice.getAttribute('maNom')+'</option>';})}})
    if (newManiList!=oldManiList) {document.getElementById('newManiganceId').innerHTML=newManiList;}
    document.getElementById('newManiganceId').style.display='inline-block';
    document.getElementById('NewManiganceConfirm').disabled=false;}
  else {
    document.getElementById('NewManiganceConfirm').disabled=true;
    document.getElementById('newManiganceId').style.display='none';}}
  
function ajaxMainSet(ajaxMainReq) {
  //Remplissage de l'écran principal d'affichage de partie
  var xmlDoc = ajaxMainReq.responseXML;
  var partie=xmlDoc.getElementsByTagName('partie')[0];
  var nbJoueurs=xmlDoc.getElementsByTagName('joueur').length;
  var vieMechant=partie.getAttribute('pMechVie');
  var premier=partie.getAttribute('pPremier');
  if (vieMechant<10) vieMechant="0"+vieMechant;
  document.getElementById('mechantRiposte').className='mechantRiposte'+partie.getAttribute('pMechRiposte');
  document.getElementById('mechantPercant').className='mechantPercant'+partie.getAttribute('pMechPercant');
  document.getElementById('mechantDistance').className='mechantDistance'+partie.getAttribute('pMechDistance');
  document.getElementById('NewPrincipaleButton').innerText=partie.getAttribute('mpNom');
  document.getElementById('mechantPic').src='img/mechants/'+partie.getAttribute('pMechant')+'.png';
  document.getElementById('mechantLife').innerText=vieMechant;
  document.getElementById('mechant').innerText=partie.getAttribute('mNom');
  var maniCourant=partie.getAttribute('pManiCourant');
  if (maniCourant<10) maniCourant='0'+maniCourant;
  document.getElementById('manigancePri').innerText=maniCourant;
  var maniMax=partie.getAttribute('pManiMax');
  if (maniMax<10) maniMax='0'+maniMax;
  document.getElementById('manigancePri').innerText=maniCourant;
  document.getElementById('manigancePriMax').innerText=maniMax;
  var maniganceAcc=partie.getAttribute('pManiAcceleration');
  var Decks=xmlDoc.getElementsByTagName('deck');
  var DeckList=Array.prototype.slice.call(Decks);
  var newDecks="<option value='0'>--"+lang['selectDeck']+"--</option>";
  var newDecksHeros='<option disabled>'+lang['heroSchemes']+'</option>';
  var newDeckSeparation=false;
  DeckList.forEach(function(value,index,array) {
    if (value.getAttribute('dId').charAt(0)!='h') newDecks+='<option value="'+value.getAttribute('dId')+'">'+value.getAttribute('dNom')+'</option>';});
  DeckList.forEach(function(value,index,array) {
    if (value.getAttribute('dId').charAt(0)=='h') {
      newDeckSeparation=true;
      newDecksHeros+='<option value="'+value.getAttribute('dId')+'">'+value.getAttribute('dNom')+'</option>';}});
  if (newDeckSeparation) newDecks+=newDecksHeros;
  if (document.getElementById('NewManigance').style.display!='block') document.getElementById('deck').innerHTML=newDecks;
  var manigances = xmlDoc.getElementsByTagName('manigance');
  var manigancesList = Array.prototype.slice.call(manigances);
  document.getElementById('manigancesAnnexes').innerHTML='';
  document.getElementById('maCrise').className='vieBtn';
  //Popup si nouvelle manigance "une fois révélée"
  var lastManigance=0;
  if (xmlDoc.getElementsByTagName('lastManigance').length!=0) {
    lastManigance=xmlDoc.getElementsByTagName('lastManigance')[0].getAttribute('id');
    if (document.getElementById('popupNewManigance').value!=lastManigance) document.getElementById('popupNewManigance').value=lastManigance;
    else lastManigance=0;}
  //Popup si nouvelle manigance "une fois déjouée" 
  //(++ rajouter attribut de date pour éviter de réafficher au refresh ?)
  if (partie.getAttribute('pManiDelete')!=document.getElementById('popupDelManigance').value) {
    document.getElementById('popupDelManigance').value=partie.getAttribute('pManiDelete');
    if (partie.getAttribute('pManiDelete')!=0) {
      document.getElementById('manigancePopupText').innerHTML=partie.getAttribute('maniDelete');
      document.getElementById('manigancePopup').style.display='block';}}
  manigancesList.forEach(function(value,index,array) {
    maniAnnexe='"><input class="vieBtn" type="button" value="<" onclick="document.getElementById(\'MA'+value.getAttribute('maId')+'\').innerText-=1;ajaxPost(\'MA='+value.getAttribute('maId')+'&menace\',document.getElementById(\'MA'+value.getAttribute('maId')+'\',\'ajaxMainSet\').innerText);">';
    menaceToDisplay=value.getAttribute('mnMenace');
    if (menaceToDisplay<10) menaceToDisplay='0'+menaceToDisplay;
    maniAnnexe+='<div class="MA" id="MA'+value.getAttribute('maId')+'">'+menaceToDisplay+'</div>';
    maniAnnexe+='<input class="vieBtn" type="button" value=">" onclick="document.getElementById(\'MA'+value.getAttribute('maId')+'\').innerText=parseInt(document.getElementById(\'MA'+value.getAttribute('maId')+'\').innerText)+1;ajaxPost(\'MA='+value.getAttribute('maId')+'&menace\',document.getElementById(\'MA'+value.getAttribute('maId')+'\').innerText,\'ajaxMainSet\');">';
    maniAnnexe+='<div class="tooltip">'+value.getAttribute('maNom');
    //Informations sur la manigance annexe
    maInfo='';
    if (value.getAttribute('maRevele')!='') maInfo='<span class="manigancePopupType">Une fois révélée :</span> '+value.getAttribute('maRevele')+'<br/>';
    if (value.getAttribute('maDejoue')!='') maInfo+='<span class="manigancePopupType">Une fois déjouée :</span> '+value.getAttribute('maDejoue')+'<br/>';
    if (value.getAttribute('maInfo')!='') maInfo+='<span class="manigancePopupType">Informations :</span> '+value.getAttribute('maInfo')+'<br/>';
    if (maInfo!='') maniAnnexe+='<a onclick="document.getElementById(\'manigancePopup\').style.display=\'block\';document.getElementById(\'manigancePopupText\').innerHTML=\'<h2>'+value.getAttribute('maNom').replaceAll("'","\\'").replaceAll('"','&quot;')+'</h2>'+maInfo.replaceAll("'","\\'").replaceAll('[pp]','<img src="img/pp.png" alt="par joueur" class="pp"/>').replaceAll('"','&quot;')+'\';"><img src=\'img/aide.png\' alt=\'Informations sur la manigance\' class=\'maniPopupInfo\'></a>';
    if (value.getAttribute('maId')==lastManigance && value.getAttribute('maRevele')!='') {
      //Popup
      document.getElementById('manigancePopup').style.display='block';
      document.getElementById('manigancePopupText').innerHTML='<h2>'+value.getAttribute('maNom')+'</h2><span class="manigancePopupType">Une fois révélée :</span> '+value.getAttribute('maRevele').replaceAll('[pp]','<img src="img/pp.png" alt="par joueur" class="pp"/>').replace("'","\'");}
    maniAnnexe+='<span class="tooltiptext">';
    if (value.getAttribute('maDeck')==0) maniAnnexe+=value.getAttribute('hNom');
    else {
      maniAnnexe+=value.getAttribute('fromDeckNom');
      if (value.getAttribute('maNumero')!=0) maniAnnexe+=' N°'+value.getAttribute('maNumero');}
    maniAnnexe+='</div><div class="maniganceIcones">';
    if (value.getAttribute('maCrise')==1) {
      maniAnnexe+='<img src="img/MenaceCrise.png" alt="Crise"/>';
      document.getElementById('maCrise').className='vieBtnRed';}
    if (value.getAttribute('maRencontre')>0) for (let pas=0;pas<value.getAttribute('maRencontre');pas++) maniAnnexe+='<img src="img/MenaceRencontre.png" alt="Rencontre"/>';
    if (value.getAttribute('maAcceleration')>0) {
      for (let pas=0;pas<value.getAttribute('maAcceleration');pas++) maniAnnexe+='<img src="img/MenaceAcceleration.png" alt="Accelération"/>';
      maniganceAcc=parseInt(maniganceAcc)+parseInt(value.getAttribute('maAcceleration'));}
    if (value.getAttribute('maAmplification')>0) for (let pas=0;pas<value.getAttribute('maAmplification');pas++) maniAnnexe+='<img src="img/amplification.png" alt="Accelération"/>';
    document.getElementById('manigancesAnnexes').innerHTML+='<div class="maniganceLine'+maniAnnexe+'</div></div>';});
  var compteurs = xmlDoc.getElementsByTagName('compteur');
  var compteursList = Array.prototype.slice.call(compteurs);
  document.getElementById('compteursList').innerHTML='';
  compteursList.forEach(function(value,index,array) {
    compteur='<input class="vieBtn" type="button" value="<" onclick="document.getElementById(\'compteur'+value.getAttribute('cId')+'\').innerText-=1;ajaxPost(\'compteur='+value.getAttribute('cId')+'&value\',document.getElementById(\'compteur'+value.getAttribute('cId')+'\').innerText);">';
    compteurToDisplay=value.getAttribute('cValeur');
    if (compteurToDisplay<10) compteurToDisplay='0'+compteurToDisplay;
    compteur+='<div class="compteur" id="compteur'+value.getAttribute('cId')+'">'+compteurToDisplay+'</div>';
    compteur+='<input class="vieBtn" type="button" value=">" onclick="document.getElementById(\'compteur'+value.getAttribute('cId')+'\').innerText=parseInt(document.getElementById(\'compteur'+value.getAttribute('cId')+'\').innerText)+1;ajaxPost(\'compteur='+value.getAttribute('cId')+'&value\',document.getElementById(\'compteur'+value.getAttribute('cId')+'\').innerText,\'ajaxMainSet\');">';
    compteur+='<a class="compteurMoins" onclick="ajaxPost(\'delCompteur\',\''+value.getAttribute('cId')+'\',\'ajaxMainSet\');">-</a>';
    document.getElementById('compteursList').innerHTML+='<li class="compteurLine">'+compteur+'</li>';});
  currentPhase=partie.getAttribute('pMechPhase');
  document.getElementById('phaseMechant').innerText=phMechant(currentPhase);
  //prochaine phase
  if (typeof partie.getAttribute('nextPhase')!=='undefined') currentPhase=partie.getAttribute('nextPhase');
  else {
    currentPhase++;
    if (currentPhase==4) currentPhase=1;}
  document.getElementById('changePhaseNext').innerText=currentPhase;
  document.getElementById('changePhaseMechant').innerText=partie.getAttribute('mNom');
  if (nbJoueurs!=0) document.getElementById('changePhaseVie').innerText=partie.getAttribute('nextPhaseVie')*nbJoueurs;
  else document.getElementById('changePhaseVie').innerText=partie.getAttribute('nextPhaseVie');
  if (partie.getAttribute('pMechDesoriente')!='1') document.getElementById('mechantDesoriente').className='disabledButtonMechant bouton';
  else document.getElementById('mechantDesoriente').className='desorienteMechant';
  if (partie.getAttribute('pMechSonne')!='1') document.getElementById('mechantSonne').className='disabledButtonMechant bouton';
  else document.getElementById('mechantSonne').className='sonneMechant';
  if (partie.getAttribute('pMechTenace')!='1') {
  	document.getElementById('mechantTenace').className='disabledButtonMechant bouton';
  	document.getElementById('vieMechantMoins').className='vieBtn';}
  else {
    document.getElementById('mechantTenace').className='tenaceMechant';
    document.getElementById('vieMechantMoins').className='vieBtnRed';}
  for (i=1;i<=parseInt(nbJoueurs);i++) {
    var jDoc=xmlDoc.getElementsByTagName('joueur')[i-1];
    var jId=jDoc.getAttribute('jId');
    var numero=parseInt(jDoc.getAttribute('jNumero'));
    var joueur=jDoc.getAttribute('jNom');
    var vie=jDoc.getAttribute('jVie');
    if (vie<10) vie="0"+vie;
    var etat=jDoc.getAttribute('jStatut');
    if (etat=='AE') etat=lang['alter']; else etat=lang['hero'];
    if (jDoc.getAttribute('jDesoriente')==0) document.getElementById('desoriente'+numero).className='disabledButton'; else document.getElementById('desoriente'+numero).className='desoriente';
    if (jDoc.getAttribute('jSonne')==0) document.getElementById('sonne'+numero).className='disabledButton'; else document.getElementById('sonne'+numero).className='sonne';
    document.getElementById('picJoueur'+numero).src='img/heros/'+jDoc.getAttribute('jHeros')+'.png';
   	document.getElementById('vieDisp'+numero).innerHTML='<input id="vieBtnMoins'+numero+'" type="button" value="<" onclick="document.getElementById(\'vie'+numero+'\').innerText-=1;ajaxPost(\'j='+jId+'&vieJoueur\',document.getElementById(\'vie'+numero+'\').innerText,\'ajaxMainSet\');"><div id="vie'+numero+'" class="playerLife">'+vie+'</div><input class="vieBtn" type="button" value=">" onclick="document.getElementById(\'vie'+numero+'\').innerText=parseInt(document.getElementById(\'vie'+numero+'\').innerText)+1;ajaxPost(\'j='+jId+'&vieJoueur\',document.getElementById(\'vie'+numero+'\').innerText,\'ajaxMainSet\');">';
     if (jDoc.getAttribute('jTenace')==0) {
      document.getElementById('vieBtnMoins'+numero).className='vieBtn';
      document.getElementById('tenace'+numero).className='disabledButton';}
    else {
      document.getElementById('vieBtnMoins'+numero).className='vieBtnRed';
      document.getElementById('tenace'+numero).className='tenace';
    }
    document.getElementById('joueur'+numero+'Etat').innerHTML='<div class="etatJoueur" onclick="ajaxPost(\'j='+jId+'&switch\',\'etat\',\'ajaxMainSet\');"><span>'+etat+'</span></div>';
    document.getElementById('desoriente'+numero).setAttribute('onclick','ajaxPost("j='+jId+'&switch","desoriente",\'ajaxMainSet\');');
    document.getElementById('desoriente'+numero).className+=' bouton';
    document.getElementById('sonne'+numero).setAttribute('onclick','ajaxPost("j='+jId+'&switch","sonne",\'ajaxMainSet\');');
    document.getElementById('sonne'+numero).className+=' bouton';
    document.getElementById('tenace'+numero).setAttribute('onclick','ajaxPost("j='+jId+'&switch","tenace",\'ajaxMainSet\');');
    document.getElementById('tenace'+numero).className+=' bouton';
    document.getElementById('joueur'+numero).setAttribute('onclick','document.getElementById("changeNameId").value=\''+jId+'\';document.getElementById("changeNameOld").innerText=\''+joueur+'\';document.getElementById("changeNameIndex").style.display="block";document.getElementById("playerName").focus();');
    document.getElementById('joueur'+numero).className='playerNameBouton';
     if (jId==premier) {
     	premier=numero;
     	var suivant=parseInt(numero)+1;
     	if (suivant>nbJoueurs) suivant=1;
     	suivant=xmlDoc.getElementsByTagName('joueur')[suivant-1].getAttribute('jId');}
    if (document.getElementById('joueur'+numero+'Disp').style.visibility!='visible') document.getElementById('joueur'+numero+'Disp').style.visibility='visible'
    document.getElementById('joueur'+numero+'Numero').value=jId;
    document.getElementById('joueur'+numero).innerText=joueur;}
  document.getElementById('indexFirst').className='first'+premier;
  document.getElementById('indexFirst').setAttribute('onclick','ajaxPost("suivant",'+suivant+',\'ajaxMainSet\');');
  document.getElementById('maniganceAcc').innerText=maniganceAcc;
  if (nbJoueurs<4 && document.getElementById('joueur4Disp').style.visibility!='hidden') document.getElementById('joueur4Disp').style.visibility='hidden'
  if (nbJoueurs<3 && document.getElementById('joueur3Disp').style.visibility!='hidden') document.getElementById('joueur3Disp').style.visibility='hidden'
  if (nbJoueurs<2 && document.getElementById('joueur2Disp').style.visibility!='hidden') document.getElementById('joueur2Disp').style.visibility='hidden'
  if (nbJoueurs<1 && document.getElementById('joueur1Disp').style.visibility!='hidden') document.getElementById('joueur1Disp').style.visibility='hidden'
  if (nbJoueurs<2) document.getElementById('indexFirst').style.visibility='hidden';}

function ajaxMechantSet(ajaxMechantReq) {
  //Remplissage de l'écran d'affichage de l'état du machant (mobile)
 	var xmlDoc = ajaxMechantReq.responseXML;
 	var partie=xmlDoc.getElementsByTagName('partie')[0];
  var vieMechant=partie.getAttribute('pMechVie');
  if (vieMechant<10) vieMechant="0"+vieMechant;
  document.getElementById('mechantRiposteME').className='mechantRiposte'+partie.getAttribute('pMechRiposte');
  document.getElementById('mechantPercantME').className='mechantPercant'+partie.getAttribute('pMechPercant');
  document.getElementById('mechantDistanceME').className='mechantDistance'+partie.getAttribute('pMechDistance');
  document.getElementById('mechantPicME').src='img/mechants/'+partie.getAttribute('pMechant')+'.png';
  document.getElementById('mechantLifeME').innerText=vieMechant;
  document.getElementById('mechantME').innerText=partie.getAttribute('mNom');
  document.getElementById('phaseMechantME').innerText=phMechant(partie.getAttribute('pMechPhase'))
  if (partie.getAttribute('pMechDesoriente')==0) document.getElementById('mechantDesorienteME').className='disabledButtonMechantME bouton'; else document.getElementById('mechantDesorienteME').className='desorienteMechantME bouton';
  if (partie.getAttribute('pMechSonne')==0) document.getElementById('mechantSonneME').className='disabledButtonMechantME bouton'; else document.getElementById('mechantSonneME').className='sonneMechantME';
  if (partie.getAttribute('pMechTenace')==0) {
  	document.getElementById('mechantTenaceME').className='disabledButtonMechantME bouton';
   	document.getElementById('vieMechantMoinsME').className='vieBtnME';}
  else {
    document.getElementById('mechantTenaceME').className='tenaceMechantME';
    document.getElementById('vieMechantMoinsME').className='vieBtnRedME';}}

function phMechant (phase) {
  switch (phase) {
      case '2':
        return 'II';
      break;
      case '3':
        return 'III';
      break;
      default:
    return 'I';}}