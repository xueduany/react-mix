// #region 工具函数

// #region @Date#format

/**
 * 将日期对象格式化为字符串。
 * @param {String} [format="yyyy/MM/dd HH:mm:ss"] 格式字符串。具体见下文。
 * @returns {String} 格式化后的字符串。
 * @example new Date().format("yyyy/MM/dd HH:mm:ss")
 * @remark
 * #### 格式化语法
 * 格式字符串中，以下元字符会被替换：
 *
 * 元字符 | 意义 | 实例
 * ------|-----|--------------------
 * y     | 年  | yyyy:2014, yy:14
 * M     | 月  | MM:09, M:9
 * d     | 日  | dd:09, d:9
 * H     | 小时 | HH:13, h:13
 * y     | 分钟 | mm:06, m:6
 * y     | 秒  | ss:06, s:6
 * e     | 星期 | e:天, ee:周日, eee: 星期天
 *
 * > #### !注意
 * > 元字符区分大小写。
 */
Date.prototype.format = function (format) {
    //typeof console === "object" && console.log(!format || typeof format === "string", "date.format([format: 必须是字符串])");
    var me = this, formators = Date._formators;
    if (!formators) {
        Date._formators = formators = {

            y: function (date, length) {
                date = date.getFullYear();
                return date < 0 ? 'BC' + (-date) : length < 3 && date < 3000 ? date % 100 : date;
            },

            M: function (date) {
                return date.getMonth() + 1;
            },

            d: function (date) {
                return date.getDate();
            },

            H: function (date) {
                return date.getHours();
            },

            m: function (date) {
                return date.getMinutes();
            },

            s: function (date) {
                return date.getSeconds();
            },

            e: function (date, length) {
                return (length === 1 ? '' : length === 2 ? '周' : '星期') + [length === 2 ? '日' : '天', '一', '二', '三', '四', '五', '六'][date.getDay()];
            }

        };
    }
    return (format || 'yyyy/MM/dd HH:mm:ss').replace(/(\w)\1*/g, function (all, key) {
        if (key in formators) {
            key = "" + formators[key](me, all.length);
            while (key.length < all.length) {
                key = '0' + key;
            }
            all = key;
        }
        return all;
    });
};

// #endregion

// #region @Date.parseDate

/**
 * 将指定对象解析为日期对象。
 * @param {String/Date} value 要解析的对象。
 * @param {String} [format] 解析的格式。
 * 如果未指定，则支持标准的几种时间格式。
 * 如果指定了格式，则按照格式指定的方式解析。具体见下文。
 * @returns {Date} 返回分析出的日期对象。
 * @example
 * Date.parseDate("2014-1-1")
 *
 * Date.parseDate("20140101")
 *
 * Date.parseDate("2013年12月1日", "yyyy年MM月dd日")
 * @remark
 * #### 格式化语法
 * 格式化字符串中，以下元字符会被反向替换为对应的值。
 *
 * 元字符 | 意义 | 实例
 * ------|-----|------
 * y     | 年  | 2014
 * M     | 月  | 9
 * d     | 日  | 9
 * H     | 小时 | 9
 * y     | 分钟 | 6
 * y     | 秒  | 6
 *
 * > #### !注意
 * > 元字符区分大小写。
 */
Date.parseDate = function (value, format) {
    if (value && !(value instanceof Date)) {
        if (format) {
            var groups = [0],
                obj = {},
                match = new RegExp(format.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1').replace(/([yMdHms])\1*/g, function (all, w) {
                    groups.push(w);
                    return "\\s*(\\d+)?\\s*";
                })).exec(value);
            if (match) {
                for (var i = 1; i < match.length; i++) {
                    obj[groups[i]] = +match[i];
                }
            }
            value = new Date(obj.y || new Date().getFullYear(), obj.M ? obj.M - 1 : new Date().getMonth(), obj.d || 1, obj.H || 0, obj.m || 0, obj.s || 0);
        } else {
            value = new Date(value.constructor === String ? value.replace(/(\d{4})\D*(\d\d?)\D*(\d\d?)/, '$1/$2/$3') : value);
        }

    }
    return value;
};

// #endregion

// #region @Date#addDay

/**
 * 在当前日期添加指定的天数并返回新日期。
 * @param {Number} value 要添加的天数。如果小于 0 则倒数指定天数。
 * @returns {Date} 返回新日期对象。
 * @example new Date().addDay(1)
 */
Date.prototype.addDay = function (value) {
    return new Date(+this + value * 86400000);
};

// #endregion

// #region @Date#addMonth

/**
 * 在当前日期添加指定的月数。
 * @param {Number} value 要添加的月数。如果小于 0 则倒数指定月数。
 * @returns {Date} 返回新日期对象。
 * @example new Date().addMonth(1)
 */
Date.prototype.addMonth = function (value) {
    var date = new Date(+this);
    date.setMonth(date.getMonth() + value);
    if (this.getDate() !== date.getDate()) {
        date.setDate(0);
    }
    return date;
};

// #endregion

// #region @Date#toDay

/**
 * 获取当前日期的日期部分。
 * @returns {Date} 返回新日期对象，其小时部分已被清零。
 * @example new Date().toDay()
 */
Date.prototype.toDay = function () {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate());
};

// #endregion

/**
 * 将日期对象格式化为字符串。
 * @param {String} format 日期的格式。默认为 yyyy/MM/dd HH:mm:ss。y: 年, M: 月, d: 天, H: 小时（24小时制）,m:分, s:秒, e:星期
 * @return {String} 字符串。
 */
Date.prototype.Fformat = function(v){
    console.warn('Fformat将被废弃，请用format');
    return this.format(v);
};

/**
 * 清空日期的小时部分。
 */
Date.prototype.clearHours = function () {
    this.setMilliseconds(0);
    this.setSeconds(0);
    this.setMinutes(0);
    this.setHours(0);
    return this;
};

/**
 * 从日期、字符串、数字转为日期对象。
 * @param {String} date 日期对象。
 */
Date.from = Date.parseDate;

Date.now = Date.now || function () {
        return +new Date;
    };