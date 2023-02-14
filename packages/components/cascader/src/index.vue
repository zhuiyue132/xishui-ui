<template>
  <el-tooltip
    ref="tooltipRef"
    :visible="popperVisible"
    :teleported="teleported"
    :popper-class="[nsCascader.e('dropdown'), popperClass, nsCascader.is('no-arrow', !showArrow)]"
    :popper-options="popperOptions"
    :fallback-placements="['bottom-start', 'bottom', 'top-start', 'top', 'right', 'left']"
    :stop-popper-mouse-event="false"
    :gpu-acceleration="false"
    :show-arrow="showArrow"
    placement="bottom-start"
    transition="el-zoom-in-top"
    effect="light"
    pure
    persistent
    trigger="click"
    @hide="hideSuggestionPanel"
  >
    <template #default>
      <div
        v-clickoutside:[popperPaneRef]="() => togglePopperVisible(false)"
        :class="[nsCascader.b(), nsCascader.m(realSize), nsCascader.is('disabled', isDisabled), $attrs.class]"
        :style="{ ...$attrs.style, ...inputStyle }"
        @click="() => togglePopperVisible(readonly ? undefined : true)"
        @keydown="handleKeyDown"
        @mouseenter.stop="inputHover = true"
        @mouseleave="inputHover = false"
      >
        <el-input
          ref="input"
          v-model="inputValue"
          :placeholder="searchInputValue ? '' : inputPlaceholder"
          :readonly="readonly"
          :disabled="isDisabled"
          :validate-event="false"
          :size="realSize"
          :class="nsCascader.is('focus', popperVisible)"
          @compositionstart="handleComposition"
          @compositionupdate="handleComposition"
          @compositionend="handleComposition"
          @focus="e => $emit('focus', e)"
          @blur="e => $emit('blur', e)"
          @input="handleInput"
        >
          <template #suffix>
            <el-icon
              v-if="clearBtnVisible"
              key="clear"
              :class="[nsInput.e('icon'), 'icon-circle-close']"
              @click.stop="handleClear"
            >
              <circle-close />
            </el-icon>
            <el-icon
              v-else
              key="arrow-down"
              :class="[nsInput.e('icon'), 'icon-arrow-down', nsCascader.is('reverse', popperVisible)]"
              @click.stop="togglePopperVisible()"
            >
              <arrow-down />
            </el-icon>
          </template>
        </el-input>

        <div v-if="multiple" ref="tagWrapper" :class="nsCascader.e('tags')">
          <el-tag
            v-for="tag in presentTags"
            :key="tag.key"
            :type="tagType"
            :size="tagSize"
            :hit="tag.hitState"
            :closable="tag.closable"
            disable-transitions
            @close="deleteTag(tag)"
          >
            <template v-if="tag.isCollapseTag === false">
              <span>{{ tag.text }}</span>
            </template>
            <template v-else>
              <el-tooltip
                :teleported="false"
                :disabled="popperVisible || !collapseTagsTooltip"
                :fallback-placements="['bottom', 'top', 'right', 'left']"
                placement="bottom"
                effect="light"
              >
                <template #default>
                  <span>{{ tag.text }}</span>
                </template>
                <template #content>
                  <div class="el-cascader__collapse-tags">
                    <div v-for="(tag2, idx) in allPresentTags" :key="idx" class="el-cascader__collapse-tag">
                      <el-tag
                        :key="tag2.key"
                        class="in-tooltip"
                        :type="tagType"
                        :size="tagSize"
                        :hit="tag2.hitState"
                        :closable="tag2.closable"
                        disable-transitions
                        @close="deleteTag(tag2)"
                      >
                        <span>{{ tag2.text }}</span>
                      </el-tag>
                    </div>
                  </div>
                </template>
              </el-tooltip>
            </template>
          </el-tag>
          <input
            v-if="filterable && !isDisabled"
            v-model="searchInputValue"
            type="text"
            :class="nsCascader.e('search-input')"
            :placeholder="presentText ? '' : inputPlaceholder"
            @input="e => handleInput(searchInputValue, e)"
            @click.stop="togglePopperVisible(true)"
            @keydown.delete="handleDelete"
            @compositionstart="handleComposition"
            @compositionupdate="handleComposition"
            @compositionend="handleComposition"
          />
        </div>
      </div>
    </template>

    <template #content>
      <xs-cascader-panel
        v-show="!filtering"
        ref="panel"
        v-model="checkedValue"
        :options="options"
        :props="props"
        :border="false"
        :render-label="$slots.default"
        :width="width"
        @expand-change="handleExpandChange"
        @close="$nextTick(() => togglePopperVisible(false))"
      />
      <xs-scrollbar
        v-if="filterable"
        v-show="filtering"
        ref="suggestionPanel"
        tag="ul"
        :class="nsCascader.e('suggestion-panel')"
        :view-class="nsCascader.e('suggestion-list')"
        always
        @keydown="handleSuggestionKeyDown"
      >
        <template v-if="suggestions.length">
          <li
            v-for="item in suggestions"
            :key="item.uid"
            :class="[nsCascader.e('suggestion-item'), nsCascader.is('checked', item.checked)]"
            :tabindex="-1"
            @click="handleSuggestionClick(item)"
          >
            <span>{{ item.text }}</span>
            <el-icon v-if="item.checked"><check /></el-icon>
          </li>
        </template>
        <slot v-else name="empty">
          <li :class="nsCascader.e('empty-text')"> 暂无数据 </li>
        </slot>
      </xs-scrollbar>
    </template>
  </el-tooltip>
</template>

<script>
  import { computed, defineComponent, inject, nextTick, onMounted, ref, watch } from 'vue';
  import { isPromise, debounce, focusNode, getSibling, isValidComponentSize, addUnit } from '@xishui-ui/utils';
  import { isClient, useResizeObserver } from '@vueuse/core';
  import XsCascaderPanel from '@xishui-ui/components/cascader-panel';
  import XsScrollbar from '@xishui-ui/components/scrollbar';
  import { ElInput, ElIcon, ElTooltip, ElTag } from 'element-plus';
  import { formContextKey, formItemContextKey } from '@xishui-ui/token';
  import { ClickOutside as Clickoutside } from '@xishui-ui/directives';
  import { useNamespace, useSize } from '@xishui-ui/hooks';
  import { EVENT_CODE } from '@xishui-ui/config';
  import { ArrowDown, Check, CircleClose } from '@element-plus/icons-vue';

  const DEFAULT_INPUT_HEIGHT = 40;

  const INPUT_HEIGHT_MAP = {
    large: 36,
    default: 32,
    small: 28
  };

  const popperOptions = {
    modifiers: [
      {
        name: 'arrowPosition',
        enabled: true,
        phase: 'main',
        fn: ({ state }) => {
          const { modifiersData, placement } = state;
          if (['right', 'left', 'bottom', 'top'].includes(placement)) return;
          modifiersData.arrow.x = 35;
        },
        requires: ['arrow']
      }
    ]
  };
  export default defineComponent({
    name: 'XsCascader',

    components: {
      XsCascaderPanel,
      ElInput,
      ElTooltip,
      XsScrollbar,
      ElTag,
      ElIcon,
      CircleClose,
      Check,
      ArrowDown
    },

    directives: {
      Clickoutside
    },

    props: {
      // eslint-disable-next-line vue/require-default-prop
      modelValue: [Number, String, Array],
      options: {
        type: Array,
        default: () => []
      },
      props: {
        type: Object,
        default: () => ({})
      },
      size: {
        type: String,
        default: '',
        validator: isValidComponentSize
      },
      placeholder: {
        type: String,
        default: '请选择'
      },
      disabled: Boolean,
      clearable: Boolean,
      filterable: Boolean,
      filterMethod: {
        type: Function,
        default: (node, keyword) => node.text.includes(keyword)
      },
      separator: {
        type: String,
        default: ' / '
      },
      showAllLevels: {
        type: Boolean,
        default: true
      },
      collapseTags: Boolean,
      collapseTagsTooltip: {
        type: Boolean,
        default: false
      },
      debounce: {
        type: Number,
        default: 300
      },
      beforeFilter: {
        type: Function,
        default: () => true
      },
      popperClass: {
        type: String,
        default: ''
      },
      teleported: Boolean,
      showArrow: {
        type: Boolean,
        default: true
      },
      // eslint-disable-next-line vue/require-prop-types
      tagType: { default: 'info' },
      width: {
        type: [Number, String],
        default: 220
      }
    },

    emits: ['update:modelValue', 'change', 'focus', 'blur', 'visible-change', 'expand-change', 'remove-tag'],

    setup(props, { emit }) {
      let inputInitialHeight = 0;
      let pressDeleteCount = 0;

      const nsCascader = useNamespace('cascader');
      const nsInput = useNamespace('input');

      const elForm = inject(formContextKey, {});
      const elFormItem = inject(formItemContextKey, {});

      const tooltipRef = ref(null);
      const input = ref(null);
      const tagWrapper = ref(null);
      const panel = ref(null);
      const suggestionPanel = ref(null);
      const popperVisible = ref(false);

      watch(popperVisible, () => {
        console.log('popperVisible', popperVisible.value);
      });
      const inputHover = ref(false);
      const filtering = ref(false);
      const inputValue = ref('');
      const searchInputValue = ref('');
      const presentTags = ref([]);
      const allPresentTags = ref([]);
      const suggestions = ref([]);
      const isOnComposition = ref(false);

      const isDisabled = computed(() => props.disabled || elForm.disabled);
      const inputPlaceholder = computed(() => props.placeholder);
      const _style = computed(() => {
        const { width } = props;
        return width ? { width: addUnit(width) } : {};
      });
      const realSize = useSize();
      const tagSize = computed(() => (['small'].includes(realSize.value) ? 'small' : 'default'));
      const multiple = computed(() => !!props.props.multiple);
      const readonly = computed(() => !props.filterable || multiple.value);
      const searchKeyword = computed(() => (multiple.value ? searchInputValue.value : inputValue.value));
      const checkedNodes = computed(() => panel.value?.checkedNodes || []);
      const clearBtnVisible = computed(() => {
        if (!props.clearable || isDisabled.value || filtering.value || !inputHover.value) return false;

        return !!checkedNodes.value.length;
      });
      const presentText = computed(() => {
        const { showAllLevels, separator } = props;
        const nodes = checkedNodes.value;
        return nodes.length ? (multiple.value ? ' ' : nodes[0].calcText(showAllLevels, separator)) : '';
      });

      const checkedValue = computed({
        get() {
          return props.modelValue;
        },
        set(val) {
          emit('update:modelValue', val);
          emit('change', val);
          elFormItem.validate?.('change').catch(err => console.warn(err));
        }
      });

      const popperPaneRef = computed(() => {
        return tooltipRef.value?.popperRef?.contentRef;
      });

      const togglePopperVisible = visible => {
        if (isDisabled.value) return;

        visible = visible ?? !popperVisible.value;

        if (visible !== popperVisible.value) {
          popperVisible.value = visible;
          input.value?.input?.setAttribute('aria-expanded', `${visible}`);

          if (visible) {
            updatePopperPosition();
            nextTick(panel.value?.scrollToExpandingNode);
          } else if (props.filterable) {
            const { value } = presentText;
            inputValue.value = value;
            searchInputValue.value = value;
          }

          emit('visible-change', visible);
        }
      };

      const updatePopperPosition = () => {
        nextTick(() => {
          tooltipRef.value?.updatePopper();
        });
      };

      const hideSuggestionPanel = () => {
        filtering.value = false;
      };

      const genTag = node => {
        const { showAllLevels, separator } = props;
        return {
          node,
          key: node.uid,
          text: node.calcText(showAllLevels, separator),
          hitState: false,
          closable: !isDisabled.value && !node.isDisabled,
          isCollapseTag: false
        };
      };

      const deleteTag = tag => {
        const node = tag.node;
        node.doCheck(false);
        panel.value?.calculateCheckedValue();
        emit('remove-tag', node.valueByOption);
      };

      const calculatePresentTags = () => {
        if (!multiple.value) return;

        const nodes = checkedNodes.value;
        const tags = [];

        const allTags = [];
        nodes.forEach(node => allTags.push(genTag(node)));
        allPresentTags.value = allTags;

        if (nodes.length) {
          const [first, ...rest] = nodes;
          const restCount = rest.length;

          tags.push(genTag(first));

          if (restCount) {
            if (props.collapseTags) {
              tags.push({
                key: -1,
                text: `+ ${restCount}`,
                closable: false,
                isCollapseTag: true
              });
            } else {
              rest.forEach(node => tags.push(genTag(node)));
            }
          }
        }

        presentTags.value = tags;
      };

      const calculateSuggestions = () => {
        const { filterMethod, showAllLevels, separator } = props;
        const res = panel.value?.getFlattedNodes(!props.props.checkStrictly)?.filter(node => {
          if (node.isDisabled) return false;
          node.calcText(showAllLevels, separator);
          return filterMethod(node, searchKeyword.value);
        });

        if (multiple.value) {
          presentTags.value.forEach(tag => {
            tag.hitState = false;
          });
          allPresentTags.value.forEach(tag => {
            tag.hitState = false;
          });
        }

        filtering.value = true;
        suggestions.value = res;
        updatePopperPosition();
      };

      const focusFirstNode = () => {
        let firstNode;

        if (filtering.value && suggestionPanel.value) {
          firstNode = suggestionPanel.value.$el.querySelector(`.${nsCascader.e('suggestion-item')}`);
        } else {
          firstNode = panel.value?.$el.querySelector(`.${nsCascader.b('node')}[tabindex="-1"]`);
        }

        if (firstNode) {
          firstNode.focus();
          !filtering.value && firstNode.click();
        }
      };

      const updateStyle = () => {
        const inputInner = input.value?.input;
        const tagWrapperEl = tagWrapper.value;
        const suggestionPanelEl = suggestionPanel.value?.$el;

        if (!isClient || !inputInner) return;

        if (suggestionPanelEl) {
          const suggestionList = suggestionPanelEl.querySelector(`.${nsCascader.e('suggestion-list')}`);
          suggestionList.style.minWidth = `${inputInner.offsetWidth}px`;
        }

        if (tagWrapperEl) {
          const { offsetHeight } = tagWrapperEl;
          const height =
            presentTags.value.length > 0
              ? `${Math.max(offsetHeight + 6, inputInitialHeight)}px`
              : `${inputInitialHeight}px`;
          inputInner.style.height = height;
          updatePopperPosition();
        }
      };

      const getCheckedNodes = leafOnly => {
        return panel.value?.getCheckedNodes(leafOnly);
      };

      const handleExpandChange = value => {
        updatePopperPosition();
        emit('expand-change', value);
      };

      const handleComposition = event => {
        const text = event.target?.value;
        if (event.type === 'compositionend') {
          isOnComposition.value = false;
          nextTick(() => handleInput(text));
        } else {
          isOnComposition.value = true;
        }
      };

      const handleKeyDown = e => {
        if (isOnComposition.value) return;

        switch (e.code) {
          case EVENT_CODE.enter:
            togglePopperVisible();
            break;
          case EVENT_CODE.down:
            togglePopperVisible(true);
            nextTick(focusFirstNode);
            e.preventDefault();
            break;
          case EVENT_CODE.esc:
            if (popperVisible.value === true) {
              e.preventDefault();
              e.stopPropagation();
              togglePopperVisible(false);
            }
            break;
          case EVENT_CODE.tab:
            togglePopperVisible(false);
            break;
        }
      };

      const handleClear = () => {
        panel.value?.clearCheckedNodes();
        togglePopperVisible(false);
      };

      const handleSuggestionClick = node => {
        const { checked } = node;

        if (multiple.value) {
          panel.value?.handleCheckChange(node, !checked, false);
        } else {
          !checked && panel.value?.handleCheckChange(node, true, false);
          togglePopperVisible(false);
        }
      };

      const handleSuggestionKeyDown = e => {
        const target = e.target;
        const { code } = e;

        switch (code) {
          case EVENT_CODE.up:
          case EVENT_CODE.down: {
            const distance = code === EVENT_CODE.up ? -1 : 1;
            focusNode(getSibling(target, distance, `.${nsCascader.e('suggestion-item')}[tabindex="-1"]`));
            break;
          }
          case EVENT_CODE.enter:
            target.click();
            break;
        }
      };

      const handleDelete = () => {
        const tags = presentTags.value;
        const lastTag = tags[tags.length - 1];
        pressDeleteCount = searchInputValue.value ? 0 : pressDeleteCount + 1;

        if (!lastTag || !pressDeleteCount) return;

        if (lastTag.hitState) {
          deleteTag(lastTag);
        } else {
          lastTag.hitState = true;
        }
      };

      const handleFilter = debounce(() => {
        const { value } = searchKeyword;

        if (!value) return;

        const passed = props.beforeFilter(value);

        if (isPromise(passed)) {
          passed.then(calculateSuggestions).catch(() => {
            /* prevent log error */
          });
        } else if (passed !== false) {
          calculateSuggestions();
        } else {
          hideSuggestionPanel();
        }
      }, props.debounce);

      const handleInput = (val, e) => {
        !popperVisible.value && togglePopperVisible(true);

        if (e?.isComposing) return;

        val ? handleFilter() : hideSuggestionPanel();
      };

      watch(filtering, updatePopperPosition);

      watch([checkedNodes, isDisabled], calculatePresentTags);

      watch(presentTags, () => {
        nextTick(() => updateStyle());
      });

      watch(presentText, val => (inputValue.value = val), { immediate: true });

      onMounted(() => {
        const inputEl = input.value?.$el;
        inputInitialHeight = inputEl?.offsetHeight || INPUT_HEIGHT_MAP[realSize.value] || DEFAULT_INPUT_HEIGHT;
        useResizeObserver(inputEl, updateStyle);
      });

      return {
        popperOptions,
        tooltipRef,
        popperPaneRef,
        input,
        tagWrapper,
        panel,
        suggestionPanel,
        popperVisible,
        inputHover,
        inputPlaceholder,
        filtering,
        presentText,
        checkedValue,
        inputValue,
        searchInputValue,
        presentTags,
        allPresentTags,
        suggestions,
        isDisabled,
        isOnComposition,
        realSize,
        tagSize,
        multiple,
        readonly,
        clearBtnVisible,
        inputStyle: _style,
        nsCascader,
        nsInput,
        togglePopperVisible,
        hideSuggestionPanel,
        deleteTag,
        focusFirstNode,
        getCheckedNodes,
        handleExpandChange,
        handleKeyDown,
        handleComposition,
        handleClear,
        handleSuggestionClick,
        handleSuggestionKeyDown,
        handleDelete,
        handleInput
      };
    }
  });
</script>
