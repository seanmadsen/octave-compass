<script lang="ts">
  import { getStore } from '../../../store';
  import Tip from './Tip.svelte';
  const {editVsPlay} = getStore();
</script>

<g opacity={1 - $editVsPlay}>
  <Tip
    lines={['Rotate to', 'transpose']}
    center={{x: -400, y: -420}} width={200} height={200}
    targets={[{x: -240, y: -240}]}
  />
  <Tip
    lines={['Rotate to', 'shift modes']}
    center={{x: 400, y: -400}} width={220} height={200}
    targets={[{x: 100, y: -120}]}
    isTargetingScale
  />
  <Tip
    lines={['Click to', 'toggle', 'intervals']}
    center={{x: -410, y: 420}} width={200} height={200}
    targets={[{x: -435, y: 255}, {x: -258, y: 435}]}
  />
</g>

<g opacity={$editVsPlay}>
  <Tip
    lines={['Press keys', 'to play', 'notes']}
    center={{x: -400, y: -420}} width={270} height={150}
    targets={[{x: -60, y: -410, xc: -140, yc: -140}]}
  />
  <Tip
    lines={['Press circles', 'to play', 'chords']}
    center={{x: 400, y: -420}} width={280} height={200}
  />
</g>