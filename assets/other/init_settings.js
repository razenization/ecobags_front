let _page_settings = {
	 'b-form__yourform'  : 'Ваша форма'
	,'b-form__languages'  : 'Языки'
	,'langs' : { 
			 "ru" : "Русский"
			,"en" : "Английский"
			,"uk" : "Украинский"
			,"de" : "Немецкий"
			}
	,'regexps' : {
			'name'   : '^[А-ЯЁа-яё \\-]{3,100}$'
			,'brand'  : '^[A-Za-z \\-\\$&\']{2,100}$'
			,'price'  : '^[1-9]\\d{0,4}(\\.\\d{2})?$'
			,'description' : '^[\\d\\D]{10,100}$'
  			}
 	};

settings.init(_page_settings);