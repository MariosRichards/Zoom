Zoomer = {};

Zoomer.Zoom = function(config)
{
var self = this;
this.div = "body";

this.zoom = 1;

this.translationAccX = 0;
this.translationAccY = 0;


this.init_wheel = function()
	{

	this.centreX = $(self.div).width()/2 + $(self.div).position().left;
	this.centreY = $(self.div).height()/2 + $(self.div).position().top;
	//alert(this.centreX +','+this.centreY);	
	
	
	$(self.div).bind('mousemove', function(event)
	{
		$("#info").append().text("mouseX = "+event.clientX+","+"mouseY = "+event.clientY+"\n"
		+"this.centreX = "+self.centreX+","+"this.centreY = "+self.centreY
		+"$(self.div).position().left = "+$(self.div).position().left+","+"$(self.div).position().top = "+$(self.div).position().top
		+"self.translationAccX = "+self.translationAccX+","+"this.translationAccY = "+self.translationAccY
		);
	//	$("#info").append().text("mouseX = "+event.clientX+","+"mouseY = "+event.clientY);
		
		

		
		
		
		
		
		
		
		
			
	}
	);
	
		
	$(self.div).bind('mousewheel', function(event, delta) {
	
		// alert("x, " + event.clientX + " y: " + event.clientY);
		
		// they have to be converted to relative positions, relating to the div



		// these values are supposed to be the vector between 
		// the centre of the image and where you want to zoom from
		// in non-zoomed screen pixels
//		var pos = $(self.div).position();
		var x = event.clientX;
		var y = event.clientY;
	//	alert("x="+x+"y="+y);
		
		// for testing, force all zooms to be top left corner
		// x = 300;
		// y = 160;
		
		// //alert(pos.left);
		// console.log(pos.left);
		// console.log(pos.top);
		
		
		// var a =$(self.div).width();
		// alert($(self.div).width());
		// alert($(self.div).height());
		
		//alert(pos.left +','+ pos.right +','+ pos.top +','+ pos.bottom);
		

		// alert(self.zoom);	
		

		var Zx = (x - self.centreX); // 400
		var Zy = (y - self.centreY); // 200
	//	alert(Zx +','+ Zy);
		
	//	alert("x, " + x + " y: " + y);		
			
			if(delta > 0)
			{
				self.zoom_in(Zx,Zy);
			}
			else
			{
				self.zoom_out(Zx,Zy);
			}

		});
			
	}


this.zoom_in = function(Zx,Zy)
	{
	// console.log("Zoom In");
	var scaling = 1; // 100% increase

	self.translationAccX -= Zx*scaling;

	self.translationAccY -= Zy*scaling;

	var translate = 'translate('+self.translationAccX+'px, '+self.translationAccY+'px)';
	
	self.zoom += scaling;	

	var scale = 'scale(' + self.zoom + ',' + self.zoom + ')';	

	$(testbed.div).css('transform', translate+scale);
		
	}


this.zoom_out = function(Zx,Zy)
	{
	// console.log("Zoom Out");	
	var scaling = -self.zoom/2;
	// var translateX = (Zx*-scaling);
	// var translateY = (Zy*-scaling);

	self.translationAccX -= Zx*scaling;

	self.translationAccY -= Zy*scaling;	

	var translate = 'translate('+self.translationAccX+'px, '+self.translationAccY+'px)';
	
	self.zoom += scaling;	
	
	var scale = 'scale(' + self.zoom + ',' + self.zoom + ')';	
	
	
	// self.centreX += Zx*-scaling;
	// self.centreY += Zy*-scaling;

	$(testbed.div).css('transform', translate+ scale);


	}



this.zoom_event = function(event)
	{
	// now event.clientX and event.clientY are absolute screen positions
	alert("x, " + event.clientX + " y: " + event.clientY);
	
	// they have to be converted to relative positions, relating to the div
	
	var pos = $(self.div).position();
	var x = event.clientX - pos.left;
	var y = event.clientY - pos.top;	
	
	alert("x, " + x + " y: " + y);	
	}


this.init = function()
	{
	if (config.div) self.div = "#" + config.div;
	if (config.wheel) self.init_wheel();

		
	$(self.div).dblclick(function(event){
		self.zoom_event(event);	
		});	
		
	}	
	
self.init();	
}






var testbed;

$(document).ready(function () {
	
 config = {};
 config.div = "testbed";	
 config.wheel = true;
	
	
		
 testbed = new Zoomer.Zoom(config);	

	
});	