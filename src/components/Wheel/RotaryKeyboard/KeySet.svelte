<script lang="ts">
  import type { NoteSet } from "../../../Utils/Music/NoteSet";
  import RotaryKey from "./RotaryKey.svelte";
  export let noteSet: NoteSet;
  export let isActive: boolean;
</script>

<g>
  {#each noteSet.notes as note (note.id)}
    <RotaryKey {note} {isActive} />
  {/each}
</g>