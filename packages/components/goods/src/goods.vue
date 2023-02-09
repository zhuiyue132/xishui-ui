<template>
  <div :class="ns.b()">
    <slot name="image">
      <el-popover
        :hide-after="50"
        :disabled="popoverDisabled"
        :offset="5"
        :persistent="false"
        trigger="hover"
        placement="right"
        popper-class="xs-goods-popper"
      >
        <template #reference>
          <xs-avatar :src="_src" shape="square" :size="size" :class="ns.e('image')">
            <template #error>
              <slot name="error"></slot>
            </template>
          </xs-avatar>
        </template>

        <div class="popover-content">
          <xs-avatar :src="_src" shape="square" :size="320" :class="ns.e('image')" />

          <slot name="popoverContent">
            <div v-if="idVisible" class="code">
              商品ID：{{ data[prop.id] }}
              <img :src="svgs.copy" alt="copy" @click.stop="onCopy(data[prop.id], $event)" />
            </div>
          </slot>
        </div>
      </el-popover>
    </slot>

    <div :class="[ns.e('content'), ns.m(`row-${rows}`)]" :style="_style">
      <slot>
        <a
          :href="data[prop.link]"
          :class="[ns.e('link')]"
          target="_blank"
          :linkable="!!data[prop.link]"
          rel="noopener noreferrer"
        >
          <xs-tooltip :content="_name" :text="_name + '踩踩踩踩踩踩'" :rows="rows"></xs-tooltip>
        </a>
      </slot>
    </div>

    <slot name="suffix"></slot>
  </div>
</template>
<script>
  import XsAvatar from '@xishui-ui/components/avatar';
  import XsTooltip from '@xishui-ui/components/tooltip';

  import { ElPopover } from 'element-plus';
  export default {
    name: 'XsGoods',
    components: {
      XsAvatar,
      ElPopover,
      XsTooltip
    }
  };
</script>

<script setup>
  import { computed } from 'vue';
  import { defaultProp, Props } from './goods';
  import { useNamespace } from '@xishui-ui/hooks';
  import { toClipboard } from '@xishui-ui/utils';
  import svgs from '../svgs';

  const props = defineProps(Props);
  const prop = computed(() => ({ ...defaultProp, ...props.prop }));

  const ns = useNamespace('goods');
  const _src = computed(() => {
    return props.data[prop.value.url];
  });

  const _name = computed(() => {
    return props.name || props.data[prop.value.name];
  });

  const _style = computed(() => {
    if (props.data[prop.value.link]) {
      return {};
    }
    return { '--xs-goods-color': '#000' };
  });

  const onCopy = (code, evt) => {
    toClipboard(code);
    evt.target.src = svgs.success;
    setTimeout(() => {
      evt.target.src = svgs.copy;
    }, 1000);
  };
</script>

<style lang="scss">
  .xs-goods-popper {
    padding: 4px !important;
    width: auto !important;
    border: none !important;
    border-radius: 2px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
    .popover-content {
      font-size: 14px;
      .xs-goods__image {
        width: auto;
      }
      .code {
        padding: 0 4px;
        display: flex;
        align-items: center;
        img {
          width: 16px;
          margin: 0 4px;
          cursor: pointer;
        }
      }
    }
  }
</style>
