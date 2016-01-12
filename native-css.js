'use strict';
var src = {};
var fs = require('fs');

src.readFile = function(path) {
return fs.readFileSync(path, 'utf8');
}

src.writeFile = function(path, body) {
return fs.writeFileSync(path, body); 
}

src.appendFile = function(path, body) {
return fs.appendFileSync(path, body); 
}

src.verify = function(args) {
if (typeof args === 'object') {
    if (args.indexOf(input) == -1)
        return false;

    return true;
} else {
    if (args != input)
        return false;
        
    return true;
}
};


var cssParser = require('css');

var nativeCSS = function() {
};

nativeCSS.prototype.indentObject = function(obj, indent) {
	var self = this, result = '';
	return JSON.stringify(obj, null, indent || 0);
}

nativeCSS.prototype.nameGenerator = function(name) {
	name = name.replace(/\s\s+/g, ' ');
	//name = name.replace(/^\./g, '');
	// name = name.replace(/[^a-zA-Z0-9]/g, '_');
	// name = name.replace(/^_+/g, '');
	// name = name.replace(/_+$/g, '');
	return name;
}

nativeCSS.prototype.mediaNameGenerator = function(name) {
	return '@media ' + name;
}

function transformRules(self, rules, result) {
	rules
			.forEach(function(rule) {
				var obj = {};
				if (rule.type === 'media') {
					var name = self.mediaNameGenerator(rule.media);
					var media = result[name] = result[name] || {
						"__expression__" : rule.media
					};
					transformRules(self, rule.rules, media)
				} else if (rule.type === 'rule') {
					rule.declarations
							.forEach(function(declaration) {

								if (declaration.type === 'declaration') {
									var k = declaration.property.replace(
											/(-[a-z])/g, function(m1) {
												return m1.substring(1)
														.toUpperCase()
											});
									if (/^\*/.test(k)) {
										// css hacker
									} else {
										var viewStyle = [ 'backfaceVisibility',//
										'backgroundColor',//
										'borderColor',//
										'borderTopColor',//
										'borderRightColor',//
										'borderBottomColor',//
										'borderLeftColor',//
										'borderRadius',//
										'borderTopLeftRadius',//
										'borderTopRightRadius',//
										'borderBottomLeftRadius',//
										'borderBottomRightRadius',//
										'borderStyle',//
										'borderWidth',//
										'borderTopWidth',//
										'borderRightWidth',//
										'borderBottomWidth',//
										'borderLeftWidth',//
										'opacity',//
										'overflow',//
										'shadowColor',//
										'shadowOffset',//
										'shadowOpacity',//
										'shadowRadius',//
										'elevation',//
										];
										var imageStyle = [ 'resizeMode',//
										'backfaceVisibility',//
										'backgroundColor',//
										'borderColor',//
										'borderWidth',//
										'borderRadius',//
										'overflow',//
										'tintColor',//
										'opacity',//
										];
										var textStyle = [ 'color',//
										'fontFamily',//
										'fontSize',//
										'fontStyle',//
										'fontWeight',//
										'letterSpacing',//
										'lineHeight',//
										'textAlign',//
										'textDecorationLine',//
										'textDecorationStyle',//
										'textDecorationColor',//
										'writingDirection',//
										];
										var flexboxStyle = [ 'alignItems',//
										'alignSelf',//
										'borderBottomWidth',//
										'borderLeftWidth',//
										'borderRightWidth',//
										'borderTopWidth',//
										'borderWidth',//
										'bottom',//
										'flex',//
										'flexDirection',//
										'flexWrap',//
										'height',//
										'justifyContent',//
										'left',//
										'margin',//
										'marginBottom',//
										'marginHorizontal',//
										'marginLeft',//
										'marginRight',//
										'marginTop',//
										'marginVertical',//
										'maxHeight',//
										'maxWidth',//
										'minHeight',//
										'minWidth',//
										'padding',//
										'paddingBottom',//
										'paddingHorizontal',//
										'paddingLeft',//
										'paddingRight',//
										'paddingTop',//
										'paddingVertical',//
										'position',//
										'right',//
										'top',//
										'width',//
										];
										var transformStyle = [ //'transform',//
										//'transformMatrix',// 
										];
//
										declaration.value = declaration.value.replace(/\s*!important/g, '');
										//
										
										
										if (k == "background") {
											obj['backgroundColor'] = self.reverseCssValue(declaration.value);
										} else if (self.isShortCut(k,
												declaration.value)) {
											var re = self.reverseShortCut(k,
													declaration.value);
											for ( var p in re) {
												if (viewStyle.indexOf(p) > -1
														|| //
														imageStyle.indexOf(p) > -1
														|| textStyle.indexOf(p) > -1//
														|| flexboxStyle
																.indexOf(p) > -1
														|| transformStyle
																.indexOf(p) > -1) {
													obj[p] = self.reverseCssValue(re[p]);
												}
											}
										} else if (viewStyle.indexOf(k) > -1
												|| //
												imageStyle.indexOf(k) > -1
												|| textStyle.indexOf(k) > -1//
												|| flexboxStyle.indexOf(k) > -1
												|| transformStyle.indexOf(k) > -1) {
											obj[k] = self.reverseCssValue(declaration.value);
										}
									}
								}
							});
					rule.selectors.forEach(function(selector) {
						var name = self.nameGenerator(selector.trim());
						result[name] = obj;
					});
				}
			});
}

nativeCSS.prototype.isShortCut = function(k, v) {
	if (/^border(Top|Left|Bottom|Right|)$/.test(k)) {
		var a = v.split(/\s+/);
		return true;
	} else if (/^(margin|padding)$/.test(k)) {
		var a = v.split(/\s+/);
		if (a.length > 1) {
			return true;
		}
	} else if (/^(borderRadius)$/.test(k)) {
		var a = v.split(/\s+/);
		if (a.length > 1) {
			return true;
		}
	}
	return false;
}
nativeCSS.prototype.reverseShortCut = function(k, v) {
	var re = {};

	if (/^border(Top|Left|Bottom|Right|)$/.test(k)) {
		
		var a = v.split(/\s+/);
		
		if (a.length == 3) {
			var k1 = k.match(/^border(Top|Left|Bottom|Right|)$/)[0];
			re[k1 + 'Width'] = a[0];
			re[k1 + 'Style'] = a[1];
			re[k1 + 'Color'] = a[2];
		}else if(a.length == 1){
			var k1 = k.match(/^border(Top|Left|Bottom|Right|)$/)[0];
			re[k1 + 'Width'] = a[0] == 'none' ? 0 : a[0];
		}
	} else if (/^(margin|padding)$/.test(k)) {
		var a = v.split(/\s+/);
		var k1 = k.match(/^(margin|padding)$/)[0];
		if (a.length == 4) {
			re[k1 + 'Top'] = a[0];
			re[k1 + 'Right'] = a[1];
			re[k1 + 'Bottom'] = a[2];
			re[k1 + 'Left'] = a[3];
		} else if (a.length == 3) {
			re[k1 + 'Top'] = a[0];
			re[k1 + 'Right'] = a[1];
			re[k1 + 'Left'] = a[1];
			re[k1 + 'Bottom'] = a[2];
		} else if (a.length == 2) {
			re[k1 + 'Top'] = a[0];
			re[k1 + 'Bottom'] = a[0];
			re[k1 + 'Right'] = a[1];
			re[k1 + 'Left'] = a[1];
		}
	} else if (/^(borderRadius)$/.test(k)) {
		var a = v.split(/\s+/);
		var k1 = 'border', k11 = 'Radius';
		if (a.length == 4) {
			re[k1 + 'TopLeft' + k11] = a[0];
			re[k1 + 'TopRight' + k11] = a[1];
			re[k1 + 'BottomRight' + k11] = a[2];
			re[k1 + 'BottomLeft' + k11] = a[3];
		} else if (a.length == 3) {
			re[k1 + 'TopLeft' + k11] = a[0];
			re[k1 + 'TopRight' + k11] = a[1];
			re[k1 + 'BottomLeft' + k11] = a[1];
			re[k1 + 'BottomRight'] = a[2];
		} else if (a.length == 2) {
			re[k1 + 'TopLeft' + k11] = a[0];
			re[k1 + 'TopRight' + k11] = a[0];
			re[k1 + 'Right' + k11] = a[1];
			re[k1 + 'BottomLeft' + k11] = a[1];
		}
	}
	return re;
}
nativeCSS.prototype.reverseCssValue = function(v){
	//
	if(/^#([0-9a-fA-F]{3})$/.test(v)){
		
		var t = v.match(/^#([0-9a-fA-F]{3})$/)[1];
		v = '#' + t +t;
	}
	return v;
	//
}
nativeCSS.prototype.transform = function(css) {
	var result = {};
	transformRules(this, css.stylesheet.rules, result);
	return result;
}

nativeCSS.prototype.convert = function(cssFile) {
	var path = process.cwd() + '/' + cssFile;

	if (!(require('fs').existsSync(path)))
		return 'Ooops!\nError: CSS file not found!';

	var self = this, css = src.readFile(path);
	css = cssParser.parse(css, {
		silent : false,
		source : path
	});

	return self.transform(css);
}

nativeCSS.prototype.generateFile = function(obj, where, react) {
	if (!where || where.indexOf('--') > -1)
		return console.log('Please, set a output path!');

	var self = this, body;

	where = process.cwd() + '/' + where;

	if (react) {
		src.writeFile(where, 'var styles = StyleSheet.create(\n');
		body = self.indentObject(obj, 2);
		src.appendFile(where, body + '\n);');
		return;
	}

	src.writeFile(where, 'var styles = ');
	body = self.indentObject(obj, 2);
	src.appendFile(where, body + '\nmodule.exports = styles;');
}

module.exports = new nativeCSS();
