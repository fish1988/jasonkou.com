/* ==========================================================
 *	jason-combobox.js
 *
 * ========================================================== */
!function($) {

	'use strict'
	$.combobox = {}
	$.combobox.initValues = []

	var Combobox = function(element, options) {
		this.multiSelect = ($(element).attr('multiple') === 'multiple' || $(element)
				.attr('multiple') === 'true')
		this.options = $.extend({}, this.multiSelect
						? $.fn.combobox.multiDefaults
						: $.fn.combobox.defaults, options)
		this.width = parseInt(this.options.width) // default width
		this.$container = this.setup(element)
		this.placeholder = this.options.placeholder
		this.$element = this.$container.find('input')

		this.$element.attr('placeholder', this.placeholder)
		this.$element.width(this.width)
		this.$container.width(this.width + 45)

		this.$button = this.$container.find('.dropdown-toggle')
		this.$button.on('click.combobox-menu.data-api', function() {
					console.log('28', 'do')
					return false;
				})
		this.$clear = this.$container.find('.combobox-clear')
		this.$clear.hide()
		this.$clear.css({
					left : this.width - 5 + 'px'
				})
		this.$target = this.$container.find('select')
		this.matcher = this.options.matcher || this.matcher
		this.sorter = this.options.sorter || this.sorter
		this.highlighter = this.options.highlighter || this.highlighter
		this.outside = $(element).attr('outside')

		if (this.outside)
			this.$menu = $(this.options.menu).appendTo('body')
		else
			this.$menu = $(this.options.menu).appendTo(this.$container)
		this.$menu.width(this.width + 11)

		this.initValue = this.options.initValue // default width

		this.shown = false
		this.selected = false
		this.refresh()
		this.listen()
	}

	/*
	 * NOTE: COMBOBOX EXTENDS BOOTSTRAP-TYPEAHEAD.js
	 * ==========================================
	 */

	Combobox.prototype = $.extend({}, $.fn.typeahead.Constructor.prototype, {

		constructor : Combobox,

		buildComboboxIds : function($el) {
			var form = $el.parents('form'), formPre = 'form-'
			if (form.length > 0 && $(form[0]).attr('id')) {
				formPre = $(form[0]).attr('id') + '-'
			}
			$el.attr('real-id', formPre + $el.attr('id'))

			if ($el.attr('child-id'))
				$el.attr('real-child-id', formPre + $el.attr('child-id'))
		},
		clearMenus : function() {
			this.$menu.hide()
			this.shown = false
		},

		disabled : function() {
			this.$button.addClass('hidden')
			this.$clear.addClass('hidden')
			this.$element.attr('disabled', true)
		},
		actived : function() {
			this.$button.removeClass('hidden')
			this.$clear.removeClass('hidden')
			this.$element.removeAttr('disabled')
		},
		reset : function() {
			if (this.$target.hasClass('not-set-value')) {
				// console.log(this.$target,this.$target.find('option:not(.fixed)'),'remove')
				this.$target.find('option:not(.fixed)').remove()
			}
			this.$target.val('')
			$.jPlaceholder.val(this.$element, this.placeholder)
			this.refresh()
		},
		getChild : function() {
			return $.combobox[this.$target.attr('child-id')];
		},
		findText : function(v) {
			var sel = this.$target;
			var op = sel.find('option');
			var val = this.$element.val();
			// console.log(op);
			for (var i = 0; i < op.length; i++) {
				if (op[i].innerHTML == val) {
					return op[i];
				}
			}
			return null;

		},
		setValue : function(vals) {
			var arrValues = vals.split(';')
			if (arrValues.length) {
				var i = 0;
				var parent = '#'
				var id = this.$target.attr('real-id')

				//console.log(122, '------------', arrValues, id)
				while (arrValues.length - i) {
					if (id) {
						$.combobox.initValues.push({
									'id' : id,
									'value' : arrValues[i++],
									'parent' : parent,
									'loadChild' : arrValues.length - i === 0
											? true
											: false
								})
					} else {
						break
					}
					parent = id
					id = $('[real-id="' + id + '"]').attr('real-child-id')
				}

			}

			// set values
			for (var i = 0; i < $.combobox.initValues.length; i++) {
				var item = $.combobox.initValues[i]
				// load and setValue
				$.combobox[item.id].load(true, item.parent, item.value)
				if (item.loadChild === true) {
					var child = $.combobox[item.id].getChild()
					if (child) {
						child.load(true, '#')
					}
				}
			}
			$.combobox.initValues = []
		},
		setSingleValue : function(v) {
			if (typeof v === 'undefined')
				return;

			var arr = v.split(',')
			var targetVals = [], elementText = ''
			for (var i = 0; i < arr.length; i++) {
				var val = arr[i]
				var found = this.$target.find('option[value="' + val + '"]')

				if (found.length) {
					targetVals.push(val)

					var text = found[0].innerHTML;

					elementText += text + (i === arr.length - 1 ? '' : ';');
				}

			}
			this.$target.val(targetVals);
			console.log(this.$target.val())
			this.$element.val(elementText);
			this.$clear.show()
		},
		setup : function(element) {
			var select = $(element), combobox = $(this.options.template)
			this.buildComboboxIds(select)
			select.before(combobox)
			select.detach()
			combobox.append(select)
			return combobox
		}

		,
		parse : function() {
			var map = {}, source = [], selected = false
			this.$target.find('option').each(function() {
						var option = $(this)
						map[option.text()] = option.val()
						source.push(option.text())
						if (option.attr('selected'))
							selected = option.html()
					})
			this.map = map
			if (selected) {
				this.$element.val(selected)
				this.$container.addClass('combobox-selected')
				this.selected = true
			}
			return source
		}

		,
		toggle : function() {

			if (!this.shown) {
				$('.combobox').combobox('clearMenus')
				// $('.dropdown-menu', this.$container).hide();
				console.log('button click')
				var v = this.$element.val()
				this.$element.val('').focus()
				if (this.multiSelect) {
					console.log('multi', v)
				} else {
					// this.clearTarget()
				}
				this.lookup(v)
				this.$element.val(v)
				console.log('182', this.$element.val())
				if (v !== this.placeholder) {
					// $.jPlaceholder.val(this.$element,this.placeholder)

					// this.lookup(v)
				} else {
					// this.$clear.hide()
				}
			} else {
				$('.dropdown-menu', this.$container).hide()
				this.shown = false
			}
		}

		,
		clearTarget : function() {
			// console.log('clearTarget')
			this.$target.val(this.multiSelect ? [] : '')
			this.$container.removeClass('combobox-selected')
			this.selected = false
		}

		,
		refresh : function() {
			this.source = this.parse()
			this.options.items = this.source.length
		}

		// modified typeahead function adding container and target
		// handling
		,
		click : function(e) {
			e.stopPropagation()
			e.preventDefault()
			this.select()
			// return;

		},

		select : function() {

			var li = this.$menu.find('.active'), that = this
			this.$clear.show()
			var val = li.attr('data-value')

			if (this.multiSelect) {

				var input = li.find('i')
				// input.trigger
				if (input.hasClass('icon-check')) {
					$.jCheckbox.uncheck(input)
					input.parent().removeClass('li-selected')
				} else {
					$.jCheckbox.check(input)
					input.parent().addClass('li-selected')
				}
				var selectLi = this.$menu.find('.li-selected')
				var text = '', dataValues = [], eleText = this.$element.val()

				// selected li
				for (var i = 0; i < selectLi.length; i++) {
					text += $('a', $(selectLi[i])).text()
							+ (i == selectLi.length - 1 ? '' : ';')
				}
				console.log('now query' + this.query)
				if (this.query.length == 0) {
					var temp = text.split(';'), outText = []

					$.each(temp, function(k, v) {
								if (typeof that.map[v] != 'undefined') {
									outText.push(v)
									dataValues.push(that.map[v])
								}
							})
					this.$element.val(outText.join(';'))
					console.log('no query -----', outText, dataValues)
				} else {

					var unselect = this.$menu.find('li').not('.li-selected'), temp = {}, outText = [], selectItems = [], items = []

					if (text.length) {
						eleText += (eleText.length ? ';' : '') + text
					}
					items = eleText.split(';')
					$.each(items, function(k, v) {
								if (typeof that.map[v] != 'undefined') {
									selectItems.push(v)
								}
							})

					$.each(selectItems, function(k, v) {
								temp[v] = 1
							})
					// unselected li
					for (var i = 0; i < unselect.length; i++) {
						temp[$('a', $(unselect[i])).text()] = 0
					}

					$.each(temp, function(k, v) {
								if (temp[k]) {
									outText.push(k)
									dataValues.push(that.map[k])
								}
							})

					console.log(unselect, selectItems, temp, outText)
					this.$element.val(outText.join(';'))
				}
				this.$target.val(dataValues)
				this.$target.trigger('change')
				this.$container.addClass('combobox-selected')
				this.selected = true
				return
			} else {

				console.log('select', val)
				var val2 = this.$element.val()
				this.$element.val(val)
				this.$container.addClass('combobox-selected')
				this.$target.val(this.map[val])
				if (val !== val2)
					this.$target.trigger('change')
				this.selected = true
				return this.hide()
			}

		},
		show : function() {
			var pos = $.extend({}, this.$element.offset(), {
						height : this.$element[0].offsetHeight
					}), me = this

			if (this.outside) {
				this.$menu.css({
							top : pos.top + pos.height,
							left : pos.left
						})
			} else {
				this.$menu.css({
							top : pos.height
						})
			}

			if ($.browser.msie && parseInt($.browser.version, 10) <= 7) {
				$('.combobox-container').css({
							'z-index' : 0
						})
				this.$container.css({
							'z-index' : 1
						})
			}

			this.$menu.show()
			this.shown = true
			return this
		}

		,
		hide : function() {
			this.$menu.hide()
			this.shown = false
			return this
		},
		getLastWord : function(text) {
			var idx = text.lastIndexOf(';')
			return text.slice(idx == -1 ? 0 : idx + 1)
		},
		getSelectedWord : function(text) {
			var idx = text.lastIndexOf(';')
			if (idx === -1)
				return ''
			return text.slice(0, idx)
		},
		lookup : function(oldVal) {
			var that = this, items, q

			if (typeof oldVal == 'undefined')
				oldVal = that.$element.val()

			this.query = this.getLastWord(this.$element.val())

			items = $.grep(this.source, function(item) {
						if (that.matcher(item))
							return item
					})

			items = this.sorter(items)

			if (!items.length) {
				return this.shown ? this.hide() : this
			}

			this.render(items.slice(0, this.options.items)).show()
			this.$menu.find('li').removeClass('active')
					.removeClass('li-selected')

			// console.log('lookup')

			if (this.multiSelect) {

				var arr = oldVal.split(';')

				for (var i = 0; i < arr.length; i++) {
					if (arr[i] === '')
						continue
					var activeLi = this.$menu.find('li[data-value="' + arr[i]
							+ '"]')
					$.jCheckbox.check(activeLi.find('i'))
					// .removeClass('icon-check-empty').addClass('icon-check')
					activeLi.addClass('li-selected')

					// console.log('select291', arr[i])
				}

			} else {
				var activeLi = this.$menu.find('li[data-value="' + oldVal
						+ '"]')

				activeLi.addClass('active')
			}
			// this.$element.val(oldVal)
			// console.log('oldVal', oldVal,this.$element.val())
			this.shown = true
		}

		// modified typeahead function adding button handling
		,
		listen : function() {
			var me = this;

			this.$element.on('blur', $.proxy(this.blur, this)).on('keypress',
					$.proxy(this.keypress, this)).on('keyup',
					$.proxy(this.keyup, this)).on('focus', function() {
						if ($(this).val() == me.placeholder
								|| $(this).val() == '') {
							$(this).val('')
							// me.$clear.hide()
						} else {
							// me.$clear.show()
						}
					})

			if ($.browser.webkit || $.browser.msie) {
				this.$element.on('keydown', $.proxy(this.keypress, this))
			}

			this.$menu.on('click', $.proxy(this.click, this)).on('mouseenter',
					'li', $.proxy(this.mouseenter, this))
			/*if (this.multiSelect)*/
			/*this.$menu.on('mouseleave', function() {
						setTimeout(function() {
									console.log('mouseout')
									me.hide()
								}, 300)
					})*/

			var child = this.$target.attr('real-child-id')
			if (child) {
				this.$target.on('change', function() {
							console.log($(this).attr('real-id') + ' change');
							var combo = $.combobox[child]

							if (!combo)
								return;
							var val = combo.$target.val();

							combo.$element.val('');
							combo.$target.val(combo.multiSelect ? [] : '')
							combo.$clear.hide()

							if (combo.multiSelect)
								combo.$target.trigger('change')

							if ($(this).val() !== '' && $(this).val() !== null) {
								me.$clear.show()
								combo.load(true,  $(this).attr('real-id'));
							} else {
								console.log('remove')
								combo.$target.find('option:not(.fixed)')
										.remove();
								combo.refresh();

							}
							combo.$element.trigger('blur')
							if (me.multiSelect && $(this).val() === null) {
								$.jPlaceholder.val(me.$element, me.placeholder)
								me.$clear.hide()
							} else {
								me.$clear.show()
							}
							if (combo.multiSelect)
								$.jPlaceholder.val(combo.$element,
										combo.placeholder)
						})
			}
			this.$button.on('click', $.proxy(this.toggle, this))

			this.$clear.on('click', function(e) {
						e.stopPropagation()
						e.preventDefault()
						me.$menu.hide()

						me.shown = false
						console.log('clear ' + me.$target.attr('real-id'))
						var val = me.$target.val();

						var val2 = me.$element.val();

						if (val2 === me.placeholder || val2 === '') {
							console.log('no clear');
							$.jPlaceholder.val(me.$element, me.placeholder)

							// me.$target.trigger('change')
							return
						}
						if (me.multiSelect) {
							me.$element.val('').focus()
							$.jPlaceholder.val(me.$element, me.placeholder)

						} else {
							me.$element.val('').focus();
						}
						me.$target.val(me.multiSelect ? [] : '');

						if (me.multiSelect) {
							if (val !== null)
								me.$target.trigger('change')
						} else if (val.length || val2.length)
							me.$target.trigger('change')
						me.$clear.hide()
					})
		}

		// modified typeahead function to clear on type and prevent on
		// moving around
		,
		keyup : function(e) {
			console.log('key up')
			switch (e.keyCode) {

				case 40 : // down arrow
				case 38 : // up arrow
					return
				case 39 : // right arrow
				case 37 : // left arrow
				case 36 : // home
				case 35 : // end
				case 16 : // shift
				break

				case 9 : // tab
				case 13 : // enter
					if (!this.shown)
						return

					this.select()
				break

				case 27 : // escape
					if (!this.shown)
						return

					this.hide()
				break

				/*case 38 : // up arrow
					//e.preventDefault()
					//this.prev()
					return
					break

				case 40 : // down arrow
					//e.preventDefault()
					//this.next()
					return
					break*/
				default :
					this.clearTarget()
					this.lookup()
			}

			var found = this.findText(this.$element.val())
			if (found) {
				this.selected = true
				this.$target.val($(found).val());
				this.$target.trigger('change')

			} else {

				this.selected = false
				var combo = this.getChild();
				// this.$element.val('');
				if (!combo)
					return;
				// combo.$element.val('')
				// combo.$element.trigger('blur')
				combo.$target.val('')
				combo.$target.find('option:not(.fixed)').remove()
				combo.refresh()
			}
			e.stopPropagation()
			e.preventDefault()
		},
		/*
				next : function(event) {
					var active = this.$menu.find('.hover').removeClass('hover'), next = active
							.next()

					if (!next.length) {
						next = $(this.$menu.find('li')[0])
					}

					next.addClass('hover')
				}

				,
				prev : function(event) {
					var active = this.$menu.find('.hover').removeClass('hover'), prev = active
							.prev()

					if (!prev.length) {
						prev = this.$menu.find('li').last()
					}

					prev.addClass('hover')
				}
				// modified typeahead function to only hide menu if it is
				// visible
				,
				mouseenter : function(e) {
					this.$menu.find('.hover').removeClass('hover')
					$(e.currentTarget).addClass('hover')
				},*/
		blur : function(e) {

			var that = this
			console.log(573, 'blur')
			if (this.multiSelect) {
				var text = that.$element.val().replace(/;$/, ''), temp = text
						.split(';'), outText = [], output, dataValues = [], tempMap = {}

				$.each(temp, function(k, v) {
							tempMap[v] = 1
						})

				$.each(tempMap, function(k, v) {
							if (typeof that.map[k] != 'undefined') {
								outText.push(k)
								dataValues.push(that.map[k])
							}
						})
				output = outText.join(';')
				that.$element.val(output)

				that.$target.val(dataValues)
				that.$target.trigger('change')
				/*if(text.length!=output.length){
					this.$target.trigger('change')
				}*/
				// console.log('hide - 441')
				/*
				 * setTimeout(function() {
				 * 
				 * //that.hide() //that.shown = false; if (that.$element.val() ==
				 * '') that.$element.val(that.placeholdeXr); }, 1500)
				 */
			} else {

				setTimeout(function() {
							if (that.$element.val() == '') {
								// console.log('not found',
								// that.$element.val(''))

								$.jPlaceholder.val(that.$element,
										that.placeholder)
							}

							if (!that.findText(that.$element.val())) {
								that.setSingleValue('')
							}
						}, 100)
			}

			e.stopPropagation()
			e.preventDefault()

		}

		,
		load : function(needLoad, parentId, initValue) {

			var combo = this, ids = '#'

			var url = $.jStore.getUrl(combo.$target.attr('data-url'))
			if (typeof url === 'undefined' || url.length === 0) {
				combo.setSingleValue(initValue);
				return

			}
			if (needLoad) {

				// remove unfixed items
				combo.$target.find('option:not(.fixed)').remove();

				if (parentId && parentId.length > 0) {
					if (parentId != '#') {
						//console.log(731,parentId,$('[real-id="'+parentId+'"]'),$('[real-id="'+parentId+'"]').val())
						var tempValue = $('[real-id="' + parentId + '"]').val()
						ids = $.isArray(tempValue)
								? tempValue.join(';')
								: tempValue
					}
					url += ids;
					console.log(737,initValue,$('[real-id="' + parentId + '"]').val(),parentId,ids,url)
				} else {
					return;
				}

				// get data
				$.post(url, function(data) {
							// console.log(combo.$target.attr('id') + '
							// ' + url);
							combo.$target.find('option:not(.fixed)').remove()
							var arr = [];
							for (var i = 0; i < data.length; i++) {
								arr.push('<option value="' + data[i].id + '">'
										+ data[i].name + '</option>');
							}
							combo.$target.append(arr.join(""));
							var val = combo.$target.val();

							combo.$element.val('');
							// if (val.length)
							// combo.$target.trigger('change');
							combo.$target.val(combo.multiSelect ? [] : '')
							$.jPlaceholder.val(combo.$element,
									combo.placeholder)
							combo.refresh();

							if (initValue) {
								combo.setSingleValue(initValue);
								// console.log(combo.$target.attr('id'),initValue);
							}

						}, 'json');
			}

		}
	})
	/*
	 * COMBOBOX PLUGIN DEFINITION ===========================
	 */

	$.fn.combobox = function(option) {
		this.each(function() {
					var $this = $(this), combo = $this.data('combobox')

					if (combo) {
						if (typeof option == 'string')
							combo[option]()
						return
					}
					// console.log($(this).attr('val'));
					combo = new Combobox(this, {
								width : $(this).attr('width') || 220,
								placeholder : $(this).attr('placeholder')
										|| '请选择'
							})
					$.jPlaceholder.val(combo.$element, combo.placeholder)
					$this.data('combobox', combo)

					var initValues = $(this).attr('val')
					var arrValues = initValues ? initValues.split(';') : [];

					// console.log(initValues,arrValues)
					if (initValues && arrValues.length) {
						var i = 0;
						var parent = '#'
						var id = $this.attr('real-id')
						while (arrValues.length - i) {
							if (id) {
								// var valueObj = {};
								// valueObj['id'] = arrValues[i++]
								$.combobox.initValues.push({
											'id' : id,
											'value' : arrValues[i++],
											'parent' : parent,
											'loadChild' : arrValues.length - i === 0
													? true
													: false
										})
								// console.log(id);
							} else {
								break
							}
							parent = id;
							id = $('[real-id="' + id + '"]')
									.attr('real-child-id');

						}

					}
					// console.log($.combobox.initValues);

					// console.log(combo);
					if ($this.attr('real-id')) {
						$.combobox[$this.attr('real-id')] = combo;
					}

					if ($this.attr('data-url')) {
						// need load data? and init paramid/ids..
						combo.load($(this).attr('autoload'), '#');
					}

				})

		// set values
		for (var i = 0; i < $.combobox.initValues.length; i++) {
			var item = $.combobox.initValues[i]
			// load and setValue
			$.combobox[item.id].load(true, item.parent, item.value)
			if (item.loadChild === true) {
				var child = $.combobox[item.id].getChild()
				if (child) {
					child.load(true, '#')
				}
			}
		}
		$.combobox.initValues = []
	}
	$.fn.combobox.defaults = {
		template : '<div class="combobox-container pull-left"><input type="text"><span class="add-on btn dropdown-toggle" data-dropdown="dropdown"><i class="icon-sort-down"></i></span><span class="combobox-clear">×</span></div>',
		menu : '<ul class="combobox-menu typeahead typeahead-long dropdown-menu"></ul>',
		item : '<li><a href="#"></a></li>',
		placeholder : null
	}

	$.fn.combobox.multiDefaults = {
		template : '<div class="combobox-container pull-left"><input type="text"><span class="add-on btn dropdown-toggle" data-dropdown="dropdown"><i class="icon-sort-down"></i></span><span class="combobox-clear">×</span></div>',
		menu : '<ul class="combobox-menu typeahead typeahead-long dropdown-menu multi-combobox"></ul>',
		item : '<li><i class="icon-check-empty"/><a href="#"></a></li>',
		placeholder : null
	}

	$.fn.combobox.Constructor = Combobox

	// 
	$('.combobox').combobox()

	$(function() {
		$('body').on('click.combobox-menu', function(e) {
			/*if($(e.target).closest('.popover').length && !$(e.target).hasClass('close') )
			//if($(e.target).parent().hasClass('popover') || $(e.target).parent().parent().hasClass('popover') || $(e.target).parent().parent().parent().hasClass('popover'))
				return false*/
			// $('.combobox-menu').hide()
			$('.combobox').combobox('clearMenus')
			console.log('753', 'hide combo-menu')
				// $('.popover').remove()

			})
			// $('html').on('click.btn.dropdown-toggle', function(){
			// console.log(688,$('.combobox-menu:visible'));
			// $('.combobox-menu:visible').hide() })
		})

}(window.jQuery)
