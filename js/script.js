var builder = new PanelBuilder();
var validator = new Validator();

$(window).resize(function() {
	builder.rebuild();
});

$(document).ready(function() {
	builder.rebuild();
	$('input[name="reset"]').click(validator.validateResolution);
	$('input[name="reset"]').click(builder.rebuild);
});

function Validator() {
	this.validateResolution = function(event) {
		var input = $('#resolution');
		var min = input.attr('min');
		var max = input.attr('max');
		var value = Number(input.val());
		if(value < min || value > max) {
			input.val(max / 2);
			alert("you have entered wrong resolution value");
		}
	}
}

function PanelBuilder() {
	var drawer = new Drawer();
	var panel = $('.panel');

	this.rebuild = function() {
		var method = getMethod();
		resizePanel();
		rebuildToolBox(method);
		buildCanvas();
		$('.unit').mouseover(function() {
			drawer[method].call(this);
		});
	};

	var getMethod = function() {
		return $('#draw-method').val();
	};

	var resizePanel = function() {
		var height = panel.css('height');
		panel.css('width', height);
	};

	var rebuildToolBox = function(method) {
		switch(method) {
			case "BluredTail":
			case "Standart": {
				$('form[name="standart"]').css('display', 'block');
				break;
			}
			case "RandomColors": {
				$('form[name="standart"]').css('display', 'none');
				break;
			}
		}
	};

	var buildCanvas = function() {
		var size = convertPixels(panel.css('width'));
		var resolution = $('#resolution').val();
		var unitSize = size / resolution;
		var prototype = getUnitPrototype(unitSize);
		panel.empty();
		for(var i = 0; i < resolution * resolution; i++) {
			panel.append(prototype.cloneNode());
		}
	};

	var getUnitPrototype = function(size) {
		var unit = document.createElement('div');
		unit.className = "unit";
		unit.style.width = size + "px";
		unit.style.height = size + "px";
		unit.style.backgroundColor = "#eee";
		unit.style.float = "left";
		return unit;
	};

	var convertPixels = function(string) {
		return string.slice(0, string.length - 2);
	};
}

function Drawer() {
	this.Standart = function() {
		$(this).css('backgroundColor', getColor(false));
	};

	this.RandomColors = function() {
		$(this).css('backgroundColor', getColor(true));
	};

	this.BluredTail = function() {
		$(this).css('backgroundColor', getColor(false));
		$(this).animate({backgroundColor: "#EEE"}, 500);
	};

	var getColor = function(random) {
		if(!random) {
			return $('#draw-color').val();
		} else {
			var r = Math.floor(Math.random() * 256);
			var g = Math.floor(Math.random() * 256);
			var b = Math.floor(Math.random() * 256);
			return "rgb(" + r + "," + g + "," + b + ")";
		}
	};
}
