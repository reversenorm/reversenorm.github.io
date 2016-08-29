

        var BehanceProjects = null;
        var galleryData=null;

        function jsonLoader(filePath, nextStep){
			   		 $.ajax({
				        'global': false,
				        'url':  filePath,
				        'dataType': "json",
				        'success': function (data) {
				        	if (nextStep=="projects"){
				            BehanceProjects = data;
				        	}
				        	if (nextStep=="gallery"){
				        		galleryData=data;
				        	}

				        },
					complete: function() {
						if (nextStep=="projects"){
							loadThumbs();
						}
						if (nextStep=="gallery"){
							console.log(galleryData);
							galleryBuilder();

						}
					}
 			 });

		};//end json loader


		function openGallery(galleryId){
			toggleLayer('overlay');//turn on overlay
			toggleLayer('behanceGallery');//then turn on the specific gallery
			jsonLoader("http://www.behance.net/v2/projects/"+galleryId+"?api_key=bM1DZSpebEhtZlRUq9QKuUmF3PpdW595&callback=?", "gallery");//load the current gallery into galleryData on complete go to gallery builder
		};

		function galleryBuilder(galleryId){


			var htmlString="<div class='closeX'><a href='#c' onclick="+'toggleOffAllGalleries();'+"align='right'>[X]</a></div><div class='galleryDescription'>"//add in the gallery description section

			htmlString=htmlString.concat("<h1>"+galleryData["project"]["name"]+"</h1><br/>");//add gallery title

			if(galleryData["project"]["modules"][0]["type"]=="text"){
				htmlString=htmlString.concat(galleryData["project"]["modules"][0]["text"]+"<br/>");//add in description text from first module item if item is text.
			}

			htmlString=htmlString.concat("<a href='"+galleryData["project"]["url"]+"' target='_blank'>View on Behance.net</a>");//add in link to view on behance

			htmlString=htmlString.concat("</div><div class='viewWindow'><ul>");//close gallery description div and open viewWindow div. Also open UL for each image w/ description



			for(var i=0; i<galleryData["project"]["modules"].length; i++){ //for each module item
				if(galleryData["project"]["modules"][i]["type"]=="image"){//if it's an image

				htmlString = htmlString.concat("<li><img src='"+galleryData["project"]["modules"][i]["sizes"]["disp"]+"' align='center'>");

					if(galleryData["project"]["modules"][i]["caption_plain"]){//if there is a caption

						htmlString = htmlString.concat("<br/>"+galleryData["project"]["modules"][i]["caption_plain"]+"</li>"); //then add caption to html inside list element

					}else{
						htmlString = htmlString.concat("</li>");//if no caption just close after the image
					}

				}else if(galleryData["project"]["modules"][i]["type"]=="video"){//if the file is a video instead

					htmlString = htmlString.concat("<li>"+galleryData["project"]["modules"][i]["embed"]);
					//add video embed link
					if(galleryData["project"]["modules"][i]["caption_plain"]){//if there is a caption

						htmlString = htmlString.concat("<br />"+galleryData["project"]["modules"][i]["caption_plain"]+"</li>"); //then add caption to html inside list element

					}else{
						htmlString = htmlString.concat("</li>");//if no caption just close after the image
					}
				}

			};
				htmlString = htmlString.concat("</ul><br/></div>");
				//close list and close viewWindow div
			document.getElementById("behanceGallery").innerHTML=htmlString;

		};

		function loadThumbs(){
				var thumblist="<ul>";
				for (var i=0; i<BehanceProjects["projects"].length; i++ ){
					thumblist=thumblist.concat("<li><a href='#b' onclick='openGallery("+BehanceProjects["projects"][i]["id"]+");'><img class='glowEdges' src='"+BehanceProjects["projects"][i]["covers"][202]+"'><br/>"+BehanceProjects["projects"][i]["name"]+"</a></li>");//create a list element with each project's cover image and title. link the whole thing with and on click pass to generate and reveal the content of the project.
				};

				thumblist=thumblist.concat("</ul>");

				document.getElementById("Design").innerHTML=thumblist;
				
		};
		
  window.onload=jsonLoader("http://behance.net/v2/users/jphillips01/projects?api_key=bM1DZSpebEhtZlRUq9QKuUmF3PpdW595&per_page=25&callback=?", 'projects'); 

   
