"use strict";

var _interopRequireDefault = require("D:/demo/vue-npm-template/node_modules/@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("D:/demo/vue-npm-template/node_modules/@babel/runtime/helpers/esm/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("D:/demo/vue-npm-template/node_modules/@babel/runtime/helpers/esm/objectSpread2"));

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("D:/demo/vue-npm-template/node_modules/@babel/runtime/helpers/esm/asyncToGenerator"));

var _utils = _interopRequireDefault(require("../../utils"));

var _form = _interopRequireDefault(require("ant-design-vue/es/form"));

require("ant-design-vue/lib/form/style/css");

var _index = _interopRequireDefault(require("./index"));

var _conf = _interopRequireDefault(require("../conf"));

var _objectSpread2;

// 回车跳转下一个focus
function nextItemFocus(item, _vm) {
  var enterToNextItemFocusList = _vm.enterToNextItemFocusList,
      setFieldFocus = _vm.setFieldFocus;
  var fieldIndex = enterToNextItemFocusList.indexOf(item.field);

  if (fieldIndex > -1 && fieldIndex < enterToNextItemFocusList.length - 1) {
    var nextField = enterToNextItemFocusList[fieldIndex + 1];
    setFieldFocus(nextField);
  }
} // 处理表单项的可选数据结构为 antd所需的


function handleItemPropsOptions(props) {
  var options = props.options,
      valueField = props.valueField,
      labelField = props.labelField;

  if (valueField || labelField) {
    var cloneOptions = _utils.default.clone(options);

    return cloneOptions.map(function (item) {
      if (valueField) {
        item.value = item[valueField];
      }

      if (labelField) {
        item.label = item[labelField];
      }

      return item;
    });
  }

  return options;
} // 请求表单项可选数据


var fetchItemPropsOptionsApiList = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/regeneratorRuntime.mark(function _callee(list, _vm) {
    var setFieldsOptions, onOptionsAllLoad, onOptionsLoadBefore, beforeRes, promises;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            setFieldsOptions = _vm.setFieldsOptions, onOptionsAllLoad = _vm.onOptionsAllLoad, onOptionsLoadBefore = _vm.onOptionsLoadBefore;

            if (!onOptionsLoadBefore) {
              _context.next = 8;
              break;
            }

            beforeRes = onOptionsLoadBefore(list);

            if (!(beforeRes === false)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", false);

          case 7:
            if (beforeRes) {
              list = beforeRes;
            }

          case 8:
            promises = list.map(function (item) {
              var api = item.api,
                  param = item.param;
              return api(param);
            });
            Promise.all(promises).then(function (res) {
              var json = {};
              list.forEach(function (item, index) {
                var field = item.field,
                    valueField = item.valueField,
                    labelField = item.labelField,
                    fields = item.fields;
                var itemData = res[index];

                if (fields && fields.length) {
                  // 统一请求可选数据 赋值到指定字段的处理
                  fields.forEach(function (element) {
                    for (var key in element.param) {
                      if (element.param[key] && itemData[element.param[key]]) {
                        json[element.field] = handleItemPropsOptions({
                          options: itemData[element.param[key]],
                          valueField: element.valueField,
                          labelField: element.labelField
                        });
                      }
                    }
                  });
                } else {
                  // 字段单独配置api的可选数据的处理
                  var options = handleItemPropsOptions({
                    options: res[index],
                    valueField: valueField,
                    labelField: labelField
                  });
                  json[field] = options;
                }
              });

              if (onOptionsAllLoad) {
                var onLoadRes = onOptionsAllLoad(json);

                if (onLoadRes) {
                  json = onLoadRes;
                }
              }

              setFieldsOptions(json);
            }).catch(function () {});

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchItemPropsOptionsApiList(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // 处理统一请求可选数据的请求


function handeUnifyApiGetOptions(unifyList, optionsApiList, _vm) {
  var fieldsOptionsApi = _vm.fieldsOptionsApi; // 处理同一请求参数

  var json = {};
  var fields = [];
  unifyList.map(function (item) {
    var _item$itemRender$prop = item.itemRender.props,
        param = _item$itemRender$prop.param,
        valueField = _item$itemRender$prop.valueField,
        labelField = _item$itemRender$prop.labelField;
    fields.push({
      field: item.field,
      valueField: valueField,
      labelField: labelField,
      param: param
    });

    for (var key in param) {
      if (json[key] && _utils.default.isArray(json[key])) {
        json[key].push(param[key]);
      } else if (json[key] && !_utils.default.isArray(json[key])) {
        json[key] = [json[key], param[key]];
      } else {
        json[key] = param[key];
      }
    }
  });
  var unifyApi = fieldsOptionsApi ? fieldsOptionsApi : _conf.default.fieldsOptionsApi;

  if (unifyApi) {
    optionsApiList.push({
      api: fieldsOptionsApi ? fieldsOptionsApi : _conf.default.fieldsOptionsApi,
      param: json,
      fields: fields
    });
  }

  fetchItemPropsOptionsApiList(optionsApiList, _vm);
} // 渲染标题


function renderItemTitle(item, h, _vm) {
  var titleColon = _vm.titleColon,
      titleWidth = _vm.titleWidth; //是否必填

  var isRequired = false;

  if (item.option && item.option.rules && item.option.rules.length) {
    for (var i = 0; i < item.option.rules.length; i++) {
      var rulesItem = item.option.rules[i];

      if (rulesItem.required) {
        isRequired = true;
        break;
      }
    }
  } //标题内容


  var titleText = "";

  if (typeof item.title === "function") {
    titleText = [item.title()];
  } else {
    titleText = item.title;
  }

  var titleWidthStr = item.titleWidth || item.titleWidth === 0 ? item.titleWidth : titleWidth;

  if (_utils.default.isNumber(titleWidthStr)) {
    titleWidthStr = "".concat(titleWidthStr, "px");
  }

  return h("div", {
    class: ["data-form-item-title", {
      colon: item.colon === false ? item.colon : titleColon
    }, {
      required: isRequired
    }],
    style: {
      width: titleWidthStr
    }
  }, titleText);
} // 渲染input表单项


function renderItemInput(item, h, _vm) {
  var $slots = _vm.$slots,
      $scopedSlots = _vm.$scopedSlots,
      readonly = _vm.readonly,
      onButtonClick = _vm.onButtonClick;
  var vDecorator = [item.field];

  if (item.option) {
    vDecorator.push(item.option);
  }

  var props = (0, _objectSpread3.default)((0, _objectSpread3.default)({
    props: {}
  }, item.itemRender), {}, {
    ref: "input_" + item.field,
    directives: [{
      name: "decorator",
      value: vDecorator
    }]
  }); // 只读

  if (readonly) {
    if (props.props) {
      props.props.disabled = true;
      props.props.placeholder = null;
    } else {
      props.props = {
        disabled: true,
        placeholder: ""
      };
    }
  } else {// TODO 切换只读的处理
    // if (props.props && props.props.disabled !==true) {
    //   props.props.disabled=false;
    // }
  }

  var inputDom = "";

  if (item.itemRender && item.itemRender.slot) {
    // 插槽
    if ($slots[item.itemRender.slot]) {
      inputDom = $slots[item.itemRender.slot];
    } else if ($scopedSlots[item.itemRender.slot]) {
      props.scopedSlots = {
        default: $scopedSlots[item.itemRender.slot]
      }, inputDom = h("a-scopedSlots", props);
    }
  } else if (item.itemRender && item.itemRender.customRender) {
    // 自定义渲染内容
    if (item.itemRender && item.itemRender.props) {
      props.props['customRender'] = item.itemRender.customRender;
    } else {
      props.props = {
        customRender: item.itemRender.customRender
      };
    }

    inputDom = h("a-customRender", props);
  } else {
    // 根据name渲染组件
    var renderName = item.itemRender && item.itemRender.name ? "a-".concat(item.itemRender.name) : 'a-input';

    if (renderName === "a-buttons") {
      if (props.props) {
        props.props.itemClick = onButtonClick;
      } else {
        props.props = {
          itemClick: onButtonClick
        };
      }
    }

    inputDom = h(renderName, props);
  }

  return inputDom;
} // 渲染每个表单项内容


function renderItemContent(item, h, _vm) {
  var titleWidth = _vm.titleWidth;
  return h("div", {
    style: {
      width: titleWidth
    },
    class: "data-form-item-content"
  }, [renderItemInput(item, h, _vm)]);
} // 渲染items


function renderItems(h, _vm) {
  var itemsOptions = _vm.itemsOptions,
      $slots = _vm.$slots,
      layout = _vm.layout,
      colspan = _vm.colspan,
      $scopedSlots = _vm.$scopedSlots,
      focusItemTypes = _vm.focusItemTypes;
  return itemsOptions ? itemsOptions.map(function (item) {
    var formItemProps = {
      key: item.field,
      props: item,
      style: {},
      scopedSlots: {}
    };
    var formItemContent = "";

    if (item.slot && $slots[item.slot]) {
      // 插槽
      formItemContent = $slots[item.slot];
    } else if (item.slot && $scopedSlots[item.slot]) {
      // 作用域插槽
      var vDecorator = [item.field];

      if (item.option) {
        vDecorator.push(item.option);
      }

      formItemContent = h("a-scopedSlots", {
        scopedSlots: {
          default: $scopedSlots[item.slot]
        },
        directives: [{
          name: "decorator",
          value: vDecorator
        }]
      });
    } else if (item.type === "hidden") {
      formItemContent = [renderItemContent(item, h, _vm)];
      formItemProps.style["display"] = "none";
    } else {
      formItemProps.scopedSlots.label = function () {
        return renderItemTitle(item, h, _vm);
      };

      formItemContent = [renderItemContent(item, h, _vm)];
    }

    if (layout === "grid") {
      // grid模式下每个单元格所占格
      if (item.colspan && item.colspan > 1) {
        formItemProps.style["gridColumn"] = "span " + item.colspan;
      }

      if (item.rowspan && item.rowspan > 1) {
        formItemProps.style["gridRow"] = "span " + item.rowspan;
      }
    } else if (layout === "flex") {
      // 当flex模式下的宽度
      var colWidth = 100 / colspan;

      if (item.width) {
        formItemProps.style["width"] = item.width;
      } else if (item.colspan && item.colspan > 1) {
        formItemProps.style["width"] = "".concat(colWidth * item.colspan, "%");
      } else {
        formItemProps.style["width"] = "".concat(colWidth, "%");
      }
    }

    var wrapperProps = {
      class: ["data-form-item-wrapper", item.align],
      on: {}
    };

    if (item.itemRender && focusItemTypes.includes(item.itemRender.name) && item.itemRender.name !== 'textarea') {
      wrapperProps.on.keydown = function (e) {
        var keyCode = e.keyCode;

        if (keyCode === 13) {
          e.preventDefault();
          nextItemFocus(item, _vm);
        }
      };
    }

    return h('a-form-item', formItemProps, [h("div", wrapperProps, [formItemContent])]);
  }) : [];
}

var _default2 = {
  name: 'DataForm',
  components: (0, _objectSpread3.default)((0, _objectSpread3.default)({}, _index.default), {}, (_objectSpread2 = {}, (0, _defineProperty2.default)(_objectSpread2, _form.default.name, _form.default), (0, _defineProperty2.default)(_objectSpread2, _form.default.Item.name, _form.default.Item), _objectSpread2)),
  props: {
    // 表单内容
    items: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // 布局，'horizontal'|'vertical'|'inline'|'grid'|'flex'
    layout: {
      type: String,
      default: "grid"
    },
    // grid、flex布局时的列数
    colspan: {
      type: Number,
      default: 1
    },
    // 是否只读
    readonly: {
      type: Boolean,
      default: false
    },
    // 尺寸
    size: {
      type: String,
      default: "small"
    },
    // 所有项的标题对齐方式
    titleAlign: {
      type: String,
      default: "right"
    },
    // 所有项的标题宽度
    titleWidth: {
      type: [String, Number],
      default: 100
    },
    // 是否显示标题冒号
    titleColon: {
      type: Boolean,
      default: true
    },
    // 是否显示必填字段的红色星号
    titleAsterisk: {
      type: Boolean,
      default: true
    },
    // 是否加载中
    loading: {
      type: Boolean,
      default: false
    },
    // 可选数据全部请求完后回调
    onOptionsAllLoad: {
      type: Function,
      default: function _default() {}
    },
    // 可选数据请求前回调
    onOptionsLoadBefore: {
      type: Function,
      default: function _default() {}
    },
    // 渲染的按钮buttons，action 按钮点击时触发
    onButtonActionClick: {
      type: Function,
      default: function _default() {}
    }
  },
  data: function data() {
    return {
      form: this.$form.createForm(this),
      itemsOptions: [],
      // 支持回车活动焦点的组件
      focusItemTypes: ['input', 'password', 'number', 'select', 'datePicker', 'monthPicker', 'weekPicker', 'rangePicker', 'cascader', 'treeSelect', 'textarea']
    };
  },
  computed: {
    // 回车跳转下一个表单项获得焦点的字段列表
    enterToNextItemFocusList: function enterToNextItemFocusList() {
      var _this = this;

      return this.items.map(function (item) {
        if (item.itemRender && _this.focusItemTypes.includes(item.itemRender.name) && (item.itemRender.props && item.itemRender.props.disabled !== true || !item.itemRender.props)) {
          // 可获得焦点的组件
          return item.field;
        }

        return "";
      }).filter(function (p) {
        return p !== '';
      });
    }
  },
  watch: {
    items: function items(_items) {
      this.cloneItems(_items);
    }
  },
  created: function created() {
    this.cloneItems(this.items);
  },
  methods: {
    cloneItems: function cloneItems(items) {
      var clone = _utils.default.clone(items);

      var getItemPropsOptionsApiList = [];
      var unifyApiGetOptions = [];
      var data = clone.map(function (item) {
        // 处理可选数据
        if (item.itemRender && item.itemRender.props && item.itemRender.props.options) {
          var options = handleItemPropsOptions(item.itemRender.props);
          item.itemRender.props.options = options;
        } else if (item.itemRender && item.itemRender.props && item.itemRender.props.api) {
          getItemPropsOptionsApiList.push({
            field: item.field,
            api: item.itemRender.props.api,
            valueField: item.itemRender.props.valueField,
            labelField: item.itemRender.props.labelField,
            param: item.itemRender.props.param
          });
        } else if (item.itemRender && item.itemRender.props && item.itemRender.props.param && !item.itemRender.props.api) {
          unifyApiGetOptions.push(item);
        }

        return item;
      });

      if (unifyApiGetOptions.length) {
        handeUnifyApiGetOptions(unifyApiGetOptions, getItemPropsOptionsApiList, this);
      } else if (getItemPropsOptionsApiList.length) {
        fetchItemPropsOptionsApiList(getItemPropsOptionsApiList, this);
      }

      this.itemsOptions = data;
    },
    // 获取表单数据，不验证
    getData: function getData() {
      var values = this.form.getFieldsValue();
      return values;
    },
    // 设置表单值
    setData: function setData(values) {
      var items = this.items; // 过滤掉formitems未定义的字段

      var formFields = items.map(function (item) {
        return item.field;
      });
      var formData = {};

      for (var key in values) {
        if (formFields.includes(key)) {
          formData[key] = values[key];
        }
      }

      this.form.setFieldsValue(formData);
    },
    // 校验并获取一组输入域的值
    validateFields: function validateFields(fields) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.form.validateFields(fields, function (err, values) {
          if (!err) {
            var json = (0, _objectSpread3.default)({}, values);
            json = _this2.formatSubmitValues(json);
            resolve(json);
          } else {
            reject();
          }
        });
      });
    },
    // 格式化提交数据，上传对象转成url
    formatSubmitValues: function formatSubmitValues(values) {
      var items = this.items;
      items.forEach(function (item) {
        // 将上传组件的对象值转换成url字符串
        if (item.itemRender && item.itemRender.name === "upload" && values[item.field]) {
          var value = values[item.field];

          if (value.fileList && value.fileList.length) {
            var list = value.fileList.map(function (p) {
              if (p.url) {
                return p.url;
              } else if (p.response) {
                var responseUrlField = item.itemRender.props && item.itemRender.props.responseUrlField ? item.itemRender.props.responseUrlField : "data";

                var url = _utils.default.getObjData(responseUrlField, p.response);

                if (url) {
                  return url;
                }

                return p;
              } else if (p.status !== "done") {
                return "";
              }

              return p;
            }).filter(function (p) {
              return p !== "";
            });
            values[item.field] = list && list.length ? list : undefined;
          } else if (value.fileList && value.fileList.length === 0) {
            values[item.field] = undefined;
          }
        }
      });
      return values;
    },
    // 提交
    onSubmit: function onSubmit(e) {
      var _this3 = this;

      if (e) {
        e.preventDefault();
      }

      this.form.validateFields(function (err, values) {
        if (!err) {
          var json = (0, _objectSpread3.default)({}, values);
          json = _this3.formatSubmitValues(json);

          _this3.$emit("submit", json);
        }
      });
    },
    // 重置
    onReset: function onReset() {},
    // 设置字段获得焦点
    setFieldFocus: function setFieldFocus(field) {
      var refName = "input_".concat(field);
      var item = this.$refs[refName];

      if (item && item.focus) {
        item.focus();
      }
    },
    // 设置一组字段的options数据
    setFieldsOptions: function setFieldsOptions(data) {
      var _this4 = this;

      var formData = {};

      var _loop = function _loop(key) {
        var options = data[key];

        var item = _this4.itemsOptions.find(function (p) {
          return p.field === key;
        });

        if (item && item.itemRender && item.itemRender.props) {
          if (item.itemRender.name === "checkboxGroup") {
            formData[key] = [];
          } else {
            formData[key] = "";
          }

          if (item.itemRender.props.name === "treeSelect") {
            item.itemRender.props.treeData = options;
          } else {
            item.itemRender.props.options = options;
          }
        }
      };

      for (var key in data) {
        _loop(key);
      } // 清除赋值字段的值


      this.setData(formData);
    },
    // 设置下拉框默认值，从下拉数据中获得默认选项,names = 指定要设置默认的字段，为空则设置全部
    setFieldsOptionsDefaultValues: function setFieldsOptionsDefaultValues() {
      var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var defaultData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var formData = {};
      this.itemsOptions.forEach(function (item) {
        if (item && item.itemRender && item.itemRender.props && item.itemRender.props.options && (fields.length && fields.includes(item.field) || fields.length === 0)) {
          var defaultKey = item.itemRender.props.defaultField ? item.itemRender.props.defaultField : 'default';
          var valueField = item.itemRender.props.valueField ? item.itemRender.props.valueField : 'id';
          var defaultValue = item.itemRender.props.options.map(function (p) {
            if (p[defaultKey]) {
              return p[valueField];
            }

            return "";
          }).filter(function (p) {
            return p !== "";
          });

          if (defaultValue.length) {
            var valueArrayTypes = ['checkboxGroup', 'radioGroup'];
            var value = defaultValue;

            if (!valueArrayTypes.includes(item.itemRender.name) && defaultValue.length === 1) {
              value = defaultValue[0];
            }

            formData[item.field] = value;
          }
        }
      });
      var json = (0, _objectSpread3.default)((0, _objectSpread3.default)({}, defaultData), formData);
      this.setData(json);
    },
    // 渲染的按钮点击事件
    onButtonClick: function onButtonClick(action) {
      var onSubmit = this.onSubmit,
          onReset = this.onReset,
          onButtonActionClick = this.onButtonActionClick;

      switch (action) {
        case "submit":
          onSubmit();
          break;

        case "reset":
          onReset();
          break;

        default:
          onButtonActionClick && onButtonActionClick(action);
          break;
      }
    }
  },
  render: function render(h) {
    var form = this.form,
        $slots = this.$slots,
        layout = this.layout,
        colspan = this.colspan,
        readonly = this.readonly,
        onSubmit = this.onSubmit; // ant design form的layout属性

    var antdLayouts = ['horizontal', 'vertical', 'inline']; // form表单的参数

    var formProps = {
      props: {
        form: form,
        layout: antdLayouts.includes(layout) ? layout : null
      },
      class: ["data-form", layout],
      style: {},
      on: {
        submit: onSubmit
      }
    };

    if (readonly) {
      formProps.class.push("readonly");
    }

    if (layout === "grid") {
      var formColnumStyle = "";

      for (var i = 0; i < colspan; i++) {
        formColnumStyle += " 1fr";
      }

      formProps.style["grid-template-columns"] = formColnumStyle;
    }

    return h('a-form', formProps, [].concat($slots.default || renderItems(h, this)));
  }
};
exports.default = _default2;