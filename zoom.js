Zoomer = {};

Zoomer.Zoom = function(config)
{
var self = this;
this.div = "body";

this.zoom = 1;
// this.width = $(self.div).width();
// this.height = $(self.div).height();

this.translationAccX = 0;
this.translationAccY = 0;


this.init_wheel = function()
	{

	this.centreX = $(self.div).width()/2;
	this.centreY = $(self.div).height()/2;
	alert(this.centreX +','+this.centreY);	
		
	$(self.div).bind('mousewheel', function(event, delta) {
	
		// alert("x, " + event.clientX + " y: " + event.clientY);
		
		// they have to be converted to relative positions, relating to the div



		
		var pos = $(self.div).position();
		var x = event.clientX - pos.left;
		var y = event.clientY - pos.top;	
		
		// for testing, force all zooms to be top left corner
		//x =0;
		// y =0;
		
		//alert(pos.left);
		console.log(pos.left);
		console.log(pos.top);
		
		
		// var a =$(self.div).width();
		// alert($(self.div).width());
		// alert($(self.div).height());
		
		//alert(pos.left +','+ pos.right +','+ pos.top +','+ pos.bottom);
		

		// alert(self.zoom);	
		

		var Zx = (x - self.centreX/self.zoom); // 400
		var Zy = (y - self.centreY/self.zoom); // 200
		alert(Zx +','+ Zy);
		
	//	alert("x, " + x + " y: " + y);		
			
			if(delta > 0)
			{
				self.zoom_in(Zx,Zy);
			}
			else
			{
	//			self.zoom_out(Zx,Zy);
			}

		});
			
	}


this.zoom_in = function(Zx,Zy)
	{
	console.log("Zoom In");
	var scaling = 1; // 100% increase
	
	var translateX = (Zx*-scaling);
//	translateX = 400;
	
	self.translationAccX+=translateX;
	
	var translateY = (Zy*-scaling);
//	translateY = 200;
	
	self.translationAccY+=translateY;


	var translate = 'translate('+self.translationAccX+'px, '+self.translationAccY+'px)';
	alert(translate);	
	self.zoom += scaling;	
//	translate = '';
	var scale = 'scale(' + self.zoom + ',' + self.zoom + ')';	
	alert(scale);
	self.centreX += translateX;
	self.centreY += translateY;
	alert(self.centreX +','+self.centreY);		
	
	
//var scale = '';
	$(testbed.div).css('transform', translate+scale);
//	$(testbed.div).css('transform', scale);	
//	$(testbed.div).css('transform', 'translate('Zx*-.1+'px, '+Zy*-.1+'px)');		
	}


this.zoom_out = function(Zx,Zy)
	{
	console.log("Zoom Out");	
	var scaling = -self.zoom/2;
	var translateX = (Zx*-scaling);
	var translateY = (Zy*-scaling);


	var translate = 'translate('+translateX+'px, '+translateY+'px)';
	alert(translate);
	self.zoom += scaling;	
	//translate = '';	
	var scale = 'scale(' + self.zoom + ',' + self.zoom + ')';	
	
	
	self.centreX += Zx*-scaling;
	self.centreY += Zy*-scaling;
	alert(self.centreX +','+self.centreY);		
	
	//var scale = '';	
	$(testbed.div).css('transform', translate+ scale);
	//$(testbed.div).css('transform', 'translate('+Zx*.1+'px, '+Zy*.1+'px)');
	
	// $(testbed.div).css('transform', 'translate(50px, 30px) scale(0.5,0.5)');
	

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