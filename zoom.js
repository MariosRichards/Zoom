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

	this.centreX = $(self.div).width()/2;
	this.centreY = $(self.div).height()/2;
	
	this.posLeft = $(self.div).position().left;
	this.posTop = $(self.div).position().top;
	
	//alert(this.centreX +','+this.centreY);	
	
	
	// $(self.div).bind('mousemove', function(event)
	// {
		// $("#info").append().text("mouseX = "+event.clientX+","+"mouseY = "+event.clientY+"\n"
		// +"this.centreX = "+self.centreX+","+"this.centreY = "+self.centreY
		// +"$(self.div).position().left = "+$(self.div).position().left+","+"$(self.div).position().top = "+$(self.div).position().top
		// +"self.translationAccX = "+self.translationAccX+","+"this.translationAccY = "+self.translationAccY
		// );

	// }
	// );
	
		
	$(self.div).bind('mousewheel', function(event, delta) {
	
		// these values are supposed to be the vector between 
		// the centre of the image and where you want to zoom from
		// in non-zoomed screen pixels

		var x = event.clientX;
		var y = event.clientY;


		// Z vector is in the coordinate system
		// of the original image
		// (obviously, when you zoom around one point
		// it remains where it was in the original image!)
		
		// more generally (i.e. if you move the cursor between zooms)
		// we need to translate from the screen pixel to
		// the original image pixel position
		
		// x in original image pixels
		// y in original image pixels
		// x->x'     :     (x-self.centreX) + self.centreX + self.posLeft                (x=0 -> x'= self.posLeft)
		// x'->x''   :     (x-self.centreX) * self.zoom + self.centreX + self.posLeft  
		// x''->x''' : y = (x-self.centreX) * self.zoom + self.centreX + self.posLeft + self.translationAccX
		
		// ((y - self.translationAccX - self.centreX - self.posLeft)/self.zoom) + self.centreX
		// y = self.posLeft; self.translationAccX = 0; self.zoom=1 -> x = 0
		
		// add a final self.posLeft to get to original screen pixels from original image pixels
		
		x = ((x - self.translationAccX - self.centreX - self.posLeft)/self.zoom) + self.centreX + self.posLeft;
		y = ((y - self.translationAccY - self.centreY - self.posTop)/self.zoom) + self.centreY + self.posTop;

		var Zx = (x - self.centreX - self.posLeft); // 400
		var Zy = (y - self.centreY - self.posTop); // 200

			
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

	var scaling = -self.zoom/2;

	self.translationAccX -= Zx*scaling;

	self.translationAccY -= Zy*scaling;	

	var translate = 'translate('+self.translationAccX+'px, '+self.translationAccY+'px)';
	
	self.zoom += scaling;	
	
	var scale = 'scale(' + self.zoom + ',' + self.zoom + ')';	

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