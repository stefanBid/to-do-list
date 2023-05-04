<script setup lang="ts">
import { TitleStyle } from '@/types';
import type {PropType} from 'vue';

    const props = defineProps({
        titleStyle:{type:String as PropType<TitleStyle>, required:false, default:TitleStyle.CLASSIC_MEDIUM},
        enableSub:{type:Boolean, required:false, default:false},
        subTitleStyle:{type:String as PropType<TitleStyle>,required:false, default:TitleStyle.CLASSIC_MEDIUM},
        orientation:{type:String, required:false, default:'center', validator:(value:string)=>{return ['right','center','left'].includes(value)} }
    });

</script>

<template>
    <div :class="['title-container', orientation]">
        <h1 :class="[props.titleStyle]"><slot></slot></h1>
        <h1 v-if="enableSub" :class="[props.subTitleStyle]"><slot name="sub"></slot></h1>
    </div>
</template>

<style scoped>
@tailwind components;

@layer components{
    .title-container{
        @apply flex flex-col justify-center items-center h-auto w-full 
    }

    .right{
      @apply items-end
    }

    .center{
      @apply items-center
    }

    .left{
      @apply items-start
    }

/*CSS TITLE CLASS*/
  .light-smallest-title, .light-small-title, .light-medium-title, .light-big-title, .light-biggest-title{
    @apply text-white font-semibold font-mono;
  }

  .classic-smallest-title, .classic-small-title, .classic-medium-title, .classic-big-title, .classic-biggest-title{
    @apply text-green-500 font-semibold font-mono;
  }

  .dark-smallest-title, .dark-small-title, .dark-medium-title, .dark-big-title, .dark-biggest-title{
    @apply text-gray-900 font-semibold font-mono;
  }

  .light-smallest-title, .classic-smallest-title, .dark-smallest-title{
    @apply text-sm;
  }

  .light-small-title, .classic-small-title, .dark-small-title{
    @apply text-base;
  }

  .light-medium-title, .classic-medium-title, .dark-medium-title{
    @apply text-lg;
  }

  .light-big-title, .classic-big-title, .dark-big-title{
    @apply text-xl;
  }

  .light-biggest-title, .classic-biggest-title, .dark-biggest-title{
    @apply text-2xl;
  }
}
</style>