/* let myObject = { };
myObject.myProperty = 1;
myObject.myFunction =  ()=>{ } */



let settings = { };
settings.data = null;
settings.init =  (oSettingsData/*данные настроек*/)=>{
	//3
	settings.data = oSettingsData
	}
settings.get =  (sSettingName/*SG2*/)=>{
	return /*SG4*/ settings.data[sSettingName];
}