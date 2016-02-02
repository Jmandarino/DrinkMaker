/* 
 * Name : accordion.js
 * Usage: Turn a set of nested elements into an accordion by passing in the id of a wrapper element. The html document must be structured in the following way, using unique HTML tags for each section, header and content:
 * 	  Container element
 * 	  Sub-container element for each item in the according - recommended tag: section 
	  Header element for each title in the accordion - recommended tag: h1
	  Content element for each item in the accordion - recommended tag: p
	  Close Sub-container
	  Repeat sub-containers as often as required
	  Close Container
	  Eg. <div id="my_accordion"><section><h1>First item</h1><p>First item content</p></section><section><h1>Second item</h1><p>Second item content</p></section></div>
*/

var accordion = accordion || {
	element: '',
	init: function(el){
		accordion.element = el;

		groupElement = document.getElementById(el).childNodes[1].nodeName.toLowerCase();
		headerElement = document.getElementById(el).childNodes[1].childNodes[1].nodeName.toLowerCase();
		contentElement = document.getElementById(el).childNodes[1].childNodes[3].nodeName.toLowerCase();
		

		$("#" + el + " " + groupElement).first().find(contentElement).css("display","block");
		accordion.addListener();
	},
	clicked: function(obj){
		if ($(obj).find("img").hasClass("open")){

		} else { 
			$("#" + accordion.element + " " + groupElement + " " + headerElement + " img").removeClass("open");
			$("#" + accordion.element + " " + groupElement + " " + headerElement + " img").addClass("closed");
				
			$("#" + accordion.element + " " + groupElement + " " + contentElement).slideUp();
			$(obj).parent().find(contentElement).slideDown();
			$(obj).parent().find(headerElement + " img").addClass('open');
			$(obj).parent().find(headerElement + " img").removeClass('closed');
		}
	},
	addListener: function(){
		$("#" + accordion.element + " " + groupElement + " " + headerElement).click(function(){
			accordion.clicked(this);
		});
	}
}

$( document ).ready(function(){

	/*  Initialise the acordion - 
         *  assumes will follow a document structure of element, section, h1 and with image
	 *  so we can pass it the top element - for reusability
	 */
	accordion.init("accordion");

});
