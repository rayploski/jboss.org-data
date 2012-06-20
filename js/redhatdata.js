// JavaScript Document
// Sets all animations within the JBoss Data front page.
/**

// INIT functions
$(function() {
		bindButtonLinks();
});
	
// Attach actions to all menu links
function bindButtonLinks() {
	$('#mainMenu').children('div').children('a').bind('click',function(){
		var id = $(this).attr('id');
		shrinkMenu(id); // Send information to activate a dialog.
	});	
}

// Deactivate button links (for instance, when menu is reduced in size)
function unBindButtonLinks() {
	$('#mainMenu').children('div').children('a').unbind('click');
}


// Shrink menu and add active dialog link
function shrinkMenu(tar) {
	// Animated size reduction of main menu box
	$('#mainMenu').animate({'left':500,'width':'20%','height':'20%'},800,'easeOutQuart',function() {
		// Add return to normal link to main menu
		$(this).bind('click',function(){returnMenuToNormal();});	
	});
	
	// The remaining activities happen in tandem with shrinking of menu (should not wait for animation to finish
	
	// Unbind click action from links
	unBindButtonLinks();
	
	// Reduce fonts within links
	$('#mainMenu').children('div').children('a').each(function() {
			// Set size animation to reduce to 20% of original size
			font = parseInt($(this).css('font-size'))*.2;
			$(this).animate({fontSize:font+"px"});
		});
	// Fade out heading
	fadeHeadingOut();	
	// Activate Dialog for target ID
	setTimeout(function(){activateDialog(tar)},400);	
	
	
	
}

// Return menu to normal and put away any active description boxes
function returnMenuToNormal() {
	if($(".displayBox").hasClass('box-active') == true) {
		closeDialogAndReturnToMenu($('.box-active').attr('id'));

	}
}


// Re-enlarge menu
function enlargeMenu() {
  // Animate boxes back to normal size
  $('#mainMenu').animate({'left':27,'width':'595px','height':'341px'},800,'easeOutQuart');
  // Animate link buttons back to normal size
  $('#mainMenu').children('div').children('a').each(function() {
			// Unlike the shrinking font-size, we know the default so know parseInt necessary
			$(this).animate({fontSize:"18px"});
		});
  // Add button actions back
  bindButtonLinks();
}

// Display selected dialog  text
function activateDialog(tar) {
	// Array connecting menu buttons to their corresponding description boxes
	var idArr = new Array();
	idArr["droolsBtn"] 		 	= "droolsBox";
	idArr["modeShapeJCRBtn"] 	= "modeShapeJCRBox";
	idArr["hibernateBtn"]	 	= "hibernateBox";
	idArr["modeShapeJDBCBtn"]	= "modeShapeJDBCBox";
	idArr["txBtn"]				= "txBox";
	idArr["hibernateSearchBtn"] = "hibernateSearchBox";
	idArr["ogmBtn"] 			= "ogmBox";
	idArr["infinispanBtn"]		= "infinispanBox";
	idArr["jCloudsBtn"]			= "jCloudsBox";
	idArr["cdmiBtn"]			= "cdmiBox";
	
	
	var targetBox = idArr[tar];
	// Add active class to dialog box for positioning
	$("#"+targetBox).addClass('box-active');
	// Fade in selected description box
	$("#"+targetBox).fadeTo(300,1.0,function() {
			$(this).children('a.closeBtn').bind('click',function(){
					// Get parent of "close" button
					parId = $(this).parent('div').attr('id');
					closeDialogAndReturnToMenu(parId);
				});
			
		});
}

// Close open description text and return main menu to normal size
function closeDialogAndReturnToMenu(tar) {
		$("#"+tar).fadeTo(200,0,function() {
				$("#"+tar).removeClass('box-active');
				enlargeMenu();
				fadeHeadingIn();
			});
}

// Fade heading to 0 opacity
function fadeHeadingOut() { $("#cdiHeading").fadeTo(300,0);}

// Fade heading to 100% opacity
function fadeHeadingIn() {  $("#cdiHeading").fadeTo(300,1.0);}