<template>
  <transition name="fade-in-linear" @after-leave="onAfterLeave">
    <el-overlay v-show="visible" :z-index="zIndex" :overlay-class="[ns.is('message-box'), modalClass]" :mask="modal">
      <div
        role="dialog"
        :aria-label="title"
        aria-modal="true"
        :aria-describedby="!showInput ? contentId : undefined"
        :class="`${ns.namespace.value}-overlay-message-box`"
        @click="overlayEvent.onClick"
        @mousedown="overlayEvent.onMousedown"
        @mouseup="overlayEvent.onMouseup"
      >
        <xs-focus-trap
          loop
          :trapped="visible"
          :focus-trap-el="rootRef"
          :focus-start-el="focusStartRef"
          @release-requested="onCloseRequested"
        >
          <div
            ref="rootRef"
            :class="[ns.b(), customClass, ns.is('draggable', draggable), { [ns.m('center')]: center }]"
            :style="customStyle"
            tabindex="-1"
            @click.stop
          >
            <div v-if="title !== null && title !== undefined" ref="headerRef" :class="ns.e('header')">
              <div :class="ns.e('title')">
                <span>{{ title }}</span>
              </div>
              <button
                v-if="showClose"
                type="button"
                :class="ns.e('headerbtn')"
                @click="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
                @keydown.prevent.enter="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
              >
                <img :src="Icons.close" />
              </button>
            </div>
            <div :id="contentId" :class="ns.e('content')">
              <div :class="ns.e('container')">
                <!-- <el-icon v-if="iconComponent && !center && hasMessage" :class="[ns.e('status'), typeClass]">
                  <component :is="iconComponent" />
                </el-icon> -->
                <div v-if="hasMessage" :class="ns.e('message')">
                  <slot>
                    <img v-if="iconComponent" :src="iconComponent" />

                    <component
                      :is="showInput ? 'label' : 'p'"
                      v-if="!dangerouslyUseHTMLString"
                      :for="showInput ? inputId : undefined"
                    >
                      {{ !dangerouslyUseHTMLString ? message : '' }}
                    </component>
                    <component
                      :is="showInput ? 'label' : 'p'"
                      v-else
                      :for="showInput ? inputId : undefined"
                      v-html="message"
                    />
                  </slot>
                </div>
              </div>
              <div v-show="showInput" :class="ns.e('input')">
                <el-input
                  :id="inputId"
                  ref="inputRef"
                  v-model="inputValue"
                  :type="inputType"
                  :placeholder="inputPlaceholder"
                  :aria-invalid="validateError"
                  :class="{ invalid: validateError }"
                  @keydown.enter="handleInputEnter"
                />
                <div
                  :class="ns.e('errormsg')"
                  :style="{
                    visibility: !!editorErrorMessage ? 'visible' : 'hidden'
                  }"
                >
                  {{ editorErrorMessage }}
                </div>
              </div>
            </div>
            <div :class="ns.e('btns')">
              <xs-button
                v-if="showCancelButton"
                :loading="cancelButtonLoading"
                :class="[cancelButtonClass]"
                :round="roundButton"
                :size="btnSize"
                @click="handleAction('cancel')"
                @keydown.prevent.enter="handleAction('cancel')"
              >
                {{ cancelButtonText }}
              </xs-button>
              <xs-button
                v-show="showConfirmButton"
                ref="confirmRef"
                type="primary"
                :loading="confirmButtonLoading"
                :class="[confirmButtonClasses]"
                :round="roundButton"
                :disabled="confirmButtonDisabled"
                :size="btnSize"
                @click="handleAction('confirm')"
                @keydown.prevent.enter="handleAction('confirm')"
              >
                {{ confirmButtonText }}
              </xs-button>
            </div>
          </div>
        </xs-focus-trap>
      </div>
    </el-overlay>
  </transition>
</template>
<script>
  import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch, toRefs } from 'vue';
  import { useNamespace } from '@xishui-ui/hooks';
  import { off, on } from '@xishui-ui/utils';
  import XsButton from '@xishui-ui/components/button';
  import XsFocusTrap from '@xishui-ui/components/focus-trap';
  import {
    ElInput,
    ElOverlay,
    TrapFocus,
    useDraggable,
    useId,
    useLockscreen,
    useRestoreActive,
    useSameTarget,
    useSize,
    useZIndex
  } from 'element-plus';

  import { Props, Icons } from '../config';

  export default defineComponent({
    name: 'XsMessageBox',
    directives: {
      TrapFocus
    },
    components: {
      XsFocusTrap,
      ElInput,
      ElOverlay,
      XsButton
    },
    props: { ...Props },
    emits: ['vanish', 'action'],
    inheritAttrs: false,
    setup(props, { emit }) {
      const ns = useNamespace('message-box');
      const visible = ref(false);
      const { nextZIndex } = useZIndex();
      // s represents state
      const state = reactive({
        beforeClose: null,
        callback: null,
        cancelButtonText: '取消',
        cancelButtonClass: '',
        confirmButtonText: '确定',
        confirmButtonClass: '',
        customClass: '',
        customStyle: {},
        dangerouslyUseHTMLString: false,
        distinguishCancelAndClose: false,
        icon: '',
        inputPattern: null,
        inputPlaceholder: '',
        inputType: 'text',
        inputValue: null,
        inputValidator: null,
        inputErrorMessage: '',
        message: null,
        modalFade: true,
        modalClass: '',
        showCancelButton: false,
        showConfirmButton: true,
        type: '',
        title: undefined,
        showInput: false,
        action: '',
        confirmButtonLoading: false,
        cancelButtonLoading: false,
        confirmButtonDisabled: false,
        editorErrorMessage: '',
        validateError: false,
        zIndex: nextZIndex()
      });

      const contentId = useId();
      const inputId = useId();

      const btnSize = useSize(
        computed(() => props.buttonSize),
        { prop: true, form: true, formItem: true }
      );

      const iconComponent = computed(() => (state.icon ? Icons[`${state.icon}`] || Icons.warn : null));
      const hasMessage = computed(() => !!state.message);
      const rootRef = ref();
      const headerRef = ref();
      const focusStartRef = ref();
      const inputRef = ref();
      const confirmRef = ref();

      const confirmButtonClasses = computed(() => state.confirmButtonClass);
      watch(
        () => state.inputValue,
        async val => {
          await nextTick();
          if (props.boxType === 'prompt' && val !== null) {
            validate();
          }
        },
        { immediate: true }
      );

      watch(
        () => visible.value,
        val => {
          if (val) {
            if (props.boxType === 'alert' || props.boxType === 'confirm') {
              focusStartRef.value = confirmRef.value?.$el ?? rootRef.value;
            }
            state.zIndex = nextZIndex();
          }
          if (props.boxType !== 'prompt') return;
          if (val) {
            nextTick().then(() => {
              if (inputRef.value && inputRef.value.$el) {
                focusStartRef.value = getInputElement() ?? rootRef.value;
              }
            });
          } else {
            state.editorErrorMessage = '';
            state.validateError = false;
          }
        }
      );

      const draggable = computed(() => props.draggable);
      useDraggable(rootRef, headerRef, draggable);

      onMounted(async () => {
        await nextTick();
        if (props.closeOnHashChange) {
          on(window, 'hashchange', doClose);
        }
      });
      onBeforeUnmount(() => {
        if (props.closeOnHashChange) {
          off(window, 'hashchange', doClose);
        }
      });

      function doClose() {
        if (!visible.value) return;
        visible.value = false;
        nextTick(() => {
          if (state.action) emit('action', state.action);
        });
      }

      const handleWrapperClick = () => {
        if (props.closeOnClickModal) {
          handleAction(state.distinguishCancelAndClose ? 'close' : 'cancel');
        }
      };

      const overlayEvent = useSameTarget(handleWrapperClick);

      const handleInputEnter = e => {
        if (state.inputType !== 'textarea') {
          e.preventDefault();
          return handleAction('confirm');
        }
      };
      const handleAction = action => {
        if (props.boxType === 'prompt' && action === 'confirm' && !validate()) {
          return;
        }

        state.action = action;

        if (state.beforeClose) {
          state.beforeClose?.(action, state, doClose);
        } else {
          doClose();
        }
      };

      const validate = () => {
        if (props.boxType === 'prompt') {
          const inputPattern = state.inputPattern;
          if (inputPattern && !inputPattern.test(state.inputValue || '')) {
            state.editorErrorMessage = state.inputErrorMessage;
            state.validateError = true;
            return false;
          }
          const inputValidator = state.inputValidator;
          if (typeof inputValidator === 'function') {
            const validateResult = inputValidator(state.inputValue);
            if (validateResult === false) {
              state.editorErrorMessage = state.inputErrorMessage;
              state.validateError = true;
              return false;
            }
            if (typeof validateResult === 'string') {
              state.editorErrorMessage = validateResult;
              state.validateError = true;
              return false;
            }
          }
        }
        state.editorErrorMessage = '';
        state.validateError = false;
        return true;
      };

      const getInputElement = () => {
        const inputRefs = inputRef.value.$refs;
        return inputRefs.input || inputRefs.textarea;
      };

      const handleClose = () => {
        handleAction('close');
      };

      const onCloseRequested = () => {
        if (props.closeOnPressEscape) {
          handleClose();
        }
      };

      // locks the screen to prevent scroll
      if (props.lockScroll) {
        useLockscreen(visible);
      }

      // restore to prev active element.
      useRestoreActive(visible);
      return {
        ...toRefs(state),
        ns,
        overlayEvent,
        visible,
        hasMessage,
        // typeClass,
        contentId,
        inputId,
        btnSize,
        // iconComponent,
        confirmButtonClasses,
        rootRef,
        focusStartRef,
        headerRef,
        inputRef,
        confirmRef,
        doClose, // for outside usage
        handleClose, // for out side usage
        onCloseRequested,
        handleWrapperClick,
        handleInputEnter,
        handleAction,
        onAfterLeave: () => {
          emit('vanish');
        },
        Icons,
        iconComponent
      };
    }
  });
</script>
<script setup></script>
