Meteor.startup(function() {
	// this is the main page that loads at '/'
	// for now, it is a simple headerfooter layout with grids in the content and footer

	var mainContext = Engine.createContext();

	var layout;

	createLayout();
	addHeader();
	addContent();
	addFooter();

	function createLayout() {
		layout = new HeaderFooterLayout({
			headerSize: 120,
			footerSize: 120
		});

		mainContext.add(layout);
	}

	function addHeader() {
		layout.header.add(new Surface({
			content: "Header",
			classes: ["grey-bg"],
			properties: {
				lineHeight: "110px",
				textAlign: "center",
				color: "white"
			}
		}));
	}

	function addContent() {
		layout.content.add(createGrid( 'content', [2, 1] ));
	}

	function addFooter() {
		layout.footer.add(createGrid( 'footer', [3, 1] ));
	}

	function createGrid( section, dimensions ) {
		var grid = new GridLayout({
			dimensions: dimensions
		});

		var surfaces = [];
		grid.sequenceFrom(surfaces);

		for(var i = 0; i < dimensions[0]; i++) {
			surfaces.push(new Surface({

				// try rendering with a template using raix's library
				template: Template.practice,
				// content: section + ' ' + (i + 1),

				size: [undefined, undefined],
				properties: {
					backgroundColor: "hsl(" + (i * 360 / 8) + ", 100%, 50%)",
					color: "#404040",
					textAlign: 'center',
					verticalAlign: 'middle'
				}
			}));
		}

		return grid;
	}

});