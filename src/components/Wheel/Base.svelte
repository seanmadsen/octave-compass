<script lang="ts">
  import BaseInterval from './Base/BaseInterval.svelte';
  import {getStore} from '../../store';
  import { IntervalSet } from '../../Utils/Music/IntervalSet';
  const {intervalSet, editVsPlay, scaleIsRotating} = getStore();
</script>

<g class:isHidden={$scaleIsRotating}>
  {#each IntervalSet.chromatic.intervals as interval}
    <BaseInterval
      interval={interval.id}
      label={interval.longName.toLowerCase()}
      isActive={$intervalSet.isActive(interval.id)}
      isClickable={interval.id !== 0 && $editVsPlay === 0}
    />
  {/each}
</g>

<style>
  .isHidden {
    visibility: hidden;
  }
</style>
