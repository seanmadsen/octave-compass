<script lang="ts">
  import KeyPolygon from './KeyPolygon.svelte';
  import KeyLabelSet from './KeyLabelSet.svelte';
  import type { Note } from '../../../Utils/Music/Note';
  import Key from '../../Keyboard/Key.svelte';
  import {getStore} from '../../../store';
  import {useLight} from '../../Lighting/Light';
  import { Scalar } from '../../../Utils/Math/Scalar';
  import { lightClassesForNoteLight } from '../../Lighting/LightClasses';

  const {
    editVsPlay,
    tonalCenter,
    keyboardRotator,
    createKeyController
  } = getStore();
  const {currentDetent} = keyboardRotator;

  export let note: Note;
  export let isActive: boolean;

  const light = useLight(lightClassesForNoteLight(note));
  
  $: isEdit = $editVsPlay === 0;
  $: isBlack = note.color === 'black';
  $: interval = note.id - $tonalCenter;
  $: keyLabelOpacity = isActive
    ? 1 - 0.1 * $editVsPlay
    : Scalar.wrapToOctave($tonalCenter - $currentDetent) === note.id ? 1
    : 0.25;
  $: keyController = createKeyController({notes: [note]});

</script>

<g class:isActive class:isBlack >
  {#if isActive && !isEdit}
    <KeyPolygon class='background' {interval} />
  {/if}
  <KeyLabelSet {note} {interval}
    class='key-label-highlight'
    isHighlight={true}
    opacity={$light}
  />
  <KeyLabelSet {note} {interval}
    class='key-label'
    isHighlight={false}
    opacity={keyLabelOpacity}
    hasBackground={$editVsPlay !== 1 || !isActive}
    lightIsOn={!!$light}
  />
  {#if isActive && !isEdit}
    <Key controller={keyController} isInsideSvg={true} >
      <KeyPolygon class='touch-receptor' {interval} />
    </Key>
  {/if}
</g>

<style>
  g > :global(.background) {
    fill: #EEE;
    stroke: #EEE;
  }
  g.isBlack > :global(.background) {
    fill: #222;
    stroke: #222;
  }
  
  g :global(.touch-receptor) {
    visibility: hidden;
    pointer-events: all;
  }
</style>