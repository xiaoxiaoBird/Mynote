SuperMap.OSP = SuperMap.OSP || {};
SuperMap.OSP.Core = SuperMap.OSP.Core || {};
SuperMap.OSP.Service = SuperMap.OSP.Service || {};
SuperMap.OSP.SystemMaintenanceService = SuperMap.OSP.SystemMaintenanceService || {};
SuperMap.OSP.Service.Utility = SuperMap.OSP.Service.Utility || {};
SuperMap.OSP.UI = SuperMap.OSP.UI || {};
SuperMap.OSP.ExtentionService = SuperMap.OSP.ExtentionService || {};
SuperMap.OSP.Utility = SuperMap.OSP.Utility || {};
SuperMap.OSP.Core.HashMap = SuperMap.Class({
		initialize : function () {
			this.size = 0;
			this.entry = new Object()
		},
		put : function (a, b) {
			if (!this.containsKey(a)) {
				this.size++
			}
			this.entry[a] = b
		},
		get : function (a) {
			return this.containsKey(a) ? this.entry[a] : null
		},
		remove : function (a) {
			if (this.containsKey(a) && (delete this.entry[a])) {
				this.size--
			}
		},
		containsKey : function (a) {
			return (a in this.entry)
		},
		containsValue : function (a) {
			for (var b in this.entry) {
				if (this.entry[b] == a) {
					return true
				}
			}
			return false
		},
		size : function () {
			return this.size
		},
		clear : function () {
			this.size = 0;
			this.entry = {}

		},
		values : function () {
			var a = new Array();
			for (var b in this.entry) {
				a.push(this.entry[b])
			}
			return a
		},
		CLASS_NAME : "SuperMap.OSP.Core.HashMap"
	});
SuperMap.OSP.Core.ScheduleType = SuperMap.Class({
		initialize : function () {},
		CLASS_NAME : "SuperMap.OSP.Core.ScheduleType"
	});
SuperMap.OSP.Core.ScheduleType.DELAY = 1;
SuperMap.OSP.Core.ScheduleType.REPEAT = 2;
SuperMap.OSP.Core.ScheduleType.ACCELERATE = 3;
SuperMap.OSP.Core.ScheduleType.DECCELERATE = 4;
SuperMap.OSP.Core.TimerRule = function (a, b, c) {
	this.scheduleType = 0;
	this.delayTime = 0;
	this.executionTime = 0;
	if (typeof(a) == "number") {
		this.scheduleType = a
	} else {}

	if (typeof(b) == "number") {
		this.delayTime = b
	} else {}

	if (typeof(c) == "number") {
		this.executionTime = c
	}
};
SuperMap.OSP.Core.Timer = SuperMap.Class({
		initialize : function () {},
		method : function () {},
		timerRule : new SuperMap.OSP.Core.TimerRule(),
		run : function (c, b) {
			this.method = c;
			this.timerRule = b;
			if (!this.time) {
				this.time = new Date().getTime();
				this.executionTime = this.timerRule.executionTime;
				this.delayTime = this.timerRule.delayTime
			}
			var a = this;
			switch (this.timerRule.scheduleType) {
			case 1:
				this.timer = setTimeout(a.method, a.delayTime);
				break;
			case 2:
				this._timer = setInterval(function () {
						var d = new Date().getTime();
						if (d < a.time + a.executionTime) {
							a._method()
						} else {
							a.stop()
						}
					}, a.delayTime);
				break;
			case 3:
				this.timer = setTimeout(function () {
						var d = new Date().getTime();
						a.delayTime = a.accelerateFun(a.delayTime);
						if (d < a.time + a.executionTime) {
							a.method();
							a.run(a.method, a.timerRule)
						} else {
							a.stop()
						}
					}, a.delayTime);
				break;
			case 4:
				this.timer = setTimeout(function () {
						var d = new Date().getTime();
						a.delayTime = a.daccelerateFun(a.delayTime);
						if (d < a.time + a.executionTime) {
							a.method();
							a.run(a.method, a.timerRule)
						} else {
							a.stop()
						}
					}, a.delayTime);
				break
			}
		},
		stop : function () {
			clearInterval(this.timer);
			clearTimeout(this.timer);
			this.time = null
		},
		pause : function () {
			var a = new Date().getTime();
			this.alreadyTime = a - this.time;
			this.executionTime = this.executionTime - this.alreadyTime;
			this.stop()
		},
		resume : function () {
			this.time = new Date().getTime();
			this.run(this.method, this.timerRule)
		},
		_accelerateFun : function (a) {
			return Math.sqrt(a) / 2
		},
		_daccelerateFun : function (a) {
			return a * 2
		},
		CLASS_NAME : "SuperMap.OSP.Core.Timer"
	});
SuperMap.OSP.Core.ErrorType = SuperMap.Class({
		initialize : function () {},
		CLASS_NAME : "SuperMap.OSP.Core.ErrorType"
	});
SuperMap.OSP.Core.ErrorType.PARAM = 0;
SuperMap.OSP.Core.ErrorType.BUSINESS = 1;
SuperMap.OSP.Core.ErrorType.CONDITION = 2;
SuperMap.OSP.Core.ErrorType.SYSTEM = 3;
SuperMap.OSP.Core.ErrorType.ENVIRONMENT = 4;
SuperMap.OSP.Core.Utility = SuperMap.Class({
		initialize : function () {},
		CLASS_NAME : "SuperMap.OSP.Core.Utility"
	});
SuperMap.OSP.Core.Utility._Citys = [];
SuperMap.OSP.Core.Utility._Provinces = [];
SuperMap.OSP.Core.Utility._extend = function (d, e) {
	if (typeof(d) == "function" && typeof(e) == "function") {
		var b = function () {};
		b.prototype = d.prototype;
		e.prototype = new b();
		e.prototype.constructor = e;
		e.uber = d.prototype
	} else {
		e = e || {};
		for (var a in d) {
			if (typeof(e[a]) == "undefined") {
				e[a] = d[a]
			}
			if (typeof d[a] === "object" && d[a] != null) {
				this._extend(d[a], e[a])
			}
		}
	}
	return e
};
SuperMap.OSP.Core.Utility._alert = function (a) {
	alert(a)
};
SuperMap.OSP.Core.Utility._isEmpty = function (b) {
	var a = true;
	if (b != null && b !== "") {
		a = false
	}
	return a
};
SuperMap.OSP.Core.Utility.getCityCodeByCityName = function (a) {
	var c = null;
	for (var b = 0; b < this._Citys.length; b++) {
		if (a == this._Citys[b][0]) {
			c = this._Citys[b][1];
			break
		}
	}
	return c
};
SuperMap.OSP.Core.Utility.getProvinceCodeByCityCode = function (a) {
	return a.substring(0, 2) + "0000"
};
SuperMap.OSP.Core.Utility.getDistrictLevelByDistrictCode = function (a) {
	var b;
	if (a.substring(2, 6) == "0000") {
		b = 1
	} else {
		if (a.substring(2, 4) == "01") {
			b = 2
		} else {
			b = 3
		}
	}
	return b
};
SuperMap.OSP.Core.Utility.getDatesetNameByCityCode = function (c) {
	var d = null;
	if (c == "110000") {
		d = "PbeijingP"
	} else {
		if (c == "120000") {
			d = "PtianjinP"
		} else {
			if (c == "310000") {
				d = "PshanghaiP"
			} else {
				if (c == "500000") {
					d = "PchongqingP"
				} else {
					var b = this.getProvinceCodeByCityCode(c);
					for (var a = 0; a < this._Provinces.length; a++) {
						if (b == this._Provinces[a][1]) {
							d = this._Provinces[a][7];
							break
						}
					}
				}
			}
		}
	}
	return d
};
SuperMap.OSP.Core.Utility.getDatesetNameByCityName = function (b) {
	var d = null;
	
	return d
};
SuperMap.OSP.Core.Utility.distPtToLine = function (l, m) {
	if (l == null) {
		return false
	}
	var h = l.length;
	var n = new Array();
	var c = new Array();
	var g = 0,
	d = 0;
	var e,
	b;
	var o;
	var a;
	var f;
	n[0] = (l[0].lon - m.lon) * (l[0].lon - m.lon) + (l[0].lat - m.lat) * (l[0].lat - m.lat);
	o = Math.sqrt(n[0]);
	g = 0;
	while (++g < h) {
		if (Math.abs(l[g].lon - m.lon) < o && Math.abs(l[g].lon - m.lon) < o) {
			n[1] = (l[g].lon - m.lon) * (l[g].lon - m.lon) + (l[g].lat - m.lat) * (l[g].lat - m.lat);
			if (n[1] == 0) {
				return 0
			}
			if (n[1] < n[0]) {
				n[0] = n[1]
			}
		}
	}
	d = 0;
	c[0] = n[0];
	while (d < h - 1) {
		if (l[d] == l[d + 1]) {
			d++;
			continue
		}
		if (SuperMap.OSP.Core.Utility._isProjectToLineset(m, l[d], l[d + 1])) {
			e = l[d].lat - l[d + 1].lat;
			b = l[d + 1].lon - l[d].lon;
			a =  - (e * l[d].lon + b * l[d].lat);
			c[1] = (e * m.lon) + (b * m.lat) + a;
			c[1] = c[1] * c[1];
			c[1] = c[1] / ((e * e) + (b * b));
			if (c[1] < c[0]) {
				c[0] = c[1]
			}
		}
		d++
	}
	f = Math.sqrt(c[0]);
	return f
};
SuperMap.OSP.Core.Utility._isProjectToLineset = function (e, b, f) {
	if (b.lat == f.lon && b.lat == f.lat) {
		return true
	}
	var a = (e.lon - b.lon) * (e.lon - b.lon) + (e.lat - b.lat) * (e.lat - b.lat);
	var c = (e.lon - f.lon) * (e.lon - f.lon) + (e.lat - f.lat) * (e.lat - f.lat);
	var d = (f.lon - b.lon) * (f.lon - b.lon) + (f.lat - b.lat) * (f.lat - b.lat);
	if (c + d < a || a + d < c) {
		return false
	} else {
		return true
	}
};
SuperMap.OSP.Core.Utility._geometryToServer6RGeometry = function (g) {
	var e = SuperMap.REST.GeometryType.POINT;
	var f = new SuperMap.REST.ServerGeometry();
	if (g.componentTypes[0] == "SuperMap.Geometry.Point") {
		var a = new SuperMap.Geometry.Point(g.components[0].x, g.components[0].y);
		e = SuperMap.REST.GeometryType.POINT;
		f.id = 0;
		f.parts = [1];
		f.points = [a]
	} else {
		if (g.componentTypes[0] == "SuperMap.Geometry.LineString") {
			e = SuperMap.REST.GeometryType.LINE;
			f.id = 1;
			f.parts = [];
			f.points = [];
			for (var d = 0; d < g.components.length; d++) {
				f.parts[d] = 0;
				var c = g.components[d];
				f.parts[d] = c.components.length;
				for (var b = 0; b < c.components.length; b++) {
					f.points.push(c.components[b])
				}
			}
		} else {
			if (g.componentTypes[0] == "SuperMap.Geometry.Polygon") {
				e = SuperMap.REST.GeometryType.REGION;
				f.id = 3;
				f.parts = [];
				f.points = [];
				for (var d = 0; d < g.components.length; d++) {
					f.parts[d] = 0;
					var c = g.components[d];
					f.parts[d] = c.components.length;
					for (var b = 0; b < c.components.length; b++) {
						var a = c.components[b];
						f.parts[d] = a.components.length;
						for (k = 0; k < a.components.length; k++) {
							f.points.push(a.components[k])
						}
					}
				}
			}
		}
	}
	return f
};
SuperMap.OSP.Core.Utility.isPointInPolygon = function (b, a) {
	if (b == null || b.length == 0) {
		return false
	}
	var c = 0;
	var e;
	var d;
	var g = null;
	var f = null;
	g = b[0];
	for (e = 1; e <= b.length; e++) {
		f = b[e % b.length];
		if (a.lat > Math.min(g.lat, f.lat)) {
			if (a.lat <= Math.max(g.lat, f.lat)) {
				if (a.x <= Math.max(g.lon, f.lon)) {
					if (g.lat != f.lat) {
						d = (a.lat - g.lat) * (f.lon - g.lon) / (f.lat - g.lat) + g.lon;
						if ((g.lon == f.lon) || (a.lon < d) || (a.lon == d)) {
							c++
						}
					}
				}
			}
		}
		g = f
	}
	if (c % 2 == 0) {
		return false
	} else {
		return true
	}
};
SuperMap.OSP.Core.Utility.isAllPointsInPolygon = function (a, c) {
	if (a == null || a.length == 0) {
		return true
	}
	if (c == null || c.length == 0) {
		return true
	}
	var d = true;
	for (var b = 0; b < c.length; b++) {
		if (!this.isPointInPolygon(a, c[b])) {
			d = false;
			break
		}
	}
	return d
};
SuperMap.OSP.Core.Utility._viewBoundsToPoint2Ds = function (c) {
	var a = [];
	var d = new SuperMap.Geometry.Point(c.left, c.right);
	var b = new SuperMap.Geometry.Point(c.top, c.bottom);
	a.push(d);
	a.push(new SuperMap.Geometry.Point(c.left, c.bottom));
	a.push(b);
	a.push(new SuperMap.Geometry.Point(c.top, c.right));
	return a
};
SuperMap.OSP.Core.Utility._getOutRectBounds = function (b) {
	var a = new SuperMap.Geometry.LinearRing(b);
	var d = new SuperMap.Geometry.Polygon([a]);
	var c = d.getBounds();
	return c
};
SuperMap.OSP.Core.Utility._isFboundsBigEbounds = function (g, f) {
	var c = g.width;
	var b = g.height;
	var d = f.width;
	var a = f.height;
	var e = false;
	if (c >= d && b >= a) {
		e = true
	}
	return e
};
SuperMap.OSP.Core.Utility.adjustView = function (e, c) {
	var d = SuperMap.OSP.Core.Utility._viewBoundsToPoint2Ds(e.getExtent());
	var a = SuperMap.OSP.Core.Utility.isAllPointsInPolygon(d, c);
	if (!a) {
		var b = SuperMap.OSP.Core.Utility._getOutRectBounds(c);
		if (SuperMap.OSP.Core.Utility._isFboundsBigEbounds(e.getExtent(), b)) {
			e.panTo(b.getCenterLonLat())
		} else {
			e.zoom(0.5);
			SuperMap.OSP.Core.Utility.adjustView(e, c)
		}
	}
};
SuperMap.OSP.Core.Utility._addCopy = function (b) {
	var a = document.createElement("div");
	a.style.position = "absolute";
	a.style.bottom = "10px";
	a.style.right = "10px";
	a.style.zIndex = 99999;
	a.style.fontSize = "10px";
	b.appendChild(a)
};
SuperMap.OSP.Core.Utility.earthCircumferenceInMeters = 40075016.68557849;
SuperMap.OSP.Core.Utility.halfEarthCircumferenceInMeters = SuperMap.OSP.Core.Utility.earthCircumferenceInMeters / 2;
SuperMap.OSP.Core.Utility.earthRadiusInMeters = 6378137;
SuperMap.OSP.Core.Utility.MercatorLatitudeLimit = 85.051128;
SuperMap.OSP.Core.Utility.latLonToMeters = function (a) {
	if (a.CLASS_NAME == "SuperMap.Geometry.Point" || a.CLASS_NAME == "SuperMap.OSP.Core.Point2D" || a.x != null) {
		var c = a.x / 180 * SuperMap.OSP.Core.Utility.halfEarthCircumferenceInMeters;
		var b = Math.log(Math.tan((90 + a.y) * Math.PI / 360)) / (Math.PI / 180);
		b = b / 180 * SuperMap.OSP.Core.Utility.halfEarthCircumferenceInMeters;
		return new SuperMap.Geometry.Point(c, b)
	} else {
		var c = a.lon / 180 * SuperMap.OSP.Core.Utility.halfEarthCircumferenceInMeters;
		var b = Math.log(Math.tan((90 + a.lat) * Math.PI / 360)) / (Math.PI / 180);
		b = b / 180 * SuperMap.OSP.Core.Utility.halfEarthCircumferenceInMeters;
		return new SuperMap.LonLat(c, b)
	}
};
SuperMap.OSP.Core.Utility.metersToLatLon = function (a) {
	if (a.CLASS_NAME == "SuperMap.Geometry.Point" || a.CLASS_NAME == "SuperMap.OSP.Core.Point2D" || a.x != null) {
		var c = a.x / SuperMap.OSP.Core.Utility.halfEarthCircumferenceInMeters * 180;
		var b = a.y / SuperMap.OSP.Core.Utility.halfEarthCircumferenceInMeters * 180;
		b = 180 / Math.PI * (2 * Math.atan(Math.exp(b * Math.PI / 180)) - Math.PI / 2);
		return new SuperMap.Geometry.Point(c, b)
	} else {
		var c = a.lon / SuperMap.OSP.Core.Utility.halfEarthCircumferenceInMeters * 180;
		var b = a.lat / SuperMap.OSP.Core.Utility.halfEarthCircumferenceInMeters * 180;
		b = 180 / Math.PI * (2 * Math.atan(Math.exp(b * Math.PI / 180)) - Math.PI / 2);
		return new SuperMap.LonLat(c, b)
	}
};
SuperMap.OSP.Core.Utility.committer = function (j, e, a, c, h, b, d, g) {
	var f = SuperMap.Util.toJSON(c).replace(/\'/g, '"');
	f = f.replace(/%25/g, "%");
	f = f.replace(/%26gt;/g, ">");
	f = f.replace(/%26lt;"/g, "<'");
	f = f.replace(/" and/g, "' and");
	f = f.replace(/like "/g, "like '");
	f = f.replace(/="/g, "='");
	f = f.replace(/""/, "'\"");
	f = f.replace(/"","/, '\'","');
	f = f.replace(/":'/g, '":"');
	var i = new SuperMap.ServiceBase(j);
	i.request({
		url : j,
		params : {
			servicename : e,
			methodname : a,
			parameter : f,
			t : new Date().getTime()
		},
		method : "GET",
		success : b,
		failure : d
	})
};
SuperMap.Util.committer = function (c) {
	if (!c) {
		return
	}
	c.url = window.encodeURI(c.url);
	var b = c.url,
	a = b.substr(b.length - 1, 1);
	c.isInTheSameDomain = c.isInTheSameDomain || SuperMap.Util.isInTheSameDomain(c.url);
	if (c.isInTheSameDomain) {
		if (c.method === "GET" && c.params) {
			var h = c.params,
			g = SuperMap.Util.getParameterString(h);
			if (SuperMap.Util.urlIsLong(g)) {
				var e = c.data;
				c.method = "POST";
				c.url += (a === "?") ? "_method=GET" : "&_method=GET";
				e = "{";
				for (var d in h) {
					e += "'" + d + "':" + encodeURIComponent(h[d]) + ","
				}
				e += "}";
				c.data = e
			} else {
				if (g.length > 0) {
					b += (a === "?") ? g : "&" + g
				}
				c.url = b
			}
			delete c.params
		}
		var f = c.headers || {};
		c.headers = f;
		switch (c.method) {
		case "GET":
			SuperMap.Request.GET(c);
			break;
		case "POST":
			f["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
			SuperMap.Request.POST(c);
			break;
		case "PUT":
			c.url += (a === "?") ? "_method=PUT" : "&_method=PUT";
			SuperMap.Request.PUT(c);
			break;
		case "DELETE":
			c.url += (a === "?") ? "_method=DELETE" : "&_method=DELETE";
			SuperMap.Request.POST(c);
			break
		}
	} else {
		switch (c.method) {
		case "GET":
			SuperMap.Util.RequestJSONP.GET(c);
			break;
		case "POST":
			c.url += (a === "?") ? "_method=POST" : "&_method=POST";
			SuperMap.Util.RequestJSONP.POST(c);
			break;
		case "PUT":
			c.url += (a === "?") ? "_method=PUT" : "&_method=PUT";
			SuperMap.Util.RequestJSONP.PUT(c);
			break;
		case "DELETE":
			c.url += (a === "?") ? "_method=DELETE" : "&_method=DELETE";
			SuperMap.Util.RequestJSONP.GET(c);
			break
		}
	}
};
SuperMap.Util.RequestJSONP = {
	limitLength : 1500,
	queryKeys : [],
	queryValues : [],
	supermap_callbacks : {},
	addQueryStrings : function (a) {
		var d = this;
		for (var b in a) {
			d.queryKeys.push(b);
			if (typeof a[b] != "string") {
				a[b] = SuperMap.Util.toJSON(a[b])
			}
			var c = encodeURIComponent(a[b]);
			d.queryValues.push(c)
		}
	},
	issue : function (e) {
		var n = this,
		l = n.getUid(),
		b = e.url,
		q = null,
		d = null,
		o = [];
		if (e.success) {
			q = (e.scope) ? SuperMap.Function.bind(e.success, e.scope) : e.success
		}
		if (e.failure) {
			d = (e.scope) ? SuperMap.Function.bind(e.failure, e.scope) : e.failure
		}
		n.supermap_callbacks[l] = function (r) {
			var i = SuperMap.Util.transformResult(r);
			i.succeed = i.succeed == undefined ? true : i.succeed;
			if (i.succeed && q) {
				q(r)
			} else {
				if (d) {
					d(r)
				}
			}
			delete n.supermap_callbacks[l]
		};
		n.addQueryStrings({
			callback : "SuperMap.Util.RequestJSONP.supermap_callbacks[" + l + "]"
		});
		var j = n.queryKeys,
		m = b,
		g = 0;
		var c = n.queryKeys ? n.queryKeys.length : 0;
		for (var f = 0; f < c; f++) {
			if (m.length + n.queryKeys[f].length + 2 >= n.limitLength) {
				if (g == 0) {
					return false
				}
				if (o == null) {
					o = new Array()
				}
				o.push(m);
				m = b;
				g = 0;
				f--
			} else {
				if (m.length + n.queryKeys[f].length + 2 + n.queryValues[f].length > n.limitLength) {
					var a = n.queryValues[f];
					while (a.length > 0) {
						var p = n.limitLength - m.length - n.queryKeys[f].length - 2;
						if (m.indexOf("?") > -1) {
							m += "&"
						} else {
							m += "?"
						}
						var h = a.substring(0, p);
						if (h.substring(p - 1, p) == "%") {
							p -= 1;
							h = a.substring(0, p)
						} else {
							if (h.substring(p - 2, p - 1) == "%") {
								p -= 2;
								h = a.substring(0, p)
							}
						}
						h = n.formatValue(h);
						m += n.queryKeys[f] + "=" + h;
						a = a.substring(p);
						if (h.length > 0) {
							if (o == null) {
								o = new Array()
							}
							o.push(m);
							m = b;
							g = 0
						}
					}
				} else {
					g++;
					if (m.indexOf("?") > -1) {
						m += "&"
					} else {
						m += "?"
					}
					var h = n.queryValues[f];
					h = n.formatValue(h);
					m += n.queryKeys[f] + "=" + h
				}
			}
		}
		if (o == null) {
			o = new Array()
		}
		m !== b && o.push(m);
		n.send(o)
	},
	formatValue : function (b) {
		var a;
		a = /#/g;
		b = b.replace(a, "%23");
		a = /[+]/g;
		b = b.replace(a, "%2b");
		a = /[/]/g;
		b = b.replace(a, "%2F");
		a = /&/g;
		b = b.replace(a, "%26");
		return b
	},
	getUid : function () {
		var a = new Date().getTime(),
		b = Math.floor(Math.random() * 10000);
		return a * 1000 + b
	},
	send : function (e) {
		var a = e.length;
		if (a > 0) {
			var f = new Date().getTime();
			for (var d = 0; d < a; d++) {
				var b = document.createElement("script");
				var c = e[d];
				if (c.indexOf("?") > -1) {
					c += "&"
				} else {
					c += "?"
				}
				c += "sectionCount=" + a;
				c += "&sectionIndex=" + d;
				c += "&jsonpUserID=" + f;
				b.setAttribute("src", c);
				b.setAttribute("type", "text/javascript");
				if (navigator.userAgent.indexOf("IE") >= 0) {
					b.onreadystatechange = function () {
						if (this && ("loaded" == this.readyState || "complete" == this.readyState)) {
							this.onreadystatechange = null;
							try {
								document.body.removeChild(this)
							} catch (g) {
								if (this.parentNode) {
									this.parentNode.removeChild(this)
								}
								delete this
							}
						}
					}
				} else {
					b.onload = function () {
						this.onload = null;
						document.body.removeChild(this)
					}
				}
				document.body.appendChild(b)
			}
		}
	},
	GET : function (a) {
		var b = this;
		b.queryKeys.length = 0;
		b.queryValues.length = 0;
		b.addQueryStrings(a.params);
		b.issue(a)
	},
	POST : function (a) {
		var b = this;
		b.queryKeys.length = 0;
		b.queryValues.length = 0;
		b.addQueryStrings({
			requestEntity : a.data
		});
		b.issue(a)
	},
	PUT : function (a) {
		var b = this;
		b.queryKeys.length = 0;
		b.queryValues.length = 0;
		b.addQueryStrings({
			requestEntity : a.data
		});
		b.issue(a)
	},
	DELETE : function (a) {
		var b = this;
		b.queryKeys.length = 0;
		b.queryValues.length = 0;
		b.addQueryStrings({
			requestEntity : a.data
		});
		b.issue(a)
	}
};
SuperMap.OSP.Core.Point2D = function (a, b) {
	if (a || b) {
		if (typeof(a) != "number" || typeof(b) != "number") {
			throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.Web.Core.Resources", "Point2D_Constructor_ParamsError"))
		}
	}
	if (a == 0 || a) {
		this.x = a
	} else {
		this.x = NaN
	}
	if (b == 0 || b) {
		this.y = b
	} else {
		this.y = NaN
	}
};
SuperMap.OSP.Core.InfoWindow = SuperMap.Class(SuperMap.Popup.FramedCloud, {
		autoSize : false,
		fixedRelativePosition : true,
		relativePosition : "tr",
		CLASS_NAME : "SuperMap.OSP.Core.InfoWindow"
	});
SuperMap.OSP.Core._ServiceSuffix = "/iserver/cloudhandler";
SuperMap.OSP.Core._ServiceUrl = "http://services.supermapcloud.com";
SuperMap.OSP.Core._DataSourceName = "china_poi";
SuperMap.OSP.Core._mapName = "quanguo";
SuperMap.OSP.Core._cachedUrl = "http://t0.supermapcloud.com/FileService/image";
SuperMap.OSP.Core._Scales = [1 / 470000000, 1 / 235000000, 1 / 117500000, 1 / 58750000, 1 / 29375000, 1 / 14687500, 1 / 7343750, 1 / 3671875, 1 / 1835937, 1 / 917968, 1 / 458984, 1 / 229492, 1 / 114746, 1 / 57373, 1 / 28686, 1 / 14343, 1 / 14343, 1 / 7171, 1 / 3585, 1 / 1792];
SuperMap.OSP.Core.CloudLayer = SuperMap.Class(SuperMap.Layer.CloudLayer, {
		name : "CloudLayer",
		url : "http://t0.supermapcloud.com/output/cache",
		mapName : "quanguo_256x256",
		initialize : function (a) {
			var b = this;
			b.url = b.url + "/" + b.mapName + "/${z}/${x}/${y}.png";
			a = SuperMap.Util.extend({
					maxExtent : new SuperMap.Bounds(-20037508.342789244, -20037508.34278914, 20037508.342789244, 20037508.3427891),
					resolutions : [156605.46875, 78302.734375, 39151.3671875, 19575.68359375, 9787.841796875, 4893.9208984375, 2446.96044921875, 1223.48022460937, 611.740112304687, 305.870056152344, 152.935028076172, 76.4675140380859, 38.233757019043, 19.1168785095215, 9.55843925476074, 4.77921962738037, 2.38960981369019, 1.19480490684509, 0.597402453422546],
					scales : [470000000, 235000000, 117500000, 58750000, 29375000, 14687500, 7343750, 3671875, 1835937, 917968, 458984, 229492, 114746, 57373, 28686, 14343, 7171, 3585, 1792]
				}, a);
			SuperMap.CanvasLayer.prototype.initialize.apply(b, [b.name, b.url, null, a]);
			b.units = "meter"
		},
		destroy : function () {
			var a = this;
			SuperMap.CanvasLayer.prototype.destroy.apply(a, arguments);
			a.mapName = null;
			a.name = null;
			a.url = null
		},
		clone : function (b) {
			var a = this;
			if (b == null) {
				b = new SuperMap.Layer.CloudLayer(a.name, a.url, a.layerName, a.getOptions())
			}
			b = SuperMap.CanvasLayer.prototype.clone.apply(a, [b]);
			return b
		},
		getTileUrl : function (a) {
			var c = this,
			b = c.url;
			a.z = c.scales[c.scales.length - a.z - 1];
			return SuperMap.String.format(b, {
				mapName : c.mapName,
				x : a.x,
				y : a.y,
				z : a.z
			})
		},
		CLASS_NAME : "SuperMap.OSP.Core.CloudLayer"
	});
SuperMap.OSP.Service.Resources = SuperMap.Class({
		initialize : function () {},
		CLASS_NAME : "SuperMap.OSP.Service.Resources"
	});
SuperMap.OSP.Service.Resources.zh_cn = {
	Geocoder_getPoint_param_geocodeParam_error : "",
	Geocoder_getPoint_param_onComplete_error : "",
	Geocoder_filed_dataHandler_error : "",
	DataManager_filed_url_error : "",
	DataManager_createDataset_param_onComplete_error : "",
	DataManager_createDataset_param_dataSourceName_error : "",
	DataManager_createDataset_param_name_error : "",
	DataManager_createDataset_param_type_error : "",
	DataManager_deleteDataset_param_dataSourceName_error : "",
	DataManager_deleteDataset_param_name_error : "",
	DataManager_deleteDataset_param_onComplete_error : "",
	DataManager_renamedataSet_param_dataSourceName_error : "",
	DataManager_renamedataSet_param_oldName_error : "",
	DataManager_renamedataSet_param_newName_error : "",
	DataManager_renamedataSet_param_onComplete_error : "",
	DataManager_getDatasetInfo_param_dataSourceName_error : "",
	DataManager_getDatasetInfo_param_onComplete_error : "",
	DataManager_addField_param_fieldParam_error : "",
	DataManager_addField_param_onComplete_error : "",
	DataManager_deleteField_param_deleteFieldParam_error : "",
	DataManager_deleteField_param_onComplete_error : "",
	DataManager_updateField_param_updateFieldParam_error : "",
	DataManager_updateField_param_onComplete_error : "",
	DataManager_updateField_param_updateFieldParam_dataSourceName_error : "",
	DataManager_updateField_param_updateFieldParam_datasetName_error : "",
	DataManager_updateField_param_updateFieldParam_oldFieldNames_error : "",
	DataManager_updateField_param_updateFieldParam_newFieldCaptions_error : "",
	DataManager_addEntity_param_entityParam_error : "",
	DataManager_addEntity_param_onComplete_error : "",
	DataManager_addEntity_param_entityParam_dataSourceName_error : "",
	DataManager_addEntity_param_entityParam_datasetName_error : "",
	DataManager_addEntity_param_entityParam_entities_error : "",
	DataManager_deleteEntity_param_entityParam_error : "",
	DataManager_deleteEntity_param_onComplete_error : "",
	DataManager_deleteEntity_param_entityParam_dataSourceName_error : "",
	DataManager_deleteEntity_param_entityParam_datasetName_error : "",
	DataManager_deleteEntity_param_entityParam_ids_error : "",
	DataManager_deleteEntity_param_entityParam_entities_error : "",
	DataManager_updateEntity_param_entityParam_error : "",
	DataManager_updateEntity_param_onComplete_error : "",
	DataManager_updateEntity_param_entityParam_dataSourceName_error : "",
	DataManager_updateEntity_param_entityParam_datasetName_error : "",
	DataManager_updateEntity_param_entityParam_ids_error : "",
	DataManager_updateEntity_param_entityParam_entities_error : "",
	DataManager_downloadData_param_entityParam_error : "",
	DataManager_downloadData_param_onComplete_error : "",
	DataManager_downloadData_param_entityParam_targetDatasetNames_error : "",
	DataManager_addField_param_fieldParam_dataSourceName_error : "",
	DataManager_addField_param_fieldParam_datasetName_error : "",
	DataManager_addField_param_fieldParam_fieldInfos_error : "",
	DataManager_addField_param_fieldParam_fieldInfos_name_error : "",
	DataManager_addField_param_fieldParam_fieldInfos_caption_error : "",
	DataManager_addField_param_fieldParam_fieldInfos_type_error : "",
	DataManager_deleteField_param_deleteFieldParam_dataSourceName_error : "",
	DataManager_deleteField_param_deleteFieldParam_datasetName_error : "",
	DataManager_deleteField_param_deleteFieldParam_fieldNames_error : "",
	Search_queryByKeywords_param_queryByKeywordsParam_error : "",
	Search_queryByKeywords_param_onComplete_error : "",
	Search_preConfigSearch_param_searchParamerror : "",
	Search_preConfigSearch_param_onComplete_error : "",
	Search_queryByBuffer_param_queryByBufferParam_error : "",
	Search_queryByBuffer_param_onComplete_error : "",
	Search_preConfigBufferSearch_param_geometry_error : "",
	Search_preConfigBufferSearch_param_bufferAnalystParam_error : "",
	Search_preConfigBufferSearch_param_searchParam_error : "",
	Search_preConfigBufferSearch_param_onComplete_error : "",
	Search_queryByGeometry_param_queryByGeometryParam_error : "",
	Search_queryByGeometry_param_onComplete_error : "",
	Search_preConfigPolygonSearch_param_points_error : "",
	Search_preConfigPolygonSearch_param_searchParam_error : "",
	Search_preConfigPolygonSearch_param_onComplete_error : "",
	Search_filed_url_error : "",
	Search_queryByKeywords_param_queryByKeywordsParam_dataSourceName_error : "",
	Search_queryByKeywords_param_queryByKeywordsParam_queryParam_error : "",
	Search_queryByKeywords_param_queryByKeywordsParam_queryParam_queryDatasetParams_error : "",
	Search_queryByKeywords_param_queryByKeywordsParam_queryParam_returnResultSetInfo_error : "",
	Search_queryByBuffer_param_queryByBufferParam_queryParam_error : "",
	Search_queryByBuffer_param_queryByBufferParam_queryParam_queryDatasetParams_error : "",
	Search_queryByBuffer_param_queryByBufferParam_queryParam_returnResultSetInfo_error : "",
	Search_queryByBuffer_param_queryByBufferParam_bufferParam_error : "",
	Search_queryByBuffer_param_queryByBufferParam_geometry_error : "",
	Search_queryByGeometry_param_queryByGeometryParam_queryParam_error : "",
	Search_queryByGeometry_param_queryByGeometryParam_queryParam_queryDatasetParams_error : "",
	Search_queryByGeometry_param_queryByGeometryParam_queryParam_returnResultSetInfo_error : "",
	Search_queryByGeometry_param_queryByGeometryParam_geometry_error : "",
	POITypeSearch_getTopTypes_param_onComplete_error : "",
	POITypeSearch_getChildTypes_param_typeCode_error : "",
	POITypeSearch_getChildTypes_param_onComplete_error : "",
	POITypeSearch_getPOIType_param_typeCode_error : "",
	POITypeSearch_getPOIType_param_onComplete_error : "",
	DistrictSearch_getTopDistricts_param_onComplete_error : "",
	DistrictSearch_getChildDistricts_param_districtCode_error : "",
	DistrictSearch_getChildDistricts_param_onComplete_error : "",
	DistrictSearch_getDistrit_param_districtCode_error : "",
	DistrictSearch_getDistrit_param_onComplete_error : "",
	POISearch_getPois_param_getPOIsParam_error : "",
	POISearch_getPois_param_onComplete_error : "",
	POISearch_getPois_param_getPOIsParam_districtCode_error : "",
	POISearch_getPois_param_getPOIsParam_keyword_error : "",
	POISearch_getPOIsByType_param_getPOIsByTypeParam_error : "",
	POISearch_getPOIsByType_param_onComplete_error : "",
	POISearch_getPOIsByType_param_getPOIsByTypeParam_districtCode_error : "",
	POISearch_getPOIsByType_param_getPOIsByType_typeCode_error : "",
	POISearch_getPOIsByGeometry_param_getPOIsByGeometryParam_error : "",
	POISearch_getPOIsByGeometry_param_onComplete_error : "",
	POISearch_getPOIsByGeometry_param_getPOIsByGeometryParam_geometry_error : "",
	POISearch_getPOIsByGeometry_param_getPOIsByGeometryParam_keyword_error : "",
	MapCapturer_getImage_param_url_error : "",
	MapCapturer_getImage_param_onComplete_error : "",
	MapCapturer_getImage_param_getImageParam_error : "",
	PathAnalyst_filed_url_error : "",
	PathAnalyst_findPath_param_onComplete_error : "",
	PathAnalyst_findPath_param_findPathParam_error : "",
	PathAnalyst_findPath_param_findPathParam_dataSourceName_error : "",
	PathAnalyst_findPath_param_findPathParam_networkSetting_error : "",
	PathAnalyst_findPath_param_findPathParam_networkSetting_edgeIDField_error : "",
	PathAnalyst_findPath_param_findPathParam_networkSetting_fNodeIDField_error : "",
	PathAnalyst_findPath_param_findPathParam_networkSetting_networkDatasetName_error : "",
	PathAnalyst_findPath_param_findPathParam_networkSetting_networkDataSourceName_error : "",
	PathAnalyst_findPath_param_findPathParam_networkSetting_nodeIDField_error : "",
	PathAnalyst_findPath_param_findPathParam_networkSetting_tNodeIDField_error : "",
	PathAnalyst_findPath_param_findPathParam_networkSetting_weightFieldInfos_error : "",
	SpatialAnalyst_filed_url_error : "",
	SpatialAnalyst_bufferAnalyst_param_onComplete_error : "",
	SpatialAnalyst_bufferAnalyst_param_bufferAnalystParam_error : "",
	SpatialAnalyst_bufferAnalyst_param_geometry_error : "",
	SpatialAnalyst_bufferAnalyst_param_bufferAnalystParam_bufferParam_error : "",
	SpatialAnalyst_bufferAnalyst_param_bufferAnalystParam_geometry_error : "",
	SpatialAnalyst_isMultiPointInRegion_param_onComplete_error : "",
	SpatialAnalyst_isMultiPointInRegion_param_points_error : "",
	SpatialAnalyst_isMultiPointInRegion_param_region_error : "",
	TraficTransferService_findBusLineByName_param_name_error : "",
	TraficTransferService_findBusLineByName_param_onComplete_error : "",
	TraficTransferService_findBusStopByName_param_name_error : "",
	TraficTransferService_findBusStopByName_param_onComplete_error : "",
	TraficTransferService_findBusLineByBusStopId_param_stopId_error : "",
	TraficTransferService_findBusLineByBusStopId_param_onComplete_error : "",
	TraficTransferService_busTransferByAddress_param_startAddress_error : "",
	TraficTransferService_busTransferByAddress_param_endAddress_error : "",
	TraficTransferService_busTransferByAddress_param_busTransferParameter_error : "",
	TraficTransferService_busTransferByAddress_param_onComplete_error : "",
	TraficTransferService_busTransferByBusStopId_param_startStopId_error : "",
	TraficTransferService_busTransferByBusStopId_param_endStopId_error : "",
	TraficTransferService_busTransferByBusStopId_param_busTransferParameter_error : "",
	TraficTransferService_busTransferByBusStopId_param_onComplete_error : "",
	TraficTransferService_filed_dataHandler_error : "",
	TransportationAnalyst_findPath_param_findPathParameters_error : "",
	TransportationAnalyst_findPath_param_onComplete_error : "",
	TransportationAnalyst_findPath_param_findPathParameters_nodes_error : "",
	TransportationAnalyst_findPath_param_nodes_count_error : "",
	TransportationAnalyst_findPath_param_Parameter_error : "",
	TransportationAnalyst_findPath_param_Parameter_resultSetting_error : "",
	TransportationAnalyst_filed_url_error : ""
};
SuperMap.OSP.Service.DataParam = SuperMap.Class({
		initialize : function () {},
		dataSourceName : null,
		fieldExpressions : null,
		fieldFilters : null,
		returnFieldNames : null,
		customRegions : null,
		regionDatasetName : null,
		ids : null,
		CLASS_NAME : "SuperMap.OSP.Service.DataParam"
	});
SuperMap.OSP.Service = SuperMap.OSP.Service || {};
SuperMap.OSP.Service.ClientStateInfo = SuperMap.Class({
		initialize : function () {},
		viewBounds : null,
		mapName : null,
		mapScale : null,
		features : null,
		poiGroups : null,
		userDefinedParam : {},
		CLASS_NAME : "SuperMap.OSP.Service.ClientStateInfo"
	});
SuperMap.OSP.Service.TiledCachedIServerLayerInfo = SuperMap.Class({
		initialize : function () {},
		mapName : null,
		CLASS_NAME : "SuperMap.OSP.Service.TiledCachedIServerLayerInfo"
	});
SuperMap.OSP.Service.TiledCachedLayerInfo = SuperMap.Class({
		initialize : function () {},
		mapName : null,
		isVisible : true,
		CLASS_NAME : "SuperMap.OSP.Service.TiledCachedLayerInfo"
	});
SuperMap.OSP.Service.FeatureInfo = SuperMap.Class({
		initialize : function () {},
		geometry : null,
		style : null,
		id : -1,
		CLASS_NAME : "SuperMap.OSP.Service.FeatureInfo"
	});
SuperMap.OSP.Service.ErrorResult = SuperMap.Class({
		initialize : function () {},
		type : null,
		information : null,
		CLASS_NAME : "SuperMap.OSP.Service.ErrorResult"
	});
SuperMap.OSP.Service.MapCapturer = SuperMap.Class({
		initialize : function () {},
		image2 : false,
		map : null,
		maphandler : null,
		url : null,
		getImage : function (h, w, e) {
			if (SuperMap.OSP.Core.Utility._isEmpty(h)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "MapCapturer_getImage_param_getImageParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(w) || typeof(w) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "MapCapturer_getImage_param_onComplete_error"));
				return false
			}
			function v(i) {
				if (i) {
					if (i.error && typeof(e) == "function") {
						e(i.error)
					}
				}
				w(i.result[0])
			}
			function r(i) {
				if (typeof(e) == "function") {
					var j = new SuperMap.OSP.Service.ErrorResult;
					j.type = SuperMap.OSP.Core.ErrorType.ENVIRONMENT;
					j.information = i;
					e(j)
				}
			}
			if (h != null && h != "") {
				var a = h.mapScale;
				var g = h.viewBounds;
				g.leftBottom = new SuperMap.OSP.Core.Point2D(g.left, g.bottom);
				g.rightTop = new SuperMap.OSP.Core.Point2D(g.right, g.top);
				h.viewBounds = {
					leftBottom : g.leftBottom,
					rightTop : g.rightTop
				};
				var x = new SuperMap.OSP.Core.Point2D(g.left, g.top);
				var q = new SuperMap.OSP.Core.Point2D(g.right, g.bottom);
				var c = [x, new SuperMap.OSP.Core.Point2D(g.right, g.top), q, new SuperMap.OSP.Core.Point2D(g.left, g.bottom)];
				if (h.poiGroups && h.poiGroups.length > 0) {
					var f = h.poiGroups;
					var p = [];
					for (var u = 0; u < f.length; u++) {
						if (f[u] && f[u].visible) {
							var n = [];
							var l = f[u].pois;
							var m = f[u].scaledContents;
							if (m && m._size && m._size > 0) {
								m = m.get(a);
								f[u].scaledContents = null;
								f[u].scaledContents = m
							}
							for (var t = 0; t < l.length; t++) {
								var o = l[t];
								if (o) {
									if (SuperMap.OSP.Core.Utility.isPointInPolygon(c, o.position) && o.visible) {
										o._events = null;
										o._eventNames = null;
										o.properties = null;
										var b = o.scaledContents;
										if (b && b._size && b._size > 0) {
											b = b.get(a)
										}
										n.push(o)
									}
								}
							}
							f[u].pois = n;
							p.push(f[u])
						}
					}
					h.poiGroups = p
				}
				if (h.features && h.features.length > 0) {
					var d = h.features;
					for (var u = 0; u < d.length; u++) {
						var s = SuperMap.OSP.Core.Utility._geometryToServer6RGeometry(d[u].geometry);
						d[u].geometry = null;
						d[u].geometry = s
					}
				}
				h.userDefinedParam = null
			}
			if (this.url) {
				this.url = this.url + SuperMap.OSP.Core._ServiceSuffix
			} else {
				throw new Error(SuperMap.Web.Resources.Resource.getMessage("SuperMap.OSP.Service.Resources", "MapCapturer_getImage_param_url_error"));
				return false
			}
			SuperMap.OSP.Core.Utility.committer(this.url, "MapCapturer", "", h, false, v, r)
		},
		_getImage2 : function (g, d) {
			var a = d;
			var f = g.get_center().x;
			var c = g.get_center().y;
			var b = g.get_scale();
			var e = "png";
			a += "?";
			a += "method=getimage";
			a += "&mapName=" + mapName;
			a += "&width=" + g.get_width();
			a += "&height=" + g.get_height();
			a += "&mapCenterX=" + f;
			a += "&mapCenterY=" + c;
			a += "&imageFormat=" + e;
			a += "&mapScale=" + b;
			a += "&layersKey=0";
			a += "&t=" + new Date().getTime();
			return a
		},
		CLASS_NAME : "SuperMap.OSP.Service.MapCapturer"
	});
SuperMap.OSP.Service.ImageFormat = SuperMap.Class({
		initialize : function () {},
		CLASS_NAME : "SuperMap.OSP.Service.ImageFormat"
	});
SuperMap.OSP.Service.ImageFormat.PNG = 0;
SuperMap.OSP.Service.ImageFormat.JPG = 1;
SuperMap.OSP.Service.ImageFormat.GIS = 1;
SuperMap.OSP.Service.GetImageParam = SuperMap.Class({
		initialize : function () {},
		imageFormat : SuperMap.OSP.Service.ImageFormat.PNG,
		picWidth : 500,
		CLASS_NAME : "SuperMap.OSP.Service.GetImageParam"
	});
SuperMap.OSP.Service.DataManager = SuperMap.Class({
		initialize : function () {},
		url : null,
		createDataset : function (d, a, b, e, c, g) {
			if (SuperMap.OSP.Core.Utility._isEmpty(d)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_createDataset_param_dataSourceName_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(a)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_createDataset_param_name_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(b)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_createDataset_param_type_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(e) || typeof(e) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_createDataset_param_onComplete_error"));
				return false
			}
			var f = {
				dataSourceName : d,
				name : a,
				type : b
			};
			this._queryBase("createDataset", f, e, c, g)
		},
		deleteDataset : function (c, a, d, b, f) {
			if (SuperMap.OSP.Core.Utility._isEmpty(c)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_deleteDataset_param_dataSourceName_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(a)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_deleteDataset_param_name_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(d) || typeof(d) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_deleteDataset_param_onComplete_error"));
				return false
			}
			var e = {
				dataSourceName : c,
				name : a
			};
			this._queryBase("deleteDataset", e, d, b, f)
		},
		renamedataSet : function (d, b, a, e, c, g) {
			if (SuperMap.OSP.Core.Utility._isEmpty(d)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_renamedataSet_param_dataSourceName_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(b)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_renamedataSet_param_oldName_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(a)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_renamedataSet_param_newName_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(e) || typeof(e) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_renamedataSet_param_onComplete_error"));
				return false
			}
			var f = {
				dataSourceName : d,
				oldName : b,
				newName : a
			};
			this._queryBase("renamedataSet", f, e, c, g)
		},
		getDatasetInfo : function (b, c, a, e) {
			if (SuperMap.OSP.Core.Utility._isEmpty(b)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_getDatasetInfo_param_dataSourceName_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c) || typeof(c) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_getDatasetInfo_param_onComplete_error"));
				return false
			}
			var d = {
				dataSourceName : b
			};
			this._queryBase("getDatasetInfo", d, c, a, e)
		},
		addField : function (c, b, a, d) {
			if (SuperMap.OSP.Core.Utility._isEmpty(c)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_addField_param_fieldParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(b) || typeof(b) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_addField_param_onComplete_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c.dataSourceName)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_addField_param_fieldParam_dataSourceName_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c.datasetName)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_addField_param_fieldParam_datasetName_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c.fieldInfos)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_addField_param_fieldParam_fieldInfos_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c.fieldInfos.name)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_addField_param_fieldParam_fieldInfos_name_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c.fieldInfos.caption)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_addField_param_fieldParam_fieldInfos_caption_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c.fieldInfos.type)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_addField_param_fieldParam_fieldInfos_type_error"));
				return false
			}
			this._queryBase("addField", c, b, a, d)
		},
		deleteField : function (a, c, b, d) {
			if (SuperMap.OSP.Core.Utility._isEmpty(a)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_deleteField_param_deleteFieldParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c) || typeof(c) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_deleteField_param_onComplete_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(a.dataSourceName)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_deleteField_param_deleteFieldParam_dataSourceName_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(a.datasetName)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_deleteField_param_deleteFieldParam_datasetName_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(a.fieldNames)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_deleteField_param_deleteFieldParam_fieldNames_error"));
				return false
			}
			this._queryBase("deleteField", a, c, b, d)
		},
		updateField : function (a, c, b, d) {
			if (SuperMap.OSP.Core.Utility._isEmpty(a)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_updateField_param_updateFieldParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c) || typeof(c) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_updateField_param_onComplete_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(a.dataSourceName)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_updateField_param_updateFieldParam_dataSourceName_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(a.datasetName)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_updateField_param_updateFieldParam_datasetName_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(a.oldFieldNames)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_updateField_param_updateFieldParam_oldFieldNames_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(a.newFieldCaptions)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_updateField_param_updateFieldParam_newFieldCaptions_error"));
				return false
			}
			this._queryBase("updateField", a, c, b, d)
		},
		addEntity : function () {
			if (SuperMap.OSP.Core.Utility._isEmpty(entityParam)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_addEntity_param_entityParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(onComplete) || typeof(onComplete) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_addEntity_param_onComplete_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(entityParam.dataSourceName)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_addEntity_param_entityParam_dataSourceName_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(entityParam.datasetName)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_addEntity_param_entityParam_datasetName_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(entityParam.entities)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_addEntity_param_entityParam_entities_error"));
				return false
			}
			this._queryBase("addEntity", entityParam, onComplete, onError, userContext)
		},
		deleteEntity : function (a, c, b, d) {
			if (SuperMap.OSP.Core.Utility._isEmpty(a)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_deleteEntity_param_entityParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c) || typeof(c) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_deleteEntity_param_onComplete_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(a.dataSourceName)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_deleteEntity_param_entityParam_dataSourceName_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(a.datasetName)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_deleteEntity_param_entityParam_datasetName_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(a.ids)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_deleteEntity_param_entityParam_ids_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(a.entities)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_deleteEntity_param_entityParam_entities_error"));
				return false
			}
			this._queryBase("deleteEntity", a, c, b, d)
		},
		getEntitiesByIds : function (c, e, a, d, b, g) {
			if (SuperMap.OSP.Core.Utility._isEmpty(c)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_deleteEntity_param_entityParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(e)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_deleteEntity_param_entityParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(a)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_deleteEntity_param_entityParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(d) || typeof(d) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_deleteEntity_param_onComplete_error"));
				return false
			}
			var f = {
				dataSourceName : c,
				datasetName : e,
				ids : a
			};
			this._queryBase("getEntitiesByIds", f, d, b, g)
		},
		getEntities : function (b, d, c, a, f) {
			if (SuperMap.OSP.Core.Utility._isEmpty(b)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_deleteEntity_param_entityParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(d)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_deleteEntity_param_entityParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c) || typeof(c) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_deleteEntity_param_onComplete_error"));
				return false
			}
			var e = {
				dataSourceName : b,
				datasetName : d
			};
			this._queryBase("getEntities", e, c, a, f)
		},
		updateEntity : function (a, c, b, d) {
			if (SuperMap.OSP.Core.Utility._isEmpty(a)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_updateEntity_param_entityParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c) || typeof(c) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_updateEntity_param_onComplete_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(a.dataSourceName)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_updateEntity_param_entityParam_dataSourceName_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(a.datasetName)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_updateEntity_param_entityParam_datasetName_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(a.ids)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_updateEntity_param_entityParam_ids_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(a.entities)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_updateEntity_param_entityParam_entities_error"));
				return false
			}
			this._queryBase("updateEntity", a, c, b, d)
		},
		downloadData : function (a, c, b, d) {
			if (SuperMap.OSP.Core.Utility._isEmpty(a)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_downloadData_param_entityParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c) || typeof(c) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_downloadData_param_onComplete_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(a.targetDatasetNames)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_downloadData_param_entityParam_targetDatasetNames_error"));
				return false
			}
			this._queryBase("downloadData", a, c, b, d)
		},
		_queryBase : function (b, f, e, d, g) {
			if (SuperMap.OSP.Core.Utility._isEmpty(this.url)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DataManager_filed_url_error"));
				return false
			}
			this.dataHandler = this.url + SuperMap.OSP.Core._ServiceSuffix;
			function a(h) {
				if (h) {
					if (h.error && typeof(d) == "function") {
						d(h.error)
					}
				}
				e(h.result[0])
			}
			function c(h) {
				if (typeof(d) == "function") {
					var i = new SuperMap.OSP.Service.ErrorResult;
					i.type = SuperMap.OSP.Core.ErrorType.ENVIRONMENT;
					i.information = h;
					d(i)
				}
			}
			SuperMap.OSP.Core.Utility.committer(this.dataHandler, "DataManager", b, f, false, a, c, g)
		},
		CLASS_NAME : "SuperMap.OSP.Service.DataManager"
	});
SuperMap.OSP.Service.DeleteFieldParam = SuperMap.Class({
		initialize : function () {},
		dataSourceName : null,
		datasetName : null,
		fieldNames : null,
		CLASS_NAME : "SuperMap.OSP.Service.DeleteFieldParam"
	});
SuperMap.OSP.Service.UpdateFieldParam = SuperMap.Class({
		initialize : function () {},
		dataSourceName : null,
		datasetName : null,
		oldFieldNames : null,
		newFieldCaptions : null,
		CLASS_NAME : "SuperMap.OSP.Service.UpdateFieldParam"
	});
SuperMap.OSP.Service.EntityParam = SuperMap.Class({
		initialize : function () {},
		dataSourceName : null,
		datasetName : null,
		ids : null,
		entities : null,
		CLASS_NAME : "SuperMap.OSP.Service.EntityParam"
	});
SuperMap.OSP.Service.FieldInfo = SuperMap.Class({
		initialize : function () {},
		name : null,
		caption : null,
		type : null,
		maxLength : 50,
		defaultValue : null,
		isRequest : false,
		CLASS_NAME : "SuperMap.OSP.Service.FieldInfo"
	});
SuperMap.OSP.Service.FieldParam = SuperMap.Class({
		initialize : function () {},
		dataSourceName : null,
		datasetName : null,
		fieldInfos : null,
		CLASS_NAME : "SuperMap.OSP.Service.FieldParam"
	});
SuperMap.OSP.Service.FieldType = SuperMap.Class({
		initialize : function () {},
		CLASS_NAME : "SuperMap.OSP.Service.FieldType"
	});
SuperMap.OSP.Service.FieldType.INT16 = 0;
SuperMap.OSP.Service.FieldType.INT32 = 1;
SuperMap.OSP.Service.FieldType.SINGLE = 2;
SuperMap.OSP.Service.FieldType.DOUBLE = 3;
SuperMap.OSP.Service.FieldType.NVARCHAR = 4;
SuperMap.OSP.Service.FieldType.BOOLEAN = 5;
SuperMap.OSP.Service.FieldType.TEXT = 6;
SuperMap.OSP.Service.FieldType.DATETIME = 7;
SuperMap.OSP.Service.FormatType = SuperMap.Class({
		initialize : function () {},
		CLASS_NAME : "SuperMap.OSP.Service.FormatType"
	});
SuperMap.OSP.Service.FormatType.BMP = 0;
SuperMap.OSP.Service.FormatType.DWG = 1;
SuperMap.OSP.Service.FormatType.DXF = 2;
SuperMap.OSP.Service.FormatType.GIF = 3;
SuperMap.OSP.Service.FormatType.JPG = 4;
SuperMap.OSP.Service.FormatType.PNG = 5;
SuperMap.OSP.Service.FormatType.TIF = 6;
SuperMap.OSP.Service.DataDownloadParam = SuperMap.Class({
		initialize : function () {},
		targetDatasetNames : null,
		formatType : null,
		CLASS_NAME : "SuperMap.OSP.Service.DataDownloadParam"
	});
SuperMap.OSP.Service.Search = SuperMap.Class({
		initialize : function () {},
		url : null,
		queryByKeywords : function (b, d, c, e) {
			if (SuperMap.OSP.Core.Utility._isEmpty(b)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByKeywords_param_queryByKeywordsParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(d) || typeof(d) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByKeywords_param_onComplete_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(b.dataSourceName)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByKeywords_param_queryByKeywordsParam_dataSourceName_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(b.queryParam)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByKeywords_param_queryByKeywordsParam_queryParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(b.queryParam.queryDatasetParams)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByKeywords_param_queryByKeywordsParam_queryParam_queryDatasetParams_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(b.queryParam.returnResultSetInfo)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByKeywords_param_queryByKeywordsParam_queryParam_returnResultSetInfo_error"));
				return false
			}
			function a(g) {
				if (g && g.currentCount > 0) {
					for (var m = 0; m < g.records.length; m++) {
						var h = g.records[m];
						if (h.shape) {
							var f = new Array();
							for (var l = 0; l < h.shape.point2Ds.length; l++) {
								f.push(new SuperMap.Geometry.Point(h.shape.point2Ds[l].x, h.shape.point2Ds[l].y))
							}
							h.shape.point2Ds = f;
							if (h.center) {
								h.center = new SuperMap.OSP.Core.Point2D(h.center.x, h.center.y)
							}
						}
					}
				}
				d(g)
			}
			this._queryBase("queryByKeywords", b, a, c, e)
		},
		queryByBuffer : function (b, d, c, e) {
			if (SuperMap.OSP.Core.Utility._isEmpty(b)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByBuffer_param_queryByBufferParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(d) || typeof(d) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByBuffer_param_onComplete_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(b.queryParam)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByBuffer_param_queryByBufferParam_queryParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(b.queryParam.queryDatasetParams)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByBuffer_param_queryByBufferParam_queryParam_queryDatasetParams_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(b.queryParam.returnResultSetInfo)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByBuffer_param_queryByBufferParam_queryParam_returnResultSetInfo_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(b.bufferParam)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByBuffer_param_queryByBufferParam_bufferParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(b.geometry)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByBuffer_param_queryByBufferParam_geometry_error"));
				return false
			}
			function a(f) {
				if (f && f.bufferAnalystResult && f.bufferAnalystResult.shape) {
					var h = f.bufferAnalystResult.shape;
					f.bufferAnalystResult.shape = SuperMap.OSP.Core.Utility._server2GeometryToClientGeometry(h)
				}
				if (f && f.currentCount > 0) {
					for (var j = 0; j < f.records.length; j++) {
						var g = f.records[j];
						if (g.shape) {
							g.shape = SuperMap.OSP.Core.Utility._server2GeometryToClientGeometry(g.shape);
							if (g.center) {
								g.center = new SuperMap.Geometry.Point(g.center.x, g.center.y)
							}
						}
					}
				}
				d(f)
			}
			this._queryBase("queryByBuffer", b, a, c, e)
		},
		queryByGeometry : function (c, d, b, e) {
			if (SuperMap.OSP.Core.Utility._isEmpty(c)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByGeometry_param_queryByGeometryParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(d) || typeof(d) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByGeometry_param_onComplete_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c.queryParam)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByGeometry_param_queryByGeometryParam_queryParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c.queryParam.queryDatasetParams)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByGeometry_param_queryByGeometryParam_queryParam_queryDatasetParams_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c.queryParam.returnResultSetInfo)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByGeometry_param_queryByGeometryParam_queryParam_returnResultSetInfo_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c.geometry)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByGeometry_param_queryByGeometryParam_geometry_error"));
				return false
			}
			function a(f) {
				if (f && f.currentCount > 0) {}

				d(f)
			}
			this._queryBase("queryByGeometry", c, a, b, e)
		},
		latlonToAddress : function (c, d, b, e) {
			if (SuperMap.OSP.Core.Utility._isEmpty(c)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_latlonToAddress_param_findAddressParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c.geometry)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_latlonToAddress_param_findAddressParam_geometry_error"));
				return false
			}
			if (c.geometry) {
				c.geometry = SuperMap.OSP.Core.Utility._geometryToServer2Geometry(c.geometry)
			}
			function a(g) {
				if (g && g.currentCount > 0) {
					for (var m = 0; m < g.records.length; m++) {
						var h = g.records[m];
						if (h.shape) {
							var f = new Array();
							for (var l = 0; l < h.shape.point2Ds.length; l++) {
								f.push(new SuperMap.Geometry.Point(h.shape.point2Ds[l].x, h.shape.point2Ds[l].y))
							}
							h.shape.point2Ds = f;
							if (h.center) {
								h.center = new SuperMap.OSP.Core.Point2D(h.center.x, h.center.y)
							}
						}
					}
				}
				d(g)
			}
			this._queryBase("latlonToAddress", c, a, b, e)
		},
		_queryBase : function (b, f, e, d, g) {
			if (SuperMap.OSP.Core.Utility._isEmpty(this.url)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_filed_url_error"));
				return false
			}
			this.dataHandler = this.url + SuperMap.OSP.Core._ServiceSuffix;
			function a(h) {
				if (h) {
					if (h.error && typeof(d) == "function") {
						d(h.error)
					}
				}
				e(h.result[0])
			}
			function c(h) {
				if (typeof(d) == "function") {
					var i = new SuperMap.OSP.Service.ErrorResult;
					i.type = SuperMap.OSP.Core.ErrorType.ENVIRONMENT;
					i.information = h;
					d(i)
				}
			}
			SuperMap.OSP.Core.Utility.committer(this.dataHandler, "Search", b, f, false, a, c, g)
		},
		CLASS_NAME : "SuperMap.OSP.Service.Search"
	});
SuperMap.OSP.Service.QueryByBufferParam = SuperMap.Class({
		initialize : function () {},
		dataSourceName : null,
		queryParam : null,
		bufferParam : null,
		geometry : null,
		queryMode : SuperMap.REST.SpatialQueryMode.INTERSECT,
		returnBufferAnalsyResult : false,
		CLASS_NAME : "SuperMap.OSP.Service.QueryByBufferParam"
	});
SuperMap.OSP.Service.QueryByGeometryParam = SuperMap.Class({
		initialize : function () {},
		dataSourceName : null,
		queryParam : null,
		geometry : null,
		queryMode : SuperMap.REST.SpatialQueryMode.INTERSECT,
		CALSS_NAME : "SuperMap.OSP.Service.QueryByGeometryParam"
	});
SuperMap.OSP.Service.QueryByKeywordsParam = SuperMap.Class({
		initialize : function () {},
		dataSourceName : null,
		queryParam : null,
		queryType : 0,
		CLASS_NAME : "SuperMap.OSP.Service.QueryByKeywordsParam"
	});
SuperMap.OSP.Service.QueryParam = SuperMap.Class({
		initialize : function () {},
		queryDatasetParams : null,
		returnResultSetInfo : SuperMap.REST.QueryOption.ATTRIBUTE,
		startRecord : 0,
		expectCount : 10,
		sortPriorityType : -1,
		CLASS_NAME : "SuperMap.OSP.Service.QueryParam"
	});
SuperMap.OSP.Service.QueryDatasetParam = SuperMap.Class({
		initialize : function () {},
		name : null,
		sqlParam : null,
		CLASS_NAME : "SuperMap.OSP.Service.QueryDatasetParam"
	});
SuperMap.OSP.Service.SqlParam = SuperMap.Class({
		initialize : function () {},
		groupClause : null,
		ids : null,
		returnFields : null,
		sortClause : null,
		attributeFilter : null,
		joinItems : null,
		linkItems : null,
		CLASS_NAME : "SuperMap.OSP.Service.SqlParam"
	});
SuperMap.OSP.Service.JoinItem = SuperMap.Class({
		initialize : function () {},
		foreignTableName : null,
		joinFilter : null,
		joinType : null,
		CLASS_NAME : "SuperMap.OSP.Service.JoinItem"
	});
SuperMap.OSP.Service.QueryResult = SuperMap.Class({
		initialize : function () {},
		dataSourceName : null,
		currentCount : 0,
		records : null,
		totalCount : 0,
		CLASS_NAME : "SuperMap.OSP.Service.QueryResult"
	});
SuperMap.OSP.Service.QueryBufferResult = SuperMap.Class({
		initialize : function () {},
		bufferAnalystResult : null,
		CLASS_NAME : "SuperMap.OSP.Service.QueryBufferResult"
	});
SuperMap.OSP.Service.Record = SuperMap.Class({
		initialize : function () {},
		datasetName : null,
		returnFieldCaptions : null,
		fields : null,
		fieldTypes : null,
		center : null,
		fieldValues : null,
		shape : null,
		thirdPartyInfo : null,
		CLASS_NAME : "SuperMap.OSP.Service.Record"
	});
SuperMap.OSP.Service.JoinType = SuperMap.Class({
		initialize : function () {},
		CLASS_NAME : "SuperMap.OSP.Service.JoinType"
	});
SuperMap.OSP.Service.JoinType.INNERJOIN = 0;
SuperMap.OSP.Service.JoinType.LEFTJOIN = 1;
SuperMap.OSP.Service.SortPriorityType = SuperMap.Class({
		initialize : function () {},
		CLASS_NAME : "SuperMap.OSP.Service.SortPriorityType"
	});
SuperMap.OSP.Service.SortPriorityType.DISTANCE = 0;
SuperMap.OSP.Service.SortPriorityType.FEE = 1;
SuperMap.OSP.Service.LinkItem = SuperMap.Class({
		initialize : function () {},
		dataSourceConnectionInfo : null,
		foreignKeys : null,
		foreignTable : null,
		linkFields : null,
		linkFilter : null,
		name : null,
		primaryKeys : null,
		CLASS_NAME : "SuperMap.OSP.Service.LinkItem"
	});
SuperMap.OSP.Service.DataSourceConnectionInfo = SuperMap.Class({
		initialize : function () {},
		alias : null,
		connect : null,
		driver : null,
		engineType : null,
		exclusive : null,
		openLinkTable : null,
		password : null,
		readOnly : null,
		server : null,
		user : null,
		CLASS_NAME : "SuperMap.OSP.Service.DataSourceConnectionInfo"
	});
SuperMap.OSP.Service.POIInfo = SuperMap.Class({
		initialize : function () {},
		code : null,
		name : null,
		pinYin : null,
		zipCode : null,
		address : null,
		telephone : null,
		x : 0,
		y : 0,
		thirdPartyInfo : null,
		CLASS_NAME : "SuperMap.OSP.Service.POIInfo"
	});
SuperMap.OSP.Service.SearchMode = SuperMap.Class({
		initialize : function () {},
		CLASS_NAME : "SuperMap.OSP.Service.SearchMode"
	});
SuperMap.OSP.Service.SearchMode.EQUAL = 0;
SuperMap.OSP.Service.SearchMode.FUZZY = 1;
SuperMap.OSP.Service.GetPOIsParam = SuperMap.Class({
		initialize : function () {},
		districtCode : null,
		districtLevel : null,
		keyword : null,
		startRecord : 0,
		expectCount : 10,
		coordinate : "m",
		searchMode : SuperMap.OSP.Service.SearchMode.FUZZY,
		CLASS_NAME : "SuperMap.OSP.Service.GetPOIsParam"
	});
SuperMap.OSP.Service.GetPOIsByTypeParam = SuperMap.Class({
		initialize : function () {},
		districtCode : null,
		districtLevel : null,
		keyword : "",
		startRecord : 0,
		expectCount : 10,
		typeCode : null,
		typeLevel : null,
		coordinate : "m",
		CLASS_NAME : "SuperMap.OSP.Service.GetPOIsByTypeParam"
	});
SuperMap.OSP.Service.GetPOIsByGeometryParam = SuperMap.Class({
		initialize : function () {},
		geometry : null,
		keyword : "",
		startRecord : 0,
		expectCount : 10,
		dataSourceName : "",
		datasetName : "",
		coordinate : "m",
		CLASS_NAME : "SuperMap.OSP.Service.GetPOIsByGeometryParam"
	});
SuperMap.OSP.Service.BufferSearchParam = SuperMap.Class({
		initialize : function () {},
		geometry : null,
		typeName : "",
		startRecord : 0,
		expectCount : 10,
		dataSourceName : "",
		datasetName : "",
		coordinate : "m",
		CLASS_NAME : "SuperMap.OSP.Service.BufferSearchParam"
	});
SuperMap.OSP.Service.findAddressParam = SuperMap.Class({
		initialize : function () {},
		geometry : null,
		startRecord : 0,
		expectCount : 10,
		dataSourceName : "",
		datasetName : "",
		CLASS_NAME : "SuperMap.OSP.Service.findAddressParam"
	});
SuperMap.OSP.Service.POISearchResult = SuperMap.Class({
		initialize : function () {},
		currentCount : 0,
		records : null,
		totalCount : 0,
		CLASS_NAME : "SuperMap.OSP.Service.POISearchResult"
	});
SuperMap.OSP.Service.POISearch = SuperMap.Class({
		initialize : function () {
			this.search = new SuperMap.OSP.Service.Search()
		},
		getPois : function (h, g, f) {
			if (SuperMap.OSP.Core.Utility._isEmpty(h)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "POISearch_getPois_param_getPOIsParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(g) || typeof(g) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "POISearch_getPois_param_onComplete_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(h.districtCode)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "POISearch_getPois_param_getPOIsParam_districtCode_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(h.keyword)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "POISearch_getPois_param_getPOIsParam_keyword_error"));
				return false
			}
			var e = new SuperMap.OSP.Service.QueryParam();
			e.expectCount = h.expectCount;
			e.startRecord = h.startRecord;
			e.returnResultSetInfo = SuperMap.REST.QueryOption.ATTRIBUTE;
			var b = new SuperMap.OSP.Service.QueryDatasetParam();
			b.name = h.datasetName;
			b.sqlParam = new SuperMap.OSP.Service.SqlParam();
			if (h.coordinate == "m" || h.coordinate == "M") {
				b.sqlParam.returnFields = ["SMID", "SMX", "SMY", "Name", "PY", "POI_ID", "ZipCode", "Address", "Telephone", "Admincode"]
			} else {
				if (h.coordinate == "l" || h.coordinate == "L") {
					b.sqlParam.returnFields = ["SMID", "SMLLX", "SMLLY", "Name", "PY", "POI_ID", "ZipCode", "Address", "Telephone", "Admincode"]
				}
			}
			var a = "";
			switch (h.districtLevel) {
			case 1:
				a = " and admincode >='" + h.districtCode + "' and admincode<'" + (parseInt(h.districtCode) + 10000) + "'";
				break;
			case 2:
				a = " and admincode >='" + h.districtCode + "' and admincode<'" + (parseInt(h.districtCode) + 100) + "'";
				break;
			case 3:
				a = " and ThirdAdminCode='" + h.districtCode + "'";
				break
			}
			if (h.searchMode == SuperMap.OSP.Service.SearchMode.EQUA) {
				b.sqlParam.attributeFilter = "Name='" + h.keyword + "'" + a
			} else {
				b.sqlParam.attributeFilter = "Name like '%" + h.keyword + "%'" + a
			}
			e.queryDatasetParams = [b];
			var d = new SuperMap.OSP.Service.QueryByKeywordsParam();
			d.dataSourceName = h.DataSourceName;
			d.queryParam = e;
			d.queryType = 0;
			function c(l) {
				var s = new SuperMap.OSP.Service.POISearchResult();
				if (l && l.currentCount > 0) {
					var n = l.records;
					var r = [];
					for (var p = 0; p < n.length; p++) {
						var m = n[p];
						var q = new SuperMap.OSP.Service.POIInfo();
						for (var o = 0; o < m.fields.length; o++) {
							switch (m.fields[o]) {
							case "SMX":
								q.x = parseFloat(m.fieldValues[o]);
								break;
							case "SMY":
								q.y = parseFloat(m.fieldValues[o]);
								break;
							case "POI_ID":
								q.code = m.fieldValues[o];
								break;
							case "NAME":
								q.name = m.fieldValues[o];
								break;
							case "PY":
								q.pinYin = m.fieldValues[o];
								break;
							case "ZIPCODE":
								q.zipCode = m.fieldValues[o];
								break;
							case "TELEPHONE":
								q.telephone = m.fieldValues[o];
								break;
							case "ADDRESS":
								q.address = m.fieldValues[o];
								break;
							case "ADMINCODE":
								q.adminCode = parseInt(m.fieldValues[o]);
								break;
							case "AFFILIATION":
								q.affiliation = m.fieldValues[o];
								break
							}
						}
						q.thirdPartyInfo = m.thirdPartyInfo;
						r.push(q)
					}
					s.currentCount = l.currentCount;
					s.totalCount = l.totalCount;
					s.records = r
				}
				g(s)
			}
			if (typeof(h.charsetEncoding) != "undefined" && h.charsetEncoding != null) {
				d.charsetEncoding = h.charsetEncoding
			}
			this.search.queryByKeywords(d, c, f)
		},
		getPOIsByType : function (f, c, d) {
			if (SuperMap.OSP.Core.Utility._isEmpty(f)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "POISearch_getPOIsByType_param_getPOIsByTypeParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c) || typeof(c) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "POISearch_getPOIsByType_param_onComplete_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(f.districtCode)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "POISearch_getPOIsByType_param_getPOIsByTypeParam_districtCode_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(f.typeCode)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "POISearch_getPOIsByType_param_getPOIsByType_typeCode_error"));
				return false
			}
			var h = new SuperMap.OSP.Service.QueryParam();
			h.expectCount = f.expectCount;
			h.startRecord = f.startRecord;
			h.returnResultSetInfo = SuperMap.REST.QueryOption.ATTRIBUTE;
			var g = new SuperMap.OSP.Service.QueryDatasetParam();
			g.name = f.datasetName;
			g.sqlParam = new SuperMap.OSP.Service.SqlParam();
			if (f.coordinate == "m" || f.coordinate == "M") {
				g.sqlParam.returnFields = ["SMX", "SMY", "Name", "PY", "POI_ID", "ZipCode", "Address", "Telephone"]
			} else {
				g.sqlParam.returnFields = ["SMLLX", "SMLLY", "Name", "PY", "POI_ID", "ZipCode", "Address", "Telephone"]
			}
			var b = "";
			switch (f.districtLevel) {
			case 1:
				b = " and FirstAdminCode='" + f.districtCode + "'";
				break;
			case 2:
				b = " and SecondAdminCode='" + f.districtCode + "'";
				break;
			case 3:
				b = " and ThirdAdminCode='" + f.districtCode + "'";
				break
			}
			var a = "";
			switch (f.typeLevel) {
			case 1:
				a = " FirstCode='" + f.typeCode + "'";
				break;
			case 2:
				a = " SecondCode='" + f.typeCode + "'";
				break;
			case 3:
				a = " ThirdCode='" + f.typeCode + "'";
				break
			}
			if (f.keyword != "") {
				g.sqlParam.attributeFilter = "Name like '%" + f.keyword + "%' and " + a + b
			} else {
				g.sqlParam.attributeFilter = a + b
			}
			h.queryDatasetParams = [g];
			var i = new SuperMap.OSP.Service.QueryByKeywordsParam();
			i.dataSourceName = f.DataSourceName;
			i.queryParam = h;
			i.queryType = 0;
			function e(l) {
				var s = new SuperMap.OSP.Service.POISearchResult();
				if (l && l.currentCount > 0) {
					var n = l.records;
					var r = [];
					for (var p = 0; p < n.length; p++) {
						var m = n[p];
						var q = new SuperMap.OSP.Service.POIInfo();
						for (var o = 0; o < m.fields.length; o++) {
							switch (m.fields[o]) {
							case "SMX":
								q.x = parseFloat(m.fieldValues[o]);
								break;
							case "SMY":
								q.y = parseFloat(m.fieldValues[o]);
								break;
							case "POI_ID":
								q.code = m.fieldValues[o];
								break;
							case "NAME":
								q.name = m.fieldValues[o];
								break;
							case "PY":
								q.pinYin = m.fieldValues[o];
								break;
							case "ZIPCODE":
								q.zipCode = m.fieldValues[o];
								break;
							case "TELEPHONE":
								q.telephone = m.fieldValues[o];
								break;
							case "ADDRESS":
								q.address = m.fieldValues[o];
								break
							}
						}
						q.thirdPartyInfo = m.thirdPartyInfo;
						r.push(q)
					}
					s.currentCount = l.currentCount;
					s.totalCount = l.totalCount;
					s.records = r
				}
				c(s)
			}
			this.search.queryByKeywords(i, e, d)
		},
		getPOIsByGeometry : function (g, f, e) {
			if (SuperMap.OSP.Core.Utility._isEmpty(g)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "POISearch_getPOIsByGeometry_param_getPOIsByGeometryParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(f) || typeof(f) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "POISearch_getPOIsByGeometry_param_onComplete_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(g.geometry)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "POISearch_getPOIsByGeometry_param_getPOIsByGeometryParam_geometry_error"));
				return false
			}
			var c = new SuperMap.OSP.Service.QueryParam();
			c.returnResultSetInfo = SuperMap.REST.QueryOption.ATTRIBUTE;
			c.expectCount = g.expectCount;
			c.startRecord = g.startRecord;
			var a = new SuperMap.OSP.Service.QueryDatasetParam();
			a.name = g.datasetName;
			a.sqlParam = new SuperMap.OSP.Service.SqlParam();
			if (g.coordinate == "m" || g.coordinate == "M") {
				a.sqlParam.returnFields = ["SMID", "SMX", "SMY", "Name", "PY", "POI_ID", "ZipCode", "Address", "Telephone", "Admincode"]
			} else {
				a.sqlParam.returnFields = ["SMID", "SMLLX", "SMLLY", "Name", "PY", "POI_ID", "ZipCode", "Address", "Telephone", "Admincode"]
			}
			a.sqlParam.attributeFilter = "Name like '%" + g.keyword + "%'";
			c.queryDatasetParams = [a];
			var d = new SuperMap.OSP.Service.QueryByGeometryParam();
			d.geometry = g.geometry;
			d.dataSourceName = g.DataSourceName;
			d.queryParam = c;
			function b(h) {
				var r = new SuperMap.OSP.Service.POISearchResult();
				if (h && h.currentCount > 0) {
					var m = h.records;
					var q = [];
					for (var o = 0; o < m.length; o++) {
						var l = m[o];
						var p = new SuperMap.OSP.Service.POIInfo();
						for (var n = 0; n < l.fields.length; n++) {
							switch (l.fields[n]) {
							case "SMX":
								p.x = parseFloat(l.fieldValues[n]);
								break;
							case "SMY":
								p.y = parseFloat(l.fieldValues[n]);
								break;
							case "POI_ID":
								p.code = l.fieldValues[n];
								break;
							case "NAME":
								p.name = l.fieldValues[n];
								break;
							case "PY":
								p.pinYin = l.fieldValues[n];
								break;
							case "ZIPCODE":
								p.zipCode = l.fieldValues[n];
								break;
							case "TELEPHONE":
								p.telephone = l.fieldValues[n];
								break;
							case "ADDRESS":
								p.address = l.fieldValues[n];
								break;
							case "ADMINCODE":
								p.adminCode = parseInt(l.fieldValues[n]);
								break;
							case "AFFILIATION":
								p.affiliation = l.fieldValues[n];
								break
							}
						}
						p.thirdPartyInfo = l.thirdPartyInfo;
						q.push(p)
					}
					r.currentCount = h.currentCount;
					r.totalCount = h.totalCount;
					r.records = q
				}
				f(r)
			}
			this.search.queryByGeometry(d, b, e)
		},
		bufferSearch : function (g, f, e) {
			if (SuperMap.OSP.Core.Utility._isEmpty(g)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "POISearch_bufferSearch_param_bufferSearchParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(f) || typeof(f) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "POISearch_bufferSearch_param_onComplete_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(g.geometry)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "POISearch_bufferSearch_param_bufferSearchParam_geometry_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(g.keyword)) {
				SuperMap.OSP.Core.Utility._alert("getPOIsByType方法的'bufferSearchParam.keyword'");
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "POISearch_bufferSearch_param_bufferSearchParam_keyword_error"));
				return false
			}
			var c = new SuperMap.OSP.Service.QueryParam();
			c.returnResultSetInfo = SuperMap.REST.QueryOption.ATTRIBUTE;
			c.expectCount = g.expectCount;
			c.startRecord = g.startRecord;
			var a = new SuperMap.OSP.Service.QueryDatasetParam();
			a.name = g.datasetName;
			a.sqlParam = new SuperMap.OSP.Service.SqlParam();
			if (g.coordinate == "m" || g.coordinate == "M") {
				a.sqlParam.returnFields = ["SMID", "SMX", "SMY", "Name", "PY", "POI_ID", "ZipCode", "Address", "Telephone"]
			} else {
				a.sqlParam.returnFields = ["SMID", "SMLLX", "SMLLY", "Name", "PY", "POI_ID", "ZipCode", "Address", "Telephone"]
			}
			a.sqlParam.attributeFilter = "typeName = '" + g.typeName + "'";
			c.queryDatasetParams = [a];
			var d = new SuperMap.OSP.Service.QueryByGeometryParam();
			d.geometry = g.geometry;
			d.dataSourceName = g.DataSourceName;
			d.queryParam = c;
			function b(h) {
				var r = new SuperMap.OSP.Service.POISearchResult();
				if (h && h.currentCount > 0) {
					var m = h.records;
					var q = [];
					for (var o = 0; o < m.length; o++) {
						var l = m[o];
						var p = new SuperMap.OSP.Service.POIInfo();
						for (var n = 0; n < l.fields.length; n++) {
							switch (l.fields[n]) {
							case "SMX":
								p.x = parseFloat(l.fieldValues[n]);
								break;
							case "SMY":
								p.y = parseFloat(l.fieldValues[n]);
								break;
							case "POI_ID":
								p.code = l.fieldValues[n];
								break;
							case "NAME":
								p.name = l.fieldValues[n];
								break;
							case "PY":
								p.pinYin = l.fieldValues[n];
								break;
							case "ZIPCODE":
								p.zipCode = l.fieldValues[n];
								break;
							case "TELEPHONE":
								p.telephone = l.fieldValues[n];
								break;
							case "ADDRESS":
								p.address = l.fieldValues[n];
								break
							}
						}
						p.thirdPartyInfo = l.thirdPartyInfo;
						q.push(p)
					}
					r.currentCount = h.currentCount;
					r.totalCount = h.totalCount;
					r.records = q
				}
				f(r)
			}
			this.search.queryByGeometry(g, b, e)
		},
		findAddress : function (f, g, e) {
			if (SuperMap.OSP.Core.Utility._isEmpty(f.geometry)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "POISearch_findAddress_param_findAddressParam_geometry_error"));
				return false
			}
			var c = new SuperMap.OSP.Service.QueryParam();
			c.returnResultSetInfo = SuperMap.REST.QueryOption.ATTRIBUTE;
			c.expectCount = f.expectCount;
			c.startRecord = f.startRecord;
			var a = new SuperMap.OSP.Service.QueryDatasetParam();
			a.name = f.datasetName;
			a.sqlParam = new SuperMap.OSP.Service.SqlParam();
			a.sqlParam.attributeFilter = "";
			a.sqlParam.returnFields = ["NAME", "AFFILIATION"];
			c.queryDatasetParams = [a];
			var d = new SuperMap.OSP.Service.QueryByGeometryParam();
			d.geometry = f.geometry;
			d.dataSourceName = f.dataSourceName;
			d.queryParam = c;
			function b(h) {
				var r = new SuperMap.OSP.Service.POISearchResult();
				if (h && h.currentCount > 0) {
					var m = h.records;
					var q = [];
					for (var o = 0; o < m.length; o++) {
						var l = m[o];
						var p = new SuperMap.OSP.Service.POIInfo();
						for (var n = 0; n < l.fields.length; n++) {
							switch (l.fields[n]) {
							case "NAME":
								p.name = l.fieldValues[n];
								break;
							case "AFFILIATION":
								p.affiliation = l.fieldValues[n];
								break
							}
						}
						p.thirdPartyInfo = l.thirdPartyInfo;
						q.push(p)
					}
					r.currentCount = h.currentCount;
					r.totalCount = h.totalCount;
					r.records = q
				}
				g(r)
			}
			this.search.latlonToAddress(f, b, e)
		},
		CLASS_NAME : "SuperMap.OSP.Service.POISearch"
	});
SuperMap.OSP.Service.POITypeInfo = SuperMap.Class({
		initialize : function () {},
		id : 0,
		name : null,
		code : null,
		parentCode : null,
		level : 0,
		important : 2,
		CLASS_NAME : "SuperMap.OSP.Service.POITypeInfo"
	});
SuperMap.OSP.Service.POITypeSearch = SuperMap.Class({
		initialize : function () {},
		search : new SuperMap.OSP.Service.Search(),
		getTopTypes : function (f, e) {
			if (SuperMap.OSP.Core.Utility._isEmpty(f) || typeof(f) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "POITypeSearch_getTopTypes_param_onComplete_error"));
				return false
			}
			var d = new SuperMap.OSP.Service.QueryParam();
			d.expectCount = -1;
			d.startRecord = 0;
			d.returnResultSetInfo = SuperMap.REST.QueryOption.ATTRIBUTE;
			var a = new SuperMap.OSP.Service.QueryDatasetParam();
			a.name = "PoiType";
			a.sqlParam = new SuperMap.OSP.Service.SqlParam();
			a.sqlParam.returnFields = ["SMID", "Code", "Name", "ParentCode", "UserLevel", "Importance"];
			a.sqlParam.attributeFilter = "UserLevel=1";
			d.queryDatasetParams = [a];
			var c = new SuperMap.OSP.Service.QueryByKeywordsParam();
			c.dataSourceName = SuperMap.OSP.Core._DataSourceName;
			c.queryParam = d;
			function b(g) {
				var l = null;
				if (g && g.currentCount > 0) {
					var m = g.records;
					var q = [];
					for (var o = 0; o < m.length; o++) {
						var h = m[o];
						var p = new SuperMap.OSP.Service.POITypeInfo();
						for (var n = 0; n < h.fields.length; n++) {
							switch (h.fields[n]) {
							case "CODE":
								p.code = h.fieldValues[n];
								break;
							case "PARENTCODE":
								p.parentCode = h.fieldValues[n];
								break;
							case "USERLEVEL":
								p.level = h.fieldValues[n];
								break;
							case "NAME":
								p.name = h.fieldValues[n];
								break;
							case "SMID":
								p.id = h.fieldValues[n];
								break;
							case "IMPORANCE":
								p.important = h.fieldValue[n];
								break
							}
						}
						q.push(p)
					}
					l = q
				}
				f(l)
			}
			this.search.queryByKeywords(c, b, e)
		},
		getChildTypes : function (f, b, h, g) {
			if (SuperMap.OSP.Core.Utility._isEmpty(f)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "POITypeSearch_getChildTypes_param_typeCode_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(h) || typeof(h) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "POITypeSearch_getChildTypes_param_onComplete_error"));
				return false
			}
			var e = new SuperMap.OSP.Service.QueryParam();
			e.expectCount = -1;
			e.startRecord = 0;
			e.returnResultSetInfo = SuperMap.REST.QueryOption.ATTRIBUTE;
			var a = new SuperMap.OSP.Service.QueryDatasetParam();
			a.name = "PoiType";
			a.sqlParam = new SuperMap.OSP.Service.SqlParam();
			a.sqlParam.returnFields = ["SMID", "Code", "Name", "ParentCode", "UserLevel", "Importance"];
			a.sqlParam.attributeFilter = "ParentCode='" + f + "' and UserLevel='" + b + "'";
			e.queryDatasetParams = [a];
			var d = new SuperMap.OSP.Service.QueryByKeywordsParam();
			d.dataSourceName = SuperMap.OSP.Core._DataSourceName;
			d.queryParam = e;
			function c(l) {
				var n = null;
				if (l && l.currentCount > 0) {
					var o = l.records;
					var s = [];
					for (var q = 0; q < o.length; q++) {
						var m = o[q];
						var r = new SuperMap.OSP.Service.POITypeInfo();
						for (var p = 0; p < m.fields.length; p++) {
							switch (m.fields[p]) {
							case "CODE":
								r.code = m.fieldValues[p];
								break;
							case "PARENTCODE":
								r.parentCode = m.fieldValues[p];
								break;
							case "USERLEVEL":
								r.level = m.fieldValues[p];
								break;
							case "NAME":
								r.name = m.fieldValues[p];
								break;
							case "SMID":
								r.id = m.fieldValues[p];
								break;
							case "IMPORANCE":
								r.important = m.fieldValue[p];
								break
							}
						}
						s.push(r)
					}
					n = s
				}
				h(n)
			}
			this.search.queryByKeywords(d, c, g)
		},
		getPOIType : function (e, g, f) {
			if (SuperMap.OSP.Core.Utility._isEmpty(e)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "POITypeSearch_getPOIType_param_typeCode_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(g) || typeof(g) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "POITypeSearch_getPOIType_param_onComplete_error"));
				return false
			}
			var d = new SuperMap.OSP.Service.QueryParam();
			d.expectCount = -1;
			d.startRecord = 0;
			d.returnResultSetInfo = SuperMap.REST.QueryOption.ATTRIBUTE;
			var a = new SuperMap.OSP.Service.QueryDatasetParam();
			a.name = "PoiType";
			a.sqlParam = new SuperMap.OSP.Service.SqlParam();
			a.sqlParam.returnFields = ["SMID", "Code", "Name", "ParentCode", "UserLevel", "Importance"];
			a.sqlParam.attributeFilter = "Code='" + e + "'";
			d.queryDatasetParams = [a];
			var c = new SuperMap.OSP.Service.QueryByKeywordsParam();
			c.dataSourceName = SuperMap.OSP.Core._DataSourceName;
			c.queryParam = d;
			function b(h) {
				var m = null;
				if (h && h.currentCount > 0) {
					var n = h.records;
					var q = new SuperMap.OSP.Service.POITypeInfo();
					for (var p = 0; p < n.length; p++) {
						var l = n[p];
						for (var o = 0; o < l.fields.length; o++) {
							switch (l.fields[o]) {
							case "CODE":
								q.code = l.fieldValues[o];
								break;
							case "PARENTCODE":
								q.parentCode = l.fieldValues[o];
								break;
							case "USERLEVEL":
								q.level = l.fieldValues[o];
								break;
							case "NAME":
								q.name = l.fieldValues[o];
								break;
							case "SMID":
								q.id = l.fieldValues[o];
								break;
							case "IMPORANCE":
								q.important = l.fieldValue[o];
								break
							}
						}
					}
					m = q
				}
				g(m)
			}
			this.search.queryByKeywords(c, b, f)
		},
		CLASS_NAME : "SuperMap.OSP.Service.POITypeInfo"
	});
SuperMap.OSP.Service.DistrictInfo = SuperMap.Class({
		initialize : function () {},
		id : 0,
		name : null,
		code : null,
		parentCode : null,
		level : 0,
		center : new SuperMap.Geometry.Point(0, 0),
		CLASS_NAME : "SuperMap.OSP.Service.DistrictInfo"
	});
SuperMap.OSP.Service.DistrictSearch = SuperMap.Class({
		initialize : function () {},
		search : new SuperMap.OSP.Service.Search(),
		getTopDistricts : function (f, e) {
			if (SuperMap.OSP.Core.Utility._isEmpty(f) || typeof(f) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DistrictSearch_getTopDistricts_param_onComplete_error"));
				return false
			}
			var d = new SuperMap.OSP.Service.QueryParam();
			d.expectCount = -1;
			d.startRecord = 0;
			d.returnResultSetInfo = SuperMap.REST.QueryOption.ATTRIBUTE;
			var a = new SuperMap.OSP.Service.QueryDatasetParam();
			a.name = "BaseDistrict";
			a.sqlParam = new SuperMap.OSP.Service.SqlParam();
			a.sqlParam.returnFields = ["SMID", "AdminCode", "AdminName", "ParentAdminCode", "UserLevel", "X", "Y"];
			a.sqlParam.attributeFilter = "UserLevel=1";
			a.sqlParam.sortClause = "id";
			d.queryDatasetParams = [a];
			var c = new SuperMap.OSP.Service.QueryByKeywordsParam();
			c.dataSourceName = SuperMap.OSP.Core._DataSourceName;
			c.queryParam = d;
			function b(g) {
				var p = null;
				if (g && g.currentCount > 0) {
					var l = g.records;
					var q = [];
					for (var n = 0; n < l.length; n++) {
						var h = l[n];
						var o = new SuperMap.OSP.Service.DistrictInfo();
						for (var m = 0; m < h.fields.length; m++) {
							switch (h.fields[m]) {
							case "X":
								o.center.x = parseFloat(h.fieldValues[m]);
								break;
							case "Y":
								o.center.y = parseFloat(h.fieldValues[m]);
								break;
							case "ADMINCODE":
								o.code = h.fieldValues[m];
								break;
							case "PARENTADMINCODE":
								o.parentCode = h.fieldValues[m];
								break;
							case "USERLEVEL":
								o.level = h.fieldValues[m];
								break;
							case "ADMINNAME":
								o.name = h.fieldValues[m];
								break;
							case "SMID":
								o.id = h.fieldValues[m];
								break
							}
						}
						q.push(o)
					}
					p = q
				}
				f(p)
			}
			this.search.queryByKeywords(c, b, e)
		},
		getChildDistricts : function (d, g, f) {
			if (SuperMap.OSP.Core.Utility._isEmpty(d)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DistrictSearch_getChildDistricts_param_districtCode_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(g) || typeof(g) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DistrictSearch_getChildDistricts_param_onComplete_error"));
				return false
			}
			var e = new SuperMap.OSP.Service.QueryParam();
			e.expectCount = -1;
			e.startRecord = 0;
			e.returnResultSetInfo = SuperMap.REST.QueryOption.ATTRIBUTE;
			var a = new SuperMap.OSP.Service.QueryDatasetParam();
			a.name = "BaseDistrict";
			a.sqlParam = new SuperMap.OSP.Service.SqlParam();
			a.sqlParam.returnFields = ["SMID", "AdminCode", "AdminName", "ParentAdminCode", "UserLevel", "X", "Y"];
			a.sqlParam.attributeFilter = "ParentAdminCode='" + d + "'";
			a.sqlParam.sortClause = "id";
			e.queryDatasetParams = [a];
			var c = new SuperMap.OSP.Service.QueryByKeywordsParam();
			c.dataSourceName = "quanguo";
			c.queryParam = e;
			function b(h) {
				var q = null;
				if (h && h.currentCount > 0) {
					var m = h.records;
					var r = [];
					for (var o = 0; o < m.length; o++) {
						var l = m[o];
						var p = new SuperMap.OSP.Service.DistrictInfo();
						for (var n = 0; n < l.fields.length; n++) {
							switch (l.fields[n]) {
							case "X":
								p.center.x = parseFloat(l.fieldValues[n]);
								break;
							case "Y":
								p.center.y = parseFloat(l.fieldValues[n]);
								break;
							case "ADMINCODE":
								p.code = l.fieldValues[n];
								break;
							case "PARENTADMINCODE":
								p.parentCode = l.fieldValues[n];
								break;
							case "USERLEVEL":
								p.level = l.fieldValues[n];
								break;
							case "ADMINNAME":
								p.name = l.fieldValues[n];
								break;
							case "SMID":
								p.id = l.fieldValues[n];
								break
							}
						}
						r.push(p)
					}
					q = r
				}
				g(q)
			}
			this.search.queryByKeywords(c, b, f)
		},
		getDistrit : function (d, g, f) {
			if (SuperMap.OSP.Core.Utility._isEmpty(d)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DistrictSearch_getDistrit_param_districtCode_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(g) || typeof(g) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "DistrictSearch_getDistrit_param_onComplete_error"));
				return false
			}
			var e = new SuperMap.OSP.Service.QueryParam();
			e.expectCount = -1;
			e.startRecord = 0;
			e.returnResultSetInfo = SuperMap.REST.QueryOption.ATTRIBUTE;
			var a = new SuperMap.OSP.Service.QueryDatasetParam();
			a.name = "BaseDistrict";
			a.sqlParam = new SuperMap.OSP.Service.SqlParam();
			a.sqlParam.returnFields = ["SMID", "AdminCode", "AdminName", "ParentAdminCode", "UserLevel", "X", "Y"];
			a.sqlParam.attributeFilter = "AdminCode='" + d + "'";
			a.sqlParam.sortClause = "id";
			e.queryDatasetParams = [a];
			var c = new SuperMap.OSP.Service.QueryByKeywordsParam();
			c.dataSourceName = SuperMap.OSP.Core._DataSourceName;
			c.queryParam = e;
			function b(h) {
				var q = null;
				if (h && h.currentCount > 0) {
					var m = h.records;
					var p = new SuperMap.OSP.Service.DistrictInfo();
					for (var o = 0; o < m.length; o++) {
						var l = m[o];
						for (var n = 0; n < l.fields.length; n++) {
							switch (l.fields[n]) {
							case "X":
								p.center.x = parseFloat(l.fieldValues[n]);
								break;
							case "Y":
								p.center.y = parseFloat(l.fieldValues[n]);
								break;
							case "ADMINCODE":
								p.code = l.fieldValues[n];
								break;
							case "PARENTADMINCODE":
								p.parentCode = l.fieldValues[n];
								break;
							case "USERLEVEL":
								p.level = l.fieldValues[n];
								break;
							case "ADMINNAME":
								p.name = l.fieldValues[n];
								break;
							case "SMID":
								p.id = l.fieldValues[n];
								break
							}
						}
					}
					q = p
				}
				g(q)
			}
			this.search.queryByKeywords(c, b, f)
		},
		CLASS_NAME : "SuperMap.OSP.Service.DistrictSearch"
	});
SuperMap.OSP.Service.SpatialAnalyst = SuperMap.Class({
		initialize : function () {},
		url : null,
		bufferAnalyst : function (e, c, b, d) {
			if (SuperMap.OSP.Core.Utility._isEmpty(e)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "SpatialAnalyst_bufferAnalyst_param_bufferAnalystParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c) || typeof(c) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "SpatialAnalyst_bufferAnalyst_param_onComplete_error"));
				return false
			}
			if (e.geometry) {
				e.geometry = SuperMap.OSP.Core.Utility._geometryToServer2Geometry(e.geometry)
			} else {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "SpatialAnalyst_bufferAnalyst_param_geometry_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(e.bufferParam)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "SpatialAnalyst_bufferAnalyst_param_bufferAnalystParam_bufferParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(e.geometry)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "SpatialAnalyst_bufferAnalyst_param_bufferAnalystParam_geometry_error"));
				return false
			}
			function a(f) {
				if (f && f.shape) {
					var g = f.shape
				}
				c(f)
			}
			this._queryBase("bufferAnalyst", e, a, b, d)
		},
		isMultiPointInRegion : function (a, d, c, b, f) {
			if (SuperMap.OSP.Core.Utility._isEmpty(a)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "SpatialAnalyst_isMultiPointInRegion_param_points_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(d)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "SpatialAnalyst_isMultiPointInRegion_param_region_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c) || typeof(c) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "SpatialAnalyst_isMultiPointInRegion_param_onComplete_error"));
				return false
			}
			var e = {
				points : a,
				region : d
			};
			this._queryBase("isMultiPointInRegion", e, c, b, f)
		},
		_queryBase : function (b, g, e, d, h) {
			if (SuperMap.OSP.Core.Utility._isEmpty(this.url)) {
				throw new Error(SuperMap.Web.Resources.Resource.getMessage("SuperMap.OSP.Service.Resources", "SpatialAnalyst_filed_url_error"));
				return false
			}
			var f = this.url + SuperMap.OSP.Core._ServiceSuffix;
			function a(i) {
				if (i) {
					if (i.error && typeof(d) == "function") {
						d(i.error)
					}
				}
				e(i.result[0])
			}
			function c(i) {
				if (typeof(d) == "function") {
					var j = new SuperMap.OSP.Service.ErrorResult;
					j.type = SuperMap.OSP.Core.ErrorType.ENVIRONMENT;
					j.information = i;
					d(j)
				}
			}
			SuperMap.OSP.Core.Utility.committer(f, "SpatialAnalyst", b, g, false, a, c, h)
		},
		CLASS_NAME : "SuperMap.OSP.Service.SpatialAnalyst"
	});
SuperMap.OSP.Service.BufferAnalystResult = SuperMap.Class({
		initialize : function () {},
		area : null,
		shape : null,
		perimeter : null,
		CLASS_NAME : "SuperMap.OSP.Service.BufferAnalystResult"
	});
SuperMap.OSP.Service.BufferAnalystParam = SuperMap.Class({
		initialize : function () {},
		dataSourceName : null,
		bufferParam : null,
		geometry : null,
		CLASS_NAME : "SuperMap.OSP.Service.BufferAnalystParam"
	});
SuperMap.OSP.Service.PrintService = SuperMap.Class({
		initialize : function () {},
		printMap : function () {
			window.print()
		},
		CLASS_NAME : "SuperMap.OSP.Service.PrintService"
	});
SuperMap.OSP.Service.MapCorrectInfo = SuperMap.Class({
		initialize : function () {},
		id : 0,
		title : null,
		description : "",
		errorLink : "",
		correctLink : "",
		email : null,
		userId : null,
		createTime : null,
		reviewTime : 0,
		refuseReason : null,
		status : "0",
		CLASS_NAME : "SuperMap.OSP.Service.MapCorrectInfo"
	});
SuperMap.OSP.Service.MapCorrectService = SuperMap.Class({
		initialize : function () {},
		url : null,
		submitMapCorrect : function (a, c, b, d) {
			if (SuperMap.OSP.Core.Utility._isEmpty(a)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByKeywords_param_queryByKeywordsParam_queryParam_returnResultSetInfo_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c) || typeof(c) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByKeywords_param_onComplete_error"));
				return false
			}
			this._queryBase("submitMapCorrection", a, c, b, d)
		},
		findMapCorrects : function (a, b, c, e, d, g) {
			if (SuperMap.OSP.Core.Utility._isEmpty(a)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByKeywords_param_queryByKeywordsParam_queryParam_returnResultSetInfo_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(e) || typeof(e) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByKeywords_param_onComplete_error"));
				return false
			}
			var f = {
				expectCount : a,
				startRecord : b,
				filter : c
			};
			this._queryBase("findMapCorrections", f, e, d, g)
		},
		refuseMapCorrect : function (b, d, c, a, f) {
			if (SuperMap.OSP.Core.Utility._isEmpty(b)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByKeywords_param_queryByKeywordsParam_queryParam_returnResultSetInfo_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c) || typeof(c) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByKeywords_param_onComplete_error"));
				return false
			}
			var e = {
				mapCorrectId : b,
				reason : d
			};
			this._queryBase("refuseMapCorrection", e, c, a, f)
		},
		approveMapCorrect : function (b, c, a, e) {
			if (SuperMap.OSP.Core.Utility._isEmpty(b)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByKeywords_param_queryByKeywordsParam_queryParam_returnResultSetInfo_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c) || typeof(c) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByKeywords_param_onComplete_error"));
				return false
			}
			var d = {
				mapCorrectId : b
			};
			this._queryBase("approveMapCorrection", d, c, a, e)
		},
		deleteMapCorrections : function (c, b, a, e) {
			if (SuperMap.OSP.Core.Utility._isEmpty(c)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByKeywords_param_queryByKeywordsParam_queryParam_returnResultSetInfo_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(b) || typeof(b) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_queryByKeywords_param_onComplete_error"));
				return false
			}
			var d = {
				mapCorrectIds : c
			};
			this._queryBase("deleteMapCorrections", d, b, a, e)
		},
		_queryBase : function (b, f, e, d, g) {
			if (SuperMap.OSP.Core.Utility._isEmpty(this.url)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Search_filed_url_error"));
				return false
			}
			this.dataHandler = this.url + SuperMap.OSP.Core._ServiceSuffix;
			function a(h) {
				if (h) {
					if (h.error && typeof(d) == "function") {
						d(h.error)
					}
				}
				e(h.result[0])
			}
			function c(h) {
				if (typeof(d) == "function") {
					var i = new SuperMap.OSP.Service.ErrorResult;
					i.type = SuperMap.OSP.Core.ErrorType.ENVIRONMENT;
					i.information = h;
					d(i)
				}
			}
			SuperMap.OSP.Core.Utility.committer(this.dataHandler, "MapCorrectService", b, f, false, a, c, g)
		},
		CLASS_NAME : "SuperMap.OSP.Service.MapCorrectInfo"
	});
SuperMap.OSP.Service.SePoint = SuperMap.Class({
		initialize : function () {},
		x : 0,
		y : 0,
		CLASS_NAME : "SuperMap.OSP.Service.SePoint"
	});
SuperMap.OSP.Service.TransportionAnalystParameter = SuperMap.Class({
		initialize : function () {},
		startPoint : new SuperMap.OSP.Service.SePoint(),
		endPoint : new SuperMap.OSP.Service.SePoint(),
		nSearchMode : 0,
		pPntWay : new Array(),
		CLASS_NAME : "SuperMap.OSP.Service.TransportionAnalystParameter"
	});
SuperMap.OSP.Service.FindMultiPathLengtParameter = SuperMap.Class({
		initialize : function () {},
		paths : new Array(),
		CLASS_NAME : "SuperMap.OSP.Service.FindMultiPathLengtParameter"
	});
SuperMap.OSP.Service.FindMultiPathLengtParameterPath = SuperMap.Class({
		initialize : function () {},
		id : 1,
		startPointID : null,
		endPointID : null,
		CLASS_NAME : "SuperMap.OSP.Service.FindMultiPathLengtParameterPath"
	});
SuperMap.OSP.Service.TransportationAnalyst = SuperMap.Class({
		initialize : function () {},
		url : SuperMap.OSP.Core._ServiceUrl,
		findPath : function (d, c, b, e) {
			if (SuperMap.OSP.Core.Utility._isEmpty(d)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "TransportationAnalyst_findPath_param_findPathParameters_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c) || typeof(c) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", ""));
				return false
			}
			if (!d.startPoint) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", ""));
				return false
			}
			if (!d.endPoint) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", ""));
				return false
			}
			function a(g) {
				var o = g.path;
				var n = new Array();
				if (o) {
					for (var m = 0; m < o.parts.length; m++) {
						var l = o.parts[m];
						for (var h = 0; h < l.length; h++) {
							var f = new SuperMap.Geometry.Point(l[h].x, l[h].y);
							n.push(f)
						}
					}
				}
				g.path = n;
				c(g)
			}
			this._queryBase("findPath", d, a, b, e)
		},
		findMultiPathLength : function (c, b, a, d) {
			if (SuperMap.OSP.Core.Utility._isEmpty(c)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "TransportationAnalyst_findPath_param_findPathParameters_error"));
				return false
			}
			this._queryBase("findMultiPathLength", c, b, a, d)
		},
		findPathByOffset : function () {
			if (SuperMap.OSP.Core.Utility._isEmpty(findPathParameters)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "TransportationAnalyst_findPath_param_findPathParameters_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(onComplete) || typeof(onComplete) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", ""));
				return false
			}
			if (!findPathParameters.startPoint) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", ""));
				return false
			}
			if (!findPathParameters.endPoint) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", ""));
				return false
			}
			findPathParameters.startPoint.x = parseFloat(findPathParameters.startPoint.x) + parseFloat(offSetPoint.x);
			findPathParameters.startPoint.y = parseFloat(findPathParameters.startPoint.y) + parseFloat(offSetPoint.y);
			findPathParameters.endPoint.x = parseFloat(findPathParameters.endPoint.x) + parseFloat(offSetPoint.x);
			findPathParameters.endPoint.y = parseFloat(findPathParameters.endPoint.y) + parseFloat(offSetPoint.y);
			function a(c) {
				var h = c.path;
				var d = new SuperMap.Web.Core.GeoLine();
				d.parts = new Array();
				if (h) {
					for (var g = 0; g < h.parts.length; g++) {
						var l = new Array();
						var f = h.parts[g];
						for (var e = 0; e < f.length; e++) {
							var b = new SuperMap.Web.Core.Point2D(f[e].x - parseFloat(offSetPoint.x), f[e].y - parseFloat(offSetPoint.y));
							l.push(b)
						}
						d.parts.push(l)
					}
				}
				c.path = d;
				onComplete(c)
			}
			this._queryBase("findPath", findPathParameters, a, onError, userContext)
		},
		_queryBase : function (b, g, e, d, h) {
			if (SuperMap.OSP.Core.Utility._isEmpty(this.url)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "TransportationAnalyst_filed_url_error"));
				return false
			}
			var f = this.url + SuperMap.OSP.Core._ServiceSuffix;
			function a(i) {
				if (i) {
					if (i.error && typeof(d) == "function") {
						d(i.error)
					}
				}
				e(i.result[0])
			}
			function c(i) {
				if (typeof(d) == "function") {
					var j = new SuperMap.OSP.Service.ErrorResult;
					j.type = SuperMap.OSP.Core.ErrorType.ENVIRONMENT;
					j.information = i;
					d(j)
				}
			}
			SuperMap.OSP.Core.Utility.committer(f, "TransportationAnalyst", b, g, false, a, c, h)
		},
		CLASS_NAME : "SuperMap.OSP.Service.TransportationAnalyst"
	});
SuperMap.OSP.Service.TrafficTransferAnalyst = SuperMap.Class({
		initialize : function () {},
		url : null,
		findTransferPath : function (a, c, b, d) {
			if (SuperMap.OSP.Core.Utility._isEmpty(a)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "TrafficTransferAnalyst_findBusPath_param_BusParams_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c) || typeof(c) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", ""));
				return false
			}
			if (!a.startPoint) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", ""));
				return false
			}
			if (!a.endPoint) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", ""));
				return false
			}
			this._queryBase("findTransferPath", a, c, b, d)
		},
		_queryBase : function (b, g, e, d, h) {
			if (SuperMap.OSP.Core.Utility._isEmpty(this.url)) {
				throw new Error(SuperMap.Web.Resources.Resource.getMessage("SuperMap.OSP.Service.Resources", "TransportationAnalyst_filed_url_error"));
				return false
			}
			var f = this.url + SuperMap.OSP.Core._ServiceSuffix;
			function a(i) {
				if (i) {
					if (i.error && typeof(d) == "function") {
						d(i.error)
					}
				}
				e(i.result[0])
			}
			function c(i) {
				if (typeof(d) == "function") {
					var j = new SuperMap.OSP.Service.ErrorResult;
					j.type = SuperMap.OSP.Core.ErrorType.ENVIRONMENT;
					j.information = i;
					d(j)
				}
			}
			SuperMap.OSP.Core.Utility.committer(f, "TrafficTransferAnalyst", b, g, false, a, c, h)
		},
		CLASS_NAME : "SuperMap.OSP.Service.TrafficTransferAnalyst"
	});
SuperMap.OSP.Service.BusParams = SuperMap.Class({
		initialize : function () {},
		code : null,
		strategy : 0,
		startPoint : new SuperMap.OSP.Service.SePoint(),
		endPoint : new SuperMap.OSP.Service.SePoint(),
		CLASS_NAME : "SuperMap.OSP.Service.BusParams"
	});
SuperMap.OSP.Service.Utility.CoordinateService = SuperMap.Class({
		initialize : function () {},
		url : null,
		convertGPS2SM : function (d, c, b, e) {
			if (SuperMap.OSP.Core.Utility._isEmpty(d)) {
				SuperMap.OSP.Core.Utility._alert("");
				return false
			}
			function a(f) {
				if (f && f.currentCount > 0) {
					for (var h = 0; h < f.records.length; h++) {
						var g = f.records[h];
						if (g.shape) {
							g.shape = SuperMap.OSP.Core.Utility._server2GeometryToClientGeometry(g.shape);
							if (g.center) {
								g.center = new SuperMap.Web.Core.Point2D(g.center.x, g.center.y)
							}
						}
					}
				}
				c(f)
			}
			this._queryBase("convertGPS2SM", d, a, b, e)
		},
		convertGPS2SMs : function (e, c, b, d) {
			if (SuperMap.OSP.Core.Utility._isEmpty(e)) {
				return false
			}
			function a(f) {
				if (f && f.currentCount > 0) {
					for (var h = 0; h < f.records.length; h++) {
						var g = f.records[h];
						if (g.shape) {
							g.shape = SuperMap.OSP.Core.Utility._server2GeometryToClientGeometry(g.shape);
							if (g.center) {
								g.center = new SuperMap.Web.Core.Point2D(g.center.x, g.center.y)
							}
						}
					}
				}
				c(f)
			}
			this._queryBase("convertGPS2SMs", e, a, b, d)
		},
		_queryBase : function (b, f, e, d, g) {
			if (SuperMap.OSP.Core.Utility._isEmpty(this.url)) {
				return false
			}
			this.dataHandler = this.url + SuperMap.OSP.Core._ServiceSuffix;
			function a(h) {
				if (h) {
					if (h.error && typeof(d) == "function") {
						d(h.error)
					}
				}
				e(h.result[0])
			}
			function c(h) {
				if (typeof(d) == "function") {
					var i = new SuperMap.OSP.Service.ErrorResult;
					i.type = SuperMap.OSP.Core.ErrorType.ENVIRONMENT;
					i.information = h;
					d(i)
				}
			}
			SuperMap.OSP.Core.Utility.committer(this.dataHandler, "CoordinateService", b, f, false, a, c, g)
		},
		CLASS_NAME : "SuperMap.OSP.Service.Utility.CoordinateService"
	});
SuperMap.OSP.Utility.Resource = function () {};
SuperMap.OSP.Utility.Resource.locale = "zh_cn";
SuperMap.OSP.Utility.Resource.getMessage = function (bundleName, key, message) {
	var res = eval(bundleName + "." + SuperMap.OSP.Utility.Resource.locale + "." + key);
	res = res.replace("<message>", message);
	return res
};
SuperMap.OSP.Utility.Geometry = SuperMap.Class({
		initialize : function () {},
		point2Ds : new Array(),
		CLASS_NAME : "SuperMap.OSP.Utility.Geometry"
	});
SuperMap.OSP.UI.Resources = SuperMap.Class({
		initialize : function () {},
		CLASS_NAME : "SuperMap.OSP.UI.Resources"
	});
SuperMap.OSP.UI.Resources.zh_cn = {
	POI_Constructor_parameterError : "",
	POI_toEditHtml_tdTitle : "",
	POI_toEditHtml_tdCoordX : "X",
	POI_toEditHtml_tdCoordY : "Y",
	POI_toEditHtml_inputSave : "",
	POI_toEditHtml_inputCancel : "",
	POIGroup_Constructor_parameterError : "",
	POIGroup_addPOIs_parameterError : "",
	POIGroup_editPOI_parameterError : "",
	POIManager_Constructor_parameterError : "",
	POIManager_poiShow_poiEdit : "",
	POIManager_poiShow_poiRemove : "",
	POIManager_poiShow_poiMove : "",
	POIManager_poiEdit_varPanelTitle : "",
	POIManager_updateEditPoi_varSmxOrSmyIsNaN : "",
	POIManager_addPOIGroup_parameterError : "",
	POIManager_editPOIGroup_parameterError : "",
	POIPanel_html_imgCloseAlt : "",
	AutoComplete_show_tdCloseLink : "",
	POIServer_findPoisByGroupId_serverGroupId : "",
	POIServer_savePois_serverGroupId : "",
	POIServer_savePois_pois : "",
	POIServer_updatePois_pois : "",
	POIServer_updatePois_serverGroupId : "",
	POIServer_deletePoi_poiId : "",
	POIServer_deletePois_poiIds : "",
	POIServer_savePOIGroup_poiGroup : "",
	POIServer_updatePOIGroup_poiGroup : "",
	POIServer_deletePOIGroup_poiGroup : "",
	POIServer_filed_dataHandler_error : ""
};
SuperMap.OSP.UI.ScaledContent = SuperMap.Class({
		initialize : function () {},
		content : null,
		offset : SuperMap.OSP.Core.Point2D(0, 0),
		CLASS_NAME : "SuperMap.OSP.UI.ScaledContent"
	});
SuperMap.OSP.UI.POI = SuperMap.Class({
		initialize : function (a) {
			if (typeof(a) == "string") {
				this.id = a
			} else {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.UI.Resources", "POI_Constructor_parameterError"))
			}
			this._events = [];
			this._eventNames = []
		},
		position : new SuperMap.Geometry.Point(0, 0),
		title : "",
		imageSize : new SuperMap.Size(0, 0),
		scaledContents : "",
		properties : new Object(),
		visible : true,
		isPublic : true,
		serverId : 0,
		serverGroupId : 0,
		addEventListerner : function (c, a) {
			if (c == "click" || c == "dblclick" || c == "mouseover" || c == "mouseout" || c == "mousedown" || c == "mouseup" || c == "mousemove") {
				var b = false;
				for (var d = 0; d < this._eventNames.length; d++) {
					if (this._eventNames[d] == c) {
						b = true;
						break
					}
				}
				if (b) {
					this._events.remove(a);
					this._events.push(a)
				} else {
					this._eventNames.push(c);
					this._events.push(a)
				}
			}
		},
		removeEventListerner : function (a) {
			if (a == "click" || a == "dblClick" || a == "mouseOver" || a == "mouseOut" || a == "mouseDown" || a == "mouseUp" || a == "mouseMove") {
				var c = this._eventNames;
				this._eventNames = [];
				for (var b = 0; b < c.length; b++) {
					if (c[b] != a) {
						this._eventNames.push(c[b])
					} else {
						this._events = []
					}
				}
			}
		},
		clone : function () {
			var a = new SuperMap.OSP.UI.POI(this.id + "clone");
			a.position = new SuperMap.Geometry.Point(this.position.x, this.position.y);
			a.title = this.title;
			a.properties = this.properties;
			a.visible = this.visible;
			a.isPublic = this.isPublic;
			a.serverId = this.serverId;
			if (this.scaledContents && typeof(this.scaledContents.content) == "string") {
				a.scaledContents = new SuperMap.OSP.UI.ScaledContent();
				a.scaledContents.content = this.scaledContents.content;
				a.scaledContents.offset.x = this.scaledContents.offset.x;
				a.scaledContents.offset.y = this.scaledContents.offset.y
			} else {
				if (this.scaledContents && this.scaledContents._size > 0) {
					a.scaledContents = new SuperMap.OSP.Core.HashMap();
					a.scaledContents._size = this.scaledContents._size;
					a.scaledContents._entry = this.scaledContents._entry
				}
			}
			return a
		},
		_toJson : function () {
			var a = "{";
			var b = 0;
			for (var c in this.properties) {
				if (typeof(c) == "function") {
					continue
				}
				a += c + ':"' + this.properties[c] + '",';
				b++
			}
			if (b > 0) {
				a = a.substring(0, a.length - 1)
			} else {
				a += "osp:''"
			}
			a += "}";
			return a
		},
		CLASS_NAME : "SuperMap.OSP.UI.POI"
	});
SuperMap.OSP.UI.POIGroup = SuperMap.Class({
		initialize : function (a) {
			if (typeof(a) == "string") {
				this.id = a;
				this.pois = []
			} else {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.UI.Resources", "POIGroup_Constructor_parameterError"))
			}
		},
		level : 1,
		visible : true,
		minScale : 0,
		maxScale : 1,
		scaledContents : null,
		caption : this.id,
		serverId : 0,
		isPublic : true,
		userGroupId : 0,
		getPOIs : function (c) {
			var b = null;
			for (var a = 0; a < this.pois.length; a++) {
				if (c == this.pois[a].id) {
					b = this.pois[a];
					break
				}
			}
			return b
		},
		addPOIs : function (e) {
			if (typeof(e) == "object" && typeof(e.length) != "undefined") {
				for (var c = 0; c < e.length; c++) {
					var d = false;
					for (var b = 0, a = this.pois.length; b < a; b++) {
						if (e[c].id == this.pois[b].id) {
							d = true;
							break
						}
					}
					if (!d) {
						this.pois.push(e[c])
					}
				}
			} else {
				if (typeof(e) == "object" && typeof(e.id) == "string") {
					var d = false;
					for (var b = 0, a = this.pois.length; b < a; b++) {
						if (e.id == this.pois[b].id) {
							d = true;
							break
						}
					}
					if (!d) {
						this.pois.push(e)
					}
				} else {
					throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.UI.Resources", "POIGroup_addPOIs_parameterError"))
				}
			}
		},
		removePOIs : function (d) {
			if (typeof(d) == "object" && typeof(d.length) != "undefined") {
				var e = this.pois;
				for (var c = 0; c < d.length; c++) {
					for (var b = 0, a = e.length; b < a; b++) {
						if (e[b] != null && d[c].id == e[b].id) {
							e[b] = null;
							break
						}
					}
				}
				this.pois = [];
				for (var b = 0, a = e.length; b < a; b++) {
					if (e[b] != null) {
						this.pois.push(e[b])
					}
				}
				e = null
			} else {
				if (typeof(d) == "object" && typeof(d.id) == "string") {
					var e = this.pois;
					this.pois = [];
					for (var b = 0, a = e.length; b < a; b++) {
						if (e[b] != null && e[b].id == d.id) {
							e[b] = null
						} else {
							this.pois.push(e[b])
						}
					}
					e = null
				} else {
					if (typeof(d) == "string") {
						var e = this.pois;
						this.pois = [];
						for (var b = 0, a = e.length; b < a; b++) {
							if (e[b] != null && e[b].id == d) {
								e[b] = null
							} else {
								this.pois.push(e[b])
							}
						}
						e = null
					}
				}
			}
		},
		editPOI : function (e) {
			if (typeof(e) == "object" && typeof(e.length) != "undefined") {
				for (var c = 0; c < e.length; c++) {
					var d = false;
					for (var b = 0, a = this.pois.length; b < a; b++) {
						if (e[c].id == this.pois[b].id) {
							this.pois[b] = e[c];
							break
						}
					}
				}
			} else {
				if (typeof(e) == "object" && typeof(e.id) == "string") {
					for (var b = 0, a = this.pois.length; b < a; b++) {
						if (this.pois[b] == e.id) {
							this.pois[b] = e;
							break
						}
					}
				} else {
					throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.UI.Resources", "POIGroup_editPOI_parameterError"))
				}
			}
		},
		clone : function () {
			var b = new SuperMap.OSP.UI.POIGroup(this.id + "_clone");
			b.level = this.level;
			b.visible = this.visible;
			b.maxScale = this.maxScale;
			b.minScale = this.minScale;
			if (this.scaledContents && typeof(this.scaledContents.content) == "string") {
				b.scaledContents = new SuperMap.OSP.UI.ScaledContent();
				b.scaledContents.content = this.scaledContents.content;
				b.scaledContents.offset.x = this.scaledContents.offset.x;
				b.scaledContents.offset.y = this.scaledContents.offset.y
			} else {
				if (this.scaledContents && this.scaledContents._size > 0) {
					b.scaledContents = new SuperMap.OSP.Core.HashMap();
					b.scaledContents._size = this.scaledContents._size;
					b.scaledContents._entry = this.scaledContents._entry
				}
			}
			b.caption = this.caption;
			b.serverId = this.serverId;
			b.isPublic = this.isPublic;
			b.userGroupId = this.userGroupId;
			if (this.pois) {
				b.pois = [];
				for (var a = 0; a < this.pois.length; a++) {
					b.pois.push(this.pois[a].clone())
				}
			}
			return b
		},
		clearPOIs : function () {
			this.pois = []
		},
		CLASS_NAME : "SuperMap.OSP.UI.POIGroup"
	});
SuperMap.OSP.UI.POIManager = SuperMap.Class({
		initialize : function (a) {
			if (a != null) {
				this.map = a
			} else {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.UI.Resources", "POIManager_Constructor_parameterError"))
			}
		},
		poiGroups : [],
		markerLayer : null,
		_oldPois : [],
		_initViewChanged : false,
		_pid : null,
		_gid : null,
		_offsetX : 0,
		_offsetY : 0,
		customerFun : function () {},
		refreshPOI : function () {
			var y = this;
			if (!y._initViewChanged) {
				y.map.events.register("moveend ", {}, function () {
					y.refreshPOI()
				});
				y._initViewChanged = true;
				y.refreshPOI()
			} else {
				var c = false;
				y.markerLayer.clearMarkers();
				y.customerFun();
				y._oldPois = [];
				for (var o = 0; o < y.poiGroups.length; o++) {
					var u = y.poiGroups[o];
					var t = u.id;
					var d = u.minScale;
					var a = u.maxScale;
					var n = u.level;
					var w = u.visible;
					var e = u.scaledContents;
					var f = u.poiOffset;
					if (w && c >= d && c <= a) {
						for (var q = 0, g = u.pois.length; q < g; q++) {
							var p = u.pois[q];
							if (p.visible) {
								var z = null;
								var h = null;
								if (p.scaledContents && p.scaledContents.size) {
									var b = p.scaledContents.get(c);
									z = b.content;
									h = b.offset
								} else {
									if (p.scaledContents && p.scaledContents.content && typeof(p.scaledContents.content) == "string") {
										var b = p.scaledContents;
										z = b.content;
										h = b.offset
									} else {
										if (e && e.size) {
											var b = e.get(c);
											z = b.content;
											h = b.offset
										} else {
											if (e && e.content && typeof(e.content) == "string") {
												var b = e;
												z = b.content;
												h = b.offset
											}
										}
									}
								}
								var s = p.id;
								if (p.imageSize.h == 0 && p.imageSize.w == 0) {
									p.imageSize.h = 25;
									p.imageSize.w = 30;
									if (p.scaledContents.offset.x != 0 || p.scaledContents.offset.y != 0) {
										var l = new SuperMap.Pixel(p.scaledContents.offset.x, p.scaledContents.offset.y);
										var v = new SuperMap.Icon(z, p.imageSize, l)
									} else {
										var v = new SuperMap.Icon(z, p.imageSize)
									}
								} else {
									if (p.scaledContents.offset.x != 0 || p.scaledContents.offset.y != 0) {
										var l = new SuperMap.Pixel(p.scaledContents.offset.x, p.scaledContents.offset.y);
										var v = new SuperMap.Icon(z, p.imageSize, l)
									} else {
										var v = new SuperMap.Icon(z, p.imageSize)
									}
								}
								var x = new SuperMap.Marker(new SuperMap.LonLat(p.position.x, p.position.y), v);
								x.events.element.id = s;
								x.events.element.title = p.title;
								if (p.scaledContents.content.substr(0, 1) == "<") {
									x.events.element.innerHTML = p.scaledContents.content
								}
								if (p._eventNames.length != 0 && p._events.length != 0) {
									for (var r = 0; r < p._events.length; r++) {
										x.events.register(p._eventNames[r], p, p._events[r])
									}
								}
								y.markerLayer.addMarker(x);
								y._oldPois.push({
									id : s,
									markerLayer : y.markerLayer
								})
							}
						}
					}
				}
			}
		},
		getPOIGroup : function (c) {
			var b = null;
			for (var a = 0; a < this.poiGroups.length; a++) {
				if (c == this.poiGroups[a].id) {
					b = this.poiGroups[a];
					break
				}
			}
			return b
		},
		addPOIGroup : function (f) {
			var e = false;
			if (typeof(f) == "object" && typeof(f.length) != "undefined") {
				for (var c = 0; c < f.length; c++) {
					var d = false;
					for (var b = 0, a = this.poiGroups.length; b < a; b++) {
						if (f[c].id == this.poiGroups[b].id) {
							d = true;
							break
						}
					}
					if (!d) {
						this.poiGroups.push(f[c])
					}
				}
				e = true
			} else {
				if (typeof(f) == "object" && typeof(f.id) == "string") {
					var d = false;
					for (var b = 0, a = this.poiGroups.length; b < a; b++) {
						if (f.id == this.poiGroups[b].id) {
							d = true;
							break
						}
					}
					if (!d) {
						this.poiGroups.push(f)
					}
					e = true
				} else {
					e = false;
					throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.UI.Resources", "POIManager_addPOIGroup_parameterError"))
				}
			}
			if (e) {}

		},
		removePOIGroup : function (f) {
			var b = false;
			if (typeof(f) == "object" && typeof(f.length) != "undefined") {
				var d = this.poiGroups;
				for (var e = 0; e < f.length; e++) {
					for (var c = 0, a = d.length; c < a; c++) {
						if (d[c] != null && f[e].id == d[c].id) {
							d[c] = null;
							break
						}
					}
				}
				this.poiGroups = [];
				for (var c = 0, a = d.length; c < a; c++) {
					if (d[c] != null) {
						this.poiGroups.push(d[c])
					}
				}
				d = null;
				b = true
			} else {
				if (typeof(f) == "object" && typeof(f.id) == "string") {
					var d = this.poiGroups;
					this.poiGroups = [];
					for (var c = 0, a = d.length; c < a; c++) {
						if (d[c] != null && d[c].id == f.id) {
							d[c] = null
						} else {
							this.poiGroups.push(d[c])
						}
					}
					d = null;
					b = true
				} else {
					if (typeof(f) == "string") {
						var d = this.poiGroups;
						this.poiGroups = [];
						for (var c = 0, a = d.length; c < a; c++) {
							if (d[c] != null && d[c].id == f) {
								d[c] = null
							} else {
								this.poiGroups.push(d[c])
							}
						}
						d = null;
						b = true
					}
				}
			}
			if (b) {}

		},
		editPOIGroup : function (f) {
			var e = false;
			if (typeof(f) == "object" && typeof(f.length) != "undefined") {
				for (var c = 0; c < f.length; c++) {
					var d = false;
					for (var b = 0, a = this.poiGroups.length; b < a; b++) {
						if (f[c].id == this.poiGroups[b].id) {
							this.poiGroups[b] = f[c];
							break
						}
					}
				}
				e = true
			} else {
				if (typeof(f) == "object" && typeof(f.id) == "string") {
					for (var b = 0, a = this.poiGroups.length; b < a; b++) {
						if (this.poiGroups[b] == f.id) {
							this.poiGroups[b] = f;
							break
						}
					}
					e = true
				} else {
					throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.UI.Resources", "POIManager_editPOIGroup_parameterError"))
				}
			}
			if (e) {}

		},
		CLASS_NAME : "SuperMap.OSP.UI.POIManager"
	});
SuperMap.OSP.UI.POIService = SuperMap.Class({
		initialize : function () {},
		url : null,
		findPois : function (b, c, d, f, e, h) {
			if (isNaN(b)) {
				b = 10
			}
			if (isNaN(c)) {
				c = 0
			}
			if (typeof(d) != "string") {
				d = ""
			}
			function a(i) {
				if (i && i.currentCount > 0) {
					i.pois = SuperMap.OSP.UI.POIService._restorePois(i.pois)
				}
				f(i)
			}
			var g = {
				expectCount : b,
				startRecord : c,
				filter : d
			};
			this._queryBase("findPois", g, a, e, h)
		},
		findPoisByGroupId : function (d, b, c, f, e, h) {
			if (SuperMap.OSP.Core.Utility._isEmpty(d)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "POIServer_findPoisByGroupId_serverGroupId"));
				return false
			}
			if (isNaN(b)) {
				b = 10
			}
			if (isNaN(c)) {
				c = 0
			}
			function a(i) {
				if (i) {
					if (i && i.currentCount > 0) {
						i.pois = SuperMap.OSP.UI.POIService._restorePois(i.pois)
					}
				}
				f(i)
			}
			var g = {
				expectCount : b,
				startRecord : c,
				serverGroupId : d
			};
			this._queryBase("findPoisByGroupId", g, a, e, h)
		},
		findPOIGroups : function (b, d, c, f) {
			if (typeof(b) != "string") {
				b = ""
			}
			function a(g) {
				if (g && g.length > 0) {
					var h = [];
					for (var j = 0; j < g.length; j++) {
						var l = SuperMap.OSP.UI.POIService._restorePoiGroup(g[j]);
						h.push(l)
					}
					g = h
				}
				d(g)
			}
			var e = {
				filter : b
			};
			this._queryBase("findPOIGroups", e, a, c, f)
		},
		savePois : function (b, d, e, c, g) {
			if (SuperMap.OSP.Core.Utility._isEmpty(b)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.UI.Resources", "POIServer_savePois_serverGroupId"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(d)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.UI.Resources", "POIServer_savePois_pois"));
				return false
			}
			d = this._filterPois(d);
			function a(h) {
				if (h) {
					var i = SuperMap.OSP.UI.POIService._restorePois(h);
					e(i)
				}
			}
			var f = {
				serverGroupId : b,
				pois : d
			};
			this._queryBase("savePois", f, a, c, g)
		},
		updatePois : function (a, c, d, b, f) {
			if (SuperMap.OSP.Core.Utility._isEmpty(c)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.UI.Resources", "POIServer_updatePois_pois"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(a)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.UI.Resources", "POIServer_updatePois_serverGroupId"));
				return false
			}
			c = this._filterPois(c);
			var e = {
				serverGroupId : a,
				pois : c
			};
			this._queryBase("updatePois", e, d, b, f)
		},
		deletePoi : function (c, b, a, e) {
			if (SuperMap.OSP.Core.Utility._isEmpty(c)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.UI.Resources", "POIServer_deletePoi_poiId"));
				return false
			}
			var d = {
				poiId : c
			};
			this._queryBase("deletePoi", d, b, a, e)
		},
		deletePois : function (a, c, b, e) {
			if (SuperMap.OSP.Core.Utility._isEmpty(a)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.UI.Resources", "POIServer_deletePois_poiIds"));
				return false
			}
			var d = {
				poiIds : a
			};
			this._queryBase("deletePois", d, c, b, e)
		},
		savePOIGroup : function (c, d, b, e) {
			if (SuperMap.OSP.Core.Utility._isEmpty(c)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.UI.Resources", "POIServer_savePOIGroup_poiGroup"));
				return false
			}
			c = this._filterPOIGroup(c);
			function a(f) {
				if (f) {
					f = SuperMap.OSP.UI.POIService._restorePoiGroup(f)
				}
				d(f)
			}
			this._queryBase("savePOIGroup", c, a, b, e)
		},
		updatePOIGroup : function (b, c, a, d) {
			if (SuperMap.OSP.Core.Utility._isEmpty(b)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.UI.Resources", "POIServer_updatePOIGroup_poiGroup"));
				return false
			}
			b = this._filterPOIGroup(b);
			this._queryBase("updatePOIGroup", b, c, a, d)
		},
		deletePOIGroup : function (a, c, b, e) {
			if (SuperMap.OSP.Core.Utility._isEmpty(a)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.UI.Resources", "POIServer_deletePOIGroup_poiGroup"));
				return false
			}
			var d = {
				serverGroupId : a
			};
			this._queryBase("deletePOIGroup", d, c, b, e)
		},
		_queryBase : function (b, f, e, d, g) {
			if (SuperMap.OSP.Core.Utility._isEmpty(this.url)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.UI.Resources", "POIServer_filed_dataHandler_error"));
				return false
			}
			this.dataHandler = this.url + SuperMap.OSP.Core._ServiceSuffix;
			function a(h) {
				if (h) {
					if (h.error && typeof(d) == "function") {
						d(h.error)
					}
				}
				e(h.result[0])
			}
			function c(h) {
				if (typeof(d) == "function") {
					var i = new SuperMap.OSP.Service.ErrorResult;
					i.type = SuperMap.OSP.Core.ErrorType.ENVIRONMENT;
					i.information = h;
					d(i)
				}
			}
			SuperMap.OSP.Core.Utility.committer(this.dataHandler, "POIService", b, f, false, a, c, g)
		},
		_filterPois : function (b) {
			if (b && b.length > 0) {
				for (var a = 0; a < b.length; a++) {
					b[a]._events = null;
					b[a]._eventNames = null
				}
			}
			return b
		},
		_filterPOIGroup : function (a) {
			if (a && a.pois) {
				a.pois = null
			}
			return a
		},
		CLASS_NAME : "SuperMap.OSP.UI.POIService"
	});
SuperMap.OSP.UI.POIService._restorePois = function (poisStr) {
	var pois = [];
	if (poisStr) {
		var backPois = poisStr;
		if (backPois && backPois.length > 0) {
			for (var i = 0; i < backPois.length; i++) {
				var poi = backPois[i];
				var newpoi = new SuperMap.OSP.UI.POI("osp_temp_poiId_" + i + "_" + poi.serverId);
				if (poi.id) {
					newpoi.id = poi.id
				}
				newpoi.title = poi.title;
				newpoi.isPublic = poi.isPublic;
				newpoi.serverId = poi.serverId;
				newpoi.visible = poi.visible;
				newpoi.serverGroupId = poi.serverGroupId;
				if (poi.position && poi.position.x) {
					newpoi.position = new SuperMap.Geometry.Point(poi.position.x, poi.position.y)
				}
				if (backPois[i] && backPois[i].scaledContents) {
					var scaledContents = eval("(" + poi.scaledContents + ")");
					backPois[i].scaledContents = scaledContents;
					if (scaledContents && scaledContents.content) {
						newpoi.scaledContents = new SuperMap.OSP.UI.ScaledContent();
						var point = new SuperMap.Geometry.Point(0, 0);
						if (scaledContents.offset && scaledContents.offset.x) {
							point.x = scaledContents.offset.x;
							point.y = scaledContents.offset.y
						}
						newpoi.scaledContents.content = scaledContents.content;
						newpoi.scaledContents.offset = point
					}
					if (scaledContents && scaledContents._size) {
						newpoi.scaledContents = new SuperMap.OSP.Core.HashMap();
						newpoi.scaledContents._entry = scaledContents._entry
					}
				}
				if (backPois[i] && backPois[i].properties) {
					newpoi.properties = eval("(" + poi.properties + ")")
				}
				pois.push(newpoi)
			}
		}
		return pois
	}
};
SuperMap.OSP.UI.POIService._restorePoiGroup = function (poiGroup) {
	var newPOIGroup = new SuperMap.OSP.UI.POIGroup("osp_temp_poiGrouoId_" + poiGroup.serverId);
	if (poiGroup.id) {
		newPOIGroup.id = poiGroup.id
	}
	newPOIGroup.level = poiGroup.level;
	newPOIGroup.visible = poiGroup.visible;
	newPOIGroup.maxScale = poiGroup.maxScale;
	newPOIGroup.minScale = poiGroup.minScale;
	newPOIGroup.caption = poiGroup.caption;
	newPOIGroup.serverId = poiGroup.serverId;
	newPOIGroup.isPublic = poiGroup.isPublic;
	newPOIGroup.userGroupId = poiGroup.userGroupId;
	if (poiGroup.scaledContents) {
		var scaledContents = eval("(" + poiGroup.scaledContents + ")");
		if (scaledContents && scaledContents.content) {
			newPOIGroup.scaledContents = new SuperMap.OSP.UI.ScaledContent();
			var point = new SuperMap.Geometry.Point(0, 0);
			if (scaledContents.offset && scaledContents.offset.x) {
				point.x = scaledContents.offset.x;
				point.y = scaledContents.offset.y
			}
			newPOIGroup.scaledContents.content = scaledContents.content;
			newPOIGroup.scaledContents.offset = point
		}
		if (scaledContents && scaledContents._size) {
			newPOIGroup.scaledContents = new SuperMap.OSP.Core.HashMap();
			newPOIGroup.scaledContents._entry = scaledContents._entry
		}
	}
	return newPOIGroup
};
function OspPager(b, a) {
	this.name = b;
	this.page = 1;
	this.pageCount = 1;
	this.argName = "page";
	this.showTimes = 1;
	this.doChangePageFun = a
}
OspPager.prototype.checkPages = function () {
	if (isNaN(parseInt(this.page))) {
		this.page = 1
	}
	if (isNaN(parseInt(this.pageCount))) {
		this.pageCount = 1
	}
	if (this.page < 1) {
		this.page = 1
	}
	if (this.pageCount < 1) {
		this.pageCount = 1
	}
	if (this.page > this.pageCount) {
		this.page = this.pageCount
	}
	this.page = parseInt(this.page);
	this.pageCount = parseInt(this.pageCount)
};
OspPager.prototype.createHtml = function (e) {
	var f = "",
	c = this.page - 1,
	b = this.page + 1;
	f += '<div class="' + e + '">';
	if (c < 1) {
		f += '<span title="Prev Page" class="disabled">&#8249;</span>'
	} else {
		f += '<span title="Prev Page"><a href="javascript:' + this.name + ".toPage(" + c + ');">&#8249;</a></span>'
	}
	if (this.page != 1) {
		f += '<span title="Page 1"><a href="javascript:' + this.name + '.toPage(1);">1</a></span>'
	}
	if (this.page >= 5) {
		f += "<span>...</span>"
	}
	if (this.pageCount > this.page + 2) {
		var a = this.page + 2
	} else {
		var a = this.pageCount
	}
	for (var d = this.page - 1; d <= a; d++) {
		if (d > 0) {
			if (d == this.page) {
				f += '<span title="Page ' + d + '" class="current">' + d + "</span>"
			} else {
				if (d != 1 && d != this.pageCount) {
					f += '<span title="Page ' + d + '"><a href="javascript:' + this.name + ".toPage(" + d + ');">' + d + "</a></span>"
				}
			}
		}
	}
	if (this.page + 3 < this.pageCount) {
		f += "<span>...</span>"
	}
	if (this.page != this.pageCount) {
		f += '<span title="Page ' + this.pageCount + '"><a href="javascript:' + this.name + ".toPage(" + this.pageCount + ');">' + this.pageCount + "</a></span>"
	}
	if (b > this.pageCount) {
		f += '<span title="Next Page" class="disabled">&#8250;</span>'
	} else {
		f += '<span title="Next Page"><a href="javascript:' + this.name + ".toPage(" + b + ');">&#8250;</a></span>'
	}
	f += "</div><br />";
	return f
};
OspPager.prototype.toPage = function (b) {
	var a = 1;
	if (typeof(b) == "object") {
		a = b.options[b.selectedIndex].value
	} else {
		a = b
	}
	if (isNaN(parseInt(b))) {
		b = 1
	}
	if (b < 1) {
		b = 1
	}
	if (b > this.pageCount) {
		b = this.pageCount
	}
	this.page = b;
	this.doChangePageFun(b);
	this.printHtml(this.mode, this.pageDiv)
};
OspPager.prototype.printHtml = function (b, a) {
	this.mode = b;
	this.pageDiv = a;
	this.checkPages();
	this.showTimes += 1;
	document.getElementById(this.pageDiv).setAttribute("class", "pages");
	document.getElementById(this.pageDiv).innerHTML = this.createHtml(b)
};
OspPager.prototype.reset = function () {
	this.page = 1;
	this.pageCount = 1;
	this.argName = "page";
	this.showTimes = 1
};
function Node(c, f, a, b, i, g, h, d, e) {
	this.id = c;
	this.pid = f;
	this.name = a;
	this.url = b;
	this.title = i;
	this.target = g;
	this.icon = h;
	this.iconOpen = d;
	this._io = e || false;
	this._is = false;
	this._ls = false;
	this._hc = false;
	this._ai = 0;
	this._p
}
function OspTree(a) {
	this.config = {
		target : null,
		folderLinks : true,
		useSelection : true,
		useCookies : true,
		useLines : true,
		useIcons : true,
		useStatusText : false,
		closeSameLevel : false,
		inOrder : false
	};
	this.icon = {
		root : "images/base.gif",
		folder : "images/folder.gif",
		folderOpen : "images/folderopen.gif",
		node : "images/page.gif",
		empty : "images/empty.gif",
		line : "images/line.gif",
		join : "images/join.gif",
		joinBottom : "images/joinbottom.gif",
		plus : "images/plus.gif",
		plusBottom : "images/plusbottom.gif",
		minus : "images/minus.gif",
		minusBottom : "images/minusbottom.gif",
		nlPlus : "images/nolines_plus.gif",
		nlMinus : "images/nolines_minus.gif"
	};
	this.obj = a;
	this.aNodes = [];
	this.aIndent = [];
	this.root = new Node(-1);
	this.selectedNode = null;
	this.selectedFound = false;
	this.completed = false
}
OspTree.prototype.add = function (c, f, a, b, i, g, h, d, e) {
	this.aNodes[this.aNodes.length] = new Node(c, f, a, b, i, g, h, d, e)
};
OspTree.prototype.openAll = function () {
	this.oAll(true)
};
OspTree.prototype.closeAll = function () {
	this.oAll(false)
};
OspTree.prototype.toString = function () {
	var a = '<div class="dtree">\n';
	if (document.getElementById) {
		if (this.config.useCookies) {
			this.selectedNode = this.getSelected()
		}
		a += this.addNode(this.root)
	} else {
		a += "Browser not supported."
	}
	a += "</div>";
	if (!this.selectedFound) {
		this.selectedNode = null
	}
	this.completed = true;
	return a
};
OspTree.prototype.addNode = function (a) {
	var b = "";
	var d = 0;
	if (this.config.inOrder) {
		d = a._ai
	}
	for (d; d < this.aNodes.length; d++) {
		if (this.aNodes[d].pid == a.id) {
			var c = this.aNodes[d];
			c._p = a;
			c._ai = d;
			this.setCS(c);
			if (!c.target && this.config.target) {
				c.target = this.config.target
			}
			if (c._hc && !c._io && this.config.useCookies) {
				c._io = this.isOpen(c.id)
			}
			if (!this.config.folderLinks && c._hc) {
				c.url = null
			}
			if (this.config.useSelection && c.id == this.selectedNode && !this.selectedFound) {
				c._is = true;
				this.selectedNode = d;
				this.selectedFound = true
			}
			b += this.node(c, d);
			if (c._ls) {
				break
			}
		}
	}
	return b
};
OspTree.prototype.node = function (a, c) {
	var b = '<div class="OspTreeNode">' + this.indent(a, c);
	if (this.config.useIcons) {
		if (!a.icon) {
			a.icon = (this.root.id == a.pid) ? this.icon.root : ((a._hc) ? this.icon.folder : this.icon.node)
		}
		if (!a.iconOpen) {
			a.iconOpen = (a._hc) ? this.icon.folderOpen : this.icon.node
		}
		if (this.root.id == a.pid) {
			a.icon = this.icon.root;
			a.iconOpen = this.icon.root
		}
		b += '<img id="i' + this.obj + c + '" src="' + ((a._io) ? a.iconOpen : a.icon) + '" alt="" />'
	}
	if (a.url) {
		b += '<a id="s' + this.obj + c + '" class="' + ((this.config.useSelection) ? ((a._is ? "nodeSel" : "node")) : "node") + '" href="' + a.url + '"';
		if (a.title) {
			b += ' title="' + a.title + '"'
		}
		if (a.target) {
			b += ' target="' + a.target + '"'
		}
		if (this.config.useStatusText) {
			b += " onmouseover=\"window.status='" + a.name + "';return true;\" onmouseout=\"window.status='';return true;\" "
		}
		if (this.config.useSelection && ((a._hc && this.config.folderLinks) || !a._hc)) {
			b += ' onclick="javascript: ' + this.obj + ".s(" + c + ');"'
		}
		b += ">"
	} else {
		if ((!this.config.folderLinks || !a.url) && a._hc && a.pid != this.root.id) {
			b += '<a href="javascript: ' + this.obj + ".o(" + c + ');" class="node">'
		}
	}
	b += a.name;
	if (a.url || ((!this.config.folderLinks || !a.url) && a._hc)) {
		b += "</a>"
	}
	b += "</div>";
	if (a._hc) {
		b += '<div id="d' + this.obj + c + '" class="clip" style="display:' + ((this.root.id == a.pid || a._io) ? "block" : "none") + ';">';
		b += this.addNode(a);
		b += "</div>"
	}
	this.aIndent.pop();
	return b
};
OspTree.prototype.indent = function (a, c) {
	var b = "";
	if (this.root.id != a.pid) {
		for (var d = 0; d < this.aIndent.length; d++) {
			b += '<img src="' + ((this.aIndent[d] == 1 && this.config.useLines) ? this.icon.line : this.icon.empty) + '" alt="" />'
		}
		(a._ls) ? this.aIndent.push(0) : this.aIndent.push(1);
		if (a._hc) {
			b += '<a href="javascript: ' + this.obj + ".o(" + c + ');"><img id="j' + this.obj + c + '" src="';
			if (!this.config.useLines) {
				b += (a._io) ? this.icon.nlMinus : this.icon.nlPlus
			} else {
				b += ((a._io) ? ((a._ls && this.config.useLines) ? this.icon.minusBottom : this.icon.minus) : ((a._ls && this.config.useLines) ? this.icon.plusBottom : this.icon.plus))
			}
			b += '" alt="" /></a>'
		} else {
			b += '<img src="' + ((this.config.useLines) ? ((a._ls) ? this.icon.joinBottom : this.icon.join) : this.icon.empty) + '" alt="" />'
		}
	}
	return b
};
OspTree.prototype.setCS = function (a) {
	var b;
	for (var c = 0; c < this.aNodes.length; c++) {
		if (this.aNodes[c].pid == a.id) {
			a._hc = true
		}
		if (this.aNodes[c].pid == a.pid) {
			b = this.aNodes[c].id
		}
	}
	if (b == a.id) {
		a._ls = true
	}
};
OspTree.prototype.getSelected = function () {
	var a = this.getCookie("cs" + this.obj);
	return (a) ? a : null
};
OspTree.prototype.s = function (b) {
	if (!this.config.useSelection) {
		return
	}
	var a = this.aNodes[b];
	if (a._hc && !this.config.folderLinks) {
		return
	}
	if (this.selectedNode != b) {
		if (this.selectedNode || this.selectedNode == 0) {
			eOld = document.getElementById("s" + this.obj + this.selectedNode);
			eOld.className = "node"
		}
		eNew = document.getElementById("s" + this.obj + b);
		eNew.className = "nodeSel";
		this.selectedNode = b;
		if (this.config.useCookies) {
			this.setCookie("cs" + this.obj, a.id)
		}
	}
};
OspTree.prototype.o = function (b) {
	var a = this.aNodes[b];
	this.nodeStatus(!a._io, b, a._ls);
	a._io = !a._io;
	if (this.config.closeSameLevel) {
		this.closeLevel(a)
	}
	if (this.config.useCookies) {
		this.updateCookie()
	}
};
OspTree.prototype.oAll = function (a) {
	for (var b = 0; b < this.aNodes.length; b++) {
		if (this.aNodes[b]._hc && this.aNodes[b].pid != this.root.id) {
			this.nodeStatus(a, b, this.aNodes[b]._ls);
			this.aNodes[b]._io = a
		}
	}
	if (this.config.useCookies) {
		this.updateCookie()
	}
};
OspTree.prototype.openTo = function (b, a, c) {
	if (!c) {
		for (var e = 0; e < this.aNodes.length; e++) {
			if (this.aNodes[e].id == b) {
				b = e;
				break
			}
		}
	}
	var d = this.aNodes[b];
	if (d.pid == this.root.id || !d._p) {
		return
	}
	d._io = true;
	d._is = a;
	if (this.completed && d._hc) {
		this.nodeStatus(true, d._ai, d._ls)
	}
	if (this.completed && a) {
		this.s(d._ai)
	} else {
		if (a) {
			this._sn = d._ai
		}
	}
	this.openTo(d._p._ai, false, true)
};
OspTree.prototype.closeLevel = function (a) {
	for (var b = 0; b < this.aNodes.length; b++) {
		if (this.aNodes[b].pid == a.pid && this.aNodes[b].id != a.id && this.aNodes[b]._hc) {
			this.nodeStatus(false, b, this.aNodes[b]._ls);
			this.aNodes[b]._io = false;
			this.closeAllChildren(this.aNodes[b])
		}
	}
};
OspTree.prototype.closeAllChildren = function (a) {
	for (var b = 0; b < this.aNodes.length; b++) {
		if (this.aNodes[b].pid == a.id && this.aNodes[b]._hc) {
			if (this.aNodes[b]._io) {
				this.nodeStatus(false, b, this.aNodes[b]._ls)
			}
			this.aNodes[b]._io = false;
			this.closeAllChildren(this.aNodes[b])
		}
	}
};
OspTree.prototype.nodeStatus = function (a, c, b) {
	eDiv = document.getElementById("d" + this.obj + c);
	eJoin = document.getElementById("j" + this.obj + c);
	if (this.config.useIcons) {
		eIcon = document.getElementById("i" + this.obj + c);
		eIcon.src = (a) ? this.aNodes[c].iconOpen : this.aNodes[c].icon
	}
	eJoin.src = (this.config.useLines) ? ((a) ? ((b) ? this.icon.minusBottom : this.icon.minus) : ((b) ? this.icon.plusBottom : this.icon.plus)) : ((a) ? this.icon.nlMinus : this.icon.nlPlus);
	eDiv.style.display = (a) ? "block" : "none"
};
OspTree.prototype.clearCookie = function () {
	var a = new Date();
	var b = new Date(a.getTime() - 1000 * 60 * 60 * 24);
	this.setCookie("co" + this.obj, "cookieValue", b);
	this.setCookie("cs" + this.obj, "cookieValue", b)
};
OspTree.prototype.setCookie = function (f, e, a, d, b, c) {
	document.cookie = escape(f) + "=" + escape(e) + (a ? "; expires=" + a.toGMTString() : "") + (d ? "; path=" + d : "") + (b ? "; domain=" + b : "") + (c ? "; secure" : "")
};
OspTree.prototype.getCookie = function (e) {
	var d = "";
	var b = document.cookie.indexOf(escape(e) + "=");
	if (b != -1) {
		var c = b + (escape(e) + "=").length;
		var a = document.cookie.indexOf(";", c);
		if (a != -1) {
			d = unescape(document.cookie.substring(c, a))
		} else {
			d = unescape(document.cookie.substring(c))
		}
	}
	return (d)
};
OspTree.prototype.updateCookie = function () {
	var a = "";
	for (var b = 0; b < this.aNodes.length; b++) {
		if (this.aNodes[b]._io && this.aNodes[b].pid != this.root.id) {
			if (a) {
				a += "."
			}
			a += this.aNodes[b].id
		}
	}
	this.setCookie("co" + this.obj, a)
};
OspTree.prototype.isOpen = function (c) {
	var b = this.getCookie("co" + this.obj).split(".");
	for (var a = 0; a < b.length; a++) {
		if (b[a] == c) {
			return true
		}
	}
	return false
};
if (!Array.prototype.push) {
	Array.prototype.push = function array_push() {
		for (var a = 0; a < arguments.length; a++) {
			this[this.length] = arguments[a]
		}
		return this.length
	}
};
if (!Array.prototype.pop) {
	Array.prototype.pop = function array_pop() {
		lastElement = this[this.length - 1];
		this.length = Math.max(this.length - 1, 0);
		return lastElement
	}
}
SuperMap.OSP.ExtentionService.Resources = SuperMap.Class({
		initialize : function () {},
		CLASS_NAME : "SuperMap.OSP.ExtentionService.Resources"
	});
SuperMap.OSP.ExtentionService.Resources.zh_cn = {
	ShareMap_saveClientStateInfo_param_clientStateInfo : "",
	ShareMap_saveClientStateInfo_param_onComplete : "",
	ShareMap_getClientStateInfo_param_onComplete : "",
	ShareMap_getClientStateInfo_param_linkUrl : "",
	ShareMap_field_dataHandler : "",
	StatisticService_getCategory_param_onComplete : "",
	StatisticService_getIndex_param_categoryNames : "",
	StatisticService_getIndex_param_onComplete : "",
	StatisticService_calculate_param_onComplete : "",
	StatisticService_calculate_param_statisticParam : "",
	StatisticService_field_dataHandler : "",
	Monitor_realTimeMonitor_param_monitorParam : "",
	Monitor_realTimeMonitor_param_onComplete : "",
	Monitor_onceMonitor_param_monitorParam : "",
	Monitor_onceMonitor_param_onComplete : "",
	Monitor_field_dataHandler : ""
};
SuperMap.OSP.ExtentionService.ShareMap = SuperMap.Class({
		initialize : function () {},
		url : null,
		saveClientStateInfo : function (a, b, f, e, h) {
			if (SuperMap.OSP.Core.Utility._isEmpty(a)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.ExtentionService.Resources", "ShareMap_saveClientStateInfo_param_clientStateInfo"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(b)) {
				b = 24
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(f) || typeof(f) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.ExtentionService.Resources", "ShareMap_saveClientStateInfo_param_onComplete"));
				return false
			}
			if (a.features && a.features.length > 0) {
				for (var d = 0; d < a.features.length; d++) {
					var c = a.features[d];
					c.geometry = SuperMap.OSP.Core.Utility._geometryToServer2Geometry(c.geometry)
				}
			}
			var g = {
				clientStateInfo : a,
				saveTime : b
			};
			this._queryBase("saveClientStateInfo", g, f, e, h)
		},
		getClientStateInfo : function (keyId, onComplete, onError, userContext) {
			if (SuperMap.OSP.Core.Utility._isEmpty(keyId)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.ExtentionService.Resources", "ShareMap_getClientStateInfo_param_linkUrl"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(onComplete) || typeof(onComplete) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.ExtentionService.Resources", "ShareMap_getClientStateInfo_param_onComplete"));
				return false
			}
			function onCompleteFun(result) {
				if (result) {
					var clientInfo = eval("(" + result + ")");
					if (clientInfo) {
						if (clientInfo.viewBounds) {
							clientInfo.viewBounds = new SuperMap.Bounds(clientInfo.viewBounds.left, clientInfo.viewBounds.bottom, clientInfo.viewBounds.right, clientInfo.viewBounds.top)
						}
						var poiGroups = [];
						if (clientInfo.poiGroups && clientInfo.poiGroups.length > 0) {
							for (var i = 0, l = clientInfo.poiGroups.length; i < l; i++) {
								var oldPoiGroup = clientInfo.poiGroups[i];
								var poiGroup = new SuperMap.OSP.UI.POIGroup(oldPoiGroup.id);
								poiGroup.caption = oldPoiGroup.caption;
								poiGroup.level = oldPoiGroup.level;
								poiGroup.maxScale = oldPoiGroup.maxScale;
								poiGroup.minScale = oldPoiGroup.minScale;
								poiGroup.visible = oldPoiGroup.visible;
								poiGroup.isPublic = oldPoiGroup.isPublic;
								poiGroup.serverId = oldPoiGroup.serverId;
								poiGroup.userGroupId = oldPoiGroup.userGroupId;
								if (oldPoiGroup.scaledContents) {
									if (typeof(oldPoiGroup.scaledContents.content) == "string") {
										poiGroup.scaledContents = new SuperMap.OSP.UI.ScaledContent();
										poiGroup.scaledContents.content = oldPoiGroup.scaledContents.content;
										poiGroup.scaledContents.offset.x = oldPoiGroup.scaledContents.offset.x;
										poiGroup.scaledContents.offset.y = oldPoiGroup.scaledContents.offset.y
									} else {
										if (oldPoi.scaledContents && typeof(oldPoi.scaledContents._size) == "number") {
											poiGroup.scaledContents = new SuperMap.OSP.Core.HashMap();
											poiGroup.scaledContents._size = oldPoiGroup.scaledContents._size;
											poiGroup.scaledContents._entry = oldPoiGroup.scaledContents._entry
										}
									}
								}
								if (oldPoiGroup.pois && oldPoiGroup.pois.length > 0) {
									for (var j = 0, jl = oldPoiGroup.pois.length; j < jl; j++) {
										var oldPoi = oldPoiGroup.pois[j];
										var newPoi = new SuperMap.OSP.UI.POI(oldPoi.id);
										newPoi.position = oldPoi.position;
										newPoi.title = oldPoi.title;
										newPoi.properties = oldPoi.properties;
										newPoi.visible = oldPoi.visible;
										if (oldPoi.scaledContents) {
											if (typeof(oldPoi.scaledContents.content) == "string") {
												newPoi.scaledContents = new SuperMap.OSP.UI.ScaledContent();
												newPoi.scaledContents.content = oldPoi.scaledContents.content;
												newPoi.scaledContents.offset.x = oldPoi.scaledContents.offset.x;
												newPoi.scaledContents.offset.y = oldPoi.scaledContents.offset.y
											} else {
												if (oldPoi.scaledContents && typeof(oldPoi.scaledContents._size) == "number") {
													newPoi.scaledContents = new SuperMap.OSP.Core.HashMap();
													newPoi.scaledContents._size = oldPoi.scaledContents._size;
													newPoi.scaledContents._entry = oldPoi.scaledContents._entry
												}
											}
										}
										poiGroup.addPOIs(newPoi)
									}
								}
								poiGroups.push(poiGroup)
							}
							clientInfo.poiGroups = poiGroups;
							var features = [];
							if (clientInfo.features && clientInfo.features.length > 0) {
								for (var i = 0; i < clientInfo.features.length; i++) {
									var oldFeature = clientInfo.features[i];
									var newFeature = new SuperMap.Web.Core.Feature();
									newFeature.attributes = oldFeature.attributes;
									newFeature.caption = oldFeature.caption;
									newFeature.geometry = SuperMap.OSP.Core.Utility._server2GeometryToClientGeometry(oldFeature.geometry);
									newFeature.id = oldFeature.id;
									newFeature.style = oldFeature.style;
									newFeature.title = oldFeature.title;
									features.push(newFeature)
								}
							}
							clientInfo.features = features
						}
						onComplete(clientInfo)
					} else {
						onComplete(null)
					}
				} else {
					onComplete(result)
				}
			}
			var params = {
				keyId : keyId
			};
			this._queryBase("getClientStateInfo", params, onCompleteFun, onError, userContext)
		},
		_queryBase : function (b, f, e, d, g) {
			if (SuperMap.OSP.Core.Utility._isEmpty(this.url)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.ExtentionService.Resources", "ShareMap_field_dataHandler"));
				return false
			}
			this.dataHandler = this.url + SuperMap.OSP.Core._ServiceSuffix;
			function a(h) {
				if (h) {
					if (h.error && typeof(d) == "function") {
						d(h.error)
					}
				}
				e(h.result[0])
			}
			function c(h) {
				if (typeof(d) == "function") {
					var i = new SuperMap.OSP.Service.ErrorResult;
					i.type = SuperMap.OSP.Core.ErrorType.ENVIRONMENT;
					i.information = h;
					d(i)
				}
			}
			SuperMap.OSP.Core.Utility.committer(this.dataHandler, "ShareMap", b, f, false, a, c, g)
		},
		_warn : function (a) {
			alert(a)
		},
		_isNotEmpty : function (b) {
			var a = false;
			if (b != null && b != "") {
				a = true
			}
			return a
		},
		CLASS_NAME : "SuperMap.OSP.ExtentionService.ShareMap"
	});
SuperMap.OSP.ExtentionService.GeocodeParam = SuperMap.Class({
		initialize : function () {},
		dataSourceName : null,
		datasetName : null,
		province : null,
		city : null,
		address : null,
		expectCount : 10,
		startRecord : 0,
		CLASS_NAME : "SuperMap.OSP.ExtentionService.GeocodeParam"
	});
SuperMap.OSP.ExtentionService.Geocoder = SuperMap.Class({
		initialize : function () {},
		url : null,
		getPoint : function (a, c, b, d) {
			if (SuperMap.OSP.Core.Utility._isEmpty(a)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Geocoder_getPoint_param_geocodeParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(c) && typeof(c) != "function") {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Geocoder_getPoint_param_geocodeParam_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(a.address)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Geocoder_getPoint_param_geocodeParam_address_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(a.dataSourceName)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Geocoder_getPoint_param_geocodeParam_dataSourceName_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(a.datasetName)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Geocoder_getPoint_param_geocodeParam_datasetName_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(a.startRecord)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Geocoder_getPoint_param_geocodeParam_startRecord_error"));
				return false
			}
			if (SuperMap.OSP.Core.Utility._isEmpty(a.expectCount)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Geocoder_getPoint_param_geocodeParam_expectCount_error"));
				return false
			}
			this._queryBase("getPoint", a, c, b, d)
		},
		_queryBase : function (b, f, e, d, g) {
			if (SuperMap.OSP.Core.Utility._isEmpty(this.url)) {
				throw new Error(SuperMap.OSP.Utility.Resource.getMessage("SuperMap.OSP.Service.Resources", "Geocoder_filed_dataHandler_error"));
				return false
			}
			this.dataHandler = this.url + SuperMap.OSP.Core._ServiceSuffix;
			function a(h) {
				if (h) {
					if (h.error && typeof(d) == "function") {
						d(h.error)
					}
				}
				e(h.result[0])
			}
			function c(h) {
				if (typeof(d) == "function") {
					var i = new SuperMap.OSP.Service.ErrorResult;
					i.type = SuperMap.OSP.Core.ErrorType.ENVIRONMENT;
					i.information = h;
					d(i)
				}
			}
			SuperMap.OSP.Core.Utility.committer(this.dataHandler, "Geocoder", b, f, false, a, c, g)
		},
		CLASS_NAME : "SuperMap.OSP.ExtentionService.Geocoder"
	});
SuperMap.OSP.ExtentionService.GeocodeResult = SuperMap.Class({
		initialize : function () {},
		id : "",
		city : null,
		address : null,
		province : null,
		point : null,
		CLASS_NAME : "SuperMap.OSP.ExtentionService.GeocodeResult"
	});
