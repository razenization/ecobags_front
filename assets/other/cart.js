class cart extends Component {
	constructor(sSelector, sMinicartSelector){
		super(sSelector
			, {					
			'init' : () => {		// callback for additional init
					console.log('INIT WAS LAUNCHED');
					
					this.minicart = $(sMinicartSelector);
					}
				}
			);
		this.goods = {/* prodId : prodQty */};
		}
		
	put(calcObj, customQty=0) { 
		// In this fragment of code I was re-implementing an old cart script that used to work by getting 
		// info from products that are located on the page itself. This time I am going to get info directly
		// from calculator object that stores all the info about products that the user is ought to add to cart.
		// let
		// 	productColor	= jqGood.find('.products__item-color').text(),					// доступиться и считать данные товара
		// 	productSize		= jqGood.find('.products__item-size').text(),
		// 	productType		= jqGood.find('.products__item-type').text().split("(")[0].replace(/\s/g, ""),
		// 	productPrint	= jqGood.find('.products__item-print').text();
		// 	productQuantity	= jqGood.find('.products__item-').text();
		
		// So, basically calculator object contains all the necessary info I will need, hence there is no need to
		// reinitialize variables.

		let price = calculator.solve();

		if (price !== null) {
			let uniqueId = `${calcObj.bagType}_${calcObj.color}_${calcObj.size}_${calcObj.paint}`;

			let inCartProduct = this.cartGoods.find('.product__id-' + uniqueId);

			if (!inCartProduct.length) {
				// If product isn't already in cart - add it.
				// Cloning invisible template product
				let productToAdd = this.cartGoods.find('.products__item:first')
					.clone(true/*подтверждение клонирования событий*/)
					.appendTo(this.cartGoods);
				
				this.goods[uniqueId] = (customQty > 0) ? customQty : calcObj.quantity;
				
				// Correcting some info to look as it should for our customer.
				console.log('added');
				var bagType, print, color;

				if (calcObj.bagType === "box") {
					bagType = "Бокс"
				} else if (calcObj.bagType === "thin") {
					bagType = "Плоская"
				} else if (calcObj.bagType === "bottom") {
					bagType = "С донной складкой"
				} else if (calcObj.bagType === "bag") {
					bagType = "Сумка-майка"
				} else if (calcObj.bagType === "sack") {
					bagType = "Мешочек для обуви"
				}

				if (calcObj.paint === "1") {
					print = "1+0"
				} else if (calcObj.paint === "2") {
					print = "1+1"
				} else if (calcObj.paint === "3") {
					print = "2+0"
				} else if (calcObj.paint === "4") {
					print = "2+2"
				} else if (calcObj.paint === "with") {
					print = "Со шнурком"
				} else if (calcObj.paint === "wout") {
					print = "Без шнурка"
				} else {
					print = calcObj.paint + " г/м2"
				}

				if (calcObj.color === "white") {
					color = "Белый"
				} else if (calcObj.color === "black") {
					color = "Черный"
				} else if (calcObj.color === "green") {
					color = "Зеленый"
				} else if (calcObj.color === "gray") {
					color = "Серый"
				} else if (calcObj.color === "purple") {
					color = "Фиолетовый"
				} else if (calcObj.color === "violet") {
					color = "Сиреневый"
				} else if (calcObj.color === "pink") {
					color = "Розовый"
				} else if (calcObj.color === "brown") {
					color = "Коричневый"
				} else if (calcObj.color === "red") {
					color = "Красный"
				} else if (calcObj.color === "blue") {
					color = "Синий"
				}

				// Putting product info inside our new product

				productToAdd.addClass(`product__id-${uniqueId}`);
				productToAdd.find('.products__item-type').html(bagType);
				productToAdd.find('.products__item-size').text(calcObj.size);
				productToAdd.find('.products__item-color').text(' (' + color + ')');
				productToAdd.find('.products__item-print').text(print);
				productToAdd.find('.products__item-quantity').text((customQty > 0) ? customQty : calcObj.quantity);
				productToAdd.find('.products__item-price').text(price);
				let fullprice = $('.products__fullprice');
				fullprice.text((parseFloat(fullprice.text()) + parseFloat(price)).toFixed(2));
			}
			else {
				this.goods[uniqueId] += calcObj.quantity;
				let fullprice = $('.products__fullprice');
				let productQuantity = calcObj.quantity;
				let quantityField = inCartProduct.find('.products__item-quantity');
				quantityField.text(parseInt(quantityField.text()) + calcObj.quantity);
				fullprice.text((parseFloat(fullprice.text()) + parseFloat(price)).toFixed(2));
				let currentProductPrice = inCartProduct.find('.products__item-price');
				currentProductPrice.text((parseFloat(currentProductPrice.text()) + parseFloat(price)).toFixed(2));
			}
			Cookies.set('products_info', this.goods, { 'expires': 14, 'path': '' });
			let cookie = Cookies.get('products_info');
			console.log(cookie);
		}
	}

	add(event){ 
		event.preventDefault();															// предотвратить реакцию на событие по умолчанию
		this.put(calculator);
	}

	remove(event){ 
		event.preventDefault();															// предотвратить реакцию на событие по умолчанию
		let cartProduct 		= $(event.currentTarget).closest('.products__item');
		delete this.goods[cartProduct.attr('class').split(" ")[1].split("-")[1]]
		Cookies.set('products_info', this.goods, { 'expires': 14, 'path': '' });

		cartProduct.remove();
		let fullprice = $('.products__fullprice');
		fullprice.text((parseFloat(fullprice.text()) - parseFloat(cartProduct.find('.products__item-price').text())).toFixed(2));
	}
		
	load() {
		let cookie = Cookies.getJSON('products_info');
		console.log(cookie);
		this.goods = Cookies.getJSON('products_info') || {};
		console.log(this.goods);
		$.each(this.goods, (productUniqueId, productQty) => {
			console.log(this);
			let newFields 			= productUniqueId.split("_");
			calculator.bagType 		= newFields[0];
			calculator.color 		= newFields[1];
			calculator.size 		= newFields[2];
			calculator.paint 		= newFields[3];

			this.put(calculator, productQty);
			
		});
	}

	createElements(){
		// this.html_ui_element1  	= this.find('.SOME_CSS_CLASSNAME');
		this.orderButton  	= this.find('#add-product');
		this.cartGoods 		= this.minicart.find('.products');
		this.removeButton	= this.minicart.find('.products__remove-item');
	}
	
	
	createEvents(){
		// this.elem.find('.some_html_element_class').click(this.SAMPLE_METHOD.bind(this));
		this.orderButton.click(this.add.bind(this));
		this.removeButton.click(this.remove.bind(this));
		
		this.load();
	}
}
