class Component {
	constructor(sSelector, oOptions){
		console.log('Component constructor arguments:\n', arguments);
		oOptions = oOptions || {};		// зададим значение по умолчанию, если этот объект не существует
		
		$(document).ready(				// когда документ будет готов (загружен) - запустить
			()=>{	
			this.elem = $(sSelector);	// 1. создаем главный HTML-элемент для скрипта (замена для this.menu, this.form, this.gallery, ...)
			
			if (typeof oOptions.init == 'function'){
				oOptions.init();			// дополнительная инициализация 
				}
			/*
			Cannot read property 'init' of undefined 
			*/
			this.createElements();		// 2. создаем остальные элементы
			this.createEvents();		// 3. создаем события

			});		
		}
		
	find(sSelector){ 
		return this.elem.find(sSelector);
	}
		
	additionalInit(){}
	}